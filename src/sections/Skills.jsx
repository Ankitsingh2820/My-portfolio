import { motion, useReducedMotion } from 'framer-motion'

const SKILL_GROUPS = [
  {
    label: 'AI & ML',
    items: [
      'LLMs', 'Prompt Engineering', 'RAG', 'AI Agents', 'Agentic AI',
      'LangChain', 'LangGraph', 'OpenAI API', 'Gemini API', 'HuggingFace',
      'Embeddings', 'Semantic Search', 'Transformers', 'NLP', 'Conversational AI',
    ],
  },
  {
    label: 'Data & Programming',
    items: ['Python', 'SQL', 'JavaScript', 'Pandas', 'NumPy', 'ETL Pipelines', 'Data Processing', 'Workflow Automation'],
  },
  {
    label: 'Backend & APIs',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Authentication', 'Microservices', 'Docker'],
  },
  {
    label: 'Databases & Cloud',
    items: ['MongoDB', 'MySQL', 'PostgreSQL', 'FAISS', 'Pinecone', 'AWS'],
  },
  {
    label: 'Tools',
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
      className="px-8 md:px-20 py-32 max-w-[1200px] mx-auto border-t border-hairline"
    >
      <motion.div
        variants={fadeUp()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="mb-16"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-4">
          02 — toolkit
        </p>
        <h2
          className="font-display font-bold text-bone"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          What I work with
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {SKILL_GROUPS.map(({ label, items }, i) => (
          <motion.div
            key={label}
            variants={fadeUp(i * 0.07)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-signal mb-4">
              {label}
            </p>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="font-mono text-xs text-muted border border-hairline px-2 py-1"
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
