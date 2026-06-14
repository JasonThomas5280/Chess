import Button from '../ui/Button.jsx'
import { useGameStore } from '../../state/useGameStore.js'

// Shared board controls: new game, flip, undo. Extra actions can be slotted in
// via `extra` (e.g. Hint, Resign) by the individual modes.
export default function GameControls({ onNewGame, canUndo = true, undoPlies = 1, extra }) {
  const flip = useGameStore((s) => s.flipOrientation)
  const undo = useGameStore((s) => s.undo)
  const history = useGameStore((s) => s.history)

  const doUndo = () => {
    for (let i = 0; i < undoPlies; i++) undo()
  }

  return (
    <div className="flex flex-wrap gap-2">
      {onNewGame && (
        <Button variant="primary" onClick={onNewGame}>
          ↻ New Game
        </Button>
      )}
      <Button variant="ghost" onClick={flip} title="Flip board">
        ⇅ Flip
      </Button>
      {canUndo && (
        <Button variant="ghost" onClick={doUndo} disabled={history.length === 0}>
          ↶ Undo
        </Button>
      )}
      {extra}
    </div>
  )
}
