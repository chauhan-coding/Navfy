import heroVisual from '../assets/hero-visual.svg'
import platformVisual from '../assets/platform-overview.svg'

export const navItems = [
    { label: 'Products', href: '#products' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'APIs', href: '#apis' },
    { label: 'Stats', href: '#stats' },
    { label: 'Testimonials', href: '#testimonials' },
]

export const heroContent = {
    eyebrow: 'Map-first startup product',
    title: 'Plan routes, explore APIs, and test workflows in one place.',
    description:
        'Navfy is an early-stage product demo focused on practical mapping UX: a live map experience, API playground, and guided onboarding assistant.',
    primaryCta: 'Try the product demo',
    secondaryCta: 'Open API playground',
    image: heroVisual,
    highlights: ['Live map route planner', 'Interactive API playground (mock)', 'Built-in AI guidance assistant'],
}

export const products = [
    {
        title: 'GeoStudio',
        description: 'Map creation, geofencing, and live overlays for product teams shipping quickly.',
        icon: 'grid',
    },
    {
        title: 'RoutePulse',
        description: 'Dynamic routing, ETA prediction, and fleet orchestration for operations teams.',
        icon: 'route',
    },
    {
        title: 'SignalOS',
        description: 'A control center for telemetry, alerts, and service observability across regions.',
        icon: 'signal',
    },
    {
        title: 'AddressIQ',
        description: 'Search, verify, and enrich address data with low-latency autocomplete APIs.',
        icon: 'pin',
    },
]

export const solutionTabs = [
    {
        key: 'enterprise',
        label: 'Enterprise',
        title: 'Coordinate logistics, workforce, and service coverage from one stack.',
        description:
            'Give operations, analytics, and product teams a single source of geospatial truth.',
        items: [
            'Route optimization for field teams',
            'Serviceability and coverage intelligence',
            'Custom dashboards for ops leadership',
        ],
        image: platformVisual,
    },
    {
        key: 'automotive',
        label: 'Automotive',
        title: 'Power navigation, EV journeys, and connected in-cabin experiences.',
        description:
            'Launch vehicle-aware services with SDKs, predictive ETA models, and resilient map delivery.',
        items: ['Navigation SDKs', 'EV charging overlays', 'Connected fleet analytics'],
        image: heroVisual,
    },
    {
        key: 'government',
        label: 'Government',
        title: 'Support infrastructure planning and public response with secure mapping layers.',
        description:
            'Handle large-scale assets, regional monitoring, and citizen-facing discovery workflows.',
        items: ['Secure deployment patterns', 'Region-wide asset indexing', 'Incident response coordination'],
        image: platformVisual,
    },
]

export const apis = [
    {
        title: 'Search API',
        code: 'GET /v1/search?q=charging+station&near=28.61,77.20',
        blurb: 'Fast, fuzzy search with ranking controls and proximity filters.',
    },
    {
        title: 'Routes SDK',
        code: 'navigator.route({ origin, destination, mode: "fleet" })',
        blurb: 'Client SDKs with ETA, traffic, and turn-by-turn rendering.',
    },
    {
        title: 'Geofence Webhooks',
        code: 'POST /v1/hooks/geofence-events',
        blurb: 'Trigger automations when assets enter, exit, or dwell within zones.',
    },
]

export const stats = [
    { value: 3, suffix: '', label: 'Core experiences live now' },
    { value: 12, suffix: '+', label: 'Navigation-linked product pages' },
    { value: 1, suffix: '', label: 'Unified design system' },
    { value: 1, suffix: '', label: 'Roadmap-driven product direction' },
]

export const testimonials = [
    {
        quote:
            'The map and API demo made the product direction easy to understand in one call.',
        name: 'Early Pilot Reviewer',
        role: 'Product Manager',
    },
    {
        quote:
            'I liked the honesty: what is live, what is mocked, and what is coming next is clearly stated.',
        name: 'Design Partner',
        role: 'Engineering Lead',
    },
    {
        quote:
            'Navigation, chatbot guidance, and page flow feel coherent for an early-stage product.',
        name: 'Beta User',
        role: 'Operations Analyst',
    },
]

export const footerColumns = [
    {
        title: 'Platform',
        links: [
            { label: 'Products', href: '/products' },
            { label: 'Solutions', href: '/solutions' },
            { label: 'Developers', href: '/developers' },
            { label: 'Pricing', href: '/pricing' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'API Playground', href: '/apis' },
            { label: 'Documentation', href: '/developers' },
            { label: 'Customer Stories', href: '/testimonials' },
            { label: 'Enterprise', href: '/enterprise' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About Navfy', href: '/about-navfy' },
            { label: 'Careers', href: 'mailto:careers@navfy.com' },
            { label: 'Ambassador Program', href: '/ambassador' },
            { label: 'Contact Us', href: '/contact' },
        ],
    },
]

export const brand = {
    name: 'Navfy',
}

export const headerContent = {
    ambassadorLabel: 'Ambassador',
    bookDemoLabel: 'Book demo',
    bookDemoHref: '/contact',
}

export const sectionHeadings = {
    products: {
        eyebrow: 'Products',
        title: 'Core modules for teams building geospatial software at scale.',
        description: 'A modular platform designed for routing, search, telemetry, and spatial operations across web and mobile surfaces.',
    },
    solutions: {
        eyebrow: 'Solutions',
        title: 'Adapt the same platform to enterprise, automotive, and civic use cases.',
        description: 'A reusable service layer with deployment patterns for regulated, high-scale, and customer-facing environments.',
    },
    apis: {
        eyebrow: 'APIs and SDKs',
        title: 'Developer surfaces designed to feel fast before they ever reach production.',
        description: 'Composable APIs, SDKs, and webhooks that let product teams launch search, routes, map layers, and automations with minimal setup.',
    },
    stats: {
        eyebrow: 'Product Status',
        title: 'Transparent progress from demo to production.',
        description: 'This section reflects current product maturity and roadmap direction, not audited enterprise metrics.',
        align: 'center',
    },
    testimonials: {
        eyebrow: 'Early Feedback',
        title: 'Pilot and reviewer impressions from current product demos.',
        description: 'Feedback here reflects early-stage product evaluation, not long-term production case studies.',
    },
}

export const footerBrand = {
    name: 'Navfy',
    heading: 'Map-first product experience for teams exploring location workflows.',
    description: 'Current release includes live navigation, API demo interfaces, and guided product onboarding. Additional services are in progress.',
}
