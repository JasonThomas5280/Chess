import { Outlet } from 'react-router-dom'
import Background from './Background.jsx'
import NavBar from './NavBar.jsx'

// Page frame: animated background, nav, and routed content.
export default function AppShell() {
  return (
    <div className="flex min-h-full flex-col">
      <Background />
      <NavBar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-3 pb-24 pt-4 md:pb-8">
        <Outlet />
      </main>
    </div>
  )
}
