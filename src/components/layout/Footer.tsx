'use client'
import Link from 'next/link'

const services = ['Full Stack Development', 'Web Design', 'WordPress Development', 'Shopify Development', 'Graphic Design', 'UI/UX Strategy']
const company = ['About', 'Our Work', 'Team', 'Process', 'Contact']
const social = [
  { label: 'LI', name: 'LinkedIn', href: '#' },
  { label: 'TW', name: 'Twitter', href: '#' },
  { label: 'DR', name: 'Dribbble', href: '#' },
  { label: 'GH', name: 'GitHub', href: '#' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: '#111110', paddingTop: 'clamp(3.5rem, 6vw, 5rem)' }}>
      <div className="container">
        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 'clamp(2rem, 4vw, 4rem)', paddingBottom: 'clamp(2.5rem, 5vw, 4rem)', borderBottom: '1px solid rgba(255,255,255,0.06)' }} className="footer-grid">

          {/* Brand col */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: '1.25rem' }}>
              <div style={{ width: 34, height: 34, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 800, letterSpacing: '-0.02em' }}>CC</div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, letterSpacing: '-0.04em', color: '#fff' }}>Code<span style={{ color: '#C4622D' }}>Craft</span></span>
            </Link>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.25, marginBottom: '1.5rem', maxWidth: 240 }}>
              Crafting digital experiences that grow businesses — from full-stack apps to e-commerce storefronts.
            </p>

            {/* Available badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: 9999, padding: '6px 12px', marginBottom: '1.5rem' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ADE80', display: 'block', animation: 'footPulse 2.5s ease infinite' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(74,222,128,0.7)' }}>Available for projects</span>
            </div>

            {/* Social */}
            <div style={{ display: 'flex', gap: 8 }}>
              {social.map(s => (
                <a key={s.name} href={s.href} aria-label={s.name} style={{
                  width: 34, height: 34, borderRadius: 9, border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.85)',
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services col */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)', marginBottom: '1.25rem' }}>Services</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {services.map(s => (
                <li key={s}>
                  <Link href="#services" style={{ fontSize: 13, color: 'rgba(255,255,255,8)', textDecoration: 'none', transition: 'color 0.2s', letterSpacing: '-0.01em' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}>{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company col */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)', marginBottom: '1.25rem' }}>Company</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {company.map(c => (
                <li key={c}>
                  <Link href={`#${c.toLowerCase().replace(' ', '-')}`} style={{ fontSize: 13, color: 'rgba(255,255,255,8)', textDecoration: 'none', transition: 'color 0.2s', letterSpacing: '-0.01em' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}>{c}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)', marginBottom: '1.25rem' }}>Get In Touch</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: '1.5rem' }}>
              <a href="mailto:hello@devcraftstudio.com" style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s', letterSpacing: '-0.01em' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C4622D')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>hello@devcraftstudio.com</a>
              <a href="https://wa.me/1234567890" style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s', letterSpacing: '-0.01em' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C4622D')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>+1 (234) 567-8900</a>
            </div>
            {/* CTA */}
            <Link href="#contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              fontSize: 15, fontWeight: 600, padding: '10px 18px',
              borderRadius: 9999, background: '#C4622D', color: '#fff',
              textDecoration: 'none', transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(196,98,45,0.3)',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(196,98,45,0.4)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(196,98,45,0.3)'; }}
            >
              Start a Project
              <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" /></svg>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem', padding: '1.25rem 0' }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', letterSpacing: '-0.01em' }}>© {year} DevCraft Studio. All rights reserved.</p>
        </div>
      </div>

      <style>{`
        @keyframes footPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 540px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}