import type {
  Attempt,
  Badge,
  CheckLevelCompletionResult,
  CourseLevel,
  ProgressSummary,
  SubjectSummary,
  SubmitAnswerResult,
  UpdateStreakResult,
  UserProfile,
} from '../types'
import { SUBJECTS } from '../data/subjects'
import { BADGES, getBadge } from '../data/badges'
import {
  getExercise,
  getExercisesByLevel,
  getLevel,
  getLevelsBySubject,
  LEVELS,
} from '../data/content'
import {
  buildInitialProgress,
  getState,
  resetState,
  setState,
  todayISO,
} from './store'

// ============================================================================
// Mock API — async functions that simulate the existing PAES backend.
// Every call returns a Promise with a small artificial latency.
// ============================================================================

const PASS_THRESHOLD = 60

const delay = <T>(value: T, ms = 350): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms))

const uid = (prefix: string) =>
  `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`

// ----------------------------------------------------------------------------
// Auth
// ----------------------------------------------------------------------------

export interface AuthCredentials {
  email: string
  password: string
  name?: string
}

function createDefaultProfile(email: string, name: string): UserProfile {
  const target = new Date()
  target.setMonth(11, 1) // Dec 1st (typical PAES window)
  if (target < new Date()) target.setFullYear(target.getFullYear() + 1)
  return {
    id: uid('user'),
    name,
    email,
    avatarUrl: '',
    course: '4to medio',
    targetDate: target.toISOString().slice(0, 10),
    totalXp: 0,
    currentStreak: 0,
    longestStreak: 0,
    createdAt: new Date().toISOString(),
  }
}

export async function register(creds: AuthCredentials): Promise<UserProfile> {
  resetState()
  const profile = createDefaultProfile(
    creds.email,
    creds.name?.trim() || 'Estudiante',
  )
  setState({
    profile,
    levelProgress: buildInitialProgress(),
    attempts: [],
    streakLogs: [],
    userBadges: [],
    sessions: [],
  })
  return delay(profile, 500)
}

export async function login(creds: AuthCredentials): Promise<UserProfile> {
  const existing = getState().profile
  if (existing && existing.email === creds.email) {
    return delay(existing, 500)
  }
  // Demo behaviour: any login bootstraps a fresh profile.
  return register({ ...creds, name: existing?.name ?? 'Estudiante' })
}

export async function logout(): Promise<void> {
  return delay(undefined, 150)
}

export async function getCurrentUser(): Promise<UserProfile | null> {
  return delay(getState().profile, 150)
}

// ----------------------------------------------------------------------------
// Core gameplay endpoints
// ----------------------------------------------------------------------------

/** Records an answer and returns whether it was correct plus the explanation. */
export async function submitAnswer(
  exerciseId: string,
  selectedOption: number,
): Promise<SubmitAnswerResult> {
  const exercise = getExercise(exerciseId)
  if (!exercise) throw new Error(`Exercise not found: ${exerciseId}`)

  const correct = selectedOption === exercise.correctOption

  const attempt: Attempt = {
    id: uid('att'),
    exerciseId,
    selectedOption,
    correct,
    createdAt: new Date().toISOString(),
  }
  // Keep only the latest attempt per exercise for clean scoring.
  const attempts = [
    ...getState().attempts.filter((a) => a.exerciseId !== exerciseId),
    attempt,
  ]
  setState({ attempts })

  return delay({
    correct,
    explanation: exercise.explanation,
    correctOption: exercise.correctOption,
  })
}

/** Scores a level, awards XP, unlocks the next level and grants badges. */
export async function checkLevelCompletion(
  levelId: string,
): Promise<CheckLevelCompletionResult> {
  const level = getLevel(levelId)
  if (!level) throw new Error(`Level not found: ${levelId}`)

  const exercises = getExercisesByLevel(levelId)
  const attempts = getState().attempts
  const correctCount = exercises.filter((ex) => {
    const a = attempts.find((at) => at.exerciseId === ex.id)
    return a?.correct
  }).length

  const percentage =
    exercises.length === 0
      ? 0
      : Math.round((correctCount / exercises.length) * 100)
  const passed = percentage >= PASS_THRESHOLD

  const state = getState()
  const progress = { ...state.levelProgress }
  const current = progress[levelId]
  const wasCompleted = current?.status === 'completed'

  let xpEarned = 0
  if (current) {
    progress[levelId] = {
      ...current,
      attempts: current.attempts + 1,
      bestPercentage: Math.max(current.bestPercentage, percentage),
      status: passed ? 'completed' : 'in_progress',
      completedAt: passed
        ? (current.completedAt ?? new Date().toISOString())
        : current.completedAt,
    }
  }

  if (passed && !wasCompleted) {
    xpEarned = level.xpReward
    // Unlock the next level in the same subject.
    const subjectLevels = getLevelsBySubject(level.subjectId)
    const idx = subjectLevels.findIndex((l) => l.id === levelId)
    const next = subjectLevels[idx + 1]
    if (next && progress[next.id]?.status === 'locked') {
      progress[next.id] = { ...progress[next.id], status: 'in_progress' }
    }
  }

  // Record the study session.
  const session = {
    id: uid('ses'),
    subjectId: level.subjectId,
    levelId,
    startedAt: new Date().toISOString(),
    endedAt: new Date().toISOString(),
    xpEarned,
    correctCount,
    totalCount: exercises.length,
  }

  const profile = state.profile
    ? { ...state.profile, totalXp: state.profile.totalXp + xpEarned }
    : state.profile

  setState({
    levelProgress: progress,
    sessions: [...state.sessions, session],
    profile,
  })

  evaluateBadges(percentage === 100 && passed)

  return delay({ passed, xpEarned, percentage })
}

/** Logs activity for today and recomputes the consecutive-day streak. */
export async function updateStreak(): Promise<UpdateStreakResult> {
  const state = getState()
  const today = todayISO()

  const logs = state.streakLogs.some((l) => l.date === today)
    ? state.streakLogs
    : [...state.streakLogs, { date: today, xpEarned: 0 }]

  const dates = new Set(logs.map((l) => l.date))
  let streak = 0
  const cursor = new Date()
  // Count back day by day while a log exists.
  while (dates.has(cursor.toISOString().slice(0, 10))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }

  const profile = state.profile
    ? {
        ...state.profile,
        currentStreak: streak,
        longestStreak: Math.max(state.profile.longestStreak, streak),
      }
    : state.profile

  setState({ streakLogs: logs, profile })
  evaluateBadges(false)

  return delay({ currentStreak: streak })
}

// ----------------------------------------------------------------------------
// Profile + summary
// ----------------------------------------------------------------------------

export interface ProfileUpdate {
  name?: string
  course?: CourseLevel
  targetDate?: string
  avatarUrl?: string
}

export async function updateProfile(update: ProfileUpdate): Promise<UserProfile> {
  const state = getState()
  if (!state.profile) throw new Error('No authenticated user')
  const profile = { ...state.profile, ...update }
  setState({ profile })
  return delay(profile, 300)
}

export async function getProgressSummary(): Promise<ProgressSummary> {
  const state = getState()
  if (!state.profile) throw new Error('No authenticated user')

  const subjects: SubjectSummary[] = SUBJECTS.map((subject) => {
    const levels = getLevelsBySubject(subject.id)
    const completed = levels.filter(
      (l) => state.levelProgress[l.id]?.status === 'completed',
    ).length
    return {
      subject,
      levelsCompleted: completed,
      totalLevels: levels.length,
      percentage:
        levels.length === 0
          ? 0
          : Math.round((completed / levels.length) * 100),
    }
  })

  const totalLevels = LEVELS.length
  const completedLevels = Object.values(state.levelProgress).filter(
    (p) => p.status === 'completed',
  ).length
  const overallPercentage =
    totalLevels === 0 ? 0 : Math.round((completedLevels / totalLevels) * 100)

  const unlocked = new Map(state.userBadges.map((ub) => [ub.badgeId, ub]))
  const badges = state.userBadges
    .map((ub) => {
      const badge = getBadge(ub.badgeId)
      return badge ? { ...badge, unlockedAt: ub.unlockedAt } : null
    })
    .filter((b): b is Badge & { unlockedAt: string } => Boolean(b))
  const lockedBadges = BADGES.filter((b) => !unlocked.has(b.id))

  return delay({
    profile: state.profile,
    overallPercentage,
    totalLevels,
    completedLevels,
    subjects,
    badges,
    lockedBadges,
  })
}

// ----------------------------------------------------------------------------
// Badge evaluation
// ----------------------------------------------------------------------------

function unlockBadge(badgeId: string) {
  const state = getState()
  if (state.userBadges.some((b) => b.badgeId === badgeId)) return
  setState({
    userBadges: [
      ...state.userBadges,
      { badgeId, unlockedAt: new Date().toISOString() },
    ],
  })
}

/** Re-checks badge conditions and unlocks any newly earned badge. */
function evaluateBadges(perfectLevel: boolean) {
  const state = getState()
  const profile = state.profile
  if (!profile) return

  if (profile.totalXp >= 100) unlockBadge('first-100-xp')
  if (profile.totalXp >= 500) unlockBadge('xp-500')
  if (profile.currentStreak >= 7) unlockBadge('streak-7')
  if (profile.currentStreak >= 30) unlockBadge('streak-30')
  if (perfectLevel) unlockBadge('perfect-level')

  const anyCompleted = Object.values(state.levelProgress).some(
    (p) => p.status === 'completed',
  )
  if (anyCompleted) unlockBadge('first-level')

  const lenguajeDone = getLevelsBySubject('lenguaje').every(
    (l) => state.levelProgress[l.id]?.status === 'completed',
  )
  if (lenguajeDone) unlockBadge('lenguaje-master')

  const mathDone = getLevelsBySubject('matematica-m1').every(
    (l) => state.levelProgress[l.id]?.status === 'completed',
  )
  if (mathDone) unlockBadge('math-pro')
}
