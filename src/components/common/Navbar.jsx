import { memo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { cn } from '../../utils/cn'
import { navVariants } from '../../config/theme'
import { t } from '../../locales'
import ThemeToggle from '../ThemeToggle'
import { useTheme } from '../../hooks/useTheme'

/**
 * Universal, config-driven Navbar.
 * Replaces AmbassadorNav, MaplsGadgetsNav, and the HomePage Header.
 *
 * @prop {'glass'|'dark'|'black'} [variant='glass']
 * @prop {{ name: string }}       logo
 * @prop {NavItem[]}              navItems
 * @prop {CtaItem}                [cta]           - Primary CTA button/link
 * @prop {string}                 [activeLabel]   - Highlighted nav item label
 * @prop {ReactNode}              [rightExtras]   - Extra elements on the right (ThemeToggle, extra links)
 * @prop {string}                 [logoTo='/']    - Router path for logo click
 *
 * NavItem: { label: string, href: string, type?: 'link'|'router' }
 * CtaItem: { label: string, href: string, type?: 'link'|'router', style?: 'primary'|'outline' }
 */
function Navbar({
  variant = 'glass',
  logo = { name: 'Navfy' },
  navItems = [],
  cta,
  activeLabel,
  rightExtras,
  logoTo = '/',
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const styles = navVariants.glass
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  const showLogoIcon = false

  function NavLink({ item }) {
    const routeMatch = item.type === 'router' && item.href === location.pathname
    const isActive = (activeLabel && item.label === activeLabel) || routeMatch
    const cls = cn(styles.link, isActive && styles.activeLink)

    if (item.type === 'router') {
      return (
        <Link to={item.href} className={cls} onClick={() => setMobileOpen(false)}>
          {item.label}
        </Link>
      )
    }
    return (
      <a href={item.href} className={cls} onClick={() => setMobileOpen(false)}>
        {item.label}
      </a>
    )
  }

  const ctaClass = cta?.style === 'outline' ? styles.ctaOutline : styles.ctaPrimary

  return (
    <header className={styles.wrapper}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link
          to={logoTo}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          aria-label={t('a11y.logoAlt')}
        >
          {showLogoIcon && (
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{ background: '#22d3ee' }}
              aria-hidden="true"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2 L16 16 L2 16 Z" fill="white" opacity="0.9" />
              </svg>
            </div>
          )}
          <span className={styles.logo}>{logo.name}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </nav>

        {/* Right side: CTA + extras + hamburger */}
        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />

          {cta && (
            cta.type === 'router' ? (
              <Link to={cta.href} className={ctaClass}>{cta.label}</Link>
            ) : (
              <a href={cta.href} className={ctaClass}>{cta.label}</a>
            )
          )}

          {rightExtras}

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className={cn(
              'md:hidden inline-flex items-center justify-center rounded-lg p-2 transition',
              styles.hamburger,
            )}
            aria-label={mobileOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className={cn(
              'md:hidden border-t',
              'border-[var(--line)]',
            )}
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navItems.map((item) => (
                <NavLink key={item.label} item={item} />
              ))}
              {cta && (
                <a
                  href={cta.href}
                  className={cn(
                    'mt-2 rounded-full px-4 py-3 text-center text-sm font-semibold text-white',
                    'bg-[var(--accent)]',
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {cta.label}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default memo(Navbar)

