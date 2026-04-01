import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCheck, FiCopy } from 'react-icons/fi'

function CodeBlock({ title, code, blurb, index }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.42, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="card-shadow overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[#07111c]"
    >
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          <span className="ml-3 text-xs font-medium uppercase tracking-[0.22em] text-slate-400">{title}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/8 hover:text-slate-200"
        >
          {copied ? <FiCheck size={14} className="text-emerald-400" /> : <FiCopy size={14} />}
        </button>
      </div>
      <div className="space-y-4 px-5 py-5">
        <pre className="overflow-x-auto rounded-xl bg-black/30 p-4 font-mono text-sm leading-[1.8] text-cyan-200">
          <code>{code}</code>
        </pre>
        <p className="text-sm leading-[1.75] text-slate-300/80">{blurb}</p>
      </div>
    </motion.article>
  )
}

export default CodeBlock