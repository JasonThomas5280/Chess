import { useState } from 'react'
import Button from '../ui/Button.jsx'
import { useGameStore } from '../../state/useGameStore.js'
import { requestHint } from '../../engine/workerClient.js'

// Asks the engine for a strong move and briefly flashes it as a suggestion by
// selecting the from-square and showing its legal targets.
export default function Hint() {
  const [loading, setLoading] = useState(false)
  const [tip, setTip] = useState(null)
  const fen = useGameStore((s) => s.fen)
  const status = useGameStore((s) => s.status)

  const getHint = async () => {
    if (status.over) return
    setLoading(true)
    setTip(null)
    try {
      const { move } = await requestHint(fen)
      if (move) {
        setTip(`${move.san}`)
        useGameStore.setState({
          selectedSquare: move.from,
          legalTargets: [move.to],
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="ghost" onClick={getHint} disabled={loading || status.over}>
      {loading ? '…' : tip ? `💡 ${tip}` : '💡 Hint'}
    </Button>
  )
}
