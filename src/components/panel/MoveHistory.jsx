import { useMemo } from 'react'
import clsx from 'clsx'
import { useGameStore } from '../../state/useGameStore.js'
import { toMoveRows } from '../../engine/notation.js'

// Two-column SAN move list. Clicking a move jumps the board to that ply (review).
export default function MoveHistory() {
  const history = useGameStore((s) => s.history)
  const viewPly = useGameStore((s) => s.viewPly)
  const jumpTo = useGameStore((s) => s.jumpTo)
  const rows = useMemo(() => toMoveRows(history), [history])

  const cell = (ply, san) =>
    san ? (
      <button
        onClick={() => jumpTo(ply - 1)}
        className={clsx(
          'rounded px-1.5 py-0.5 text-left font-mono text-sm transition hover:bg-accent/20',
          viewPly === ply - 1 && 'bg-accent/30 text-accent'
        )}
      >
        {san}
      </button>
    ) : (
      <span />
    )

  return (
    <div className="glass flex h-full flex-col rounded-xl p-3">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-display text-sm uppercase tracking-widest text-accent">
          Moves
        </h3>
        {viewPly !== null && (
          <button
            onClick={() => jumpTo(null)}
            className="rounded bg-accent/20 px-2 py-0.5 text-xs text-accent hover:bg-accent/40"
          >
            ⟲ Live
          </button>
        )}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        {rows.length === 0 ? (
          <p className="px-1 py-2 text-sm text-white/40">No moves yet.</p>
        ) : (
          <ol className="space-y-0.5">
            {rows.map((r) => (
              <li
                key={r.number}
                className="grid grid-cols-[1.6rem_1fr_1fr] items-center gap-1"
              >
                <span className="text-xs text-white/40">{r.number}.</span>
                {cell(r.whitePly, r.white)}
                {cell(r.blackPly, r.black)}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}
