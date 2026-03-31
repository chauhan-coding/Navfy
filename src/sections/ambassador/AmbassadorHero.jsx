import { motion } from 'framer-motion'
import heroChars from '../../assets/amb-hero-chars.svg'

function AmbassadorHero({ data }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a1929 0%, #0d3d5c 50%, #0f7166 100%)',
        minHeight: '420px',
      }}
    >
      {/* Decorative dots grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Teal glow blob */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[340px] w-[340px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #00c2b2, transparent 70%)' }}
      />

      {/* Subtle corner triangles (decorative) */}
      <div className="pointer-events-none absolute bottom-6 left-6 h-3 w-3 rotate-45 border border-[#00c2b2]/40" />
      <div className="pointer-events-none absolute right-8 top-10 h-2.5 w-2.5 rotate-12 border border-[#00c2b2]/30" />
      <div className="pointer-events-none absolute bottom-12 right-[40%] h-3 w-3 rotate-[30deg] border border-white/20" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#00c2b2]">
              {data.eyebrow}
            </p>
            <h1
              className="whitespace-pre-line text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ fontFamily: 'Poppins, Sora, sans-serif' }}
            >
              {data.title}
            </h1>
            <p className="mt-3 text-sm font-semibold text-[#00c2b2] sm:text-base">
              {data.tagline}
            </p>
            <a
              id="interest-form"
              href="#what-is"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#00c2b2]/60 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#00c2b2] hover:text-[#0a1929]"
            >
              {data.cta}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>

          {/* Characters illustration */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
            className="hidden w-[480px] lg:block xl:w-[540px]"
          >
            <img
              src={heroChars}
              alt="3D illustrated students representing Navfy ambassador program"
              className="h-auto w-full drop-shadow-2xl"
              loading="eager"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AmbassadorHero

