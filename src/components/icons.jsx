const base = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function IconChip(props) {
  return (
    <svg {...base} {...props}>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <rect x="10" y="10" width="4" height="4" rx="0.5" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2 2M17.5 4.5l-2 2M4.5 19.5l2-2M17.5 19.5l-2-2" />
    </svg>
  )
}

export function IconLayers(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="M3 13l9 5 9-5" />
      <path d="M3 16.5l9 5 9-5" />
    </svg>
  )
}

export function IconDatabase(props) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.7" />
      <path d="M5 5.5V18c0 1.5 3.1 2.7 7 2.7s7-1.2 7-2.7V5.5" />
      <path d="M5 11.8c0 1.5 3.1 2.7 7 2.7s7-1.2 7-2.7" />
    </svg>
  )
}

export function IconCloud(props) {
  return (
    <svg {...base} {...props}>
      <path d="M7 18h10a4 4 0 0 0 .3-8 5.5 5.5 0 0 0-10.7 1.2A3.5 3.5 0 0 0 7 18Z" />
    </svg>
  )
}

export function IconTool(props) {
  return (
    <svg {...base} {...props}>
      <path d="M14.5 6.5a3.5 3.5 0 0 1-4.6 4.6L5 16l2 2 4.9-4.9a3.5 3.5 0 0 1 4.6-4.6l-2.4 2.4-1.6-1.6 2-2Z" />
    </svg>
  )
}

export function IconTerminal(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3M12.5 15h4.5" />
    </svg>
  )
}

export function IconTarget(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.2" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconLaunch(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" strokeDasharray="2 4" />
      <path d="M8 16 16 8" />
      <path d="M10.5 8H16v5.5" />
    </svg>
  )
}

export function IconSearch(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.4-4.4" />
    </svg>
  )
}

export function IconSparkle(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" />
    </svg>
  )
}

export function IconMail(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 6.5 8 6.5 8-6.5" />
    </svg>
  )
}

export function IconLinkedin(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <circle cx="8" cy="8.5" r="0.9" fill="currentColor" stroke="none" />
      <path d="M8 11v6M12 17v-3.5c0-1.4 1-2.5 2.3-2.5s2.2 1.1 2.2 2.5V17" />
    </svg>
  )
}

export function IconGithub(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.4-1.1-1-1.4-1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.3-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7c-.1-.2-.5-1.3.1-2.8 0 0 .9-.3 2.9 1a10 10 0 0 1 5.3 0c2-1.3 2.9-1 2.9-1 .6 1.5.2 2.6.1 2.8a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.8-4.6 5 .3.3.6.9.6 1.8v2.6c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
    </svg>
  )
}

export function IconArrowRight(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  )
}

export function IconClose(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function IconMessageCircle(props) {
  return (
    <svg {...base} {...props}>
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.3 0-2.5-.28-3.6-.78L3 20l1.02-4.08A8.5 8.5 0 1 1 21 11.5Z" />
      <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" strokeWidth="2.2" />
    </svg>
  )
}

export function IconSend(props) {
  return (
    <svg {...base} {...props}>
      <path d="m3 11 18-8-8 18-2.5-7.5L3 11Z" />
    </svg>
  )
}
