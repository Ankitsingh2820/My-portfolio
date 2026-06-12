import { motion, useReducedMotion } from 'framer-motion'
import PipelineAnimation from '../components/PipelineAnimation'

const HEADLINE_LINES = [
  'I build pipelines',
  'that move data —',
  'and AI that uses it.',
]

export default function Hero() {
  const reduced = useReducedMotion()

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.15 } },
  }

  const lineVariant = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 pt-20 md:pt-0 max-w-[1200px] mx-auto"
    >
      <p className="font-mono text-xs uppercase tracking-widest text-muted mb-6">
        Data & AI Engineer — India
      </p>

      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        className="font-display font-bold leading-[1.02] tracking-tight text-bone mb-8"
        style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)' }}
      >
        {HEADLINE_LINES.map((text) => (
          <motion.span key={text} variants={lineVariant} className="block">
            {text}
          </motion.span>
        ))}
      </motion.h1>

      <p className="font-sans text-muted text-lg max-w-xl mb-10 leading-relaxed">
        I enjoy turning messy operational data into reliable, automated systems
        — and pairing that with LLM-powered tooling that&apos;s actually useful.
      </p>

      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() => scrollTo('work')}
          className="px-6 py-3 bg-signal text-ink font-mono text-sm uppercase tracking-widest font-medium hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          View work
        </button>
        <button
          onClick={() => scrollTo('contact')}
          className="px-6 py-3 border border-hairline text-bone font-mono text-sm uppercase tracking-widest hover:border-bone transition focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          Get in touch
        </button>
      </div>

      <div className="mt-20">
        <PipelineAnimation />
      </div>
    </section>
  )
}
