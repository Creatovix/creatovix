'use client'

import { useEffect, useRef } from 'react'

const steps = [
  { num: '01', title: 'Discovery & Strategy', desc: 'We deeply understand your business, goals, target audience, and competition. This phase defines the strategic foundation for every decision.', duration: '1–2 days' },
  { num: '02', title: 'Design & Prototyping', desc: 'Our designers craft wireframes and high-fidelity mockups. You see and approve the visual direction before a single line of code is written.', duration: '3–7 days' },
  { num: '03', title: 'Development', desc: 'Our engineers build your product with clean, scalable code. Daily updates keep you informed as designs come to life.', duration: '1–4 weeks' },
  { num: '04', title: 'Review & Refine', desc: 'We test rigorously across all devices and browsers. Your feedback shapes the final polish — we iterate until everything is perfect.', duration: '3–5 days' },
  { num: '05', title: 'Launch & Support', desc: 'We handle deployment, go-live monitoring, and ongoing support. Your product keeps performing at its best long after launch.', duration: 'Ongoing' },
]

export default function Process() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo('.proc-step', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.13, scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true } })
      gsap.fromTo('.proc-line', { scaleY: 0, transformOrigin: 'top' }, { scaleY: 1, duration: 1.5, ease: 'power3.inOut', scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true } })
    }
    init()
  }, [])

  return (
    <section ref={ref} className="section" style={{ background: '#FAFAF8' }}>
      <div className="container">
        <div style={{ maxWidth: 520, marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
          <span className="tag" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>Our Process</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.1 }}>How we go from idea<br />to shipped product.</h2>
        </div>

        <div style={{ position: 'relative', maxWidth: 860 }}>
          <div className="proc-line" style={{ position: 'absolute', left: 88, top: 28, bottom: 28, width: 1, background: '#E8E6E1' }} />
          {steps.map((step, i) => (
            <div key={i} className="proc-step" style={{ opacity: 0, display: 'grid', gridTemplateColumns: '88px 1px 1fr', gap: '0 2rem', alignItems: 'start', marginBottom: i < steps.length - 1 ? '2.5rem' : 0 }}>
              <div style={{ textAlign: 'right', paddingTop: 2 }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.06em', color: '#1A1916', lineHeight: 1, marginBottom: 6 }}>{step.num}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9B9891', whiteSpace: 'nowrap' }}>{step.duration}</p>
              </div>
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1A1916', border: '2px solid #FAFAF8', boxShadow: '0 0 0 1px #D1CEC7', flexShrink: 0, marginLeft: -4.5 }} />
              </div>
              <div style={{ paddingBottom: '1rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: '#6B6860', lineHeight: 1.75, maxWidth: 500 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}