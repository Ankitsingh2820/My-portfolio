import { render, screen } from '@testing-library/react'
import App from '../App'

vi.mock('../components/Layout', () => ({
  default: ({ children }) => <div data-testid="layout">{children}</div>,
}))
vi.mock('../sections/Hero', () => ({ default: () => <div>Hero</div> }))
vi.mock('../sections/Services', () => ({ default: () => <div>Services</div> }))
vi.mock('../sections/Work', () => ({ default: () => <div>Work</div> }))
vi.mock('../sections/Process', () => ({ default: () => <div>Process</div> }))
vi.mock('../sections/About', () => ({ default: () => <div>About</div> }))
vi.mock('../sections/AskAI', () => ({ default: () => <div>AskAI</div> }))
vi.mock('../sections/Contact', () => ({ default: () => <div>Contact</div> }))
vi.mock('../sections/Footer', () => ({ default: () => <div>Footer</div> }))

test('App renders Layout with all sections', () => {
  render(<App />)
  expect(screen.getByTestId('layout')).toBeInTheDocument()
  expect(screen.getByText('Hero')).toBeInTheDocument()
  expect(screen.getByText('Services')).toBeInTheDocument()
  expect(screen.getByText('Work')).toBeInTheDocument()
  expect(screen.getByText('Process')).toBeInTheDocument()
  expect(screen.getByText('About')).toBeInTheDocument()
  expect(screen.getByText('AskAI')).toBeInTheDocument()
  expect(screen.getByText('Contact')).toBeInTheDocument()
  expect(screen.getByText('Footer')).toBeInTheDocument()
})

test('sections render in the client-facing order', () => {
  render(<App />)
  const layout = screen.getByTestId('layout')
  const order = ['Hero', 'Services', 'Work', 'Process', 'About', 'AskAI', 'Contact', 'Footer']
  const positions = order.map((name) => layout.textContent.indexOf(name))
  for (let i = 1; i < positions.length; i++) {
    expect(positions[i]).toBeGreaterThan(positions[i - 1])
  }
})
