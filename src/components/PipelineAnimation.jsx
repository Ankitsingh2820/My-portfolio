import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const NODES = ['Ingest', 'Transform', 'Embed', 'Retrieve', 'Generate']
const NODE_W = 110
const NODE_H = 38
const GAP = 50
const CY = 50
const PARTICLE_COUNT = 10
const TOTAL_W = NODES.length * NODE_W + (NODES.length - 1) * GAP
const TOTAL_H = CY * 2

export default function PipelineAnimation() {
  const reduced = useReducedMotion()
  const svgRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    if (reduced || !svgRef.current) return

    const svg = svgRef.current
    const segW = NODE_W + GAP
    const totalLineW = (NODES.length - 1) * segW

    const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const circle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      )
      circle.setAttribute('r', '3')
      circle.setAttribute('fill', '#E8A33D')
      circle.setAttribute('opacity', '0')
      svg.appendChild(circle)
      return {
        x: (i / PARTICLE_COUNT) * totalLineW,
        speed: 0.7 + Math.random() * 0.5,
        el: circle,
      }
    })

    const animate = () => {
      particles.forEach((p) => {
        p.x = (p.x + p.speed) % totalLineW
        const seg = Math.floor(p.x / segW)
        const localX = p.x % segW
        if (localX < NODE_W) {
          p.el.setAttribute('opacity', '0')
          return
        }
        const absX = seg * segW + localX
        p.el.setAttribute('cx', String(absX))
        p.el.setAttribute('cy', String(CY))
        p.el.setAttribute('opacity', '1')
      })
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      particles.forEach((p) => p.el.remove())
    }
  }, [reduced])

  return (
    <div className="overflow-x-auto pb-2">
      <svg
        ref={svgRef}
        width={TOTAL_W}
        height={TOTAL_H}
        viewBox={`0 0 ${TOTAL_W} ${TOTAL_H}`}
        aria-label="Data pipeline: Ingest → Transform → Embed → Retrieve → Generate"
        role="img"
      >
        {/* Connector lines */}
        {NODES.slice(0, -1).map((_, i) => (
          <line
            key={i}
            x1={i * (NODE_W + GAP) + NODE_W}
            y1={CY}
            x2={(i + 1) * (NODE_W + GAP)}
            y2={CY}
            stroke="#2A2E39"
            strokeWidth="1.5"
          />
        ))}

        {/* Node boxes */}
        {NODES.map((label, i) => (
          <g key={label}>
            <rect
              x={i * (NODE_W + GAP)}
              y={CY - NODE_H / 2}
              width={NODE_W}
              height={NODE_H}
              rx="2"
              fill="#1B1E27"
              stroke="#2A2E39"
              strokeWidth="1"
            />
            <text
              x={i * (NODE_W + GAP) + NODE_W / 2}
              y={CY + 5}
              textAnchor="middle"
              fill="#8A8F9C"
              fontFamily="JetBrains Mono, monospace"
              fontSize="11"
            >
              {label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
