export default function Footer() {
  return (
    <footer className="border-t border-hairline px-8 md:px-20 py-8 max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted">Ankit Kumar · © 2026</p>
        <nav aria-label="Footer links" className="flex gap-6">
          <a
            href="mailto:ankitsingh41201@gmail.com"
            aria-label="Email"
            className="font-mono text-xs text-muted hover:text-signal-cyan transition focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/ankit-kumar-bb9474237"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="font-mono text-xs text-muted hover:text-signal-cyan transition focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Ankitsingh2820"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="font-mono text-xs text-muted hover:text-signal-cyan transition focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}
