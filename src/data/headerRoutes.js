export const HEADER_LINK_ROUTES = {
    Products: '/products',
    Solutions: '/solutions',
    APIs: '/apis',
    Stats: '/stats',
    Testimonials: '/testimonials',
    Enterprise: '/enterprise',
    Developers: '/developers',
    Company: '/company',
    Trackers: '/trackers',
    'Dash-Cameras': '/dash-cameras',
    'Navi-tainment': '/navi-tainment',
    'Smart Internet Kids': '/smart-internet-kids',
    'About Navfy': '/about-navfy',
    Gadgets: '/gadgets',
    Ambassador: '/ambassador',
    Map: '/map',
    Pricing: '/pricing',
    Contact: '/contact',
}

export function toRouterNavItem(item) {
    return {
        ...item,
        href: HEADER_LINK_ROUTES[item.label] ?? item.href,
        type: 'router',
    }
}

export function createHeaderNav(labels) {
    return labels.map((label) => ({
        label,
        href: HEADER_LINK_ROUTES[label],
        type: 'router',
    }))
}
