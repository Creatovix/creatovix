'use client'

import { useEffect, useRef } from 'react'

const services = [
  { icon: '⚙️', title: 'Full Stack Development', desc: 'End-to-end web applications built with React, Next.js, Node.js, and modern databases. Scalable, performant, and maintainable code that powers your business.', tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'TypeScript'], dotColor: '#C4622D' },
  { icon: '🎨', title: 'Web Design', desc: 'Stunning, conversion-focused website designs. Pixel-perfect Figma designs translated into live, responsive experiences that represent your brand beautifully.', tags: ['UI/UX Design', 'Figma', 'Prototyping', 'Responsive'], dotColor: '#3A7FBD' },
  { icon: '🟦', title: 'WordPress Development', desc: 'Custom WordPress themes and plugins tailored to your needs. Easy-to-manage CMS solutions that give you full control without the technical headache.', tags: ['Custom Themes', 'WooCommerce', 'ACF', 'Elementor', 'SEO'], dotColor: '#21759B' },
  { icon: '🛒', title: 'Shopify Development', desc: 'High-converting Shopify stores built for growth. From custom themes to complex integrations, we make your e-commerce store work as hard as you do.', tags: ['Liquid', 'Custom Themes', 'Apps', 'Checkout', 'Conversion'], dotColor: '#95BF47' },
  { icon: '✏️', title: 'Graphic Design', desc: 'Memorable brand identities, marketing materials, and visual assets that communicate your story. From logos to full brand systems — we make you unforgettable.', tags: ['Logo Design', 'Branding', 'Print', 'Social Media', 'Illustration'], dotColor: '#6B5CE7' },
  { icon: '📱', title: 'UI/UX Strategy', desc: 'User research, wireframing, and strategic design thinking to create digital products that are intuitive, beautiful, and business-effective.', tags: ['User Research', 'Wireframes', 'Usability', 'Accessibility'], dotColor: '#E83E8C' },
]

export default function Services() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo('.svc-card', { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true } })
    }
    init()
  }, [])

  return (
    <section ref={ref} id="services" className="section" style={{ background: '#FAFAF8' }}>
      <div className="container">
        <div style={{ maxWidth: 640, marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
          <span className="tag" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>Our Services</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, marginBottom: '1rem' }}>Everything your digital<br />business needs.</h2>
          <p style={{ fontSize: 15, color: '#6B6860', lineHeight: 1.75 }}>From concept to launch, we handle every layer of your digital presence — strategy, design, development, and beyond.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5, background: '#E8E6E1', border: '1.5px solid #E8E6E1', borderRadius: 28, overflow: 'hidden' }} className="svc-grid">
          {services.map((svc, i) => (
            <div key={i} className="svc-card" style={{ opacity: 0, background: '#fff', padding: 'clamp(1.75rem, 3vw, 2.5rem)', position: 'relative', overflow: 'hidden', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#F4F3EF')}
              onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, background: svc.dotColor + '14' }}>{svc.icon}</div>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: svc.dotColor, flexShrink: 0, marginTop: 8 }} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>{svc.title}</h3>
              <p style={{ fontSize: 13.5, color: '#6B6860', lineHeight: 1.7, marginBottom: '1.25rem' }}>{svc.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {svc.tags.map(t => (
                  <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#9B9891', background: '#F4F3EF', border: '1px solid #E8E6E1', borderRadius: 9999, padding: '3px 10px', letterSpacing: '0.02em' }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .svc-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .svc-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}