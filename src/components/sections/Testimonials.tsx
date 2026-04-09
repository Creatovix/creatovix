'use client'

import { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const testimonials = [
  {
    name: 'Sarah Mitchell', role: 'CEO, Luminary Skincare', initials: 'SM', color: '#C4622D',
    quote: 'DevCraft Studio completely transformed our Shopify store. Conversion rate jumped 38% in the first month alone. Absolutely outstanding work.',
    rating: 5, result: '+38% CVR',
  },
  {
    name: 'James Okonkwo', role: 'Founder, TechFlow SaaS', initials: 'JO', color: '#4A90C2',
    quote: 'We needed a complex full-stack dashboard built fast. DevCraft delivered a scalable, beautiful product in under 6 weeks. They exceeded every expectation.',
    rating: 5, result: '6 wks delivery',
  },
  {
    name: 'Priya Mehta', role: 'Marketing Director, NourishCo', initials: 'PM', color: '#2DAE85',
    quote: 'The WordPress site they built is lightning fast and ranks on page one of Google. Communication was excellent throughout. Outstanding.',
    rating: 5, result: 'Page 1 ranking',
  },
  {
    name: 'Daniel Reeves', role: 'Owner, Reeves Real Estate', initials: 'DR', color: '#7B6CE8',
    quote: 'Professional, responsive, and incredibly talented. We got 60% more qualified leads after the redesign. Best investment we\'ve made.',
    rating: 5, result: '+60% Leads',
  },
  {
    name: 'Aisha Balogun', role: 'Co-Founder, Verdant Wellness', initials: 'AB', color: '#E84E9C',
    quote: 'From logo to Shopify store, DevCraft handled everything with care. The brand identity is exactly what we envisioned. Truly a partner.',
    rating: 5, result: 'Full rebrand',
  },
]

export default function Testimonials() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active') }),
      { threshold: 0.1 }
    )
    const el = document.querySelector('.testimonials-wrap')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section style={{ background: '#FAFAF8', padding: 'clamp(4rem, 8vw, 8rem) 0' }}>
      <div className="container">

        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div>
            <span className="tag" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>Client Reviews</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.0, fontSize: 'clamp(2rem, 4vw, 3.5rem)', margin: 0 }}>
              Don't take our<br />word for it.
            </h2>
          </div>
          {/* Trust bar */}
          <div style={{ display: 'flex', gap: 'clamp(1.5rem, 3vw, 3rem)', flexWrap: 'wrap' }}>
            {[
              { num: '4.9★', label: 'Avg Rating' },
              { num: '98%', label: 'Would Recommend' },
              { num: '140+', label: 'Projects Done' },
            ].map((m, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '-0.04em', color: '#C4622D', margin: 0, lineHeight: 1 }}>{m.num}</p>
                <p style={{ fontSize: 11.5, color: '#9B9891', marginTop: 4, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Swiper */}
        <div className="testimonials-wrap reveal" style={{ position: 'relative' }}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{ nextEl: '.t-next', prevEl: '.t-prev' }}
            pagination={{ clickable: true, el: '.t-pagination' }}
            autoplay={{ delay: 5500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            style={{ paddingBottom: 52 }}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div style={{
                  background: '#fff', border: '1px solid #E8E6E1',
                  borderRadius: 20, padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                  height: '100%', display: 'flex', flexDirection: 'column',
                  position: 'relative', overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(26,25,22,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                >
                  {/* Top accent */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: t.color }} />

                  {/* Stars */}
                  <div style={{ display: 'flex', gap: 3, marginBottom: 16, paddingTop: 8 }}>
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <svg key={j} width="18" height="18" viewBox="0 0 20 20" fill="#F59E0B">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote mark */}
                  <div style={{ fontSize: 48, lineHeight: 1, color: t.color + '80', fontFamily: 'Georgia, serif', marginBottom: 4, marginTop: -8 }}>"</div>

                  <p style={{ fontSize: 15, color: '#4A4743', lineHeight: 1.72, flex: 1, marginBottom: 20 }}>{t.quote}</p>

                  {/* Result badge */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: t.color + '18', border: `1px solid ${t.color}28`, borderRadius: 8, padding: '5px 10px', marginBottom: 16, alignSelf: 'flex-start' }}>
                    <svg width="14" height="14" fill="none" stroke={t.color} viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path d="M13 7l5 5-5 5M6 12h12" strokeLinecap="round" />
                    </svg>
                    <span style={{ fontSize: 13, fontWeight: 700, color: t.color, letterSpacing: '-0.01em' }}>{t.result}</span>
                  </div>

                  {/* Author */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid #F0EDE8' }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: t.color + '18', color: t.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, flexShrink: 0,
                      border: `1.5px solid ${t.color}30`,
                    }}>{t.initials}</div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 15, color: '#1A1916', margin: 0, letterSpacing: '-0.02em' }}>{t.name}</p>
                      <p style={{ fontSize: 13, color: '#9B9891', margin: 0 }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Nav */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 8 }}>
            <button className="t-prev" style={{
              width: 40, height: 40, borderRadius: '50%', border: '1px solid #E0DDD8',
              background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', flexShrink: 0,
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1A1916'; (e.currentTarget as HTMLElement).style.borderColor = '#1A1916'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = '#E0DDD8'; }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" />
              </svg>
            </button>
            <div className="t-pagination" style={{ display: 'flex', gap: 6 }} />
            <button className="t-next" style={{
              width: 40, height: 40, borderRadius: '50%', border: '1px solid #E0DDD8',
              background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', flexShrink: 0,
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1A1916'; (e.currentTarget as HTMLElement).style.borderColor = '#1A1916'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = '#E0DDD8'; }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path d="M9 5l7 7-7 7" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .t-pagination .swiper-pagination-bullet { width: 6px; height: 6px; background: #C9C6C1; border-radius: 50%; cursor: pointer; transition: all 0.2s; }
        .t-pagination .swiper-pagination-bullet-active { background: #C4622D; width: 18px; border-radius: 3px; }
        .t-prev svg, .t-next svg { color: currentColor; }
        .t-prev:hover svg, .t-next:hover svg { color: #fff; }
      `}</style>
    </section>
  )
}