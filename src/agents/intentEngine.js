const INTENT_KEYWORDS = {
    onboarding: ['what', 'start', 'new', 'begin', 'help', 'overview'],
    map: ['map', 'route', 'tracking', 'location', 'directions'],
    api: ['api', 'endpoint', 'developer', 'integration', 'sdk', 'webhook'],
    pricing: ['price', 'pricing', 'plan', 'cost', 'subscription'],
    demo: ['demo', 'show', 'walkthrough', 'try'],
    enterprise: ['enterprise', 'security', 'compliance', 'sla', 'sso'],
    contact: ['contact', 'sales', 'talk', 'call', 'message'],
}

export function detectIntent(message) {
    const input = (message ?? '').toLowerCase()

    let bestIntent = 'onboarding'
    let bestScore = 0

    Object.entries(INTENT_KEYWORDS).forEach(([intent, words]) => {
        const score = words.reduce((acc, w) => acc + (input.includes(w) ? 1 : 0), 0)
        if (score > bestScore) {
            bestIntent = intent
            bestScore = score
        }
    })

    const confidence = bestScore === 0 ? 0.35 : Math.min(0.55 + bestScore * 0.12, 0.95)

    return {
        intent: bestIntent,
        confidence,
        isAmbiguous: bestScore <= 1,
    }
}

export function recommendOptions(intent, pageContext, session) {
    const optionMap = {
        onboarding: [
            { label: 'See product overview', action: 'overview-demo' },
            { label: 'Open map demo', action: 'open-map' },
            { label: 'Explore API demo', action: 'open-apis' },
        ],
        map: [
            { label: 'Run route planner demo', action: 'demo-map-route' },
            { label: 'Explain map features', action: 'explain-map' },
            { label: 'Go to API demo', action: 'open-apis' },
        ],
        api: [
            { label: 'Run API walkthrough', action: 'demo-api' },
            { label: 'Explain endpoint options', action: 'explain-api' },
            { label: 'Discuss pilot onboarding', action: 'open-contact' },
        ],
        pricing: [
            { label: 'Compare plans', action: 'demo-pricing' },
            { label: 'Recommend a plan', action: 'recommend-plan' },
            { label: 'Talk to team', action: 'open-contact' },
        ],
        demo: [
            { label: 'Product walkthrough', action: 'overview-demo' },
            { label: 'Map walkthrough', action: 'demo-map-route' },
            { label: 'API walkthrough', action: 'demo-api' },
        ],
        enterprise: [
            { label: 'Show enterprise scope', action: 'enterprise-scope' },
            { label: 'Review current readiness', action: 'readiness-check' },
            { label: 'Start requirement call', action: 'open-contact' },
        ],
        contact: [
            { label: 'Guide me to contact form', action: 'demo-contact' },
            { label: 'What details should I share?', action: 'contact-best-practice' },
            { label: 'Review product scope first', action: 'overview-demo' },
        ],
    }

    const pageAware = pageContext.name === 'Map Demo' && intent === 'onboarding'
        ? [
            { label: 'Run route planner demo', action: 'demo-map-route' },
            { label: 'Explain map controls', action: 'explain-map' },
            { label: 'Go to API playground', action: 'open-apis' },
        ]
        : null

    const base = (pageAware ?? optionMap[intent] ?? optionMap.onboarding)

    if (session?.stage === 'demo') {
        return [
            { label: 'Open contact for next step', action: 'open-contact' },
            { label: 'Compare pilot plans', action: 'demo-pricing' },
            { label: 'Run one more demo', action: 'overview-demo' },
        ]
    }

    if (session?.stage === 'conversion') {
        return [
            { label: 'Fill contact form now', action: 'open-contact' },
            { label: 'Review pricing once more', action: 'demo-pricing' },
        ]
    }

    return base.slice(0, 3)
}
