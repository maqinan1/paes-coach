import { cn } from '../../lib/cn'

interface StatChipProps {
  icon: string
  value: string | number
  label?: string
  className?: string
}

/** Small pill showing an icon + value (used for XP, streak, etc.). */
export function StatChip({ icon, value, label, className }: StatChipProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-1.5 rounded-full border border-slate-700/60 bg-slate-800/70 px-3 py-1.5',
        className,
      )}
    >
      <span className="text-base leading-none">{icon}</span>
      <span className="text-sm font-extrabold text-white">{value}</span>
      {label && <span className="text-xs text-slate-400">{label}</span>}
    </div>
  )
}
