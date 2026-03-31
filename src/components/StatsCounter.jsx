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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="glass-panel rounded-3xl p-6 text-center"
    >
      <p className="text-4xl font-semibold tracking-[-0.04em] text-[var(--text)] sm:text-5xl">
        {count}{suffix}
      </p>
      <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[var(--text-soft)]">{label}</p>
    </motion.div>
  )
}

export default StatsCounter