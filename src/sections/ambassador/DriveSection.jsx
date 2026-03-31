import { motion } from 'framer-motion'
import driveChars from '../../assets/amb-drive-chars.svg'

function DriveSection({ data }) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-slate-100">
          <div className="grid items-center gap-0 md:grid-cols-2">
            {/* Text block */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55 }}
              className="px-8 py-12 sm:px-12 sm:py-14"
            >
              <h2
                className="whitespace-pre-line text-3xl font-extrabold leading-tight tracking-tight text-[#0a1929] sm:text-4xl"
                style={{ fontFamily: 'Poppins, Sora, sans-serif' }}
              >
                {data.title}
              </h2>
              <p className="mt-5 text-sm leading-8 text-slate-500 sm:text-base">
                {data.description}
              </p>
              <a
                href="#interest-form"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#00c2b2] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#0d9488]"
              >
                {data.cta}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>

            {/* Characters image */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="flex items-end justify-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #e0f7f5 0%, #cffafe 100%)',
                minHeight: '320px',
              }}
            >
              <img
                src={driveChars}
                alt="Three illustrated student ambassadors"
                loading="lazy"
                className="max-h-[360px] w-full max-w-md object-contain object-bottom"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DriveSection
