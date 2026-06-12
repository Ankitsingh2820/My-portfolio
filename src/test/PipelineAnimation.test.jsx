import { render, screen } from '@testing-library/react'
import PipelineAnimation from '../components/PipelineAnimation'

test('renders SVG with correct aria-label', () => {
  render(<PipelineAnimation />)
  expect(
    screen.getByRole('img', {
      name: 'Data pipeline: Ingest → Transform → Embed → Retrieve → Generate',
    })
  ).toBeInTheDocument()
})

test('SVG contains all five node labels', () => {
  render(<PipelineAnimation />)
  const svg = screen.getByRole('img')
  expect(svg.textContent).toContain('Ingest')
  expect(svg.textContent).toContain('Transform')
  expect(svg.textContent).toContain('Embed')
  expect(svg.textContent).toContain('Retrieve')
  expect(svg.textContent).toContain('Generate')
})
