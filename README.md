# 🎓 PAES Coach

App web móvil (responsive) y **gamificada** para la preparación de la **PAES (Chile)**, con estética tipo Duolingo: fondo oscuro, gradientes vibrantes, bordes redondeados y animaciones fluidas.

> Frontend construido con **React + Vite + TypeScript + Tailwind CSS v4**, **Framer Motion** y **canvas-confetti**. El backend se simula con un servicio mock async + persistencia en `localStorage`, listo para reemplazar por la API real.

## ✨ Funcionalidades

- **Auth** (login / registro) que inicializa un `UserProfile` por defecto.
- **Dashboard**: header con XP, racha 🔥, barra de progreso global y grid de 5 materias.
- **Mapa de niveles** estilo Duolingo (ruta serpenteante) con estados *completado ✅*, *en progreso* (borde pulsante) y *bloqueado 🔒*.
- **Pantalla de nivel** con 3 fases: **Teoría** (markdown), **Trivia** (ejercicios con feedback inmediato + explicación) y **Resultados** (confetti 🎉 si apruebas ≥60%, o repaso si repruebas).
- **Perfil**: avatar, XP, racha actual/récord, badge de curso, progreso por materia, vitrina de insignias y formulario editable (nombre, curso, fecha objetivo PAES).

## 🚀 Cómo correr

```bash
npm install
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción (tsc + vite)
npm run lint     # linter
npm run preview  # previsualizar el build
```

## 🗂️ Estructura

```
src/
├── components/
│   ├── layout/        # AppLayout, BottomNav
│   ├── ui/            # Button, Card, ProgressBar, Avatar, Logo, StatChip, Markdown, Spinner
│   └── SubjectCard.tsx
├── context/
│   └── AppContext.tsx # estado global (perfil + progreso)
├── data/              # datos mock "seed" (materias, niveles, ejercicios, insignias)
│   ├── subjects.ts
│   ├── content.ts
│   └── badges.ts
├── pages/             # AuthPage, DashboardPage, LevelMapPage, LevelPage, ProfilePage
├── services/          # API mock (store + api)
│   ├── store.ts
│   └── api.ts
├── types/             # interfaces del dominio (entidades del backend)
└── App.tsx            # routing
```

## 🔌 API mock (reemplazar por el backend real)

Todas las funciones viven en `src/services/api.ts` y son `async` (Promesas):

| Función | Retorna |
|---|---|
| `submitAnswer(exerciseId, selectedOption)` | `{ correct, explanation, correctOption }` |
| `checkLevelCompletion(levelId)` | `{ passed, xpEarned, percentage }` |
| `updateStreak()` | `{ currentStreak }` |
| `getProgressSummary()` | estado global del usuario |

Para conectar el backend real, basta con reemplazar las implementaciones de `src/services/api.ts` por llamadas `fetch`/axios manteniendo las mismas firmas y tipos (`src/types/`).

## 🎨 Tema

- Fondo base: `#0F172A` · Superficies: `#1E293B`
- Cada materia tiene su color/gradiente: Lenguaje (morado), Matemática M1 (amarillo), Matemática M2 (rojo), Historia (verde), Ciencias (azul).
