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
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl',
        className,
      )}
    >
      {eyebrow && (
        <span className={cn(
          'mb-4 inline-flex items-center rounded-full border border-[var(--line)] bg-[var(--accent-soft)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]',
          eyebrowColors[eyebrowColor],
        )}>
          {eyebrow}
        </span>
      )}
      <h2 className="section-title mt-4">{title}</h2>
      {description && <p className="section-copy mt-4">{description}</p>}
    </motion.div>
  )
}

export default SectionHeading
