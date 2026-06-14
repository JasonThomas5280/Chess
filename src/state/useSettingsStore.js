import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_THEME_ID, EMPIRE_THEMES } from '../themes/registry.js'

// User preferences persisted to localStorage: chosen empire set, difficulty,
// sound and display toggles.
export const useSettingsStore = create(
  persist(
    (set) => ({
      themeId: DEFAULT_THEME_ID,
      difficultyLevel: 3,
      soundEnabled: false,
      showCoordinates: true,
      showLegalDots: true,

      setTheme: (themeId) => {
        if (EMPIRE_THEMES[themeId]) set({ themeId })
      },
      setDifficulty: (difficultyLevel) => set({ difficultyLevel }),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleCoordinates: () =>
        set((s) => ({ showCoordinates: !s.showCoordinates })),
      toggleLegalDots: () => set((s) => ({ showLegalDots: !s.showLegalDots })),
    }),
    {
      name: 'aec-settings',
      partialize: (s) => ({
        themeId: s.themeId,
        difficultyLevel: s.difficultyLevel,
        soundEnabled: s.soundEnabled,
        showCoordinates: s.showCoordinates,
        showLegalDots: s.showLegalDots,
      }),
    }
  )
)
