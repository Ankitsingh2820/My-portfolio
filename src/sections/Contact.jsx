import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function Contact() {
  const reduced = useReducedMotion()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const fadeUp = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )
    window.location.href = `mailto:ankitsingh41201@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section
      id="contact"
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
          04 — contact
        </p>
        <h2
          className="font-display font-bold text-bone"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          Let&apos;s build something
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <a
            href="mailto:ankitsingh41201@gmail.com"
            className="font-display text-signal font-semibold hover:brightness-110 transition block mb-8 break-all focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)' }}
          >
            ankitsingh41201@gmail.com
          </a>
          <p className="font-mono text-sm text-muted mb-6">+91 7004192406</p>
          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com/in/ankit-kumar-bb9474237"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-muted hover:text-signal-cyan transition focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
            >
              LinkedIn →
            </a>
            <a
              href="https://github.com/Ankitsingh2820"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-muted hover:text-signal-cyan transition focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
            >
              GitHub →
            </a>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full bg-panel border border-hairline px-4 py-3 font-sans text-bone text-sm placeholder:text-muted focus:outline-none focus:border-muted"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full bg-panel border border-hairline px-4 py-3 font-sans text-bone text-sm placeholder:text-muted focus:outline-none focus:border-muted"
          />
          <textarea
            name="message"
            placeholder="Message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="w-full bg-panel border border-hairline px-4 py-3 font-sans text-bone text-sm placeholder:text-muted focus:outline-none focus:border-muted resize-none"
          />
          <button
            type="submit"
            className="w-full bg-signal text-ink font-mono text-sm uppercase tracking-widest py-3 hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
          >
            {sent ? 'Sent ✓' : 'Send message'}
          </button>
        </motion.form>
      </div>
    </section>
  )
}
