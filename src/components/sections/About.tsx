'use client'

import { useEffect, useRef } from 'react'

const values = [
  { num: '01', title: 'Quality First', desc: 'We obsess over every detail — clean code, pixel-perfect design, and seamless user experiences.' },
  { num: '02', title: 'Transparent Process', desc: "Clear communication, honest timelines, and no surprises. You're always in the loop." },
  { num: '03', title: 'Results Driven', desc: "We don't just build beautiful things. We build things that convert, retain, and grow." },
  { num: '04', title: 'Long-term Partnership', desc: "We're your dedicated digital partner, not a one-time vendor. Your success is ours." },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo('.about-left-el', { opacity: 0, x: -45 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true } })
      gsap.fromTo('.about-value', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: ref.current, start: 'top 73%', once: true } })
    }
    init()
  }, [])

  return (
    <section ref={ref} id="about" className="section" style={{ background: '#F4F3EF' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(3rem, 6vw, 7rem)', alignItems: 'start' }} className="about-grid">
          <div className="about-left-el" style={{ opacity: 0 }}>
            <span className="tag" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>About Us</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              A team that cares<br /><em style={{ fontStyle: 'normal', color: '#C4622D' }}>about your success.</em>
            </h2>
            <p style={{ fontSize: 16, color: '#6B6860', lineHeight: 1.8, marginBottom: '1.25rem' }}>We are a collective of developers, designers, and strategists passionate about building digital products that make a real difference. Founded with the belief that every business deserves world-class digital craftsmanship.</p>
            <p style={{ fontSize: 16, color: '#6B6860', lineHeight: 1.8, marginBottom: '2rem' }}>Our multi-disciplinary team brings deep expertise across full-stack development, e-commerce, CMS platforms, and visual design. Every project gets fresh eyes and strategic thinking.</p>
            <div style={{ borderLeft: '3px solid #C4622D', paddingLeft: '1.25rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', background: '#fff', borderRadius: '0 12px 12px 0' }}>
              <p style={{ fontSize: 16, color: '#6B6860', lineHeight: 1.7 }}><strong style={{ color: '#1A1916' }}>"Great digital products are not built in isolation."</strong> We collaborate closely with clients, treating every engagement as a true partnership.</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 1.5, border: '1px solid #E8E6E1', borderRadius: 20, overflow: 'hidden', background: '#E8E6E1' }}>
            {values.map((v) => (
              <div key={v.num} className="about-value" style={{ opacity: 0, display: 'flex', gap: '1.25rem', alignItems: 'flex-start', background: '#fff', padding: '1.75rem', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#FAFAF8')}
                onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: '#9B9891', letterSpacing: '0.08em', paddingTop: 4, flexShrink: 0, width: 28 }}>{v.num}</span>
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, letterSpacing: '-0.01em' }}>{v.title}</h4>
                  <p style={{ fontSize: 16, color: '#6B6860', lineHeight: 1.65 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .about-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}