import SetCard from './SetCard.jsx'
import { EMPIRE_THEMES, EMPIRE_IDS } from '../../themes/registry.js'
import { useSettingsStore } from '../../state/useSettingsStore.js'

// Grid of all nine empire sets. Selecting one updates settings (persisted) and
// the whole app rethemes instantly via ThemeProvider.
export default function SetPicker() {
  const themeId = useSettingsStore((s) => s.themeId)
  const setTheme = useSettingsStore((s) => s.setTheme)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {EMPIRE_IDS.map((id) => (
        <SetCard
          key={id}
          theme={EMPIRE_THEMES[id]}
          active={themeId === id}
          onSelect={setTheme}
        />
      ))}
    </div>
  )
}
