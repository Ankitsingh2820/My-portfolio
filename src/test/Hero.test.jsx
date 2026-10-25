import { render, screen } from '@testing-library/react'
import Hero from '../sections/Hero'

vi.mock('../components/PipelineAnimation', () => ({
  default: () => <div data-testid="pipeline" />,
}))

test('renders headline lines', () => {
  render(<Hero />)
  expect(screen.getByText('Accurate answers,')).toBeInTheDocument()
  expect(screen.getByText('straight from your')).toBeInTheDocument()
  expect(screen.getByText('own documents.')).toBeInTheDocument()
})

test('renders eyebrow text', () => {
  render(<Hero />)
  expect(screen.getByText(/Freelance AI Engineer/)).toBeInTheDocument()
})

test('renders Book a call and See my work CTAs', () => {
  render(<Hero />)
  expect(screen.getByRole('link', { name: /book a call/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /see my work/i })).toBeInTheDocument()
})

test('renders pipeline animation', () => {
  render(<Hero />)
  expect(screen.getByTestId('pipeline')).toBeInTheDocument()
})
