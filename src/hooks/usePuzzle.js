import { useEffect, useRef, useState, useCallback } from 'react'
import { useGameStore } from '../state/useGameStore.js'

// Drives a tactics puzzle: loads the position, watches the player's moves and
// validates them against the solution line, auto-playing scripted opponent
// replies between correct moves.
//
// puzzle.solution : SAN[] of the player's moves
// puzzle.replies  : SAN[] of forced opponent moves (replies[i] follows solution[i])

const clean = (san) => san.replace(/[+#!?]/g, '')

export function usePuzzle(puzzle) {
  const history = useGameStore((s) => s.history)
  const status = useGameStore((s) => s.status)
  const reset = useGameStore((s) => s.reset)
  const applyMove = useGameStore((s) => s.applyMove)
  const undo = useGameStore((s) => s.undo)

  const [solIndex, setSolIndex] = useState(0)
  const [solved, setSolved] = useState(false)
  const [hintShown, setHintShown] = useState(false)
  const [feedback, setFeedback] = useState({ kind: 'info', message: 'Find the best move.' })

  const baseLen = useRef(0) // history length at puzzle start
  const expectedLen = useRef(0) // history length we expect (ours + replies applied)
  const applyingReply = useRef(false)

  const loadPuzzle = useCallback(
    (p) => {
      reset(p.fen, { mode: 'puzzle', orientation: p.sideToMove })
      const len = useGameStore.getState().history.length
      baseLen.current = len
      expectedLen.current = len
      setSolIndex(0)
      setSolved(false)
      setHintShown(false)
      setFeedback({ kind: 'info', message: 'Find the best move.' })
    },
    [reset]
  )

  // Load on puzzle change.
  useEffect(() => {
    loadPuzzle(puzzle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzle.id])

  // Watch for the player's move (history grew beyond what we applied).
  useEffect(() => {
    if (solved || applyingReply.current) return
    if (history.length <= expectedLen.current) return

    const playerMove = history[history.length - 1]
    const expected = puzzle.solution[solIndex]
    const isMate = status.over && status.reason === 'checkmate'
    const acceptAny = puzzle.acceptAnyMate && isMate

    const correct =
      acceptAny || (expected && clean(playerMove.san) === clean(expected))

    if (!correct) {
      // Revert the wrong move.
      setFeedback({ kind: 'error', message: 'Not the best move — try again.' })
      applyingReply.current = true
      undo()
      setTimeout(() => {
        applyingReply.current = false
      }, 0)
      return
    }

    const nextIndex = solIndex + 1
    setSolIndex(nextIndex)
    expectedLen.current = history.length

    // Puzzle complete?
    if (nextIndex >= puzzle.solution.length || (acceptAny && isMate) || status.over) {
      setSolved(true)
      setFeedback({ kind: 'success', message: '✓ Solved! Well played.' })
      return
    }

    // Otherwise play the scripted reply, then prompt for the next move.
    const reply = puzzle.replies?.[nextIndex - 1]
    setFeedback({ kind: 'success', message: 'Correct! Keep going…' })
    if (reply) {
      applyingReply.current = true
      setTimeout(() => {
        applyMove(reply)
        expectedLen.current = useGameStore.getState().history.length
        applyingReply.current = false
      }, 450)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.length])

  const showHint = () => setHintShown(true)

  return { feedback, solved, solIndex, hintShown, showHint, loadPuzzle, status }
}
