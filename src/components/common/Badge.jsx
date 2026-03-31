import { cn } from '../../utils/cn'

const colorMap = {
  default: 'text-[var(--accent)]',
  cyan: 'text-cyan-400',
  teal: 'text-[#00c2b2]',
  white: 'text-white/80',
  slate: 'text-slate-300',
}

/**
 * Eyebrow / label badge displayed above section headings.
 *
 * @prop {'default'|'cyan'|'teal'|'white'|'slate'} [colorScheme='default']
 */
export default function Badge({ children, colorScheme = 'default', className }) {
  return (
    <p
      className={cn(
        'mb-4 text-sm font-semibold uppercase tracking-[0.24em]',
        colorMap[colorScheme] ?? colorMap.default,
        className,
      )}
    >
      {children}
    </p>
  )
}
