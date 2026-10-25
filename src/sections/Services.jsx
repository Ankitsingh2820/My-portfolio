import { motion, useReducedMotion } from 'framer-motion'
import { IconLayers, IconFileScan, IconChip, IconTarget, IconLaunch } from '../components/icons'
import { BOOKING_URL } from '../constants'

const SERVICES = [
  {
    icon: IconLayers,
    title: 'RAG & Document Chatbots',
    description:
      'AI assistants grounded in your own PDFs, scanned files, docs, and knowledge bases — with citations back to the source, not guesses.',
    timeline: 'TODO',
    startingFrom: 'TODO',
    featured: true,
  },
  {
    icon: IconFileScan,
    title: 'Document AI & Automation',
    description:
      'OCR, data extraction, summarization, timelines, and automated document generation for legal, insurance, finance, and real estate teams.',
    timeline: 'TODO',
    startingFrom: 'TODO',
  },
  {
    icon: IconChip,
    title: 'AI Agents & Workflow Automation',
    description:
      'LangGraph agents and n8n/MCP integrations for lead handling, email triage, CRM updates, and reporting.',
    timeline: 'TODO',
    startingFrom: 'TODO',
  },
  {
    icon: IconTarget,
    title: 'LLM Cost & Reliability Audit',
    description:
      'I measure an existing AI feature, then cut token cost and latency with prompt caching, model routing, and multi-provider fallback — plus evaluation in CI so quality doesn’t regress.',
    timeline: 'TODO',
    startingFrom: 'TODO',
  },
  {
    icon: IconLaunch,
    title: 'AI Features for Your App',
    description:
      'Production FastAPI services and REST APIs that add AI to an existing product, containerized with Docker.',
    timeline: 'TODO',
    startingFrom: 'TODO',
  },
]

function ServiceCard({ service, delay, reduced }) {
  const Icon = service.icon
  const fadeUp = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: reduced ? 0 : delay },
    },
  }

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className={`relative rounded-3xl p-7 md:p-8 shadow-glass hover:shadow-glow-sm transition-shadow flex flex-col ${
        service.featured
          ? 'glass-strong md:col-span-2 border border-cyan/30'
          : 'glass'
      }`}
    >
      {service.featured && (
        <span className="absolute top-6 right-7 font-mono text-[13px] uppercase tracking-widest text-cyan">
          Core offering
        </span>
      )}
      <span className="w-12 h-12 rounded-2xl glass-strong flex items-center justify-center text-cyan shadow-glow-sm mb-6">
        <Icon width={22} height={22} />
      </span>
      <h3 className="font-display text-lg md:text-xl font-semibold text-bone mb-3 pr-20">
        {service.title}
      </h3>
      <p className="font-sans text-muted text-base leading-relaxed mb-6 flex-1">
        {service.description}
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-hairline">
        <div>
          <p className="font-sans text-[13px] text-muted">Typical timeline</p>
          <p className="font-sans text-sm font-semibold text-bone">{service.timeline}</p>
        </div>
        <div>
          <p className="font-sans text-[13px] text-muted">Starting from</p>
          <p className="font-sans text-sm font-semibold text-bone">{service.startingFrom}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const reduced = useReducedMotion()

  const fadeUp = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section id="services" className="relative py-16 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-cyan/[0.06] via-cyan/[0.02] to-transparent pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80rem] h-[40rem] rounded-full bg-cyan/5 blur-3xl pointer-events-none"
      />

      <div className="relative px-4 md:px-8 max-w-[1400px] mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12 px-2 md:px-6"
        >
          <p className="font-mono text-[13px] uppercase tracking-widest text-cyan mb-4">
            01 — services
          </p>
          <h2
            className="font-display font-bold text-bone"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
          >
            How I can help your business
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} delay={i * 0.08} reduced={reduced} />
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="flex justify-center mt-12"
        >
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-full bg-cyan text-ink font-sans text-base font-semibold hover:brightness-110 hover:shadow-glow transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          >
            Book a call
          </a>
        </motion.div>
      </div>
    </section>
  )
}
