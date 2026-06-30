import type {
  Attempt,
  LevelProgress,
  StreakLog,
  StudySession,
  UserBadge,
  UserProfile,
} from '../types'
import { SUBJECTS } from '../data/subjects'
import { getLevelsBySubject } from '../data/content'

// ============================================================================
// In-memory store with localStorage persistence.
// This stands in for the real backend database while the frontend is developed.
// ============================================================================

export interface AppState {
  profile: UserProfile | null
  levelProgress: Record<string, LevelProgress>
  attempts: Attempt[]
  streakLogs: StreakLog[]
  userBadges: UserBadge[]
  sessions: StudySession[]
}

const STORAGE_KEY = 'paes-coach-state-v1'

const emptyState = (): AppState => ({
  profile: null,
  levelProgress: {},
  attempts: [],
  streakLogs: [],
  userBadges: [],
  sessions: [],
})

let state: AppState = load()

function load(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as AppState
  } catch {
    // ignore corrupt storage
  }
  return emptyState()
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // storage may be unavailable; keep working in-memory
  }
}

export const getState = (): AppState => state

export function setState(patch: Partial<AppState>) {
  state = { ...state, ...patch }
  persist()
}

export function resetState() {
  state = emptyState()
  persist()
}

/** Builds the default per-subject level progress (first level open, rest locked). */
export function buildInitialProgress(): Record<string, LevelProgress> {
  const progress: Record<string, LevelProgress> = {}
  for (const subject of SUBJECTS) {
    const levels = getLevelsBySubject(subject.id)
    levels.forEach((level, idx) => {
      progress[level.id] = {
        levelId: level.id,
        subjectId: subject.id,
        status: idx === 0 ? 'in_progress' : 'locked',
        bestPercentage: 0,
        attempts: 0,
        completedAt: null,
      }
    })
  }
  return progress
}

export const todayISO = (): string => new Date().toISOString().slice(0, 10)
