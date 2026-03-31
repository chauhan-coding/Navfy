import { useEffect, useState } from 'react'

/**
 * Manages light/dark theme with localStorage persistence and
 * system-preference detection.
 *
 * @returns {{ theme: 'light'|'dark', toggleTheme: () => void }}
 */
export function useTheme() {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        const stored = window.localStorage.getItem('navfy-theme')
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const resolved = stored ?? (systemDark ? 'dark' : 'light')

        setTheme(resolved)
        document.documentElement.classList.toggle('dark', resolved === 'dark')
    }, [])

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark'
        setTheme(next)
        document.documentElement.classList.toggle('dark', next === 'dark')
        window.localStorage.setItem('navfy-theme', next)
    }

    return { theme, toggleTheme }
}

