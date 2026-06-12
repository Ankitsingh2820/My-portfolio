/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14161D',
        panel: '#1B1E27',
        bone: '#ECE7DC',
        muted: '#8A8F9C',
        signal: '#E8A33D',
        'signal-cyan': '#5FD3C4',
        hairline: '#2A2E39',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

