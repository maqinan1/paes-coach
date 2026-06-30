import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import type { SubjectSummary } from '../types'
import { ProgressBar } from './ui/ProgressBar'

export function SubjectCard({ summary }: { summary: SubjectSummary }) {
  const navigate = useNavigate()
  const { subject, levelsCompleted, totalLevels, percentage } = summary

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/materia/${subject.id}`)}
      className={`relative flex h-full min-h-[150px] w-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br ${subject.gradient} p-4 text-left shadow-lg shadow-black/30`}
    >
      <div className="pointer-events-none absolute -top-6 -right-4 text-7xl opacity-20">
        {subject.icon}
      </div>

      <div className="relative z-10">
        <span className="text-3xl">{subject.icon}</span>
        <h3 className="mt-2 text-base font-extrabold leading-tight text-white drop-shadow">
          {subject.shortName}
        </h3>
      </div>

      <div className="relative z-10 mt-4">
        <p className="mb-1.5 text-xs font-semibold text-white/90">
          {levelsCompleted}/{totalLevels} niveles
        </p>
        <div className="h-2 w-full overflow-hidden rounded-full bg-black/25">
          <div
            className="h-full rounded-full bg-white"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </motion.button>
  )
}

/** Re-exported for places that want the raw bar elsewhere. */
export { ProgressBar }
