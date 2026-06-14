import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Square from './Square.jsx'
import Piece from './Piece.jsx'
import PromotionDialog from './PromotionDialog.jsx'
import { useGameStore, selectDisplayFen } from '../../state/useGameStore.js'
import { useSettingsStore } from '../../state/useSettingsStore.js'
import { fenToPieceMap } from '../../lib/fen.js'
import { allSquares, squareToCoords } from '../../lib/squares.js'

// Renders the 8x8 board, a separate absolute piece layer (so pieces animate
// independently of the square grid) and the promotion dialog. Reads everything
// from the game store; works identically across all game modes.
export default function Board({ interactive = true }) {
  const orientation = useGameStore((s) => s.orientation)
  const selectedSquare = useGameStore((s) => s.selectedSquare)
  const legalTargets = useGameStore((s) => s.legalTargets)
  const lastMove = useGameStore((s) => s.lastMove)
  const checkSquare = useGameStore((s) => s.checkSquare)
  const viewPly = useGameStore((s) => s.viewPly)
  const livePieces = useGameStore((s) => s.pieces)
  const displayFen = useGameStore(selectDisplayFen)
  const selectSquare = useGameStore((s) => s.selectSquare)

  const showCoords = useSettingsStore((s) => s.showCoordinates)
  const showLegalDots = useSettingsStore((s) => s.showLegalDots)

  // Reviewing a past ply → derive pieces from the historical FEN (read-only).
  const reviewing = viewPly !== null
  const pieces = useMemo(
    () => (reviewing ? fenToPieceMap(displayFen) : livePieces),
    [reviewing, displayFen, livePieces]
  )

  const squares = useMemo(() => {
    const list = allSquares()
    return orientation === 'w' ? list : [...list].reverse()
  }, [orientation])

  const canClick = interactive && !reviewing
  const handleClick = (sq) => canClick && selectSquare(sq)

  // Position helper: percentage offset for a square given orientation.
  const posFor = (square) => {
    const { file, rank } = squareToCoords(square)
    const col = orientation === 'w' ? file : 7 - file
    const row = orientation === 'w' ? 7 - rank : rank
    return { left: `${col * 12.5}%`, top: `${row * 12.5}%` }
  }

  return (
    <div className="relative w-full max-w-[min(92vw,72vh)] aspect-square select-none">
      <div className="relative h-full w-full overflow-hidden rounded-xl border-4 border-board-border shadow-glow-lg">
        {/* Square grid */}
        <div className="grid h-full w-full grid-cols-8">
          {squares.map((sq) => {
            const { file, rank } = squareToCoords(sq)
            const targeted = legalTargets.includes(sq)
            return (
              <Square
                key={sq}
                square={sq}
                onClick={handleClick}
                selected={selectedSquare === sq}
                isLastMove={
                  lastMove && (lastMove.from === sq || lastMove.to === sq)
                }
                isTarget={showLegalDots && targeted}
                isCapture={targeted && !!pieces[sq]}
                inCheck={checkSquare === sq}
                showCoords={showCoords}
                fileLabel={
                  (orientation === 'w' ? rank === 0 : rank === 7)
                    ? 'abcdefgh'[file]
                    : null
                }
                rankLabel={
                  (orientation === 'w' ? file === 0 : file === 7)
                    ? String(rank + 1)
                    : null
                }
              />
            )
          })}
        </div>

        {/* Piece layer */}
        <div className="pointer-events-none absolute inset-0">
          <AnimatePresence>
            {Object.entries(pieces).map(([sq, p]) => (
              <motion.div
                key={`${sq}`}
                className="absolute flex items-center justify-center"
                style={{ width: '12.5%', height: '12.5%', ...posFor(sq) }}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              >
                <div className="h-[88%] w-[88%]">
                  <Piece type={p.type} color={p.color} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <PromotionDialog />
      </div>
    </div>
  )
}
