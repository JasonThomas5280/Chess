import { motion } from 'framer-motion'
import clsx from 'clsx'
import Piece from '../board/Piece.jsx'

const PREVIEW = ['k', 'q', 'r', 'b', 'n', 'p']

// Preview tile for one empire: palette swatches, a live mini row of its pieces
// and cultural blurb. Pieces are rendered with the empire's own theme id so the
// preview is accurate regardless of the currently-active set.
export default function SetCard({ theme, active, onSelect }) {
  const p = theme.palette
  return (
    <motion.button
      layout
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(theme.id)}
      className={clsx(
        'group relative flex flex-col overflow-hidden rounded-2xl border text-left transition',
        active
          ? 'border-accent shadow-glow'
          : 'border-white/10 hover:border-accent/50'
      )}
      style={{ background: `linear-gradient(160deg, ${p.bgFrom}, ${p.bgTo})` }}
    >
      {active && (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-accent px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-black">
          Active
        </span>
      )}

      {/* Mini board + pieces preview */}
      <div className="p-4 pb-2">
        <div
          className="mb-3 flex items-end gap-0.5 rounded-lg p-2"
          style={{
            background: `repeating-conic-gradient(${p.lightSquare} 0deg 90deg, ${p.darkSquare} 90deg 180deg)`,
            backgroundSize: '28px 28px',
            // Scope this empire's palette to the preview so each card shows its
            // OWN piece colors, not the globally-active theme's.
            '--white-piece': p.whitePiece,
            '--black-piece': p.blackPiece,
            '--accent': p.accent,
            '--glow': p.glow,
          }}
        >
          {PREVIEW.map((t, i) => (
            <span key={t} className="h-9 w-9 drop-shadow">
              <Piece type={t} color={i % 2 === 0 ? 'w' : 'b'} themeId={theme.id} />
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg font-bold text-white">{theme.name}</h3>
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: p.accent }}>
          {theme.region} · {theme.era}
        </p>
      </div>

      <p className="px-4 pb-3 text-sm leading-snug text-white/75">{theme.blurb}</p>

      {/* Palette swatches */}
      <div className="mt-auto flex gap-1 px-4 pb-4">
        {[p.lightSquare, p.darkSquare, p.accent, p.glow, p.whitePiece].map((c, i) => (
          <span
            key={i}
            className="h-4 w-full rounded-sm ring-1 ring-black/20"
            style={{ background: c }}
          />
        ))}
      </div>
    </motion.button>
  )
}
