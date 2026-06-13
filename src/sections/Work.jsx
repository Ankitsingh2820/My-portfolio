import { motion, useReducedMotion } from 'framer-motion'

const PROJECTS = [
  {
    title: 'RAG Gemini AI System',
    description:
      'Retrieval-Augmented Generation system using the Gemini API, LangChain, and semantic search for contextual, accurate AI responses.',
    tags: ['Python', 'Gemini API', 'LangChain', 'Semantic Search', 'Vector DB'],
    href: 'https://github.com/Ankitsingh2820/Rag_gemini',
    live: 'https://raggemini-sgydghhwunzcauwdn7b3bh.streamlit.app/',
  },
  {
    title: 'AI Quiz & Summarizer',
    description:
      'NLP-powered tool that summarizes documents and generates contextual practice questions from uploaded PDFs, DOCX, or plain text.',
    tags: ['Python', 'Streamlit', 'NLP', 'NLTK', 'PyPDF2'],
    href: 'https://github.com/Ankitsingh2820/summeriser',
    live: 'https://summeriser-82x9gfkgudteqevrtwipjz.streamlit.app/',
  },
  {
    title: 'Student Performance Predictor',
    description:
      'ANN-based ML app that predicts student pass/fail outcomes from study habits and provides actionable recommendations.',
    tags: ['Python', 'Streamlit', 'Scikit-learn', 'ANN', 'Matplotlib'],
    href: 'https://github.com/Ankitsingh2820/Student_performance',
    live: 'https://studentperformance-ylysvu7p9gdp7xfmfxyvxj.streamlit.app/',
  },
  {
    title: 'CodeShare',
    description:
      'Real-time collaborative code editor with live synced I/O and multi-language syntax highlighting.',
    tags: ['React', 'Node.js', 'Socket.IO', 'WebSockets'],
    href: 'https://github.com/Ankitsingh2820/codeShare-Frontend',
    live: 'https://ankitsingh2820.github.io/codeShare-Frontend/',
  },
  {
    title: 'Science Teacher Tool',
    description:
      'AI-powered science teaching assistant that delivers structured, age-appropriate explanations with step-by-step breakdowns.',
    tags: ['React', 'Vite', 'Python', 'Flask', 'Gemini API'],
    href: 'https://github.com/Ankitsingh2820/Science-_Teacher',
    live: 'https://ankitsingh2820.github.io/Science-_Teacher/',
  },
  {
    title: 'GoHolidays',
    description:
      'Full-stack travel booking platform with authentication, reviews, image uploads, and MVC architecture.',
    tags: ['Node.js', 'Express', 'MongoDB', 'REST API'],
    href: 'https://github.com/Ankitsingh2820/GoHolidays-main',
    live: null,
  },
]

function ProjectCard({ project }) {
  const reduced = useReducedMotion()
  const primaryHref = project.live || project.href
  return (
    <motion.a
      href={primaryHref}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={reduced ? {} : { y: -4 }}
      className="group relative bg-panel p-8 overflow-hidden flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-inset"
    >
      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-signal transition-all duration-300 group-hover:w-full" />
      <span aria-hidden="true" className="absolute top-8 right-8 text-muted group-hover:text-signal transition-colors text-lg">→</span>
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
            className="font-mono text-xs text-muted border border-hairline px-2 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-signal border border-signal px-3 py-1.5 hover:bg-signal hover:text-ink transition-colors"
          >
            Live Demo →
          </a>
        )}
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-muted border border-hairline px-3 py-1.5 hover:text-bone hover:border-bone transition-colors"
        >
          GitHub
        </a>
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
