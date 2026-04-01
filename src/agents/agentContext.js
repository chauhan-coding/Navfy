export const PAGE_CONTEXT = {
    '/': {
        name: 'Home',
        primaryGoal: 'Help user understand product and pick a path',
        availableDemos: ['map-walkthrough', 'api-walkthrough', 'pricing-walkthrough'],
    },
    '/map': {
        name: 'Map Demo',
        primaryGoal: 'Help user plan route demo and map capabilities',
        availableDemos: ['route-planner-demo', 'tracking-visual-demo'],
    },
    '/apis': {
        name: 'API Demo',
        primaryGoal: 'Help user run and understand API playground',
        availableDemos: ['search-endpoint-demo', 'route-endpoint-demo', 'geofence-demo'],
    },
    '/pricing': {
        name: 'Pricing',
        primaryGoal: 'Help user select pilot plan',
        availableDemos: ['plan-selection-demo'],
    },
    '/contact': {
        name: 'Contact',
        primaryGoal: 'Help user submit relevant inquiry quickly',
        availableDemos: ['contact-form-guide'],
    },
    '/products': {
        name: 'Products',
        primaryGoal: 'Help user explore product capabilities and choose the right product',
        availableDemos: ['product-overview-demo', 'feature-comparison-demo'],
    },
    '/solutions': {
        name: 'Solutions',
        primaryGoal: 'Match user industry/use-case to the right solution',
        availableDemos: ['fleet-solution-demo', 'logistics-demo', 'real-estate-demo'],
    },
    '/enterprise': {
        name: 'Enterprise',
        primaryGoal: 'Help enterprise buyers understand compliance, SLA, and deployment options',
        availableDemos: ['enterprise-scope-demo', 'security-posture-demo'],
    },
    '/developers': {
        name: 'Developers',
        primaryGoal: 'Help developers get started with SDK, docs, and API access',
        availableDemos: ['sdk-quickstart-demo', 'api-key-setup-demo'],
    },
}

export function getPageContext(pathname) {
    return PAGE_CONTEXT[pathname] ?? {
        name: 'Product',
        primaryGoal: 'Help user navigate and find value quickly',
        availableDemos: ['product-walkthrough'],
    }
}
