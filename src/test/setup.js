import '@testing-library/jest-dom'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

global.IntersectionObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Return a stable ID but never fire the callback — keeps animation effects from running in tests
global.requestAnimationFrame = () => 1
global.cancelAnimationFrame = () => {}

// jsdom doesn't implement scrollIntoView — nav links and CTA buttons call it
// on click, so without a stub those tests throw "not a function".
window.HTMLElement.prototype.scrollIntoView = window.HTMLElement.prototype.scrollIntoView || function () {}
