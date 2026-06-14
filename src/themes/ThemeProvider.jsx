import { useEffect } from 'react'
import { getTheme } from './registry.js'
import { useSettingsStore } from '../state/useSettingsStore.js'

// Reads the active empire from settings and writes its palette to CSS custom
// properties on :root, so the entire app (board, glow, gradients) rethemes
// instantly with no component remounts.
export default function ThemeProvider({ children }) {
  const themeId = useSettingsStore((s) => s.themeId)

  useEffect(() => {
    const { palette } = getTheme(themeId)
    const root = document.documentElement
    const map = {
      '--light-sq': palette.lightSquare,
      '--dark-sq': palette.darkSquare,
      '--board-border': palette.boardBorder,
      '--white-piece': palette.whitePiece,
      '--black-piece': palette.blackPiece,
      '--accent': palette.accent,
      '--glow': palette.glow,
      '--bg-from': palette.bgFrom,
      '--bg-to': palette.bgTo,
    }
    for (const [k, v] of Object.entries(map)) root.style.setProperty(k, v)
    root.style.setProperty('color-scheme', 'dark')
  }, [themeId])

  return children
}
