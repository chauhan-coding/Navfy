import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMessageCircle, FiSend, FiX, FiCpu, FiArrowRight, FiRotateCcw } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import { runMultiAgentCycle } from '../../agents/mainAgent'
import { createAgentSession, touchSessionPath } from '../../agents/sessionMemory'

// ─── Constants ───────────────────────────────────────────────────────────────
const STORAGE_KEY = 'navfy-assistant-v2'
const MIN_THINKING_MS = 700

// ─── Page-aware welcome messages ─────────────────────────────────────────────
function getWelcomeMessage(pathname) {
  const welcome = {
    '/': {
      text: "Hi! I'm Navfy Assistant. I can walk you through the platform, run live demos, or help you pick the right plan.",
      actions: [
        { label: 'Platform overview', action: 'What does Navfy do?' },
        { label: 'Open map demo', href: '/map' },
        { label: 'View pricing', href: '/pricing' },
      ],
    },
    '/map': {
      text: "You're on the Map page. I can walk you through the route planner demo or explain how the mapping APIs work.",
      actions: [
        { label: 'Run route demo', action: 'Show me the map demo' },
        { label: 'How does routing work?', action: 'Explain map capabilities' },
        { label: 'Open API playground', href: '/apis' },
      ],
    },
    '/apis': {
      text: "You're in the API playground. I can guide you through an endpoint walkthrough or explain how to get pilot access.",
      actions: [
        { label: 'API walkthrough', action: 'Show me the API demo' },
        { label: 'How do I get API access?', action: 'How do I get API access?' },
        { label: 'View pricing', href: '/pricing' },
      ],
    },
    '/pricing': {
      text: "You're on Pricing. I can compare plans or help you figure out which option fits your use case.",
      actions: [
        { label: 'Compare plans', action: 'Compare all plans' },
        { label: 'Help me pick a plan', action: 'Help me choose a plan' },
        { label: 'Talk to the team', href: '/contact' },
      ],
    },
    '/contact': {
      text: "You're on the Contact page. I can help you prepare your message or point you to the right team.",
      actions: [
        { label: 'What should I include?', action: 'What details should I share?' },
        { label: 'Review product scope', action: 'Give me a product overview' },
      ],
    },
  }
  return (
    welcome[pathname] ?? {
      text: "Hi! I'm Navfy Assistant. How can I help you today?",
      actions: [
        { label: 'Platform overview', action: 'What does Navfy do?' },
        { label: 'Open map demo', href: '/map' },
        { label: 'View pricing', href: '/pricing' },
      ],
    }
  )
}

function getDefaultMessages(pathname) {
  const w = getWelcomeMessage(pathname)
  return [{ role: 'bot', text: w.text, actions: w.actions, ts: Date.now() }]
}

function getQuickPrompts(pathname, stage, turnCount) {
  if (turnCount === 0) {
    const byPage = {
      '/map': ['Run route planner demo', 'Explain map capabilities', 'Show me API docs'],
      '/apis': ['Walk me through an endpoint', 'How do I get API access?', 'Show me a code example'],
      '/pricing': ['Compare all plans', 'Help me choose a plan', 'What is included in enterprise?'],
      '/contact': ['What details should I share?', 'Talk to developer team', 'Review platform scope'],
    }
    return (
      byPage[pathname] ?? [
        'What does Navfy do?',
        'Show me a map demo',
        'Show me an API walkthrough',
        'Help me choose a plan',
      ]
    )
  }
  if (stage === 'demo' || stage === 'conversion') {
    return ['How do I get started?', 'Talk to the team', 'Compare plans']
  }
  return ['Tell me more', 'Show me a demo', 'View pricing']
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function BotAvatar() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white">
      <FiCpu size={13} />
    </span>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2">
      <BotAvatar />
      <div className="flex items-center gap-1 rounded-2xl border border-[var(--line)] bg-[var(--bg)] px-3 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-2 w-2 rounded-full bg-[var(--text-soft)]"
            style={{
              animation: 'typingBounce 1.2s ease-in-out infinite',
              animationDelay: `${i * 0.18}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function DemoBlock({ title, steps }) {
  if (!steps?.length) return null
  return (
    <div className="mt-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
      <p className="mb-2 text-xs font-semibold text-[var(--text)]">{title}</p>
      <ol className="space-y-1.5">
        {steps.map((step, i) => (
          <li key={step} className="flex items-start gap-2 text-xs text-[var(--text-soft)]">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[9px] font-bold text-white">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  )
}

function ActionChips({ actions, recommendations, onSend }) {
  const all = [
    ...(recommendations ?? []).map((r) => ({ ...r, type: 'rec' })),
    ...(actions ?? []).map((a) => ({ ...a, type: 'act' })),
  ]
  if (!all.length) return null
  return (
    <div className="mt-2.5 flex flex-wrap gap-1.5">
      {all.map((item, i) =>
        item.href ? (
          <Link
            key={`${item.label}-${i}`}
            to={item.href}
            className="inline-flex items-center gap-1 rounded-full border border-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white"
          >
            {item.label}
            <FiArrowRight size={11} />
          </Link>
        ) : (
          <button
            key={`${item.label}-${i}`}
            type="button"
            onClick={() => onSend(item.action ?? item.label)}
            className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--text-soft)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {item.label}
          </button>
        ),
      )}
    </div>
  )
}

// ─── Session storage helpers ──────────────────────────────────────────────────
function loadState(pathname) {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) throw new Error('empty')
    const parsed = JSON.parse(raw)
    return {
      open: Boolean(parsed?.open),
      messages: Array.isArray(parsed?.messages) && parsed.messages.length > 0
        ? parsed.messages
        : getDefaultMessages(pathname),
      agentSession: parsed?.agentSession ?? createAgentSession(pathname),
    }
  } catch {
    return {
      open: false,
      messages: getDefaultMessages(pathname),
      agentSession: createAgentSession(pathname),
    }
  }
}

function saveState(open, messages, agentSession) {
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ open, messages, agentSession }))
}

// ─── Main component ───────────────────────────────────────────────────────────
function AIChatbot() {
  const location = useLocation()
  const [hydrated, setHydrated] = useState(false)
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [agentSession, setAgentSession] = useState(() => createAgentSession(location.pathname))
  const [journey, setJourney] = useState(null)
  const [messages, setMessages] = useState(() => getDefaultMessages(location.pathname))

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Hydrate from sessionStorage
  useEffect(() => {
    const restored = loadState(location.pathname)
    setOpen(restored.open)
    setMessages(restored.messages)
    setAgentSession(touchSessionPath(restored.agentSession, location.pathname))
    setHydrated(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Touching page context on navigation
  useEffect(() => {
    if (!hydrated) return
    setAgentSession((prev) => touchSessionPath(prev, location.pathname))
  }, [hydrated, location.pathname])

  // Persist state
  useEffect(() => {
    if (!hydrated) return
    saveState(open, messages, agentSession)
  }, [hydrated, open, messages, agentSession])

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Auto-focus on open
  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => inputRef.current?.focus(), 120)
    return () => clearTimeout(t)
  }, [open])

  // Escape key to close
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const turnCount = messages.filter((m) => m.role === 'user').length
  const displayMessages = messages.slice(-12)
  const canSend = input.trim().length > 0 && !isTyping
  const quickPrompts = getQuickPrompts(location.pathname, journey?.stage, turnCount)

  function resetSession() {
    const freshSession = createAgentSession(location.pathname)
    const freshMessages = getDefaultMessages(location.pathname)
    setInput('')
    setIsTyping(false)
    setJourney(null)
    setAgentSession(freshSession)
    setMessages(freshMessages)
    saveState(true, freshMessages, freshSession)
  }

  const sendMessage = useCallback(
    async (text) => {
      const userText = (text ?? input).trim()
      if (!userText || isTyping) return

      setMessages((prev) => [...prev, { role: 'user', text: userText, ts: Date.now() }])
      setInput('')
      setIsTyping(true)

      const startedAt = Date.now()
      try {
        const result = await runMultiAgentCycle({
          message: userText,
          pathname: location.pathname,
          history: messages,
          session: agentSession,
        })

        const elapsed = Date.now() - startedAt
        const pad = Math.max(0, MIN_THINKING_MS - elapsed)
        if (pad > 0) await new Promise((r) => setTimeout(r, pad))

        setAgentSession(result.session)
        setJourney(result.journey)

        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            text: result.qa.text,
            bullets: result.qa.bullets ?? null,
            actions: result.qa.actions,
            recommendations: result.qa.recommendations,
            demo: result.qa.demo,
            ts: Date.now(),
          },
        ])
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            text: 'I hit an issue preparing a response. Try asking about the map demo, API docs, or pricing.',
            actions: [
              { label: 'Map demo', href: '/map' },
              { label: 'API demo', href: '/apis' },
              { label: 'Pricing', href: '/pricing' },
            ],
            ts: Date.now(),
          },
        ])
      } finally {
        setIsTyping(false)
      }
    },
    [input, isTyping, messages, agentSession, location.pathname],
  )

  return (
    <>
      {/* ── Trigger ── */}
      <div className="fixed bottom-5 right-5 z-[60]">
        {!open && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-30"
            style={{ animation: 'pulseRing 2.2s cubic-bezier(0.215,0.61,0.355,1) infinite' }}
          />
        )}
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--glow)] transition hover:opacity-90"
          aria-label={open ? 'Close assistant' : 'Open AI assistant'}
          aria-expanded={open}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <FiX size={16} />
              </motion.span>
            ) : (
              <motion.span key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <FiMessageCircle size={16} />
              </motion.span>
            )}
          </AnimatePresence>
          {open ? 'Close' : 'AI Assistant'}
        </motion.button>
      </div>

      {/* ── Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[4.75rem] right-5 z-[60] flex w-[min(94vw,26rem)] flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-2xl"
            style={{ maxHeight: 'min(80vh, 640px)' }}
            role="dialog"
            aria-label="Navfy AI Assistant"
          >
            {/* Header */}
            <header className="flex shrink-0 items-center gap-3 border-b border-[var(--line)] px-4 py-3">
              <BotAvatar />
              <div className="flex-1">
                <p className="text-sm font-semibold">Navfy Assistant</p>
                <p className="text-xs text-[var(--text-soft)]">
                  {isTyping ? 'Thinking...' : 'Product guidance in real time'}
                </p>
              </div>
              {journey?.stageLabel && (
                <span className="rounded-full border border-[var(--line)] px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[var(--text-soft)]">
                  {journey.stageLabel}
                </span>
              )}
              <button
                type="button"
                onClick={resetSession}
                disabled={isTyping}
                className="rounded-md p-1.5 text-[var(--text-soft)] transition hover:bg-[var(--surface-strong)] disabled:opacity-40"
                aria-label="Reset conversation"
                title="Reset conversation"
              >
                <FiRotateCcw size={14} />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-1.5 text-[var(--text-soft)] transition hover:bg-[var(--surface-strong)]"
                aria-label="Close"
              >
                <FiX size={16} />
              </button>
            </header>

            {/* Messages */}
            <div
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
              aria-live="polite"
              aria-atomic="false"
            >
              {displayMessages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.role === 'bot' && <BotAvatar />}
                  <div
                    className={`max-w-[88%] rounded-2xl px-3 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'rounded-tr-sm bg-[var(--accent)] text-white'
                        : 'rounded-tl-sm border border-[var(--line)] bg-[var(--bg)] text-[var(--text)]'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Bullet points */}
                    {msg.role === 'bot' && msg.bullets?.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {msg.bullets.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-1.5 text-xs text-[var(--text-soft)]">
                            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Demo block */}
                    {msg.role === 'bot' && msg.demo?.title && (
                      <DemoBlock title={msg.demo.title} steps={msg.demo.steps} />
                    )}

                    {/* Action chips */}
                    {msg.role === 'bot' && (
                      <ActionChips
                        actions={msg.actions}
                        recommendations={msg.recommendations}
                        onSend={sendMessage}
                      />
                    )}
                  </div>
                </div>
              ))}

              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-[var(--line)] px-4 py-3">
              {/* Quick prompts — hidden after 6 user turns */}
              {turnCount < 6 && (
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      disabled={isTyping}
                      className="rounded-full border border-[var(--line)] px-2.5 py-1 text-xs text-[var(--text-soft)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-40"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  sendMessage(input)
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isTyping ? 'Waiting for response...' : 'Ask about features, pricing, APIs…'}
                  disabled={isTyping}
                  className="h-10 flex-1 rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={!canSend}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Send message"
                >
                  <FiSend size={15} />
                </button>
              </form>

              <p className="mt-2 text-xs text-[var(--text-soft)]">
                Need a human?{' '}
                <Link to="/contact" className="text-[var(--accent)] hover:underline">
                  Contact the team
                </Link>
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}

export default memo(AIChatbot)
