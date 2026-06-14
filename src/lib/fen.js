// Lightweight FEN parsing for rendering arbitrary positions (e.g. reviewing a
// past ply or previewing puzzle/endgame positions) without spinning up the
// full rules engine.

import { coordsToSquare } from './squares.js'

/** Parse a FEN's piece-placement field into { square: {type, color} }. */
export function fenToPieceMap(fen) {
  const map = {}
  const placement = fen.split(' ')[0]
  const rows = placement.split('/')
  for (let r = 0; r < 8; r++) {
    const rank = 7 - r // row 0 = rank 8
    let file = 0
    for (const ch of rows[r]) {
      if (/\d/.test(ch)) {
        file += Number(ch)
      } else {
        const color = ch === ch.toUpperCase() ? 'w' : 'b'
        const type = ch.toLowerCase()
        map[coordsToSquare(file, rank)] = { type, color }
        file += 1
      }
    }
  }
  return map
}

/** Side to move from a FEN ('w' | 'b'). */
export function fenTurn(fen) {
  return fen.split(' ')[1] || 'w'
}
