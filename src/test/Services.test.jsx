import { render, screen } from '@testing-library/react'
import Services from '../sections/Services'

test('renders section title', () => {
  render(<Services />)
  expect(screen.getByText('What I do')).toBeInTheDocument()
})

test('renders all three service cards', () => {
  render(<Services />)
  expect(screen.getByText('Scalable AI Agents')).toBeInTheDocument()
  expect(screen.getByText('RAG & Knowledge Retrieval')).toBeInTheDocument()
  expect(screen.getByText('Agent Evaluation & MLOps')).toBeInTheDocument()
})
