import { motion } from 'framer-motion'
import { FiSend, FiUser, FiCompass, FiTrendingUp } from 'react-icons/fi'

const stepIconMap = {
  apply: FiSend,
  selection: FiUser,
  orientation: FiCompass,
  level: FiTrendingUp,
}

function StepCard({ step, index, total }) {
  const Icon = stepIconMap[step.icon] ?? FiSend
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative flex flex-col items-center text-center"
    >
      {/* Connector line (except last item) */}
      {index < total - 1 && (
        <div className="absolute left-[calc(50%+36px)] top-10 hidden h-[2px] w-[calc(100%-72px)] bg-[#e2e8f0] lg:block" />
      )}
      <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-slate-100 transition group-hover:ring-[#00c2b2]">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0fdf9] text-2xl text-[#0d9488]">
          <Icon />
        </div>
      </div>
      <h3 className="mt-5 text-base font-bold text-[#0a1929]">{step.title}</h3>
      <p className="mt-2 max-w-[180px] text-xs leading-6 text-slate-500 sm:text-sm">
        {step.description}
      </p>
    </motion.div>
  )
}

function HowToApplySection({ data }) {
  return (
    <section className="py-20" style={{ background: '#f8fafc' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2
            className="text-3xl font-extrabold tracking-tight text-[#0a1929] sm:text-4xl"
            style={{ fontFamily: 'Poppins, Sora, sans-serif' }}
          >
            {data.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            {data.subtitle}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {data.steps.map((step, index) => (
            <StepCard key={step.title} step={step} index={index} total={data.steps.length} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowToApplySection
