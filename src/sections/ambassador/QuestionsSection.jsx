import { motion } from 'framer-motion'
import { FiMail } from 'react-icons/fi'

function QuestionsSection({ data }) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2
            className="text-3xl font-extrabold tracking-tight text-[#0a1929] sm:text-4xl"
            style={{ fontFamily: 'Poppins, Sora, sans-serif' }}
          >
            {data.title}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
            {data.subtitle}
          </p>
          <a
            href={`mailto:${data.email}`}
            className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-[#0d9488] transition hover:text-[#0f766e]"
          >
            <FiMail className="text-xl" />
            {data.email}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default QuestionsSection
