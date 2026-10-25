import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AskAI from '../sections/AskAI'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

test('renders section title and greeting', () => {
  render(<AskAI />)
  expect(screen.getByText('Ask my AI assistant')).toBeInTheDocument()
  expect(
    screen.getByText(/ask me about his services, past work/i)
  ).toBeInTheDocument()
})

test('renders client-facing suggestion chips before the first message', () => {
  render(<AskAI />)
  expect(
    screen.getByRole('button', { name: 'How do projects usually work?' })
  ).toBeInTheDocument()
})

test('shows a not-connected message when no worker is configured', async () => {
  vi.stubEnv('VITE_WORKER_URL', '')
  const user = userEvent.setup()
  render(<AskAI />)
  await user.type(screen.getByLabelText('Message'), 'How do projects usually work?')
  await user.click(screen.getByRole('button', { name: /send/i }))

  expect(screen.getByText('How do projects usually work?')).toBeInTheDocument()
  expect(screen.getByText(/isn't connected yet/i)).toBeInTheDocument()
})

test('sends to the worker and renders the reply', async () => {
  vi.stubEnv('VITE_WORKER_URL', 'https://worker.example')
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ reply: 'Projects start with a short discovery call and a fixed proposal.' }),
  })
  vi.stubGlobal('fetch', fetchMock)

  const user = userEvent.setup()
  render(<AskAI />)
  await user.click(screen.getByRole('button', { name: 'How do projects usually work?' }))

  await waitFor(() => {
    expect(
      screen.getByText('Projects start with a short discovery call and a fixed proposal.')
    ).toBeInTheDocument()
  })
  expect(fetchMock).toHaveBeenCalledWith(
    'https://worker.example/chat',
    expect.objectContaining({ method: 'POST' })
  )
})
