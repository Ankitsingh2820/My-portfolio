import { motion, useReducedMotion } from 'framer-motion'
import PipelineAnimation from '../components/PipelineAnimation'
import FloatingShapes from '../components/FloatingShapes'
import ankitPhoto from '../assets/ankit.jpg'
import { BOOKING_URL } from '../constants'

// Kept to the right/edge area so shapes never sit behind the headline or
// buttons, with lower opacity than the default set, and hidden below 1024px
// (see the `hidden lg:block` wrapper below).
const HERO_SHAPES = [
  { top: '-6%', left: '72%', size: 46, delay: '0s', dur: 'animate-float-slow', tint: 'hue-rotate(150deg) saturate(1.3)', opacity: 0.3, rot: -10 },
  { top: '18%', left: '95%', size: 40, delay: '0.5s', dur: 'animate-float', tint: 'hue-rotate(10deg) saturate(1.1)', opacity: 0.28, rot: 16 },
  { top: '92%', left: '85%', size: 44, delay: '0.2s', dur: 'animate-float-slower', tint: 'hue-rotate(150deg) saturate(1.2)', opacity: 0.26, rot: 10 },
]

export default function Hero() {
  const reduced = useReducedMotion()

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.12 } },
  }

  const lineVariant = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative px-4 md:px-8 pt-4 md:pt-6 pb-16 max-w-[1400px] mx-auto"
    >
      <div className="relative glass-strong rounded-[2rem] md:rounded-[2.5rem] px-6 md:px-12 py-10 md:py-14 overflow-hidden shadow-glass">
        <div className="relative grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-14 items-center">
          <div>
            <motion.p
              initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-[13px] uppercase tracking-[0.25em] text-cyan mb-3"
            >
              Freelance AI Engineer &middot; Legal &amp; Document-Heavy Teams
            </motion.p>

            <motion.h1
              variants={container}
              initial="hidden"
              animate="show"
              className="font-display font-bold leading-[1.08] tracking-tight text-bone [text-wrap:balance]"
              style={{ fontSize: 'clamp(2.2rem, 3.6vw, 3.4rem)' }}
            >
              <motion.span variants={lineVariant} className="block">
                Accurate answers,
              </motion.span>
              <motion.span variants={lineVariant} className="block">
                straight from your
              </motion.span>
              <motion.span variants={lineVariant} className="block text-gradient">
                own documents.
              </motion.span>
            </motion.h1>

            <p className="font-sans text-muted text-base md:text-lg max-w-xl mt-4 mb-7 leading-relaxed">
              I build RAG systems, document AI, and AI agents that automate
              document-heavy workflows — grounded in your own data, with
              lower AI costs than a generic chatbot.
            </p>

            <div className="flex gap-3 flex-wrap">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-cyan text-ink font-sans text-base font-semibold hover:brightness-110 hover:shadow-glow transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Book a call
              </a>
              <button
                onClick={() => scrollTo('work')}
                className="px-6 py-3 rounded-full glass text-bone font-sans text-base font-semibold hover:border-cyan/50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                See my work
              </button>
            </div>
          </div>

          <div className="relative min-w-0">
            <div className="hidden lg:block">
              <FloatingShapes shapes={HERO_SHAPES} />
            </div>

            <div className="relative glass rounded-3xl p-6 md:p-8 shadow-glow-sm">
              <img
                src={ankitPhoto}
                alt="Ankit Kumar"
                className="mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-glow ring-2 ring-cyan/40"
              />
              <p className="text-center font-display text-bone font-semibold text-base mt-4">
                Ankit Kumar
              </p>
              <p className="text-center font-sans text-[13px] text-muted mt-1">
                AI Engineer &middot; Legal &amp; Document AI
              </p>

              <div className="mt-6 pt-5 border-t border-hairline">
                <p className="font-sans text-[13px] text-muted mb-3">
                  Live pipeline
                </p>
                <PipelineAnimation />
              </div>
            </div>

            <motion.div
              className="hidden sm:block absolute -top-4 -right-3 md:-right-6 glass rounded-2xl px-4 py-3 shadow-glow-sm max-w-[150px]"
              animate={reduced ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="font-display font-bold text-cyan text-sm leading-snug">
                Production AI
              </p>
              <p className="font-sans text-[13px] text-muted mt-0.5">
                in legal-tech
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
