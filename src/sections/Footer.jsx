import { EMAIL, LINKEDIN_URL, GITHUB_URL } from '../constants'

export default function Footer() {
  return (
    <footer className="px-4 md:px-8 pb-8 max-w-[1400px] mx-auto">
      <div className="glass rounded-2xl px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-sans text-[13px] text-muted">Ankit Kumar · © 2026</p>
        <nav aria-label="Footer links" className="flex gap-6">
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Email"
            className="font-sans text-[13px] text-muted hover:text-cyan transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          >
            Email
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="font-sans text-[13px] text-muted hover:text-cyan transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          >
            LinkedIn
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="font-sans text-[13px] text-muted hover:text-cyan transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}
