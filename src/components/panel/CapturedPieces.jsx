import { useMemo } from 'react'
import Piece from '../board/Piece.jsx'
import { useGameStore } from '../../state/useGameStore.js'
import { fenToPieceMap } from '../../lib/fen.js'
import { PIECE_VALUES } from '../../lib/constants.js'

const FULL = { p: 8, n: 2, b: 2, r: 2, q: 1 }

// Shows pieces each side has captured plus the running material advantage,
// derived by diffing the current position against a full starting army.
export default function CapturedPieces() {
  const fen = useGameStore((s) => s.fen)

  const { whiteCaps, blackCaps, advantage } = useMemo(() => {
    const map = fenToPieceMap(fen)
    const live = { w: {}, b: {} }
    for (const { type, color } of Object.values(map)) {
      if (type === 'k') continue
      live[color][type] = (live[color][type] || 0) + 1
    }
    const capturedFrom = (color) => {
      const out = []
      for (const t of ['q', 'r', 'b', 'n', 'p']) {
        const missing = FULL[t] - (live[color][t] || 0)
        for (let i = 0; i < missing; i++) out.push(t)
      }
      return out
    }
    // Pieces captured BY white are black pieces missing, and vice versa.
    const blackMissing = capturedFrom('b')
    const whiteMissing = capturedFrom('w')
    const score = (arr) => arr.reduce((s, t) => s + PIECE_VALUES[t], 0)
    return {
      whiteCaps: blackMissing, // white captured these black pieces
      blackCaps: whiteMissing,
      advantage: Math.round((score(blackMissing) - score(whiteMissing)) / 100),
    }
  }, [fen])

  const Row = ({ caps, color, label, diff }) => (
    <div className="flex min-h-[1.5rem] items-center gap-1">
      <span className="w-10 shrink-0 text-xs uppercase tracking-wider text-white/40">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-0.5">
        {caps.map((t, i) => (
          <span key={i} className="h-5 w-5">
            <Piece type={t} color={color} glow={false} />
          </span>
        ))}
        {diff > 0 && (
          <span className="ml-1 text-xs font-semibold text-accent">+{diff}</span>
        )}
      </div>
    </div>
  )

  return (
    <div className="glass space-y-1 rounded-xl px-3 py-2">
      <Row caps={whiteCaps} color="b" label="White" diff={advantage} />
      <Row caps={blackCaps} color="w" label="Black" diff={-advantage} />
    </div>
  )
}
