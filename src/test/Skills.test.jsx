import { render, screen } from '@testing-library/react'
import Skills from '../sections/Skills'

test('renders section title', () => {
  render(<Skills />)
  expect(screen.getByText('What I work with')).toBeInTheDocument()
})

test('renders all five skill group labels', () => {
  render(<Skills />)
  expect(screen.getByText('AI & ML')).toBeInTheDocument()
  expect(screen.getByText('Data & Programming')).toBeInTheDocument()
  expect(screen.getByText('Backend & APIs')).toBeInTheDocument()
  expect(screen.getByText('Databases & Cloud')).toBeInTheDocument()
  expect(screen.getByText('Tools')).toBeInTheDocument()
})

test('renders specific skill pills', () => {
  render(<Skills />)
  expect(screen.getByText('RAG')).toBeInTheDocument()
  expect(screen.getByText('Python')).toBeInTheDocument()
  expect(screen.getByText('Docker')).toBeInTheDocument()
  expect(screen.getByText('AWS')).toBeInTheDocument()
})
