import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

/** Base surface card with the app's dark elevated look. */
export function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-3xl bg-[#1E293B] border border-slate-700/50 shadow-xl shadow-black/20',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {children}
    </div>
  )
}
