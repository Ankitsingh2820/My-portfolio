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
      className="relative px-4 md:px-8 py-16 max-w-[1400px] mx-auto"
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="mb-12 px-2 md:px-6"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-cyan mb-4">
          01 — about
        </p>
        <h2
          className="font-display font-bold text-bone"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
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
          <div className="w-16 h-16 rounded-2xl glass-strong flex items-center justify-center shadow-glow-sm mb-6">
            <span className="font-display font-bold text-xl text-gradient">AK</span>
          </div>
          <p className="font-sans text-bone leading-relaxed mb-8">
            AI Engineer focused on building scalable AI agents — multi-agent orchestration,
            RAG and knowledge-graph retrieval, and agent evaluation platforms that measure
            quality, cost, and latency in production, not just in a demo. I ship the
            infrastructure underneath the agent, too: async workers, vector and graph stores,
            REST APIs, and CI pipelines built with Python, FastAPI, SQL, MongoDB, and modern
            AI frameworks. I enjoy turning messy, real-world problems into reliable, automated
            systems — and pairing that with LLM-powered tooling that&apos;s actually useful.
          </p>
          <span className="inline-block font-mono text-xs text-cyan border border-cyan/40 rounded-full px-4 py-2">
            200+ LeetCode problems solved
          </span>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="glass rounded-3xl p-8 md:p-10 shadow-glass"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-6">
            Education
          </p>
          <ul className="space-y-6">
            {EDUCATION.map(({ degree, school, result }) => (
              <li key={school} className="border-l-2 border-cyan/30 pl-5">
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
