import en from './en.json'

/**
 * Active locale. Swap this import to switch languages (e.g. import fr from './fr.json').
 */
const locale = en

/**
 * Retrieves a localized string by dot-notation key.
 * Returns a fallback string if the key is not found.
 *
 * @param {string} key  - Dot-separated key, e.g. 'common.signIn'
 * @param {string} [fallback] - Value returned when key is missing
 */
export function t(key, fallback = key) {
    return key.split('.').reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : undefined), locale) ?? fallback
}

export default locale
