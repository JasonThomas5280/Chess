import { useEffect, useState, useCallback } from 'react'
import { useGameStore } from '../state/useGameStore.js'
import { useAIOpponent } from './useAIOpponent.js'

// Runs an endgame scenario: loads the position, lets the engine defend, and
// tracks progress toward the goal (checkmate / promotion) within a move budget.
export function useEndgame(scenario) {
  const reset = useGameStore((s) => s.reset)
  const status = useGameStore((s) => s.status)
  const history = useGameStore((s) => s.history)
  const fen = useGameStore((s) => s.fen)
  const aiThinking = useGameStore((s) => s.aiThinking)

  const engineColor = scenario.playerColor === 'w' ? 'b' : 'w'
  useAIOpponent(engineColor, scenario.engineLevel, true)

  const [result, setResult] = useState(null) // 'success' | 'fail' | null

  const load = useCallback(() => {
    reset(scenario.fen, { mode: 'endgame', orientation: scenario.playerColor })
    setResult(null)
  }, [reset, scenario])

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario.id])

  // Player full-moves used (one full move = 2 plies).
  const movesUsed = Math.ceil(history.length / 2)

  useEffect(() => {
    if (result) return
    // Goal achieved?
    if (scenario.goal === 'checkmate') {
      if (status.over && status.reason === 'checkmate' && status.result === scenario.playerColor) {
        setResult('success')
        return
      }
    }
    if (scenario.goal === 'promote') {
      // Detect a new queen of the player's color that wasn't in the start FEN.
      const startQueens = (scenario.fen.split(' ')[0].match(scenario.playerColor === 'w' ? /Q/g : /q/g) || []).length
      const nowQueens = (fen.split(' ')[0].match(scenario.playerColor === 'w' ? /Q/g : /q/g) || []).length
      if (nowQueens > startQueens) {
        setResult('success')
        return
      }
    }
    // Draw / loss conditions.
    if (status.over) {
      if (status.result === 'draw') setResult('fail')
      else if (status.result !== scenario.playerColor) setResult('fail')
      return
    }
    // Out of moves.
    if (movesUsed > scenario.maxMoves) setResult('fail')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, fen, movesUsed])

  return { result, movesUsed, aiThinking, reload: load }
}
