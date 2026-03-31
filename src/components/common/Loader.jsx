import { t } from '../../locales'

/**
 * Spinning ring loader for in-component loading states.
 */
export function Spinner({ size = 40, className = '' }) {
  return (
    <div
      role="status"
      aria-label={t('a11y.loadingSpinner')}
      className={`inline-block rounded-full border-4 border-[var(--line)] border-t-[var(--accent)] animate-spin ${className}`}
      style={{ width: size, height: size }}
    />
  )
}

/**
 * Full-screen centered loader shown during app / page initialization.
 */
export function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center bg-[var(--bg)]"
    >
      <div className="flex flex-col items-center gap-5">
        <Spinner size={44} />
        <p className="text-sm font-medium text-[var(--text-soft)] animate-pulse">
          {t('common.loadingContent')}
        </p>
      </div>
    </div>
  )
}

/**
 * Content-area skeleton shown while a page's primary data loads.
 */
export function ContentSkeleton() {
  return (
    <div className="container-shell py-6">
      <div className="glass-panel hero-gradient overflow-hidden rounded-[2.25rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="h-4 w-40 animate-pulse rounded-full bg-white/20" />
            <div className="h-14 w-full animate-pulse rounded-3xl bg-white/15" />
            <div className="h-14 w-5/6 animate-pulse rounded-3xl bg-white/15" />
            <div className="h-6 w-full animate-pulse rounded-full bg-white/10" />
            <div className="h-6 w-4/5 animate-pulse rounded-full bg-white/10" />
          </div>
          <div className="h-80 animate-pulse rounded-[2rem] bg-white/12" />
        </div>
      </div>
    </div>
  )
}
