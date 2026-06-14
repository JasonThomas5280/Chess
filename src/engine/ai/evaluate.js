import { PST, pstIndex, mirrorIndex } from './pieceSquareTables.js'

// Static evaluation in centipawns. Positive = good for the side to move
// (negamax convention). Combines material, piece-square tables (with a
// middlegame→endgame king blend), a bishop-pair bonus and doubled-pawn penalty.

const VAL = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 }
// Phase weights: how much "middlegame" material remains (max 24).
const PHASE = { p: 0, n: 1, b: 1, r: 2, q: 4, k: 0 }
const MAX_PHASE = 24

export const MATE_SCORE = 1000000

/**
 * @param {import('chess.js').Chess} chess a chess.js instance
 * @returns {number} centipawn score from the side-to-move's perspective
 */
export function evaluate(chess) {
  const board = chess.board() // rows 0..7 = rank 8..1
  let mgWhite = 0
  let mgBlack = 0
  let phase = 0
  let bishops = { w: 0, b: 0 }
  const pawnFiles = { w: new Array(8).fill(0), b: new Array(8).fill(0) }
  // King PSTs need the phase first, so collect kings and apply after.
  let kings = []

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const sq = board[row][col]
      if (!sq) continue
      const { type, color } = sq
      phase += PHASE[type]
      if (type === 'b') bishops[color]++
      if (type === 'p') pawnFiles[color][col]++

      const idx = pstIndex(row, col)
      if (type === 'k') {
        kings.push({ color, idx })
        continue
      }
      const tableIdx = color === 'w' ? idx : mirrorIndex(idx)
      const value = VAL[type] + (PST[type] ? PST[type][tableIdx] : 0)
      if (color === 'w') mgWhite += value
      else mgBlack += value
    }
  }

  // Blend king tables by phase (1 = full middlegame, 0 = endgame).
  const phaseFactor = Math.min(phase, MAX_PHASE) / MAX_PHASE
  for (const { color, idx } of kings) {
    const tableIdx = color === 'w' ? idx : mirrorIndex(idx)
    const kScore =
      PST.kMid[tableIdx] * phaseFactor + PST.kEnd[tableIdx] * (1 - phaseFactor)
    if (color === 'w') mgWhite += kScore
    else mgBlack += kScore
  }

  // Bishop pair.
  if (bishops.w >= 2) mgWhite += 30
  if (bishops.b >= 2) mgBlack += 30

  // Doubled pawn penalty.
  for (let f = 0; f < 8; f++) {
    if (pawnFiles.w[f] > 1) mgWhite -= 12 * (pawnFiles.w[f] - 1)
    if (pawnFiles.b[f] > 1) mgBlack -= 12 * (pawnFiles.b[f] - 1)
  }

  const score = mgWhite - mgBlack
  return chess.turn() === 'w' ? score : -score
}
