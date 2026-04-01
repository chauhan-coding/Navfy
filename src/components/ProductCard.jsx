import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiGrid, FiMapPin, FiRadio, FiTrendingUp } from 'react-icons/fi'

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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="interactive-card glass-panel card-shadow group flex flex-col rounded-[1.5rem] p-6"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] transition-colors duration-200 group-hover:bg-[var(--accent)] group-hover:text-white">
        <Icon size={20} />
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-[var(--text)]">{product.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-[1.8] text-[var(--text-soft)]">{product.description}</p>
      <div className="mt-6 border-t border-[var(--line)] pt-5">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] transition hover:gap-2.5"
        >
          Explore
          <FiArrowRight size={13} />
        </Link>
      </div>
    </motion.article>
  )
}

export default ProductCard