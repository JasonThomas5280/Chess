import { getTheme } from '../../themes/registry.js'
import { useSettingsStore } from '../../state/useSettingsStore.js'

// Resolves the active empire's SVG component for a given piece type and renders
// it with a soft glow. `themeId` may be passed explicitly (e.g. SetCard previews).
export default function Piece({ type, color, themeId, className = '', glow = true }) {
  const activeTheme = useSettingsStore((s) => s.themeId)
  const { pieces } = getTheme(themeId || activeTheme)
  const Comp = pieces[type]
  if (!Comp) return null
  return (
    <Comp
      color={color}
      className={`${glow ? 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]' : ''} ${className}`}
    />
  )
}
