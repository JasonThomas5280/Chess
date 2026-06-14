import { pieceFill, pieceStroke } from './types.js'

// Shared SVG frame for every piece. Provides a consistent 100x100 viewBox,
// the side-driven fill/stroke, an accent rim and a soft inner highlight so the
// silhouettes read as carved/cast objects rather than flat shapes.
//
// Children receive nothing special — they just draw paths and inherit `fill`.
export default function PieceSvg({ color, size, className = '', children, title }) {
  const fill = pieceFill(color)
  const stroke = pieceStroke(color)
  const dim = size ?? '100%'
  return (
    <svg
      viewBox="0 0 100 100"
      width={dim}
      height={dim}
      className={className}
      role="img"
      aria-label={title}
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="pieceSheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.22)" />
        </linearGradient>
      </defs>
      <g
        fill={fill}
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {children}
      </g>
      {/* Accent rim shared by all pieces (the empire's accent color). */}
      <g
        fill="none"
        stroke="var(--accent)"
        strokeOpacity="0.55"
        strokeWidth="1.1"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{ pointerEvents: 'none' }}
      >
        {children}
      </g>
      {/* Soft top-down sheen overlay clipped to the silhouette. */}
      <g fill="url(#pieceSheen)" style={{ pointerEvents: 'none', mixBlendMode: 'overlay' }}>
        {children}
      </g>
    </svg>
  )
}
