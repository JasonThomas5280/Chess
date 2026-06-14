import { describe, it, expect } from 'vitest'
import {
  squareToCoords,
  coordsToSquare,
  squareToIndex,
  indexToSquare,
  isLightSquare,
  allSquares,
} from './squares.js'

describe('squares', () => {
  it('round-trips square <-> coords', () => {
    for (const sq of allSquares()) {
      const { file, rank } = squareToCoords(sq)
      expect(coordsToSquare(file, rank)).toBe(sq)
    }
  })

  it('maps corners correctly for white orientation', () => {
    expect(squareToIndex('a8', 'w')).toBe(0)
    expect(squareToIndex('h8', 'w')).toBe(7)
    expect(squareToIndex('a1', 'w')).toBe(56)
    expect(squareToIndex('h1', 'w')).toBe(63)
  })

  it('round-trips index <-> square in both orientations', () => {
    for (const orientation of ['w', 'b']) {
      for (let i = 0; i < 64; i++) {
        const sq = indexToSquare(i, orientation)
        expect(squareToIndex(sq, orientation)).toBe(i)
      }
    }
  })

  it('flips the board for black orientation', () => {
    expect(squareToIndex('a8', 'b')).toBe(63)
    expect(squareToIndex('h1', 'b')).toBe(0)
  })

  it('identifies light and dark squares', () => {
    // a1 is a dark square, h1 is light.
    expect(isLightSquare('a1')).toBe(false)
    expect(isLightSquare('h1')).toBe(true)
    expect(isLightSquare('e4')).toBe(true)
    expect(isLightSquare('e5')).toBe(false)
  })

  it('produces 64 unique squares', () => {
    const sqs = allSquares()
    expect(sqs).toHaveLength(64)
    expect(new Set(sqs).size).toBe(64)
    expect(sqs[0]).toBe('a8')
    expect(sqs[63]).toBe('h1')
  })
})
