'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

const services = [
  {
    num: '01',
    icon: '⚙️',
    title: 'Full Stack Development',
    desc: 'End-to-end web applications built with React, Next.js, Node.js, and modern databases. From idea to deployed product.',
    tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
    accentColor: '#C4622D',
    image: 'https://placehold.co/800x500/1A1916/C4622D?text=Full+Stack',
  },
  {
    num: '02',
    icon: '🎨',
    title: 'Web Design',
    desc: 'Stunning, conversion-focused website designs translated into pixel-perfect live experiences your users will love.',
    tags: ['UI/UX', 'Figma', 'Responsive', 'CRO'],
    accentColor: '#4A90C2',
    image: 'https://placehold.co/800x500/1A1916/4A90C2?text=Web+Design',
  },
  {
    num: '03',
    icon: '🛒',
    title: 'Shopify Development',
    desc: 'High-converting Shopify stores with custom themes, apps, and integrations built to maximize your revenue.',
    tags: ['Liquid', 'Custom Themes', 'Apps', 'SEO'],
    accentColor: '#9AB84A',
    image: 'https://placehold.co/800x500/1A1916/9AB84A?text=Shopify',
  },
  {
    num: '04',
    icon: '📝',
    title: 'WordPress Development',
    desc: 'Custom WordPress themes and plugins tailored to your exact needs, with WooCommerce and SEO baked in.',
    tags: ['Custom Themes', 'WooCommerce', 'ACF', 'SEO'],
    accentColor: '#7B6CE8',
    image: 'https://placehold.co/800x500/1A1916/7B6CE8?text=WordPress',
  },
  {
    num: '05',
    icon: '✏️',
    title: 'Graphic Design',
    desc: 'Memorable brand identities and visual assets — logos, print materials, social graphics — that tell your story.',
    tags: ['Logo', 'Branding', 'Print', 'Social'],
    accentColor: '#E84E9C',
    image: 'https://placehold.co/800x500/1A1916/E84E9C?text=Graphic+Design',
  },
  {
    num: '06',
    icon: '📱',
    title: 'UI/UX Strategy',
    desc: 'User research and strategic design thinking that creates intuitive, engaging products people actually enjoy using.',
    tags: ['Research', 'Wireframes', 'Usability', 'Testing'],
    accentColor: '#2DAE85',
    image: 'https://placehold.co/800x500/1A1916/2DAE85?text=UI/UX',
  },
]

export default function Services() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo('.service-card-new', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true }
      })
    }
    init()
  }, [])

  return (
    <section ref={ref} id="services" style={{ background: '#FAFAF8', padding: 'clamp(4rem, 8vw, 8rem) 0' }}>
      <div className="container">

        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div>
            <span className="tag" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>Our Services</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.0, fontSize: 'clamp(2rem, 4vw, 3.5rem)', margin: 0 }}>
              Everything your digital<br />
              <span style={{ color: '#C4622D' }}>business needs.</span>
            </h2>
          </div>
        </div>

        {/* Services Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }} className="services-grid-outer">
          {services.map((svc, i) => (
            <div
              key={i}
              className="service-card-new"
              style={{
                opacity: 0,
                background: '#fff',
                border: '1px solid #E8E6E1',
                borderRadius: 0,
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                // Rounded corners only on edges of the grid
                borderTopLeftRadius: i === 0 ? 24 : 0,
                borderTopRightRadius: i === 2 ? 24 : 0,
                borderBottomLeftRadius: i === 3 ? 24 : 0,
                borderBottomRightRadius: i === 5 ? 24 : 0,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#FAFAF8';
                (e.currentTarget as HTMLElement).style.zIndex = '2';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(26,25,22,0.1)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#fff';
                (e.currentTarget as HTMLElement).style.zIndex = '1';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              {/* Number */}
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 500,
                color: 'black', letterSpacing: '0.06em', display: 'block', marginBottom: 20,
              }}>{svc.num}</span>

              {/* Icon */}
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: svc.accentColor + '14',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, marginBottom: 20,
                border: `1.5px solid ${svc.accentColor}22`,
              }}>
                {svc.icon}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700,
                letterSpacing: '-0.03em', color: '#1A1916', marginBottom: 10, lineHeight: 1.3,
              }}>{svc.title}</h3>

              <p style={{ fontSize: 15.5, color: '#6B6860', lineHeight: 1.7, marginBottom: 20 }}>
                {svc.desc}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {svc.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '4px 10px', background: '#F4F3EF', border: '1px solid #E8E6E1',
                    borderRadius: 6, fontSize: 13, color: '#6B6860', fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.03em',
                  }}>{tag}</span>
                ))}
              </div>

              {/* Accent bottom line */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: 3, background: svc.accentColor,
                transform: 'scaleX(0)', transformOrigin: 'left',
                transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
              }} className={`service-accent-${i}`} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: 'clamp(2rem, 4vw, 3rem)', display: 'flex', justifyContent: 'center' }}>
          <Link href="#contact" className="btn-outline">
            Discuss Your Project
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .services-grid-outer { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .services-grid-outer { grid-template-columns: 1fr !important; } }
        .service-card-new:hover .service-accent-0,
        .service-card-new:hover .service-accent-1,
        .service-card-new:hover .service-accent-2,
        .service-card-new:hover .service-accent-3,
        .service-card-new:hover .service-accent-4,
        .service-card-new:hover .service-accent-5 { transform: scaleX(1) !important; }
      `}</style>
    </section>
  )
}