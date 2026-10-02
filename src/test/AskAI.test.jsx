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
    screen.getByText(/ask me about his projects, skills, or experience/i)
  ).toBeInTheDocument()
})

test('renders suggestion chips before the first message', () => {
  render(<AskAI />)
  expect(screen.getByRole('button', { name: 'What did Ankit build?' })).toBeInTheDocument()
})

test('shows a not-connected message when no worker is configured', async () => {
  vi.stubEnv('VITE_WORKER_URL', '')
  const user = userEvent.setup()
  render(<AskAI />)
  await user.type(screen.getByLabelText('Message'), 'What did Ankit build?')
  await user.click(screen.getByRole('button', { name: /send/i }))

  expect(screen.getByText('What did Ankit build?')).toBeInTheDocument()
  expect(screen.getByText(/isn't connected yet/i)).toBeInTheDocument()
})

test('sends to the worker and renders the reply', async () => {
  vi.stubEnv('VITE_WORKER_URL', 'https://worker.example')
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ reply: 'Ankit built AgentEval, a production agent-evaluation platform.' }),
  })
  vi.stubGlobal('fetch', fetchMock)

  const user = userEvent.setup()
  render(<AskAI />)
  await user.click(screen.getByRole('button', { name: 'What did Ankit build?' }))

  await waitFor(() => {
    expect(
      screen.getByText('Ankit built AgentEval, a production agent-evaluation platform.')
    ).toBeInTheDocument()
  })
  expect(fetchMock).toHaveBeenCalledWith(
    'https://worker.example/chat',
    expect.objectContaining({ method: 'POST' })
  )
})
