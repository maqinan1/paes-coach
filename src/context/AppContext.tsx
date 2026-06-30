import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type {
  LevelProgress,
  ProgressSummary,
  UserProfile,
} from '../types'
import * as api from '../services/api'
import type { AuthCredentials, ProfileUpdate } from '../services/api'
import { getState } from '../services/store'

interface AppContextValue {
  ready: boolean
  profile: UserProfile | null
  summary: ProgressSummary | null
  levelProgress: Record<string, LevelProgress>
  isAuthenticated: boolean
  login: (creds: AuthCredentials) => Promise<void>
  register: (creds: AuthCredentials) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (update: ProfileUpdate) => Promise<void>
  refresh: () => Promise<void>
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [summary, setSummary] = useState<ProgressSummary | null>(null)
  const [levelProgress, setLevelProgress] = useState<
    Record<string, LevelProgress>
  >({})

  const refresh = useCallback(async () => {
    const user = await api.getCurrentUser()
    setProfile(user)
    if (user) {
      const s = await api.getProgressSummary()
      setSummary(s)
      setProfile(s.profile)
    } else {
      setSummary(null)
    }
    setLevelProgress({ ...getState().levelProgress })
  }, [])

  useEffect(() => {
    void refresh().finally(() => setReady(true))
  }, [refresh])

  const login = useCallback(
    async (creds: AuthCredentials) => {
      await api.login(creds)
      await api.updateStreak()
      await refresh()
    },
    [refresh],
  )

  const register = useCallback(
    async (creds: AuthCredentials) => {
      await api.register(creds)
      await api.updateStreak()
      await refresh()
    },
    [refresh],
  )

  const logout = useCallback(async () => {
    await api.logout()
    setProfile(null)
    setSummary(null)
  }, [])

  const updateProfile = useCallback(
    async (update: ProfileUpdate) => {
      await api.updateProfile(update)
      await refresh()
    },
    [refresh],
  )

  const value = useMemo<AppContextValue>(
    () => ({
      ready,
      profile,
      summary,
      levelProgress,
      isAuthenticated: Boolean(profile),
      login,
      register,
      logout,
      updateProfile,
      refresh,
    }),
    [
      ready,
      profile,
      summary,
      levelProgress,
      login,
      register,
      logout,
      updateProfile,
      refresh,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within an AppProvider')
  return ctx
}
