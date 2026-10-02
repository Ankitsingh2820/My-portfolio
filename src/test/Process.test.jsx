import { render, screen } from '@testing-library/react'
import Process from '../sections/Process'

test('renders section title', () => {
  render(<Process />)
  expect(screen.getByText('How I work')).toBeInTheDocument()
})

test('renders all five process steps', () => {
  render(<Process />)
  expect(screen.getByText('Discover & Define')).toBeInTheDocument()
  expect(screen.getByText('Data Collection & Prep')).toBeInTheDocument()
  expect(screen.getByText('Model Development')).toBeInTheDocument()
  expect(screen.getByText('Evaluation & Tuning')).toBeInTheDocument()
  expect(screen.getByText('Deploy & Monitor')).toBeInTheDocument()
})
