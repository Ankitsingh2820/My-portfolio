import { IconGithub, IconLinkedin, IconMail } from './icons'

export default function NavRail({ sections, activeSection }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      aria-label="Section navigation"
      className="fixed top-3 left-3 right-3 md:top-5 md:left-5 md:right-5 z-50 glass-strong rounded-2xl px-4 md:px-6 h-16 flex items-center justify-between shadow-glass"
    >
      <button
        onClick={() => scrollTo('home')}
        className="flex items-center gap-2.5 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-lg"
        aria-label="Go to home"
      >
        <span className="w-9 h-9 rounded-xl glass flex items-center justify-center font-display font-bold text-cyan text-sm shadow-glow-sm">
          AK
        </span>
        <span className="hidden sm:block font-mono text-[0.65rem] uppercase tracking-widest text-muted">
          Ankit Kumar
        </span>
      </button>

      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={`Go to ${label}`}
            className="group relative flex items-center gap-1.5 px-2.5 md:px-3.5 py-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan shrink-0"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                activeSection === id
                  ? 'bg-signal-cyan shadow-glow-sm'
                  : 'bg-muted/50 group-hover:bg-bone'
              }`}
            />
            <span
              className={`font-mono text-[0.65rem] uppercase tracking-widest transition-colors ${
                activeSection === id ? 'text-cyan' : 'text-muted group-hover:text-bone'
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-3 shrink-0 pl-3">
        <a
          href="mailto:ankitsingh41201@gmail.com"
          aria-label="Email"
          className="text-muted hover:text-cyan transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded"
        >
          <IconMail width={17} height={17} strokeWidth={1.6} />
        </a>
        <a
          href="https://www.linkedin.com/in/ankit-kumar-bb9474237"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-muted hover:text-cyan transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded"
        >
          <IconLinkedin width={17} height={17} strokeWidth={1.6} />
        </a>
        <a
          href="https://github.com/Ankitsingh2820"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-muted hover:text-cyan transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded"
        >
          <IconGithub width={17} height={17} strokeWidth={1.6} />
        </a>
      </div>
    </nav>
  )
}
