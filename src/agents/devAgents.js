function buildDemoBlock(title, steps) {
    return {
        title,
        steps,
    }
}

export const MapAgent = {
    id: 'map-agent',
    run({ intent, pageContext }) {
        const demo = buildDemoBlock('Route Planner Demo', [
            'Set origin and destination in the map form.',
            'Click Get Directions to render route details.',
            'Review distance and step-by-step path in the side panel.',
        ])

        const text = intent === 'map'
            ? 'You are in the right place. The current map page supports a route-planner demo flow with interactive directions.'
            : `Map capability is available via the ${pageContext.name} flow and can be explored immediately.`

        return {
            agent: 'Map Agent',
            text,
            demo,
            actions: [
                { label: 'Open map page', href: '/map' },
                { label: 'Run route demo steps', action: 'demo-map-route' },
            ],
            confidence: 0.82,
        }
    },
}

export const UIDemoAgent = {
    id: 'ui-demo-agent',
    run({ intent }) {
        const text = intent === 'onboarding'
            ? 'I can guide you through the product in three steps: product overview, map demo, and API demo.'
            : 'I can run a guided walkthrough for the relevant page and keep the next action clear.'

        return {
            agent: 'UI/Demo Agent',
            text,
            demo: buildDemoBlock('Product Walkthrough', [
                'Start from Home to understand current scope.',
                'Open Map for route planner interaction.',
                'Open APIs for request/response walkthrough.',
            ]),
            actions: [
                { label: 'Open home', href: '/' },
                { label: 'Open map demo', href: '/map' },
                { label: 'Open API demo', href: '/apis' },
            ],
            confidence: 0.79,
        }
    },
}

export const APIFeatureAgent = {
    id: 'api-feature-agent',
    run() {
        return {
            agent: 'API/Feature Agent',
            text: 'The API page currently offers an interactive playground with mock endpoint flows for search, route, geocode, and geofence patterns.',
            demo: buildDemoBlock('API Playground Demo', [
                'Select an endpoint tab in the playground.',
                'Adjust parameters and run request simulation.',
                'Inspect structured response and next integration step.',
            ]),
            actions: [
                { label: 'Open API page', href: '/apis' },
                { label: 'Open contact for pilot access', href: '/contact' },
            ],
            confidence: 0.84,
        }
    },
}

export function chooseDevAgents(intent) {
    if (intent === 'map') return [MapAgent]
    if (intent === 'api') return [APIFeatureAgent]
    if (intent === 'pricing' || intent === 'enterprise') return [UIDemoAgent, APIFeatureAgent]
    if (intent === 'demo') return [UIDemoAgent, MapAgent]
    return [UIDemoAgent]
}
