# Ankit Kumar — Freelance AI Engineer Portfolio

Live site: **https://ankitsingh2820.github.io/My-portfolio/**

A portfolio site for freelance AI engineering work — RAG systems, document AI, and AI
agents for document-heavy businesses (legal, insurance, finance, real estate). Includes an
AI chat assistant and an automated contact form, both backed by a small Cloudflare Worker.

## Stack

- **Frontend**: React 19 + Vite, Tailwind CSS, Framer Motion
- **Backend**: a Cloudflare Worker (`worker/`) with two routes:
  - `POST /chat` — proxies the "Ask AI" assistant to Gemini
  - `POST /contact` — sends the contact form via Resend
- **Tests**: Vitest + Testing Library
- **Hosting**: GitHub Pages (frontend) + Cloudflare Workers (backend), both free-tier
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`) — runs tests, builds, and
  deploys to GitHub Pages on every push to `main`

## Run locally

```bash
npm install
npm run dev          # http://localhost:5173
```

By default the chat and contact form run in their offline fallback modes (chat shows
"not connected yet"; the contact form falls back to opening a `mailto:` link). To connect
them to the real backend, copy `.env.example` to `.env` and set `VITE_WORKER_URL` to a
deployed worker's URL (see below).

## Run tests

```bash
npm run test:run     # one-shot
npm test              # watch mode
npm run lint
npm run build
```

## Deploy the worker (chat + contact backend)

The worker lives in `worker/` and is a separate deployable from the frontend. Full setup
steps — Cloudflare login, KV namespace creation, Gemini/Resend API keys, and wiring the
resulting URL into this repo (`.env` locally, a GitHub Actions repo variable for the live
site) — are documented in [`worker/README.md`](worker/README.md), with the Worker's own
config in [`worker/wrangler.toml`](worker/wrangler.toml).

## Project structure

```
src/
  sections/     One component per page section (Hero, Services, Work, Process,
                 About, AskAI, Contact, Footer)
  components/    Shared UI: nav, icons, floating decorations, pipeline animation
  constants.js   Shared contact/booking details (email, phone, booking link, CGPA)
  test/          One test file per section/component
worker/
  src/index.js   The Worker: chat + contact routes, rate limiting, CORS
  wrangler.toml  Worker config (non-secret vars + KV binding)
```
