import { motion, useReducedMotion } from 'framer-motion'
import { IconChip, IconLayers, IconLaunch } from '../components/icons'

const SERVICES = [
  {
    icon: IconChip,
    title: 'Scalable AI Agents',
    description:
      'Designing multi-agent systems and orchestration pipelines — tool use, shared scoring primitives, and workflows built to hold up under real traffic, not just a demo.',
  },
  {
    icon: IconLayers,
    title: 'RAG & Knowledge Retrieval',
    description:
      'Hybrid vector + knowledge-graph retrieval, reflection loops that verify grounding, and ingestion pipelines that keep answers accurate as data changes.',
  },
  {
    icon: IconLaunch,
    title: 'Agent Evaluation & MLOps',
    description:
      'Tracing every model and tool call, running paired experiments with statistical verdicts, and shipping it all behind Docker, CI/CD, and monitoring.',
  },
]

export default function Services() {
  const reduced = useReducedMotion()

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: reduced ? 0 : delay },
    },
  })

  return (
    <section
      id="services"
      className="relative px-4 md:px-8 py-16 max-w-[1400px] mx-auto"
    >
      <motion.div
        variants={fadeUp()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="mb-16 px-2 md:px-6"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-cyan mb-4">
          04 — services
        </p>
        <h2
          className="font-display font-bold text-bone"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          What I do
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SERVICES.map(({ icon: Icon, title, description }, i) => (
          <motion.div
            key={title}
            variants={fadeUp(i * 0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="glass rounded-3xl p-8 shadow-glass hover:shadow-glow-sm transition-shadow"
          >
            <span className="w-12 h-12 rounded-2xl glass-strong flex items-center justify-center text-cyan shadow-glow-sm mb-6">
              <Icon width={22} height={22} />
            </span>
            <h3 className="font-display text-lg font-semibold text-bone mb-3">
              {title}
            </h3>
            <p className="font-sans text-muted text-sm leading-relaxed">
              {description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
