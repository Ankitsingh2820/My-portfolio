import { motion, useReducedMotion } from 'framer-motion'
import { IconChip, IconDatabase, IconLayers, IconTerminal, IconTool } from '../components/icons'

const SKILL_GROUPS = [
  {
    label: 'AI & Agents',
    icon: IconChip,
    items: [
      'Multi-Agent Systems', 'Agent Evaluation', 'AI Agents', 'Agentic AI', 'RAG',
      'LangChain', 'LangGraph', 'Prompt Engineering', 'OpenAI API', 'Gemini API',
      'HuggingFace', 'Embeddings', 'Semantic Search', 'Whisper', 'NLP',
    ],
  },
  {
    label: 'Data & Programming',
    icon: IconDatabase,
    items: ['Python', 'SQL', 'JavaScript', 'Pandas', 'NumPy', 'ETL Pipelines', 'Data Processing', 'Workflow Automation'],
  },
  {
    label: 'Backend & APIs',
    icon: IconTerminal,
    items: ['FastAPI', 'Node.js', 'Express.js', 'REST APIs', 'Celery', 'OpenTelemetry', 'Microservices', 'Docker'],
  },
  {
    label: 'Databases & Cloud',
    icon: IconLayers,
    items: ['MongoDB', 'PostgreSQL', 'Qdrant', 'Neo4j', 'FAISS', 'Pinecone', 'AWS'],
  },
  {
    label: 'Tools',
    icon: IconTool,
    items: ['React.js', 'Streamlit', 'Git', 'GitHub', 'CI/CD', 'Agile'],
  },
]

export default function Skills() {
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
      id="skills"
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
          03 — technical skills
        </p>
        <h2
          className="font-display font-bold text-bone"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          What I work with
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_GROUPS.map(({ label, items, icon: Icon }, i) => (
          <motion.div
            key={label}
            variants={fadeUp(i * 0.07)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="glass rounded-3xl p-7 shadow-glass"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-10 rounded-xl glass-strong flex items-center justify-center text-cyan shrink-0">
                <Icon width={18} height={18} />
              </span>
              <p className="font-mono text-xs uppercase tracking-widest text-cyan">
                {label}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="font-mono text-xs text-muted border border-hairline rounded-full px-2.5 py-1 hover:border-cyan/50 hover:text-bone transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
