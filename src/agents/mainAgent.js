import { getPageContext } from './agentContext'
import { detectIntent, recommendOptions } from './intentEngine'
import { chooseDevAgents, UIDemoAgent } from './devAgents'
import { QAAgent } from './qaAgent'
import { createAgentSession, updateAgentSession, buildJourneySummary } from './sessionMemory'

function composeDevOutputs(outputs) {
    const primary = outputs[0]
    if (!primary) {
        throw new Error('No dev-agent outputs available')
    }

    const secondaryNotes = outputs
        .slice(1)
        .map((o) => o.text)
        .filter(Boolean)

    const text = secondaryNotes.length
        ? `${primary.text} ${secondaryNotes[0]}`
        : primary.text

    return {
        ...primary,
        text,
        actions: outputs.flatMap((o) => o.actions ?? []).slice(0, 3),
        confidence: Math.max(...outputs.map((o) => o.confidence ?? 0.5)),
    }
}

export async function runMultiAgentCycle({ message, pathname, history = [], session }) {
    const pageContext = getPageContext(pathname)
    const trace = []
    let nextSession = session ?? createAgentSession(pathname)

    trace.push({ step: 'analyze', label: 'Analyzing request...' })

    const intent = detectIntent(message)
    nextSession = updateAgentSession(nextSession, {
        pathname,
        intent: intent.intent,
    })

    const recommendations = recommendOptions(intent.intent, pageContext, nextSession)

    trace.push({ step: 'delegate', label: 'Delegating to specialist agent...' })

    let selectedAgents = chooseDevAgents(intent.intent)
    let outputs = []

    try {
        outputs = selectedAgents.map((agent) =>
            agent.run({
                message,
                intent: intent.intent,
                pageContext,
                history,
            }),
        )
    } catch (err) {
        trace.push({ step: 'retry', label: 'Primary agent failed, switching fallback agent...' })
        selectedAgents = [UIDemoAgent]
        outputs = selectedAgents.map((agent) =>
            agent.run({ message, intent: 'onboarding', pageContext, history }),
        )
    }

    trace.push({ step: 'validate', label: 'Validating response quality...' })

    const composed = composeDevOutputs(outputs)
    let qa = QAAgent.validate({ composed, recommendations, pageContext, intent })

    if (qa.status === 'rejected') {
        trace.push({ step: 'regenerate', label: 'QA rejected output, regenerating with fallback agent...' })
        const fallbackOutput = UIDemoAgent.run({
            message,
            intent: 'onboarding',
            pageContext,
            history,
        })
        const fallbackComposed = composeDevOutputs([fallbackOutput])
        qa = QAAgent.validate({
            composed: fallbackComposed,
            recommendations: recommendOptions('onboarding', pageContext, nextSession),
            pageContext,
            intent,
        })
    }

    if (qa.status === 'needs-clarification') {
        trace.push({ step: 'clarify', label: 'Low confidence detected, preparing safe clarification...' })
        qa = {
            ...qa,
            text: 'I want to make sure I guide you correctly. Would you like to explore map demo, API demo, or pricing options?',
            actions: [
                { label: 'Map demo', href: '/map' },
                { label: 'API demo', href: '/apis' },
                { label: 'Pricing', href: '/pricing' },
            ],
        }
    }

    nextSession = updateAgentSession(nextSession, {
        pathname,
        intent: intent.intent,
        nextActionHref: qa.actions?.[0]?.href,
    })

    const journey = buildJourneySummary(nextSession)

    return {
        pageContext,
        intent,
        qa,
        session: nextSession,
        journey,
        selectedAgents: selectedAgents.map((a) => a.id),
        trace,
    }
}
