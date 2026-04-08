'use client'

import { useEffect, useRef, useState } from 'react'

const services = [
  'Full Stack Development',
  'Web Design',
  'WordPress Development',
  'Shopify Development',
  'Graphic Design',
  'UI/UX Strategy',
  'Not sure yet — let\'s talk'
]

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    service: '', 
    message: '' 
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1 }
    )

    const left = ref.current?.querySelector('.contact-left')
    const right = ref.current?.querySelector('.contact-right')
    if (left) observer.observe(left)
    if (right) observer.observe(right)

    return () => observer.disconnect()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section ref={ref} id="contact" className="section bg-bg">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side */}
          <div className="contact-left reveal">
            <span className="tag mb-4">Contact Us</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Let's build something<br />
              <span className="text-accent-warm">great together.</span>
            </h2>
            <p className="text-lg text-ink-secondary mb-8">
              Tell us about your project and we'll get back to you within 24 hours with a free consultation.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: '✉️', label: 'Email', value: 'hello@devcraftstudio.com', href: 'mailto:hello@devcraftstudio.com' },
                { icon: '💬', label: 'WhatsApp', value: '+1 (234) 567-8900', href: 'https://wa.me/1234567890' },
                { icon: '🕐', label: 'Response', value: 'Within 24 hours', href: null },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-bg-surface rounded-xl border border-border-soft hover:border-accent-warm/50 transition-colors">
                  <div className="w-12 h-12 bg-bg-alt rounded-lg flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-ink-tertiary mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-medium text-ink hover:text-accent-warm transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium text-ink">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {[
                'Free initial consultation',
                'Transparent pricing',
                'On-time delivery',
                'Dedicated support'
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent-warm/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-accent-warm" />
                  </div>
                  <span className="text-ink-secondary">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <div className="contact-right reveal">
            {submitted ? (
              <div className="card p-12 text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-2xl mb-3">Message Sent!</h3>
                <p className="text-ink-secondary mb-6">We'll review your project and get back within 24 hours.</p>
                <button 
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', service: '', message: '' }) }}
                  className="btn-outline"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-8 space-y-6">
                <div>
                  <h3 className="font-display font-bold text-2xl mb-2">Tell us about your project</h3>
                  <p className="text-sm text-ink-tertiary">Fields marked * are required</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ink-secondary mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-secondary mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink-secondary mb-2">Service Needed *</label>
                  <select
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    className="input-field appearance-none cursor-pointer"
                  >
                    <option value="">Select a service...</option>
                    {services.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink-secondary mb-2">Project Details *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe what you want to build, your goals, timeline, and any relevant details..."
                    className="input-field resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}