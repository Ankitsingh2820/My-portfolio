import { render, screen } from '@testing-library/react'
import Hero from '../sections/Hero'

vi.mock('../components/PipelineAnimation', () => ({
  default: () => <div data-testid="pipeline" />,
}))

test('renders headline lines including name', () => {
  render(<Hero />)
  expect(screen.getByText('I build AI agents')).toBeInTheDocument()
  expect(screen.getByText('that scale in production —')).toBeInTheDocument()
  expect(screen.getByText('Ankit Kumar.')).toBeInTheDocument()
})

test('renders eyebrow text', () => {
  render(<Hero />)
  expect(screen.getByText(/AI Engineer/)).toBeInTheDocument()
})

test('renders View Projects and Contact Me buttons', () => {
  render(<Hero />)
  expect(screen.getByRole('button', { name: /view projects/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /contact me/i })).toBeInTheDocument()
})

test('renders pipeline animation', () => {
  render(<Hero />)
  expect(screen.getByTestId('pipeline')).toBeInTheDocument()
})
