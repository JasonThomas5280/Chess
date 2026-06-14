// Promise-based bridge to the AI Web Worker. Falls back to a synchronous
// in-thread search if Workers are unavailable (e.g. during unit tests).

let worker = null
let seq = 0
const pending = new Map()

function getWorker() {
  if (worker || typeof Worker === 'undefined') return worker
  try {
    worker = new Worker(new URL('./ai/aiWorker.js', import.meta.url), {
      type: 'module',
    })
    worker.onmessage = (e) => {
      const { id, move, score, error } = e.data
      const entry = pending.get(id)
      if (!entry) return
      pending.delete(id)
      if (error) entry.reject(new Error(error))
      else entry.resolve({ move, score })
    }
    worker.onerror = (e) => {
      for (const { reject } of pending.values()) reject(e)
      pending.clear()
    }
  } catch {
    worker = null
  }
  return worker
}

function post(type, payload) {
  const w = getWorker()
  if (!w) {
    // Fallback: run synchronously (used in tests / unsupported environments).
    return import('./ai/difficulty.js').then(async ({ chooseMove }) => {
      const { findBestMove } = await import('./ai/search.js')
      if (type === 'hint') {
        const { bestMove, score } = findBestMove(payload.fen, { depth: 4 })
        return { move: bestMove, score }
      }
      const r = chooseMove(payload.fen, payload.level)
      return { move: r?.move || null, score: r?.score ?? 0 }
    })
  }
  const id = ++seq
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject })
    w.postMessage({ id, type, ...payload })
  })
}

/** Get the engine's move for a position at a difficulty level. */
export function requestMove(fen, level) {
  return post('move', { fen, level })
}

/** Get a hint (a strong move) for the side to move. */
export function requestHint(fen) {
  return post('hint', { fen })
}
