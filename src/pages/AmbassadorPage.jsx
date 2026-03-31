import { memo } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/common/Navbar'
import AppFooter from '../components/common/AppFooter'
import AmbassadorHero from '../sections/ambassador/AmbassadorHero'
import WhatIsSection from '../sections/ambassador/WhatIsSection'
import WhyJoinSection from '../sections/ambassador/WhyJoinSection'
import DriveSection from '../sections/ambassador/DriveSection'
import HowToApplySection from '../sections/ambassador/HowToApplySection'
import JourneySection from '../sections/ambassador/JourneySection'
import UnlockSection from '../sections/ambassador/UnlockSection'
import QuestionsSection from '../sections/ambassador/QuestionsSection'
import DownloadSection from '../sections/ambassador/DownloadSection'
import {
  ambassadorBrand,
  ambassadorHeaderContent,
  ambassadorNavItems,
  ambassadorFooterData,
  footerNavColumns,
  heroData,
  whatIsData,
  whyJoinData,
  driveData,
  howToApplyData,
  journeyData,
  unlockData,
  questionsData,
} from '../data/ambassadorContent'
import { toRouterNavItem } from '../data/headerRoutes'

// Normalize string[] links to { label, href } shape for AppFooter
const ambassadorFooterColumns = footerNavColumns.map((col) => ({
  title: col.title,
  links: col.links.map((l) => ({ label: l, href: '/' })),
}))

const ambassadorNavConfig = ambassadorNavItems.map(toRouterNavItem)

function AmbassadorPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen"
      style={{ fontFamily: 'Poppins, Sora, "Segoe UI", sans-serif' }}
    >
      <Navbar
        variant="glass"
        logo={{ name: ambassadorBrand.name }}
        navItems={ambassadorNavConfig}
        activeLabel={ambassadorHeaderContent.activeLinkLabel}
        cta={{ label: ambassadorHeaderContent.ctaLabel, href: '/contact', type: 'router' }}
        logoTo="/"
      />

      <AmbassadorHero data={heroData} />
      <WhatIsSection data={whatIsData} />
      <WhyJoinSection data={whyJoinData} />
      <DriveSection data={driveData} />
      <HowToApplySection data={howToApplyData} />
      <JourneySection data={journeyData} />
      <UnlockSection data={unlockData} />
      <QuestionsSection data={questionsData} />
      <DownloadSection />

      <AppFooter
        variant="glass"
        brand={{
          name: ambassadorFooterData.brand.name,
          tagline: ambassadorFooterData.brand.tagline,
        }}
        contact={{
          email: ambassadorFooterData.contact.email,
          phone: ambassadorFooterData.contact.phone,
          address: ambassadorFooterData.contact.address,
        }}
        socialLinks={[
          { icon: 'github', href: '#', label: 'GitHub' },
          { icon: 'linkedin', href: '#', label: 'LinkedIn' },
          { icon: 'x', href: '#', label: 'X' },
        ]}
        newsletter={{
          contactLabel: ambassadorFooterData.contactSection.label,
          contactEmail: ambassadorFooterData.contactSection.ambassadorEmail,
          contactPhone: ambassadorFooterData.contactSection.phone,
          contactAddress: ambassadorFooterData.contactSection.address,
          label: ambassadorFooterData.newsletter.label,
          subtitle: ambassadorFooterData.newsletter.subtitle,
          placeholder: ambassadorFooterData.newsletter.placeholder,
          cta: ambassadorFooterData.newsletter.cta,
        }}
        columns={ambassadorFooterColumns}
        bottom={{
          copyright: ambassadorFooterData.bottom.copyright,
          links: ambassadorFooterData.bottom.links,
        }}
      />
    </motion.div>
  )
}

export default memo(AmbassadorPage)
