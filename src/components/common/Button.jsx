import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import { buttonVariants } from '../../config/theme'

const sizeMap = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

/**
 * Generic, config-driven Button component.
 *
 * @prop {'primary'|'outline'} [variant='primary']
 * @prop {'glass'|'dark'|'black'|'teal'|'default'} [colorScheme='default']
 * @prop {'sm'|'md'|'lg'} [size='md']
 * @prop {string} [href]         - Renders as <a> when provided
 * @prop {boolean} [animate]     - Enables Framer Motion scale press animation
 * @prop {boolean} [disabled]
 * @prop {string} [className]    - Additional Tailwind classes  (appended last)
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    colorScheme = 'default',
    size = 'md',
    href,
    className,
    disabled = false,
    animate = false,
    type = 'button',
    ...props
  },
  ref,
) {
  const variantClass = buttonVariants[variant]?.[colorScheme] ?? buttonVariants[variant]?.default ?? ''
  const sizeClass = sizeMap[size] ?? sizeMap.md

  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-semibold transition',
    sizeClass,
    variantClass,
    disabled && 'cursor-not-allowed opacity-50',
    className,
  )

  if (animate) {
    return (
      <motion.button
        ref={ref}
        type={href ? undefined : type}
        as={href ? 'a' : undefined}
        href={href}
        whileHover={disabled ? {} : { scale: 1.05 }}
        whileTap={disabled ? {} : { scale: 0.95 }}
        className={classes}
        disabled={disabled}
        {...props}
      >
        {children}
      </motion.button>
    )
  }

  if (href) {
    const isInternalRoute = href.startsWith('/')

    if (isInternalRoute) {
      return (
        <Link ref={ref} to={href} className={classes} {...props}>
          {children}
        </Link>
      )
    }

    return (
      <a ref={ref} href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button ref={ref} type={type} className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  )
})

export default Button
