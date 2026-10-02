import { render, screen } from '@testing-library/react'
import Work from '../sections/Work'

test('renders section title', () => {
  render(<Work />)
  expect(screen.getByText("Agents I've built")).toBeInTheDocument()
})

test('renders all project cards', () => {
  render(<Work />)
  expect(screen.getByText('AgentEval')).toBeInTheDocument()
  expect(screen.getByText('KnowledgeForge')).toBeInTheDocument()
  expect(screen.getByText('LightNote De-Editor')).toBeInTheDocument()
  expect(screen.getByText('PlacementOS')).toBeInTheDocument()
  expect(screen.getByText('RAG Gemini AI System')).toBeInTheDocument()
  expect(screen.getByText('Science Teacher Tool')).toBeInTheDocument()
})

test('each project has a GitHub link', () => {
  render(<Work />)
  const allLinks = screen.getAllByRole('link')
  const githubLinks = allLinks.filter((link) => link.href.includes('github.com'))
  expect(githubLinks.length).toBeGreaterThan(0)
})

test('projects with live demos have a live demo link', () => {
  render(<Work />)
  const demoLinks = screen.getAllByRole('link', { name: /live demo/i })
  expect(demoLinks.length).toBeGreaterThan(0)
})
