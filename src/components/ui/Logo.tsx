import { cn } from '../../lib/cn'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  withText?: boolean
  className?: string
}

const MARK_SIZE = { sm: 'h-9 w-9 text-xl', md: 'h-12 w-12 text-2xl', lg: 'h-20 w-20 text-4xl' }
const TEXT_SIZE = { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl' }

/** PAES Coach brand mark. */
export function Logo({ size = 'md', withText = true, className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className={cn(
          'flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-lg shadow-indigo-900/50',
          MARK_SIZE[size],
        )}
      >
        <span>🎓</span>
      </div>
      {withText && (
        <div className="leading-tight">
          <p
            className={cn(
              'font-extrabold tracking-tight text-white',
              TEXT_SIZE[size],
            )}
          >
            PAES <span className="text-indigo-400">Coach</span>
          </p>
          {size === 'lg' && (
            <p className="text-sm text-slate-400">Tu camino a la PAES 🚀</p>
          )}
        </div>
      )}
    </div>
  )
}
