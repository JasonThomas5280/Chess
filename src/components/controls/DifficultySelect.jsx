import clsx from 'clsx'
import { LEVELS, LEVEL_IDS } from '../../engine/ai/difficulty.js'
import { useSettingsStore } from '../../state/useSettingsStore.js'

// Difficulty picker (1–6). Persisted to settings.
export default function DifficultySelect() {
  const level = useSettingsStore((s) => s.difficultyLevel)
  const setLevel = useSettingsStore((s) => s.setDifficulty)

  return (
    <div className="glass rounded-xl p-3">
      <h3 className="mb-2 font-display text-sm uppercase tracking-widest text-accent">
        Difficulty
      </h3>
      <div className="grid grid-cols-3 gap-1.5">
        {LEVEL_IDS.map((id) => (
          <button
            key={id}
            onClick={() => setLevel(id)}
            className={clsx(
              'flex flex-col items-center rounded-lg px-2 py-1.5 text-xs transition',
              level === id
                ? 'bg-accent/90 text-black shadow-glow-sm'
                : 'bg-white/5 text-white/70 hover:bg-white/15'
            )}
          >
            <span className="text-base font-bold">{id}</span>
            <span className="leading-tight">{LEVELS[id].name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
