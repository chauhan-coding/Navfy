import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiPlayCircle } from 'react-icons/fi'

function HeroSection({ content }) {
  return (
    <section id="hero" className="relative overflow-hidden pt-6 sm:pt-8">
      <div className="container-shell">
        <div className="hero-gradient card-shadow relative overflow-hidden rounded-[2.25rem] px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.28),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(45,212,191,0.22),transparent_28%)]" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="max-w-2xl"
            >
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/90">
                {content.eyebrow}
              </p>
              <h1 className="font-display text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl lg:text-7xl">
                {content.title}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-200 sm:text-lg">
                {content.description}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:translate-y-[-1px]"
                >
                  {content.primaryCta}
                  <FiArrowRight />
                </Link>
                <Link
                  to="/apis"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  <FiPlayCircle />
                  {content.secondaryCta}
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {content.highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-medium tracking-[0.18em] text-cyan-50 uppercase"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
              className="glass-panel rounded-[2rem] border-white/10 bg-white/10 p-4 sm:p-5"
            >
              <img
                src={content.image}
                alt="Illustration showing platform dashboards and map workflows"
                className="w-full rounded-[1.5rem] object-cover"
                fetchPriority="high"
              />
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
