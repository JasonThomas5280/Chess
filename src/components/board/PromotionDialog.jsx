import { motion, AnimatePresence } from 'framer-motion'
import Piece from './Piece.jsx'
import { useGameStore } from '../../state/useGameStore.js'

const CHOICES = ['q', 'r', 'b', 'n']

// Themed promotion picker shown when a pawn reaches the last rank.
export default function PromotionDialog() {
  const promotion = useGameStore((s) => s.promotion)
  const choose = useGameStore((s) => s.choosePromotion)
  const cancel = useGameStore((s) => s.cancelPromotion)

  return (
    <AnimatePresence>
      {promotion && (
        <motion.div
          className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={cancel}
        >
          <motion.div
            className="glass rounded-2xl p-4 shadow-glow-lg"
            initial={{ scale: 0.85, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 10 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-3 text-center font-display text-sm uppercase tracking-widest text-accent">
              Promote to
            </p>
            <div className="flex gap-2">
              {CHOICES.map((t) => (
                <button
                  key={t}
                  onClick={() => choose(t)}
                  className="h-16 w-16 rounded-xl bg-board-light/20 p-1 transition hover:scale-110 hover:bg-board-light/40 hover:shadow-glow"
                  aria-label={`Promote to ${t}`}
                >
                  <Piece type={t} color={promotion.color} />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
