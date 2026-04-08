'use client'

import { useEffect, useRef } from 'react'

const testimonials = [
  { name: 'Sarah Mitchell', role: 'CEO, Luminary Skincare', initials: 'SM', color: '#C4622D', quote: 'DevCraft Studio completely transformed our Shopify store. Our conversion rate jumped by 38% in the first month. The team understood our brand vision immediately and delivered beyond expectations.' },
  { name: 'James Okonkwo', role: 'Founder, TechFlow SaaS', initials: 'JO', color: '#3A7FBD', quote: 'We needed a complex full-stack dashboard built fast and built right. DevCraft delivered a scalable, beautiful product in under 6 weeks. Zero surprises — excellent communication throughout.' },
  { name: 'Priya Mehta', role: 'Marketing Director, NourishCo', initials: 'PM', color: '#1D9E75', quote: 'The WordPress site they built is lightning fast, easy to manage, and ranks on page one of Google. The graphic design work for our rebrand was outstanding. Truly a one-stop shop.' },
  { name: 'Daniel Reeves', role: 'Owner, Reeves Real Estate', initials: 'DR', color: '#6B5CE7', quote: 'Professional, responsive, and incredibly talented. 60% more leads, lower bounce rate, and countless compliments from clients after the redesign. I cannot recommend them enough.' },
  { name: 'Aisha Balogun', role: 'Co-Founder, Verdant Wellness', initials: 'AB', color: '#E83E8C', quote: 'From logo to Shopify store to social media templates, DevCraft handled everything. The brand identity they created is exactly what we envisioned — modern, clean, and memorable.' },
  { name: 'Chris Harrington', role: 'CTO, Stackwise Analytics', initials: 'CH', color: '#8CB33A', quote: 'Technically outstanding team. They architected and built our data platform from scratch — clean TypeScript, proper testing, and CI/CD from day one. Would absolutely work with them again.' },
]

const trustMetrics = [
  { num: '140+', label: 'Projects delivered' },
  { num: '4.9★', label: 'Average rating' },
  { num: '98%', label: 'Would recommend us' },
  { num: '85%', label: 'Repeat clients' },
]

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo('.testi-card', { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.09, scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true } })
    }
    init()
  }, [])

  return (
    <section ref={ref} className="section" style={{ background: '#FAFAF8' }}>
      <div className="container">
        <div style={{ maxWidth: 520, marginBottom: 'clamp(3rem, 5vw, 4rem)' }}>
          <span className="tag" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>Client Reviews</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.1, marginBottom: '1rem' }}>Don't take our word<br />for it.</h2>
          <p style={{ fontSize: 14.5, color: '#6B6860', lineHeight: 1.75 }}>Real feedback from real clients who trusted us to build their digital future.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2rem' }} className="testi-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testi-card card" style={{ opacity: 0, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: 3 }}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} width="13" height="13" viewBox="0 0 14 14" fill="#F59E0B"><path d="M7 1l1.5 3.5 3.8.5-2.8 2.6.7 3.8L7 9.8 3.8 11.4l.7-3.8L1.7 5l3.8-.5z" /></svg>
                ))}
              </div>
              <p style={{ fontSize: 13.5, color: '#6B6860', lineHeight: 1.75, flex: 1 }}>"{t.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: '1rem', borderTop: '1px solid #E8E6E1' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, flexShrink: 0, background: t.color + '18', color: t.color }}>{t.initials}</div>
                <div>
                  <p style={{ fontSize: 13.5, fontWeight: 600, color: '#1A1916' }}>{t.name}</p>
                  <p style={{ fontSize: 12, color: '#9B9891', marginTop: 2 }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #E8E6E1', borderRadius: 20, padding: 'clamp(1.5rem, 3vw, 2rem) clamp(1.5rem, 4vw, 3rem)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }} className="trust-bar">
          {trustMetrics.map((m, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, borderLeft: i > 0 ? '1px solid #E8E6E1' : 'none', paddingLeft: i > 0 ? '1.5rem' : 0 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 2.5vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#1A1916', lineHeight: 1 }}>{m.num}</span>
              <span style={{ fontSize: 12, color: '#9B9891', textAlign: 'center' }}>{m.label}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .testi-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .testi-grid, .trust-bar { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}