import { useEffect, useRef, useState, useCallback } from 'react'
import { useGameStore } from '../state/useGameStore.js'
import { START_FEN } from '../lib/constants.js'

const clean = (san) => san.replace(/[+#!?]/g, '')

// Drives opening study in two modes:
//  - 'learn': auto-steps through the whole line with commentary.
//  - 'drill': the learner plays their color's moves; correct moves advance and
//    the opponent's reply auto-plays. A wrong move is reverted with a nudge.
export function useOpening(opening, mode) {
  const reset = useGameStore((s) => s.reset)
  const applyMove = useGameStore((s) => s.applyMove)
  const undo = useGameStore((s) => s.undo)
  const history = useGameStore((s) => s.history)

  const [ply, setPly] = useState(0) // index into opening.line of the NEXT move
  const [feedback, setFeedback] = useState({ kind: 'info', message: '' })
  const [complete, setComplete] = useState(false)
  const expectedLen = useRef(0)
  const applying = useRef(false)

  const restart = useCallback(() => {
    reset(START_FEN, { mode: 'opening', orientation: opening.color })
    setPly(0)
    setComplete(false)
    expectedLen.current = 0
    setFeedback({
      kind: 'info',
      message:
        mode === 'learn'
          ? 'Press Step to walk through the line.'
          : `You play ${opening.color === 'w' ? 'White' : 'Black'}. Play the book move.`,
    })
  }, [reset, opening, mode])

  useEffect(() => {
    restart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opening.id, mode])

  const currentComment =
    ply > 0 ? opening.line[ply - 1]?.comment : opening.description

  // LEARN: explicit stepping.
  const step = () => {
    if (mode !== 'learn' || complete) return
    const node = opening.line[ply]
    if (!node) return
    applying.current = true
    applyMove(node.move)
    expectedLen.current = useGameStore.getState().history.length
    const next = ply + 1
    setPly(next)
    if (next >= opening.line.length) setComplete(true)
    setTimeout(() => (applying.current = false), 0)
  }

  // In drill mode, if the next book move belongs to the OPPONENT, auto-play it.
  useEffect(() => {
    if (mode !== 'drill' || complete || applying.current) return
    const node = opening.line[ply]
    if (!node) {
      setComplete(true)
      return
    }
    const moverIsLearner =
      (opening.color === 'w') === (ply % 2 === 0) // ply0 = white's move
    if (!moverIsLearner) {
      applying.current = true
      const t = setTimeout(() => {
        applyMove(node.move)
        expectedLen.current = useGameStore.getState().history.length
        setPly((p) => p + 1)
        applying.current = false
      }, 400)
      return () => clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, ply, complete, opening.id])

  // DRILL: validate the learner's move when history grows.
  useEffect(() => {
    if (mode !== 'drill' || complete || applying.current) return
    if (history.length <= expectedLen.current) return

    const played = history[history.length - 1]
    const expected = opening.line[ply]
    if (expected && clean(played.san) === clean(expected.move)) {
      expectedLen.current = history.length
      const next = ply + 1
      setPly(next)
      setFeedback({ kind: 'success', message: `✓ ${expected.move} — ${expected.comment}` })
      if (next >= opening.line.length) setComplete(true)
    } else {
      setFeedback({
        kind: 'error',
        message: `That’s not the book move. The line continues with ${expected?.move}.`,
      })
      applying.current = true
      undo()
      setTimeout(() => (applying.current = false), 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.length])

  return { ply, currentComment, feedback, complete, step, restart, total: opening.line.length }
}
