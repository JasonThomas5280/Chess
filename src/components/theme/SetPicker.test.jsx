import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SetPicker from './SetPicker.jsx'
import { useSettingsStore } from '../../state/useSettingsStore.js'

describe('SetPicker', () => {
  beforeEach(() => {
    useSettingsStore.setState({ themeId: 'mali' })
  })

  it('renders a card for all nine empires', () => {
    render(<SetPicker />)
    expect(screen.getByText('Mali Empire')).toBeInTheDocument()
    expect(screen.getByText('Ancient Egypt')).toBeInTheDocument()
    expect(screen.getByText('Zulu Kingdom')).toBeInTheDocument()
    expect(screen.getByText('Great Zimbabwe')).toBeInTheDocument()
  })

  it('selecting a set updates the persisted theme', () => {
    render(<SetPicker />)
    fireEvent.click(screen.getByText('Ancient Egypt'))
    expect(useSettingsStore.getState().themeId).toBe('egypt')
  })
})
