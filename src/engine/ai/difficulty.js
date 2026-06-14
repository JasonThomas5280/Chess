import { findBestMove } from './search.js'

// Difficulty levels. Strength is shaped by search depth, quiescence on/off,
// occasional deliberate blunders and top-K softmax sampling among the best root
// moves — so low levels are beatable and varied without playing nonsense.

export const LEVELS = {
  1: { name: 'Novice', depth: 1, quiescence: false, blunderChance: 0.35, topK: 6, temperature: 120 },
  2: { name: 'Casual', depth: 2, quiescence: false, blunderChance: 0.2, topK: 4, temperature: 80, timeMs: 500 },
  3: { name: 'Club', depth: 3, quiescence: true, blunderChance: 0.1, topK: 3, temperature: 50, timeMs: 900 },
  4: { name: 'Strong', depth: 4, quiescence: true, blunderChance: 0.04, topK: 2, temperature: 30, timeMs: 1000 },
  5: { name: 'Expert', depth: 5, quiescence: true, blunderChance: 0, topK: 1, temperature: 0, timeMs: 1500 },
  6: { name: 'Master', depth: 7, quiescence: true, blunderChance: 0, topK: 1, temperature: 0, timeMs: 2800 },
}

export const LEVEL_IDS = Object.keys(LEVELS).map(Number)

export function getLevel(level) {
  return LEVELS[level] || LEVELS[3]
}

// Weighted random pick from {move,score}[] using a softmax over scores.
function sampleByTemperature(ranked, topK, temperature, rng = Math.random) {
  const pool = ranked.slice(0, Math.max(1, topK))
  if (pool.length === 1 || temperature <= 0) return pool[0].move
  const max = Math.max(...pool.map((r) => r.score))
  const weights = pool.map((r) => Math.exp((r.score - max) / temperature))
  const total = weights.reduce((a, b) => a + b, 0)
  let roll = rng() * total
  for (let i = 0; i < pool.length; i++) {
    roll -= weights[i]
    if (roll <= 0) return pool[i].move
  }
  return pool[0].move
}

/**
 * Choose the engine's move for a position at a given difficulty.
 * @param {string} fen
 * @param {number} level 1..6
 * @param {Function} [rng] injectable RNG for deterministic tests
 */
export function chooseMove(fen, level, rng = Math.random) {
  const cfg = getLevel(level)
  const { bestMove, ranked, score } = findBestMove(fen, {
    depth: cfg.depth,
    quiescence: cfg.quiescence,
    timeMs: cfg.timeMs,
  })
  if (!bestMove) return null

  // Deliberate blunder: pick a clearly-worse legal move to give beginners a chance.
  if (cfg.blunderChance > 0 && rng() < cfg.blunderChance && ranked.length > 2) {
    const worse = ranked.slice(Math.ceil(ranked.length / 2))
    const pick = worse[Math.floor(rng() * worse.length)]
    return { move: pick.move, score: pick.score, deliberateBlunder: true }
  }

  const move = sampleByTemperature(ranked, cfg.topK, cfg.temperature, rng)
  return { move, score }
}
