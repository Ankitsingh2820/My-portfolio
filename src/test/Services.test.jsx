import { render, screen } from '@testing-library/react'
import Services from '../sections/Services'

test('renders section title', () => {
  render(<Services />)
  expect(screen.getByText('How I can help your business')).toBeInTheDocument()
})

test('renders all five service packages', () => {
  render(<Services />)
  expect(screen.getByText('RAG & Document Chatbots')).toBeInTheDocument()
  expect(screen.getByText('Document AI & Automation')).toBeInTheDocument()
  expect(screen.getByText('AI Agents & Workflow Automation')).toBeInTheDocument()
  expect(screen.getByText('LLM Cost & Reliability Audit')).toBeInTheDocument()
  expect(screen.getByText('AI Features for Your App')).toBeInTheDocument()
})

test('renders timeline and pricing fields', () => {
  render(<Services />)
  expect(screen.getAllByText('Typical timeline').length).toBe(5)
  expect(screen.getAllByText('Starting from').length).toBe(5)
})

test('renders a Book a call link', () => {
  render(<Services />)
  expect(screen.getAllByRole('link', { name: /book a call/i }).length).toBeGreaterThan(0)
})
