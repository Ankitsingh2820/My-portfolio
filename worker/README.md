# Portfolio backend worker

A Cloudflare Worker with two routes used by the portfolio:

- **`POST /chat`** — proxies the chat widget's messages to Gemini, so the API key
  never reaches the browser. Rate-limited 8 msgs/min, 300/day globally.
- **`POST /contact`** — sends the contact form via Resend straight to your inbox
  (with the visitor's email set as reply-to), instead of relying on the visitor
  having a mail client configured for a `mailto:` link. Rate-limited 3/min, 50/day
  globally, plus a hidden honeypot field to deter bots.

Both routes share IP-based rate limiting via a Workers KV namespace and are
locked to your site's origin via CORS.

## One-time setup

```bash
cd worker
npm install
npx wrangler login              # opens a browser to authorize Cloudflare
```

Create the KV namespace used for rate limiting:

```bash
npx wrangler kv namespace create RATE_LIMIT
```

Copy the `id` it prints into `wrangler.toml`, replacing `REPLACE_WITH_KV_NAMESPACE_ID`.

If you're deploying from a different GitHub Pages URL or testing on a different
local port, edit `ALLOWED_ORIGINS` in `wrangler.toml` first.

### Chat: Gemini API key

Get a free key at https://aistudio.google.com/apikey (same one used by the RAG
Gemini AI System project), then:

```bash
npx wrangler secret put GEMINI_API_KEY
```

### Contact form: Resend API key

1. Sign up at https://resend.com **using ankitsingh41201@gmail.com** (the same
   address `CONTACT_TO_EMAIL` in `wrangler.toml` sends to).
2. Create an API key in the Resend dashboard.
3. Set it as a secret:

   ```bash
   npx wrangler secret put RESEND_API_KEY
   ```

The default `CONTACT_FROM_EMAIL` (`onboarding@resend.dev`) is Resend's shared
test sender — it works without verifying a domain, but can only deliver to the
email address your Resend account is registered with. Since that's your own
inbox, this just works for a contact form. If you later verify your own domain
in Resend, update `CONTACT_FROM_EMAIL` in `wrangler.toml` to send from
`you@yourdomain.com` instead.

## Deploy

```bash
npm run deploy
```

This prints your Worker's URL, e.g. `https://ankit-portfolio-chat.<you>.workers.dev`.

## Wire it into the portfolio

1. Locally: put that URL in `.env` at the repo root as `VITE_WORKER_URL=<url>`
   (copy `.env.example` first).
2. For the live GitHub Pages build: in the `My-portfolio` repo, go to
   **Settings → Secrets and variables → Actions → Variables** and add
   `VITE_WORKER_URL` with the same URL (it's not a secret, so a repo *variable*
   is correct — not a *secret*). The deploy workflow already reads it.
3. Push to `main` (or redeploy) — the chat widget and contact form will both
   pick it up automatically. Until this is set, the contact form keeps working
   via its `mailto:` fallback and the chat widget shows "not connected yet".

## Local dev

```bash
npm run dev
```

Runs the worker at `http://localhost:8787`. Point `VITE_WORKER_URL` there while
testing, and make sure your portfolio dev server's origin (e.g.
`http://localhost:5173`) is listed in `ALLOWED_ORIGINS`.

## Notes

- The KV-based rate limiter isn't perfectly atomic under heavy concurrent load,
  but that's fine here — it's a deterrent against casual abuse, not a billing
  guarantee.
- The chat assistant's knowledge (bio/projects/skills) lives in `SYSTEM_PROMPT`
  in `src/index.js`. If you update the site's content, update it here too —
  it's not auto-synced from the React app.
- `GEMINI_MODEL`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` are plain
  (non-secret) vars in `wrangler.toml` so you can change them without touching
  code.
