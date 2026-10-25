import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('renders a persistent Book a call button', () => {
  render(<NavRail sections={sections} activeSection="home" />)
  expect(screen.getAllByRole('link', { name: /book a call/i }).length).toBeGreaterThan(0)
})

test('mobile menu button opens a panel listing every section', async () => {
  const user = userEvent.setup()
  render(<NavRail sections={sections} activeSection="home" />)

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /open menu/i }))

  const dialog = screen.getByRole('dialog', { name: /section menu/i })
  expect(dialog).toBeInTheDocument()
  sections.forEach(({ label }) => {
    expect(screen.getAllByText(label).length).toBeGreaterThan(0)
  })
})

test('clicking a section link in the mobile menu closes it', async () => {
  const user = userEvent.setup()
  render(<NavRail sections={sections} activeSection="home" />)

  await user.click(screen.getByRole('button', { name: /open menu/i }))
  expect(screen.getByRole('dialog')).toBeInTheDocument()

  const dialog = screen.getByRole('dialog')
  const { getByText } = { getByText: (text) => screen.getAllByText(text).find((el) => dialog.contains(el)) }
  await user.click(getByText('Work'))

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

test('Escape closes the mobile menu and returns focus to the menu button', async () => {
  const user = userEvent.setup()
  render(<NavRail sections={sections} activeSection="home" />)

  const menuButton = screen.getByRole('button', { name: /open menu/i })
  await user.click(menuButton)
  expect(screen.getByRole('dialog')).toBeInTheDocument()

  await user.keyboard('{Escape}')

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  expect(menuButton).toHaveFocus()
})
