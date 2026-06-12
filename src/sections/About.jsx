import { motion, useReducedMotion } from 'framer-motion'

const EDUCATION = [
  {
    degree: 'B.Tech, Computer Science & Engineering',
    school: 'DIT University, Dehradun',
    result: 'CGPA 7.07',
  },
  {
    degree: 'Diploma, Electrical & Electronics Engineering',
    school: 'BIT Mesra, Ranchi',
    result: '83.5%',
  },
  {
    degree: 'Class XII (CBSE) 71.25% · Class X (CBSE) 91%',
    school: 'DAV Public School, Jamshedpur',
    result: '',
  },
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
      className="px-8 md:px-20 py-32 max-w-[1200px] mx-auto border-t border-hairline"
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="mb-12"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-4">
          03 — about
        </p>
        <h2
          className="font-display font-bold text-bone"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          A bit about me
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="font-sans text-bone leading-relaxed mb-8">
            Data Engineer and AI Engineer with experience building scalable ETL pipelines,
            AI-powered applications, and workflow-automation systems using Python, SQL,
            MongoDB, and modern AI frameworks. I build Retrieval-Augmented Generation (RAG)
            systems, REST APIs, and data-driven solutions for analytics and operational
            optimization. I enjoy turning messy operational data into reliable, automated
            systems — and pairing that with LLM-powered tooling that&apos;s actually useful.
          </p>
          <span className="font-mono text-xs text-signal border border-signal px-3 py-1.5">
            200+ LeetCode problems solved
          </span>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-6">
            Education
          </p>
          <ul className="space-y-6">
            {EDUCATION.map(({ degree, school, result }) => (
              <li key={school} className="border-l-2 border-hairline pl-5">
                <p className="font-sans text-bone text-sm leading-snug">{degree}</p>
                <p className="font-mono text-xs text-muted mt-1">
                  {school}
                  {result ? ` · ${result}` : ''}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
