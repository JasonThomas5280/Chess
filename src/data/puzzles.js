// Tactics puzzles. Every position and solution line is validated (each move
// legal; mate puzzles end in checkmate) by src/data/dataIntegrity.test.js.
// Generated/verified with chess.js — do not hand-edit SAN without re-validating.
//
// Shape: { id, type:'mateInN'|'bestMove'|'winMaterial', n, fen, sideToMove,
//          solution:[SAN], replies:[SAN], acceptAnyMate, difficulty:1-5, title, hint }

export const PUZZLE_TYPES = [
  { id: 'mateInN', label: 'Mate' },
  { id: 'bestMove', label: 'Best Move' },
  { id: 'winMaterial', label: 'Win Material' },
]

export const PUZZLES = [
  {
    "id": "pz-bk-01",
    "type": "mateInN",
    "n": 1,
    "fen": "3r2k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Rxd8#"
    ],
    "replies": [],
    "acceptAnyMate": true,
    "difficulty": 2,
    "title": "Back-rank breakthrough",
    "hint": "Trade off the only defender of the back rank.",
    "themeTags": [
      "backRank"
    ]
  },
  {
    "id": "pz-bk-02",
    "type": "mateInN",
    "n": 1,
    "fen": "6k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Ra8#"
    ],
    "replies": [],
    "acceptAnyMate": true,
    "difficulty": 1,
    "title": "The open back rank",
    "hint": "The g8 king has no luft.",
    "themeTags": [
      "backRank"
    ]
  },
  {
    "id": "pz-bk-03",
    "type": "mateInN",
    "n": 1,
    "fen": "6k1/4Rppp/8/8/8/8/5PPP/6K1 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Re8#"
    ],
    "replies": [],
    "acceptAnyMate": true,
    "difficulty": 1,
    "title": "Rook to the eighth",
    "hint": "Deliver mate along the back rank.",
    "themeTags": [
      "backRank"
    ]
  },
  {
    "id": "pz-bk-04",
    "type": "mateInN",
    "n": 1,
    "fen": "q5k1/5ppp/8/8/8/8/5PPP/6K1 b - - 0 1",
    "sideToMove": "b",
    "solution": [
      "Qa1#"
    ],
    "replies": [],
    "acceptAnyMate": true,
    "difficulty": 2,
    "title": "Queen sweeps home",
    "hint": "Black mates on the first rank.",
    "themeTags": [
      "backRank"
    ]
  },
  {
    "id": "pz-m1-01",
    "type": "mateInN",
    "n": 1,
    "fen": "8/k1K5/8/8/8/7R/8/8 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Ra3#"
    ],
    "replies": [],
    "acceptAnyMate": true,
    "difficulty": 1,
    "title": "Back-rank finish",
    "hint": "Look for a check the king cannot escape."
  },
  {
    "id": "pz-m1-02",
    "type": "mateInN",
    "n": 1,
    "fen": "1K6/4R3/8/8/3Rk3/8/8/8 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Rexe4#"
    ],
    "replies": [],
    "acceptAnyMate": true,
    "difficulty": 1,
    "title": "Edge of the board",
    "hint": "Look for a check the king cannot escape."
  },
  {
    "id": "pz-m1-03",
    "type": "mateInN",
    "n": 1,
    "fen": "6R1/8/7k/8/4K3/8/7R/8 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Rg4#"
    ],
    "replies": [],
    "acceptAnyMate": true,
    "difficulty": 1,
    "title": "Cornered king",
    "hint": "Look for a check the king cannot escape."
  },
  {
    "id": "pz-m1-04",
    "type": "mateInN",
    "n": 1,
    "fen": "8/k1K5/8/8/R7/8/8/R7 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Ra5#"
    ],
    "replies": [],
    "acceptAnyMate": true,
    "difficulty": 1,
    "title": "Queen delivers",
    "hint": "Look for a check the king cannot escape."
  },
  {
    "id": "pz-m1-05",
    "type": "mateInN",
    "n": 1,
    "fen": "8/8/1K6/8/8/R7/8/1R2k3 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Ra2#"
    ],
    "replies": [],
    "acceptAnyMate": true,
    "difficulty": 1,
    "title": "Rook on the rim",
    "hint": "Look for a check the king cannot escape."
  },
  {
    "id": "pz-m1-06",
    "type": "mateInN",
    "n": 1,
    "fen": "8/8/8/8/8/7K/8/2Q3k1 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Kg3#"
    ],
    "replies": [],
    "acceptAnyMate": true,
    "difficulty": 1,
    "title": "Final blow",
    "hint": "Look for a check the king cannot escape."
  },
  {
    "id": "pz-m1-07",
    "type": "mateInN",
    "n": 1,
    "fen": "8/3R4/2R5/6k1/8/6K1/8/8 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Rd5#"
    ],
    "replies": [],
    "acceptAnyMate": true,
    "difficulty": 2,
    "title": "Checkmate!",
    "hint": "Look for a check the king cannot escape."
  },
  {
    "id": "pz-m1-08",
    "type": "mateInN",
    "n": 1,
    "fen": "2k5/6R1/8/8/R7/8/5K2/8 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Ra8#"
    ],
    "replies": [],
    "acceptAnyMate": true,
    "difficulty": 2,
    "title": "The last rank",
    "hint": "Look for a check the king cannot escape."
  },
  {
    "id": "pz-m1-09",
    "type": "mateInN",
    "n": 1,
    "fen": "7k/8/8/2R5/6R1/8/6K1/8 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Rh5#"
    ],
    "replies": [],
    "acceptAnyMate": true,
    "difficulty": 2,
    "title": "No escape",
    "hint": "Look for a check the king cannot escape."
  },
  {
    "id": "pz-m1-10",
    "type": "mateInN",
    "n": 1,
    "fen": "3R3k/8/8/8/8/7K/8/1R6 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Rb7#"
    ],
    "replies": [],
    "acceptAnyMate": true,
    "difficulty": 2,
    "title": "Royal hunt",
    "hint": "Look for a check the king cannot escape."
  },
  {
    "id": "pz-m1-11",
    "type": "mateInN",
    "n": 1,
    "fen": "8/1K6/2R2kR1/8/8/8/8/8 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Rcxf6#"
    ],
    "replies": [],
    "acceptAnyMate": true,
    "difficulty": 2,
    "title": "Clean mate",
    "hint": "Look for a check the king cannot escape."
  },
  {
    "id": "pz-m1-12",
    "type": "mateInN",
    "n": 1,
    "fen": "8/7K/8/8/7R/2R5/8/7k w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Rg3#"
    ],
    "replies": [],
    "acceptAnyMate": true,
    "difficulty": 2,
    "title": "Pinned to the wall",
    "hint": "Look for a check the king cannot escape."
  },
  {
    "id": "pz-m1-13",
    "type": "mateInN",
    "n": 1,
    "fen": "1k6/7R/8/8/8/8/2K5/5R2 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Rf8#"
    ],
    "replies": [],
    "acceptAnyMate": true,
    "difficulty": 2,
    "title": "Sealed fate",
    "hint": "Look for a check the king cannot escape."
  },
  {
    "id": "pz-m1-14",
    "type": "mateInN",
    "n": 1,
    "fen": "1Q6/8/8/8/8/5K1k/8/8 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Qh8#"
    ],
    "replies": [],
    "acceptAnyMate": true,
    "difficulty": 2,
    "title": "One move mate",
    "hint": "Look for a check the king cannot escape."
  },
  {
    "id": "pz-m1-15",
    "type": "mateInN",
    "n": 1,
    "fen": "1R6/8/K7/3R4/k7/8/8/8 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Ra5#"
    ],
    "replies": [],
    "acceptAnyMate": true,
    "difficulty": 2,
    "title": "Decisive stroke",
    "hint": "Look for a check the king cannot escape."
  },
  {
    "id": "pz-m1-16",
    "type": "mateInN",
    "n": 1,
    "fen": "1R1K4/k7/R7/8/8/8/8/8 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Rbb6#"
    ],
    "replies": [],
    "acceptAnyMate": true,
    "difficulty": 2,
    "title": "Endgame mate",
    "hint": "Look for a check the king cannot escape."
  },
  {
    "id": "pz-m2-01",
    "type": "mateInN",
    "n": 2,
    "fen": "8/k7/2K5/8/8/8/8/2Q5 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Qb2",
      "Qb7#"
    ],
    "replies": [
      "Ka8"
    ],
    "acceptAnyMate": false,
    "difficulty": 3,
    "title": "Two-move mate",
    "hint": "Restrict the king first, then deliver mate next move."
  },
  {
    "id": "pz-m2-02",
    "type": "mateInN",
    "n": 2,
    "fen": "8/8/8/k5K1/8/8/2R5/5R2 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Rb2",
      "Ra1#"
    ],
    "replies": [
      "Ka6"
    ],
    "acceptAnyMate": false,
    "difficulty": 3,
    "title": "Rolling rooks",
    "hint": "Restrict the king first, then deliver mate next move."
  },
  {
    "id": "pz-m2-03",
    "type": "mateInN",
    "n": 2,
    "fen": "3k4/R7/4R1K1/8/8/8/8/8 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Rf7",
      "Re8#"
    ],
    "replies": [
      "Kc8"
    ],
    "acceptAnyMate": false,
    "difficulty": 3,
    "title": "King and queen net",
    "hint": "Restrict the king first, then deliver mate next move."
  },
  {
    "id": "pz-m2-04",
    "type": "mateInN",
    "n": 2,
    "fen": "8/8/8/8/k4K2/6R1/2R5/8 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Rb2",
      "Ra3#"
    ],
    "replies": [
      "Ka5"
    ],
    "acceptAnyMate": false,
    "difficulty": 3,
    "title": "Forced sequence",
    "hint": "Restrict the king first, then deliver mate next move."
  },
  {
    "id": "pz-m2-05",
    "type": "mateInN",
    "n": 2,
    "fen": "8/4k3/2K5/2R5/4R3/8/8/8 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Rf5+",
      "Rf8#"
    ],
    "replies": [
      "Kd8"
    ],
    "acceptAnyMate": false,
    "difficulty": 3,
    "title": "Mating net",
    "hint": "Restrict the king first, then deliver mate next move."
  },
  {
    "id": "pz-m2-06",
    "type": "mateInN",
    "n": 2,
    "fen": "2k5/8/8/5R2/8/8/2K5/7R w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Rf7",
      "Rh8#"
    ],
    "replies": [
      "Kd8"
    ],
    "acceptAnyMate": false,
    "difficulty": 4,
    "title": "The squeeze",
    "hint": "Restrict the king first, then deliver mate next move."
  },
  {
    "id": "pz-m2-07",
    "type": "mateInN",
    "n": 2,
    "fen": "1k6/8/8/1R5K/8/8/8/4R3 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Rc1+",
      "Ra1#"
    ],
    "replies": [
      "Ka7"
    ],
    "acceptAnyMate": false,
    "difficulty": 4,
    "title": "Driven to the edge",
    "hint": "Restrict the king first, then deliver mate next move."
  },
  {
    "id": "pz-m2-08",
    "type": "mateInN",
    "n": 2,
    "fen": "1K3R2/8/8/8/6k1/8/8/1R6 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Rg1+",
      "Rh8#"
    ],
    "replies": [
      "Kh5"
    ],
    "acceptAnyMate": false,
    "difficulty": 4,
    "title": "Coordinate and mate",
    "hint": "Restrict the king first, then deliver mate next move."
  },
  {
    "id": "pz-m2-09",
    "type": "mateInN",
    "n": 2,
    "fen": "8/8/8/8/8/R5K1/4k3/6R1 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Rg2+",
      "Ra1#"
    ],
    "replies": [
      "Kf1"
    ],
    "acceptAnyMate": false,
    "difficulty": 4,
    "title": "Cut and finish",
    "hint": "Restrict the king first, then deliver mate next move."
  },
  {
    "id": "pz-m2-10",
    "type": "mateInN",
    "n": 2,
    "fen": "5R2/8/4K3/8/7R/k7/8/8 w - - 0 1",
    "sideToMove": "w",
    "solution": [
      "Rb8",
      "Ra4#"
    ],
    "replies": [
      "Ka2"
    ],
    "acceptAnyMate": false,
    "difficulty": 4,
    "title": "Inevitable mate",
    "hint": "Restrict the king first, then deliver mate next move."
  }
]
