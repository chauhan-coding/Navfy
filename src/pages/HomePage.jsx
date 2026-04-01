import { memo } from 'react'
import { motion } from 'framer-motion'
import { FiCode, FiLayers, FiTrendingUp } from 'react-icons/fi'
import Navbar from '../components/common/Navbar'
import AppFooter from '../components/common/AppFooter'
import { ContentSkeleton } from '../components/common/Loader'
import HeroSection from '../sections/HeroSection'
import ProductsSection from '../sections/ProductsSection'
import SolutionsSection from '../sections/SolutionsSection'
import ApiSection from '../sections/ApiSection'
import StatsSection from '../sections/StatsSection'
import TestimonialsSection from '../sections/TestimonialsSection'
import {
  apis,
  brand,
  footerBrand,
  footerColumns,
  headerContent,
  heroContent,
  navItems,
  products,
  solutionTabs,
  stats,
  testimonials,
} from '../data/siteContent'
import { useLoader } from '../hooks/useLoader'
import { toRouterNavItem } from '../data/headerRoutes'

const homeFooterColumns = footerColumns
const homeNavItems = [...navItems, { label: 'Pricing', href: '/pricing' }].map(toRouterNavItem)

const valuePillars = [
  {
    icon: FiCode,
    title: 'For Developers',
    body: 'Ship search, routing, and geofence workflows in days using SDK-first APIs and a live playground.',
  },
  {
    icon: FiTrendingUp,
    title: 'For Operations',
    body: 'Track assets, monitor SLA health, and automate alerts with one location-aware dashboard.',
  },
  {
    icon: FiLayers,
    title: 'For Leadership',
    body: 'Cut platform sprawl and vendor cost with one integrated geospatial platform built for India.',
  },
]

function HomePage() {
  const isLoading = useLoader(650)

  return (
    <div>
      <Navbar
        variant="glass"
        logo={{ name: brand.name }}
        navItems={homeNavItems}
        cta={{ label: headerContent.bookDemoLabel, href: '/contact', type: 'router' }}
      />
      {isLoading ? (
        <ContentSkeleton />
      ) : (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-0 pb-8"
        >
          <HeroSection content={heroContent} />

          {/* Why Navfy — value pillars */}
          <section aria-label="Why Navfy" className="section-gap pt-14 sm:pt-16 lg:pt-20">
            <div className="container-shell">
              <div className="rounded-[var(--radius-section)] border border-[var(--line)] bg-[var(--surface)] px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="inline-flex items-center rounded-full border border-[var(--line)] bg-[var(--accent-soft)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Why Navfy
                  </span>
                  <h2 className="section-title mt-4 max-w-2xl">
                    One platform for mapping, mobility, and operational visibility.
                  </h2>
                  <p className="section-copy mt-4 max-w-2xl">
                    Move from fragmented map tooling to a single product stack covering APIs, analytics, and connected mobility hardware.
                  </p>
                </motion.div>

                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  {valuePillars.map((pillar, i) => {
                    const Icon = pillar.icon
                    return (
                      <motion.div
                        key={pillar.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="interactive-card group rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-6"
                      >
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-colors duration-200">
                          <Icon size={19} />
                        </div>
                        <h3 className="text-base font-semibold tracking-[-0.02em]">{pillar.title}</h3>
                        <p className="mt-2 text-sm leading-[1.8] text-[var(--text-soft)]">{pillar.body}</p>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          <ProductsSection products={products} />
          <SolutionsSection tabs={solutionTabs} />
          <ApiSection apis={apis} />
          <StatsSection stats={stats} />
          <TestimonialsSection testimonials={testimonials} />
        </motion.main>
      )}

      <AppFooter
        variant="glass"
        brand={{
          name: footerBrand.name,
          heading: footerBrand.heading,
          description: footerBrand.description,
        }}
        socialLinks={[
          { icon: 'github', href: '#', label: 'GitHub' },
          { icon: 'linkedin', href: '#', label: 'LinkedIn' },
          { icon: 'x', href: '#', label: 'X' },
        ]}
        columns={homeFooterColumns}
      />
    </div>
  )
}

export default memo(HomePage)
