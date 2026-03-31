import { motion } from 'framer-motion'
import { FiGrid, FiMapPin, FiRadio, FiTrendingUp } from 'react-icons/fi'

const icons = {
  grid: FiGrid,
  route: FiTrendingUp,
  signal: FiRadio,
  pin: FiMapPin,
}

function ProductCard({ product, index }) {
  const Icon = icons[product.icon] ?? FiGrid

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="glass-panel card-shadow group rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-[var(--line-strong)]"
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-xl text-[var(--accent)]">
        <Icon />
      </div>
      <h3 className="text-xl font-semibold text-[var(--text)]">{product.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">{product.description}</p>
    </motion.article>
  )
}

export default ProductCard