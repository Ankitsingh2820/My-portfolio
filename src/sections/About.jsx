import { motion, useReducedMotion } from 'framer-motion'
import ankitPhoto from '../assets/ankit.jpg'
import { CGPA } from '../constants'

const EDUCATION = [
  {
    degree: 'B.Tech, Computer Science & Engineering',
    school: 'DIT University, Dehradun',
    result: `CGPA ${CGPA}`,
  },
  {
    degree: 'Diploma, Electrical & Electronics Engineering',
    school: 'BIT Mesra, Ranchi',
    result: '83.5%',
  },
]

const BULLETS = [
  'Grounded answers — retrieval and citations over guesswork, so outputs trace back to source documents.',
  'Production-minded — evaluation, monitoring, and fallback built in from day one, not bolted on later.',
  'A focus on document-heavy industries — legal, insurance, finance, and real estate workflows.',
]

const CORE_STACK = [
  'Python', 'FastAPI', 'LangChain', 'LangGraph', 'RAG',
  'FAISS', 'Qdrant', 'OpenAI API', 'Gemini API', 'Docker',
  'PostgreSQL', 'MongoDB', 'React', 'AWS', 'CI/CD',
]

export default function About() {
  const reduced = useReducedMotion()

  const fadeUp = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      id="about"
      className="relative px-4 md:px-8 py-16 max-w-[1400px] mx-auto"
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="mb-12 px-2 md:px-6"
      >
        <p className="font-mono text-[13px] uppercase tracking-widest text-cyan mb-4">
          04 — about
        </p>
        <h2
          className="font-display font-bold text-bone"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
        >
          A bit about me
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="glass rounded-3xl p-8 md:p-10 shadow-glass"
        >
          <img
            src={ankitPhoto}
            alt="Ankit Kumar"
            className="w-16 h-16 rounded-2xl object-cover shadow-glow-sm mb-6 ring-1 ring-cyan/40"
          />
          <p className="font-sans text-bone leading-relaxed mb-6">
            I&apos;m an AI engineer who builds production RAG systems, document AI,
            and AI agents for businesses &mdash; currently AI Developer at{' '}
            <strong className="font-semibold">Rest The Case (Lexicon Group)</strong>,
            a legal-tech platform, where I ship the AI features lawyers use daily.
          </p>
          <ul className="space-y-3">
            {BULLETS.map((b) => (
              <li
                key={b}
                className="font-sans text-bone text-base leading-relaxed pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-cyan"
              >
                {b}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="glass rounded-3xl p-8 md:p-10 shadow-glass flex flex-col"
        >
          <p className="font-sans text-[13px] text-muted mb-5">
            Education
          </p>
          <ul className="space-y-5 mb-8">
            {EDUCATION.map(({ degree, school, result }) => (
              <li key={school} className="border-l-2 border-cyan/30 pl-5">
                <p className="font-sans text-bone text-sm leading-snug">{degree}</p>
                <p className="font-sans text-[13px] text-muted mt-1">
                  {school}
                  {result ? ` · ${result}` : ''}
                </p>
              </li>
            ))}
          </ul>

          <p className="font-sans text-[13px] text-muted mb-3">
            Core stack
          </p>
          <div className="flex flex-wrap gap-2">
            {CORE_STACK.map((item) => (
              <span
                key={item}
                className="font-sans text-[13px] text-muted border border-hairline rounded-full px-2.5 py-1"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
