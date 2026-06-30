import { cn } from '../../lib/cn'

export function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'h-6 w-6 animate-spin rounded-full border-2 border-slate-600 border-t-indigo-400',
        className,
      )}
    />
  )
}

export function FullScreenLoader({ label = 'Cargando...' }: { label?: string }) {
  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center gap-4 bg-[#0F172A]">
      <Spinner className="h-10 w-10" />
      <p className="text-sm font-semibold text-slate-400">{label}</p>
    </div>
  )
}
