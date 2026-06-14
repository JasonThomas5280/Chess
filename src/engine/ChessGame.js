import { Chess } from 'chess.js'
import { START_FEN } from '../lib/constants.js'

// Thin, stable wrapper around chess.js. The rest of the app imports ONLY this —
// chess.js is never referenced elsewhere — so the rules library is a single,
// swappable seam. The wrapper also normalizes status reporting and provides a
// `clone()` the AI search uses so it never mutates the live game.
export default class ChessGame {
  constructor(fen = START_FEN) {
    this._c = new Chess(fen)
  }

  fen() {
    return this._c.fen()
  }

  turn() {
    return this._c.turn() // 'w' | 'b'
  }

  /** Verbose legal moves, optionally restricted to a single from-square. */
  legalMoves(square) {
    return square
      ? this._c.moves({ square, verbose: true })
      : this._c.moves({ verbose: true })
  }

  /** Legal destination squares from a given square (for highlight dots). */
  legalTargets(square) {
    return this.legalMoves(square).map((m) => m.to)
  }

  /**
   * Attempt a move. Accepts {from,to,promotion} or SAN string.
   * Returns the verbose move object on success, or null if illegal.
   */
  move(move) {
    try {
      return this._c.move(move)
    } catch {
      return null
    }
  }

  undo() {
    return this._c.undo()
  }

  isCheck() {
    return this._c.inCheck()
  }

  isGameOver() {
    return this._c.isGameOver()
  }

  /** Verbose move history. */
  history() {
    return this._c.history({ verbose: true })
  }

  /** Square of the side-to-move's king ('e1'), or null. */
  kingSquare(color = this.turn()) {
    const board = this._c.board()
    for (let r = 0; r < 8; r++) {
      for (let f = 0; f < 8; f++) {
        const p = board[r][f]
        if (p && p.type === 'k' && p.color === color) {
          return 'abcdefgh'[f] + (8 - r)
        }
      }
    }
    return null
  }

  /** Map of square -> {type,color} for occupied squares. */
  pieceMap() {
    const map = {}
    const board = this._c.board()
    for (let r = 0; r < 8; r++) {
      for (let f = 0; f < 8; f++) {
        const p = board[r][f]
        if (p) map['abcdefgh'[f] + (8 - r)] = { type: p.type, color: p.color }
      }
    }
    return map
  }

  /**
   * Normalized game status.
   * { over, result: 'w'|'b'|'draw'|null, reason }
   */
  status() {
    const c = this._c
    if (!c.isGameOver()) {
      return { over: false, result: null, reason: c.inCheck() ? 'check' : 'ongoing' }
    }
    if (c.isCheckmate()) {
      // Side to move is checkmated → the other side won.
      const winner = c.turn() === 'w' ? 'b' : 'w'
      return { over: true, result: winner, reason: 'checkmate' }
    }
    if (c.isStalemate())
      return { over: true, result: 'draw', reason: 'stalemate' }
    if (c.isInsufficientMaterial())
      return { over: true, result: 'draw', reason: 'insufficient' }
    if (c.isThreefoldRepetition())
      return { over: true, result: 'draw', reason: 'threefold' }
    if (c.isDraw()) return { over: true, result: 'draw', reason: 'fiftyMove' }
    return { over: true, result: 'draw', reason: 'draw' }
  }

  /** Load a new position, resetting history. */
  load(fen) {
    this._c.load(fen)
  }

  /** A detached copy at the current position — used by AI search. */
  clone() {
    return new ChessGame(this.fen())
  }
}
