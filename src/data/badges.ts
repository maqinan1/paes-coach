import type { Badge } from '../types'

/** All badges that can be unlocked in PAES Coach. */
export const BADGES: Badge[] = [
  {
    id: 'first-100-xp',
    name: 'Primeros 100 XP',
    description: 'Ganaste tus primeros 100 puntos de experiencia.',
    icon: '⭐',
    gradient: 'from-amber-400 to-orange-600',
  },
  {
    id: 'streak-7',
    name: 'Racha de 7 días',
    description: 'Estudiaste 7 días seguidos. ¡Imparable!',
    icon: '🔥',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    id: 'first-level',
    name: 'Primer Nivel',
    description: 'Completaste tu primer nivel.',
    icon: '🚀',
    gradient: 'from-sky-400 to-blue-600',
  },
  {
    id: 'lenguaje-master',
    name: 'Maestro del Lenguaje',
    description: 'Completaste todos los niveles de Competencia Lectora.',
    icon: '📚',
    gradient: 'from-violet-500 to-purple-700',
  },
  {
    id: 'math-pro',
    name: 'Pro de las Matemáticas',
    description: 'Completaste todos los niveles de Matemática M1.',
    icon: '🧮',
    gradient: 'from-amber-400 to-yellow-600',
  },
  {
    id: 'xp-500',
    name: 'Club de los 500',
    description: 'Acumulaste 500 XP en total.',
    icon: '💎',
    gradient: 'from-cyan-400 to-teal-600',
  },
  {
    id: 'perfect-level',
    name: 'Nivel Perfecto',
    description: 'Completaste un nivel con 100% de aciertos.',
    icon: '🎯',
    gradient: 'from-emerald-400 to-green-600',
  },
  {
    id: 'streak-30',
    name: 'Racha de 30 días',
    description: 'Un mes completo de estudio sin parar.',
    icon: '👑',
    gradient: 'from-fuchsia-500 to-pink-600',
  },
]

export const getBadge = (id: string): Badge | undefined =>
  BADGES.find((b) => b.id === id)
