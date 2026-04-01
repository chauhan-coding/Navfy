import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiPlayCircle, FiMapPin, FiZap, FiShield } from 'react-icons/fi'

const TRUST_BADGES = [
  { icon: FiMapPin, label: 'Live map routing' },
  { icon: FiZap, label: 'Real-time APIs' },
  { icon: FiShield, label: 'Secure & reliable' },
]

function HeroSection({ content }) {
  return (
    <section id="hero" className="relative overflow-hidden pt-5 sm:pt-7">
      <div className="container-shell">
        <div className="hero-gradient card-shadow relative overflow-hidden rounded-[var(--radius-section)] px-5 py-8 text-white sm:px-8 sm:py-10 lg:px-12 lg:py-16">
          {/* Decorative radial overlays */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: [
                'radial-gradient(ellipse 55% 45% at 85% 15%, rgba(103,232,249,0.22), transparent)',
                'radial-gradient(ellipse 40% 35% at 10% 90%, rgba(45,212,191,0.18), transparent)',
              ].join(','),
            }}
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100 backdrop-blur-sm">
                {content.eyebrow}
              </span>
              <h1 className="font-display text-balance text-4xl font-semibold leading-[1.12] tracking-[-0.05em] sm:text-5xl lg:text-6xl xl:text-7xl">
                {content.title}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-[1.8] text-slate-200/90 sm:text-lg">
                {content.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-900 shadow-md transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {content.primaryCta}
                  <FiArrowRight size={15} />
                </Link>
                <Link
                  to="/apis"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition duration-200 hover:bg-white/18"
                >
                  <FiPlayCircle size={15} />
                  {content.secondaryCta}
                </Link>
              </div>

              {/* Highlight chips */}
              <div className="mt-8 flex flex-wrap gap-2.5">
                {content.highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-medium tracking-[0.14em] text-cyan-100/90 uppercase"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Trust badges */}
              <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-white/10 pt-8">
                {TRUST_BADGES.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-xs font-medium text-slate-300/80">
                    <Icon size={13} className="text-cyan-300" />
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: floating visual panel */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
              style={{ animation: 'floatY 6s ease-in-out infinite' }}
              className="relative rounded-[var(--radius-card)] border border-white/12 bg-white/8 p-4 backdrop-blur-md sm:p-5"
            >
              <img
                src={content.image}
                alt="Platform dashboards and map workflows"
                className="w-full rounded-xl object-cover"
                fetchPriority="high"
              />
              {/* Floating stat cards */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-sm">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-300/70">Coverage</p>
                  <p className="mt-1 text-xl font-semibold">98.4%</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-sm">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-300/70">Latency</p>
                  <p className="mt-1 text-xl font-semibold">&lt; 80 ms</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

HeroSection.propTypes = {
  content: PropTypes.shape({
    eyebrow: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    primaryCta: PropTypes.string.isRequired,
    secondaryCta: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    highlights: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
}

export default HeroSection
