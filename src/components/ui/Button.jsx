import clsx from 'clsx'

// Shared themed button. `variant` controls emphasis.
export default function Button({
  variant = 'default',
  className = '',
  children,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-40'
  const variants = {
    default: 'bg-white/10 text-white hover:bg-white/20',
    primary:
      'bg-accent/90 text-black shadow-glow-sm hover:bg-accent hover:shadow-glow',
    ghost: 'bg-transparent text-white/70 hover:bg-white/10 hover:text-white',
    danger: 'bg-red-500/20 text-red-200 hover:bg-red-500/40',
  }
  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}
