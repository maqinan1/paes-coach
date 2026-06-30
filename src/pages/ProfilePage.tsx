import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Avatar } from '../components/ui/Avatar'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { ProgressBar } from '../components/ui/ProgressBar'
import { FullScreenLoader } from '../components/ui/Spinner'
import { BADGES } from '../data/badges'
import type { CourseLevel } from '../types'

const COURSES: CourseLevel[] = ['3ro medio', '4to medio', 'Egresado']

export function ProfilePage() {
  const { summary, profile, updateProfile, logout } = useApp()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [course, setCourse] = useState<CourseLevel>('4to medio')
  const [targetDate, setTargetDate] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (profile) {
      setName(profile.name)
      setCourse(profile.course)
      setTargetDate(profile.targetDate)
    }
  }, [profile])

  if (!summary || !profile) return <FullScreenLoader />

  const earnedIds = new Set(summary.badges.map((b) => b.id))

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    try {
      await updateProfile({ name, course, targetDate })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally {
      setSaving(false)
    }
  }

  async function handleLogout() {
    await logout()
    navigate('/auth')
  }

  return (
    <div className="space-y-6">
      {/* Header card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="flex flex-col items-center p-6 text-center">
          <Avatar name={profile.name} src={profile.avatarUrl || undefined} size={88} />
          <h1 className="mt-3 text-2xl font-extrabold text-white">
            {profile.name}
          </h1>
          <span className="mt-1 rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-bold text-indigo-300">
            🎓 {profile.course}
          </span>

          <div className="mt-5 grid w-full grid-cols-3 gap-2">
            <Stat label="XP total" value={profile.totalXp} icon="⚡" />
            <Stat label="Racha" value={profile.currentStreak} icon="🔥" />
            <Stat label="Récord" value={profile.longestStreak} icon="🏅" />
          </div>
        </Card>
      </motion.div>

      {/* Progress by subject */}
      <section>
        <h2 className="mb-3 text-lg font-extrabold text-white">
          Progreso por materia
        </h2>
        <Card className="space-y-4 p-5">
          {summary.subjects.map((s) => (
            <div key={s.subject.id}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-200">
                  {s.subject.icon} {s.subject.shortName}
                </span>
                <span className="font-bold text-slate-400">
                  {s.levelsCompleted}/{s.totalLevels}
                </span>
              </div>
              <ProgressBar
                value={s.percentage}
                gradient={s.subject.gradient}
                heightClass="h-2.5"
              />
            </div>
          ))}
        </Card>
      </section>

      {/* Badges */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-white">Insignias</h2>
          <span className="text-sm font-semibold text-slate-400">
            {summary.badges.length}/{BADGES.length}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {BADGES.map((badge) => {
            const earned = earnedIds.has(badge.id)
            return (
              <motion.div
                key={badge.id}
                whileHover={{ y: -3 }}
                className={`flex flex-col items-center rounded-2xl border p-3 text-center ${
                  earned
                    ? 'border-slate-700/50 bg-[#1E293B]'
                    : 'border-slate-800 bg-slate-900/40'
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl ${badge.gradient} ${
                    earned ? '' : 'opacity-25 grayscale'
                  }`}
                >
                  {badge.icon}
                </div>
                <p
                  className={`mt-2 text-[11px] font-bold leading-tight ${
                    earned ? 'text-white' : 'text-slate-500'
                  }`}
                >
                  {badge.name}
                </p>
                <p className="mt-0.5 text-[10px] leading-tight text-slate-500">
                  {earned ? badge.description : 'Bloqueada'}
                </p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Editable form */}
      <section>
        <h2 className="mb-3 text-lg font-extrabold text-white">Editar perfil</h2>
        <Card className="space-y-4 p-5">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-300">
              Nombre
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-slate-600/60 bg-slate-900/60 px-4 py-3 text-white focus:border-indigo-400 focus:outline-none"
            />
          </label>

          <div>
            <span className="mb-1.5 block text-sm font-semibold text-slate-300">
              Curso
            </span>
            <div className="grid grid-cols-3 gap-2">
              {COURSES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCourse(c)}
                  className={`rounded-xl border-2 py-2.5 text-xs font-bold transition-colors ${
                    course === c
                      ? 'border-indigo-400 bg-indigo-500/15 text-indigo-200'
                      : 'border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-300">
              Fecha objetivo PAES
            </span>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full rounded-2xl border border-slate-600/60 bg-slate-900/60 px-4 py-3 text-white focus:border-indigo-400 focus:outline-none [color-scheme:dark]"
            />
          </label>

          <Button fullWidth size="lg" onClick={handleSave} disabled={saving}>
            {saving ? 'Guardando...' : saved ? '¡Guardado! ✅' : 'Guardar cambios'}
          </Button>
        </Card>
      </section>

      <Button fullWidth variant="ghost" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </div>
  )
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string
  value: number
  icon: string
}) {
  return (
    <div className="rounded-2xl bg-slate-900/50 p-3">
      <p className="text-xl font-extrabold text-white">
        {icon} {value}
      </p>
      <p className="text-[11px] text-slate-400">{label}</p>
    </div>
  )
}
