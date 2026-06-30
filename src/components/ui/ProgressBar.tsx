import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

interface ProgressBarProps {
  /** 0-100 */
  value: number
  className?: string
  /** Height utility class, e.g. 'h-2', 'h-3'. */
  heightClass?: string
  /** Tailwind gradient classes (from-... to-...). */
  gradient?: string
  /** Solid color override (hex) — used when no gradient is given. */
  color?: string
  showLabel?: boolean
}

export function ProgressBar({
  value,
  className,
  heightClass = 'h-3',
  gradient,
  color,
  showLabel = false,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'w-full overflow-hidden rounded-full bg-slate-900/70',
          heightClass,
        )}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={cn(
            'h-full rounded-full',
            gradient ? `bg-gradient-to-r ${gradient}` : '',
          )}
          style={!gradient ? { backgroundColor: color ?? '#6366f1' } : undefined}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-right text-xs font-semibold text-slate-400">
          {clamped}%
        </div>
      )}
    </div>
  )
}
