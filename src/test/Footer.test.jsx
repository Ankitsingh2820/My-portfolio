import { render, screen } from '@testing-library/react'
import Footer from '../sections/Footer'

test('renders name and year', () => {
  render(<Footer />)
  expect(screen.getByText(/Ankit Kumar/)).toBeInTheDocument()
  expect(screen.getByText(/2026/)).toBeInTheDocument()
})

test('renders Email, LinkedIn, and GitHub links', () => {
  render(<Footer />)
  expect(screen.getByRole('link', { name: /email/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
})
