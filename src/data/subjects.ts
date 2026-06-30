import type { Subject } from '../types'

/** The 5 PAES subjects with their gamified color identity. */
export const SUBJECTS: Subject[] = [
  {
    id: 'lenguaje',
    name: 'Competencia Lectora',
    shortName: 'Lenguaje',
    icon: '📚',
    gradient: 'from-violet-500 to-purple-700',
    color: '#8b5cf6',
    description: 'Comprensión lectora, vocabulario y análisis de textos.',
  },
  {
    id: 'matematica-m1',
    name: 'Matemática M1',
    shortName: 'Matemática M1',
    icon: '🔢',
    gradient: 'from-amber-400 to-yellow-600',
    color: '#f59e0b',
    description: 'Números, álgebra, geometría y probabilidad básica.',
  },
  {
    id: 'matematica-m2',
    name: 'Matemática M2',
    shortName: 'Matemática M2',
    icon: '📐',
    gradient: 'from-rose-500 to-red-700',
    color: '#ef4444',
    description: 'Funciones, geometría avanzada y estadística inferencial.',
  },
  {
    id: 'historia',
    name: 'Historia y Cs. Sociales',
    shortName: 'Historia',
    icon: '🌍',
    gradient: 'from-emerald-400 to-green-700',
    color: '#22c55e',
    description: 'Historia de Chile, formación ciudadana y economía.',
  },
  {
    id: 'ciencias',
    name: 'Ciencias',
    shortName: 'Ciencias',
    icon: '🔬',
    gradient: 'from-sky-400 to-blue-700',
    color: '#3b82f6',
    description: 'Biología, física y química para la PAES.',
  },
]

export const getSubject = (id: string): Subject | undefined =>
  SUBJECTS.find((s) => s.id === id)
