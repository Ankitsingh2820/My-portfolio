import { IconArrowRight } from '../components/icons'

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="px-4 md:px-8 pb-8 max-w-[1400px] mx-auto">
      <div className="glass-strong rounded-[2rem] px-8 md:px-14 py-12 mb-6 text-center shadow-glass">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan mb-3">
          Let&apos;s collaborate
        </p>
        <h3
          className="font-display font-bold text-bone mb-6"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
        >
          Have an idea worth building? Let&apos;s talk.
        </h3>
        <button
          onClick={() => scrollTo('contact')}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cyan text-ink font-mono text-sm uppercase tracking-widest font-medium hover:brightness-110 hover:shadow-glow transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
        >
          Get in touch <IconArrowRight width={16} height={16} />
        </button>
      </div>

      <div className="glass rounded-2xl px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted">Ankit Kumar · © 2026</p>
        <nav aria-label="Footer links" className="flex gap-6">
          <a
            href="mailto:ankitsingh41201@gmail.com"
            aria-label="Email"
            className="font-mono text-xs text-muted hover:text-cyan transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/ankit-kumar-bb9474237"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="font-mono text-xs text-muted hover:text-cyan transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Ankitsingh2820"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="font-mono text-xs text-muted hover:text-cyan transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}
