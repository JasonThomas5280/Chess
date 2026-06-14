import { motion } from 'framer-motion'
import { useGameStore } from '../../state/useGameStore.js'

const REASON_LABEL = {
  checkmate: 'Checkmate',
  stalemate: 'Stalemate',
  insufficient: 'Draw — insufficient material',
  threefold: 'Draw — threefold repetition',
  fiftyMove: 'Draw — fifty-move rule',
  draw: 'Draw',
}

// Banner showing whose turn it is, check, and the final result.
export default function GameStatus({ aiThinking }) {
  const status = useGameStore((s) => s.status)
  const turn = useGameStore((s) => s.turn)

  let text
  let tone = 'text-white/80'
  if (status.over) {
    if (status.result === 'draw') {
      text = REASON_LABEL[status.reason] || 'Draw'
      tone = 'text-glow'
    } else {
      text = `${status.result === 'w' ? 'White' : 'Black'} wins — ${REASON_LABEL[status.reason] || 'checkmate'}`
      tone = 'text-accent'
    }
  } else if (aiThinking) {
    text = 'Opponent is thinking…'
    tone = 'text-glow'
  } else {
    text = `${turn === 'w' ? 'White' : 'Black'} to move`
    if (status.reason === 'check') {
      text += ' — Check!'
      tone = 'text-red-300'
    }
  }

  return (
    <motion.div
      key={text}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass flex items-center gap-2 rounded-xl px-4 py-2.5"
    >
      <span
        className={`h-2.5 w-2.5 rounded-full ${turn === 'w' ? 'bg-white' : 'bg-black ring-1 ring-white/40'}`}
      />
      <span className={`font-display text-sm font-semibold tracking-wide ${tone}`}>
        {text}
      </span>
    </motion.div>
  )
}
