import { render, screen } from '@testing-library/react'
import App from '../App'

vi.mock('../components/Layout', () => ({
  default: ({ children }) => <div data-testid="layout">{children}</div>,
}))
vi.mock('../sections/Hero', () => ({ default: () => <div>Hero</div> }))
vi.mock('../sections/Work', () => ({ default: () => <div>Work</div> }))
vi.mock('../sections/Skills', () => ({ default: () => <div>Skills</div> }))
vi.mock('../sections/About', () => ({ default: () => <div>About</div> }))
vi.mock('../sections/Contact', () => ({ default: () => <div>Contact</div> }))
vi.mock('../sections/Footer', () => ({ default: () => <div>Footer</div> }))

test('App renders Layout with all sections', () => {
  render(<App />)
  expect(screen.getByTestId('layout')).toBeInTheDocument()
  expect(screen.getByText('Hero')).toBeInTheDocument()
  expect(screen.getByText('Work')).toBeInTheDocument()
  expect(screen.getByText('Skills')).toBeInTheDocument()
  expect(screen.getByText('About')).toBeInTheDocument()
  expect(screen.getByText('Contact')).toBeInTheDocument()
  expect(screen.getByText('Footer')).toBeInTheDocument()
})
