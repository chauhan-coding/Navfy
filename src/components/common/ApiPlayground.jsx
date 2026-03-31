import { memo, useState, useCallback } from 'react'
import { FiPlay, FiCopy, FiCheck } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Mock API responses ───────────────────────────────────────────────────────

const ENDPOINTS = [
  {
    id: 'search',
    method: 'GET',
    label: 'Search API',
    path: '/v1/search',
    description: 'Search for places, addresses, and POIs across India by textual query.',
    params: [
      { name: 'q', label: 'Query', placeholder: 'e.g. Connaught Place, New Delhi', defaultValue: 'Connaught Place' },
      { name: 'near', label: 'Near (lat,lng)', placeholder: 'e.g. 28.61,77.20', defaultValue: '28.61,77.20' },
      { name: 'limit', label: 'Result limit', placeholder: '5', defaultValue: '5' },
    ],
    buildRequest: (params) =>
      `GET /v1/search?q=${encodeURIComponent(params.q || 'Connaught Place')}&near=${params.near || '28.61,77.20'}&limit=${params.limit || 5}\nAuthorization: Bearer YOUR_API_KEY`,
    response: (params) => ({
      results: [
        {
          id: 'poi_9471823',
          name: 'Connaught Place',
          type: 'neighbourhood',
          address: 'Connaught Place, New Delhi, Delhi 110001',
          lat: 28.6315,
          lng: 77.2167,
          relevance: 0.99,
          distance_m: 0,
        },
        {
          id: 'poi_9471824',
          name: 'CP Metro Station',
          type: 'metro_station',
          address: 'Rajiv Chowk, Connaught Place, New Delhi',
          lat: 28.6328,
          lng: 77.2186,
          relevance: 0.87,
          distance_m: 186,
        },
        {
          id: 'poi_9471825',
          name: 'Palika Bazaar',
          type: 'shopping_complex',
          address: 'Connaught Place Inner Circle, New Delhi',
          lat: 28.6307,
          lng: 77.2172,
          relevance: 0.81,
          distance_m: 94,
        },
      ],
      meta: { total: 142, returned: parseInt(params.limit || 5), latency_ms: 38, query_id: 'q_' + Math.random().toString(36).slice(2, 10) },
    }),
  },
  {
    id: 'routes',
    method: 'POST',
    label: 'Routes API',
    path: '/v1/route',
    description: 'Calculate optimised route between origin and destination with traffic and ETA.',
    params: [
      { name: 'origin', label: 'Origin (lat,lng)', placeholder: 'e.g. 28.6315,77.2167', defaultValue: '28.6315,77.2167' },
      { name: 'destination', label: 'Destination (lat,lng)', placeholder: 'e.g. 28.5244,77.1855', defaultValue: '28.5244,77.1855' },
      { name: 'mode', label: 'Travel mode', placeholder: 'driving|walking|cycling', defaultValue: 'driving' },
    ],
    buildRequest: (params) =>
      `POST /v1/route\nAuthorization: Bearer YOUR_API_KEY\nContent-Type: application/json\n\n{\n  "origin": "${params.origin || '28.6315,77.2167'}",\n  "destination": "${params.destination || '28.5244,77.1855'}",\n  "mode": "${params.mode || 'driving'}",\n  "traffic": true\n}`,
    response: () => ({
      route: {
        distance_m: 14800,
        duration_s: 2340,
        eta_traffic_s: 2820,
        polyline: 'encoded_polyline_string_here',
        legs: [
          { instruction: 'Head south on Janpath', distance_m: 1200, duration_s: 180 },
          { instruction: 'Turn right onto Rajpath', distance_m: 3400, duration_s: 420 },
          { instruction: 'Continue onto NH-48', distance_m: 7800, duration_s: 1100 },
          { instruction: 'Turn left onto Shivaji Marg', distance_m: 2400, duration_s: 640 },
        ],
        traffic_delay_s: 480,
        toll_cost_inr: 0,
      },
      meta: { latency_ms: 42, request_id: 'rte_' + Math.random().toString(36).slice(2, 10) },
    }),
  },
  {
    id: 'geocode',
    method: 'GET',
    label: 'Geocode API',
    path: '/v1/geocode',
    description: 'Convert a human-readable Indian address into precise latitude/longitude coordinates.',
    params: [
      { name: 'address', label: 'Address', placeholder: 'e.g. 221B Baker St, Vadodara', defaultValue: '27 Brigade Road, Bengaluru' },
    ],
    buildRequest: (params) =>
      `GET /v1/geocode?address=${encodeURIComponent(params.address || '27 Brigade Road, Bengaluru')}\nAuthorization: Bearer YOUR_API_KEY`,
    response: (params) => ({
      result: {
        formatted_address: (params.address || '27 Brigade Road, Bengaluru') + ', Karnataka 560025',
        lat: 12.9716,
        lng: 77.5946,
        confidence: 0.94,
        components: {
          house_number: '27',
          road: 'Brigade Road',
          neighbourhood: 'Shivajinagar',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560025',
          country: 'India',
        },
      },
      meta: { latency_ms: 29, request_id: 'geo_' + Math.random().toString(36).slice(2, 10) },
    }),
  },
  {
    id: 'geofence',
    method: 'POST',
    label: 'Geofence API',
    path: '/v1/geofences',
    description: 'Create a geofence zone and receive webhooks when tracked assets enter or exit it.',
    params: [
      { name: 'name', label: 'Zone name', placeholder: 'e.g. Warehouse Zone A', defaultValue: 'Warehouse Zone A' },
      { name: 'lat', label: 'Center latitude', placeholder: '28.6315', defaultValue: '28.6315' },
      { name: 'lng', label: 'Center longitude', placeholder: '77.2167', defaultValue: '77.2167' },
      { name: 'radius_m', label: 'Radius (metres)', placeholder: '500', defaultValue: '500' },
    ],
    buildRequest: (params) =>
      `POST /v1/geofences\nAuthorization: Bearer YOUR_API_KEY\nContent-Type: application/json\n\n{\n  "name": "${params.name || 'Warehouse Zone A'}",\n  "center": { "lat": ${params.lat || 28.6315}, "lng": ${params.lng || 77.2167} },\n  "radius_m": ${params.radius_m || 500},\n  "webhook_url": "https://api.yourapp.com/hooks/navfy",\n  "events": ["enter", "exit", "dwell"],\n  "dwell_threshold_s": 300\n}`,
    response: (params) => ({
      geofence: {
        id: 'gf_' + Math.random().toString(36).slice(2, 10),
        name: params.name || 'Warehouse Zone A',
        status: 'active',
        center: { lat: parseFloat(params.lat || 28.6315), lng: parseFloat(params.lng || 77.2167) },
        radius_m: parseInt(params.radius_m || 500),
        webhook_url: 'https://api.yourapp.com/hooks/navfy',
        events: ['enter', 'exit', 'dwell'],
        created_at: new Date().toISOString(),
        asset_count: 0,
      },
      meta: { latency_ms: 31, request_id: 'gfr_' + Math.random().toString(36).slice(2, 10) },
    }),
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

function ApiPlayground() {
  const [activeId, setActiveId] = useState(ENDPOINTS[0].id)
  const [params, setParams] = useState({})
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const active = ENDPOINTS.find((e) => e.id === activeId)

  const handleParamChange = useCallback((name, value) => {
    setParams((prev) => ({ ...prev, [name]: value }))
  }, [])

  const mergedParams = active.params.reduce(
    (acc, p) => ({ ...acc, [p.name]: params[p.name] ?? p.defaultValue }),
    {},
  )

  const requestPreview = active.buildRequest(mergedParams)

  async function runRequest() {
    setLoading(true)
    setResponse(null)
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 400))
    setResponse(active.response(mergedParams))
    setLoading(false)
  }

  function copyResponse() {
    if (!response) return
    navigator.clipboard.writeText(JSON.stringify(response, null, 2)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleTabChange(id) {
    setActiveId(id)
    setParams({})
    setResponse(null)
  }

  return (
    <div id="playground" className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] overflow-hidden">
      {/* Tab bar */}
      <div className="flex overflow-x-auto border-b border-[var(--line)] bg-[var(--surface-strong)]">
        {ENDPOINTS.map((ep) => (
          <button
            key={ep.id}
            onClick={() => handleTabChange(ep.id)}
            className={`flex items-center gap-2 whitespace-nowrap px-5 py-3.5 text-sm font-semibold transition ${
              activeId === ep.id
                ? 'border-b-2 border-[var(--accent)] text-[var(--accent)]'
                : 'text-[var(--text-soft)] hover:text-[var(--text)]'
            }`}
          >
            <span
              className={`hidden rounded px-1.5 py-0.5 text-[10px] font-bold sm:inline ${
                ep.method === 'GET'
                  ? 'bg-emerald-500/15 text-emerald-500'
                  : 'bg-blue-500/15 text-blue-500'
              }`}
            >
              {ep.method}
            </span>
            {ep.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-[1fr_1fr]">
        {/* Left panel — params + request preview */}
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-soft)]">Endpoint</p>
            <p className="mt-1 font-mono text-sm text-[var(--text)]">
              <span className={`mr-2 rounded px-1.5 py-0.5 text-xs font-bold ${active.method === 'GET' ? 'bg-emerald-500/15 text-emerald-500' : 'bg-blue-500/15 text-blue-500'}`}>
                {active.method}
              </span>
              {active.path}
            </p>
            <p className="mt-2 text-sm text-[var(--text-soft)]">{active.description}</p>
          </div>

          {/* Parameters */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-soft)]">Parameters</p>
            {active.params.map((param) => (
              <div key={param.name}>
                <label className="mb-1 block text-xs font-semibold text-[var(--text)]">{param.label}</label>
                <input
                  type="text"
                  value={params[param.name] ?? param.defaultValue}
                  onChange={(e) => handleParamChange(param.name, e.target.value)}
                  placeholder={param.placeholder}
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2.5 font-mono text-xs text-[var(--text)] outline-none transition placeholder:text-[var(--text-soft)] focus:border-[var(--accent)]"
                />
              </div>
            ))}
          </div>

          {/* Request preview */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-soft)]">Request preview</p>
            <pre className="overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--bg)] p-4 font-mono text-xs leading-6 text-[var(--text)]">
              {requestPreview}
            </pre>
          </div>

          <button
            onClick={runRequest}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiPlay size={14} />
            {loading ? 'Running request…' : 'Run request'}
          </button>
        </div>

        {/* Right panel — response */}
        <div className="flex flex-col">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-soft)]">Response</p>
            {response && (
              <button
                onClick={copyResponse}
                className="flex items-center gap-1.5 rounded-lg border border-[var(--line)] px-3 py-1.5 text-xs font-semibold text-[var(--text-soft)] transition hover:text-[var(--text)]"
              >
                {copied ? <FiCheck size={12} className="text-emerald-500" /> : <FiCopy size={12} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>

          <div className="relative min-h-[320px] flex-1 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg)]">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="space-y-2 text-center">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[var(--line)] border-t-[var(--accent)]" />
                    <p className="text-xs text-[var(--text-soft)]">Sending request…</p>
                  </div>
                </motion.div>
              )}

              {!loading && !response && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center text-center"
                >
                  <div>
                    <p className="text-2xl">↑</p>
                    <p className="mt-2 text-sm text-[var(--text-soft)]">Hit Run to see the API response</p>
                  </div>
                </motion.div>
              )}

              {!loading && response && (
                <motion.pre
                  key="response"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="h-full overflow-auto p-4 font-mono text-xs leading-6 text-[var(--text)]"
                >
                  <ResponseHighlight json={response} />
                </motion.pre>
              )}
            </AnimatePresence>
          </div>

          {response && (
            <p className="mt-2 text-right text-xs text-[var(--text-soft)]">
              ✓ {response.meta?.latency_ms}ms &middot; Mock response — sign up for live data
            </p>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-[var(--line)] bg-[var(--surface-strong)] px-6 py-4">
        <p className="text-sm text-[var(--text-soft)]">
          This playground uses mock responses.{' '}
          <a href="/contact" className="font-semibold text-[var(--accent)] hover:underline">
            Get a free API key
          </a>{' '}
          to fire live requests against the Navfy production API.
        </p>
      </div>
    </div>
  )
}

// ─── Simple token-coloured JSON renderer ─────────────────────────────────────

function ResponseHighlight({ json }) {
  const text = JSON.stringify(json, null, 2)

  const html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, (match) => {
      if (/^"/.test(match)) {
        if (/:$/.test(match)) return `<span style="color:var(--accent)">${match}</span>`
        return `<span style="color:#22c55e">${match}</span>`
      }
      if (/true|false/.test(match)) return `<span style="color:#f59e0b">${match}</span>`
      if (/null/.test(match)) return `<span style="color:#94a3b8">${match}</span>`
      return `<span style="color:#60a5fa">${match}</span>`
    })

  return <code dangerouslySetInnerHTML={{ __html: html }} />
}

export default memo(ApiPlayground)
