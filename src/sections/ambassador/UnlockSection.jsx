import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import explorerBadge from '../../assets/badge-explorer.svg'
import navigatorBadge from '../../assets/badge-navigator.svg'
import pathfinderBadge from '../../assets/badge-pathfinder.svg'

const badgeImageMap = {
  explorer: explorerBadge,
  navigator: navigatorBadge,
  pathfinder: pathfinderBadge,
}

function UnlockCard({ card }) {
  return (
    <article className="h-full rounded-3xl bg-white p-7 shadow-xl ring-1 ring-slate-100">
      <div className="flex items-start gap-5">
        <img
          src={badgeImageMap[card.badge]}
          alt={`${card.name} badge`}
          loading="lazy"
          className="h-20 w-20 shrink-0 drop-shadow-md"
        />
        <div>
          <span
            className="rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white"
            style={{ background: card.color }}
          >
            {card.level}
          </span>
          <h3
            className="mt-2 text-xl font-extrabold text-[#0a1929]"
            style={{ fontFamily: 'Poppins, Sora, sans-serif' }}
          >
            {card.name}
          </h3>
        </div>
      </div>
      <ul className="mt-6 space-y-3">
        {card.perks.map((perk) => (
          <li key={perk} className="flex items-center gap-3">
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
              style={{ background: card.color }}
            >
              <FiCheck size={11} />
            </span>
            <span className="text-sm text-slate-600">{perk}</span>
          </li>
        ))}
      </ul>
      <a
        href="#interest-form"
        className="mt-7 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition hover:shadow-md"
        style={{ borderColor: card.color, color: card.color }}
      >
        {card.cta}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </article>
  )
}

function UnlockSection({ data }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const total = data.cards.length
  const prev = () => setActiveIndex((activeIndex - 1 + total) % total)
  const next = () => setActiveIndex((activeIndex + 1) % total)

  return (
    <section className="py-20" style={{ background: '#f0fdf9' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <h2
            className="text-3xl font-extrabold tracking-tight text-[#0a1929] sm:text-4xl"
            style={{ fontFamily: 'Poppins, Sora, sans-serif' }}
          >
            {data.title}
            <span className="ml-3 inline-block text-[#f59e0b]">★</span>
          </h2>
        </motion.div>

        {/* Desktop: show two side-by-side */}
        <div className="mt-10 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {data.cards.map((card) => (
            <UnlockCard key={card.name} card={card} />
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="mt-10 md:hidden">
          <div className="relative min-h-[380px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <UnlockCard card={data.cards[activeIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Pagination */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-[#00c2b2] hover:text-[#00c2b2]"
              aria-label="Previous card"
            >
              <FiChevronLeft />
            </button>
            <div className="flex gap-2">
              {data.cards.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: i === activeIndex ? '24px' : '8px',
                    background: i === activeIndex ? '#0d9488' : '#cbd5e1',
                  }}
                  aria-label={`Go to card ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-[#00c2b2] hover:text-[#00c2b2]"
              aria-label="Next card"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UnlockSection
