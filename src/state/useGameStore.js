import { create } from 'zustand'
import ChessGame from '../engine/ChessGame.js'
import { START_FEN } from '../lib/constants.js'

// Central game state. Holds the single live ChessGame instance (kept outside
// React state — it's mutable) and exposes derived snapshots the UI subscribes to.
// Every mode (play, puzzle, endgame, opening) drives the same store, so the
// Board component is identical everywhere.

function snapshot(game) {
  return {
    fen: game.fen(),
    turn: game.turn(),
    pieces: game.pieceMap(),
    history: game.history(),
    status: game.status(),
    checkSquare: game.isCheck() ? game.kingSquare() : null,
  }
}

export const useGameStore = create((set, get) => ({
  game: new ChessGame(START_FEN),
  ...snapshot(new ChessGame(START_FEN)),

  // FEN snapshot per ply (index 0 = start) for O(1) "jump to ply" review.
  fenStack: [START_FEN],
  viewPly: null, // null = live; number = reviewing a past ply (read-only board)

  orientation: 'w',
  selectedSquare: null,
  legalTargets: [],
  lastMove: null, // {from, to}
  mode: 'play',
  aiThinking: false,
  promotion: null, // {from, to, color} when a promotion choice is pending

  // ---- selection / move attempts -------------------------------------------

  selectSquare: (square) => {
    const { game, selectedSquare, turn, viewPly } = get()
    if (viewPly !== null) return // board is in review mode
    const pieces = game.pieceMap()

    // Clicking a legal target of the current selection → attempt the move.
    if (selectedSquare && get().legalTargets.includes(square)) {
      get().attemptMove(selectedSquare, square)
      return
    }
    // Select own piece.
    const piece = pieces[square]
    if (piece && piece.color === turn) {
      set({ selectedSquare: square, legalTargets: game.legalTargets(square) })
    } else {
      set({ selectedSquare: null, legalTargets: [] })
    }
  },

  clearSelection: () => set({ selectedSquare: null, legalTargets: [] }),

  /**
   * Attempt a move from->to. If it's a pawn reaching the last rank, opens the
   * promotion dialog instead of moving immediately (unless `promotion` given).
   * Returns the applied move object or null.
   */
  attemptMove: (from, to, promotion) => {
    const { game } = get()
    const piece = game.pieceMap()[from]
    const isPromo =
      piece &&
      piece.type === 'p' &&
      ((piece.color === 'w' && to[1] === '8') ||
        (piece.color === 'b' && to[1] === '1'))

    if (isPromo && !promotion) {
      set({ promotion: { from, to, color: piece.color } })
      return null
    }
    const move = game.move({ from, to, promotion: promotion || undefined })
    if (!move) {
      set({ selectedSquare: null, legalTargets: [] })
      return null
    }
    set((s) => ({
      ...snapshot(game),
      fenStack: [...s.fenStack, game.fen()],
      viewPly: null,
      selectedSquare: null,
      legalTargets: [],
      lastMove: { from: move.from, to: move.to },
      promotion: null,
    }))
    return move
  },

  /** Apply an engine/scripted move (SAN or object) without UI selection. */
  applyMove: (move) => {
    const { game } = get()
    const applied = game.move(move)
    if (!applied) return null
    set((s) => ({
      ...snapshot(game),
      fenStack: [...s.fenStack, game.fen()],
      viewPly: null,
      lastMove: { from: applied.from, to: applied.to },
      selectedSquare: null,
      legalTargets: [],
    }))
    return applied
  },

  choosePromotion: (pieceType) => {
    const { promotion } = get()
    if (!promotion) return
    get().attemptMove(promotion.from, promotion.to, pieceType)
  },

  cancelPromotion: () => set({ promotion: null, selectedSquare: null, legalTargets: [] }),

  undo: () => {
    const { game } = get()
    const undone = game.undo()
    if (!undone) return
    set((s) => {
      const fenStack = s.fenStack.slice(0, -1)
      const hist = game.history()
      const prev = hist[hist.length - 1]
      return {
        ...snapshot(game),
        fenStack,
        viewPly: null,
        lastMove: prev ? { from: prev.from, to: prev.to } : null,
        selectedSquare: null,
        legalTargets: [],
        aiThinking: false,
      }
    })
  },

  setOrientation: (orientation) => set({ orientation }),
  flipOrientation: () =>
    set((s) => ({ orientation: s.orientation === 'w' ? 'b' : 'w' })),

  setAiThinking: (aiThinking) => set({ aiThinking }),
  setMode: (mode) => set({ mode }),

  /** Review a past ply (read-only). Pass null to return to the live position. */
  jumpTo: (ply) => {
    const { fenStack } = get()
    if (ply === null || ply >= fenStack.length - 1) {
      set({ viewPly: null })
      return
    }
    set({ viewPly: ply })
  },

  /** Reset to a FEN (or the standard start), wiping history. */
  reset: (fen = START_FEN, opts = {}) => {
    const game = new ChessGame(fen)
    set({
      game,
      ...snapshot(game),
      fenStack: [fen],
      viewPly: null,
      selectedSquare: null,
      legalTargets: [],
      lastMove: null,
      promotion: null,
      aiThinking: false,
      orientation: opts.orientation || get().orientation,
      mode: opts.mode || get().mode,
    })
  },
}))

/** The FEN currently shown on the board (live or a reviewed ply). */
export function selectDisplayFen(state) {
  if (state.viewPly === null) return state.fen
  return state.fenStack[state.viewPly + 1] ?? state.fen
}
