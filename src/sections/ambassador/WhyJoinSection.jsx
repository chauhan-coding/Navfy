import { motion } from 'framer-motion'
import { FiStar, FiZap, FiAward } from 'react-icons/fi'

const iconMap = {
  leadership: FiStar,
  skill: FiZap,
  experience: FiAward,
}

function BenefitCard({ benefit, index }) {
  const Icon = iconMap[benefit.icon] ?? FiStar
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="rounded-2xl border border-white/10 bg-white/8 p-6 text-center backdrop-blur-sm transition hover:border-[#00c2b2]/40 hover:bg-white/12"
    >
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00c2b2]/15 text-2xl text-[#00c2b2]">
        <Icon />
      </div>
      <h3 className="text-lg font-bold text-white">{benefit.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{benefit.description}</p>
    </motion.article>
  )
}

function WhyJoinSection({ data }) {
  return (
    <section
      className="py-20"
      style={{
        background: 'linear-gradient(160deg, #0a1929 0%, #0d3d5c 60%, #0a1929 100%)',
      }}
    >
      {/* Corner triangles */}
      <div className="pointer-events-none absolute left-8 h-3 w-3 rotate-45 border border-[#00c2b2]/30" />
      <div className="pointer-events-none absolute right-8 h-3 w-3 rotate-12 border border-[#00c2b2]/20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
          className="whitespace-pre-line text-center text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl"
          style={{ fontFamily: 'Poppins, Sora, sans-serif' }}
        >
          {data.title}
        </motion.h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.benefits.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyJoinSection
