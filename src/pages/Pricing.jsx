import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCheck, FiZap, FiBriefcase, FiShield } from 'react-icons/fi'
import Navbar from '../components/common/Navbar'
import AppFooter from '../components/common/AppFooter'
import SectionHeading from '../components/common/SectionHeading'
import { brand, footerBrand, footerColumns } from '../data/siteContent'
import { featureNavGroups } from '../data/featurePagesContent'

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    icon: FiZap,
    tagline: 'For early product evaluation',
    monthly: 0,
    annual: 0,
    cta: 'Get started free',
    ctaHref: '/contact',
    highlight: false,
    badge: null,
    features: [
      '10,000 API calls / month',
      'Search & Geocoding API',
      'Basic map tiles',
      'Web JavaScript SDK',
      'Community support',
      'API Playground access',
      '1 demo workspace',
    ],
    excluded: [
      'Routes & Geofence APIs',
      'Mobile SDKs (iOS / Android)',
      'Webhooks & event streams',
      'Dashboard analytics',
      'Priority support',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    icon: FiBriefcase,
    tagline: 'Indicative plan for pilot teams',
    monthly: 3999,
    annual: 3199,
    cta: 'Start Growth plan',
    ctaHref: '/contact',
    highlight: true,
    badge: 'Most popular',
    features: [
      '2,000,000 API calls / month',
      'All APIs: Search, Routes, Geofence, Telemetry',
      'Map tiles + overlays',
      'Web, iOS & Android SDKs',
      'Webhooks & event streams',
      'Developer dashboard (roadmap)',
      '5 active projects',
      'Telemetry retention policy (in progress)',
      'Priority support target',
    ],
    excluded: [
      'Dedicated infrastructure',
      'SSO / SAML provisioning',
      'On-premise deployment',
      'Formal uptime SLA (coming soon)',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    icon: FiShield,
    tagline: 'Custom scope for future enterprise rollouts',
    monthly: null,
    annual: null,
    cta: 'Talk to sales',
    ctaHref: '/contact',
    highlight: false,
    badge: null,
    features: [
      'Custom API volume planning',
      'Custom project scoping',
      'Integration workshops',
      'Deployment options (discussion stage)',
      'Security and compliance planning',
      'Roadmap-aligned support model',
    ],
    excluded: [],
  },
]

const FAQ = [
  {
    q: 'What counts as an API call?',
    a: 'Each request to any Navfy endpoint (Search, Routes, Geocoding, Geofence, Map Tiles) counts as one API call. Webhook deliveries are not counted. Batch geocoding counts one call per address in the batch.',
  },
  {
    q: 'Can I upgrade or downgrade at any time?',
    a: 'Plan transitions are currently handled manually by our team while billing workflows are in development.',
  },
  {
    q: 'What happens if I exceed my monthly limit?',
    a: 'Usage limits in this demo are illustrative. Final enforcement and overage policy will be published before production launch.',
  },
  {
    q: 'How long will Starter pricing remain free?',
    a: 'Starter pricing is currently offered for early-stage testing. Future changes will be communicated transparently in advance.',
  },
  {
    q: 'Do you offer a discount for annual billing?',
    a: 'Growth plan annual billing saves approximately 20% compared to month-to-month. Enterprise contracts are individually priced — multi-year contracts attract further discounts.',
  },
  {
    q: 'Where is my data stored?',
    a: 'Data hosting model is being finalized. Contact us for the current deployment approach and planned compliance roadmap.',
  },
]

function PricingCard({ plan, isAnnual, index }) {
  const price = isAnnual ? plan.annual : plan.monthly
  const Icon = plan.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className={`relative flex flex-col rounded-[2rem] border p-8 ${
        plan.highlight
          ? 'border-[var(--accent)] bg-[var(--accent-soft)] shadow-lg shadow-[var(--glow)]'
          : 'border-[var(--line)] bg-[var(--surface)]'
      }`}
    >
      {plan.badge && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[var(--accent)] px-4 py-1 text-xs font-semibold text-white">
          {plan.badge}
        </span>
      )}

      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${plan.highlight ? 'bg-[var(--accent)] text-white' : 'bg-[var(--surface-strong)] text-[var(--accent)]'}`}>
        <Icon size={22} />
      </div>

      <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em]">{plan.name}</h3>
      <p className="mt-1 text-sm text-[var(--text-soft)]">{plan.tagline}</p>

      <div className="mt-6">
        {price === null ? (
          <span className="text-3xl font-semibold tracking-[-0.04em]">Custom</span>
        ) : price === 0 ? (
          <span className="text-3xl font-semibold tracking-[-0.04em]">Free</span>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-medium text-[var(--text-soft)]">₹</span>
            <span className="text-3xl font-semibold tracking-[-0.04em]">{price.toLocaleString('en-IN')}</span>
            <span className="text-sm text-[var(--text-soft)]">/month</span>
          </div>
        )}
        {isAnnual && plan.monthly > 0 && (
          <p className="mt-1 text-xs text-[var(--text-soft)]">
            Billed annually — save ₹{((plan.monthly - plan.annual) * 12).toLocaleString('en-IN')}/yr
          </p>
        )}
      </div>

      <Link
        to={plan.ctaHref}
        className={`mt-6 block rounded-full py-3 text-center text-sm font-semibold transition ${
          plan.highlight
            ? 'bg-[var(--accent)] text-white hover:opacity-90'
            : 'border border-[var(--line)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
        }`}
      >
        {plan.cta}
      </Link>

      <div className="mt-8 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-soft)]">Included</p>
        {plan.features.map((f) => (
          <div key={f} className="flex items-start gap-2.5">
            <FiCheck size={14} className="mt-0.5 shrink-0 text-[var(--accent)]" />
            <span className="text-sm text-[var(--text)]">{f}</span>
          </div>
        ))}
      </div>

      {plan.excluded.length > 0 && (
        <div className="mt-6 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-soft)]">Not included</p>
          {plan.excluded.map((f) => (
            <div key={f} className="flex items-start gap-2.5 opacity-40">
              <span className="mt-0.5 shrink-0 text-sm font-bold leading-none">–</span>
              <span className="text-sm text-[var(--text)]">{f}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen"
    >
      <Navbar
        variant="glass"
        logo={{ name: brand.name }}
        navItems={featureNavGroups.primary}
        activeLabel="Pricing"
        logoTo="/"
        cta={{ label: 'Talk to Sales', href: '/contact', type: 'router' }}
      />

      <main className="pb-20">
        {/* Hero */}
        <section className="px-4 pb-6 pt-14 sm:px-6 lg:px-8 lg:pt-18">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">Pricing</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Transparent pricing for an early-stage product.
            </h1>
            <p className="mt-6 text-base leading-8 text-[var(--text-soft)] sm:text-lg">
              These plans are directional and designed for pilot conversations. Final billing terms will be confirmed before production contracts.
            </p>

            {/* Billing toggle */}
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--surface)] p-1">
              <button
                onClick={() => setIsAnnual(false)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${!isAnnual ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-soft)] hover:text-[var(--text)]'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${isAnnual ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-soft)] hover:text-[var(--text)]'}`}
              >
                Annual
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${isAnnual ? 'bg-white/20 text-white' : 'bg-[var(--accent-soft)] text-[var(--accent)]'}`}>
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Plan cards */}
        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
            {PLANS.map((plan, i) => (
              <PricingCard key={plan.id} plan={plan} isAnnual={isAnnual} index={i} />
            ))}
          </div>
        </section>

        {/* Trust strip */}
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 md:grid-cols-3">
              {[
                { stat: 'Pilot', label: 'Pricing currently optimized for early adopters' },
                { stat: 'Clear', label: 'No hidden terms in this demo presentation' },
                { stat: 'Flexible', label: 'Commercial model adjusted with design partners' },
              ].map(({ stat, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-semibold text-[var(--accent)]">{stat}</div>
                  <div className="mt-2 text-sm text-[var(--text-soft)]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently asked questions"
              description="If you have a question not answered here, reach out at hello@navfy.com."
            />
            <div className="mt-10 divide-y divide-[var(--line)]">
              {FAQ.map((item, i) => (
                <div key={i} className="py-5">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="text-base font-semibold tracking-[-0.02em]">{item.q}</span>
                    <span className={`shrink-0 text-2xl font-light text-[var(--accent)] transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {openFaq === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 text-sm leading-7 text-[var(--text-soft)]"
                    >
                      {item.a}
                    </motion.p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-[var(--accent)] px-8 py-12 text-center text-white">
            <h2 className="text-3xl font-semibold tracking-[-0.04em]">Ready to start building?</h2>
            <p className="mt-4 text-base text-white/80">
              Start with the live demo today, then discuss a pilot plan tailored to your roadmap.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-[var(--accent)] transition hover:opacity-90"
              >
                Get your free API key
              </Link>
              <Link
                to="/apis"
                className="rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Try the API Playground
              </Link>
            </div>
          </div>
        </section>
      </main>

      <AppFooter
        variant="glass"
        brand={{
          name: footerBrand.name,
          heading: footerBrand.heading,
          description: footerBrand.description,
        }}
        socialLinks={[
          { icon: 'github', href: '#', label: 'GitHub' },
          { icon: 'linkedin', href: '#', label: 'LinkedIn' },
          { icon: 'x', href: '#', label: 'X' },
        ]}
        columns={footerColumns}
      />
    </motion.div>
  )
}

export default memo(Pricing)
