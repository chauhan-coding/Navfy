import { Component } from 'react'
import { t } from '../../locales'

/**
 * Class-based Error Boundary.
 * Wraps subtrees to catch JS errors and display a human-readable fallback UI.
 * Automatically logs errors to the console; swap with your monitoring service here.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // TODO: Replace with Sentry / Datadog integration
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  handleRetry = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--bg)] px-4 text-center"
        >
          <div className="glass-panel max-w-md w-full rounded-3xl p-8">
            <div className="mb-4 flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-red-50 text-2xl">
              ⚠️
            </div>
            <h2 className="text-xl font-semibold text-[var(--text)]">
              {t('errors.genericTitle')}
            </h2>
            <p className="mt-3 text-sm text-[var(--text-soft)]">
              {t('errors.genericBody')}
            </p>
            {this.state.error && (
              <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 font-mono break-all">
                {this.state.error.message}
              </p>
            )}
            <button
              onClick={this.handleRetry}
              className="mt-6 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {t('errors.retry')}
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
