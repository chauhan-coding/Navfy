/**
 * Central design system configuration.
 * All components consume values from here — no hardcoded hex colors or styles in JSX.
 *
 * CSS custom properties (--accent, --text, etc.) are defined in styles/app.css.
 * This file bridges those tokens into JavaScript for config-driven components.
 */

// ─── Color Tokens ────────────────────────────────────────────────────────────

export const colors = {
    // CSS variable references — used in Tailwind [var()] syntax
    accent: 'var(--accent)',
    accentSoft: 'var(--accent-soft)',
    text: 'var(--text)',
    textSoft: 'var(--text-soft)',
    bg: 'var(--bg)',
    bgElevated: 'var(--bg-elevated)',
    surface: 'var(--surface)',
    surfaceStrong: 'var(--surface-strong)',
    line: 'var(--line)',
    lineStrong: 'var(--line-strong)',
    glow: 'var(--glow)',

    // Literal hex values for dark/black-themed components
    darkNavBg: '#0a1929',
    darkNavBgDeep: '#07111f',
    darkNavDrawer: '#0d1f33',
    darkAccent: '#00c2b2',
    darkAccentAlt: '#00b5a5',
    gadgetAccent: '#22d3ee',
    orangeCta: '#f97316',
    orangeCtaHover: '#ea6210',
}

// ─── Spacing ─────────────────────────────────────────────────────────────────

export const spacing = {
    sectionGap: 'py-18 sm:py-22 lg:py-28',
    containerShell: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
}

// ─── Typography ──────────────────────────────────────────────────────────────

export const typography = {
    sectionTitle: 'text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl font-display',
    sectionCopy: 'text-sm leading-7 sm:text-base text-[var(--text-soft)]',
    eyebrow: 'text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]',
    eyebrowCyan: 'text-sm font-semibold uppercase tracking-[0.24em] text-cyan-400',
    eyebrowTeal: 'text-sm font-semibold uppercase tracking-[0.28em] text-[#00c2b2]',
}

// ─── Border Radius ───────────────────────────────────────────────────────────

export const radius = {
    card: 'rounded-3xl',
    button: 'rounded-full',
    section: 'rounded-[2.25rem]',
    panel: 'rounded-[2rem]',
    input: 'rounded-xl',
}

// ─── Navbar Variant Styles ────────────────────────────────────────────────────
// Each variant defines the full class set for that theme.

export const navVariants = {
    glass: {
        wrapper: 'sticky top-0 z-40 px-4 py-3 sm:px-6 lg:px-8',
        inner: 'glass-panel container-shell flex items-center justify-between rounded-2xl px-4 py-2.5 sm:px-5',
        logo: 'text-lg font-bold tracking-[-0.05em] text-[var(--text)]',
        link: 'text-sm font-medium text-[var(--text-soft)] transition-colors duration-150 hover:text-[var(--text)]',
        activeLink: 'font-semibold text-[var(--accent)]',
        ctaPrimary: 'btn-premium hidden py-2 px-5 sm:inline-flex',
        ctaOutline: 'btn-ghost-premium hidden py-2 px-5 sm:inline-flex',
        drawerLink: 'block rounded-xl px-4 py-3 text-sm font-medium text-[var(--text-soft)] transition hover:bg-[var(--surface-strong)] hover:text-[var(--text)]',
        hamburger: 'text-[var(--text)]',
    },
    dark: {
        wrapper: 'sticky top-0 z-50 w-full',
        inner: 'mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8',
        logo: 'text-base font-bold tracking-tight text-white',
        link: 'text-sm font-medium text-slate-300 transition hover:text-white',
        activeLink: 'text-[#00c2b2] font-semibold',
        ctaPrimary: 'hidden rounded-full bg-[#f97316] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#ea6210] sm:inline-flex',
        ctaOutline: 'hidden rounded-full border border-[#00b5a5] px-4 py-2 text-sm font-semibold text-[#00b5a5] transition hover:bg-[#00b5a5] hover:text-white sm:inline-flex',
        drawerLink: 'block rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white',
        hamburger: 'text-slate-300',
    },
    black: {
        wrapper: 'sticky top-0 z-50 bg-black border-b border-gray-800',
        inner: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20',
        logo: 'text-xl font-bold text-cyan-400',
        link: 'text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors duration-200',
        activeLink: 'text-cyan-400 font-semibold',
        ctaPrimary: 'hidden md:block px-4 py-2 rounded-full bg-cyan-500 text-black font-semibold text-sm hover:bg-cyan-400 transition-colors duration-200',
        ctaOutline: 'hidden md:block px-4 py-2 rounded-full border border-cyan-500 text-cyan-400 font-semibold text-sm hover:bg-cyan-500 hover:text-black transition-colors duration-200',
        drawerLink: 'block px-4 py-2 text-sm font-medium text-gray-300 hover:text-cyan-400 hover:bg-gray-900 rounded transition-colors',
        hamburger: 'text-white hover:bg-gray-900',
    },
}

// ─── Footer Variant Styles ────────────────────────────────────────────────────

export const footerVariants = {
    glass: {
        wrapper: 'pb-8 pt-4',
        containerOuter: 'container-shell',
        containerInner: 'glass-panel rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10',
        colTitle: 'text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]',
        link: 'text-sm text-[var(--text-soft)] transition hover:text-[var(--accent)]',
        heading: 'text-[var(--text)]',
        body: 'text-sm leading-7 text-[var(--text-soft)]',
        divider: 'border-t border-[var(--line)]',
        iconBtn: 'flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] transition hover:border-[var(--line-strong)]',
        copyright: 'text-xs text-[var(--text-soft)]',
    },
    dark: {
        wrapper: 'bg-[#07111f]',
        containerOuter: 'mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8',
        containerInner: '',
        colTitle: 'text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 mb-4',
        link: 'text-xs text-slate-500 transition hover:text-[#00c2b2]',
        heading: 'text-white',
        body: 'text-xs leading-7 text-slate-400',
        divider: 'border-t border-white/10',
        iconBtn: 'flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-[#00c2b2] hover:text-[#00c2b2]',
        copyright: 'text-xs text-slate-500',
    },
    black: {
        wrapper: 'bg-black border-t border-gray-800',
        containerOuter: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20',
        containerInner: '',
        colTitle: 'text-white font-bold text-sm uppercase tracking-wider mb-4',
        link: 'text-gray-400 text-sm hover:text-cyan-400 transition-colors duration-200',
        heading: 'text-white',
        body: 'text-sm leading-7 text-gray-400',
        divider: 'border-t border-gray-800',
        iconBtn: 'flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition hover:border-cyan-500 hover:text-cyan-400',
        copyright: 'text-xs text-gray-500',
    },
}

// ─── Button Variant Styles ────────────────────────────────────────────────────

export const buttonVariants = {
    primary: {
        glass: 'rounded-full bg-white text-slate-900 hover:-translate-y-[1px]',
        dark: 'rounded-full bg-[#f97316] text-white hover:bg-[#ea6210]',
        black: 'rounded-lg bg-cyan-500 text-black hover:bg-cyan-400',
        teal: 'rounded-full bg-[#00c2b2] text-[#0a1929] hover:bg-[#0d9488]',
        default: 'rounded-full bg-[var(--accent)] text-white hover:opacity-90',
    },
    outline: {
        glass: 'rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/15',
        dark: 'rounded-full border border-[#00b5a5] text-[#00b5a5] hover:bg-[#00b5a5] hover:text-white',
        black: 'rounded-lg border-2 border-white text-white hover:bg-white hover:text-cyan-600',
        teal: 'rounded-full border border-[#00c2b2]/60 bg-transparent text-white hover:bg-[#00c2b2] hover:text-[#0a1929]',
        default: 'rounded-full border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white',
    },
}

// ─── Card Variant Styles ──────────────────────────────────────────────────────

export const cardVariants = {
    glass: 'glass-panel interactive-card card-shadow group rounded-[1.5rem] p-6',
    dark: 'bg-gray-900 rounded-lg border border-gray-800 hover:border-cyan-500 transition-colors duration-300',
    ambassador: 'rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm',
    stat: 'glass-panel rounded-3xl p-6 text-center',
}
