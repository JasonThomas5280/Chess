// Endgame practice scenarios. You play `playerColor` and try to achieve `goal`
// within `maxMoves`; the engine defends at `engineLevel`. Every FEN is validated
// (legal, correct side to move, not already finished) by the data-integrity test.
//
// Shape: { id, name, category, fen, playerColor, goal, maxMoves, engineLevel,
//          instructions, successWhen }

export const ENDGAME_CATEGORIES = [
  { id: 'basic-mate', label: 'Basic Mates' },
  { id: 'rook', label: 'Rook Endings' },
  { id: 'pawn', label: 'Pawn Endings' },
]

export const ENDGAMES = [
  {
    id: 'eg-kq-vs-k',
    name: 'Queen vs King',
    category: 'basic-mate',
    fen: '4k3/8/8/8/8/8/8/3QK3 w - - 0 1',
    playerColor: 'w',
    goal: 'checkmate',
    maxMoves: 20,
    engineLevel: 4,
    instructions:
      'Use your queen to drive the lone king to the edge, bring your own king up, and deliver mate. Beware of stalemate!',
  },
  {
    id: 'eg-kr-vs-k',
    name: 'Rook vs King',
    category: 'basic-mate',
    fen: '4k3/8/8/8/8/8/8/R3K3 w - - 0 1',
    playerColor: 'w',
    goal: 'checkmate',
    maxMoves: 25,
    engineLevel: 4,
    instructions:
      'The “staircase” technique: use king and rook together to box the enemy king onto the back rank and mate.',
  },
  {
    id: 'eg-krr-vs-k',
    name: 'Two Rooks vs King',
    category: 'basic-mate',
    fen: '4k3/8/8/8/8/8/8/R3K2R w KQ - 0 1',
    playerColor: 'w',
    goal: 'checkmate',
    maxMoves: 14,
    engineLevel: 3,
    instructions:
      'The ladder mate: cut the king off rank by rank with your two rooks until it is mated on the edge.',
  },
  {
    id: 'eg-kp-vs-k-opposition',
    name: 'King & Pawn — Opposition',
    category: 'pawn',
    fen: '8/8/8/3k4/8/3P4/3K4/8 w - - 0 1',
    playerColor: 'w',
    goal: 'promote',
    maxMoves: 24,
    engineLevel: 4,
    instructions:
      'Win the opposition, escort your pawn forward and promote. The key is getting your king in front of the pawn.',
  },
  {
    id: 'eg-kp-vs-k-rook-pawn',
    name: 'King & Pawn — Outside Passer',
    category: 'pawn',
    fen: '8/8/8/8/P7/8/k7/4K3 w - - 0 1',
    playerColor: 'w',
    goal: 'promote',
    maxMoves: 22,
    engineLevel: 4,
    instructions:
      'Push the a-pawn while keeping the enemy king at bay. Race it to promotion.',
  },
  {
    id: 'eg-lucena',
    name: 'The Lucena Position',
    category: 'rook',
    fen: '1K6/1P6/8/8/8/8/r7/2k4R w - - 0 1',
    playerColor: 'w',
    goal: 'promote',
    maxMoves: 24,
    engineLevel: 4,
    instructions:
      'The most important winning rook ending. “Build a bridge” with your rook to shelter your king and promote the pawn.',
  },
  {
    id: 'eg-kqp-promote',
    name: 'Connected Passers',
    category: 'pawn',
    fen: '8/8/8/8/8/2k5/PP6/2K5 w - - 0 1',
    playerColor: 'w',
    goal: 'promote',
    maxMoves: 20,
    engineLevel: 4,
    instructions:
      'Two connected passed pawns defend each other. Advance them carefully to force a promotion.',
  },
  {
    id: 'eg-kbn-corner',
    name: 'Bishop & Knight Mate',
    category: 'basic-mate',
    fen: '8/8/8/8/4k3/8/4K3/5BN1 w - - 0 1',
    playerColor: 'w',
    goal: 'checkmate',
    maxMoves: 33,
    engineLevel: 3,
    instructions:
      'The hardest basic mate. Drive the king to a corner the same color as your bishop and coordinate all three pieces.',
  },
]
