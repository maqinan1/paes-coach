import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { Avatar } from '../components/ui/Avatar'
import { StatChip } from '../components/ui/StatChip'
import { ProgressBar } from '../components/ui/ProgressBar'
import { SubjectCard } from '../components/SubjectCard'
import { FullScreenLoader } from '../components/ui/Spinner'

export function DashboardPage() {
  const { summary, profile } = useApp()

  if (!summary || !profile) return <FullScreenLoader />

  const firstName = profile.name.split(' ')[0]

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={profile.name} src={profile.avatarUrl || undefined} />
          <div>
            <p className="text-sm text-slate-400">¡Hola de nuevo! 👋</p>
            <h1 className="text-xl font-extrabold text-white">{firstName}</h1>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <StatChip icon="⚡" value={profile.totalXp} label="XP" />
          <StatChip
            icon="🔥"
            value={profile.currentStreak}
            label={profile.currentStreak === 1 ? 'día' : 'días'}
          />
        </div>
      </header>

      {/* Overall progress */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-slate-700/50 bg-gradient-to-br from-[#1E293B] to-[#243044] p-5 shadow-xl"
      >
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-bold text-white">Progreso PAES</h2>
          <span className="text-2xl font-extrabold text-indigo-400">
            {summary.overallPercentage}%
          </span>
        </div>
        <ProgressBar
          value={summary.overallPercentage}
          gradient="from-indigo-400 to-fuchsia-500"
          heightClass="h-4"
        />
        <p className="mt-2 text-xs text-slate-400">
          {summary.completedLevels} de {summary.totalLevels} niveles completados
          en total. ¡Sigue así! 💪
        </p>
      </motion.div>

      {/* Subjects grid */}
      <section>
        <h2 className="mb-3 text-lg font-extrabold text-white">Materias</h2>
        <div className="grid grid-cols-2 gap-3">
          {summary.subjects.map((s, idx) => (
            <motion.div
              key={s.subject.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.06 }}
              className={idx === summary.subjects.length - 1 ? 'col-span-2' : ''}
            >
              <SubjectCard summary={s} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
