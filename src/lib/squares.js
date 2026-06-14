// Square coordinate helpers. We use algebraic notation ('e4') as the canonical
// square id everywhere (matching chess.js), with helpers to convert to/from
// file/rank indices for board layout math.

import { FILES, RANKS } from './constants.js'

// 'a8' is index 0 (top-left from white's perspective), 'h1' is index 63.
// This matches a row-major grid where row 0 = rank 8.

/** Convert algebraic square -> { file: 0-7, rank: 0-7 } where rank 0 = rank '1'. */
export function squareToCoords(square) {
  const file = square.charCodeAt(0) - 97 // 'a' -> 0
  const rank = square.charCodeAt(1) - 49 // '1' -> 0
  return { file, rank }
}

/** Convert { file, rank } (rank 0 = '1') -> algebraic square. */
export function coordsToSquare(file, rank) {
  return FILES[file] + RANKS[rank]
}

/**
 * Convert algebraic square -> grid index 0..63 for a given board orientation.
 * orientation 'w': a8 = 0 (top-left). orientation 'b': board is flipped.
 */
export function squareToIndex(square, orientation = 'w') {
  const { file, rank } = squareToCoords(square)
  if (orientation === 'w') {
    return (7 - rank) * 8 + file
  }
  return rank * 8 + (7 - file)
}

/** Convert grid index 0..63 -> algebraic square for a given orientation. */
export function indexToSquare(index, orientation = 'w') {
  const row = Math.floor(index / 8)
  const col = index % 8
  if (orientation === 'w') {
    const rank = 7 - row
    const file = col
    return coordsToSquare(file, rank)
  }
  const rank = row
  const file = 7 - col
  return coordsToSquare(file, rank)
}

/** True if the square is a light square. */
export function isLightSquare(square) {
  const { file, rank } = squareToCoords(square)
  return (file + rank) % 2 === 1
}

/** All 64 squares in a8..h1 order. */
export function allSquares() {
  const out = []
  for (let rank = 7; rank >= 0; rank--) {
    for (let file = 0; file < 8; file++) {
      out.push(coordsToSquare(file, rank))
    }
  }
  return out
}
