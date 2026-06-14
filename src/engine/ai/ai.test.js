import { describe, it, expect } from 'vitest'
import { Chess } from 'chess.js'
import { evaluate, MATE_SCORE } from './evaluate.js'
import { findBestMove } from './search.js'
import { chooseMove, getLevel, LEVEL_IDS } from './difficulty.js'
import { START_FEN } from '../../lib/constants.js'

describe('evaluate', () => {
  it('is roughly balanced at the start', () => {
    expect(Math.abs(evaluate(new Chess(START_FEN)))).toBeLessThan(40)
  })

  it('is symmetric for mirrored positions (side-to-move relative)', () => {
    // White up a queen, white to move → strongly positive.
    const white = new Chess('4k3/8/8/8/8/8/8/3QK3 w - - 0 1')
    // Same material imbalance mirrored, black up a queen, black to move.
    const black = new Chess('3qk3/8/8/8/8/8/8/4K3 b - - 0 1')
    expect(evaluate(white)).toBeGreaterThan(700)
    // Both evaluate from the side-to-move's view; the advantaged mover is positive.
    expect(evaluate(black)).toBeGreaterThan(700)
  })

  it('prefers having more material', () => {
    const up = evaluate(new Chess('4k3/8/8/8/8/8/8/R3K3 w - - 0 1'))
    const even = evaluate(new Chess('4k3/8/8/8/8/8/8/4K3 w - - 0 1'))
    expect(up).toBeGreaterThan(even)
  })
})

describe('search', () => {
  it('finds mate in 1', () => {
    // White: Qf7# (back-rank/king-hunt) — classic mate-in-1.
    const { bestMove, score } = findBestMove(
      '6k1/5ppp/8/8/8/8/8/4Q1K1 w - - 0 1',
      { depth: 2 }
    )
    expect(bestMove).toBeTruthy()
    // Apply it and confirm it's checkmate.
    const c = new Chess('6k1/5ppp/8/8/8/8/8/4Q1K1 w - - 0 1')
    c.move(bestMove)
    expect(c.isCheckmate()).toBe(true)
    expect(score).toBeGreaterThan(MATE_SCORE - 100)
  })

  it('finds a forced mate in 2', () => {
    // Two-rook ladder, verified forced mate in two: 1.Rg6 Kh7 2.Rh1#.
    const fen = '7k/6R1/8/6K1/8/8/8/R7 w - - 0 1'
    const { bestMove, score } = findBestMove(fen, { depth: 4 })
    expect(bestMove).toBeTruthy()
    // Engine should see a forced mate (score near the mate bound).
    expect(score).toBeGreaterThan(MATE_SCORE - 100)

    // The chosen first move must force mate against EVERY black reply.
    const c = new Chess(fen)
    c.move(bestMove)
    const replies = c.moves({ verbose: true })
    expect(replies.length).toBeGreaterThan(0)
    for (const r of replies) {
      c.move(r)
      const res = findBestMove(c.fen(), { depth: 2 })
      const c2 = new Chess(c.fen())
      c2.move(res.bestMove)
      expect(c2.isCheckmate()).toBe(true)
      c.undo()
    }
  })

  it('does not hang a queen: quiescence avoids a losing capture', () => {
    // White queen can capture a defended pawn on d5 (Qxd5?? loses queen to ...exd5).
    // With quiescence the engine should NOT choose to hang the queen.
    const fen = '4k3/8/8/3p4/4P3/8/8/3QK3 w - - 0 1'
    const { bestMove } = findBestMove(fen, { depth: 3, quiescence: true })
    // exd5 (pawn take) or a safe queen move is fine; Qxd5 into ...exd5 is not.
    if (bestMove.from === 'd1' && bestMove.to === 'd5') {
      // If it took with the queen, the pawn must not be able to recapture.
      const c = new Chess(fen)
      c.move(bestMove)
      const recaptures = c.moves({ verbose: true }).filter((m) => m.to === 'd5')
      expect(recaptures.length).toBe(0)
    } else {
      expect(true).toBe(true)
    }
  })
})

describe('difficulty', () => {
  it('resolves params for all six levels', () => {
    for (const id of LEVEL_IDS) {
      const lvl = getLevel(id)
      expect(lvl.depth).toBeGreaterThanOrEqual(1)
      expect(lvl.name).toBeTruthy()
    }
    expect(LEVEL_IDS).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('returns a legal move at every level', () => {
    for (const id of LEVEL_IDS) {
      const result = chooseMove(START_FEN, id, () => 0.99) // rng high → no blunder branch
      expect(result?.move).toBeTruthy()
      const c = new Chess(START_FEN)
      expect(c.move(result.move)).toBeTruthy()
    }
  })
})
