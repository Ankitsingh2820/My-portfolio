import { motion, useReducedMotion } from 'framer-motion'

const STEPS = [
  { n: '01', title: 'Discovery Call & Scoping', desc: 'A short call to understand the problem, your data, and constraints.' },
  { n: '02', title: 'Fixed Proposal', desc: 'A clear, fixed-price proposal: what gets built, the timeline, what’s out of scope.' },
  { n: '03', title: 'Build, With Weekly Demos', desc: 'Short build cycles with a demo every week, so there are no surprises.' },
  { n: '04', title: 'Evaluation & Handover', desc: 'Tested against real cases before anything ships, with results documented.' },
  { n: '05', title: 'Deploy & Support', desc: 'Deployed into your environment, with support after launch.' },
]

export default function Process() {
  const reduced = useReducedMotion()

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: reduced ? 0 : delay },
    },
  })

  return (
    <section
      id="process"
      className="relative px-4 md:px-8 py-16 max-w-[1400px] mx-auto"
    >
      <motion.div
        variants={fadeUp()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="mb-12 px-2 md:px-6"
      >
        <p className="font-mono text-[13px] uppercase tracking-widest text-cyan mb-4">
          03 — process
        </p>
        <h2
          className="font-display font-bold text-bone"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
        >
          How we&apos;ll work together
        </h2>
      </motion.div>

      <div className="glass rounded-3xl p-8 md:p-12 shadow-glass">
        <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
          <span
            aria-hidden="true"
            className="hidden md:block absolute left-[10%] right-[10%] top-[22px] h-px bg-hairline"
          />
          {STEPS.map(({ n, title, desc }, i) => (
            <motion.div
              key={n}
              variants={fadeUp(i * 0.08)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="relative flex md:flex-col items-center md:items-start gap-4 md:gap-0"
            >
              <span className="relative z-10 w-11 h-11 rounded-full glass-strong flex items-center justify-center font-mono text-[13px] text-cyan shrink-0 shadow-glow-sm">
                {n}
              </span>
              <div>
                <h3 className="font-display text-bone font-semibold text-sm md:mt-4">
                  {title}
                </h3>
                <p className="font-sans text-muted text-[13px] leading-relaxed mt-2">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
