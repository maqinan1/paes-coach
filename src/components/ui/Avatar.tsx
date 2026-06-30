import { cn } from '../../lib/cn'

interface AvatarProps {
  name: string
  src?: string
  size?: number
  className?: string
}

/** Circular avatar — shows the image if provided, otherwise initials. */
export function Avatar({ name, src, size = 56, className }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 font-extrabold text-white ring-2 ring-white/10 overflow-hidden',
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span>{initials || '🙂'}</span>
      )}
    </div>
  )
}
