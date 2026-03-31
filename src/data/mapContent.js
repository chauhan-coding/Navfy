// Map Route Planner - Localized Content

export const mapSectionContent = {
    eyebrow: 'Route Planner',
    title: 'Plan Your Route',
    description:
        'Enter origin and destination to get turn-by-turn directions and visualize the route on an interactive map.',
    originPlaceholder: 'Origin (e.g. India Gate, Delhi)',
    destinationPlaceholder: 'Destination (e.g. Qutab Minar, Delhi)',
    getDirectionsLabel: 'Get Directions',
    clearLabel: 'Clear',
    directionsHeading: 'Turn-by-Turn Directions',
    distanceLabel: 'Distance',
    durationLabel: 'Duration',
    loadingText: 'Fetching route...',
    errorText: 'Could not fetch route. Please check your inputs and try again.',
    geocodeErrorText: 'Location not found. Please try a more specific address.',
    noRouteText: 'Enter a start and end location to see directions here.',
    stepUnit: {
        meters: 'm',
        km: 'km',
        min: 'min',
        hr: 'hr',
    },
}

export const mapDefaults = {
    center: { lat: 28.6129, lng: 77.2295 },
    zoom: 13,
    originLabel: 'India Gate, New Delhi',
    originCoords: { lat: 28.6129, lng: 77.2295 },
    destinationLabel: 'Qutub Minar, New Delhi',
    destinationCoords: { lat: 28.5244, lng: 77.1855 },
}

export const mapNavItems = [
    { label: 'Home', href: '/', type: 'router' },
    { label: 'Gadgets', href: '/gadgets', type: 'router' },
    { label: 'Ambassador', href: '/ambassador', type: 'router' },
]
