import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { getSubject } from '../data/subjects'
import { getLevelsBySubject } from '../data/content'
import { useApp } from '../context/AppContext'
import type { Level, LevelStatus } from '../types'

// Serpentine horizontal offsets (px) cycled down the path.
const OFFSETS = [0, 56, 80, 56, 0, -56, -80, -56]

export function LevelMapPage() {
  const { subjectId = '' } = useParams()
  const navigate = useNavigate()
  const { levelProgress } = useApp()

  const subject = getSubject(subjectId)
  const levels = getLevelsBySubject(subjectId)

  if (!subject) {
    return (
      <div className="py-20 text-center text-slate-400">
        Materia no encontrada.{' '}
        <button onClick={() => navigate('/')} className="text-indigo-400 underline">
          Volver
        </button>
      </div>
    )
  }

  const completed = levels.filter(
    (l) => levelProgress[l.id]?.status === 'completed',
  ).length
  const pct = levels.length ? Math.round((completed / levels.length) * 100) : 0

  return (
    <div>
      {/* Header */}
      <header
        className={`-mx-4 -mt-6 mb-6 rounded-b-[2.5rem] bg-gradient-to-br ${subject.gradient} px-5 pt-6 pb-7 shadow-lg`}
      >
        <button
          onClick={() => navigate('/')}
          className="mb-3 flex items-center gap-1 text-sm font-semibold text-white/90 hover:text-white"
        >
          ← Volver
        </button>
        <div className="flex items-center gap-3">
          <span className="text-4xl drop-shadow">{subject.icon}</span>
          <div>
            <h1 className="text-2xl font-extrabold text-white drop-shadow">
              {subject.name}
            </h1>
            <p className="text-sm text-white/85">{subject.description}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs font-semibold text-white/90">
            <span>
              {completed}/{levels.length} niveles
            </span>
            <span>{pct}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-black/25">
            <div
              className="h-full rounded-full bg-white"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </header>

      {/* Path */}
      <div className="relative flex flex-col items-center gap-7 pb-6">
        {levels.map((level, idx) => {
          const status = levelProgress[level.id]?.status ?? 'locked'
          const offset = OFFSETS[idx % OFFSETS.length]
          const nextOffset =
            idx < levels.length - 1 ? OFFSETS[(idx + 1) % OFFSETS.length] : offset
          return (
            <div
              key={level.id}
              className="relative flex w-full flex-col items-center"
              style={{ transform: `translateX(${offset}px)` }}
            >
              <LevelNode
                level={level}
                status={status}
                color={subject.color}
                onClick={() => {
                  if (status !== 'locked') navigate(`/nivel/${level.id}`)
                }}
              />
              {idx < levels.length - 1 && (
                <Connector dx={nextOffset - offset} active={status === 'completed'} />
              )}
            </div>
          )
        })}

        {pct === 100 && (
          <div className="mt-2 rounded-2xl border border-amber-400/40 bg-amber-400/10 px-5 py-3 text-center text-sm font-bold text-amber-300">
            🏆 ¡Materia completada! Eres un crack.
          </div>
        )}
      </div>
    </div>
  )
}

function Connector({ dx, active }: { dx: number; active: boolean }) {
  return (
    <div
      className="pointer-events-none -z-0 mt-2 mb-1 h-7 w-1.5 rounded-full"
      style={{
        transform: `translateX(${dx / 2}px)`,
        background: active ? 'rgba(255,255,255,0.5)' : 'rgba(148,163,184,0.25)',
      }}
    />
  )
}

interface LevelNodeProps {
  level: Level
  status: LevelStatus
  color: string
  onClick: () => void
}

function LevelNode({ level, status, color, onClick }: LevelNodeProps) {
  const locked = status === 'locked'
  const completed = status === 'completed'
  const inProgress = status === 'in_progress'

  return (
    <motion.button
      whileTap={{ scale: locked ? 1 : 0.92 }}
      onClick={onClick}
      disabled={locked}
      className="group relative flex flex-col items-center"
    >
      <div
        className={`relative flex h-[72px] w-[72px] items-center justify-center rounded-full text-2xl font-extrabold shadow-lg transition-transform ${
          locked
            ? 'bg-slate-700/80 text-slate-500'
            : 'text-white group-hover:scale-105'
        } ${inProgress ? 'animate-pulse' : ''}`}
        style={
          !locked
            ? {
                backgroundColor: completed ? color : 'transparent',
                border: `4px solid ${color}`,
                boxShadow: `0 0 22px ${color}66`,
              }
            : undefined
        }
      >
        {locked ? (
          <span>🔒</span>
        ) : completed ? (
          <span className="text-3xl">✅</span>
        ) : (
          <span style={{ color }}>{level.order}</span>
        )}
      </div>
      <span
        className={`mt-2 max-w-[150px] text-center text-xs font-semibold ${
          locked ? 'text-slate-600' : 'text-slate-300'
        }`}
      >
        {level.title}
      </span>
    </motion.button>
  )
}
