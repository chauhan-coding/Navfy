import { memo } from 'react'
import { motion } from 'framer-motion'
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
    title: 'For Developers',
    body: 'Ship search, routing, and geofence workflows in days using SDK-first APIs and a live playground.',
  },
  {
    title: 'For Operations',
    body: 'Track assets, monitor SLA health, and automate alerts with one location-aware dashboard.',
  },
  {
    title: 'For Leadership',
    body: 'Cut platform sprawl and vendor cost with one integrated geospatial platform built for India.',
  },
]

function HomePage() {
  const isLoading = useLoader(650)

  return (
    <div className="pb-6">
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
          transition={{ duration: 0.4 }}
        >
          <HeroSection content={heroContent} />
          <section className="px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">Why Navfy</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                One platform for mapping, mobility, and operational visibility.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-soft)] sm:text-base">
                Navfy helps teams move from fragmented map tooling to a single product stack covering APIs, analytics, and connected mobility hardware.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {valuePillars.map((pillar) => (
                  <div key={pillar.title} className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-5">
                    <h3 className="text-base font-semibold">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">{pillar.body}</p>
                  </div>
                ))}
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
