import { FiGithub, FiLinkedin, FiX } from 'react-icons/fi'
import FooterLinks from '../components/FooterLinks'
import { footerBrand } from '../data/siteContent'

function FooterSection({ columns }) {
  return (
    <footer className="pb-8 pt-4">
      <div className="container-shell">
        <div className="glass-panel rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">{footerBrand.name}</p>
              <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-[-0.04em] text-[var(--text)]">
                {footerBrand.heading}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-soft)]">
                {footerBrand.description}
              </p>
              <div className="mt-6 flex gap-3 text-lg text-[var(--text)]">
                <a href="#" aria-label="GitHub" className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] transition hover:border-[var(--line-strong)]">
                  <FiGithub />
                </a>
                <a href="#" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] transition hover:border-[var(--line-strong)]">
                  <FiLinkedin />
                </a>
                <a href="#" aria-label="X" className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] transition hover:border-[var(--line-strong)]">
                  <FiX />
                </a>
              </div>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {columns.map((column) => (
                <FooterLinks key={column.title} {...column} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection