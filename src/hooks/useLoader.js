import { useEffect, useState } from 'react'

/**
 * Returns a boolean `isLoading` that flips to false after `delay` ms.
 * Simulates async initialization; replace the timer with a real
 * data-fetching Promise when backend integration is added.
 *
 * @param {number} [delay=650] - Milliseconds before loading completes
 * @returns {boolean}
 */
export function useLoader(delay = 650) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = window.setTimeout(() => setIsLoading(false), delay)
        return () => window.clearTimeout(timer)
    }, [delay])

    return isLoading
}
