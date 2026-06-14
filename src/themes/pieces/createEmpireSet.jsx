import PieceSvg from './PieceSvg.jsx'

// Factory that builds a full {k,q,r,b,n,p} silhouette set from a compact per-empire
// config. Each empire supplies a handful of "knobs" — a signature finial for the
// king, a crown style for the queen, a tower style for the rook, an emblem, etc. —
// so every set reads as a distinct culture while sharing clean, balanced geometry.
//
// config = {
//   crown:   'cross' | 'orb' | 'plume' | 'sun' | 'horns' | 'obelisk' | 'star' | 'bird' | 'fan'
//   tower:   'battlement' | 'wall' | 'pylon' | 'rondavel' | 'stepped'
//   bishop:  'mitre' | 'mask' | 'flame' | 'ankh' | 'staff'
//   emblem:  optional <g> rendered as the accent emblem on the pawn / shields
//   knight:  'horse' | 'antelope' (head silhouette variant)
// }

// Footer of each piece — varied per empire so silhouettes differ at a glance.
function baseEl(kind) {
  switch (kind) {
    case 'flared':
      return <path d="M22 92 L31 75 L69 75 L78 92 Z M34 75 L37 69 L63 69 L66 75 Z" />
    case 'stepped':
      return (
        <path d="M25 92 L25 86 L75 86 L75 92 Z M30 86 L30 80 L70 80 L70 86 Z M35 80 L38 69 L62 69 L65 80 Z" />
      )
    case 'pedestal':
      return (
        <path d="M24 92 L28 84 L72 84 L76 92 Z M33 84 L33 76 L67 76 L67 84 Z M36 76 L40 69 L60 69 L64 76 Z" />
      )
    case 'round':
    default:
      return (
        <path d="M27 92 Q25 79 34 77 L66 77 Q75 79 73 92 Z M34 77 Q33 70 41 68 L59 68 Q67 70 66 77 Z" />
      )
  }
}

// Column/body bridging base→top.
function columnEl(kind) {
  switch (kind) {
    case 'straight':
      return <path d="M41 69 L43 50 L57 50 L59 69 Z" />
    case 'waist':
      return <path d="M40 69 Q47 60 43 50 L57 50 Q53 60 60 69 Z" />
    case 'curve':
    default:
      return <path d="M40 68 Q36 54 45 49 L55 49 Q64 54 60 68 Z" />
  }
}

function crownTop(kind) {
  switch (kind) {
    case 'cross':
      return (
        <path d="M46 49 L40 30 L60 30 L54 49 Z M47 30 L47 22 L43 22 L43 16 L47 16 L47 9 L53 9 L53 16 L57 16 L57 22 L53 22 L53 30 Z" />
      )
    case 'orb':
      return (
        <>
          <path d="M44 49 L40 28 L60 28 L56 49 Z" />
          <circle cx="50" cy="20" r="7" />
          <circle cx="50" cy="10" r="3.2" />
        </>
      )
    case 'plume':
      return (
        <path d="M44 49 Q42 30 50 12 Q58 30 56 49 Z M50 14 Q46 28 48 46 M50 14 Q54 28 52 46" />
      )
    case 'sun':
      return (
        <>
          <path d="M44 49 L42 30 L58 30 L56 49 Z" />
          <circle cx="50" cy="22" r="9" />
          <path d="M50 6 L50 11 M66 22 L61 22 M34 22 L39 22 M61 11 L58 14 M39 11 L42 14 M61 33 L58 30 M39 33 L42 30" stroke="var(--accent)" strokeWidth="2.4" fill="none" />
        </>
      )
    case 'horns':
      return (
        <>
          <path d="M44 49 L42 32 L58 32 L56 49 Z" />
          <path d="M42 32 Q28 30 30 14 Q40 22 44 30 Z M58 32 Q72 30 70 14 Q60 22 56 30 Z" />
        </>
      )
    case 'obelisk':
      return <path d="M45 49 L47 22 L50 10 L53 22 L55 49 Z M47 24 L53 24 M46 34 L54 34" />
    case 'star':
      return (
        <>
          <path d="M44 49 L42 30 L58 30 L56 49 Z" />
          <path d="M50 8 L53 18 L63 18 L55 24 L58 34 L50 28 L42 34 L45 24 L37 18 L47 18 Z" />
        </>
      )
    case 'bird':
      return (
        <path d="M44 49 L43 34 L57 34 L56 49 Z M50 34 Q44 30 46 20 Q48 12 54 10 Q58 14 56 20 L60 16 Q60 24 52 28 Z" />
      )
    case 'fan':
      return (
        <path d="M44 49 L42 34 L58 34 L56 49 Z M36 34 Q50 6 64 34 Z M44 34 L46 18 M50 34 L50 14 M56 34 L54 18" />
      )
    default:
      return crownTop('cross')
  }
}

function towerTop(kind) {
  switch (kind) {
    case 'wall':
      return <path d="M37 68 L37 40 L63 40 L63 68 Z M35 40 L35 28 L65 28 L65 40 Z M44 28 L44 40 M56 28 L56 40" />
    case 'pylon':
      return <path d="M40 68 L36 36 L64 36 L60 68 Z M36 36 L34 28 L66 28 L64 36 Z M50 30 L50 64" />
    case 'rondavel':
      return (
        <>
          <path d="M38 68 L40 44 L60 44 L62 68 Z" />
          <path d="M34 44 Q50 22 66 44 Z" />
        </>
      )
    case 'stepped':
      return <path d="M40 68 L40 50 L36 50 L36 42 L42 42 L42 34 L58 34 L58 42 L64 42 L64 50 L60 50 L60 68 Z" />
    case 'battlement':
    default:
      return <path d="M38 68 L38 42 L62 42 L62 68 Z M36 42 L36 30 L42 30 L42 36 L47 36 L47 30 L53 30 L53 36 L58 36 L58 30 L64 30 L64 42 Z" />
  }
}

function bishopTop(kind) {
  switch (kind) {
    case 'mask':
      return (
        <>
          <path d="M43 68 Q39 56 47 52 L53 52 Q61 56 57 68 Z" />
          <path d="M50 52 Q40 48 42 32 Q46 16 50 14 Q54 16 58 32 Q60 48 50 52 Z" />
          <circle cx="46" cy="30" r="2.3" fill="var(--accent)" stroke="none" />
          <circle cx="54" cy="30" r="2.3" fill="var(--accent)" stroke="none" />
          <path d="M50 36 L50 44" stroke="var(--accent)" strokeWidth="1.6" fill="none" />
        </>
      )
    case 'flame':
      return (
        <>
          <path d="M43 68 Q39 56 47 52 L53 52 Q61 56 57 68 Z" />
          <path d="M50 52 Q42 44 46 30 Q48 20 50 12 Q52 20 54 30 Q58 44 50 52 Z" />
        </>
      )
    case 'ankh':
      return (
        <>
          <path d="M43 68 Q39 56 47 52 L53 52 Q61 56 57 68 Z" />
          <path d="M44 40 L56 40 L56 46 L52 46 L52 64 L48 64 L48 46 L44 46 Z" />
          <circle cx="50" cy="28" r="9" fill="none" stroke="var(--accent)" strokeWidth="3" />
        </>
      )
    case 'staff':
      return (
        <>
          <path d="M43 68 Q39 56 47 52 L53 52 Q61 56 57 68 Z" />
          <path d="M48 52 L48 20 L52 20 L52 52 Z" />
          <circle cx="50" cy="16" r="6" />
        </>
      )
    case 'mitre':
    default:
      return (
        <>
          <path d="M43 68 Q39 56 47 52 L53 52 Q61 56 57 68 Z" />
          <path d="M50 52 Q38 46 42 32 Q46 18 50 16 Q54 18 58 32 Q62 46 50 52 Z" />
          <path d="M50 44 L50 26 M44 35 L56 35" stroke="var(--accent)" strokeWidth="2" fill="none" />
          <circle cx="50" cy="12" r="3.6" />
        </>
      )
  }
}

function knightTop(kind) {
  if (kind === 'antelope') {
    return (
      <path
        d="M40 68 Q38 58 42 52 Q34 48 35 40 Q36 28 48 24 L50 14 L55 22 Q70 26 70 46 L70 68 Z
           M50 16 Q47 8 44 4 M50 16 Q53 8 56 4"
      />
    )
  }
  return (
    <path
      d="M40 68 Q38 58 42 52 Q34 48 34 40 Q34 28 46 22 Q50 20 52 16 L56 20 Q70 26 70 46 L70 68 Z
         M44 38 Q40 40 42 44"
    />
  )
}

export function createEmpireSet(config) {
  const {
    crown = 'cross',
    queen = 'orb',
    tower = 'battlement',
    bishop = 'mitre',
    knight = 'horse',
    pawn = 'orb',
    base = 'round',
    body = 'curve',
  } = config

  function King({ color, size, className }) {
    return (
      <PieceSvg color={color} size={size} className={className} title="King">
        {baseEl(base)}
        {columnEl(body)}
        {crownTop(crown)}
      </PieceSvg>
    )
  }
  function Queen({ color, size, className }) {
    return (
      <PieceSvg color={color} size={size} className={className} title="Queen">
        {baseEl(base)}
        {columnEl(body)}
        {crownTop(queen)}
      </PieceSvg>
    )
  }
  function Rook({ color, size, className }) {
    return (
      <PieceSvg color={color} size={size} className={className} title="Rook">
        {baseEl(base)}
        {towerTop(tower)}
      </PieceSvg>
    )
  }
  function Bishop({ color, size, className }) {
    return (
      <PieceSvg color={color} size={size} className={className} title="Bishop">
        {baseEl(base)}
        {bishopTop(bishop)}
      </PieceSvg>
    )
  }
  function Knight({ color, size, className }) {
    return (
      <PieceSvg color={color} size={size} className={className} title="Knight">
        {baseEl(base)}
        {knightTop(knight)}
      </PieceSvg>
    )
  }
  function Pawn({ color, size, className }) {
    return (
      <PieceSvg color={color} size={size} className={className} title="Pawn">
        <path d="M33 92 Q31 81 40 79 L60 79 Q69 81 67 92 Z" />
        <path d="M42 79 Q38 66 47 61 L53 61 Q62 66 58 79 Z" />
        {pawn === 'pyramid' ? (
          <path d="M50 38 L62 60 L38 60 Z" />
        ) : pawn === 'disc' ? (
          <circle cx="50" cy="50" r="13" />
        ) : pawn === 'diamond' ? (
          <path d="M50 36 L63 50 L50 64 L37 50 Z" />
        ) : (
          <circle cx="50" cy="49" r="12" />
        )}
      </PieceSvg>
    )
  }

  return { k: King, q: Queen, r: Rook, b: Bishop, n: Knight, p: Pawn }
}
