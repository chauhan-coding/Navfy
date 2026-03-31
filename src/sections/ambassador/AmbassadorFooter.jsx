import { FiGithub, FiLinkedin, FiX, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { footerNavColumns, ambassadorFooterData } from '../../data/ambassadorContent'
import { Link } from 'react-router-dom'

function AmbassadorFooter() {
  return (
    <footer style={{ background: '#07111f' }}>
      {/* Top section */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.9fr_1fr]">
          {/* Brand + contact */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00b5a5]">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2 L16 16 L2 16 Z" fill="white" opacity="0.9"/>
                </svg>
              </div>
              <span className="text-base font-bold text-white">{ambassadorFooterData.brand.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-xs leading-7 text-slate-400">
              {ambassadorFooterData.brand.tagline}
            </p>
            <div className="mt-5 space-y-2">
              <a href={`mailto:${ambassadorFooterData.contact.email}`} className="flex items-center gap-2 text-xs text-slate-400 transition hover:text-[#00c2b2]">
                <FiMail size={13} /> {ambassadorFooterData.contact.email}
              </a>
              <a href={`tel:${ambassadorFooterData.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-xs text-slate-400 transition hover:text-[#00c2b2]">
                <FiPhone size={13} /> {ambassadorFooterData.contact.phone}
              </a>
              <span className="flex items-center gap-2 text-xs text-slate-400">
                <FiMapPin size={13} /> {ambassadorFooterData.contact.address}
              </span>
            </div>
            <div className="mt-5 flex gap-3">
              {[FiGithub, FiLinkedin, FiX].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-[#00c2b2] hover:text-[#00c2b2]"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Us label + newsletter */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">{ambassadorFooterData.contactSection.label}</p>
            <div className="mt-4 space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2"><FiMail size={12}/> {ambassadorFooterData.contactSection.ambassadorEmail}</p>
              <p className="flex items-center gap-2"><FiPhone size={12}/> {ambassadorFooterData.contactSection.phone}</p>
              <p className="flex items-center gap-2"><FiMapPin size={12}/> {ambassadorFooterData.contactSection.address}</p>
            </div>
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">{ambassadorFooterData.newsletter.label}</p>
              <p className="mt-2 text-xs text-slate-400">{ambassadorFooterData.newsletter.subtitle}</p>
              <div className="mt-3 flex overflow-hidden rounded-xl border border-white/10">
                <input
                  type="email"
                  placeholder={ambassadorFooterData.newsletter.placeholder}
                  className="flex-1 bg-white/5 px-3 py-2.5 text-xs text-white placeholder-slate-500 outline-none"
                />
                <button
                  type="button"
                  className="bg-[#00c2b2] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0d9488]"
                >
                  {ambassadorFooterData.newsletter.cta}
                </button>
              </div>
            </div>
          </div>

          {/* Empty spacer on this column on mobile — nav columns in bottom grid */}
          <div className="hidden lg:block" />
        </div>

        {/* Navigation columns grid */}
        <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/8 pt-10 sm:grid-cols-3 lg:grid-cols-5">
          {footerNavColumns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-slate-500 transition hover:text-[#00c2b2]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-xs text-slate-500">{ambassadorFooterData.bottom.copyright}</p>
          <div className="flex gap-5">
            {ambassadorFooterData.bottom.links.map((item) => (
              <Link key={item} to="#" className="text-xs text-slate-500 transition hover:text-slate-300">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default AmbassadorFooter
