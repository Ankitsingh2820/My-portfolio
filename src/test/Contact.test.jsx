import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact from '../sections/Contact'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

test('renders section title', () => {
  render(<Contact />)
  expect(screen.getByText("Let's build something")).toBeInTheDocument()
})

test('renders email as a mailto link', () => {
  render(<Contact />)
  const emailLink = screen.getByRole('link', { name: /ankitsingh41201@gmail\.com/i })
  expect(emailLink.getAttribute('href')).toBe('mailto:ankitsingh41201@gmail.com')
})

test('renders LinkedIn and GitHub links', () => {
  render(<Contact />)
  expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
})

test('falls back to mailto and shows Sent when no worker is configured', async () => {
  vi.stubEnv('VITE_WORKER_URL', '')
  const user = userEvent.setup()
  const originalHref = window.location.href
  delete window.location
  window.location = { href: originalHref }

  render(<Contact />)
  await user.type(screen.getByPlaceholderText('Name'), 'Test User')
  await user.type(screen.getByPlaceholderText('Email'), 'test@test.com')
  await user.type(screen.getByPlaceholderText('Message'), 'Hello!')
  await user.click(screen.getByRole('button', { name: /send message/i }))

  expect(screen.getByRole('button', { name: /sent/i })).toBeInTheDocument()
  expect(window.location.href).toContain('mailto:ankitsingh41201@gmail.com')
})

test('posts to the worker and shows Sent when configured', async () => {
  vi.stubEnv('VITE_WORKER_URL', 'https://worker.example')
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ ok: true }),
  })
  vi.stubGlobal('fetch', fetchMock)

  const user = userEvent.setup()
  render(<Contact />)
  await user.type(screen.getByPlaceholderText('Name'), 'Test User')
  await user.type(screen.getByPlaceholderText('Email'), 'test@test.com')
  await user.type(screen.getByPlaceholderText('Message'), 'Hello!')
  await user.click(screen.getByRole('button', { name: /send message/i }))

  await waitFor(() => {
    expect(screen.getByRole('button', { name: /sent/i })).toBeInTheDocument()
  })
  expect(fetchMock).toHaveBeenCalledWith(
    'https://worker.example/contact',
    expect.objectContaining({ method: 'POST' })
  )
})

test('shows an error message when the worker request fails', async () => {
  vi.stubEnv('VITE_WORKER_URL', 'https://worker.example')
  const fetchMock = vi.fn().mockResolvedValue({
    ok: false,
    json: async () => ({ error: 'Could not send your message right now.' }),
  })
  vi.stubGlobal('fetch', fetchMock)

  const user = userEvent.setup()
  render(<Contact />)
  await user.type(screen.getByPlaceholderText('Name'), 'Test User')
  await user.type(screen.getByPlaceholderText('Email'), 'test@test.com')
  await user.type(screen.getByPlaceholderText('Message'), 'Hello!')
  await user.click(screen.getByRole('button', { name: /send message/i }))

  await waitFor(() => {
    expect(screen.getByText(/could not send your message/i)).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
})
