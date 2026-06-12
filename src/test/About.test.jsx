import { render, screen } from '@testing-library/react'
import About from '../sections/About'

test('renders section title', () => {
  render(<About />)
  expect(screen.getByText('A bit about me')).toBeInTheDocument()
})

test('renders bio text', () => {
  render(<About />)
  expect(screen.getByText(/scalable ETL pipelines/i)).toBeInTheDocument()
})

test('renders all education entries', () => {
  render(<About />)
  expect(screen.getByText(/DIT University/)).toBeInTheDocument()
  expect(screen.getByText(/BIT Mesra/)).toBeInTheDocument()
  expect(screen.getByText(/DAV Public School/)).toBeInTheDocument()
})

test('renders LeetCode badge', () => {
  render(<About />)
  expect(screen.getByText(/200\+ LeetCode/i)).toBeInTheDocument()
})
