import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiMessageSquare } from 'react-icons/fi'

const AUTO_ADVANCE_MS = 5000

function TestimonialCarousel({ items }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progressKey, setProgressKey] = useState(0)
  const timerRef = useRef(null)

  function go(index) {
    setActiveIndex(index)
    setProgressKey((k) => k + 1)
  }

  useEffect(() => {
    if (paused) return undefined
    timerRef.current = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % items.length)
      setProgressKey((k) => k + 1)
    }, AUTO_ADVANCE_MS)
    return () => window.clearInterval(timerRef.current)
  }, [paused, items.length])

  const item = items[activeIndex]

  return (
    <div
      className="glass-panel overflow-hidden rounded-[var(--radius-section)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between border-b border-[var(--line)] px-6 py-4 sm:px-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
            <FiMessageSquare size={14} />
          </span>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            Customer stories
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go((activeIndex - 1 + items.length) % items.length)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <FiChevronLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go((activeIndex + 1) % items.length)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <FiChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="h-0.5 bg-[var(--line)]" aria-hidden="true">
        {!paused && (
          <div
            key={progressKey}
            className="progress-bar h-full rounded-full bg-[var(--accent)]"
            style={{ animationDuration: `${AUTO_ADVANCE_MS}ms` }}
          />
        )}
      </div>

      <div
        className="relative px-6 py-8 sm:px-8"
        style={{ minHeight: '240px' }}
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="wait">
          <motion.figure
            key={item.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-6 inset-y-8 flex flex-col sm:inset-x-8"
          >
            <blockquote className="flex-1 text-xl font-medium leading-[1.75] tracking-[-0.02em] text-[var(--text)] sm:text-2xl lg:text-3xl">
              {item.quote}
            </blockquote>
            <figcaption className="mt-6 border-t border-[var(--line)] pt-5">
              <p className="text-base font-semibold text-[var(--text)]">{item.name}</p>
              <p className="mt-0.5 text-sm text-[var(--text-soft)]">{item.role}</p>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-2 border-t border-[var(--line)] px-6 py-4">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to testimonial ${i + 1}`}
            aria-current={i === activeIndex ? 'true' : undefined}
            onClick={() => go(i)}
            className={[
              'rounded-full transition-all duration-300',
              i === activeIndex
                ? 'h-2 w-6 bg-[var(--accent)]'
                : 'h-2 w-2 bg-[var(--line-strong)] hover:bg-[var(--accent)]',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  )
}

export default TestimonialCarousel
