'use client'

import { useEffect, useRef, useState } from 'react'

const serviceOptions = ['Full Stack Development', 'Web Design', 'WordPress Development', 'Shopify Development', 'Graphic Design', 'UI/UX Strategy', "Not sure yet — let's talk"]
const budgetOptions = ['< $1,000', '$1k – $5k', '$5k – $15k', '$15k+']

interface FormState { name: string; email: string; company: string; service: string; budget: string; message: string }

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const [form, setForm] = useState<FormState>({ name: '', email: '', company: '', service: '', budget: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo('.contact-left', { opacity: 0, x: -44 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true } })
      gsap.fromTo('.contact-right', { opacity: 0, x: 44 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true } })
    }
    init()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  const inputStyle: React.CSSProperties = { width: '100%', padding: '11px 14px', fontFamily: 'var(--font-body)', fontSize: 14, color: '#1A1916', background: '#FAFAF8', border: '1.5px solid #E8E6E1', borderRadius: 12, outline: 'none', transition: 'border-color 0.2s' }

  return (
    <section ref={ref} id="contact" className="section" style={{ background: '#F4F3EF' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'clamp(3rem, 6vw, 7rem)', alignItems: 'start' }} className="contact-grid">

          {/* Left */}
          <div className="contact-left" style={{ opacity: 0 }}>
            <span className="tag" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>Contact Us</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.1, marginBottom: '1.25rem', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
              Let's build something<br />great <span style={{ color: '#C4622D' }}>together.</span>
            </h2>
            <p style={{ fontSize: 14.5, color: '#6B6860', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: 400 }}>
              Tell us about your project and we'll get back to you within 24 hours with a free consultation and honest recommendations.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 1.5, border: '1px solid #E8E6E1', borderRadius: 20, overflow: 'hidden', background: '#E8E6E1', marginBottom: '2rem' }}>
              {[
                { icon: '✉️', label: 'Email us', value: 'hello@devcraftstudio.com', href: 'mailto:hello@devcraftstudio.com' },
                { icon: '💬', label: 'WhatsApp', value: '+1 (234) 567-8900', href: 'https://wa.me/1234567890' },
                { icon: '🕐', label: 'Response time', value: 'Within 24 hours', href: null },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', padding: '1.25rem 1.5rem', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#FAFAF8')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: '#F4F3EF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9B9891', marginBottom: 3 }}>{item.label}</p>
                    {item.href ? <a href={item.href} style={{ fontSize: 14, fontWeight: 500, color: '#1A1916', textDecoration: 'none' }}>{item.value}</a> : <p style={{ fontSize: 14, fontWeight: 500, color: '#1A1916' }}>{item.value}</p>}
                  </div>
                </div>
              ))}
            </div>

            {['Free initial consultation — no commitment required', 'Transparent pricing — you always know what you\'re paying for', 'On-time delivery — we respect your deadlines', 'Dedicated point of contact for every project'].map(point => (
              <div key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(196,98,45,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C4622D' }} />
                </div>
                <p style={{ fontSize: 13.5, color: '#6B6860', lineHeight: 1.65 }}>{point}</p>
              </div>
            ))}
          </div>

          {/* Right form */}
          <div className="contact-right" style={{ opacity: 0, background: '#fff', border: '1px solid #E8E6E1', borderRadius: 20, overflow: 'hidden' }}>
            {submitted ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '3rem 2rem', minHeight: 480, gap: '1.25rem' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#F0FDF4', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.03em' }}>Message sent!</h3>
                <p style={{ fontSize: 14, color: '#6B6860', lineHeight: 1.7, maxWidth: 300 }}>We'll review your project details and get back to you within 24 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', service: '', budget: '', message: '' }) }} className="btn-outline" style={{ marginTop: 8 }}>Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ padding: 'clamp(1.75rem, 3vw, 2.5rem)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ marginBottom: 4 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.03em', marginBottom: 4 }}>Tell us about your project</h3>
                  <p style={{ fontSize: 12, color: '#9B9891' }}>Fields marked * are required</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                  {[{ id: 'name', label: 'Your name *', placeholder: 'John Smith', type: 'text', required: true }, { id: 'email', label: 'Email address *', placeholder: 'john@company.com', type: 'email', required: true }].map(f => (
                    <div key={f.id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label htmlFor={f.id} style={{ fontSize: 12, fontWeight: 500, color: '#6B6860' }}>{f.label}</label>
                      <input id={f.id} name={f.id} type={f.type} required={f.required} placeholder={f.placeholder} value={(form as any)[f.id]} onChange={handleChange} style={inputStyle} onFocus={e => (e.target.style.borderColor = '#1A1916')} onBlur={e => (e.target.style.borderColor = '#E8E6E1')} />
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label htmlFor="company" style={{ fontSize: 12, fontWeight: 500, color: '#6B6860' }}>Company / Project name</label>
                  <input id="company" name="company" type="text" placeholder="Acme Inc." value={form.company} onChange={handleChange} style={inputStyle} onFocus={e => (e.target.style.borderColor = '#1A1916')} onBlur={e => (e.target.style.borderColor = '#E8E6E1')} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label htmlFor="service" style={{ fontSize: 12, fontWeight: 500, color: '#6B6860' }}>Service needed</label>
                  <div style={{ position: 'relative' }}>
                    <select id="service" name="service" value={form.service} onChange={handleChange} style={{ ...inputStyle, appearance: 'none', paddingRight: '2.5rem', cursor: 'pointer' }}>
                      <option value="">Select a service...</option>
                      {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#9B9891" strokeWidth="2"><path d="M4 6l4 4 4-4" strokeLinecap="round" /></svg>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: '#6B6860' }}>Estimated budget</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }} className="budget-grid">
                    {budgetOptions.map(b => (
                      <button key={b} type="button" onClick={() => setForm(p => ({ ...p, budget: b }))} style={{ fontSize: 12, fontWeight: 500, padding: '10px 8px', borderRadius: 12, border: `1.5px solid ${form.budget === b ? '#1A1916' : '#E8E6E1'}`, background: form.budget === b ? '#1A1916' : '#FAFAF8', color: form.budget === b ? '#fff' : '#6B6860', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }}>{b}</button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label htmlFor="message" style={{ fontSize: 12, fontWeight: 500, color: '#6B6860' }}>Project details *</label>
                  <textarea id="message" name="message" required rows={4} placeholder="Describe what you want to build, your goals, timeline, and any relevant details..." value={form.message} onChange={handleChange} style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }} onFocus={e => (e.target.style.borderColor = '#1A1916')} onBlur={e => (e.target.style.borderColor = '#E8E6E1')} />
                </div>

                <button type="submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, padding: '1rem', background: loading ? '#6B6860' : '#1A1916', color: '#fff', borderRadius: 9999, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', width: '100%' }}>
                  {loading ? <>
                    <svg style={{ animation: 'spin 1s linear infinite' }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" /></svg>
                    Sending...
                  </> : <>Send Message <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 14L14 2M14 2H6M14 2v8" strokeLinecap="round" /></svg></>}
                </button>

                <p style={{ textAlign: 'center', fontSize: 11, color: '#9B9891' }}>By submitting you agree to our <a href="#" style={{ textDecoration: 'underline', color: '#9B9891' }}>Privacy Policy</a></p>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 480px) { .form-row, .budget-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}