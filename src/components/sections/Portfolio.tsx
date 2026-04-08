'use client'

import { useEffect, useRef, useState } from 'react'

const categories = ['All', 'Full Stack', 'Shopify', 'WordPress', 'Design']
const projects = [
  { num: '01', title: 'Luxe Commerce Store', category: 'Shopify', tags: ['Shopify', 'Liquid', 'Custom Theme'], desc: 'High-converting fashion e-commerce store with custom Shopify theme, upsell flows, and 3× revenue growth post-launch.', color: '#C4622D' },
  { num: '02', title: 'SaaS Analytics Dashboard', category: 'Full Stack', tags: ['Next.js', 'TypeScript', 'PostgreSQL'], desc: 'Real-time analytics platform serving 10k+ daily active users. Built with Next.js, Supabase, and D3.js visualizations.', color: '#3A7FBD' },
  { num: '03', title: 'Healthcare Brand Identity', category: 'Design', tags: ['Branding', 'Logo', 'Print'], desc: 'Complete brand identity system for a modern healthcare startup — logo, typography, color system, and full collateral.', color: '#6B5CE7' },
  { num: '04', title: 'Real Estate Platform', category: 'WordPress', tags: ['WordPress', 'WooCommerce', 'ACF'], desc: 'Property listing platform with advanced search, agent profiles, and virtual tour integration. 40% faster than before.', color: '#8CB33A' },
  { num: '05', title: 'Restaurant Ordering App', category: 'Full Stack', tags: ['React', 'Node.js', 'Stripe'], desc: 'Full-stack online ordering with real-time kitchen dashboard, live order tracking, and Stripe payment integration.', color: '#E83E8C' },
  { num: '06', title: 'Wellness Subscription Store', category: 'Shopify', tags: ['Shopify', 'Custom App', 'Subscriptions'], desc: 'Subscription-based wellness store with custom bundling app, loyalty program, and 4.9★ customer rating.', color: '#1D9E75' },
]

export default function Portfolio() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo('.port-card', { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true } })
    }
    init()
  }, [])

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import('gsap')
      gsap.fromTo('.port-card', { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', stagger: 0.06 })
    }
    animate()
  }, [active])

  return (
    <section ref={ref} id="portfolio" className="section" style={{ background: '#F4F3EF' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'end', marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)' }} className="port-header">
          <div>
            <span className="tag" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>Our Work</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.1 }}>Projects we're<br />proud of.</h2>
          </div>
          <p style={{ fontSize: 14.5, color: '#6B6860', lineHeight: 1.75 }}>A curated selection across industries. Every build starts with strategy and ends with measurable results.</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '2rem' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{ fontSize: 13, fontWeight: 500, padding: '8px 18px', borderRadius: 9999, border: `1.5px solid ${active === cat ? '#1A1916' : '#E8E6E1'}`, background: active === cat ? '#1A1916' : '#fff', color: active === cat ? '#fff' : '#6B6860', cursor: 'pointer', transition: 'all 0.2s' }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }} className="port-grid">
          {filtered.map(p => (
            <div key={p.num} className="port-card card" style={{ opacity: 0 }}>
              <div style={{ height: 192, position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden', borderBottom: `1px solid ${p.color}22`, background: p.color + '12' }}>
                <div style={{ width: '100%', padding: '1.5rem' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 1, marginBottom: 12, color: p.color + '55' }}>{p.num}</p>
                  {[55, 85, 40].map((w, i) => <div key={i} style={{ height: 6, borderRadius: 4, marginBottom: 8, width: `${w}%`, background: p.color + '28' }} />)}
                </div>
                <span style={{ position: 'absolute', top: 14, right: 14, fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#fff', background: p.color, padding: '5px 12px', borderRadius: 9999 }}>{p.category}</span>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: '#6B6860', lineHeight: 1.7, marginBottom: '1rem' }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {p.tags.map(t => <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#9B9891', background: '#F4F3EF', border: '1px solid #E8E6E1', borderRadius: 9999, padding: '3px 10px' }}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #E8E6E1' }}>
          <p style={{ fontSize: 14.5, color: '#6B6860' }}>We've delivered 140+ projects across diverse industries.</p>
          <a href="#contact" className="btn-outline" style={{ fontSize: 13 }}>Discuss your project →</a>
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .port-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .port-grid, .port-header { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}