import { describe, it, expect } from 'vitest'
import { Chess } from 'chess.js'
import { PUZZLES } from './puzzles.js'
import { ENDGAMES } from './endgames.js'
import { OPENINGS } from './openings.js'

// Guards against bad authored data — the most likely failure source for the
// trainer modes. Every FEN must parse and every scripted move must be legal
// when replayed; mate puzzles must actually end in checkmate.

describe('puzzle data', () => {
  it('has a healthy number of puzzles', () => {
    expect(PUZZLES.length).toBeGreaterThanOrEqual(20)
  })

  it('every puzzle FEN is valid and matches its sideToMove', () => {
    for (const p of PUZZLES) {
      const c = new Chess(p.fen)
      expect(c.turn(), p.id).toBe(p.sideToMove)
      expect(c.isGameOver(), `${p.id} already over`).toBe(false)
    }
  })

  it('every solution line is legal and mate puzzles end in checkmate', () => {
    for (const p of PUZZLES) {
      const c = new Chess(p.fen)
      let ri = 0
      for (let i = 0; i < p.solution.length; i++) {
        expect(c.move(p.solution[i]), `${p.id} sol ${p.solution[i]}`).toBeTruthy()
        if (i < p.solution.length - 1 && p.replies[ri]) {
          expect(c.move(p.replies[ri]), `${p.id} reply`).toBeTruthy()
          ri++
        }
      }
      if (p.type === 'mateInN') {
        expect(c.isCheckmate(), `${p.id} should be mate`).toBe(true)
      }
    }
  })
})

describe('endgame data', () => {
  it('covers basic mates, rook and pawn endings', () => {
    const cats = new Set(ENDGAMES.map((e) => e.category))
    expect(cats.has('basic-mate')).toBe(true)
    expect(cats.has('rook')).toBe(true)
    expect(cats.has('pawn')).toBe(true)
  })

  it('every endgame FEN is valid, not finished, with the player to move', () => {
    for (const e of ENDGAMES) {
      const c = new Chess(e.fen)
      expect(c.turn(), e.id).toBe(e.playerColor)
      expect(c.isGameOver(), `${e.id} already over`).toBe(false)
      expect(['checkmate', 'promote', 'draw', 'win']).toContain(e.goal)
    }
  })
})

describe('opening data', () => {
  it('has several openings, each with a non-trivial line', () => {
    expect(OPENINGS.length).toBeGreaterThanOrEqual(6)
    for (const o of OPENINGS) {
      expect(o.line.length, o.id).toBeGreaterThanOrEqual(6)
      expect(['w', 'b']).toContain(o.color)
    }
  })

  it('every opening line is legal from the start position', () => {
    for (const o of OPENINGS) {
      const c = new Chess()
      for (const node of o.line) {
        expect(c.move(node.move), `${o.id}: ${node.move}`).toBeTruthy()
      }
    }
  })
})
