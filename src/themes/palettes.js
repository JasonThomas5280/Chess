// Per-empire color palettes. Each drives the board squares, piece fills,
// accent/glow and the animated background gradient via CSS custom properties.
// Keys are kept identical across all empires so ThemeProvider can map them 1:1.

export const PALETTE_KEYS = [
  'lightSquare',
  'darkSquare',
  'boardBorder',
  'whitePiece',
  'blackPiece',
  'accent',
  'glow',
  'bgFrom',
  'bgTo',
]

export const palettes = {
  // West Africa — gold of Mansa Musa, Sahel earth tones.
  mali: {
    lightSquare: '#ecd09a',
    darkSquare: '#9a6a2f',
    boardBorder: '#3a2410',
    whitePiece: '#fff4dc',
    blackPiece: '#2a1a0e',
    accent: '#d4af37',
    glow: '#f2c84b',
    bgFrom: '#1a1209',
    bgTo: '#4a2f12',
  },
  // Songhai — Niger river indigo and desert gold.
  songhai: {
    lightSquare: '#e3d2a6',
    darkSquare: '#3f5e6b',
    boardBorder: '#1c2e36',
    whitePiece: '#f5efdb',
    blackPiece: '#16252b',
    accent: '#c9a227',
    glow: '#5fd0e0',
    bgFrom: '#0e1a1f',
    bgTo: '#243f49',
  },
  // Kush / Nubia — Nile black soil, red ochre, royal gold.
  kush: {
    lightSquare: '#e8c9a0',
    darkSquare: '#8a3324',
    boardBorder: '#3a160f',
    whitePiece: '#fbe9cf',
    blackPiece: '#241008',
    accent: '#e0a040',
    glow: '#ff8a4c',
    bgFrom: '#1c0d08',
    bgTo: '#4a1c12',
  },
  // Aksum — Ethiopian highlands, stelae stone, emerald and gold.
  aksum: {
    lightSquare: '#dcd6b8',
    darkSquare: '#2f6e4f',
    boardBorder: '#163326',
    whitePiece: '#f3f0df',
    blackPiece: '#13261c',
    accent: '#d8b24a',
    glow: '#56d99a',
    bgFrom: '#0d1c14',
    bgTo: '#214a36',
  },
  // Great Zimbabwe — granite walls, soapstone birds, ember tones.
  greatZimbabwe: {
    lightSquare: '#d8c8b0',
    darkSquare: '#6b5847',
    boardBorder: '#33291f',
    whitePiece: '#efe6d6',
    blackPiece: '#211a12',
    accent: '#b08d57',
    glow: '#d8a657',
    bgFrom: '#171210',
    bgTo: '#3a2e23',
  },
  // Benin — bronze plaques, deep coral red, oba's regalia.
  benin: {
    lightSquare: '#e6c9a8',
    darkSquare: '#7a3b2e',
    boardBorder: '#341712',
    whitePiece: '#f6e3c8',
    blackPiece: '#2a120c',
    accent: '#cd7f32',
    glow: '#e8923a',
    bgFrom: '#1a0d09',
    bgTo: '#43201a',
  },
  // Ashanti — golden stool, kente gold/green/black.
  ashanti: {
    lightSquare: '#f0d98a',
    darkSquare: '#1f6f4a',
    boardBorder: '#14241a',
    whitePiece: '#fff3c4',
    blackPiece: '#161410',
    accent: '#f1c40f',
    glow: '#ffd84a',
    bgFrom: '#141207',
    bgTo: '#1e4a32',
  },
  // Zulu — savanna ochre, shield cowhide, spear steel.
  zulu: {
    lightSquare: '#e2c19a',
    darkSquare: '#7c4a2a',
    boardBorder: '#33200f',
    whitePiece: '#f4e2c6',
    blackPiece: '#241405',
    accent: '#c0392b',
    glow: '#e8995a',
    bgFrom: '#1a1008',
    bgTo: '#45291a',
  },
  // Ancient Egypt — lapis blue, gold of the pharaohs, sandstone.
  egypt: {
    lightSquare: '#e9d8a6',
    darkSquare: '#1f4e79',
    boardBorder: '#12273b',
    whitePiece: '#f7ecc9',
    blackPiece: '#15233a',
    accent: '#e0b13a',
    glow: '#4fb0e8',
    bgFrom: '#0c1626',
    bgTo: '#23507a',
  },
}
