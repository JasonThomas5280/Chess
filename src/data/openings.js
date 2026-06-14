// Opening repertoire for Learn & Drill modes. Every line is validated legal
// from the initial position by src/data/dataIntegrity.test.js.
//
// Shape: { id, name, eco, color:'w'|'b', description, line:[{move:SAN, comment}] }

export const OPENINGS = [
  {
    "id": "op-italian",
    "name": "Italian Game",
    "eco": "C50",
    "color": "w",
    "description": "A classical king-pawn opening. Rapid development, pressure on f7, and a fight for the center.",
    "line": [
      {
        "move": "e4",
        "comment": "Stake a claim in the center and open lines for the bishop and queen."
      },
      {
        "move": "e5",
        "comment": "Black mirrors, contesting the center."
      },
      {
        "move": "Nf3",
        "comment": "Develop the knight and attack the e5 pawn."
      },
      {
        "move": "Nc6",
        "comment": "Defend e5 and develop."
      },
      {
        "move": "Bc4",
        "comment": "The “Italian” bishop targets the weak f7 square."
      },
      {
        "move": "Bc5",
        "comment": "The Giuoco Piano — Black’s bishop eyes f2 symmetrically."
      },
      {
        "move": "c3",
        "comment": "Prepare d4, building a big center."
      },
      {
        "move": "Nf6",
        "comment": "Develop and pressure e4."
      },
      {
        "move": "d4",
        "comment": "Strike in the center while you are ahead in development."
      }
    ]
  },
  {
    "id": "op-ruy-lopez",
    "name": "Ruy López",
    "eco": "C60",
    "color": "w",
    "description": "The Spanish Game — one of the oldest and most respected openings, pressuring the knight that guards e5.",
    "line": [
      {
        "move": "e4",
        "comment": "Classic central advance."
      },
      {
        "move": "e5",
        "comment": "Symmetrical reply."
      },
      {
        "move": "Nf3",
        "comment": "Attack e5."
      },
      {
        "move": "Nc6",
        "comment": "Defend e5."
      },
      {
        "move": "Bb5",
        "comment": "Pin the defender of e5 against ideas of c3/d4."
      },
      {
        "move": "a6",
        "comment": "The Morphy Defense, questioning the bishop."
      },
      {
        "move": "Ba4",
        "comment": "Maintain the pin."
      },
      {
        "move": "Nf6",
        "comment": "Counterattack e4."
      },
      {
        "move": "O-O",
        "comment": "Castle to safety and connect ideas of Re1."
      }
    ]
  },
  {
    "id": "op-sicilian",
    "name": "Sicilian Defense",
    "eco": "B20",
    "color": "b",
    "description": "Black’s most combative answer to 1.e4 — an asymmetrical fight where Black plays for a win.",
    "line": [
      {
        "move": "e4",
        "comment": "White grabs the center."
      },
      {
        "move": "c5",
        "comment": "The Sicilian — Black fights for d4 from the flank."
      },
      {
        "move": "Nf3",
        "comment": "Develop and prepare d4."
      },
      {
        "move": "d6",
        "comment": "Solid setup, preparing ...Nf6 and ...e5/...g6."
      },
      {
        "move": "d4",
        "comment": "White opens the center."
      },
      {
        "move": "cxd4",
        "comment": "Capture, trading a flank pawn for a central one."
      },
      {
        "move": "Nxd4",
        "comment": "Recapture with the knight, reaching the Open Sicilian."
      },
      {
        "move": "Nf6",
        "comment": "Develop and hit e4."
      },
      {
        "move": "Nc3",
        "comment": "Defend e4 and develop."
      }
    ]
  },
  {
    "id": "op-french",
    "name": "French Defense",
    "eco": "C00",
    "color": "b",
    "description": "A solid, strategic defense. Black accepts a slightly cramped position to build a rock-solid pawn chain.",
    "line": [
      {
        "move": "e4",
        "comment": "White takes the center."
      },
      {
        "move": "e6",
        "comment": "The French — preparing ...d5 to challenge e4."
      },
      {
        "move": "d4",
        "comment": "Build the big center."
      },
      {
        "move": "d5",
        "comment": "Strike at e4 immediately."
      },
      {
        "move": "Nc3",
        "comment": "Defend e4 and develop."
      },
      {
        "move": "Nf6",
        "comment": "Pressure e4 again."
      },
      {
        "move": "e5",
        "comment": "Advance, gaining space and locking the center."
      },
      {
        "move": "Nfd7",
        "comment": "Reroute the knight; prepare ...c5 to hit the chain’s base."
      }
    ]
  },
  {
    "id": "op-caro-kann",
    "name": "Caro-Kann Defense",
    "eco": "B10",
    "color": "b",
    "description": "Solid and reliable: Black challenges the center with ...d5 while keeping the light-squared bishop free.",
    "line": [
      {
        "move": "e4",
        "comment": "White’s central thrust."
      },
      {
        "move": "c6",
        "comment": "The Caro-Kann — preparing ...d5 with support."
      },
      {
        "move": "d4",
        "comment": "Occupy the center."
      },
      {
        "move": "d5",
        "comment": "Challenge e4 at once."
      },
      {
        "move": "Nc3",
        "comment": "Defend e4."
      },
      {
        "move": "dxe4",
        "comment": "Capture, clarifying the center."
      },
      {
        "move": "Nxe4",
        "comment": "Recapture; the main tabiya of the Caro-Kann."
      },
      {
        "move": "Bf5",
        "comment": "Develop the bishop actively before ...e6 shuts it in."
      }
    ]
  },
  {
    "id": "op-queens-gambit",
    "name": "Queen's Gambit",
    "eco": "D06",
    "color": "w",
    "description": "A premier closed opening. White offers a wing pawn to deflect Black’s d5 and dominate the center.",
    "line": [
      {
        "move": "d4",
        "comment": "Claim the center with the queen’s pawn."
      },
      {
        "move": "d5",
        "comment": "Black stakes a symmetrical claim."
      },
      {
        "move": "c4",
        "comment": "The Queen’s Gambit — pressure d5 from the flank."
      },
      {
        "move": "e6",
        "comment": "The Declined: support d5 solidly."
      },
      {
        "move": "Nc3",
        "comment": "Develop and add pressure to d5."
      },
      {
        "move": "Nf6",
        "comment": "Defend and develop."
      },
      {
        "move": "Bg5",
        "comment": "Pin the knight, increasing pressure on d5."
      },
      {
        "move": "Be7",
        "comment": "Break the pin and prepare to castle."
      }
    ]
  },
  {
    "id": "op-london",
    "name": "London System",
    "eco": "D02",
    "color": "w",
    "description": "A flexible, low-theory system: White develops the dark-squared bishop outside the pawn chain and builds a solid setup.",
    "line": [
      {
        "move": "d4",
        "comment": "Queen’s pawn opening."
      },
      {
        "move": "d5",
        "comment": "Symmetrical center."
      },
      {
        "move": "Nf3",
        "comment": "Develop the knight."
      },
      {
        "move": "Nf6",
        "comment": "Black develops in kind."
      },
      {
        "move": "Bf4",
        "comment": "The London bishop — out before ...e6 locks it in."
      },
      {
        "move": "e6",
        "comment": "Black prepares to develop the bishop."
      },
      {
        "move": "e3",
        "comment": "Solidify the pawn chain and free the bishop."
      },
      {
        "move": "Bd6",
        "comment": "Challenge the strong London bishop."
      },
      {
        "move": "Bg3",
        "comment": "Sidestep and keep the bishop."
      }
    ]
  },
  {
    "id": "op-kings-indian",
    "name": "King's Indian Defense",
    "eco": "E60",
    "color": "b",
    "description": "A hypermodern defense: Black cedes the center, then strikes back with ...e5 or ...c5 and a kingside attack.",
    "line": [
      {
        "move": "d4",
        "comment": "White builds the center."
      },
      {
        "move": "Nf6",
        "comment": "Control e4 from afar."
      },
      {
        "move": "c4",
        "comment": "Grab more space."
      },
      {
        "move": "g6",
        "comment": "Prepare to fianchetto the bishop."
      },
      {
        "move": "Nc3",
        "comment": "Develop and support e4."
      },
      {
        "move": "Bg7",
        "comment": "The fianchettoed bishop eyes the long diagonal."
      },
      {
        "move": "e4",
        "comment": "White takes a broad center — exactly what Black invites."
      },
      {
        "move": "d6",
        "comment": "Support a later ...e5 break."
      },
      {
        "move": "Nf3",
        "comment": "Develop; the Classical King’s Indian."
      }
    ]
  }
]
