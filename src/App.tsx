import { Navigate, Route, Routes } from 'react-router-dom'
import { useApp } from './context/AppContext'
import { AppLayout } from './components/layout/AppLayout'
import { FullScreenLoader } from './components/ui/Spinner'
import { AuthPage } from './pages/AuthPage'
import { DashboardPage } from './pages/DashboardPage'
import { LevelMapPage } from './pages/LevelMapPage'
import { LevelPage } from './pages/LevelPage'
import { ProfilePage } from './pages/ProfilePage'
import type { ReactNode } from 'react'

function RequireAuth({ children }: { children: ReactNode }) {
  const { ready, isAuthenticated } = useApp()
  if (!ready) return <FullScreenLoader />
  if (!isAuthenticated) return <Navigate to="/auth" replace />
  return <>{children}</>
}

function AuthGate() {
  const { ready, isAuthenticated } = useApp()
  if (!ready) return <FullScreenLoader />
  if (isAuthenticated) return <Navigate to="/" replace />
  return <AuthPage />
}

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthGate />} />

      {/* Focused level flow (full screen, no bottom nav) */}
      <Route
        path="/nivel/:levelId"
        element={
          <RequireAuth>
            <div className="mx-auto min-h-screen w-full max-w-md bg-[#0F172A] px-4 py-6">
              <LevelPage />
            </div>
          </RequireAuth>
        }
      />

      {/* Main app shell with bottom nav */}
      <Route
        element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="/materia/:subjectId" element={<LevelMapPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
