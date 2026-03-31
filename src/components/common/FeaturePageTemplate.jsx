import { memo } from 'react'
import { motion } from 'framer-motion'
import {
  FiActivity,
  FiBarChart2,
  FiBatteryCharging,
  FiBell,
  FiBriefcase,
  FiCamera,
  FiCheckCircle,
  FiClock,
  FiCloud,
  FiCode,
  FiCompass,
  FiDatabase,
  FiFlag,
  FiGlobe,
  FiLayers,
  FiMap,
  FiMoon,
  FiPlayCircle,
  FiSettings,
  FiShield,
  FiSliders,
  FiSmile,
  FiSmartphone,
  FiStar,
  FiTool,
  FiTrendingUp,
  FiTruck,
  FiUsers,
  FiZap,
} from 'react-icons/fi'
import Navbar from './Navbar'
import AppFooter from './AppFooter'
import Card from './Card'
import Button from './Button'
import SectionHeading from './SectionHeading'
import { footerBrand, footerColumns } from '../../data/siteContent'

const iconMap = {
  activity: FiActivity,
  'bar-chart': FiBarChart2,
  battery: FiBatteryCharging,
  bell: FiBell,
  briefcase: FiBriefcase,
  camera: FiCamera,
  'check-circle': FiCheckCircle,
  clock: FiClock,
  cloud: FiCloud,
  code: FiCode,
  compass: FiCompass,
  database: FiDatabase,
  flag: FiFlag,
  globe: FiGlobe,
  layers: FiLayers,
  map: FiMap,
  moon: FiMoon,
  play: FiPlayCircle,
  settings: FiSettings,
  shield: FiShield,
  sliders: FiSliders,
  smile: FiSmile,
  smartphone: FiSmartphone,
  star: FiStar,
  tool: FiTool,
  'trending-up': FiTrendingUp,
  truck: FiTruck,
  users: FiUsers,
  zap: FiZap,
  route: FiMap,
  'message-circle': FiUsers,
}

const footerCols = footerColumns

function FeaturePageTemplate({ content, navItems }) {
  const pageClass = 'bg-transparent text-[var(--text)]'
  const mutedClass = 'text-[var(--text-soft)]'
  const panelClass = 'border-[var(--line)] bg-[var(--surface)]'
  const accentClass = 'text-[var(--accent)]'
  const buttonScheme = 'default'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className={pageClass}
    >
      <Navbar
        variant="glass"
        logo={{ name: 'Navfy' }}
        navItems={navItems}
        activeLabel={content.label}
        logoTo="/"
      />

      <main className="pb-16">
        <section className="px-4 pb-12 pt-14 sm:px-6 lg:px-8 lg:pb-16 lg:pt-18">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className={`text-sm font-semibold uppercase tracking-[0.24em] ${accentClass}`}>{content.eyebrow}</p>
              <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                {content.title}
              </h1>
              <p className={`mt-6 max-w-2xl text-base leading-8 sm:text-lg ${mutedClass}`}>
                {content.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href={content.primaryCta.href} colorScheme={buttonScheme} size="lg">
                  {content.primaryCta.label}
                </Button>
                <Button href={content.secondaryCta.href} variant="outline" colorScheme={buttonScheme} size="lg">
                  {content.secondaryCta.label}
                </Button>
              </div>
            </div>

            <div className={`relative overflow-hidden rounded-[2rem] border p-6 sm:p-8 ${panelClass}`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%)]" />
              <div className="relative">
                <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${accentClass}`}>{content.visualLabel}</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">{content.visualTitle}</h2>
                <p className={`mt-4 text-sm leading-7 ${mutedClass}`}>{content.visualDescription}</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {content.stats.map((stat) => (
                    <div key={stat.label} className={`rounded-2xl border p-4 ${panelClass}`}>
                      <div className="text-2xl font-semibold">{stat.value}</div>
                      <div className={`mt-2 text-xs uppercase tracking-[0.18em] ${mutedClass}`}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Feature Highlights"
              title="Capabilities that make the page commercially useful."
              description="Each section is designed to explain product value, reduce buyer uncertainty, and create a stronger path to action."
              eyebrowColor="default"
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {content.highlights.map((item, index) => {
                const Icon = iconMap[item.icon] ?? FiLayers
                return (
                  <Card key={item.title} variant="glass" index={index} className="h-full p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                    <p className={`mt-3 text-sm leading-7 ${mutedClass}`}>{item.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.85fr]">
            <div className={`rounded-[2rem] border p-8 ${panelClass}`}>
              <SectionHeading
                eyebrow="Use Case & Benefits"
                title={content.valueTitle}
                description={content.valueDescription}
                eyebrowColor="default"
              />
              <div className="mt-8 space-y-4">
                {content.benefits.map((benefit) => (
                  <div key={benefit} className={`rounded-2xl border p-4 ${panelClass}`}>
                    <p className={`text-sm leading-7 ${mutedClass}`}>{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-[2rem] border p-8 ${panelClass}`}>
              <SectionHeading
                eyebrow="Additional Info"
                title="Technical and integration readiness."
                description="These details are intentionally compact so the page can scale later into deeper technical documentation or partner collateral."
                eyebrowColor="default"
              />
              <div className="mt-8 space-y-3">
                {content.technical.map((item) => (
                  <div key={item} className={`rounded-2xl border px-4 py-3 text-sm ${panelClass} ${mutedClass}`}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pt-12 sm:px-6 lg:px-8">
          <div className={`mx-auto max-w-7xl rounded-[2rem] border p-8 sm:p-10 ${panelClass}`}>
            <SectionHeading
              eyebrow="Next Step"
              title={content.ctaTitle}
              description={content.ctaBody}
              eyebrowColor="default"
            />
            <div className="mt-8">
              <Button href={content.ctaAction.href} colorScheme={buttonScheme} size="lg">
                {content.ctaAction.label}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <AppFooter
        variant="glass"
        brand={{
          name: footerBrand.name,
          heading: footerBrand.heading,
          description: footerBrand.description,
        }}
        columns={footerCols}
      />
    </motion.div>
  )
}

export default memo(FeaturePageTemplate)
