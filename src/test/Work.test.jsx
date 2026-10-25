import { render, screen } from '@testing-library/react'
import Work from '../sections/Work'

test('renders section title', () => {
  render(<Work />)
  expect(screen.getByText('Selected work')).toBeInTheDocument()
})

test('renders the Rest The Case case study', () => {
  render(<Work />)
  expect(screen.getByText('Rest The Case (Lexicon Group)')).toBeInTheDocument()
  expect(screen.getByText(/Private client work/i)).toBeInTheDocument()
})

test('renders all project cards in order', () => {
  render(<Work />)
  const titles = ['KnowledgeForge', 'AgentEval', 'RAG Gemini AI System', 'LightNote De-Editor', 'PlacementOS', 'Science Teacher Tool']
  titles.forEach((title) => {
    expect(screen.getByText(title)).toBeInTheDocument()
  })
})

test('each project has a "Useful for" line', () => {
  render(<Work />)
  expect(screen.getAllByText(/Useful for:/i).length).toBe(6)
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
