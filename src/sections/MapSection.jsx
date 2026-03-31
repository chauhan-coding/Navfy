import { useState, useCallback, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiNavigation,
  FiMapPin,
  FiArrowUp,
  FiCornerUpLeft,
  FiCornerUpRight,
  FiRefreshCw,
  FiSearch,
  FiArrowRightCircle,
  FiAlertCircle,
  FiLoader,
  FiArrowRight,
  FiClock,
  FiTrendingUp,
  FiX,
} from 'react-icons/fi'
import SectionHeading from '../components/common/SectionHeading'
import Button from '../components/common/Button'
import { mapSectionContent, mapDefaults } from '../data/mapContent'

// ─── Custom SVG Map Pin Icons ───────────────────────────────────────────────

function createPinIcon(color, label = '') {
  return L.divIcon({
    html: `
      <div style="position:relative; width:32px; height:44px;">
        <svg width="32" height="44" viewBox="0 0 32 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 28 16 28s16-16 16-28C32 7.163 24.837 0 16 0z" fill="${color}"/>
          <circle cx="16" cy="16" r="7" fill="white" opacity="0.95"/>
        </svg>
        ${label ? `<span style="position:absolute;top:8px;left:50%;transform:translateX(-50%);font-size:9px;font-weight:700;color:${color};line-height:1">${label}</span>` : ''}
      </div>
    `,
    className: '',
    iconSize: [32, 44],
    iconAnchor: [16, 44],
    popupAnchor: [0, -46],
  })
}

const ORIGIN_ICON = createPinIcon('#22c55e', 'A')
const DESTINATION_ICON = createPinIcon('#ef4444', 'B')

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDistance(meters) {
  if (meters < 1000) return `${Math.round(meters)} ${mapSectionContent.stepUnit.meters}`
  return `${(meters / 1000).toFixed(1)} ${mapSectionContent.stepUnit.km}`
}

function formatDuration(seconds) {
  const mins = Math.round(seconds / 60)
  if (mins < 60) return `${mins} ${mapSectionContent.stepUnit.min}`
  const hrs = Math.floor(mins / 60)
  const rem = mins % 60
  return `${hrs} ${mapSectionContent.stepUnit.hr} ${rem > 0 ? `${rem} ${mapSectionContent.stepUnit.min}` : ''}`
}

function buildInstruction(step) {
  const { maneuver, name } = step
  const type = maneuver?.type ?? ''
  const modifier = maneuver?.modifier ?? ''
  const road = name ? `onto ${name}` : ''

  if (type === 'depart') return `Depart ${road || 'from start'}`
  if (type === 'arrive') return 'Arrive at destination'
  if (type === 'turn') return `Turn ${modifier} ${road}`.trim()
  if (type === 'new name') return `Continue ${road}`.trim()
  if (type === 'merge') return `Merge ${modifier} ${road}`.trim()
  if (type === 'roundabout' || type === 'rotary') return `Enter roundabout ${road}`.trim()
  if (type === 'exit roundabout' || type === 'exit rotary') return `Exit roundabout ${road}`.trim()
  if (type === 'fork') return `Keep ${modifier} ${road}`.trim()
  if (type === 'on ramp') return `Take ramp ${road}`.trim()
  if (type === 'off ramp') return `Take exit ${road}`.trim()
  if (type === 'end of road') return `Turn ${modifier} at end of road ${road}`.trim()
  return `Continue ${modifier} ${road}`.trim()
}

function getStepIcon(step) {
  const type = step?.maneuver?.type ?? ''
  const modifier = step?.maneuver?.modifier ?? ''

  if (type === 'depart') return <FiNavigation className="shrink-0 text-green-400" size={16} />
  if (type === 'arrive') return <FiMapPin className="shrink-0 text-red-400" size={16} />
  if (modifier.includes('left')) return <FiCornerUpLeft className="shrink-0 text-cyan-400" size={16} />
  if (modifier.includes('right')) return <FiCornerUpRight className="shrink-0 text-cyan-400" size={16} />
  if (type === 'roundabout' || type === 'rotary') return <FiRefreshCw className="shrink-0 text-yellow-400" size={16} />
  return <FiArrowUp className="shrink-0 text-slate-300" size={16} />
}

// ─── Map Recenter Helper ──────────────────────────────────────────────────────

function RecenterMap({ origin, destination }) {
  const map = useMap()

  useEffect(() => {
    if (origin && destination) {
      const bounds = L.latLngBounds(
        [origin.lat, origin.lng],
        [destination.lat, destination.lng],
      )
      map.fitBounds(bounds, { padding: [60, 60], duration: 1.2 })
    } else if (origin) {
      map.flyTo([origin.lat, origin.lng], 14, { duration: 1 })
    }
  }, [map, origin, destination])

  return null
}

// ─── Geocoding via Nominatim ──────────────────────────────────────────────────

async function geocode(query) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`
  const res = await fetch(url, { headers: { 'Accept-Language': 'en' } })
  if (!res.ok) throw new Error('Geocoding request failed')
  const data = await res.json()
  if (!data.length) return null
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), label: data[0].display_name }
}

// ─── Routing via OSRM ────────────────────────────────────────────────────────

async function fetchRoute(origin, destination) {
  const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?steps=true&geometries=geojson&overview=full`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Routing request failed')
  const data = await res.json()
  if (data.code !== 'Ok' || !data.routes.length) throw new Error('No route found')

  const route = data.routes[0]
  // OSRM returns [lng, lat], Leaflet needs [lat, lng]
  const polyline = route.geometry.coordinates.map(([lng, lat]) => [lat, lng])
  const steps = route.legs[0].steps
  const distance = route.distance
  const duration = route.duration

  return { polyline, steps, distance, duration }
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MapSection() {
  const [originQuery, setOriginQuery] = useState(mapDefaults.originLabel)
  const [destQuery, setDestQuery] = useState(mapDefaults.destinationLabel)
  const [originCoords, setOriginCoords] = useState(mapDefaults.originCoords)
  const [destCoords, setDestCoords] = useState(mapDefaults.destinationCoords)
  const [routePolyline, setRoutePolyline] = useState([])
  const [steps, setSteps] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasRoute, setHasRoute] = useState(false)

  // Load default route on mount
  useEffect(() => {
    handleGetDirections(mapDefaults.originCoords, mapDefaults.destinationCoords)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleGetDirections = useCallback(async (preOrigin, preDest) => {
    setLoading(true)
    setError('')
    setHasRoute(false)

    try {
      let origin = preOrigin
      let dest = preDest

      if (!origin) {
        origin = await geocode(originQuery)
        if (!origin) throw new Error(mapSectionContent.geocodeErrorText)
        setOriginCoords(origin)
      }

      if (!dest) {
        dest = await geocode(destQuery)
        if (!dest) throw new Error(mapSectionContent.geocodeErrorText)
        setDestCoords(dest)
      }

      const { polyline, steps: routeSteps, distance, duration } = await fetchRoute(origin, dest)

      setRoutePolyline(polyline)
      setSteps(routeSteps)
      setSummary({ distance, duration })
      setHasRoute(true)
    } catch (err) {
      setError(err.message || mapSectionContent.errorText)
    } finally {
      setLoading(false)
    }
  }, [originQuery, destQuery])

  const handleSubmit = (e) => {
    e.preventDefault()
    handleGetDirections(null, null)
  }

  const handleSwap = () => {
    setOriginQuery(destQuery)
    setDestQuery(originQuery)
    setOriginCoords(destCoords)
    setDestCoords(originCoords)
    setRoutePolyline([])
    setSteps([])
    setSummary(null)
    setHasRoute(false)
  }

  const handleClear = () => {
    setOriginQuery('')
    setDestQuery('')
    setOriginCoords(null)
    setDestCoords(null)
    setRoutePolyline([])
    setSteps([])
    setSummary(null)
    setHasRoute(false)
    setError('')
  }

  return (
    <section className="bg-[var(--bg)] section-gap" id="map">
      <div className="container-shell">
        {/* Section Header */}
        <SectionHeading
          eyebrow={mapSectionContent.eyebrow}
          title={mapSectionContent.title}
          description={mapSectionContent.description}
          align="center"
        />

        {/* Search Card */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel mt-10 rounded-2xl p-4 sm:p-6"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Origin */}
            <div className="relative flex-1">
              <FiNavigation
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500"
                aria-hidden="true"
              />
              <input
                type="text"
                value={originQuery}
                onChange={(e) => setOriginQuery(e.target.value)}
                placeholder={mapSectionContent.originPlaceholder}
                aria-label="Origin location"
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] py-3 pl-9 pr-4 text-sm text-[var(--text)] placeholder-[var(--text-soft)] outline-none transition focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                required
              />
            </div>

            {/* Swap Button */}
            <button
              type="button"
              onClick={handleSwap}
              title="Swap locations"
              aria-label="Swap origin and destination"
              className="hidden shrink-0 sm:flex items-center justify-center h-10 w-10 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--text-soft)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <FiArrowRight size={16} />
            </button>

            {/* Destination */}
            <div className="relative flex-1">
              <FiMapPin
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500"
                aria-hidden="true"
              />
              <input
                type="text"
                value={destQuery}
                onChange={(e) => setDestQuery(e.target.value)}
                placeholder={mapSectionContent.destinationPlaceholder}
                aria-label="Destination location"
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] py-3 pl-9 pr-4 text-sm text-[var(--text)] placeholder-[var(--text-soft)] outline-none transition focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <Button
                type="submit"
                variant="primary"
                colorScheme="default"
                size="md"
                disabled={loading}
                className="gap-2"
              >
                {loading ? (
                  <FiLoader className="animate-spin" size={15} />
                ) : (
                  <FiSearch size={15} />
                )}
                {mapSectionContent.getDirectionsLabel}
              </Button>

              {(originQuery || destQuery) && (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear inputs"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--line)] text-[var(--text-soft)] transition hover:border-red-400 hover:text-red-400"
                >
                  <FiX size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400"
                role="alert"
              >
                <FiAlertCircle size={15} /> {error}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>

        {/* Map + Directions Layout */}
        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_360px]">
          {/* ── Map ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel overflow-hidden rounded-2xl"
            style={{ height: 520 }}
          >
            <MapContainer
              center={[mapDefaults.center.lat, mapDefaults.center.lng]}
              zoom={mapDefaults.zoom}
              style={{ width: '100%', height: '100%' }}
              zoomControl={true}
              scrollWheelZoom={true}
              aria-label="Interactive route map"
            >
              {/* Dark tile layer — CartoDB Dark Matter */}
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
                subdomains="abcd"
                maxZoom={20}
              />

              {/* Auto-fit bounds when route is ready */}
              <RecenterMap origin={originCoords} destination={hasRoute ? destCoords : null} />

              {/* Route polyline */}
              {routePolyline.length > 0 && (
                <Polyline
                  positions={routePolyline}
                  pathOptions={{ color: '#22d3ee', weight: 5, opacity: 0.9, lineCap: 'round', lineJoin: 'round' }}
                />
              )}

              {/* Origin marker */}
              {originCoords && (
                <Marker position={[originCoords.lat, originCoords.lng]} icon={ORIGIN_ICON}>
                  <Popup className="map-popup">
                    <span className="font-semibold text-green-600">Start</span>
                    <br />
                    <span className="text-xs text-slate-500">{originQuery}</span>
                  </Popup>
                </Marker>
              )}

              {/* Destination marker */}
              {destCoords && hasRoute && (
                <Marker position={[destCoords.lat, destCoords.lng]} icon={DESTINATION_ICON}>
                  <Popup>
                    <span className="font-semibold text-red-600">Destination</span>
                    <br />
                    <span className="text-xs text-slate-500">{destQuery}</span>
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </motion.div>

          {/* ── Directions Panel ── */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel flex flex-col rounded-2xl overflow-hidden"
            style={{ maxHeight: 520 }}
            aria-label="Turn-by-turn directions"
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
              <h3 className="text-sm font-semibold text-[var(--text)]">
                {mapSectionContent.directionsHeading}
              </h3>
              {summary && (
                <div className="flex items-center gap-3 text-xs text-[var(--text-soft)]">
                  <span className="flex items-center gap-1">
                    <FiTrendingUp size={12} />
                    {formatDistance(summary.distance)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock size={12} />
                    {formatDuration(summary.duration)}
                  </span>
                </div>
              )}
            </div>

            {/* Steps */}
            <div className="flex-1 overflow-y-auto px-4 py-3" style={{ scrollbarWidth: 'thin' }}>
              {loading && (
                <div className="flex flex-col items-center justify-center gap-3 py-16">
                  <FiLoader className="animate-spin text-[var(--accent)]" size={28} />
                  <p className="text-sm text-[var(--text-soft)]">{mapSectionContent.loadingText}</p>
                </div>
              )}

              {!loading && !hasRoute && !error && (
                <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                  <FiArrowRightCircle size={32} className="text-[var(--line-strong)]" />
                  <p className="text-sm text-[var(--text-soft)]">{mapSectionContent.noRouteText}</p>
                </div>
              )}

              {!loading && hasRoute && steps.length > 0 && (
                <ol className="space-y-1">
                  {steps.map((step, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-[var(--surface-strong)]"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--surface-strong)]">
                        {getStepIcon(step)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium leading-snug text-[var(--text)]">
                          {buildInstruction(step)}
                        </p>
                        {step.distance > 0 && (
                          <p className="mt-0.5 text-xs text-[var(--text-soft)]">
                            {formatDistance(step.distance)}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
