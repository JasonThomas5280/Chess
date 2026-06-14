/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Driven by CSS custom properties set per-empire by ThemeProvider.
        'board-light': 'var(--light-sq)',
        'board-dark': 'var(--dark-sq)',
        'board-border': 'var(--board-border)',
        'piece-white': 'var(--white-piece)',
        'piece-black': 'var(--black-piece)',
        accent: 'var(--accent)',
        glow: 'var(--glow)',
        'bg-from': 'var(--bg-from)',
        'bg-to': 'var(--bg-to)',
      },
      fontFamily: {
        display: ['"Cinzel"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px var(--glow)',
        'glow-sm': '0 0 8px var(--glow)',
        'glow-lg': '0 0 40px var(--glow)',
      },
      keyframes: {
        'pulse-ring': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 1.4s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 12s ease infinite',
        'fade-up': 'fade-up 0.4s ease-out both',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}
