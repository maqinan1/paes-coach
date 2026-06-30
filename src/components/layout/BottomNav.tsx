import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'

const ITEMS = [
  { to: '/', label: 'Inicio', icon: '🏠', end: true },
  { to: '/perfil', label: 'Perfil', icon: '👤', end: false },
]

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md">
      <div className="m-3 flex items-center justify-around rounded-3xl border border-slate-700/60 bg-[#1E293B]/95 px-2 py-2 shadow-2xl shadow-black/40 backdrop-blur">
        {ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-2 text-xs font-semibold transition-colors',
                isActive
                  ? 'bg-indigo-500/15 text-indigo-300'
                  : 'text-slate-400 hover:text-slate-200',
              )
            }
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
