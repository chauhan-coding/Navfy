import { memo } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/common/Navbar'
import AppFooter from '../components/common/AppFooter'
import MapSection from '../sections/MapSection'
import { mapNavItems } from '../data/mapContent'
import { brand, footerBrand, footerColumns } from '../data/siteContent'

const footerCols = footerColumns

function MapPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen"
    >
      <Navbar
        variant="glass"
        logo={{ name: brand.name }}
        navItems={mapNavItems}
        cta={{ label: 'Get Demo', href: '/contact', type: 'router' }}
        logoTo="/"
      />

      <MapSection />

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
        columns={footerCols}
      />
    </motion.div>
  )
}

export default memo(MapPage)
