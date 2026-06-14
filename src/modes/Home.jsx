import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Piece from '../components/board/Piece.jsx'
import { getTheme } from '../themes/registry.js'
import { useSettingsStore } from '../state/useSettingsStore.js'

const MODES = [
  { to: '/play', title: 'Play', icon: '♚', desc: 'Battle the engine across six levels of skill.' },
  { to: '/puzzles', title: 'Puzzles', icon: '✦', desc: 'Sharpen your tactics — forks, pins and forced mates.' },
  { to: '/endgames', title: 'Endgames', icon: '♜', desc: 'Master the technique of K+Q, K+R and pawn endings.' },
  { to: '/openings', title: 'Openings', icon: '♟', desc: 'Learn and drill the great opening systems.' },
  { to: '/sets', title: 'Chess Sets', icon: '◈', desc: 'Choose from nine African empire piece sets.' },
]

export default function Home() {
  const themeId = useSettingsStore((s) => s.themeId)
  const theme = getTheme(themeId)

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl glass px-6 py-10 text-center md:py-14">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl font-extrabold text-gradient md:text-6xl"
        >
          African Empires Chess
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-3 max-w-2xl text-white/75 md:text-lg"
        >
          A visually stunning chess experience. Command the armies of Mali,
          Egypt, the Zulu Kingdom and six more great civilizations — and grow
          from novice to master.
        </motion.p>

        {/* Floating piece row of the active set */}
        <div className="mt-6 flex items-end justify-center gap-1 md:gap-2">
          {['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'].map((t, i) => (
            <motion.span
              key={i}
              className="h-10 w-10 md:h-14 md:w-14"
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.05, type: 'spring' }}
            >
              <Piece type={t} color={i % 2 ? 'b' : 'w'} />
            </motion.span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            to="/play"
            className="rounded-xl bg-accent px-6 py-3 font-display font-bold text-black shadow-glow transition hover:scale-105"
          >
            ▶ Play Now
          </Link>
          <Link
            to="/sets"
            className="rounded-xl bg-white/10 px-6 py-3 font-display font-bold text-white transition hover:bg-white/20"
          >
            Browse Sets — {theme.name}
          </Link>
        </div>
      </section>

      {/* Mode cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MODES.map((m, i) => (
          <motion.div
            key={m.to}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Link
              to={m.to}
              className="group flex h-full flex-col gap-2 rounded-2xl glass p-5 transition hover:border-accent/60 hover:shadow-glow"
            >
              <span className="text-3xl text-accent drop-shadow-[0_0_10px_var(--glow)]">
                {m.icon}
              </span>
              <h2 className="font-display text-xl font-bold text-white">{m.title}</h2>
              <p className="text-sm text-white/70">{m.desc}</p>
              <span className="mt-auto pt-2 text-sm font-semibold text-accent opacity-0 transition group-hover:opacity-100">
                Enter →
              </span>
            </Link>
          </motion.div>
        ))}
      </section>
    </div>
  )
}
