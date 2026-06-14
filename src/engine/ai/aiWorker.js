import { chooseMove } from './difficulty.js'
import { findBestMove } from './search.js'

// Web Worker entry. Runs the search off the main thread so the UI stays at 60fps
// even when the engine thinks. Messages:
//   { id, type:'move', fen, level }   -> { id, move, score }
//   { id, type:'hint', fen }          -> { id, move, score }
self.onmessage = (e) => {
  const { id, type, fen, level } = e.data
  try {
    if (type === 'move') {
      const result = chooseMove(fen, level)
      self.postMessage({ id, move: result?.move || null, score: result?.score ?? 0 })
    } else if (type === 'hint') {
      const { bestMove, score } = findBestMove(fen, { depth: 4, quiescence: true })
      self.postMessage({ id, move: bestMove, score })
    }
  } catch (err) {
    self.postMessage({ id, error: String(err) })
  }
}
