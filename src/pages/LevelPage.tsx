import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useNavigate, useParams } from 'react-router-dom'
import { getExercisesByLevel, getLevel, getLevelsBySubject } from '../data/content'
import { getSubject } from '../data/subjects'
import * as api from '../services/api'
import { useApp } from '../context/AppContext'
import { Button } from '../components/ui/Button'
import { Markdown } from '../components/ui/Markdown'
import { ProgressBar } from '../components/ui/ProgressBar'
import { Spinner } from '../components/ui/Spinner'
import type { CheckLevelCompletionResult } from '../types'

type Phase = 'theory' | 'quiz' | 'results'

export function LevelPage() {
  const { levelId = '' } = useParams()
  const navigate = useNavigate()
  const { refresh } = useApp()

  const level = getLevel(levelId)
  const subject = level ? getSubject(level.subjectId) : undefined
  const exercises = getExercisesByLevel(levelId)

  const [phase, setPhase] = useState<Phase>('theory')

  if (!level || !subject) {
    return (
      <div className="py-20 text-center text-slate-400">
        Nivel no encontrado.{' '}
        <button onClick={() => navigate('/')} className="text-indigo-400 underline">
          Volver
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh]">
      {/* Top bar */}
      <div className="mb-5 flex items-center gap-3">
        <button
          onClick={() => navigate(`/materia/${subject.id}`)}
          className="text-2xl text-slate-400 hover:text-white"
          aria-label="Cerrar"
        >
          ✕
        </button>
        <div className="flex-1">
          <p className="text-xs font-semibold text-slate-400">
            {subject.icon} {subject.shortName} · Nivel {level.order}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'theory' && (
          <TheoryPhase
            key="theory"
            title={level.title}
            color={subject.color}
            md={level.theory_content_md}
            onStart={() => setPhase('quiz')}
          />
        )}
        {phase === 'quiz' && (
          <QuizPhase
            key="quiz"
            exercises={exercises}
            color={subject.color}
            onFinish={() => setPhase('results')}
          />
        )}
        {phase === 'results' && (
          <ResultsPhase
            key="results"
            levelId={levelId}
            subjectId={subject.id}
            color={subject.color}
            onRetry={() => setPhase('quiz')}
            onContinue={async () => {
              await refresh()
              navigate(`/materia/${subject.id}`)
            }}
            onRefresh={refresh}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Phase 1: Theory
// ---------------------------------------------------------------------------
function TheoryPhase({
  title,
  md,
  color,
  onStart,
}: {
  title: string
  md: string
  color: string
  onStart: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
    >
      <div
        className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold"
        style={{ backgroundColor: `${color}22`, color }}
      >
        📖 Teoría
      </div>
      <h1 className="mb-3 text-2xl font-extrabold text-white">{title}</h1>
      <div className="rounded-3xl border border-slate-700/50 bg-[#1E293B] p-5">
        <Markdown source={md} />
      </div>
      <div className="sticky bottom-4 mt-6">
        <Button fullWidth size="lg" onClick={onStart}>
          ¡Empezar Ejercicios! 🚀
        </Button>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Phase 2: Quiz
// ---------------------------------------------------------------------------
function QuizPhase({
  exercises,
  color,
  onFinish,
}: {
  exercises: ReturnType<typeof getExercisesByLevel>
  color: string
  onFinish: () => void
}) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [result, setResult] = useState<{
    correct: boolean
    explanation: string
    correctOption: number
  } | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const exercise = exercises[index]
  const isLast = index === exercises.length - 1
  const progress = Math.round((index / exercises.length) * 100)

  async function choose(option: number) {
    if (result || submitting) return
    setSelected(option)
    setSubmitting(true)
    try {
      const res = await api.submitAnswer(exercise.id, option)
      setResult(res)
    } finally {
      setSubmitting(false)
    }
  }

  function next() {
    if (isLast) {
      onFinish()
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
    setResult(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
    >
      {/* Progress */}
      <div className="mb-5">
        <ProgressBar value={progress} color={color} heightClass="h-3" />
        <p className="mt-1.5 text-right text-xs font-semibold text-slate-400">
          {index + 1} / {exercises.length}
        </p>
      </div>

      {/* Question */}
      <h2 className="mb-5 text-xl font-extrabold leading-snug text-white">
        {exercise.question}
      </h2>

      {/* Options */}
      <div className="space-y-3">
        {exercise.options.map((opt, i) => {
          const isSelected = selected === i
          const isCorrect = result && i === result.correctOption
          const isWrongPick = result && isSelected && !result.correct

          let styles =
            'border-slate-600/60 bg-[#1E293B] text-slate-100 hover:border-slate-400'
          if (isCorrect)
            styles = 'border-emerald-500 bg-emerald-500/15 text-emerald-200'
          else if (isWrongPick)
            styles = 'border-rose-500 bg-rose-500/15 text-rose-200'
          else if (result) styles = 'border-slate-700/50 bg-slate-800/40 text-slate-500'

          return (
            <motion.button
              key={i}
              whileTap={{ scale: result ? 1 : 0.98 }}
              onClick={() => choose(i)}
              disabled={Boolean(result)}
              className={`flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-4 text-left font-semibold transition-all ${styles}`}
            >
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg border border-current text-sm">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt}</span>
              {isCorrect && <span>✅</span>}
              {isWrongPick && <span>❌</span>}
            </motion.button>
          )
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`mt-5 overflow-hidden rounded-2xl border-2 p-4 ${
              result.correct
                ? 'border-emerald-500/50 bg-emerald-500/10'
                : 'border-rose-500/50 bg-rose-500/10'
            }`}
          >
            <p
              className={`mb-1 font-extrabold ${
                result.correct ? 'text-emerald-300' : 'text-rose-300'
              }`}
            >
              {result.correct ? '¡Correcto! 🎉' : 'Incorrecto 😕'}
            </p>
            <p className="text-sm leading-relaxed text-slate-300">
              {result.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next */}
      <div className="sticky bottom-4 mt-6">
        <Button
          fullWidth
          size="lg"
          variant={result?.correct ? 'success' : 'primary'}
          disabled={!result || submitting}
          onClick={next}
        >
          {submitting ? (
            <Spinner className="h-5 w-5" />
          ) : isLast ? (
            'Ver resultados 🏁'
          ) : (
            'Siguiente →'
          )}
        </Button>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Phase 3: Results
// ---------------------------------------------------------------------------
function ResultsPhase({
  levelId,
  subjectId,
  color,
  onRetry,
  onContinue,
  onRefresh,
}: {
  levelId: string
  subjectId: string
  color: string
  onRetry: () => void
  onContinue: () => void
  onRefresh: () => Promise<void>
}) {
  const [result, setResult] = useState<CheckLevelCompletionResult | null>(null)
  const ran = useRef(false)

  const fireConfetti = useCallback(() => {
    const end = Date.now() + 800
    const colors = [color, '#ffffff', '#fde047']
    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors,
      })
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [color])

  useEffect(() => {
    if (ran.current) return
    ran.current = true
    void (async () => {
      const res = await api.checkLevelCompletion(levelId)
      await api.updateStreak()
      await onRefresh()
      setResult(res)
      if (res.passed) setTimeout(fireConfetti, 250)
    })()
  }, [levelId, fireConfetti, onRefresh])

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <Spinner className="h-10 w-10" />
        <p className="text-sm text-slate-400">Calculando resultados...</p>
      </div>
    )
  }

  const passed = result.passed
  const nextLevel = (() => {
    const siblings = getLevelsBySubject(subjectId)
    const idx = siblings.findIndex((l) => l.id === levelId)
    return siblings[idx + 1]
  })()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center py-8 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        className="text-7xl"
      >
        {passed ? '🎉' : '💪'}
      </motion.div>

      <h1 className="mt-4 text-3xl font-extrabold text-white">
        {passed ? '¡Nivel superado!' : '¡Casi lo logras!'}
      </h1>
      <p className="mt-2 max-w-xs text-slate-400">
        {passed
          ? '¡Excelente trabajo! Sigue así y conquistarás la PAES.'
          : 'Necesitas al menos 60% para aprobar. Repasa la teoría y vuelve a intentarlo. ¡Tú puedes!'}
      </p>

      {/* Score ring */}
      <div className="my-8 flex items-center gap-6">
        <ScoreRing percentage={result.percentage} color={passed ? color : '#ef4444'} />
        {passed && (
          <div className="text-left">
            <p className="text-sm text-slate-400">Ganaste</p>
            <p className="text-3xl font-extrabold text-amber-400">
              +{result.xpEarned} XP ⚡
            </p>
          </div>
        )}
      </div>

      <div className="w-full space-y-3">
        {passed ? (
          <>
            {nextLevel ? (
              <Button fullWidth size="lg" variant="success" onClick={onContinue}>
                Siguiente Nivel →
              </Button>
            ) : (
              <Button fullWidth size="lg" variant="success" onClick={onContinue}>
                ¡Volver al mapa! 🗺️
              </Button>
            )}
          </>
        ) : (
          <Button fullWidth size="lg" variant="danger" onClick={onRetry}>
            Reintentar Nivel 🔁
          </Button>
        )}
        <Button fullWidth size="md" variant="secondary" onClick={onContinue}>
          Volver al mapa
        </Button>
      </div>
    </motion.div>
  )
}

function ScoreRing({ percentage, color }: { percentage: number; color: string }) {
  const r = 52
  const c = 2 * Math.PI * r
  const offset = c - (percentage / 100) * c
  return (
    <div className="relative h-32 w-32">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#334155" strokeWidth="12" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold text-white">{percentage}%</span>
        <span className="text-xs text-slate-400">aciertos</span>
      </div>
    </div>
  )
}
