/**
 * Merges class names, filtering out all falsy values.
 * Lightweight alternative to clsx for conditional Tailwind composition.
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(' ')
}
