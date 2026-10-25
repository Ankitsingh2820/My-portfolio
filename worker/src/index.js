const SYSTEM_PROMPT = `You are the AI assistant embedded in Ankit Kumar's freelance AI \
engineering portfolio. Visitors are potential clients evaluating whether to hire him for a \
project, not recruiters. Answer questions about his services, experience, and past work \
accurately and briefly (2-4 sentences unless asked for more detail), in a friendly, \
professional tone, in the third person ("Ankit built...", "He specializes in..."). Explain \
which service or project is relevant to the visitor's problem, and suggest booking a call or \
using the contact form as the next step when it fits naturally — don't force it into every \
reply. Do NOT quote specific prices or timelines beyond what's listed below (those are marked \
TODO on the site and not yet set) — if asked, say pricing/timeline depends on scope and is \
confirmed on a call. Never invent facts that aren't listed below — if you don't know, say so \
and suggest contacting Ankit directly. Reply in plain text, no markdown headers.

## About Ankit
A freelance AI engineer who builds production RAG systems, document AI, and AI agents for \
businesses, with a focus on document-heavy industries — legal, insurance, finance, and real \
estate. Currently AI Developer at Rest The Case (Lexicon Group), a legal-tech platform, since \
March 2026, where he ships the platform's AI features. He ships the infrastructure underneath \
the AI too: evaluation, monitoring, fallback, and CI pipelines, not just prototypes.

## Education
- B.Tech, Computer Science & Engineering, DIT University, Dehradun (CGPA 6.97)
- Diploma, Electrical & Electronics Engineering, BIT Mesra, Ranchi (83.5%)

## Services
1. RAG & Document Chatbots — AI assistants grounded in the client's own PDFs, scanned files, \
docs, and knowledge bases, with citations.
2. Document AI & Automation — OCR, data extraction, summarization, timelines, and automated \
document generation for legal, insurance, finance, and real estate teams.
3. AI Agents & Workflow Automation — LangGraph agents and n8n/MCP integrations for lead \
handling, email triage, CRM updates, and reporting.
4. LLM Cost & Reliability Audit — measuring an existing AI feature, then cutting token cost \
and latency with prompt caching, model routing, and multi-provider fallback, plus evaluation \
in CI so quality doesn't regress.
5. AI Features for Your App — production FastAPI services and REST APIs that add AI to an \
existing product, containerized with Docker.

## Featured case study: Rest The Case (Lexicon Group)
Legal-tech platform, AI Developer since March 2026. Shipped the platform's core AI features: \
legal document summarization, case research, and timeline generation. Built RAG over PDFs and \
scanned documents (chunking, embeddings, FAISS vector search, reranking) so answers stay \
grounded in source material. Built a multi-agent setup on LiteLLM routing simple tasks to \
cheaper models and complex reasoning to stronger ones, with automatic fallback when a provider \
fails, plus prompt caching for repeated context. Added DeepEval in CI as a release gate, with \
online monitoring of grounding, hallucination rate, and latency. Diagnosed a silent production \
failure hidden behind a misleading rate-limit error and re-architected it as a multi-model \
fallback layer. Added guardrails against prompt injection, rate limiting, retries, structured \
logging, and tracing via AWS CloudWatch. This is private client work — no public repository.

## Other projects
1. KnowledgeForge — a multi-tenant enterprise knowledge platform for AI agents. Hybrid vector \
+ knowledge-graph retrieval, a reflection loop that verifies answers are grounded before \
returning them, async ingestion from PDFs/GitHub/Slack/Drive. Useful for companies that want \
one assistant across Drive, Slack, GitHub, and PDFs. github.com/Ankitsingh2820/KnowledgeForge
2. AgentEval — a production platform that evaluates and optimizes LLM agents on measured \
quality, cost, and latency. Traces every model/tool call, runs paired baseline-vs-candidate \
experiments with statistically verified verdicts. Useful for teams who need to prove an \
agent's quality, cost, and latency before shipping a change. \
github.com/Ankitsingh2820/AgentEvals
3. RAG Gemini AI System — a Retrieval-Augmented Generation system using the Gemini API, \
LangChain, and semantic search. github.com/Ankitsingh2820/Rag_gemini
4. LightNote De-Editor — an agentic video-processing pipeline (scene detection, OCR, Whisper \
ASR, VLM classification, inpainting) verified by re-running detection on its own output. \
github.com/Ankitsingh2820/url-deeditor
5. PlacementOS — a multi-tool AI job-search platform where several AI tools share one agent \
pipeline, powered by Groq's Llama 3.3 70B. github.com/Ankitsingh2820/placementOS
6. Science Teacher Tool — an AI-powered science teaching assistant delivering structured, \
age-appropriate explanations. github.com/Ankitsingh2820/Science-_Teacher

## Contact
Email: ankitsingh41201@gmail.com | Phone: +91 9286352922 | \
LinkedIn: linkedin.com/in/ankit-kumar-bb9474237 | GitHub: github.com/Ankitsingh2820 | \
Booking: see the "Book a call" button on the site (link is a TODO placeholder until Ankit \
adds his real booking URL)`

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function corsHeaders(origin, allowed) {
  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
  if (origin && allowed.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin
  }
  return headers
}

function json(body, status, origin, allowed) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
      ...corsHeaders(origin, allowed),
    },
  })
}

// Generic fixed-window limiter: `limit` requests/minute per keyBase, plus a
// rolling daily cap. KV isn't perfectly atomic under heavy concurrency, but
// that's fine here — it's a deterrent against casual abuse, not a billing
// guarantee.
async function isRateLimited(env, keyBase, perMinuteLimit, dailyLimit) {
  if (!env.RATE_LIMIT) return false

  const minuteKey = `rl:${keyBase}`
  const minuteRaw = await env.RATE_LIMIT.get(minuteKey)
  const minuteCount = minuteRaw ? parseInt(minuteRaw, 10) : 0
  if (minuteCount >= perMinuteLimit) return true

  const day = new Date().toISOString().slice(0, 10)
  const dayKey = `rl:${keyBase}:day:${day}`
  const dayRaw = await env.RATE_LIMIT.get(dayKey)
  const dayCount = dayRaw ? parseInt(dayRaw, 10) : 0
  if (dayCount >= dailyLimit) return true

  await env.RATE_LIMIT.put(minuteKey, String(minuteCount + 1), { expirationTtl: 60 })
  await env.RATE_LIMIT.put(dayKey, String(dayCount + 1), { expirationTtl: 90000 })
  return false
}

async function handleChat(request, env, ip, origin, allowed) {
  if (await isRateLimited(env, `chat:${ip}`, 8, 300)) {
    return json(
      { error: 'Too many questions right now — try again in a minute.' },
      429,
      origin,
      allowed
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid request.' }, 400, origin, allowed)
  }

  const message = String(body.message || '').slice(0, 800).trim()
  if (!message) {
    return json({ error: 'Empty message.' }, 400, origin, allowed)
  }
  const history = Array.isArray(body.history) ? body.history.slice(-8) : []

  if (!env.GEMINI_API_KEY) {
    return json({ error: 'Chat is not configured.' }, 500, origin, allowed)
  }

  const contents = [
    ...history.map((h) => ({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: String(h.text || '').slice(0, 800) }],
    })),
    { role: 'user', parts: [{ text: message }] },
  ]

  const model = env.GEMINI_MODEL || 'gemini-2.0-flash'
  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { maxOutputTokens: 400, temperature: 0.4 },
      }),
    }
  )

  if (!geminiRes.ok) {
    console.log('Gemini error', geminiRes.status, await geminiRes.text())
    return json(
      { error: 'The assistant is unavailable right now. Try again shortly.' },
      502,
      origin,
      allowed
    )
  }

  const data = await geminiRes.json()
  const reply =
    data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('').trim() ||
    "I couldn't come up with an answer to that — try rephrasing, or reach Ankit directly."

  return json({ reply }, 200, origin, allowed)
}

async function handleContact(request, env, ip, origin, allowed) {
  if (await isRateLimited(env, `contact:${ip}`, 3, 50)) {
    return json(
      { error: 'Too many messages right now — try again in a minute.' },
      429,
      origin,
      allowed
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid request.' }, 400, origin, allowed)
  }

  const name = String(body.name || '').trim().slice(0, 200)
  const email = String(body.email || '').trim().slice(0, 200)
  const message = String(body.message || '').trim().slice(0, 5000)
  // Hidden honeypot field — real visitors never fill it in. If it's set,
  // pretend success so bots don't learn to look elsewhere.
  const honeypot = String(body.company || '').trim()

  if (honeypot) {
    return json({ ok: true }, 200, origin, allowed)
  }

  if (!name || !EMAIL_PATTERN.test(email) || !message) {
    return json(
      { error: 'Please fill in a valid name, email, and message.' },
      400,
      origin,
      allowed
    )
  }

  if (!env.RESEND_API_KEY) {
    return json({ error: 'Contact form is not configured.' }, 500, origin, allowed)
  }

  const toEmail = env.CONTACT_TO_EMAIL || 'ankitsingh41201@gmail.com'
  const fromEmail = env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>'

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `Portfolio enquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  })

  if (!resendRes.ok) {
    console.log('Resend error', resendRes.status, await resendRes.text())
    return json(
      { error: 'Could not send your message right now. Try emailing directly.' },
      502,
      origin,
      allowed
    )
  }

  return json({ ok: true }, 200, origin, allowed)
}

export default {
  async fetch(request, env) {
    const allowed = (env.ALLOWED_ORIGINS || '')
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean)
    const origin = request.headers.get('Origin') || ''
    const { pathname } = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin, allowed) })
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, origin, allowed)
    }

    if (!allowed.includes(origin)) {
      return json({ error: 'Forbidden' }, 403, origin, allowed)
    }

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown'

    if (pathname === '/chat') return handleChat(request, env, ip, origin, allowed)
    if (pathname === '/contact') return handleContact(request, env, ip, origin, allowed)
    return json({ error: 'Not found' }, 404, origin, allowed)
  },
}
