'use client'

import { useEffect, useRef } from 'react'

const team = [
  { name: 'Ahmad Raza', role: 'Lead Full Stack Developer', initials: 'AR', color: '#3A7FBD', bio: 'Architect of our most complex applications. 8 years across React, Node.js, and cloud infrastructure.', skills: ['React', 'Next.js', 'Node.js', 'AWS'] },
  { name: 'Sara Khalid', role: 'UI/UX & Web Designer', initials: 'SK', color: '#E83E8C', bio: 'Creates beautiful, intuitive interfaces. Sara has designed for brands across fintech, e-commerce, and healthcare.', skills: ['Figma', 'Webflow', 'Branding', 'Prototyping'] },
  { name: 'Usman Tariq', role: 'WordPress & Shopify Expert', initials: 'UT', color: '#8CB33A', bio: 'Our e-commerce and CMS specialist. Has built 60+ Shopify and WordPress sites that rank and convert.', skills: ['Shopify', 'WordPress', 'WooCommerce', 'SEO'] },
  { name: 'Zara Noor', role: 'Graphic Designer', initials: 'ZN', color: '#C4622D', bio: 'Brand identity expert with a sharp eye for detail. Turns ideas into visual identities that stand the test of time.', skills: ['Illustrator', 'Photoshop', 'Brand Identity', 'Print'] },
  { name: 'Hassan Ali', role: 'Backend & DevOps Engineer', initials: 'HA', color: '#6B5CE7', bio: 'Ensures our applications are fast, secure, and always online. Expert in scalable architecture and CI/CD.', skills: ['Node.js', 'Docker', 'PostgreSQL', 'CI/CD'] },
  { name: 'Fatima Sheikh', role: 'Project Manager & Strategist', initials: 'FS', color: '#1D9E75', bio: 'Keeps every project on track and every client in the loop. Bridges strategy and execution flawlessly.', skills: ['Strategy', 'Agile', 'Client Relations', 'Planning'] },
]

export default function Team() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo('.team-card', { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true } })
    }
    init()
  }, [])

  return (
    <section ref={ref} id="team" className="section" style={{ background: '#F4F3EF' }}>
      <div className="container">
        <div style={{ maxWidth: 560, marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <span className="tag" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>The Team</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.1, marginBottom: '1rem' }}>The people behind<br />your product.</h2>
          <p style={{ fontSize: 14.5, color: '#6B6860', lineHeight: 1.75 }}>A tight-knit team of specialists who bring deep expertise and genuine passion to every project.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }} className="team-grid">
          {team.map((m, i) => (
            <div key={i} className="team-card card" style={{ opacity: 0, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ width: 56, height: 56, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, background: m.color + '16', color: m.color, border: `1.5px solid ${m.color}28` }}>{m.initials}</div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 3 }}>{m.name}</h3>
                <p style={{ fontSize: 12, fontWeight: 600, color: m.color }}>{m.role}</p>
              </div>
              <p style={{ fontSize: 13.5, color: '#6B6860', lineHeight: 1.7 }}>{m.bio}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingTop: '0.75rem', borderTop: '1px solid #E8E6E1' }}>
                {m.skills.map(s => <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#9B9891', background: '#F4F3EF', border: '1px solid #E8E6E1', borderRadius: 9999, padding: '3px 10px' }}>{s}</span>)}
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