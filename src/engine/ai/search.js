import { Chess } from 'chess.js'
import { evaluate, MATE_SCORE } from './evaluate.js'
import { orderMoves, tacticalMoves } from './moveOrdering.js'

// Negamax search with alpha-beta pruning, iterative deepening and a quiescence
// search at the leaves (captures only) to avoid the horizon effect — so the AI
// doesn't hang material by stopping its search mid-exchange. A wall-clock
// deadline lets deep levels return the best move from the last completed depth.

const ABORT = Symbol('search-abort')

function checkTime(ctx) {
  if (ctx.deadline && (ctx.nodes & 2047) === 0 && Date.now() > ctx.deadline) {
    throw ABORT
  }
}

function quiesce(chess, alpha, beta, ctx) {
  ctx.nodes++
  checkTime(ctx)
  const standPat = evaluate(chess)
  if (standPat >= beta) return beta
  if (standPat > alpha) alpha = standPat

  const caps = tacticalMoves(chess.moves({ verbose: true }))
  for (const move of caps) {
    chess.move(move)
    const score = -quiesce(chess, -beta, -alpha, ctx)
    chess.undo()
    if (score >= beta) return beta
    if (score > alpha) alpha = score
  }
  return alpha
}

function negamax(chess, depth, alpha, beta, ctx) {
  ctx.nodes++
  checkTime(ctx)
  const moves = chess.moves({ verbose: true })

  // Terminal: checkmate or stalemate.
  if (moves.length === 0) {
    if (chess.inCheck()) return -MATE_SCORE + ctx.ply // prefer faster mates
    return 0 // stalemate
  }
  if (depth <= 0) {
    return ctx.quiescence ? quiesce(chess, alpha, beta, ctx) : evaluate(chess)
  }

  const ordered = orderMoves(moves, null)
  let best = -Infinity
  for (const move of ordered) {
    chess.move(move)
    ctx.ply++
    const score = -negamax(chess, depth - 1, -beta, -alpha, ctx)
    ctx.ply--
    chess.undo()
    if (score > best) best = score
    if (best > alpha) alpha = best
    if (alpha >= beta) break // beta cutoff
  }
  return best
}

/**
 * Find the best move at the root.
 * @param {string} fen
 * @param {{depth:number, quiescence?:boolean, timeMs?:number}} opts
 * @returns {{ bestMove, score, depth, nodes, ranked }}
 *   ranked = all root moves with scores (used for difficulty sampling).
 */
export function findBestMove(fen, opts = {}) {
  const { depth = 3, quiescence = true, timeMs } = opts
  const chess = new Chess(fen)
  const rootMoves = orderMoves(chess.moves({ verbose: true }), null)
  if (rootMoves.length === 0) {
    return { bestMove: null, score: 0, depth: 0, nodes: 0, ranked: [] }
  }

  const start = Date.now()
  const ctx = { nodes: 0, ply: 0, quiescence, deadline: timeMs ? start + timeMs : null }
  let ranked = rootMoves.map((m) => ({ move: m, score: 0 }))
  let lastBestMove = null
  let completedDepth = 0

  // Iterative deepening: search depth 1..N, reusing the best move for ordering.
  for (let d = 1; d <= depth; d++) {
    try {
      const results = []
      let alpha = -Infinity
      const beta = Infinity
      const ordered = lastBestMove
        ? [
            ...rootMoves.filter((m) => m.from === lastBestMove.from && m.to === lastBestMove.to && m.promotion === lastBestMove.promotion),
            ...rootMoves.filter((m) => !(m.from === lastBestMove.from && m.to === lastBestMove.to && m.promotion === lastBestMove.promotion)),
          ]
        : rootMoves
      for (const move of ordered) {
        chess.move(move)
        ctx.ply = 1
        const score = -negamax(chess, d - 1, -beta, -alpha, ctx)
        chess.undo()
        results.push({ move, score })
        if (score > alpha) alpha = score
      }
      results.sort((a, b) => b.score - a.score)
      ranked = results
      lastBestMove = results[0].move
      completedDepth = d
      // Stop early on a forced mate.
      if (Math.abs(results[0].score) > MATE_SCORE - 100) break
      // Respect the time budget between depths too.
      if (ctx.deadline && Date.now() > ctx.deadline) break
    } catch (e) {
      if (e === ABORT) break // keep the last completed depth's ranking
      throw e
    }
  }

  return {
    bestMove: ranked[0].move,
    score: ranked[0].score,
    depth: completedDepth,
    nodes: ctx.nodes,
    ranked,
  }
}
