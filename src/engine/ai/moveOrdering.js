// Move ordering — this is what makes alpha-beta actually prune. We try the most
// promising moves first: the PV/previous-best move, then captures ordered by
// MVV-LVA (most valuable victim, least valuable attacker), then promotions,
// then quiet moves.

const VICTIM = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 20 }

export function scoreMove(move, pvMove) {
  if (pvMove && move.from === pvMove.from && move.to === pvMove.to) {
    return 100000
  }
  let s = 0
  if (move.captured) {
    s += 1000 + VICTIM[move.captured] * 10 - VICTIM[move.piece]
  }
  if (move.promotion) {
    s += 800 + VICTIM[move.promotion]
  }
  return s
}

/** Return a new array of moves sorted best-first. */
export function orderMoves(moves, pvMove) {
  return [...moves].sort((a, b) => scoreMove(b, pvMove) - scoreMove(a, pvMove))
}

/** Captures and promotions only, for quiescence search. */
export function tacticalMoves(moves) {
  return moves
    .filter((m) => m.captured || m.promotion)
    .sort((a, b) => scoreMove(b) - scoreMove(a))
}
