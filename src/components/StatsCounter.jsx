import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function StatsCounter({ value, suffix, label, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) {
      return undefined
    }

    const duration = 1200
    const stepTime = 24
    const steps = duration / stepTime
    const increment = value / steps
    let current = 0

    const timer = window.setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        window.clearInterval(timer)
        return
      }
      setCount(Math.round(current * 10) / 10)
    }, stepTime)

    return () => window.clearInterval(timer)
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="interactive-card glass-panel card-shadow overflow-hidden rounded-[1.5rem] text-center"
    >
      <div className="h-1 w-full bg-[var(--accent)]" aria-hidden="true" />
      <div className="p-6">
        <p className="text-4xl font-semibold tracking-[-0.05em] text-[var(--text)] sm:text-5xl">
          {count}{suffix}
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">{label}</p>
      </div>
    </motion.div>
  )
}

export default StatsCounter