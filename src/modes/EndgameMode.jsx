import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import GameLayout from '../components/layout/GameLayout.jsx'
import GameStatus from '../components/panel/GameStatus.jsx'
import MoveHistory from '../components/panel/MoveHistory.jsx'
import GameControls from '../components/controls/GameControls.jsx'
import Button from '../components/ui/Button.jsx'
import { useEndgame } from '../hooks/useEndgame.js'
import { ENDGAMES, ENDGAME_CATEGORIES } from '../data/endgames.js'

// Endgame practice: load a scenario, play it out against the defending engine,
// and reach the goal within the move budget.
export default function EndgameMode() {
  const [cat, setCat] = useState('all')
  const list = useMemo(
    () => (cat === 'all' ? ENDGAMES : ENDGAMES.filter((e) => e.category === cat)),
    [cat]
  )
  const [index, setIndex] = useState(0)
  const scenario = list[index] || ENDGAMES[0]
  const { result, movesUsed, aiThinking, reload } = useEndgame(scenario)

  const select = (i) => setIndex(i)

  return (
    <GameLayout
      top={<GameStatus aiThinking={aiThinking} />}
      side={
        <>
          <div className="glass rounded-xl p-4">
            <h3 className="font-display text-base font-bold text-white">{scenario.name}</h3>
            <p className="mt-1 text-sm leading-snug text-white/70">{scenario.instructions}</p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-white/60">
                Goal: <span className="font-semibold text-accent">{scenario.goal}</span>
              </span>
              <span className={clsx('font-semibold', movesUsed > scenario.maxMoves ? 'text-red-300' : 'text-white/70')}>
                {movesUsed}/{scenario.maxMoves} moves
              </span>
            </div>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={clsx(
                    'mt-3 rounded-lg px-3 py-2 text-sm font-semibold',
                    result === 'success' ? 'bg-emerald-500/20 text-emerald-200' : 'bg-red-500/20 text-red-200'
                  )}
                >
                  {result === 'success' ? '✓ Goal achieved — well done!' : '✗ Not this time. Try again.'}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-3">
              <Button variant="primary" onClick={reload}>↺ Restart Position</Button>
            </div>
          </div>

          {/* Scenario list */}
          <div className="glass rounded-xl p-3">
            <div className="mb-2 flex flex-wrap gap-1">
              <Chip id="all" cat={cat} setCat={(c) => { setCat(c); setIndex(0) }} label="All" />
              {ENDGAME_CATEGORIES.map((c) => (
                <Chip key={c.id} id={c.id} cat={cat} setCat={(x) => { setCat(x); setIndex(0) }} label={c.label} />
              ))}
            </div>
            <ul className="space-y-1">
              {list.map((e, i) => (
                <li key={e.id}>
                  <button
                    onClick={() => select(i)}
                    className={clsx(
                      'w-full rounded-lg px-3 py-2 text-left text-sm transition',
                      i === index ? 'bg-accent/20 text-accent' : 'text-white/70 hover:bg-white/10'
                    )}
                  >
                    {e.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <GameControls undoPlies={2} />
          <MoveHistory />
        </>
      }
    />
  )
}

function Chip({ id, cat, setCat, label }) {
  return (
    <button
      onClick={() => setCat(id)}
      className={clsx(
        'rounded-full px-3 py-1 text-xs font-semibold transition',
        cat === id ? 'bg-accent text-black' : 'bg-white/10 text-white/70 hover:bg-white/20'
      )}
    >
      {label}
    </button>
  )
}
