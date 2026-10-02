import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { IconSparkle, IconSend } from '../components/icons'

const GREETING = {
  role: 'assistant',
  text: "Hi! I'm Ankit's portfolio assistant. Ask me about his projects, skills, or experience.",
}

const SUGGESTIONS = [
  'What did Ankit build?',
  'What AI/ML skills does he have?',
  'Why should we hire him?',
]

export default function AskAI() {
  const reduced = useReducedMotion()
  const [messages, setMessages] = useState([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el && typeof el.scrollTo === 'function') {
      el.scrollTo({ top: el.scrollHeight, behavior: reduced ? 'auto' : 'smooth' })
    }
  }, [messages, loading, error, reduced])

  const ask = async (text) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    setError(null)
    const nextMessages = [...messages, { role: 'user', text: trimmed }]
    setMessages(nextMessages)
    setInput('')

    const workerUrl = import.meta.env.VITE_WORKER_URL || ''
    if (!workerUrl) {
      setError(
        "Chat isn't connected yet — check back soon, or reach Ankit directly via the contact form below."
      )
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${workerUrl}/chat`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: nextMessages.slice(-8).map((m) => ({ role: m.role, text: m.text })),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Something went wrong.')
      setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }])
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again in a moment.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    ask(input)
  }

  const fadeUp = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section id="ask-ai" className="relative px-4 md:px-8 py-16 max-w-[1400px] mx-auto">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="mb-12 px-2 md:px-6"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-cyan mb-4">
          06 — ask ai
        </p>
        <h2
          className="font-display font-bold text-bone"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          Ask my AI assistant
        </h2>
        <p className="font-sans text-muted text-base max-w-xl mt-4">
          Trained on my real bio, skills, and projects — ask it anything you&apos;d ask me.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="glass rounded-[2rem] p-6 md:p-10 shadow-glass"
      >
        <div className="flex items-center gap-2.5 mb-5">
          <span className="w-9 h-9 rounded-xl glass-strong flex items-center justify-center text-cyan shrink-0">
            <IconSparkle width={16} height={16} />
          </span>
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">
            Portfolio assistant
          </p>
        </div>

        <div ref={scrollRef} className="h-[360px] overflow-y-auto space-y-3 pr-1 mb-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === 'user' ? 'ml-auto bg-cyan text-ink' : 'glass text-bone'
              }`}
            >
              {m.text}
            </div>
          ))}
          {loading && (
            <div className="glass rounded-2xl px-4 py-2.5 text-sm text-muted w-fit">
              Thinking…
            </div>
          )}
          {error && <p className="text-xs text-signal">{error}</p>}
        </div>

        {messages.length < 2 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => ask(s)}
                className="font-mono text-xs text-muted border border-hairline rounded-full px-3 py-1.5 hover:text-cyan hover:border-cyan/50 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a project, skill…"
            aria-label="Message"
            className="flex-1 glass rounded-full px-4 py-3 font-sans text-bone text-sm placeholder:text-muted focus:outline-none focus:border-cyan/60"
          />
          <button
            type="submit"
            aria-label="Send"
            disabled={loading || !input.trim()}
            className="w-11 h-11 rounded-full bg-cyan text-ink flex items-center justify-center shrink-0 disabled:opacity-40 hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          >
            <IconSend width={16} height={16} />
          </button>
        </form>
      </motion.div>
    </section>
  )
}
