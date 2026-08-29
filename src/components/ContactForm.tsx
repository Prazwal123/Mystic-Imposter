'use client'

import { useState, FormEvent } from 'react'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

const initialState: FormState = { name: '', email: '', subject: '', message: '' }

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [errors, setErrors] = useState<Partial<FormState>>({})

  function validate(): boolean {
    const e: Partial<FormState> = {}
    if (!form.name.trim())    e.name    = 'Name is required.'
    if (!form.email.trim())   e.email   = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              e.email   = 'Please enter a valid email address.'
    if (!form.subject.trim()) e.subject = 'Subject is required.'
    if (!form.message.trim()) e.message = 'Message is required.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')

    // TODO: Connect to a real email service or API route.
    // Example: POST to /api/contact with the form data.
    // For now this simulates a network delay.
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('success')

    // Reset form after success
    setForm(initialState)
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Clear field error on change
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  if (status === 'success') {
    return (
      <div
        role="alert"
        className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-green-500/30 bg-green-500/5 p-10 text-center"
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500/10 text-green-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 className="text-[var(--text-primary)] font-semibold text-lg">
          Message sent!
        </h3>
        <p className="text-[var(--text-secondary)] text-sm max-w-sm">
          Thank you for reaching out. I&apos;ll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  const inputBase =
    'w-full rounded-xl border bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent disabled:opacity-50'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="space-y-5"
    >
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
          Name <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          disabled={status === 'submitting'}
          className={`${inputBase} ${errors.name ? 'border-red-500/60' : 'border-[var(--border-strong)]'}`}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
          Email <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          placeholder="your@email.com"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          disabled={status === 'submitting'}
          className={`${inputBase} ${errors.email ? 'border-red-500/60' : 'border-[var(--border-strong)]'}`}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
          Subject <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={handleChange}
          placeholder="What is this about?"
          aria-required="true"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          disabled={status === 'submitting'}
          className={`${inputBase} ${errors.subject ? 'border-red-500/60' : 'border-[var(--border-strong)]'}`}
        />
        {errors.subject && (
          <p id="subject-error" role="alert" className="mt-1.5 text-xs text-red-400">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
          Message <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Write your message here..."
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          disabled={status === 'submitting'}
          className={`${inputBase} resize-y min-h-32 ${errors.message ? 'border-red-500/60' : 'border-[var(--border-strong)]'}`}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
        style={{
          backgroundImage: 'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
        }}
      >
        {status === 'submitting' ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z" />
            </svg>
            Sending…
          </>
        ) : (
          <>
            Send Message
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
            </svg>
          </>
        )}
      </button>

      {status === 'error' && (
        <p role="alert" className="text-xs text-red-400 text-center">
          Something went wrong. Please try again or email me directly at{' '}
          <a href="mailto:prazwal.bhusal357@gmail.com" className="underline">
            prazwal.bhusal357@gmail.com
          </a>
          .
        </p>
      )}

      <p className="text-[var(--text-muted)] text-xs text-center">
        Fields marked with <span className="text-red-400">*</span> are required.
      </p>
    </form>
  )
}
