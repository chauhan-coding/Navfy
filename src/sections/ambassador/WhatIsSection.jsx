import { motion } from 'framer-motion'
import campusImg from '../../assets/amb-campus.svg'

function WhatIsSection({ data }) {
  return (
    <section id="what-is" className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="text-3xl font-extrabold leading-tight tracking-tight text-[#0a1929] sm:text-4xl"
            style={{ fontFamily: 'Poppins, Sora, sans-serif' }}
          >
            {data.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-500 sm:text-base">
            {data.description}
          </p>
          <p className="mt-5 text-sm font-semibold text-[#0d9488]">{data.highlight}</p>
        </motion.div>

        {/* Campus image */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-10 overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-100"
        >
          <img
            src={campusImg}
            alt="Navfy campus building illustration"
            loading="lazy"
            className="h-auto w-full"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default WhatIsSection

