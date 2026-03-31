function FooterLinks({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--text)]">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="text-sm text-[var(--text-soft)] transition hover:text-[var(--accent)]">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterLinks