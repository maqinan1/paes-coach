import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'success' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: Variant
  size?: Size
  disabled?: boolean
  fullWidth?: boolean
  className?: string
}

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-900/40 hover:brightness-110',
  secondary:
    'bg-slate-700/70 text-slate-100 hover:bg-slate-600/70 border border-slate-600/60',
  ghost: 'bg-transparent text-slate-300 hover:bg-slate-700/40',
  success:
    'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-900/40 hover:brightness-110',
  danger:
    'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg shadow-rose-900/40 hover:brightness-110',
}

const SIZES: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-base',
  lg: 'px-6 py-4 text-lg',
}

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className,
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-2xl font-bold transition-all duration-200 select-none',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60',
        VARIANTS[variant],
        SIZES[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      {children}
    </motion.button>
  )
}
