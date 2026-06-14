import { describe, it, expect } from 'vitest'
import { Chess } from 'chess.js'
import ChessGame from './ChessGame.js'
import { START_FEN } from '../lib/constants.js'

describe('ChessGame', () => {
  it('starts in the standard position with white to move', () => {
    const g = new ChessGame()
    expect(g.fen()).toBe(START_FEN)
    expect(g.turn()).toBe('w')
    expect(g.legalMoves()).toHaveLength(20)
  })

  it('legal move generation matches chess.js for several positions', () => {
    const fens = [
      START_FEN,
      'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
      '8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1', // en passant / pins
      'r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1', // castling both sides
    ]
    for (const fen of fens) {
      const ref = new Chess(fen).moves({ verbose: true }).map((m) => m.san).sort()
      const got = new ChessGame(fen).legalMoves().map((m) => m.san).sort()
      expect(got).toEqual(ref)
    }
  })

  it('applies castling, en passant and promotion correctly', () => {
    // Kingside castle.
    const g1 = new ChessGame(
      'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 1'
    )
    expect(g1.move({ from: 'e1', to: 'g1' })).toBeTruthy()
    expect(g1.pieceMap()['g1']).toMatchObject({ type: 'k', color: 'w' })
    expect(g1.pieceMap()['f1']).toMatchObject({ type: 'r', color: 'w' })

    // En passant capture.
    const g2 = new ChessGame('8/8/8/3pP3/8/8/8/4k1K1 w - d6 0 1')
    const ep = g2.move({ from: 'e5', to: 'd6' })
    expect(ep).toBeTruthy()
    expect(g2.pieceMap()['d5']).toBeUndefined()
    expect(g2.pieceMap()['d6']).toMatchObject({ type: 'p', color: 'w' })

    // Promotion to queen.
    const g3 = new ChessGame('8/P7/8/8/8/8/8/4k1K1 w - - 0 1')
    const promo = g3.move({ from: 'a7', to: 'a8', promotion: 'q' })
    expect(promo).toBeTruthy()
    expect(g3.pieceMap()['a8']).toMatchObject({ type: 'q', color: 'w' })
  })

  it('rejects illegal moves', () => {
    const g = new ChessGame()
    expect(g.move({ from: 'e2', to: 'e5' })).toBeNull()
    expect(g.move({ from: 'e1', to: 'e2' })).toBeNull() // king onto own pawn
  })

  it('detects checkmate (Fool’s Mate)', () => {
    const g = new ChessGame()
    g.move('f3')
    g.move('e5')
    g.move('g4')
    g.move('Qh4#')
    const s = g.status()
    expect(s.over).toBe(true)
    expect(s.reason).toBe('checkmate')
    expect(s.result).toBe('b')
  })

  it('detects stalemate', () => {
    const g = new ChessGame('7k/5Q2/6K1/8/8/8/8/8 b - - 0 1')
    const s = g.status()
    expect(s.over).toBe(true)
    expect(s.reason).toBe('stalemate')
    expect(s.result).toBe('draw')
  })

  it('detects insufficient material', () => {
    const g = new ChessGame('8/8/8/4k3/8/8/4K3/8 w - - 0 1')
    expect(g.status()).toMatchObject({ over: true, reason: 'insufficient', result: 'draw' })
  })

  it('reports check without ending the game', () => {
    // Black queen on h4 checks the white king on e1, but the king can flee.
    const g = new ChessGame('4k3/8/8/8/7q/8/4P3/4K3 w - - 0 1')
    expect(g.isCheck()).toBe(true)
    expect(g.status()).toMatchObject({ over: false, reason: 'check' })
  })

  it('finds the king square and clones without sharing state', () => {
    const g = new ChessGame()
    expect(g.kingSquare('w')).toBe('e1')
    const c = g.clone()
    c.move('e4')
    expect(c.fen()).not.toBe(g.fen())
    expect(g.fen()).toBe(START_FEN)
  })
})
