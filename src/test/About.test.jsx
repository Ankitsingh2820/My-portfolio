import { render, screen } from '@testing-library/react'
import About from '../sections/About'

test('renders section title', () => {
  render(<About />)
  expect(screen.getByText('A bit about me')).toBeInTheDocument()
})

test('renders client-facing bio text mentioning Rest The Case', () => {
  render(<About />)
  expect(screen.getByText(/Rest The Case \(Lexicon Group\)/)).toBeInTheDocument()
})

test('renders education entries with the correct CGPA', () => {
  render(<About />)
  expect(screen.getByText(/DIT University/)).toBeInTheDocument()
  expect(screen.getByText(/CGPA 6\.97/)).toBeInTheDocument()
  expect(screen.getByText(/BIT Mesra/)).toBeInTheDocument()
})

test('does not render the old Class X/XII line or LeetCode badge', () => {
  render(<About />)
  expect(screen.queryByText(/Class XII/)).not.toBeInTheDocument()
  expect(screen.queryByText(/LeetCode/)).not.toBeInTheDocument()
})

test('renders a compact core stack list', () => {
  render(<About />)
  expect(screen.getByText('Core stack')).toBeInTheDocument()
  expect(screen.getByText('LangGraph')).toBeInTheDocument()
  expect(screen.getByText('FastAPI')).toBeInTheDocument()
})
