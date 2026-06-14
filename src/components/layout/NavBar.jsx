import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { getTheme } from '../../themes/registry.js'
import { useSettingsStore } from '../../state/useSettingsStore.js'

const LINKS = [
  { to: '/play', label: 'Play', icon: '♚' },
  { to: '/puzzles', label: 'Puzzles', icon: '✦' },
  { to: '/endgames', label: 'Endgames', icon: '♜' },
  { to: '/openings', label: 'Openings', icon: '♟' },
  { to: '/sets', label: 'Sets', icon: '◈' },
]

// Top nav on desktop, bottom bar on mobile. Shows the active empire.
export default function NavBar() {
  const themeId = useSettingsStore((s) => s.themeId)
  const theme = getTheme(themeId)

  const linkClass = ({ isActive }) =>
    clsx(
      'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition',
      isActive
        ? 'bg-accent/90 text-black shadow-glow-sm'
        : 'text-white/70 hover:bg-white/10 hover:text-white'
    )

  return (
    <header className="sticky top-0 z-20">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2 md:my-3 md:rounded-2xl">
        <NavLink to="/" className="flex items-center gap-2 pr-2">
          <span className="text-2xl text-accent drop-shadow-[0_0_8px_var(--glow)]">♛</span>
          <span className="hidden font-display text-lg font-bold text-gradient sm:block">
            African Empires Chess
          </span>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              <span aria-hidden>{l.icon}</span>
              {l.label}
            </NavLink>
          ))}
        </div>

        <NavLink
          to="/sets"
          className="hidden items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/15 lg:flex"
          title="Change chess set"
        >
          <span className="h-3 w-3 rounded-full" style={{ background: theme.palette.accent }} />
          {theme.name}
        </NavLink>
      </nav>

      {/* Mobile bottom bar */}
      <div className="glass fixed inset-x-0 bottom-0 z-20 flex items-center justify-around px-2 py-1.5 md:hidden">
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              clsx(
                'flex flex-col items-center rounded-lg px-2 py-1 text-[0.65rem] font-semibold transition',
                isActive ? 'text-accent' : 'text-white/60'
              )
            }
          >
            <span className="text-lg" aria-hidden>{l.icon}</span>
            {l.label}
          </NavLink>
        ))}
      </div>
    </header>
  )
}
