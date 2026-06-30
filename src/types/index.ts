// ============================================================================
// PAES Coach — Domain types
// Mirror of the (already existing) backend entities.
// ============================================================================

export type SubjectId =
  | 'lenguaje'
  | 'matematica-m1'
  | 'matematica-m2'
  | 'historia'
  | 'ciencias'

/** A PAES subject area (Lenguaje, Matemática M1, etc.). */
export interface Subject {
  id: SubjectId
  name: string
  shortName: string
  icon: string
  /** Tailwind gradient classes used for cards / level path. */
  gradient: string
  /** Base hex color for the subject, used for rings, fills and glows. */
  color: string
  description: string
}

export type LevelStatus = 'locked' | 'in_progress' | 'completed'

/** A single learning level inside a subject. */
export interface Level {
  id: string
  subjectId: SubjectId
  order: number
  title: string
  /** Markdown theory content shown before the exercises. */
  theory_content_md: string
  exerciseIds: string[]
  xpReward: number
}

/** A multiple-choice exercise. Always has exactly 4 options. */
export interface Exercise {
  id: string
  levelId: string
  question: string
  options: string[]
  /** Index (0-3) of the correct option. */
  correctOption: number
  explanation: string
}

/** A user's answer to a single exercise. */
export interface Attempt {
  id: string
  exerciseId: string
  selectedOption: number
  correct: boolean
  createdAt: string
}

/** Per-level progress tracking for the current user. */
export interface LevelProgress {
  levelId: string
  subjectId: SubjectId
  status: LevelStatus
  /** Best score percentage achieved (0-100). */
  bestPercentage: number
  attempts: number
  completedAt: string | null
}

/** A daily log entry feeding the streak counter. */
export interface StreakLog {
  date: string // YYYY-MM-DD
  xpEarned: number
}

/** A badge definition that can be awarded to a user. */
export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  /** Tailwind gradient used for the badge medal. */
  gradient: string
}

/** Join between a user and a badge they unlocked. */
export interface UserBadge {
  badgeId: string
  unlockedAt: string
}

/** A study session record (one level run). */
export interface StudySession {
  id: string
  subjectId: SubjectId
  levelId: string
  startedAt: string
  endedAt: string | null
  xpEarned: number
  correctCount: number
  totalCount: number
}

export type CourseLevel = '3ro medio' | '4to medio' | 'Egresado'

/** The authenticated user's profile. */
export interface UserProfile {
  id: string
  name: string
  email: string
  avatarUrl: string
  course: CourseLevel
  /** Target PAES date (ISO yyyy-mm-dd). */
  targetDate: string
  totalXp: number
  currentStreak: number
  longestStreak: number
  createdAt: string
}

// ----------------------------------------------------------------------------
// API response shapes
// ----------------------------------------------------------------------------

export interface SubmitAnswerResult {
  correct: boolean
  explanation: string
  correctOption: number
}

export interface CheckLevelCompletionResult {
  passed: boolean
  xpEarned: number
  percentage: number
}

export interface UpdateStreakResult {
  currentStreak: number
}

export interface SubjectSummary {
  subject: Subject
  levelsCompleted: number
  totalLevels: number
  percentage: number
}

export interface ProgressSummary {
  profile: UserProfile
  /** 0-100 overall PAES readiness. */
  overallPercentage: number
  totalLevels: number
  completedLevels: number
  subjects: SubjectSummary[]
  badges: (Badge & { unlockedAt: string })[]
  lockedBadges: Badge[]
}
