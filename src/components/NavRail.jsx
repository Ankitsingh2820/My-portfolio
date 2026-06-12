export default function NavRail({ sections, activeSection }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Desktop side rail */}
      <nav
        aria-label="Section navigation"
        className="hidden md:flex fixed left-0 top-0 h-full w-20 flex-col items-center justify-center gap-6 z-50 border-r border-hairline bg-ink"
      >
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={`Go to ${label}`}
            className="group flex flex-col items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
          >
            <span
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                activeSection === id
                  ? 'bg-signal-cyan'
                  : 'bg-muted group-hover:bg-bone'
              }`}
            />
            <span className="font-mono text-[0.6rem] uppercase tracking-widest text-muted group-hover:text-bone transition-colors">
              {label}
            </span>
          </button>
        ))}
      </nav>

      {/* Mobile top bar */}
      <nav
        aria-label="Section navigation"
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14 bg-ink border-b border-hairline"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Ankit Kumar
        </span>
        <div className="flex gap-4">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-label={`Go to ${label}`}
              className={`font-mono text-xs uppercase tracking-widest focus:outline-none focus-visible:ring-2 focus-visible:ring-signal ${
                activeSection === id ? 'text-signal-cyan' : 'text-muted hover:text-bone'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
