function buildDemoBlock(title, steps) {
    return { title, steps }
}

export const FeatureAgent = {
    id: 'feature-agent',
    run() {
        return {
            agent: 'Feature Agent',
            text: 'Navfy is a geospatial intelligence platform that gives fleet operators, developers, and logistics teams real-time mapping, precise routing, and powerful API infrastructure — all in one place.',
            bullets: [
                'Real-time map visualization with multi-point route optimization',
                'Developer-grade REST APIs for search, routing, and geofencing',
                'Scalable SaaS plans starting with a zero-commitment pilot',
                'Enterprise-ready with SLA guarantees and dedicated support',
            ],
            demo: buildDemoBlock('Product Walkthrough', [
                'Start at Home to understand the full product scope.',
                'Open the Map page to run the route planner demo.',
                'Open the API page to explore live endpoint flows.',
                'Visit Pricing to compare starter and team plans.',
            ]),
            actions: [
                { label: 'Open map demo', href: '/map' },
                { label: 'Explore APIs', href: '/apis' },
                { label: 'View pricing', href: '/pricing' },
            ],
            recommendations: [],
            confidence: 0.85,
        }
    },
}

export const MapAgent = {
    id: 'map-agent',
    run({ intent, pageContext }) {
        const text = intent === 'map'
            ? 'The interactive map supports origin-to-destination routing, turn-by-turn directions, and real-time fleet tracking — all configurable through the Map API.'
            : `Map capabilities are available here on ${pageContext.name} and ready to explore through the route planner demo.`
        return {
            agent: 'Map Agent',
            text,
            bullets: [
                'Multi-stop route planning with real-time traffic signals',
                'Geofence zones — trigger alerts when assets enter or exit',
                'Tile-based map rendering with sub-100ms response at scale',
                'Searchable address lookup with autocomplete and pin drop',
            ],
            demo: buildDemoBlock('Route Planner Demo', [
                'Click anywhere on the map to set your origin point.',
                'Add a destination using the search bar or a second click.',
                'Press Get Directions to render turn-by-turn routing.',
                'Review distance, duration, and full path in the side panel.',
            ]),
            actions: [
                { label: 'Open map page', href: '/map' },
                { label: 'Run route demo', action: 'demo-map-route' },
            ],
            recommendations: [],
            confidence: 0.84,
        }
    },
}

export const APIAgent = {
    id: 'api-agent',
    run() {
        return {
            agent: 'API Agent',
            text: 'The API playground lets you execute live endpoint calls against our Search, Routing, and Geofence APIs — with structured JSON responses you can copy directly into your integration.',
            bullets: [
                'Search API — forward/reverse geocoding with sub-80ms p95 latency',
                'Routes API — multi-modal routing supporting car, truck, and bicycle',
                'Geofence API — polygon zone management with webhook-triggered alerts',
            ],
            demo: buildDemoBlock('API Playground Walkthrough', [
                'Select an endpoint tab: Search, Routes, or Geofence.',
                'Fill in the required request parameters in the form.',
                'Click Run Request to simulate a live API call.',
                'Inspect the structured JSON response in the output pane.',
            ]),
            actions: [
                { label: 'Open API playground', href: '/apis' },
                { label: 'Get pilot API access', href: '/contact' },
            ],
            recommendations: [],
            confidence: 0.86,
        }
    },
}

export const PricingAgent = {
    id: 'pricing-agent',
    run({ history = [] }) {
        const historyText = history.map((m) => m.text ?? '').join(' ').toLowerCase()
        const isFleet = /fleet|truck|vehicle|logistics|delivery/.test(historyText)
        const isDev = /developer|sdk|api|integration|code/.test(historyText)

        let recommendedPlan, planReason
        if (isFleet) {
            recommendedPlan = 'Team'
            planReason = 'based on your fleet/logistics use case, the Team plan gives you volume routing and dedicated support'
        } else if (isDev) {
            recommendedPlan = 'Developer'
            planReason = 'given your API integration focus, the Developer plan includes full API access with generous monthly call limits'
        } else {
            recommendedPlan = 'Starter'
            planReason = 'the Starter plan is a zero-commitment pilot that includes core map and API features'
        }

        return {
            agent: 'Pricing Agent',
            text: `We offer three plans — Starter, Developer, and Team. I recommend the ${recommendedPlan} plan: ${planReason}.`,
            bullets: [
                'Starter — Free pilot with core map and routing API access',
                'Developer — Full API suite with 50k monthly calls and webhook support',
                'Team — Volume routing, SLA, dedicated onboarding, and custom limits',
            ],
            demo: null,
            actions: [
                { label: 'View all plans', href: '/pricing' },
                { label: 'Talk to the team', href: '/contact' },
            ],
            recommendations: [],
            confidence: 0.83,
        }
    },
}

export const EnterpriseAgent = {
    id: 'enterprise-agent',
    run() {
        return {
            agent: 'Enterprise Agent',
            text: 'For large organizations and regulated industries, Navfy offers a fully managed enterprise deployment with contractual SLA, dedicated infra, and compliance-ready security posture.',
            bullets: [
                'Private or on-premise deployment options for data sovereignty',
                'SOC 2 Type II aligned security controls and audit logging',
                'Custom SSO/SAML integration for enterprise identity management',
                'Dedicated CSM, 24/7 priority support, and SLA commitment',
            ],
            demo: null,
            actions: [
                { label: 'Start requirements discussion', href: '/contact' },
                { label: 'View enterprise plan', href: '/pricing' },
            ],
            recommendations: [],
            confidence: 0.88,
        }
    },
}

export const SupportAgent = {
    id: 'support-agent',
    run() {
        return {
            agent: 'Support Agent',
            text: 'Our team is ready to help. You can reach us via the contact form, and we typically respond within one business day. Share your use case so we can route you to the right person.',
            bullets: null,
            demo: null,
            actions: [
                { label: 'Open contact form', href: '/contact' },
                { label: 'View pricing options', href: '/pricing' },
            ],
            recommendations: [],
            confidence: 0.80,
        }
    },
}

export const UIDemoAgent = {
    id: 'ui-demo-agent',
    run({ intent }) {
        const text = intent === 'onboarding'
            ? 'I can walk you through the product in a few steps: platform overview, map demo, and API demo.'
            : 'Let me run a quick guided walkthrough to show the most relevant part of the platform.'
        return {
            agent: 'UI/Demo Agent',
            text,
            bullets: null,
            demo: buildDemoBlock('Product Walkthrough', [
                'Start at Home to understand the full product scope.',
                'Open Map for route planner interaction.',
                'Open APIs for request/response walkthrough.',
            ]),
            actions: [
                { label: 'Open home', href: '/' },
                { label: 'Open map demo', href: '/map' },
                { label: 'Open API demo', href: '/apis' },
            ],
            recommendations: [],
            confidence: 0.75,
        }
    },
}

export function chooseDevAgents(intent) {
    const matrix = {
        onboarding: [FeatureAgent],
        map:        [MapAgent],
        api:        [APIAgent],
        pricing:    [PricingAgent],
        demo:       [FeatureAgent, MapAgent],
        enterprise: [EnterpriseAgent],
        contact:    [SupportAgent],
    }
    return matrix[intent] ?? [UIDemoAgent]
}
