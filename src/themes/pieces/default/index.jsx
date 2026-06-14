import PieceSvg from '../PieceSvg.jsx'

// Classic Staunton-inspired silhouette set, used as the universal fallback and
// as the base geometry that empire sets riff on. A shared rounded base anchors
// every piece; the distinctive top defines the piece type.

const Base = () => (
  <path d="M28 92 Q26 80 34 78 L66 78 Q74 80 72 92 Z M34 78 Q33 72 40 70 L60 70 Q67 72 66 78 Z" />
)

function King({ color, size, className }) {
  return (
    <PieceSvg color={color} size={size} className={className} title="King">
      <Base />
      <path d="M40 70 Q36 56 44 50 L56 50 Q64 56 60 70 Z" />
      <path d="M44 50 Q40 40 50 38 Q60 40 56 50 Z" />
      {/* Crown cross */}
      <path d="M46 38 L54 38 L54 30 L58 30 L58 24 L54 24 L54 18 L46 18 L46 24 L42 24 L42 30 L46 30 Z" />
    </PieceSvg>
  )
}

function Queen({ color, size, className }) {
  return (
    <PieceSvg color={color} size={size} className={className} title="Queen">
      <Base />
      <path d="M40 70 Q36 56 44 50 L56 50 Q64 56 60 70 Z" />
      {/* Coronet with five points */}
      <path d="M40 50 L36 28 L44 42 L50 24 L56 42 L64 28 L60 50 Z" />
      <circle cx="36" cy="26" r="3.4" />
      <circle cx="50" cy="22" r="3.4" />
      <circle cx="64" cy="26" r="3.4" />
    </PieceSvg>
  )
}

function Rook({ color, size, className }) {
  return (
    <PieceSvg color={color} size={size} className={className} title="Rook">
      <Base />
      <path d="M38 70 L38 44 L62 44 L62 70 Z" />
      {/* Battlements */}
      <path d="M36 44 L36 30 L42 30 L42 36 L47 36 L47 30 L53 30 L53 36 L58 36 L58 30 L64 30 L64 44 Z" />
    </PieceSvg>
  )
}

function Bishop({ color, size, className }) {
  return (
    <PieceSvg color={color} size={size} className={className} title="Bishop">
      <Base />
      <path d="M42 70 Q38 58 46 54 L54 54 Q62 58 58 70 Z" />
      <path d="M50 54 Q38 48 42 36 Q46 24 50 22 Q54 24 58 36 Q62 48 50 54 Z" />
      <path d="M50 36 L50 26 M45 31 L55 31" stroke="var(--accent)" strokeWidth="2" fill="none" />
      <circle cx="50" cy="18" r="4" />
    </PieceSvg>
  )
}

function Knight({ color, size, className }) {
  return (
    <PieceSvg color={color} size={size} className={className} title="Knight">
      <Base />
      <path
        d="M40 70 Q38 60 42 54 Q34 50 34 42 Q34 30 46 24 Q50 22 52 18 L56 22 Q70 28 70 46 L70 70 Z
           M44 40 Q40 42 42 46"
      />
      <circle cx="44" cy="38" r="2.2" fill="var(--accent)" stroke="none" />
    </PieceSvg>
  )
}

function Pawn({ color, size, className }) {
  return (
    <PieceSvg color={color} size={size} className={className} title="Pawn">
      <path d="M34 92 Q32 82 40 80 L60 80 Q68 82 66 92 Z" />
      <path d="M42 80 Q38 68 46 62 L54 62 Q62 68 58 80 Z" />
      <circle cx="50" cy="50" r="12" />
    </PieceSvg>
  )
}

export default { k: King, q: Queen, r: Rook, b: Bishop, n: Knight, p: Pawn }
