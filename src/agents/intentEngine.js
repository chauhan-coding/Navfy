// ─── Intent detection with keyword + phrase scoring ─────────────────────────

const INTENT_CONFIG = {
    onboarding: {
        keywords: ['what', 'start', 'new', 'begin', 'help', 'overview', 'about', 'navfy', 'how', 'explain',
            'learn', 'understand', 'introduce', 'info', 'product', 'platform', 'feature', 'capability'],
        phrases: ['what is', 'what can', 'tell me', 'how does', 'what do you', 'getting started',
            'walk me', 'give me an overview', 'show me what'],
    },
    map: {
        keywords: ['map', 'route', 'routing', 'tracking', 'location', 'directions', 'navigate', 'navigation',
            'gps', 'geocode', 'geocoding', 'address', 'geofence', 'geofencing', 'zone', 'fleet',
            'coordinate', 'lat', 'lng', 'pin', 'marker', 'road', 'drive', 'driving', 'path'],
        phrases: ['live map', 'route planner', 'track vehicle', 'track asset', 'location search',
            'map demo', 'plot route', 'find location', 'get directions'],
    },
    api: {
        keywords: ['api', 'endpoint', 'developer', 'integration', 'sdk', 'webhook', 'code', 'rest',
            'json', 'request', 'response', 'playground', 'http', 'documentation', 'docs',
            'key', 'token', 'auth', 'curl', 'library', 'client'],
        phrases: ['api demo', 'how to integrate', 'code example', 'developer access', 'api key',
            'run endpoint', 'api playground', 'call the api', 'make a request'],
    },
    pricing: {
        keywords: ['price', 'pricing', 'plan', 'cost', 'subscription', 'free', 'paid', 'billing',
            'tier', 'package', 'fee', 'charge', 'budget', 'affordable', 'rupee', 'inr',
            'monthly', 'annual', 'yearly', 'discount', 'trial', 'pilot', 'cheap', 'expensive'],
        phrases: ['how much', 'what does it cost', 'pricing plan', 'free tier', 'paid plan',
            'annual discount', 'which plan', 'what plan', 'compare plans'],
    },
    demo: {
        keywords: ['demo', 'show', 'walkthrough', 'try', 'test', 'play', 'see', 'example',
            'live', 'interactive', 'simulate', 'preview', 'demonstration', 'watch'],
        phrases: ['show me', 'can i see', 'can i try', 'give me a demo', 'walk me through',
            'let me see', 'how does it look', 'see it in action'],
    },
    enterprise: {
        keywords: ['enterprise', 'security', 'compliance', 'sla', 'sso', 'saml', 'scale', 'custom',
            'deploy', 'deployment', 'premise', 'private', 'contract', 'volume', 'b2b',
            'organization', 'government', 'regulated', 'large'],
        phrases: ['large scale', 'enterprise plan', 'custom deployment', 'data security',
            'compliance requirement', 'on premise', 'large team', 'big company'],
    },
    contact: {
        keywords: ['contact', 'sales', 'talk', 'call', 'message', 'reach', 'email', 'support',
            'team', 'speak', 'connect', 'discuss', 'human', 'person', 'someone', 'agent', 'book'],
        phrases: ['get in touch', 'talk to', 'speak with', 'reach out', 'contact form',
            'need help', 'talk to sales', 'book a demo'],
    },
}

/**
 * Detects user intent using keyword + phrase scoring with history boost.
 * @param {string} message - Current user message
 * @param {Array}  history - Recent conversation history for context boost
 */
export function detectIntent(message, history = []) {
    const input = (message ?? '').toLowerCase().trim()

    let bestIntent = 'onboarding'
    let bestScore = 0

    for (const [intent, config] of Object.entries(INTENT_CONFIG)) {
        let score = 0

        // Single-keyword matching with word boundaries
        for (const keyword of config.keywords) {
            const safeKw = keyword.replace(/[-]/g, '\\$&')
            if (new RegExp(`\\b${safeKw}\\b`, 'i').test(input)) score += 1
        }

        // Phrase matching (higher weight)
        for (const phrase of config.phrases) {
            if (input.includes(phrase)) score += 1.8
        }

        // History context boost: recent turns on same topic slightly increase score
        const recentUserTurns = history.slice(-4).filter((m) => m.role === 'user')
        for (const turn of recentUserTurns) {
            const prev = (turn.text ?? '').toLowerCase()
            for (const keyword of config.keywords.slice(0, 6)) {
                if (prev.includes(keyword)) score += 0.15
            }
        }

        if (score > bestScore) {
            bestIntent = intent
            bestScore = score
        }
    }

    const confidence = bestScore === 0 ? 0.30 : Math.min(0.52 + bestScore * 0.1, 0.96)

    return {
        intent: bestIntent,
        confidence,
        isAmbiguous: bestScore < 1.0,
    }
}

/**
 * Returns contextual quick-reply options based on intent, page, and session stage.
 */
export function recommendOptions(intent, pageContext, session) {
    const optionMap = {
        onboarding: [
            { label: 'Walk me through the platform', action: 'overview-demo' },
            { label: 'Open map demo', action: 'open-map' },
            { label: 'Explore pricing options', action: 'demo-pricing' },
        ],
        map: [
            { label: 'Run route planner demo', action: 'demo-map-route' },
            { label: 'Explain map capabilities', action: 'explain-map' },
            { label: 'Show me the APIs', action: 'open-apis' },
        ],
        api: [
            { label: 'Run API walkthrough', action: 'demo-api' },
            { label: 'Explain the endpoints', action: 'explain-api' },
            { label: 'Get pilot API access', action: 'open-contact' },
        ],
        pricing: [
            { label: 'Compare all plans', action: 'demo-pricing' },
            { label: 'Help me pick a plan', action: 'recommend-plan' },
            { label: 'Talk to the team', action: 'open-contact' },
        ],
        demo: [
            { label: 'Platform walkthrough', action: 'overview-demo' },
            { label: 'Map route demo', action: 'demo-map-route' },
            { label: 'API playground walkthrough', action: 'demo-api' },
        ],
        enterprise: [
            { label: 'Show enterprise scope', action: 'enterprise-scope' },
            { label: 'Review compliance readiness', action: 'readiness-check' },
            { label: 'Start a requirements call', action: 'open-contact' },
        ],
        contact: [
            { label: 'Guide me to the form', action: 'demo-contact' },
            { label: 'What details should I share?', action: 'contact-best-practice' },
            { label: 'Review product scope first', action: 'overview-demo' },
        ],
    }

    // Page-aware overrides
    if (pageContext.name === 'Map Demo' && intent === 'onboarding') {
        return [
            { label: 'Run route planner demo', action: 'demo-map-route' },
            { label: 'Explain the map controls', action: 'explain-map' },
            { label: 'Go to API playground', action: 'open-apis' },
        ]
    }
    if (pageContext.name === 'API Demo' && intent === 'onboarding') {
        return [
            { label: 'Walk through an endpoint', action: 'demo-api' },
            { label: 'How do I get API access?', action: 'open-contact' },
            { label: 'Which API should I use?', action: 'explain-api' },
        ]
    }

    // Stage-based overrides
    if (session?.stage === 'demo') {
        return [
            { label: 'Discuss next steps', action: 'open-contact' },
            { label: 'Compare pilot plans', action: 'demo-pricing' },
            { label: 'Run another demo', action: 'overview-demo' },
        ]
    }
    if (session?.stage === 'conversion') {
        return [
            { label: 'Fill contact form now', action: 'open-contact' },
            { label: 'Review pricing one more time', action: 'demo-pricing' },
        ]
    }

    return (optionMap[intent] ?? optionMap.onboarding).slice(0, 3)
}
