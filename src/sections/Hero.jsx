import { motion, useReducedMotion } from 'framer-motion'
import PipelineAnimation from '../components/PipelineAnimation'
import FloatingShapes from '../components/FloatingShapes'
import ankitPhoto from '../assets/ankit.jpg'

export default function Hero() {
  const reduced = useReducedMotion()

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.15 } },
  }

  const lineVariant = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 30 },
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
      className="relative px-4 md:px-8 pt-6 md:pt-10 pb-24 max-w-[1400px] mx-auto"
    >
      <div className="relative glass-strong rounded-[2rem] md:rounded-[2.5rem] px-6 md:px-16 py-16 md:py-24 overflow-hidden shadow-glass">
        <FloatingShapes />

        <div className="relative grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
          <div>
            <motion.p
              initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-xs uppercase tracking-[0.3em] text-cyan mb-6"
            >
              AI Engineer &middot; Scalable AI Agents &amp; Systems
            </motion.p>

            <motion.h1
              variants={container}
              initial="hidden"
              animate="show"
              className="font-display font-bold leading-[1.05] tracking-tight text-bone"
              style={{ fontSize: 'clamp(2.2rem, 3.4vw, 3.6rem)' }}
            >
              <motion.span variants={lineVariant} className="block">
                I build AI agents
              </motion.span>
              <motion.span variants={lineVariant} className="block">
                that scale in production &mdash;
              </motion.span>
              <motion.span variants={lineVariant} className="block text-gradient">
                Ankit Kumar.
              </motion.span>
            </motion.h1>

            <p className="font-sans text-muted text-lg max-w-xl mt-8 mb-10 leading-relaxed">
              I design and ship multi-agent systems &mdash; RAG pipelines, evaluation
              platforms, and orchestration layers &mdash; built to hold up under real
              traffic, not just a demo.
            </p>

            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => scrollTo('work')}
                className="px-7 py-3.5 rounded-full bg-cyan text-ink font-mono text-sm uppercase tracking-widest font-medium hover:brightness-110 hover:shadow-glow transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                View Projects
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="px-7 py-3.5 rounded-full glass text-bone font-mono text-sm uppercase tracking-widest hover:border-cyan/50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Contact Me
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative glass rounded-3xl p-8 md:p-10 shadow-glow-sm">
              <img
                src={ankitPhoto}
                alt="Ankit Kumar"
                className="mx-auto w-28 h-28 md:w-32 md:h-32 rounded-full object-cover shadow-glow ring-2 ring-cyan/40"
              />
              <p className="text-center font-display text-bone font-semibold text-lg mt-5">
                Ankit Kumar
              </p>
              <p className="text-center font-mono text-[0.65rem] uppercase tracking-widest text-muted mt-1">
                Agents &middot; RAG &middot; Evaluation
              </p>

              <div className="mt-8 pt-6 border-t border-hairline">
                <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted mb-3">
                  Live pipeline
                </p>
                <PipelineAnimation />
              </div>
            </div>

            <motion.div
              className="hidden sm:block absolute -top-6 -right-4 md:-right-8 glass rounded-2xl px-4 py-3 shadow-glow-sm"
              animate={reduced ? {} : { y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="font-display font-bold text-cyan text-xl leading-none">6+</p>
              <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted mt-1">
                AI Projects
              </p>
            </motion.div>

            <motion.div
              className="hidden sm:block absolute -bottom-6 -left-4 md:-left-8 glass rounded-2xl px-4 py-3 shadow-glow-sm"
              animate={reduced ? {} : { y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <p className="font-display font-bold text-cyan text-xl leading-none">200+</p>
              <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted mt-1">
                LeetCode Solved
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
