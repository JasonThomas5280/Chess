import clsx from 'clsx'
import { isLightSquare } from '../../lib/squares.js'

// A single board square: base light/dark color plus highlight overlays
// (selection, last-move, legal-target dot, check ring). Pieces are rendered in
// a separate absolute layer so they can animate across squares.
export default function Square({
  square,
  onClick,
  selected,
  isLastMove,
  isTarget,
  isCapture,
  inCheck,
  showCoords,
  fileLabel,
  rankLabel,
}) {
  const light = isLightSquare(square)
  return (
    <button
      type="button"
      onClick={() => onClick(square)}
      data-square={square}
      className={clsx(
        'relative flex items-center justify-center select-none focus:outline-none',
        light ? 'bg-board-light' : 'bg-board-dark'
      )}
      style={{ aspectRatio: '1 / 1' }}
      aria-label={square}
    >
      {/* Last move tint */}
      {isLastMove && (
        <span className="pointer-events-none absolute inset-0 bg-glow/30" />
      )}
      {/* Selection ring */}
      {selected && (
        <span className="pointer-events-none absolute inset-0 ring-4 ring-inset ring-accent shadow-glow" />
      )}
      {/* Check ring */}
      {inCheck && (
        <span className="pointer-events-none absolute inset-1 rounded-full bg-red-500/40 ring-2 ring-red-400 animate-pulse-ring" />
      )}
      {/* Legal target indicator */}
      {isTarget &&
        (isCapture ? (
          <span className="pointer-events-none absolute inset-1 rounded-full ring-4 ring-accent/70" />
        ) : (
          <span className="pointer-events-none absolute h-1/4 w-1/4 rounded-full bg-accent/60" />
        ))}
      {/* Coordinate labels */}
      {showCoords && fileLabel && (
        <span className="pointer-events-none absolute bottom-0.5 right-1 text-[0.55rem] font-semibold opacity-50 mix-blend-overlay">
          {fileLabel}
        </span>
      )}
      {showCoords && rankLabel && (
        <span className="pointer-events-none absolute top-0.5 left-1 text-[0.55rem] font-semibold opacity-50 mix-blend-overlay">
          {rankLabel}
        </span>
      )}
    </button>
  )
}
