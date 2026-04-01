import { memo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheckCircle, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import Navbar from '../components/common/Navbar'
import AppFooter from '../components/common/AppFooter'
import { brand, footerBrand, footerColumns } from '../data/siteContent'
import { featureNavGroups } from '../data/featurePagesContent'

const USE_CASES = [
  'Logistics & delivery routing',
  'Fleet management & telematics',
  'Automotive / in-vehicle navigation',
  'Field workforce management',
  'Consumer location app',
  'Government / civic platform',
  'Real estate / property tech',
  'Other',
]

const TEAM_SIZES = [
  'Just me',
  '2–10 people',
  '11–50 people',
  '51–200 people',
  '200+ people',
]

const INITIAL_FORM = {
  name: '',
  email: '',
  company: '',
  phone: '',
  teamSize: '',
  useCase: '',
  message: '',
}

function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (!form.email.trim()) next.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address'
    if (!form.useCase) next.useCase = 'Please select your primary use case'
    return next
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }
    setSubmitting(true)
    // Simulate async submission — replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 1400))
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen"
    >
      <Navbar
        variant="glass"
        logo={{ name: brand.name }}
        navItems={featureNavGroups.primary}
        activeLabel="Contact"
        logoTo="/"
        cta={{ label: 'View Pricing', href: '/pricing', type: 'router' }}
      />

      <main className="pb-20 pt-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:items-start lg:px-8">

          {/* Left column — context */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">Contact Us</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
              Let&apos;s talk about what you are building.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-[var(--text-soft)]">
              Whether you want a product demo, pilot discussion, or integration guidance, this form goes directly to our team.
            </p>

            <div className="mt-10 space-y-5">
              {[
                { icon: FiMail, label: 'General enquiries', value: 'hello@navfy.com', href: 'mailto:hello@navfy.com' },
                { icon: FiMail, label: 'Enterprise sales', value: 'sales@navfy.com', href: 'mailto:sales@navfy.com' },
                { icon: FiMail, label: 'Careers', value: 'careers@navfy.com', href: 'mailto:careers@navfy.com' },
                { icon: FiPhone, label: 'Developer support', value: '+91 80 4600 1234', href: 'tel:+918046001234' },
                { icon: FiMapPin, label: 'Head office', value: 'Navfy Technologies, Whitefield, Bengaluru 560066', href: null },
              ].map(({ icon: IconComponent, label, value, href }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <IconComponent size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-soft)]">{label}</p>
                    {href ? (
                      <a href={href} className="mt-0.5 text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] transition">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm text-[var(--text)]">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Current support stage</p>
              <div className="mt-6 space-y-4">
                {[
                  { label: 'Demo request follow-up', time: 'Usually within 1-2 business days' },
                  { label: 'Pilot scoping calls', time: 'Scheduled based on availability' },
                  { label: 'Enterprise requirement review', time: 'Handled as a custom discussion' },
                  { label: 'Support model', time: 'Early-stage team support (no SLA yet)' },
                ].map(({ label, time }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text)]">{label}</span>
                    <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="sticky top-24 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center py-12 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                    <FiCheckCircle size={32} />
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">Message received</h2>
                  <p className="mt-3 max-w-xs text-sm leading-7 text-[var(--text-soft)]">
                    Thank you, <strong>{form.name.split(' ')[0]}</strong>. Your message is in our queue and we will reply as soon as possible at <strong>{form.email}</strong>.
                  </p>
                  <button
                    onClick={() => { setForm(INITIAL_FORM); setSubmitted(false) }}
                    className="mt-8 rounded-full border border-[var(--line)] px-6 py-2.5 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  <h2 className="text-xl font-semibold tracking-[-0.03em]">Send us a message</h2>

                  {/* Name + Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name" required error={errors.name}>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Priya Sharma"
                        className={inputClass(errors.name)}
                      />
                    </Field>
                    <Field label="Work email" required error={errors.email}>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="priya@company.com"
                        className={inputClass(errors.email)}
                      />
                    </Field>
                  </div>

                  {/* Company + Phone */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Company">
                      <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Acme Logistics"
                        className={inputClass()}
                      />
                    </Field>
                    <Field label="Phone (optional)">
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className={inputClass()}
                      />
                    </Field>
                  </div>

                  {/* Team size */}
                  <Field label="Team size">
                    <select name="teamSize" value={form.teamSize} onChange={handleChange} className={inputClass()}>
                      <option value="">Select team size</option>
                      {TEAM_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>

                  {/* Use case */}
                  <Field label="Primary use case" required error={errors.useCase}>
                    <select name="useCase" value={form.useCase} onChange={handleChange} className={inputClass(errors.useCase)}>
                      <option value="">Select use case</option>
                      {USE_CASES.map((u) => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </Field>

                  {/* Message */}
                  <Field label="Message">
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us what you are building and what you need from Navfy..."
                      className={inputClass()}
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-[var(--accent)] py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? 'Sending…' : 'Send message'}
                  </button>

                  <p className="text-center text-xs text-[var(--text-soft)]">
                    By submitting, you agree to our{' '}
                    <a href="#" className="text-[var(--accent)] underline underline-offset-2">Privacy Policy</a>.
                    We never share your data with third parties.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </main>

      <AppFooter
        variant="glass"
        brand={{
          name: footerBrand.name,
          heading: footerBrand.heading,
          description: footerBrand.description,
        }}
        socialLinks={[
          { icon: 'github', href: '#', label: 'GitHub' },
          { icon: 'linkedin', href: '#', label: 'LinkedIn' },
          { icon: 'x', href: '#', label: 'X' },
        ]}
        columns={footerColumns}
      />
    </motion.div>
  )
}

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-[var(--text)]">
        {label}{required && <span className="ml-0.5 text-[var(--accent)]">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

function inputClass(error) {
  return [
    'w-full rounded-xl border px-4 py-3 text-sm outline-none transition',
    'bg-[var(--bg)] text-[var(--text)] placeholder-[var(--text-soft)]',
    error
      ? 'border-red-400 focus:border-red-500'
      : 'border-[var(--line)] focus:border-[var(--accent)]',
  ].join(' ')
}

export default memo(Contact)
