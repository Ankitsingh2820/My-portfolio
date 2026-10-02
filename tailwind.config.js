/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050914',
        'ink-2': '#0A1220',
        panel: '#0D1526',
        bone: '#EAF4F4',
        muted: '#7E96A6',
        signal: '#E8A33D',
        'signal-cyan': '#3FE9DA',
        cyan: '#3FE9DA',
        'cyan-soft': '#9BF3EA',
        violet: '#8B7CF6',
        hairline: 'rgba(159, 214, 210, 0.16)',
        glass: 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 50px -12px rgba(63, 233, 218, 0.45)',
        'glow-sm': '0 0 24px -8px rgba(63, 233, 218, 0.4)',
        'glow-violet': '0 0 50px -12px rgba(139, 124, 246, 0.4)',
        glass: '0 8px 40px -8px rgba(0, 0, 0, 0.55)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(var(--r, 0deg))' },
          '50%': { transform: 'translateY(-18px) rotate(var(--r, 0deg))' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-slower': 'float 13s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
