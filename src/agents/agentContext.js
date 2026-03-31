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
}

export function getPageContext(pathname) {
    return PAGE_CONTEXT[pathname] ?? {
        name: 'Product',
        primaryGoal: 'Help user navigate and find value quickly',
        availableDemos: ['product-walkthrough'],
    }
}
