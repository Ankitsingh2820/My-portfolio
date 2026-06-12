import { render, screen } from '@testing-library/react'
import Work from '../sections/Work'

test('renders section title', () => {
  render(<Work />)
  expect(screen.getByText("Things I've built")).toBeInTheDocument()
})

test('renders all four project cards', () => {
  render(<Work />)
  expect(screen.getByText('RAG Gemini AI System')).toBeInTheDocument()
  expect(screen.getByText('AI Research Summarizer')).toBeInTheDocument()
  expect(screen.getByText('CodeShare')).toBeInTheDocument()
  expect(screen.getByText('GoHolidays')).toBeInTheDocument()
})

test('all project links point to GitHub', () => {
  render(<Work />)
  const links = screen.getAllByRole('link')
  links.forEach((link) => {
    expect(link.href).toContain('github.com')
  })
})
