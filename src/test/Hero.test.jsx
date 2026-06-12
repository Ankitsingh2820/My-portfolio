import { render, screen } from '@testing-library/react'
import Hero from '../sections/Hero'

vi.mock('../components/PipelineAnimation', () => ({
  default: () => <div data-testid="pipeline" />,
}))

test('renders all three headline lines', () => {
  render(<Hero />)
  expect(screen.getByText('I build pipelines')).toBeInTheDocument()
  expect(screen.getByText('that move data —')).toBeInTheDocument()
  expect(screen.getByText('and AI that uses it.')).toBeInTheDocument()
})

test('renders eyebrow text', () => {
  render(<Hero />)
  expect(screen.getByText('Data & AI Engineer — India')).toBeInTheDocument()
})

test('renders View work and Get in touch buttons', () => {
  render(<Hero />)
  expect(screen.getByRole('button', { name: /view work/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /get in touch/i })).toBeInTheDocument()
})

test('renders pipeline animation', () => {
  render(<Hero />)
  expect(screen.getByTestId('pipeline')).toBeInTheDocument()
})
