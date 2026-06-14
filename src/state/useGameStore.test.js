import { describe, it, expect, beforeEach } from 'vitest'
import { useGameStore } from './useGameStore.js'
import { START_FEN } from '../lib/constants.js'

const s = () => useGameStore.getState()

describe('useGameStore', () => {
  beforeEach(() => {
    s().reset(START_FEN, { mode: 'play', orientation: 'w' })
  })

  it('selecting a piece exposes its legal targets', () => {
    s().selectSquare('e2')
    expect(s().selectedSquare).toBe('e2')
    expect(s().legalTargets).toContain('e4')
    expect(s().legalTargets).toContain('e3')
  })

  it('clicking a legal target makes the move and clears selection', () => {
    s().selectSquare('e2')
    s().selectSquare('e4')
    expect(s().selectedSquare).toBeNull()
    expect(s().turn).toBe('b')
    expect(s().pieces['e4']).toMatchObject({ type: 'p', color: 'w' })
    expect(s().pieces['e2']).toBeUndefined()
    expect(s().lastMove).toEqual({ from: 'e2', to: 'e4' })
  })

  it('rejects selecting the opponent’s piece', () => {
    s().selectSquare('e7') // black, but white to move
    expect(s().selectedSquare).toBeNull()
    expect(s().legalTargets).toHaveLength(0)
  })

  it('applyMove accepts SAN and grows history + fen stack', () => {
    s().applyMove('e4')
    s().applyMove('e5')
    expect(s().history).toHaveLength(2)
    expect(s().fenStack).toHaveLength(3) // start + 2 plies
  })

  it('undo reverts the last move', () => {
    s().applyMove('e4')
    const after = s().fen
    s().undo()
    expect(s().fen).toBe(START_FEN)
    expect(s().fen).not.toBe(after)
    expect(s().history).toHaveLength(0)
  })

  it('detects a promotion and surfaces a promotion choice', () => {
    s().reset('8/P7/8/8/8/8/8/4k1K1 w - - 0 1', { mode: 'play' })
    const applied = s().attemptMove('a7', 'a8')
    expect(applied).toBeNull() // waits for choice
    expect(s().promotion).toMatchObject({ from: 'a7', to: 'a8', color: 'w' })
    s().choosePromotion('q')
    expect(s().pieces['a8']).toMatchObject({ type: 'q', color: 'w' })
    expect(s().promotion).toBeNull()
  })

  it('jumpTo enters review mode and returns to live', () => {
    s().applyMove('e4')
    s().applyMove('e5')
    s().jumpTo(0) // view after white's first move
    expect(s().viewPly).toBe(0)
    s().jumpTo(null)
    expect(s().viewPly).toBeNull()
  })
})
