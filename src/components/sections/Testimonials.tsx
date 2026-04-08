'use client'

import { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const testimonials = [
  { 
    name: 'Sarah Mitchell', 
    role: 'CEO, Luminary Skincare', 
    quote: 'DevCraft Studio completely transformed our Shopify store. Our conversion rate jumped by 38% in the first month.',
    image: 'https://placehold.co/100x100/D4703A/FFFFFF?text=SM',
    rating: 5
  },
  { 
    name: 'James Okonkwo', 
    role: 'Founder, TechFlow SaaS', 
    quote: 'We needed a complex full-stack dashboard built fast. DevCraft delivered a scalable product in under 6 weeks.',
    image: 'https://placehold.co/100x100/4A90C2/FFFFFF?text=JO',
    rating: 5
  },
  { 
    name: 'Priya Mehta', 
    role: 'Marketing Director, NourishCo', 
    quote: 'The WordPress site they built is lightning fast and ranks on page one of Google. Outstanding work!',
    image: 'https://placehold.co/100x100/2DAE85/FFFFFF?text=PM',
    rating: 5
  },
  { 
    name: 'Daniel Reeves', 
    role: 'Owner, Reeves Real Estate', 
    quote: 'Professional, responsive, and incredibly talented. 60% more leads after the redesign.',
    image: 'https://placehold.co/100x100/7B6CE8/FFFFFF?text=DR',
    rating: 5
  },
  { 
    name: 'Aisha Balogun', 
    role: 'Co-Founder, Verdant Wellness', 
    quote: 'From logo to Shopify store, DevCraft handled everything. The brand identity is exactly what we envisioned.',
    image: 'https://placehold.co/100x100/E84E9C/FFFFFF?text=AB',
    rating: 5
  },
]

export default function Testimonials() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1 }
    )

    const el = document.querySelector('.testimonials-section')
    if (el) observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="testimonials-section section bg-bg-soft reveal">
      <div className="container">
        <div className="section-header text-center mx-auto">
          <span className="tag mb-4">Client Reviews</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            Don't take our word<br />for it.
          </h2>
          <p className="text-lg text-ink-secondary max-w-2xl mx-auto">
            Real feedback from real clients who trusted us to build their digital future.
          </p>
        </div>

        <div className="relative max-w-[1440px] mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="card h-full p-6 flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <svg key={j} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-ink-secondary leading-relaxed mb-6 flex-1">"{t.quote}"</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-ink">{t.name}</p>
                      <p className="text-sm text-ink-tertiary">{t.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-bg-surface border border-border rounded-full flex items-center justify-center shadow-lg hover:bg-ink hover:text-white transition-all -ml-6 z-10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-bg-surface border border-border rounded-full flex items-center justify-center shadow-lg hover:bg-ink hover:text-white transition-all -mr-6 z-10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          {[
            { num: '140+', label: 'Projects Delivered' },
            { num: '4.9★', label: 'Average Rating' },
            { num: '98%', label: 'Would Recommend' },
            { num: '85%', label: 'Repeat Clients' },
          ].map((m, i) => (
            <div key={i} className="text-center p-6 bg-bg-surface rounded-2xl border border-border-soft">
              <p className="font-display font-extrabold text-3xl text-accent-warm mb-1">{m.num}</p>
              <p className="text-sm text-ink-tertiary">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}