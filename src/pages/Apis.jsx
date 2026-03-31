import { memo } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/common/Navbar'
import AppFooter from '../components/common/AppFooter'
import SectionHeading from '../components/common/SectionHeading'
import ApiPlayground from '../components/common/ApiPlayground'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import { featureNavGroups, featurePagesContent } from '../data/featurePagesContent'
import { brand, footerBrand, footerColumns } from '../data/siteContent'
import {
  FiCode, FiZap, FiShield, FiMap, FiBell, FiDatabase, FiGlobe
} from 'react-icons/fi'

const content = featurePagesContent.apis

const SDK_LANGS = [
  { lang: 'JavaScript', snippet: "import { NavfyClient } from 'navfy-sdk'\nconst client = new NavfyClient({ apiKey: 'YOUR_KEY' })\nconst results = await client.search('Connaught Place')" },
  { lang: 'Python', snippet: "from navfy import NavfyClient\nclient = NavfyClient(api_key='YOUR_KEY')\nresults = client.search('Connaught Place')" },
  { lang: 'Flutter', snippet: "final client = NavfyClient(apiKey: 'YOUR_KEY');\nfinal results = await client.search('Connaught Place');" },
]

const TILE_FEATURES = [
  { icon: FiGlobe, title: 'Vector & raster tiles', body: 'WebGL-based renderer concept with raster fallback for low-end devices.' },
  { icon: FiMap, title: 'Custom map styles', body: 'Override colours, fonts, and layer visibility to match your product design system.' },
  { icon: FiDatabase, title: 'Offline-capable', body: 'Pre-download regional tile packs for offline navigation in mobile SDKs.' },
  { icon: FiBell, title: 'Traffic overlays', body: 'Live congestion heatmap updated every 90 seconds from telemetry and crowdsourced data.' },
]

function Apis() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      <Navbar
        variant="glass"
        logo={{ name: brand.name }}
        navItems={featureNavGroups.primary}
        activeLabel="APIs"
        logoTo="/"
      />

      <main className="pb-20">
        {/* Hero */}
        <section className="px-4 pb-12 pt-14 sm:px-6 lg:px-8 lg:pb-16 lg:pt-18">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">{content.eyebrow}</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">{content.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-soft)] sm:text-lg">{content.description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" size="lg">Get Your Free API Key</Button>
              <Button href="/pricing" variant="outline" size="lg">See Pricing</Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              {content.stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-5 py-3">
                  <span className="text-lg font-semibold text-[var(--accent)]">{s.value}</span>
                  <span className="ml-2 text-sm text-[var(--text-soft)]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* API Playground */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="API Playground"
              title="Try the Navfy API right here — no signup required."
              description="Select an endpoint, adjust the parameters, and hit Run to see a realistic mock response. Sign up for a free key to fire live production requests."
            />
            <div className="mt-10">
              <ApiPlayground />
            </div>
          </div>
        </section>

        {/* SDK Section */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="SDKs"
              title="Install a typed SDK in under 60 seconds."
              description="First-party packages for JavaScript, TypeScript, Python, Flutter, React Native, iOS, and Android."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {SDK_LANGS.map(({ lang, snippet }, i) => (
                <Card key={lang} variant="glass" index={i} className="p-6">
                  <div className="flex items-center gap-2">
                    <FiCode size={16} className="text-[var(--accent)]" />
                    <span className="text-sm font-semibold">{lang}</span>
                  </div>
                  <pre className="mt-4 overflow-x-auto rounded-xl bg-[var(--bg)] p-4 font-mono text-xs leading-6 text-[var(--text)]">
                    {snippet}
                  </pre>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Highlights grid */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Feature Highlights"
              title="Everything you need — nothing you do not."
              description="Navfy APIs are designed to integrate cleanly, behave predictably, and scale without surprises."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {content.highlights.map((item, i) => {
                const icons = [FiCode, FiZap, FiShield, FiMap]
                const Icon = icons[i] ?? FiCode
                return (
                  <Card key={item.title} variant="glass" index={i} className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">{item.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Map tiles */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Map Tiles & Rendering" title="Fast, customisable map tiles from Navfy CDN." />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {TILE_FEATURES.map(({ icon: Icon, title, body }, i) => (
                <Card key={title} variant="glass" index={i} className="p-6">
                  <Icon size={20} className="text-[var(--accent)]" />
                  <h3 className="mt-4 text-base font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">{body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] bg-[var(--accent)] px-8 py-12 text-center text-white">
            <h2 className="text-3xl font-semibold tracking-[-0.04em]">{content.ctaTitle}</h2>
            <p className="mt-4 text-base text-white/80">{content.ctaBody}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/contact" colorScheme="dark" size="lg">Get Free API Key</Button>
              <Button href="/developers" variant="outline" colorScheme="dark" size="lg">Read the Docs</Button>
            </div>
          </div>
        </section>
      </main>

      <AppFooter
        variant="glass"
        brand={{ name: footerBrand.name, heading: footerBrand.heading, description: footerBrand.description }}
        socialLinks={[
          { icon: 'github', href: '#', label: 'GitHub' },
          { icon: 'linkedin', href: '#', label: 'LinkedIn' },
          { icon: 'x', href: '#', label: 'X' },
        ]}
        columns={footerColumns}
      />
    </motion.div>
  )
}

export default memo(Apis)

