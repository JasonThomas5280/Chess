// Shared contract for all themed piece SVG components.
//
// Every empire exports a map keyed by chess.js piece letters:
//   { k: King, q: Queen, r: Rook, b: Bishop, n: Knight, p: Pawn }
//
// Each component accepts:
//   color:     'w' | 'b'   — which side; selects --white-piece / --black-piece fill
//   size:      number       — pixel size of the square SVG viewport (default 100%)
//   className: string       — extra classes (e.g. glow drop-shadow)
//
// The SVG fill is ALWAYS driven by CSS custom properties so a single path serves
// both colors and every empire palette without re-authoring.

export const PIECE_LETTERS = ['k', 'q', 'r', 'b', 'n', 'p']

/** Resolve the body fill + outline stroke colors for a given side. */
export function pieceFill(color) {
  return color === 'w' ? 'var(--white-piece)' : 'var(--black-piece)'
}

/** A contrasting outline so dark pieces read on dark squares and vice-versa. */
export function pieceStroke(color) {
  return color === 'w'
    ? 'rgba(40,26,12,0.55)'
    : 'rgba(255,244,220,0.35)'
}
