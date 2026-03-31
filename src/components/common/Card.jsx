import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import { cardVariants } from '../../config/theme'

/**
 * Generic, config-driven Card component.
 *
 * @prop {'glass'|'dark'|'ambassador'|'stat'} [variant='glass']
 * @prop {number} [index=0]     - Stagger delay index for scroll animations
 * @prop {boolean} [hover=true] - Enables hover lift animation
 * @prop {string} [className]   - Additional classes
 */
export default function Card({ children, variant = 'glass', index = 0, hover = true, className, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={hover ? { y: -4 } : undefined}
      className={cn(
        'group',
        cardVariants[variant] ?? cardVariants.glass,
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
