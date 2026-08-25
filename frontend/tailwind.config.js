/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        solar: {
          50:  '#fff9eb',
          100: '#fef0c7',
          200: '#fedc89',
          300: '#fec44a',
          400: '#fda921',
          500: '#f78708',  // naranja solar principal
          600: '#db6102',
          700: '#b64006',
          800: '#943010',
          900: '#7a280f',
          950: '#461105',
        },
        corona: {
          400: '#60a5fa',  // azul corona AIA 171
          500: '#3b82f6',
          600: '#2563eb',
        },
        storm: {
          g1: '#eab308',
          g2: '#f97316',
          g3: '#ef4444',
          g4: '#a855f7',
          g5: '#7c3aed',
        },
      },
      fontFamily: {
        space: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-solar': 'pulse-solar 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ticker': 'ticker 30s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-solar': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.85', transform: 'scale(1.02)' },
        },
        'ticker': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'glow': {
          'from': { boxShadow: '0 0 20px #f78708, 0 0 40px #f78708' },
          'to':   { boxShadow: '0 0 30px #fda921, 0 0 60px #fda921, 0 0 80px #fec44a' },
        },
      },
      backgroundImage: {
        'space-gradient': 'radial-gradient(ellipse at top, #0f172a 0%, #020617 60%, #000000 100%)',
        'solar-glow': 'radial-gradient(circle, rgba(253,169,33,0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};
