import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact from '../sections/Contact'

test('renders section title', () => {
  render(<Contact />)
  expect(screen.getByText("Let's build something")).toBeInTheDocument()
})

test('renders email as a mailto link', () => {
  render(<Contact />)
  const emailLink = screen.getByRole('link', { name: /ankitsingh41201@gmail\.com/i })
  expect(emailLink.getAttribute('href')).toBe('mailto:ankitsingh41201@gmail.com')
})

test('renders LinkedIn and GitHub links', () => {
  render(<Contact />)
  expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
})

test('button changes to Sent after form submit', async () => {
  const user = userEvent.setup()
  const originalHref = window.location.href
  delete window.location
  window.location = { href: originalHref }

  render(<Contact />)
  await user.type(screen.getByPlaceholderText('Name'), 'Test User')
  await user.type(screen.getByPlaceholderText('Email'), 'test@test.com')
  await user.type(screen.getByPlaceholderText('Message'), 'Hello!')
  await user.click(screen.getByRole('button', { name: /send message/i }))

  expect(screen.getByRole('button', { name: /sent/i })).toBeInTheDocument()
})
