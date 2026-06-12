import { motion, useReducedMotion } from 'framer-motion'

const PROJECTS = [
  {
    title: 'RAG Gemini AI System',
    description:
      'Retrieval-Augmented Generation system using the Gemini API, LangChain, and semantic search for contextual, accurate AI responses.',
    tags: ['Python', 'Gemini API', 'LangChain', 'Semantic Search', 'Vector DB'],
    href: 'https://github.com/Ankitsingh2820',
  },
  {
    title: 'AI Research Summarizer',
    description:
      'AI-powered text-summarization system built on NLP and LLM workflows using embeddings and Hugging Face models.',
    tags: ['Python', 'NLP', 'Generative AI', 'HuggingFace', 'Embeddings'],
    href: 'https://github.com/Ankitsingh2820',
  },
  {
    title: 'CodeShare',
    description:
      'Real-time collaborative editor with live code execution, synced I/O, and sub-200ms latency.',
    tags: ['React', 'Node.js', 'Socket.IO', 'WebSockets'],
    href: 'https://github.com/Ankitsingh2820/codeShare-Frontend',
  },
  {
    title: 'GoHolidays',
    description:
      'Full-stack booking platform with authentication, reviews, scalable CRUD operations, and MVC architecture.',
    tags: ['Node.js', 'Express', 'MongoDB', 'REST API'],
    href: 'https://github.com/Ankitsingh2820/GoHolidays-main',
  },
]

function ProjectCard({ project }) {
  const reduced = useReducedMotion()
  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={reduced ? {} : { y: -4 }}
      className="group relative block bg-panel p-8 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-inset"
    >
      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-signal transition-all duration-300 group-hover:w-full" />
      <span className="absolute top-8 right-8 text-muted group-hover:text-signal transition-colors text-lg">
        →
      </span>
      <h3 className="font-display text-xl font-semibold text-bone mb-3 pr-8">
        {project.title}
      </h3>
      <p className="font-sans text-muted text-sm leading-relaxed mb-6">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs text-muted border border-hairline px-2 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
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
      className="px-8 md:px-20 py-32 max-w-[1200px] mx-auto border-t border-hairline"
    >
      <motion.div
        variants={headerVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="mb-16"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-4">
          01 — selected work
        </p>
        <h2
          className="font-display font-bold text-bone"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          Things I&apos;ve built
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline border border-hairline">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
