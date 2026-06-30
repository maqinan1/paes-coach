import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Logo } from '../components/ui/Logo'
import { Spinner } from '../components/ui/Spinner'
import { useApp } from '../context/AppContext'

const FEATURES = [
  { icon: '🎯', text: 'Practica por niveles' },
  { icon: '🔥', text: 'Mantén tu racha' },
  { icon: '🏆', text: 'Gana insignias' },
]

export function AuthPage() {
  const { login, register } = useApp()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isRegister = mode === 'register'

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (!email || !password || (isRegister && !name)) {
      setError('Completa todos los campos.')
      return
    }
    setLoading(true)
    try {
      if (isRegister) {
        await register({ email, password, name })
      } else {
        await login({ email, password })
      }
      navigate('/')
    } catch {
      setError('Ocurrió un error. Inténtalo nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col justify-center overflow-hidden bg-[#0F172A] px-6 py-10">
      {/* Glow background */}
      <div className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-indigo-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo size="lg" />
          <p className="mt-4 max-w-xs text-slate-400">
            Prepárate para la PAES jugando. Sube de nivel, suma XP y conquista
            cada materia. 🚀
          </p>
        </div>

        <div className="mb-6 flex justify-center gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.text}
              className="flex flex-col items-center gap-1 text-center"
            >
              <span className="text-2xl">{f.icon}</span>
              <span className="text-[11px] font-medium text-slate-400">
                {f.text}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-700/50 bg-[#1E293B] p-6 shadow-2xl shadow-black/30">
          <div className="mb-5 grid grid-cols-2 gap-1 rounded-2xl bg-slate-900/70 p-1">
            <button
              onClick={() => setMode('login')}
              className={`rounded-xl py-2 text-sm font-bold transition-colors ${
                !isRegister
                  ? 'bg-indigo-500 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => setMode('register')}
              className={`rounded-xl py-2 text-sm font-bold transition-colors ${
                isRegister
                  ? 'bg-indigo-500 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Registrarse
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <Field
                label="Nombre"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={setName}
              />
            )}
            <Field
              label="Email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={setEmail}
            />
            <Field
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
            />

            {error && (
              <p className="rounded-xl bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-400">
                {error}
              </p>
            )}

            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? (
                <Spinner className="h-5 w-5" />
              ) : isRegister ? (
                'Crear cuenta'
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-slate-500">
            {isRegister
              ? '¿Ya tienes cuenta? '
              : '¿Nuevo en PAES Coach? '}
            <button
              onClick={() => setMode(isRegister ? 'login' : 'register')}
              className="font-bold text-indigo-400 hover:underline"
            >
              {isRegister ? 'Inicia sesión' : 'Regístrate gratis'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

interface FieldProps {
  label: string
  type: string
  placeholder: string
  value: string
  onChange: (v: string) => void
}

function Field({ label, type, placeholder, value, onChange }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-300">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-600/60 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 transition-colors focus:border-indigo-400 focus:outline-none"
      />
    </label>
  )
}
