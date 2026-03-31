import { motion } from 'framer-motion'
import explorerBadge from '../../assets/badge-explorer.svg'
import navigatorBadge from '../../assets/badge-navigator.svg'
import pathfinderBadge from '../../assets/badge-pathfinder.svg'

const badgeImageMap = {
  explorer: explorerBadge,
  navigator: navigatorBadge,
  pathfinder: pathfinderBadge,
}

function JourneySection({ data }) {
  return (
    <section className="bg-white py-20">
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
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            {data.subtitle}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          {data.levels.map((level, index) => (
            <motion.div
              key={level.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-6 drop-shadow-xl transition hover:scale-105">
                <img
                  src={badgeImageMap[level.badge]}
                  alt={`${level.name} badge`}
                  loading="lazy"
                  className="h-36 w-36"
                />
              </div>
              <span
                className="mb-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white"
                style={{ background: level.color }}
              >
                {level.name}
              </span>
              <p className="mt-3 max-w-[240px] text-sm leading-7 text-slate-500">
                {level.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default JourneySection
