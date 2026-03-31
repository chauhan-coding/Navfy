import { motion } from 'framer-motion'
import { FiCheckCircle } from 'react-icons/fi'

function SolutionCard({ title, description, items, image }) {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="glass-panel grid gap-8 rounded-[2rem] p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8"
    >
      <div>
        <h3 className="max-w-xl text-2xl font-semibold tracking-[-0.03em] text-[var(--text)] sm:text-3xl">
          {title}
        </h3>
        <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-soft)] sm:text-base">
          {description}
        </p>
        <div className="mt-6 grid gap-3">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)]/70 px-4 py-3"
            >
              <FiCheckCircle className="text-[var(--accent)]" />
              <span className="text-sm text-[var(--text)]">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface-strong)] p-4">
        <img
          src={image}
          alt="Platform illustration"
          loading="lazy"
          className="h-full w-full rounded-[1.25rem] object-cover"
        />
      </div>
    </motion.div>
  )
}

export default SolutionCard