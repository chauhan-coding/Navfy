import { motion } from 'framer-motion'
import { FiSmartphone, FiGlobe } from 'react-icons/fi'
import { downloadData } from '../../data/ambassadorContent'

const platformIcons = {
  android: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-[#00c2b2]">
      <path d="M17.523 15.341l1.854-3.21A.25.25 0 0 0 19.16 11.8l-1.874 3.245a11.1 11.1 0 0 0-5.286-1.329 11.1 11.1 0 0 0-5.286 1.329L4.84 11.8a.25.25 0 0 0-.217.331l1.854 3.21A10.465 10.465 0 0 0 .5 23.5h23a10.465 10.465 0 0 0-5.977-8.159M8 20.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2m8 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
    </svg>
  ),
  ios: <FiSmartphone className="text-xl text-[#00c2b2]" />,
  web: <FiGlobe className="text-xl text-[#00c2b2]" />,
}

function DownloadSection() {
  return (
    <section
      className="py-14"
      style={{ background: 'linear-gradient(135deg, #0a1929, #0d3d5c)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {downloadData.platforms.map((platform) => (
            <a
              key={platform.key}
              href={platform.href}
              className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/8 px-5 py-3 text-white transition hover:border-white/40 hover:bg-white/12"
            >
              {platformIcons[platform.key]}
              <span>
                <div className="text-xs text-slate-300">{platform.preLabel}</div>
                <div className="text-sm font-semibold">{platform.store}</div>
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default DownloadSection
