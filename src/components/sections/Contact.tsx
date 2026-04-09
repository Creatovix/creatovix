'use client'

import { useEffect, useRef, useState } from 'react'

const services = [
  'Full Stack Development', 'Web Design', 'WordPress Development',
  'Shopify Development', 'Graphic Design', 'UI/UX Strategy', 'Not sure yet — let\'s talk',
]

const budgets = ['Under $2k', '$2k – $5k', '$5k – $15k', '$15k+']

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const [form, setForm] = useState({ name: '', email: '', service: '', budget: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo('.contact-left', { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true }
      })
      gsap.fromTo('.contact-right', { opacity: 0, x: 40 }, {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true }
      })
    }
    init()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  const inputStyle = (name: string) => ({
    width: '100%', padding: '13px 16px',
    fontFamily: 'var(--font-body)', fontSize: 14, color: '#1A1916',
    background: focused === name ? '#fff' : '#F9F8F6',
    border: focused === name ? '1.5px solid #C4622D' : '1.5px solid #E0DDD8',
    borderRadius: 12, outline: 'none', transition: 'all 0.2s',
    boxShadow: focused === name ? '0 0 0 4px rgba(196,98,45,0.08)' : 'none',
  })

  return (
    <section ref={ref} id="contact" style={{ background: '#F5F3F0', padding: 'clamp(4rem, 8vw, 8rem) 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 'clamp(2rem, 5vw, 6rem)', alignItems: 'start' }} className="contact-grid">

          {/* Left */}
          <div className="contact-left" style={{ opacity: 0, position: 'sticky', top: 120 }}>
            <span className="tag" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>Contact Us</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.0, fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: '1.25rem' }}>
              Let's build something<br /><span style={{ color: '#C4622D' }}>great together.</span>
            </h2>
            <p style={{ fontSize: 16, color: '#6B6860', lineHeight: 1.25, marginBottom: '2rem' }}>
              Tell us about your project and we'll get back to you within 24 hours with a free consultation.
            </p>

            {/* Contact methods */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: '2rem' }}>
              {[
                { icon: '✉️', label: 'Email', value: 'hello@devcraftstudio.com', href: 'mailto:hello@devcraftstudio.com' },
                { icon: '💬', label: 'WhatsApp', value: '+1 (234) 567-8900', href: 'https://wa.me/1234567890' },
                { icon: '⏱', label: 'Response Time', value: 'Within 24 hours', href: null },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                  background: '#fff', border: '1px solid #E8E6E1', borderRadius: 14,
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C4622D30'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(26,25,22,0.06)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E8E6E1'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  <div style={{
                    width: 42, height: 42, background: '#F4F3EF', borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0,
                  }}>{item.icon}</div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9B9891', margin: '0 0 2px' }}>{item.label}</p>
                    {item.href ? (
                      <a href={item.href} style={{ fontWeight: 600, fontSize: 16, color: '#1A1916', textDecoration: 'none', letterSpacing: '-0.02em' }}>{item.value}</a>
                    ) : (
                      <p style={{ fontWeight: 600, fontSize: 13.5, color: '#1A1916', margin: 0, letterSpacing: '-0.02em' }}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Free initial consultation', 'Transparent pricing', 'On-time delivery', 'Dedicated project support'].map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(196,98,45,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" fill="none" stroke="#C4622D" viewBox="0 0 24 24" strokeWidth={3}>
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 16, color: '#6B6860' }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact-right" style={{ opacity: 0 }}>
            {submitted ? (
              <div style={{
                background: '#fff', border: '1px solid #E8E6E1', borderRadius: 24,
                padding: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center',
              }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <svg width="32" height="32" fill="none" stroke="#22C55E" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.04em', marginBottom: '0.75rem' }}>Message Sent!</h3>
                <p style={{ fontSize: 14.5, color: '#6B6860', marginBottom: '2rem', lineHeight: 1.7 }}>We'll review your project details and get back to you within 24 hours with a free consultation.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', service: '', budget: '', message: '' }) }} className="btn-outline">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid #E8E6E1', borderRadius: 24, padding: 'clamp(1.75rem, 3.5vw, 2.75rem)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.9rem', letterSpacing: '-0.04em', marginBottom: '0.375rem' }}>Tell us about your project</h3>
                  <p style={{ fontSize: 15, color: '#9B9891' }}>Fields marked * are required</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#6B6860', marginBottom: 7, letterSpacing: '-0.01em' }}>Your Name *</label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="John Smith"
                      style={inputStyle('name')} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#6B6860', marginBottom: 7, letterSpacing: '-0.01em' }}>Email Address *</label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="john@company.com"
                      style={inputStyle('email')} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />
                  </div>
                </div>

                <div className="form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#6B6860', marginBottom: 7, letterSpacing: '-0.01em' }}>Service Needed *</label>
                    <select name="service" required value={form.service} onChange={handleChange}
                      style={{ ...inputStyle('service'), cursor: 'pointer' }} onFocus={() => setFocused('service')} onBlur={() => setFocused(null)}>
                      <option value="">Select a service...</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#6B6860', marginBottom: 7, letterSpacing: '-0.01em' }}>Project Details *</label>
                  <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
                    placeholder="Describe what you want to build, your goals, timeline, and any relevant details..."
                    style={{ ...inputStyle('message'), resize: 'none', lineHeight: 1.65 }}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} />
                </div>

                <button type="submit" disabled={loading} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: '100%', padding: '15px 24px', borderRadius: 12, border: 'none',
                  background: loading ? '#6B6860' : '#1A1916',
                  color: '#fff', fontSize: 14.5, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.25s', letterSpacing: '-0.01em',
                  boxShadow: '0 4px 16px rgba(26,25,22,0.15)',
                }}
                  onMouseEnter={e => { if (!loading) { (e.currentTarget as HTMLElement).style.background = '#C4622D'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(196,98,45,0.35)'; } }}
                  onMouseLeave={e => { if (!loading) { (e.currentTarget as HTMLElement).style.background = '#1A1916'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(26,25,22,0.15)'; } }}
                >
                  {loading ? (
                    <>
                      <svg style={{ animation: 'spin 1s linear infinite' }} width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>Send Message
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" />
                      </svg>
                    </>
                  )}
                </button>

                <p style={{ fontSize: 14, color: '#9B9891', textAlign: 'center' }}>
                  Free consultation · No commitment · Response within 24 hours
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } .contact-left { position: static !important; } }
        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}