import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'
import { ambassadorNavItems, ambassadorBrand, ambassadorHeaderContent } from '../../data/ambassadorContent'

function AmbassadorNav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full" style={{ background: '#0a1929' }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00b5a5]">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2 L16 16 L2 16 Z" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <span className="text-base font-bold tracking-tight text-white">{ambassadorBrand.name}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {ambassadorNavItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/ambassador"
            className="text-sm font-semibold text-[#00c2b2] underline-offset-2 hover:underline"
          >
            {ambassadorHeaderContent.activeLinkLabel}
          </Link>
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href={ambassadorHeaderContent.ctaHref}
            className="hidden rounded-full bg-[#f97316] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#ea6210] sm:inline-flex"
          >
            {ambassadorHeaderContent.ctaLabel}
          </a>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-300 md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={ambassadorHeaderContent.toggleMenuAriaLabel}
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/10 md:hidden"
          style={{ background: '#0d1f33' }}
        >
          <div className="flex flex-col gap-1 px-4 py-4">
            {ambassadorNavItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/8 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={ambassadorHeaderContent.ctaHref}
              className="mt-2 rounded-full bg-[#f97316] px-4 py-3 text-center text-sm font-semibold text-white"
            >
              {ambassadorHeaderContent.ctaLabel}
            </a>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default AmbassadorNav
