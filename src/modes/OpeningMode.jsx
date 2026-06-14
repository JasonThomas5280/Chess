import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import GameLayout from '../components/layout/GameLayout.jsx'
import MoveHistory from '../components/panel/MoveHistory.jsx'
import Button from '../components/ui/Button.jsx'
import { useOpening } from '../hooks/useOpening.js'
import { OPENINGS } from '../data/openings.js'

// Openings trainer with Learn (auto-step + commentary) and Drill (play the book
// moves from memory) modes.
export default function OpeningMode() {
  const [index, setIndex] = useState(0)
  const [mode, setMode] = useState('learn')
  const opening = OPENINGS[index]
  const { ply, currentComment, feedback, complete, step, restart, total } =
    useOpening(opening, mode)

  return (
    <GameLayout
      top={
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display text-lg text-gradient">{opening.name}</span>
          <span className="rounded bg-white/10 px-2 py-0.5 text-xs text-white/70">
            {opening.eco}
          </span>
          <span className="text-sm text-white/60">
            You play {opening.color === 'w' ? 'White' : 'Black'}
          </span>
          <div className="ml-auto flex gap-1">
            <ModeChip id="learn" mode={mode} setMode={setMode} label="Learn" />
            <ModeChip id="drill" mode={mode} setMode={setMode} label="Drill" />
          </div>
        </div>
      }
      side={
        <>
          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-white">
                {mode === 'learn' ? 'Walkthrough' : 'Test Yourself'}
              </h3>
              <span className="text-xs text-white/60">
                {Math.min(ply, total)}/{total}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={currentComment}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-2 min-h-[3rem] text-sm leading-snug text-white/80"
              >
                {currentComment}
              </motion.p>
            </AnimatePresence>

            {mode === 'drill' && feedback.message && (
              <div
                className={clsx(
                  'mt-2 rounded-lg px-3 py-2 text-sm font-semibold',
                  feedback.kind === 'success' && 'bg-emerald-500/20 text-emerald-200',
                  feedback.kind === 'error' && 'bg-red-500/20 text-red-200',
                  feedback.kind === 'info' && 'bg-white/10 text-white/80'
                )}
              >
                {feedback.message}
              </div>
            )}

            {complete && (
              <div className="mt-2 rounded-lg bg-accent/20 px-3 py-2 text-sm font-semibold text-accent">
                🎉 Line complete! {mode === 'learn' ? 'Try the Drill to test yourself.' : 'Mastered.'}
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              {mode === 'learn' && (
                <Button variant="primary" onClick={step} disabled={complete}>
                  Step →
                </Button>
              )}
              <Button variant="ghost" onClick={restart}>↺ Restart</Button>
            </div>
          </div>

          {/* Opening list */}
          <div className="glass rounded-xl p-3">
            <ul className="grid grid-cols-1 gap-1">
              {OPENINGS.map((o, i) => (
                <li key={o.id}>
                  <button
                    onClick={() => setIndex(i)}
                    className={clsx(
                      'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition',
                      i === index ? 'bg-accent/20 text-accent' : 'text-white/70 hover:bg-white/10'
                    )}
                  >
                    <span>{o.name}</span>
                    <span className="text-xs opacity-60">{o.color === 'w' ? '♔' : '♚'}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <MoveHistory />
        </>
      }
    />
  )
}

function ModeChip({ id, mode, setMode, label }) {
  return (
    <button
      onClick={() => setMode(id)}
      className={clsx(
        'rounded-full px-4 py-1 text-xs font-semibold transition',
        mode === id ? 'bg-accent text-black' : 'bg-white/10 text-white/70 hover:bg-white/20'
      )}
    >
      {label}
    </button>
  )
}
