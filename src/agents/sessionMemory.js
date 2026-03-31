const STAGE_ORDER = ['entry', 'understanding', 'selection', 'demo', 'conversion']

function stageIndex(stage) {
    const idx = STAGE_ORDER.indexOf(stage)
    return idx === -1 ? 0 : idx
}

function maxStage(a, b) {
    return stageIndex(a) >= stageIndex(b) ? a : b
}

export function createAgentSession(pathname = '/') {
    return {
        id: `sess_${Math.random().toString(36).slice(2, 10)}`,
        stage: 'entry',
        primaryNeed: null,
        visitedPages: [pathname],
        turns: 0,
        lastIntent: 'onboarding',
        lastUpdatedAt: Date.now(),
    }
}

export function updateAgentSession(session, payload) {
    const next = { ...(session ?? createAgentSession(payload.pathname)) }

    next.turns = (next.turns ?? 0) + 1
    next.lastIntent = payload.intent ?? next.lastIntent
    next.lastUpdatedAt = Date.now()

    if (payload.pathname && !next.visitedPages.includes(payload.pathname)) {
        next.visitedPages = [...next.visitedPages, payload.pathname]
    }

    if (!next.primaryNeed && payload.intent && payload.intent !== 'onboarding') {
        next.primaryNeed = payload.intent
    }

    let stageCandidate = next.stage

    if (payload.intent === 'onboarding') stageCandidate = maxStage(stageCandidate, 'understanding')
    if (payload.intent === 'pricing' || payload.intent === 'enterprise') stageCandidate = maxStage(stageCandidate, 'selection')
    if (payload.intent === 'demo' || payload.intent === 'map' || payload.intent === 'api') stageCandidate = maxStage(stageCandidate, 'demo')
    if (payload.intent === 'contact' || payload.nextActionHref === '/contact') stageCandidate = maxStage(stageCandidate, 'conversion')

    next.stage = stageCandidate
    return next
}

export function touchSessionPath(session, pathname) {
    const next = { ...(session ?? createAgentSession(pathname)) }
    if (pathname && !next.visitedPages.includes(pathname)) {
        next.visitedPages = [...next.visitedPages, pathname]
        next.lastUpdatedAt = Date.now()
    }
    return next
}

export function buildJourneySummary(session) {
    const stageLabels = {
        entry: 'Entry',
        understanding: 'Understanding',
        selection: 'Selection',
        demo: 'Demo',
        conversion: 'Conversion',
    }

    return {
        stage: session.stage,
        stageLabel: stageLabels[session.stage] ?? 'Entry',
        primaryNeed: session.primaryNeed ?? 'not set yet',
        turns: session.turns,
        visitedPages: session.visitedPages,
        suggestedNext:
            session.stage === 'entry' || session.stage === 'understanding'
                ? 'Run a guided demo'
                : session.stage === 'selection'
                    ? 'Choose a pilot path'
                    : session.stage === 'demo'
                        ? 'Move to contact for next steps'
                        : 'Submit contact details for follow-up',
    }
}
