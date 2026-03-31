import { memo } from 'react'
import { Link } from 'react-router-dom'
import { FiGithub, FiLinkedin, FiX, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { cn } from '../../utils/cn'
import { footerVariants } from '../../config/theme'

const SOCIAL_ICON_MAP = { github: FiGithub, linkedin: FiLinkedin, x: FiX }
const DEFAULT_SOCIAL_ICONS = [FiGithub, FiLinkedin, FiX]

/**
 * Universal, config-driven AppFooter.
 * Replaces FooterSection, AmbassadorFooter, and MaplsGadgetsFooter.
 *
 * @prop {'glass'|'dark'|'black'} [variant='glass']
 * @prop {'split'|'stacked'}      [layout]         - 'split' = brand+cols side by side (glass),
 *                                                   'stacked' = brand on top, cols below (dark/black)
 * @prop {BrandConfig}            [brand]
 * @prop {ContactConfig}          [contact]
 * @prop {Column[]}               [columns=[]]
 * @prop {NewsletterConfig}       [newsletter]
 * @prop {SocialLink[]}           [socialLinks=[]]
 * @prop {BottomConfig}           [bottom]
 *
 * Column: { title: string, links: ({ label: string, href: string } | string)[] }
 * SocialLink: { icon?: 'github'|'linkedin'|'x', href?: string, label?: string }
 */
function AppFooter({
  variant = 'glass',
  layout,
  brand,
  contact,
  columns = [],
  newsletter,
  socialLinks = [],
  bottom,
}) {
  const styles = footerVariants[variant] ?? footerVariants.glass
  const isDark = variant === 'dark'
  const isBlack = variant === 'black'

  // Auto-pick layout if not explicitly set
  const resolvedLayout = layout ?? (variant === 'glass' ? 'split' : 'stacked')
  const isSplit = resolvedLayout === 'split'

  const logoIconBg = isDark ? '#00b5a5' : isBlack ? '#22d3ee' : 'var(--accent)'
  const accentHover = isDark ? 'hover:text-[#00c2b2]' : isBlack ? 'hover:text-cyan-400' : 'hover:text-[var(--accent)]'

  // ─── Brand Block ─────────────────────────────────────────────────────────
  function BrandBlock() {
    if (!brand) return null

    return (
      <div>
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
            style={{ background: logoIconBg }}
            aria-hidden="true"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2 L16 16 L2 16 Z" fill="white" opacity="0.9" />
            </svg>
          </div>
          <span
            className={cn(
              'font-bold',
              isDark || isBlack
                ? 'text-white text-base'
                : 'text-sm uppercase tracking-[0.24em] text-[var(--accent)]',
            )}
          >
            {brand.name}
          </span>
        </div>

        {brand.tagline && (
          <p className={cn('mt-4 max-w-xs text-xs leading-7', styles.body)}>{brand.tagline}</p>
        )}
        {brand.heading && (
          <h2 className={cn('mt-4 max-w-lg text-3xl font-semibold tracking-[-0.04em]', styles.heading)}>
            {brand.heading}
          </h2>
        )}
        {brand.description && (
          <p className={cn('mt-4 max-w-xl text-sm leading-7', styles.body)}>{brand.description}</p>
        )}

        {contact && <ContactBlock />}

        {socialLinks.length > 0 && (
          <div className="mt-5 flex gap-3">
            {socialLinks.map((s, i) => {
              const Icon = s.icon ? (SOCIAL_ICON_MAP[s.icon] ?? DEFAULT_SOCIAL_ICONS[i]) : DEFAULT_SOCIAL_ICONS[i]
              return (
                <a
                  key={i}
                  href={s.href ?? '#'}
                  aria-label={s.label ?? s.icon ?? 'Social link'}
                  className={styles.iconBtn}
                >
                  <Icon size={15} />
                </a>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  // ─── Contact Block ────────────────────────────────────────────────────────
  function ContactBlock() {
    if (!contact) return null

    return (
      <div className="mt-5 space-y-2">
        {contact.email && (
          <a
            href={`mailto:${contact.email}`}
            className={cn('flex items-center gap-2 text-xs transition', styles.body, accentHover)}
          >
            <FiMail size={13} aria-hidden="true" /> {contact.email}
          </a>
        )}
        {contact.phone && (
          <a
            href={`tel:${contact.phone.replace(/\s/g, '')}`}
            className={cn('flex items-center gap-2 text-xs transition', styles.body, accentHover)}
          >
            <FiPhone size={13} aria-hidden="true" /> {contact.phone}
          </a>
        )}
        {contact.address && (
          <span className={cn('flex items-center gap-2 text-xs', styles.body)}>
            <FiMapPin size={13} aria-hidden="true" /> {contact.address}
          </span>
        )}
      </div>
    )
  }

  // ─── Newsletter Block ─────────────────────────────────────────────────────
  function NewsletterBlock() {
    if (!newsletter) return null

    return (
      <div>
        {newsletter.contactLabel && (
          <>
            <p className={cn('text-xs font-semibold uppercase tracking-[0.22em]', isDark ? 'text-slate-300' : 'text-[var(--text)]')}>
              {newsletter.contactLabel}
            </p>
            <div className={cn('mt-4 space-y-2 text-xs', styles.body)}>
              {newsletter.contactEmail && (
                <p className="flex items-center gap-2"><FiMail size={12} aria-hidden="true" /> {newsletter.contactEmail}</p>
              )}
              {newsletter.contactPhone && (
                <p className="flex items-center gap-2"><FiPhone size={12} aria-hidden="true" /> {newsletter.contactPhone}</p>
              )}
              {newsletter.contactAddress && (
                <p className="flex items-center gap-2"><FiMapPin size={12} aria-hidden="true" /> {newsletter.contactAddress}</p>
              )}
            </div>
          </>
        )}

        <div className={newsletter.contactLabel ? 'mt-8' : ''}>
          <p className={cn('text-xs font-semibold uppercase tracking-[0.22em]', isDark ? 'text-slate-300' : 'text-[var(--text)]')}>
            {newsletter.label}
          </p>
          {newsletter.subtitle && (
            <p className={cn('mt-2 text-xs', styles.body)}>{newsletter.subtitle}</p>
          )}
          <div className={cn('mt-3 flex overflow-hidden rounded-xl border', isDark ? 'border-white/10' : 'border-[var(--line)]')}>
            <input
              type="email"
              placeholder={newsletter.placeholder ?? 'Enter your email'}
              aria-label="Newsletter email"
              className={cn(
                'flex-1 px-3 py-2.5 text-xs outline-none',
                isDark || isBlack
                  ? 'bg-white/5 text-white placeholder-slate-500'
                  : 'bg-[var(--surface)] text-[var(--text)] placeholder-[var(--text-soft)]',
              )}
            />
            <button
              type="button"
              className={cn(
                'px-4 py-2.5 text-xs font-semibold text-white transition',
                isDark ? 'bg-[#00c2b2] hover:bg-[#0d9488]' : 'bg-[var(--accent)] hover:opacity-90',
              )}
            >
              {newsletter.cta ?? 'Subscribe'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Columns Grid ─────────────────────────────────────────────────────────
  function ColumnsGrid({ withTopBorder = false }) {
    if (!columns.length) return null

    const colCount = columns.length
    const gridClass =
      colCount >= 5 ? 'sm:grid-cols-3 lg:grid-cols-5' : colCount === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3'

    return (
      <div
        className={cn(
          'grid grid-cols-2 gap-6',
          gridClass,
          withTopBorder && cn('mt-10 pt-10', styles.divider),
        )}
      >
        {columns.map((col) => (
          <div key={col.title}>
            <p className={styles.colTitle}>{col.title}</p>
            <ul className="space-y-2.5 mt-0">
              {col.links.map((link) => {
                const href = typeof link === 'string' ? '#' : link.href
                const label = typeof link === 'string' ? link : link.label
                const isInternal = href && href.startsWith('/')
                return (
                  <li key={label}>
                    {isInternal ? (
                      <Link to={href} className={styles.link}>{label}</Link>
                    ) : (
                      <a href={href} className={styles.link}>{label}</a>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    )
  }

  // ─── Copyright Bar ────────────────────────────────────────────────────────
  function BottomBar() {
    if (!bottom) return null

    return (
      <div className={styles.divider}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6 lg:px-8">
          <p className={styles.copyright}>{bottom.copyright}</p>
          {bottom.links?.length > 0 && (
            <div className="flex gap-5">
              {bottom.links.map((item) => (
                <Link
                  key={item}
                  to="#"
                  className={cn(styles.copyright, 'transition hover:text-[var(--text)]')}
                >
                  {item}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  if (isSplit) {
    // Glass style: 2-column (brand | columns) inside a glass panel
    return (
      <footer className={styles.wrapper}>
        <div className={styles.containerOuter}>
          <div className={styles.containerInner}>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <BrandBlock />
              <div className={cn('grid gap-8', columns.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2')}>
                {columns.map((col) => (
                  <div key={col.title}>
                    <p className={styles.colTitle}>{col.title}</p>
                    <ul className="mt-3 space-y-2">
                      {col.links.map((link) => {
                        const href = typeof link === 'string' ? '#' : link.href
                        const label = typeof link === 'string' ? link : link.label
                        return (
                          <li key={label}>
                            <a href={href} className={styles.link}>{label}</a>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  // Stacked style: top info row, then columns below (dark / black variants)
  const hasTopRow = brand || newsletter
  return (
    <footer className={styles.wrapper}>
      <div className={styles.containerOuter}>
        {hasTopRow && (
          <div
            className={cn(
              'grid gap-10',
              brand && newsletter ? 'lg:grid-cols-[1.2fr_0.9fr_1fr]' : 'lg:grid-cols-2',
            )}
          >
            <BrandBlock />
            {newsletter && <NewsletterBlock />}
            <div className="hidden lg:block" />
          </div>
        )}
        <ColumnsGrid withTopBorder={hasTopRow} />
      </div>
      <BottomBar />
    </footer>
  )
}

export default memo(AppFooter)
