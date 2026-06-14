import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'
import ThemeProvider from './themes/ThemeProvider.jsx'

// Integration smoke test: every route must mount without throwing. This catches
// broken imports/wiring across all five modes that unit tests would miss.
function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MemoryRouter>
  )
}

describe('App routes', () => {
  it('renders the Home menu', () => {
    renderAt('/')
    expect(screen.getAllByText('African Empires Chess').length).toBeGreaterThan(0)
    expect(screen.getByText('▶ Play Now')).toBeInTheDocument()
  })

  it('renders Play mode with a board', () => {
    const { container } = renderAt('/play')
    expect(screen.getByText('Difficulty')).toBeInTheDocument()
    // 64 squares rendered.
    expect(container.querySelectorAll('[data-square]').length).toBe(64)
  })

  it('renders Puzzles mode', () => {
    renderAt('/puzzles')
    expect(screen.getByText('Tactics Trainer')).toBeInTheDocument()
  })

  it('renders Endgames mode', () => {
    renderAt('/endgames')
    expect(screen.getAllByText('Queen vs King').length).toBeGreaterThan(0)
  })

  it('renders Openings mode', () => {
    renderAt('/openings')
    expect(screen.getAllByText('Italian Game').length).toBeGreaterThan(0)
  })

  it('renders the Sets picker', () => {
    renderAt('/sets')
    expect(screen.getByText('Choose Your Empire')).toBeInTheDocument()
  })
})
