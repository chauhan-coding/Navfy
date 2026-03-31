import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

/**
 * Reusable section header with eyebrow label, title, and description.
 * Animates into view on scroll.
 *
 * @prop {'left'|'center'} [align='left']
 * @prop {'default'|'cyan'|'teal'|'white'} [eyebrowColor='default']
 */
function SectionHeading({ eyebrow, title, description, align = 'left', eyebrowColor = 'default', className }) {
  const eyebrowColors = {
    default: 'text-[var(--accent)]',
    cyan: 'text-cyan-400',
    teal: 'text-[#00c2b2]',
    white: 'text-white/80',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl',
        className,
      )}
    >
      {eyebrow && (
        <p className={cn('mb-4 text-sm font-semibold uppercase tracking-[0.24em]', eyebrowColors[eyebrowColor])}>
          {eyebrow}
        </p>
      )}
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-copy mt-5">{description}</p>}
    </motion.div>
  )
}

export default SectionHeading
