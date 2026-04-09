'use client'

import { useEffect, useRef } from 'react'

const team = [
  {
    name: 'Ahmad Raza', role: 'Lead Full Stack Developer', initials: 'AR',
    image: 'https://placehold.co/400x400/E8F0F8/4A90C2?text=AR',
    bio: 'Architect of complex applications. 8 years across React, Node.js, and cloud infrastructure.',
    skills: ['React', 'Next.js', 'Node.js', 'AWS'],
    accentColor: '#4A90C2',
  },
  {
    name: 'Sara Khalid', role: 'UI/UX & Web Designer', initials: 'SK',
    image: 'https://placehold.co/400x400/FCF0F7/E84E9C?text=SK',
    bio: 'Creates beautiful, intuitive interfaces for fintech and e-commerce brands worldwide.',
    skills: ['Figma', 'Webflow', 'Branding', 'Prototyping'],
    accentColor: '#E84E9C',
  },
  {
    name: 'Usman Tariq', role: 'WordPress & Shopify Expert', initials: 'UT',
    image: 'https://placehold.co/400x400/F3F8EB/9AB84A?text=UT',
    bio: 'Built 60+ Shopify and WordPress sites that rank on Google and convert browsers to buyers.',
    skills: ['Shopify', 'WordPress', 'WooCommerce', 'SEO'],
    accentColor: '#9AB84A',
  },
  {
    name: 'Zara Noor', role: 'Graphic Designer', initials: 'ZN',
    image: 'https://placehold.co/400x400/FAF0EC/C4622D?text=ZN',
    bio: 'Brand identity expert with a sharp eye for detail and a passion for visual storytelling.',
    skills: ['Illustrator', 'Photoshop', 'Brand Identity', 'Print'],
    accentColor: '#C4622D',
  },
  {
    name: 'Hassan Ali', role: 'Backend & DevOps Engineer', initials: 'HA',
    image: 'https://placehold.co/400x400/F2F0FC/7B6CE8?text=HA',
    bio: 'Ensures every application is fast, secure, scalable, and always online with zero downtime.',
    skills: ['Node.js', 'Docker', 'PostgreSQL', 'CI/CD'],
    accentColor: '#7B6CE8',
  },
  {
    name: 'Fatima Sheikh', role: 'Project Manager', initials: 'FS',
    image: 'https://placehold.co/400x400/EAF8F4/2DAE85?text=FS',
    bio: 'Keeps every project on track, on budget, and bridges the gap between strategy and execution.',
    skills: ['Strategy', 'Agile', 'Client Relations', 'Planning'],
    accentColor: '#2DAE85',
  },
]

export default function Team() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo('.team-card-new', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true }
      })
    }
    init()
  }, [])

  return (
    <section ref={ref} id="team" style={{ background: '#F5F3F0', padding: 'clamp(4rem, 8vw, 8rem) 0' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto clamp(2.5rem,5vw,4rem)' }}>
          <span className="tag" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>The Team</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.0, fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1rem' }}>
            The people behind<br />your product.
          </h2>
          <p style={{ fontSize: 16, color: '#6B6860', lineHeight: 1.75 }}>
            A tight-knit team of specialists who bring deep expertise and genuine passion to every single project.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(1rem, 2vw, 1.5rem)' }} className="team-grid">
          {team.map((m, i) => (
            <div
              key={i}
              className="team-card-new"
              style={{
                opacity: 0, background: '#fff', borderRadius: 20,
                border: '1px solid #E8E6E1', overflow: 'hidden',
                transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                cursor: 'default', position: 'relative',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(26,25,22,0.1)';
                (e.currentTarget as HTMLElement).style.borderColor = m.accentColor + '44';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.borderColor = '#E8E6E1';
              }}
            >
              {/* Photo + overlay */}
              <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
                <img src={m.image} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.2) 50%, transparent 100%)' }} />
                {/* Name/role on image bottom */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, letterSpacing: '-0.03em', color: '#1A1916', margin: 0, lineHeight: 1.2 }}>{m.name}</h3>
                  <p style={{ fontSize: 14, color: m.accentColor, fontWeight: 600, margin: '2px 0 0', letterSpacing: '-0.01em' }}>{m.role}</p>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
                <p style={{ fontSize: 15, color: '#6B6860', lineHeight: 1.65, marginBottom: 14 }}>{m.bio}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {m.skills.map(skill => (
                    <span key={skill} style={{
                      padding: '4px 10px', background: m.accentColor + '10',
                      border: `1px solid ${m.accentColor}25`, borderRadius: 6,
                      fontSize: 13, color: m.accentColor, fontWeight: 600,
                      letterSpacing: '-0.01em',
                    }}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .team-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .team-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}