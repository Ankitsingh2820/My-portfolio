import heroCube from '../assets/hero.png'

const DEFAULT_SHAPES = [
  { top: '6%', left: '4%', size: 70, delay: '0s', dur: 'animate-float-slow', tint: 'hue-rotate(150deg) saturate(1.4)', opacity: 0.5, rot: -12 },
  { top: '14%', left: '88%', size: 54, delay: '0.6s', dur: 'animate-float', tint: 'hue-rotate(10deg) saturate(1.1)', opacity: 0.45, rot: 18 },
  { top: '55%', left: '92%', size: 90, delay: '0.2s', dur: 'animate-float-slower', tint: 'hue-rotate(150deg) saturate(1.3)', opacity: 0.4, rot: 8 },
  { top: '78%', left: '2%', size: 64, delay: '0.9s', dur: 'animate-float', tint: 'hue-rotate(150deg) saturate(1.4)', opacity: 0.4, rot: -20 },
  { top: '35%', left: '8%', size: 40, delay: '0.3s', dur: 'animate-float-slow', tint: 'hue-rotate(150deg) saturate(1.2)', opacity: 0.35, rot: 30 },
]

export default function FloatingShapes({ shapes = DEFAULT_SHAPES, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {shapes.map((s, i) => (
        <img
          key={i}
          src={heroCube}
          alt=""
          className={`absolute select-none ${s.dur}`}
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: 'auto',
            opacity: s.opacity,
            filter: `drop-shadow(0 0 18px rgba(63,233,218,0.25)) ${s.tint}`,
            animationDelay: s.delay,
            '--r': `${s.rot}deg`,
          }}
        />
      ))}
    </div>
  )
}
