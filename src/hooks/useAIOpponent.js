import { useEffect, useRef } from 'react'
import { useGameStore } from '../state/useGameStore.js'
import { requestMove } from '../engine/workerClient.js'

// When it's the engine's turn (in play mode), asks the worker for a move and
// applies it. `engineColor` is the side the computer plays; null disables it.
export function useAIOpponent(engineColor, level, enabled = true) {
  const turn = useGameStore((s) => s.turn)
  const fen = useGameStore((s) => s.fen)
  const status = useGameStore((s) => s.status)
  const viewPly = useGameStore((s) => s.viewPly)
  const applyMove = useGameStore((s) => s.applyMove)
  const setAiThinking = useGameStore((s) => s.setAiThinking)
  const busy = useRef(false)

  useEffect(() => {
    if (!enabled || !engineColor) return
    if (status.over || viewPly !== null) return
    if (turn !== engineColor || busy.current) return

    busy.current = true
    setAiThinking(true)
    let cancelled = false
    const minThink = new Promise((r) => setTimeout(r, 350)) // small natural delay

    Promise.all([requestMove(fen, level), minThink])
      .then(([res]) => {
        if (cancelled || !res?.move) return
        // Guard against state having moved on (e.g. user undo).
        const cur = useGameStore.getState()
        if (cur.turn === engineColor && cur.fen === fen && cur.viewPly === null) {
          applyMove(res.move)
        }
      })
      .finally(() => {
        if (!cancelled) {
          busy.current = false
          setAiThinking(false)
        }
      })

    return () => {
      cancelled = true
      busy.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn, fen, status.over, viewPly, engineColor, level, enabled])
}
