import { render, screen } from '@testing-library/react'
import NavRail from '../components/NavRail'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
]

beforeEach(() => {
  document.body.innerHTML = `
    <section id="home"></section>
    <section id="work"></section>
    <section id="skills"></section>
  `
})

test('renders all section labels', () => {
  render(<NavRail sections={sections} activeSection="home" />)
  expect(screen.getAllByText('Home').length).toBeGreaterThan(0)
  expect(screen.getAllByText('Work').length).toBeGreaterThan(0)
  expect(screen.getAllByText('Skills').length).toBeGreaterThan(0)
})

test('active dot has cyan class', () => {
  render(<NavRail sections={sections} activeSection="work" />)
  const workButtons = screen.getAllByRole('button', { name: /go to work/i })
  const dot = workButtons[0].querySelector('span')
  expect(dot).toHaveClass('bg-signal-cyan')
})
