'use client'

import { useEffect, useRef } from 'react'

const stats = [
  { value: 140, suffix: '+', label: 'Projects Delivered', desc: 'Across 15+ industries worldwide' },
  { value: 98, suffix: '%', label: 'Client Satisfaction', desc: 'Based on post-project surveys' },
  { value: 6, suffix: '+', label: 'Years Experience', desc: 'Building digital products' },
  { value: 50, suffix: '+', label: 'Happy Clients', desc: 'From startups to enterprises' },
]

export default function Stats() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      stats.forEach((stat, i) => {
        const el = document.getElementById(`stat-num-${i}`)
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, { val: stat.value, duration: 2, ease: 'power2.out', onUpdate() { if (el) el.textContent = Math.round(obj.val) + stat.suffix }, scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } })
      })
      gsap.fromTo('.stat-item', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } })
    }
    init()
  }, [])

  return (
    <section ref={ref} className="section-tight" style={{ background: '#fff', borderTop: '1px solid #E8E6E1', borderBottom: '1px solid #E8E6E1' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }} className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item" style={{ opacity: 0, padding: 'clamp(1.5rem, 3vw, 2.5rem)', borderRight: i < 3 ? '1px solid #E8E6E1' : 'none' }}>
              <p id={`stat-num-${i}`} style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.2rem, 3.5vw, 3.5rem)', letterSpacing: '-0.05em', color: '#1A1916', lineHeight: 1, marginBottom: 8 }}>0{stat.suffix}</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1916', marginBottom: 4 }}>{stat.label}</p>
              <p style={{ fontSize: 12, color: '#9B9891', lineHeight: 1.5 }}>{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .stats-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}