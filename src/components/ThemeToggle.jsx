import { FiMoon, FiSun } from 'react-icons/fi'

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle color theme"
      className="glass-panel inline-flex h-11 w-11 items-center justify-center rounded-full text-lg text-[var(--text)] transition hover:scale-105 hover:border-[var(--line-strong)]"
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </button>
  )
}

export default ThemeToggle