// Shared chess constants used across the engine, UI and data layers.

export const START_FEN =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

export const COLORS = { WHITE: 'w', BLACK: 'b' }

// chess.js piece-type letters.
export const PIECE_TYPES = ['p', 'n', 'b', 'r', 'q', 'k']

// Centipawn material values used by the evaluation function and material diff UI.
export const PIECE_VALUES = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
}

export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
export const RANKS = ['1', '2', '3', '4', '5', '6', '7', '8']

// Display names for pieces (used in aria labels / tooltips).
export const PIECE_NAMES = {
  p: 'Pawn',
  n: 'Knight',
  b: 'Bishop',
  r: 'Rook',
  q: 'Queen',
  k: 'King',
}
