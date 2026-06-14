import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import GameLayout from '../components/layout/GameLayout.jsx'
import GameControls from '../components/controls/GameControls.jsx'
import Button from '../components/ui/Button.jsx'
import { usePuzzle } from '../hooks/usePuzzle.js'
import { PUZZLES, PUZZLE_TYPES } from '../data/puzzles.js'

// Tactics trainer. Pick a puzzle, find the winning move(s); the board validates
// your solution and auto-plays the opponent's scripted replies.
export default function PuzzleMode() {
  const [filter, setFilter] = useState('all')
  const list = useMemo(
    () => (filter === 'all' ? PUZZLES : PUZZLES.filter((p) => p.type === filter)),
    [filter]
  )
  const [index, setIndex] = useState(0)
  const puzzle = list[index] || PUZZLES[0]
  const { feedback, solved, hintShown, showHint, loadPuzzle } = usePuzzle(puzzle)

  useEffect(() => {
    setIndex(0)
  }, [filter])

  const next = () => {
    const ni = (index + 1) % list.length
    setIndex(ni)
  }

  return (
    <GameLayout
      top={
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-display text-lg text-gradient">Tactics Trainer</span>
          <div className="ml-auto flex flex-wrap gap-1">
            <FilterChip id="all" filter={filter} setFilter={setFilter} label="All" />
            {PUZZLE_TYPES.map((t) => (
              <FilterChip key={t.id} id={t.id} filter={filter} setFilter={setFilter} label={t.label} />
            ))}
          </div>
        </div>
      }
      side={
        <>
          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-white">{puzzle.title}</h3>
              <span className="rounded bg-white/10 px-2 py-0.5 text-xs text-white/70">
                {'★'.repeat(puzzle.difficulty)}
              </span>
            </div>
            <p className="mt-1 text-sm text-white/70">
              {puzzle.sideToMove === 'w' ? 'White' : 'Black'} to move ·{' '}
              {labelForType(puzzle.type, puzzle.n)}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={feedback.kind + feedback.message}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={clsx(
                  'mt-3 rounded-lg px-3 py-2 text-sm font-semibold',
                  feedback.kind === 'success' && 'bg-emerald-500/20 text-emerald-200',
                  feedback.kind === 'error' && 'bg-red-500/20 text-red-200',
                  feedback.kind === 'info' && 'bg-white/10 text-white/80'
                )}
              >
                {feedback.message}
              </motion.div>
            </AnimatePresence>

            {hintShown && (
              <p className="mt-2 text-sm italic text-accent">💡 {puzzle.hint}</p>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="ghost" onClick={showHint} disabled={hintShown}>
                💡 Hint
              </Button>
              <Button variant="ghost" onClick={() => loadPuzzle(puzzle)}>
                ↺ Retry
              </Button>
              <Button variant="primary" onClick={next}>
                Next →
              </Button>
            </div>
          </div>

          <div className="glass rounded-xl p-3 text-sm text-white/70">
            Puzzle {index + 1} of {list.length}
            {solved && <span className="ml-2 text-emerald-300">✓ Solved</span>}
          </div>

          <GameControls canUndo={false} />
        </>
      }
    />
  )
}

function FilterChip({ id, filter, setFilter, label }) {
  return (
    <button
      onClick={() => setFilter(id)}
      className={clsx(
        'rounded-full px-3 py-1 text-xs font-semibold transition',
        filter === id ? 'bg-accent text-black' : 'bg-white/10 text-white/70 hover:bg-white/20'
      )}
    >
      {label}
    </button>
  )
}

function labelForType(type, n) {
  if (type === 'mateInN') return `Mate in ${n}`
  if (type === 'winMaterial') return 'Win material'
  return 'Best move'
}
