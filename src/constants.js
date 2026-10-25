// Single source of truth for contact/booking details used across sections.
// NOTE: the Cloudflare Worker (worker/src/index.js) is a separate deployable
// and can't import this file, so its system prompt duplicates these facts —
// keep them in sync manually if they change.

// TODO: replace with a real Calendly/Cal.com/booking URL.
export const BOOKING_URL = 'https://cal.com/TODO-add-your-booking-link'

export const PHONE_DISPLAY = '+91 9286352922'
export const PHONE_HREF = 'tel:+919286352922'
export const EMAIL = 'ankitsingh41201@gmail.com'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/ankit-kumar-bb9474237'
export const GITHUB_URL = 'https://github.com/Ankitsingh2820'
export const CGPA = '6.97'
