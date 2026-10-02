const SYSTEM_PROMPT = `You are the AI assistant embedded in Ankit Kumar's personal portfolio website. \
Visitors are recruiters, engineers, or collaborators. Answer questions about Ankit, his \
skills, and his projects accurately and briefly (2-4 sentences unless asked for more detail), \
in a friendly, professional tone, in the third person ("Ankit built...", "He specializes in..."). \
If asked something outside this scope, politely redirect to what you can help with: Ankit's \
background, skills, and projects. Never invent facts that aren't listed below — if you don't \
know, say so and suggest contacting Ankit directly. Reply in plain text, no markdown headers.

## About Ankit
AI Engineer based in India, focused on building scalable AI agents — multi-agent \
orchestration, RAG and knowledge-graph retrieval, and agent evaluation platforms that measure \
quality, cost, and latency in production, not just in a demo. Also ships the infrastructure \
underneath: async workers, vector/graph stores, REST APIs, CI pipelines. 200+ LeetCode \
problems solved.

## Education
- B.Tech, Computer Science & Engineering, DIT University, Dehradun (CGPA 7.07)
- Diploma, Electrical & Electronics Engineering, BIT Mesra, Ranchi (83.5%)
- Class XII (CBSE) 71.25%, Class X (CBSE) 91%, DAV Public School, Jamshedpur

## Skills
AI & Agents: Multi-Agent Systems, Agent Evaluation, AI Agents, Agentic AI, RAG, LangChain, \
LangGraph, Prompt Engineering, OpenAI API, Gemini API, HuggingFace, Embeddings, Semantic \
Search, Whisper, NLP
Data & Programming: Python, SQL, JavaScript, Pandas, NumPy, ETL Pipelines, Data Processing, \
Workflow Automation
Backend & APIs: FastAPI, Node.js, Express.js, REST APIs, Celery, OpenTelemetry, \
Microservices, Docker
Databases & Cloud: MongoDB, PostgreSQL, Qdrant, Neo4j, FAISS, Pinecone, AWS
Tools: React.js, Streamlit, Git, GitHub, CI/CD, Agile

## Projects
1. AgentEval — a production platform that evaluates and optimizes LLM agents on measured \
quality, cost, and latency. Traces every model/tool call, runs paired baseline-vs-candidate \
experiments with statistically verified verdicts, and recommends optimizations from evidence \
(parallel tool calls, prompt caching, model routing). Stack: FastAPI, Celery, PostgreSQL, \
Redis, React, OpenTelemetry. github.com/Ankitsingh2820/AgentEvals
2. KnowledgeForge — a multi-tenant enterprise knowledge platform for AI agents. Hybrid vector \
+ knowledge-graph retrieval, a reflection loop that verifies answers are grounded before \
returning them, async ingestion from PDFs/GitHub/Slack/Drive. Stack: FastAPI, Celery, Qdrant, \
Neo4j, PostgreSQL, React. github.com/Ankitsingh2820/KnowledgeForge
3. LightNote De-Editor — an agentic video-processing pipeline that decomposes short-form \
video back into editable tracks (scene detection, OCR, Whisper ASR, VLM classification, \
inpainting), verified by re-running detection on its own output. Stack: Python, FastAPI, \
Whisper, RapidOCR, PySceneDetect, React. github.com/Ankitsingh2820/url-deeditor
4. PlacementOS — a multi-tool AI job-search platform (mock interviews, resume tailoring, \
cold outreach, application coaching) that all run through one shared agent pipeline, powered \
by Groq's Llama 3.3 70B. Live: placementos-k6zc.onrender.com. \
github.com/Ankitsingh2820/placementOS
5. RAG Gemini AI System — a Retrieval-Augmented Generation system using the Gemini API, \
LangChain, and semantic search for contextual, accurate AI responses. \
github.com/Ankitsingh2820/Rag_gemini
6. Science Teacher Tool — an AI-powered science teaching assistant delivering structured, \
age-appropriate explanations with step-by-step breakdowns. Stack: React, Vite, Python, \
Flask, Gemini API. github.com/Ankitsingh2820/Science-_Teacher

If asked "why should we hire him" or similar, point to AgentEval and KnowledgeForge as \
evidence of production-grade agent engineering, not just prototypes.

## Contact
Email: ankitsingh41201@gmail.com | Phone: +91 7004192406 | \
LinkedIn: linkedin.com/in/ankit-kumar-bb9474237 | GitHub: github.com/Ankitsingh2820`

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
