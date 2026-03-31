import { memo } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/common/Navbar'
import AppFooter from '../components/common/AppFooter'
import MaplsGadgetsHero from '../sections/mappls/MaplsGadgetsHero'
import ProductsGridSection from '../sections/mappls/ProductsGridSection'
import NewsSection from '../sections/mappls/NewsSection'
import BulkOrdersSection from '../sections/mappls/BulkOrdersSection'
import {
  maplsGadgetsBrand,
  maplsGadgetsNav,
  gadgetsFooterColumns,
  maplsGadgetsFooterData,
} from '../data/maplsGadgetsContent'
import { toRouterNavItem } from '../data/headerRoutes'

const gadgetsNavItems = maplsGadgetsNav.map(toRouterNavItem)

function MaplsGadgetsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Navbar
        variant="glass"
        logo={{ name: maplsGadgetsBrand.name }}
        navItems={gadgetsNavItems}
        cta={{ label: 'Get a Quote', href: '/contact', type: 'router' }}
        activeLabel="Trackers"
        logoTo="/"
      />

      <MaplsGadgetsHero />
      <ProductsGridSection />
      <NewsSection />
      <BulkOrdersSection />

      <AppFooter
        variant="glass"
        columns={gadgetsFooterColumns}
        bottom={{ copyright: maplsGadgetsFooterData.bottom.copyright }}
      />
    </motion.div>
  )
}

export default memo(MaplsGadgetsPage)
