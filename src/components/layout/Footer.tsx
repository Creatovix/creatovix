"use client"
import Link from 'next/link'

const services = ['Full Stack Development', 'Web Design', 'WordPress Development', 'Shopify Development', 'Graphic Design', 'UI/UX Strategy']
const company = ['About', 'Our Work', 'Team', 'Process', 'Contact']
const social = [{ label: 'LI', name: 'LinkedIn', href: '#' }, { label: 'TW', name: 'Twitter', href: '#' }, { label: 'DR', name: 'Dribbble', href: '#' }, { label: 'GH', name: 'GitHub', href: '#' }]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: '#1A1916', paddingTop: 'clamp(3.5rem, 6vw, 5rem)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 'clamp(2rem, 4vw, 3.5rem)', paddingBottom: 'clamp(3rem, 5vw, 4rem)', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="footer-grid">
          <div style={{ gridColumn: '1 / 2' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: '1.25rem' }}>
              <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 800 }}>DC</div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, letterSpacing: '-0.03em', color: '#fff' }}>DevCraft<span style={{ color: '#C4622D' }}>Studio</span></span>
            </Link>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, marginBottom: '1.75rem', maxWidth: 230 }}>Crafting digital experiences that grow businesses — from apps to storefronts.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {social.map(s => (
                <a key={s.name} href={s.href} aria-label={s.name} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 500, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'; }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {[{ title: 'Services', items: services.map(s => ({ label: s, href: '#services' })) }, { title: 'Company', items: company.map(c => ({ label: c, href: `#${c.toLowerCase().replace(' ', '-')}` })) }].map(col => (
            <div key={col.title}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '1.25rem' }}>{col.title}</p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.items.map(item => (
                  <li key={item.label}><Link href={item.href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.48)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.88)')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.48)')}>{item.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '1.25rem' }}>Get In Touch</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li><a href="mailto:hello@devcraftstudio.com" style={{ fontSize: 13, color: 'rgba(255,255,255,0.48)', textDecoration: 'none' }}>hello@devcraftstudio.com</a></li>
              <li><a href="https://wa.me/1234567890" style={{ fontSize: 13, color: 'rgba(255,255,255,0.48)', textDecoration: 'none' }}>WhatsApp Us</a></li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80', display: 'block', animation: 'footPulse 2.5s ease infinite' }} />
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Available for projects</span>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', padding: '1.25rem 0' }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)' }}>© {year} DevCraft Studio. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service'].map(t => <Link key={t} href="#" style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)', textDecoration: 'none' }}>{t}</Link>)}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes footPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 540px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}