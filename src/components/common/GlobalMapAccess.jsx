import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMap } from 'react-icons/fi'

function GlobalMapAccess() {
  const location = useLocation()
  if (location.pathname === '/map') return null

  return (
    <Link
      to="/map"
      className="fixed bottom-20 left-5 z-50 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--text)] shadow-md transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
      aria-label="Open live map"
    >
      <FiMap size={15} />
      Live Map
    </Link>
  )
}

export default memo(GlobalMapAccess)
