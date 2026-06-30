import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'

/** Mobile-first shell: centered column with a floating bottom nav. */
export function AppLayout() {
  return (
    <div className="relative mx-auto min-h-screen w-full max-w-md bg-[#0F172A]">
      <div className="px-4 pt-6 pb-28">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  )
}
