import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Board from './Board.jsx'
import { useGameStore } from '../../state/useGameStore.js'
import { START_FEN } from '../../lib/constants.js'

// Regression guard for the desktop "zero-size board" bug: the board must size
// itself with a concrete viewport-based width, NOT rely on `w-full` against a
// shrink-to-fit flex parent (which collapses to 0px on desktop). jsdom can't
// measure pixels, so we assert the className uses a self-contained width token.
describe('Board sizing', () => {
  it('renders 64 squares', () => {
    useGameStore.getState().reset(START_FEN)
    const { container } = render(<Board />)
    expect(container.querySelectorAll('[data-square]')).toHaveLength(64)
  })

  it('uses a concrete viewport width, not w-full alone', () => {
    useGameStore.getState().reset(START_FEN)
    const { container } = render(<Board />)
    const root = container.firstChild
    const cls = root.getAttribute('class') || ''
    // Must carry an explicit min()-based width so it cannot collapse.
    expect(cls).toMatch(/w-\[min\(/)
    expect(cls).toContain('aspect-square')
  })
})
