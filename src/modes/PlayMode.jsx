import { useEffect, useState } from 'react'
import GameLayout from '../components/layout/GameLayout.jsx'
import GameStatus from '../components/panel/GameStatus.jsx'
import MoveHistory from '../components/panel/MoveHistory.jsx'
import CapturedPieces from '../components/panel/CapturedPieces.jsx'
import DifficultySelect from '../components/controls/DifficultySelect.jsx'
import GameControls from '../components/controls/GameControls.jsx'
import Hint from '../components/controls/Hint.jsx'
import Button from '../components/ui/Button.jsx'
import { useGameStore } from '../state/useGameStore.js'
import { useSettingsStore } from '../state/useSettingsStore.js'
import { useAIOpponent } from '../hooks/useAIOpponent.js'
import { START_FEN } from '../lib/constants.js'

// Play a full game against the built-in engine at a chosen difficulty and color.
export default function PlayMode() {
  const [playerColor, setPlayerColor] = useState('w')
  const aiThinking = useGameStore((s) => s.aiThinking)
  const reset = useGameStore((s) => s.reset)
  const level = useSettingsStore((s) => s.difficultyLevel)

  const engineColor = playerColor === 'w' ? 'b' : 'w'
  useAIOpponent(engineColor, level, true)

  const newGame = (color = playerColor) => {
    setPlayerColor(color)
    reset(START_FEN, { mode: 'play', orientation: color })
  }

  // Start a fresh game on mount.
  useEffect(() => {
    reset(START_FEN, { mode: 'play', orientation: playerColor })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <GameLayout
      top={<GameStatus aiThinking={aiThinking} />}
      side={
        <>
          <DifficultySelect />
          <div className="glass rounded-xl p-3">
            <h3 className="mb-2 font-display text-sm uppercase tracking-widest text-accent">
              Play as
            </h3>
            <div className="flex gap-2">
              <Button
                variant={playerColor === 'w' ? 'primary' : 'ghost'}
                className="flex-1"
                onClick={() => newGame('w')}
              >
                ♔ White
              </Button>
              <Button
                variant={playerColor === 'b' ? 'primary' : 'ghost'}
                className="flex-1"
                onClick={() => newGame('b')}
              >
                ♚ Black
              </Button>
            </div>
          </div>
          <CapturedPieces />
          <GameControls
            onNewGame={() => newGame()}
            undoPlies={2}
            extra={<Hint />}
          />
          <MoveHistory />
        </>
      }
    />
  )
}
