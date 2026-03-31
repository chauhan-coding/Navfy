import { memo, useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMessageCircle, FiSend, FiX, FiCpu, FiArrowRight, FiRotateCcw } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import { runMultiAgentCycle } from '../../agents/mainAgent'
import { createAgentSession, touchSessionPath } from '../../agents/sessionMemory'

const ASSISTANT_STORAGE_KEY = 'navfy-assistant-state-v1'

function getDefaultMessages() {
  return [
    {
      role: 'bot',
      text: 'Hi, I am Navfy Assistant. What would you like to explore today?',
      actions: [
        { label: 'Product overview', href: '/' },
        { label: 'Map demo', href: '/map' },
        { label: 'API demo', href: '/apis' },
      ],
    },
  ]
}

function loadAssistantState(pathname) {
  try {
    const raw = window.sessionStorage.getItem(ASSISTANT_STORAGE_KEY)
    if (!raw) {
      return {
        open: false,
        messages: getDefaultMessages(),
        agentSession: createAgentSession(pathname),
      }
    }

    const parsed = JSON.parse(raw)
    return {
      open: Boolean(parsed?.open),
      messages: Array.isArray(parsed?.messages) && parsed.messages.length > 0 ? parsed.messages : getDefaultMessages(),
      agentSession: parsed?.agentSession ?? createAgentSession(pathname),
    }
  } catch {
    return {
      open: false,
      messages: getDefaultMessages(),
      agentSession: createAgentSession(pathname),
    }
  }
}

const QUICK_PROMPTS = [
  'What does Navfy do?',
  'Show me a map demo',
  'Show me an API walkthrough',
  'Help me choose a plan',
]

function AIChatbot() {
  const location = useLocation()
  const [hydrated, setHydrated] = useState(false)
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [pipelineSteps, setPipelineSteps] = useState([])
  const [agentSession, setAgentSession] = useState(() => createAgentSession(location.pathname))
  const [journey, setJourney] = useState(null)
  const [messages, setMessages] = useState(getDefaultMessages)

  useEffect(() => {
    const restored = loadAssistantState(location.pathname)
    setOpen(restored.open)
    setMessages(restored.messages)
    setAgentSession(touchSessionPath(restored.agentSession, location.pathname))
    setHydrated(true)
  }, [location.pathname])

  useEffect(() => {
    if (!hydrated) return
    window.sessionStorage.setItem(
      ASSISTANT_STORAGE_KEY,
      JSON.stringify({
        open,
        messages,
        agentSession,
      }),
    )
  }, [hydrated, open, messages, agentSession])

  useEffect(() => {
    if (!hydrated) return
    setAgentSession((prev) => touchSessionPath(prev, location.pathname))
  }, [hydrated, location.pathname])

  const canSend = input.trim().length > 0

  function resetAssistantSession() {
    const freshSession = createAgentSession(location.pathname)
    const freshMessages = getDefaultMessages()

    setInput('')
    setIsRunning(false)
    setPipelineSteps([])
    setJourney(null)
    setAgentSession(freshSession)
    setMessages(freshMessages)

    window.sessionStorage.setItem(
      ASSISTANT_STORAGE_KEY,
      JSON.stringify({
        open: true,
        messages: freshMessages,
        agentSession: freshSession,
      }),
    )
  }

  async function sendMessage(text) {
    const userText = text.trim()
    if (!userText) return

    setMessages((prev) => [...prev, { role: 'user', text: userText }])
    setInput('')

    setIsRunning(true)
    setPipelineSteps([])

    try {
      const result = await runMultiAgentCycle({
        message: userText,
        pathname: location.pathname,
        history: messages,
        session: agentSession,
      })

      setPipelineSteps(result.trace)
      setAgentSession(result.session)
      setJourney(result.journey)

      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: result.qa.text,
          actions: result.qa.actions,
          recommendations: result.qa.recommendations,
          demo: result.qa.demo,
          meta: {
            agents: result.selectedAgents,
            reviewedBy: result.qa.reviewedBy,
            stage: result.journey?.stageLabel,
            need: result.journey?.primaryNeed,
          },
        },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: 'I hit an issue while generating a guided response. Please pick one option and I will continue: map demo, API demo, or pricing.',
          actions: [
            { label: 'Map demo', href: '/map' },
            { label: 'API demo', href: '/apis' },
            { label: 'Pricing', href: '/pricing' },
          ],
        },
      ])
    } finally {
      setIsRunning(false)
    }
  }

  const lastMessages = useMemo(() => messages.slice(-8), [messages])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--glow)] transition hover:opacity-90"
        aria-label={open ? 'Close chatbot' : 'Open chatbot'}
      >
        {open ? <FiX size={16} /> : <FiMessageCircle size={16} />}
        {open ? 'Close Assistant' : 'AI Assistant'}
      </button>

      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-5 z-[60] w-[min(92vw,24rem)] overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <FiCpu size={16} />
                </span>
                <div>
                  <p className="text-sm font-semibold">Navfy Assistant</p>
                  <p className="text-xs text-[var(--text-soft)]">Product guidance in real time</p>
                </div>
              </div>
              {journey?.stageLabel && (
                <span className="rounded-full border border-[var(--line)] px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[var(--text-soft)]">
                  {journey.stageLabel}
                </span>
              )}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={resetAssistantSession}
                  disabled={isRunning}
                  className="rounded-md p-1 text-[var(--text-soft)] hover:bg-[var(--surface-strong)] disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Reset assistant session"
                  title="Reset assistant session"
                >
                  <FiRotateCcw size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md p-1 text-[var(--text-soft)] hover:bg-[var(--surface-strong)]"
                  aria-label="Close"
                >
                  <FiX size={16} />
                </button>
              </div>
            </header>

            <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-4">
              {journey?.suggestedNext && (
                <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--text-soft)]">
                  <span className="font-semibold text-[var(--text)]">Journey next step:</span> {journey.suggestedNext}
                </div>
              )}

              {isRunning && (
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-xs text-[var(--text-soft)]">
                  {pipelineSteps.length ? (
                    <div className="space-y-1">
                      {pipelineSteps.map((step, i) => (
                        <p key={`${step.step}-${i}`}>{step.label}</p>
                      ))}
                    </div>
                  ) : (
                    <p>Analyzing request...</p>
                  )}
                </div>
              )}

              {lastMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                    msg.role === 'user'
                      ? 'bg-[var(--accent)] text-white'
                      : 'border border-[var(--line)] bg-[var(--bg)] text-[var(--text)]'
                  }`}>
                    <p>{msg.text}</p>

                    {msg.demo?.title && (
                      <div className="mt-2 rounded-xl border border-[var(--line)] bg-[var(--surface)]/80 p-2 text-xs text-[var(--text-soft)]">
                        <p className="font-semibold text-[var(--text)]">{msg.demo.title}</p>
                        <ul className="mt-1 space-y-1">
                          {msg.demo.steps?.map((step) => (
                            <li key={step}>- {step}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {(msg.recommendations?.length > 0 || msg.actions?.length > 0) && msg.role === 'bot' && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {msg.recommendations?.map((rec) => (
                          <button
                            key={rec.action}
                            type="button"
                            onClick={() => sendMessage(rec.label)}
                            className="rounded-full border border-[var(--line)] px-2.5 py-1 text-xs text-[var(--text-soft)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                          >
                            {rec.label}
                          </button>
                        ))}

                        {msg.actions?.map((action) => (
                          action.href ? (
                            <Link
                              key={`${action.label}-${action.href}`}
                              to={action.href}
                              className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] px-2.5 py-1 text-xs text-[var(--text-soft)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                            >
                              {action.label}
                              <FiArrowRight size={12} />
                            </Link>
                          ) : (
                            <button
                              key={`${action.label}-${action.action}`}
                              type="button"
                              onClick={() => sendMessage(action.label)}
                              className="rounded-full border border-[var(--line)] px-2.5 py-1 text-xs text-[var(--text-soft)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                            >
                              {action.label}
                            </button>
                          )
                        ))}
                      </div>
                    )}

                    {msg.meta?.agents?.length > 0 && (
                      <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-[var(--text-soft)]">
                        {`Main Agent -> ${msg.meta.agents.join(' + ')} -> ${msg.meta.reviewedBy}`}
                      </p>
                    )}

                    {msg.meta?.stage && (
                      <p className="mt-1 text-[10px] text-[var(--text-soft)]">
                        {`Stage: ${msg.meta.stage} | Primary need: ${msg.meta.need}`}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[var(--line)] px-4 py-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border border-[var(--line)] px-3 py-1.5 text-xs text-[var(--text-soft)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  sendMessage(input)
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about features, pricing, APIs..."
                  className="h-10 flex-1 rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                />
                <button
                  type="submit"
                  disabled={!canSend || isRunning}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Send message"
                >
                  <FiSend size={15} />
                </button>
              </form>

              <p className="mt-2 text-xs text-[var(--text-soft)]">
                Need a human? <Link to="/contact" className="text-[var(--accent)] hover:underline">Contact the team</Link>
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}

export default memo(AIChatbot)
