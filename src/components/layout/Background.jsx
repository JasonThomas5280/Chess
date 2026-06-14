// Animated, empire-themed gradient backdrop. Colors come from the active
// palette's CSS custom props, so it shifts with the chosen set. Two slow
// radial glows drift to give depth without distracting from the board.
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, var(--bg-from), var(--bg-to))',
          backgroundSize: '200% 200%',
        }}
      />
      <div className="absolute inset-0 animate-gradient-shift opacity-60"
        style={{
          background:
            'radial-gradient(60rem 60rem at 15% 20%, color-mix(in srgb, var(--glow) 22%, transparent), transparent 60%), radial-gradient(50rem 50rem at 85% 80%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 60%)',
          backgroundSize: '180% 180%',
        }}
      />
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  )
}
