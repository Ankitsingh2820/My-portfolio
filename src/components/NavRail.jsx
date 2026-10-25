import { useEffect, useRef, useState } from 'react'
import { IconGithub, IconLinkedin, IconMail, IconMenu, IconClose } from './icons'
import { BOOKING_URL, EMAIL, LINKEDIN_URL, GITHUB_URL } from '../constants'

export default function NavRail({ sections, activeSection }) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const menuButtonRef = useRef(null)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleNavClick = (id) => {
    setOpen(false)
    scrollTo(id)
  }

  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    const getFocusable = () =>
      panel ? Array.from(panel.querySelectorAll('a[href], button:not([disabled])')) : []

    getFocusable()[0]?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        menuButtonRef.current?.focus()
        return
      }
      if (e.key === 'Tab') {
        const focusable = getFocusable()
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <>
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
          <span className="hidden sm:block font-sans text-sm text-muted">
            Ankit Kumar
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
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
                className={`font-sans text-[13px] transition-colors ${
                  activeSection === id ? 'text-cyan' : 'text-muted group-hover:text-bone'
                }`}
              >
                {label}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              className="text-muted hover:text-cyan transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded"
            >
              <IconMail width={17} height={17} strokeWidth={1.6} />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted hover:text-cyan transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded"
            >
              <IconLinkedin width={17} height={17} strokeWidth={1.6} />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted hover:text-cyan transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded"
            >
              <IconGithub width={17} height={17} strokeWidth={1.6} />
            </a>
          </div>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-3.5 md:px-5 py-2 md:py-2.5 rounded-full bg-cyan text-ink font-sans text-[13px] md:text-sm font-semibold hover:brightness-110 hover:shadow-glow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Book a call
          </a>

          <button
            ref={menuButtonRef}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            className="md:hidden w-10 h-10 rounded-full glass flex items-center justify-center text-bone shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          >
            <IconMenu width={20} height={20} />
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-nav-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Section menu"
          className="fixed inset-0 z-[60] md:hidden bg-ink/98 backdrop-blur-xl flex flex-col"
        >
          <div className="flex items-center justify-between px-5 h-16 border-b border-hairline shrink-0">
            <span className="font-display font-bold text-cyan">AK</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-bone focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              <IconClose width={20} height={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className={`text-left font-display text-2xl font-semibold py-4 border-b border-hairline focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${
                  activeSection === id ? 'text-cyan' : 'text-bone'
                }`}
              >
                {label}
              </button>
            ))}

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-8 text-center px-6 py-4 rounded-full bg-cyan text-ink font-sans text-base font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              Book a call
            </a>

            <div className="flex items-center justify-center gap-6 mt-8">
              <a
                href={`mailto:${EMAIL}`}
                aria-label="Email"
                className="text-muted hover:text-cyan transition-colors"
              >
                <IconMail width={20} height={20} strokeWidth={1.6} />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted hover:text-cyan transition-colors"
              >
                <IconLinkedin width={20} height={20} strokeWidth={1.6} />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted hover:text-cyan transition-colors"
              >
                <IconGithub width={20} height={20} strokeWidth={1.6} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
