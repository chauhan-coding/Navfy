import { motion } from 'framer-motion'

function CodeBlock({ title, code, blurb, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="card-shadow overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[#08111f]"
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
        <span className="h-3 w-3 rounded-full bg-rose-400" />
        <span className="h-3 w-3 rounded-full bg-amber-300" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
        <span className="ml-3 text-xs uppercase tracking-[0.24em] text-slate-400">{title}</span>
      </div>
      <div className="space-y-4 px-5 py-5">
        <pre className="overflow-x-auto rounded-2xl bg-black/25 p-4 font-mono text-sm leading-7 text-cyan-200">
          <code>{code}</code>
        </pre>
        <p className="text-sm leading-7 text-slate-300">{blurb}</p>
      </div>
    </motion.article>
  )
}

export default CodeBlock