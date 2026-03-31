import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

function TestimonialCarousel({ items }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length)
    }, 4200)

    return () => window.clearInterval(timer)
  }, [items.length])

  const item = items[activeIndex]

  return (
    <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
          Customer stories
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => setActiveIndex((activeIndex - 1 + items.length) % items.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] transition hover:border-[var(--line-strong)]"
          >
            <FiChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => setActiveIndex((activeIndex + 1) % items.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] transition hover:border-[var(--line-strong)]"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      <div className="relative mt-8 min-h-[220px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.figure
            key={item.name}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0 flex flex-col justify-between"
          >
            <blockquote className="max-w-3xl text-2xl font-medium leading-10 tracking-[-0.03em] text-[var(--text)] sm:text-3xl">
              “{item.quote}”
            </blockquote>
            <figcaption className="mt-8 border-t border-[var(--line)] pt-5">
              <div className="text-lg font-semibold text-[var(--text)]">{item.name}</div>
              <div className="mt-1 text-sm text-[var(--text-soft)]">{item.role}</div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default TestimonialCarousel