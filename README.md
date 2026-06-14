# African Empires Chess

A visually stunning chess game themed around nine great African empires. Play
against a built-in engine across six difficulty levels, train tactics, master
endgames, and drill openings — all rendered with custom SVG piece sets and
per-empire color palettes.

## Features

- **Play vs Computer** — six difficulty levels (Novice → Master), each shaped by
  search depth, quiescence, deliberate blunders and move-sampling so beginners can
  win and experts get a real fight.
- **Tactics Puzzles** — 30 validated mate puzzles (mate-in-1 and mate-in-2) with
  hints, instant feedback and auto-played opponent replies.
- **Endgame Practice** — basic mates (K+Q, K+R, two rooks, B+N), pawn endings
  (opposition, connected passers) and the Lucena rook ending, each with a goal and
  move budget against a defending engine.
- **Openings Trainer** — eight classic openings (Italian, Ruy López, Sicilian,
  French, Caro-Kann, Queen's Gambit, London, King's Indian) with **Learn**
  (annotated walkthrough) and **Drill** (play the book moves from memory) modes.
- **Nine Empire Chess Sets** — Mali, Songhai, Kush, Aksum, Great Zimbabwe, Benin,
  Ashanti, Zulu and Egypt. Each is a complete set: custom SVG silhouette pieces,
  board palette and animated background. Your choice persists across visits.
- **Polish** — Framer Motion animations, glow and gradient theming, last-move and
  legal-move highlights, a pulsing check ring, move history with jump-to-ply
  review, captured-material tracking, a hint button, responsive layout (desktop
  side panel / mobile bottom nav) and `prefers-reduced-motion` support.

## Tech

- **React 18 + Vite + Tailwind CSS** with **Framer Motion** and **zustand**.
- **chess.js** for rules/legality/FEN/PGN — wrapped behind a single `ChessGame`
  seam so it's the only place the rules library is touched.
- A **hand-written engine** (negamax + alpha-beta + iterative deepening +
  quiescence + piece-square tables) running in a **Web Worker** so the UI never
  blocks. No external chess engine.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run test` | Run the Vitest suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint the source |

## Architecture

```
src/
  engine/      ChessGame wrapper, notation, and the AI (ai/: evaluate, search,
               moveOrdering, pieceSquareTables, difficulty, aiWorker)
  state/       zustand stores (game + persisted settings)
  hooks/       useAIOpponent, usePuzzle, useEndgame, useOpening
  themes/      palettes, registry, ThemeProvider, pieces/<empire> SVG sets
  components/  board/, panel/, controls/, theme/, layout/, ui/
  modes/       Home, Play, Puzzles, Endgames, Openings, Sets
  data/        puzzles, endgames, openings (+ data-integrity tests)
  lib/         square/FEN/constants helpers
```

## Testing

The suite (48 tests) covers the engine (legality vs chess.js; checkmate/stalemate/
draw detection; the AI finding mate-in-1 and mate-in-2; quiescence avoiding a
hung queen), the game store (selection, moves, promotion, undo, review), the
theme registry (all nine sets render), every route mounting, and — critically —
**data integrity**: every puzzle/endgame/opening position and move is replayed
through chess.js to prove the authored data is legal.

```bash
npm run test
```
