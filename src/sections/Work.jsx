import { motion, useReducedMotion } from 'framer-motion'

const PROJECTS = [
  {
    title: 'AgentEval',
    description:
      'A production platform that evaluates and optimizes LLM agents on measured quality, cost, and latency — traces every model and tool call, runs paired baseline-vs-candidate experiments with statistical verdicts, and recommends optimizations backed by evidence.',
    tags: ['FastAPI', 'Celery', 'PostgreSQL', 'Redis', 'React', 'OpenTelemetry'],
    href: 'https://github.com/Ankitsingh2820/AgentEvals',
    live: 'https://agentevals-o7cmqmhhycu28cappkrxggb.streamlit.app/',
  },
  {
    title: 'KnowledgeForge',
    description:
      'A multi-tenant enterprise knowledge platform for AI agents — hybrid vector + graph retrieval, a reflection loop that verifies answers are grounded before returning them, and async ingestion from PDFs, GitHub, Slack, and Drive.',
    tags: ['FastAPI', 'Celery', 'Qdrant', 'Neo4j', 'PostgreSQL', 'React'],
    href: 'https://github.com/Ankitsingh2820/KnowledgeForge',
    live: null,
  },
  {
    title: 'LightNote De-Editor',
    description:
      'An agentic video-processing pipeline that decomposes short-form video back into its editable tracks — scene detection, OCR, Whisper ASR, VLM classification, and inpainting — with every stage verified by re-running detection on its own output.',
    tags: ['Python', 'FastAPI', 'Whisper', 'RapidOCR', 'PySceneDetect', 'React'],
    href: 'https://github.com/Ankitsingh2820/url-deeditor',
    live: null,
  },
  {
    title: 'PlacementOS',
    description:
      'A multi-tool AI job-search platform where mock interviews, resume tailoring, cold outreach, and application coaching all run through one shared agent pipeline and scoring primitive, powered by Groq’s Llama 3.3 70B.',
    tags: ['FastAPI', 'Groq', 'React', 'Vite', 'Tailwind'],
    href: 'https://github.com/Ankitsingh2820/placementOS',
    live: 'https://placementos-k6zc.onrender.com',
  },
  {
    title: 'RAG Gemini AI System',
    description:
      'Retrieval-Augmented Generation system using the Gemini API, LangChain, and semantic search for contextual, accurate AI responses.',
    tags: ['Python', 'Gemini API', 'LangChain', 'Semantic Search', 'Vector DB'],
    href: 'https://github.com/Ankitsingh2820/Rag_gemini',
    live: 'https://raggemini-sgydghhwunzcauwdn7b3bh.streamlit.app/',
  },
  {
    title: 'Science Teacher Tool',
    description:
      'AI-powered science teaching assistant that delivers structured, age-appropriate explanations with step-by-step breakdowns.',
    tags: ['React', 'Vite', 'Python', 'Flask', 'Gemini API'],
    href: 'https://github.com/Ankitsingh2820/Science-_Teacher',
    live: 'https://ankitsingh2820.github.io/Science-_Teacher/',
  },
]

function ProjectCard({ project }) {
  const reduced = useReducedMotion()
  const primaryHref = project.live || project.href
  return (
    <motion.div
      whileHover={reduced ? {} : { y: -6 }}
      className="group relative glass rounded-3xl p-8 overflow-hidden flex flex-col shadow-glass hover:shadow-glow-sm transition-shadow"
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
      <span
        aria-hidden="true"
        className="absolute top-8 right-8 text-muted group-hover:text-cyan transition-colors text-lg pointer-events-none"
      >
        →
      </span>
      <h3 className="font-display text-xl font-semibold text-bone mb-3 pr-8">
        {project.title}
      </h3>
      <p className="font-sans text-muted text-sm leading-relaxed mb-6 flex-1">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs text-muted border border-hairline rounded-full px-2.5 py-1"
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
            className="font-mono text-xs text-cyan border border-cyan/40 rounded-full px-3.5 py-1.5 hover:bg-cyan hover:text-ink transition-colors"
          >
            Live Demo →
          </a>
        )}
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-muted border border-hairline rounded-full px-3.5 py-1.5 hover:text-bone hover:border-bone transition-colors"
        >
          GitHub
        </a>
      </div>
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
        className="mb-16 px-2 md:px-6"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-cyan mb-4">
          02 — featured projects
        </p>
        <h2
          className="font-display font-bold text-bone"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          Agents I&apos;ve built
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
