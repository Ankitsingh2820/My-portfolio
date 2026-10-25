import { motion, useReducedMotion } from 'framer-motion'

const CASE_STUDY = {
  company: 'Rest The Case (Lexicon Group)',
  role: 'AI Developer · Mar 2026 – present',
  problem:
    'Legal teams need fast, accurate answers from large volumes of case documents — summarization, research, and timelines that stay grounded in the source material, not plausible-sounding guesses.',
  built: [
    'Shipped the platform’s core AI features: legal document summarization, case research, and timeline generation.',
    'RAG over PDFs and scanned documents with chunking, embeddings, FAISS vector search, and reranking, so answers stay grounded in source material.',
    'A multi-agent setup on LiteLLM routing simple tasks to cheaper models and complex reasoning to stronger ones, with automatic fallback when a provider fails.',
    'Prompt caching for repeated context, making responses faster and cheaper.',
    'DeepEval in CI as a release gate, plus online monitoring of grounding, hallucination rate, and latency.',
    'Diagnosed a silent production failure hidden behind a misleading rate-limit error and re-architected it as a multi-model fallback layer.',
    'Guardrails against prompt injection, rate limiting, retries, structured logging, and tracing via AWS CloudWatch.',
  ],
  result: 'TODO: add a result metric (e.g. time saved, cost reduction, accuracy/uptime figure).',
}

const PROJECTS = [
  {
    title: 'KnowledgeForge',
    usefulFor: 'Companies that want one assistant across Drive, Slack, GitHub, and PDFs.',
    description:
      'A multi-tenant enterprise knowledge platform for AI agents — hybrid vector + graph retrieval, a reflection loop that verifies answers are grounded before returning them, and async ingestion from PDFs, GitHub, Slack, and Drive.',
    tags: ['FastAPI', 'Qdrant', 'Neo4j', 'PostgreSQL'],
    href: 'https://github.com/Ankitsingh2820/KnowledgeForge',
    live: null,
    featured: true,
  },
  {
    title: 'AgentEval',
    usefulFor: 'Teams running LLM agents in production who need to prove quality, cost, and latency before shipping a change.',
    description:
      'A production platform that evaluates and optimizes LLM agents on measured quality, cost, and latency — traces every model and tool call, runs paired baseline-vs-candidate experiments with statistical verdicts, and recommends optimizations backed by evidence.',
    tags: ['FastAPI', 'Celery', 'PostgreSQL', 'React'],
    href: 'https://github.com/Ankitsingh2820/AgentEvals',
    live: 'https://agentevals-o7cmqmhhycu28cappkrxggb.streamlit.app/',
    featured: true,
  },
  {
    title: 'RAG Gemini AI System',
    usefulFor: 'A reference RAG build showing the pattern end to end — retrieval, grounding, and answer synthesis.',
    description:
      'Retrieval-Augmented Generation system using the Gemini API, LangChain, and semantic search for contextual, accurate AI responses.',
    tags: ['Python', 'Gemini API', 'LangChain', 'Vector DB'],
    href: 'https://github.com/Ankitsingh2820/Rag_gemini',
    live: 'https://raggemini-sgydghhwunzcauwdn7b3bh.streamlit.app/',
  },
  {
    title: 'LightNote De-Editor',
    usefulFor: 'Teams that need a complex, multi-stage document/media pipeline built and verified end to end, not just a prototype.',
    description:
      'An agentic video-processing pipeline that decomposes short-form video back into its editable tracks — scene detection, OCR, Whisper ASR, VLM classification, and inpainting — with every stage verified by re-running detection on its own output.',
    tags: ['Python', 'FastAPI', 'Whisper', 'RapidOCR'],
    href: 'https://github.com/Ankitsingh2820/url-deeditor',
    live: null,
  },
  {
    title: 'PlacementOS',
    usefulFor: 'Products that need several AI tools sharing one consistent pipeline instead of bolted-together scripts.',
    description:
      'A multi-tool AI job-search platform where mock interviews, resume tailoring, cold outreach, and application coaching all run through one shared agent pipeline and scoring primitive, powered by Groq’s Llama 3.3 70B.',
    tags: ['FastAPI', 'Groq', 'React', 'Vite'],
    href: 'https://github.com/Ankitsingh2820/placementOS',
    live: 'https://placementos-k6zc.onrender.com',
  },
  {
    title: 'Science Teacher Tool',
    usefulFor: 'Education and support products that need structured, age-appropriate AI explanations rather than generic chatbot answers.',
    description:
      'AI-powered science teaching assistant that delivers structured, age-appropriate explanations with step-by-step breakdowns.',
    tags: ['React', 'Vite', 'Python', 'Flask'],
    href: 'https://github.com/Ankitsingh2820/Science-_Teacher',
    live: 'https://ankitsingh2820.github.io/Science-_Teacher/',
  },
]

function initials(title) {
  return title
    .split(' ')
    .filter((w) => /[A-Za-z]/.test(w[0]))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

function ProjectCard({ project }) {
  const reduced = useReducedMotion()
  const primaryHref = project.live || project.href
  return (
    <motion.div
      whileHover={reduced ? {} : { y: -6 }}
      className={`group relative glass rounded-3xl overflow-hidden flex flex-col shadow-glass hover:shadow-glow-sm transition-shadow ${
        project.featured ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Full-card link. Kept as a sibling (not an ancestor) of the two
          links below so we never nest <a> inside <a>. The action links
          sit above it via z-index, so they stay independently clickable. */}
      <a
        href={primaryHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title}`}
        className="absolute inset-0 rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-inset"
      />

      <div className="relative aspect-video bg-gradient-to-br from-cyan/15 via-ink-2 to-violet/10 flex items-center justify-center pointer-events-none">
        <span className="font-display text-4xl font-bold text-bone/25">
          {initials(project.title)}
        </span>
      </div>

      <div className="p-7 md:p-8 flex flex-col flex-1">
        <h3 className="font-display text-xl font-semibold text-bone mb-2">
          {project.title}
        </h3>
        <p className="font-sans text-cyan text-[13px] mb-3">
          Useful for: {project.usefulFor}
        </p>
        <p className="font-sans text-muted text-base leading-relaxed mb-6 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="font-sans text-[13px] text-muted border border-hairline rounded-full px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="relative z-10 flex gap-3">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[13px] text-cyan border border-cyan/40 rounded-full px-3.5 py-1.5 hover:bg-cyan hover:text-ink transition-colors"
            >
              Live Demo →
            </a>
          )}
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[13px] text-muted border border-hairline rounded-full px-3.5 py-1.5 hover:text-bone hover:border-bone transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function CaseStudy() {
  const reduced = useReducedMotion()
  const fadeUp = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      className="glass-strong rounded-[2rem] p-8 md:p-14 shadow-glass mb-10 border border-cyan/20"
    >
      <p className="font-mono text-[13px] uppercase tracking-widest text-cyan mb-4">
        Featured case study
      </p>
      <h3 className="font-display text-2xl md:text-3xl font-bold text-bone mb-1">
        {CASE_STUDY.company}
      </h3>
      <p className="font-sans text-muted text-base mb-8">{CASE_STUDY.role}</p>

      <div className="mb-8">
        <p className="font-sans text-[13px] text-cyan mb-2">Problem</p>
        <p className="font-sans text-bone text-base leading-relaxed max-w-3xl">
          {CASE_STUDY.problem}
        </p>
      </div>

      <div className="mb-8">
        <p className="font-sans text-[13px] text-cyan mb-3">What I built</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          {CASE_STUDY.built.map((item) => (
            <li
              key={item}
              className="font-sans text-bone text-base leading-relaxed pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-cyan"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-dashed border-signal/50 bg-signal/5 px-5 py-4">
        <p className="font-sans text-[13px] text-signal mb-1">Result</p>
        <p className="font-sans text-bone text-base">{CASE_STUDY.result}</p>
      </div>

      <p className="font-sans text-[13px] text-muted mt-6">
        Private client work — no public repository.
      </p>
    </motion.div>
  )
}

export default function Work() {
  const reduced = useReducedMotion()

  const headerVariant = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      id="work"
      className="relative px-4 md:px-8 py-16 max-w-[1400px] mx-auto"
    >
      <motion.div
        variants={headerVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="mb-12 px-2 md:px-6"
      >
        <p className="font-mono text-[13px] uppercase tracking-widest text-cyan mb-4">
          02 — work
        </p>
        <h2
          className="font-display font-bold text-bone"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
        >
          Selected work
        </h2>
      </motion.div>

      <CaseStudy />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
