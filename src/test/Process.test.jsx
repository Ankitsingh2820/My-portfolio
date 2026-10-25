import { render, screen } from '@testing-library/react'
import Process from '../sections/Process'

test('renders section title', () => {
  render(<Process />)
  expect(screen.getByText("How we'll work together")).toBeInTheDocument()
})

test('renders all five process steps', () => {
  render(<Process />)
  expect(screen.getByText('Discovery Call & Scoping')).toBeInTheDocument()
  expect(screen.getByText('Fixed Proposal')).toBeInTheDocument()
  expect(screen.getByText('Build, With Weekly Demos')).toBeInTheDocument()
  expect(screen.getByText('Evaluation & Handover')).toBeInTheDocument()
  expect(screen.getByText('Deploy & Support')).toBeInTheDocument()
})
