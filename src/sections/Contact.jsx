import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { IconArrowRight, IconSend } from '../components/icons'
import { BOOKING_URL, PHONE_DISPLAY, PHONE_HREF, EMAIL, LINKEDIN_URL, GITHUB_URL } from '../constants'

const NEXT_STEPS = [
  'I reply within 24 hours.',
  'A short call to understand what you need.',
  'A fixed, scoped proposal — no surprise costs.',
]

export default function Contact() {
  const reduced = useReducedMotion()
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', message: '', company: '' })

  const fadeUp = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const workerUrl = import.meta.env.VITE_WORKER_URL || ''

    if (!workerUrl) {
      const subject = encodeURIComponent(`Project enquiry from ${form.name}`)
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      )
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(`${workerUrl}/contact`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Something went wrong.')
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong. Try again, or email directly.')
    }
  }

  return (
    <section
      id="contact"
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
          06 — contact
        </p>
        <h2
          className="font-display font-bold text-bone"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
        >
          Let&apos;s talk about your project
        </h2>
      </motion.div>

      <div className="glass rounded-[2rem] p-8 md:p-14 shadow-glass grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="font-sans text-[13px] text-muted mb-4">What happens next</p>
          <ul className="space-y-3 mb-8">
            {NEXT_STEPS.map((step, i) => (
              <li key={step} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full glass-strong flex items-center justify-center font-sans text-[13px] text-cyan shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="font-sans text-bone text-base leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan text-ink font-sans text-base font-semibold hover:brightness-110 hover:shadow-glow transition mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          >
            Book a call <IconArrowRight width={16} height={16} />
          </a>

          <a
            href={`mailto:${EMAIL}`}
            className="font-display text-gradient font-semibold hover:brightness-110 transition block mb-2 break-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            style={{ fontSize: 'clamp(1rem, 2.2vw, 1.4rem)' }}
          >
            {EMAIL}
          </a>
          <a href={PHONE_HREF} className="font-sans text-sm text-muted mb-6 block hover:text-cyan transition-colors">
            {PHONE_DISPLAY}
          </a>
          <div className="flex gap-3">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-sans text-sm text-muted hover:text-cyan glass rounded-full px-4 py-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              LinkedIn <IconArrowRight width={14} height={14} />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-sans text-sm text-muted hover:text-cyan glass rounded-full px-4 py-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              GitHub <IconArrowRight width={14} height={14} />
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
            className="w-full glass rounded-xl px-4 py-3 font-sans text-bone text-sm placeholder:text-muted focus:outline-none focus:border-cyan/60"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full glass rounded-xl px-4 py-3 font-sans text-bone text-sm placeholder:text-muted focus:outline-none focus:border-cyan/60"
          />
          <textarea
            name="message"
            placeholder="What do you want to build? Rough timeline and budget help too."
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="w-full glass rounded-xl px-4 py-3 font-sans text-bone text-sm placeholder:text-muted focus:outline-none focus:border-cyan/60 resize-none"
          />
          {/* Honeypot — hidden from real visitors, bots tend to fill every field. */}
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] w-px h-px opacity-0"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full inline-flex items-center justify-center gap-2 bg-cyan text-ink font-sans text-base font-semibold rounded-xl py-3.5 hover:brightness-110 hover:shadow-glow transition disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          >
            {status === 'sent' && 'Sent ✓'}
            {status === 'sending' && 'Sending…'}
            {(status === 'idle' || status === 'error') && (
              <>
                Send message <IconSend width={14} height={14} />
              </>
            )}
          </button>
          {status === 'error' && error && (
            <p className="text-[13px] text-signal">{error}</p>
          )}
        </motion.form>
      </div>
    </section>
  )
}
