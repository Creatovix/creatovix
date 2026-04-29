"use client";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Types
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  quote: string;
  project: string;
  color: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "CEO",
    company: "TechStore Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote: "Working with this team transformed our online presence completely. The attention to detail and creative approach exceeded our expectations. Our conversion rate increased by 300% within the first month.",
    project: "E-Commerce Platform",
    color: "#ff4d00",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Creative Director",
    company: "Luxe Beauty",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote: "The brand identity they created for us is absolutely stunning. They truly understood our vision and brought it to life in ways we couldn't have imagined. Professional, creative, and incredibly talented.",
    project: "Brand Identity System",
    color: "#00c8ff",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "DataFlow",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote: "The dashboard they built for us is intuitive, beautiful, and powerful. Our team loves using it every day. The development process was smooth and they delivered on time.",
    project: "SaaS Dashboard",
    color: "#a855f7",
  },
  {
    id: "4",
    name: "David Park",
    role: "CTO",
    company: "FinanceHub",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote: "Exceptional technical expertise combined with great design sensibility. The mobile banking app they built is secure, fast, and our users love the interface. Highly recommend!",
    project: "Mobile Banking App",
    color: "#10d4a0",
  },
  {
    id: "5",
    name: "Amanda Foster",
    role: "Owner",
    company: "Bistro Moderne",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote: "Our new website has completely transformed how customers interact with our restaurant. The reservation system works flawlessly and the design perfectly captures our ambiance.",
    project: "Restaurant Website",
    color: "#f59e0b",
  },
  {
    id: "6",
    name: "James Wilson",
    role: "VP of Operations",
    company: "GlobalTech",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote: "The corporate portal they developed has streamlined our internal processes significantly. Their understanding of enterprise needs and ability to deliver a polished product is impressive.",
    project: "Corporate Portal",
    color: "#ff4d00",
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const renderStars = (rating: number, color: string) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={i < rating ? color : "rgba(255,255,255,0.2)"}
            style={{
              filter: i < rating ? `drop-shadow(0 0 8px ${color}66)` : "none",
            }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-[10vh] xl:py-[14vh] overflow-hidden font-mono"
      style={{
        fontFamily: `'DM Mono', 'Courier New', monospace`,
        background: "linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)",
      }}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 80% 50% at 20% 40%, rgba(255,77,0,0.10) 0%, transparent 50%),
          radial-gradient(ellipse 60% 40% at 80% 60%, rgba(0,200,255,0.08) 0%, transparent 50%)
        `,
      }} />

      {/* Animated grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,77,0,0.04) 1px, transparent 1px),linear-gradient(90deg, rgba(255,77,0,0.04) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        animation: "testimonialsGridDrift 28s linear infinite",
        opacity: 0.6,
      }} />

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.02) 3px, rgba(0,0,0,0.02) 4px)",
        opacity: 0.4,
      }} />

      {/* Decorative glows */}
      <div className="absolute pointer-events-none rounded-full blur-[90px] w-[700px] h-[700px] top-[-120px] left-[-180px]" style={{ background: "radial-gradient(circle, rgba(255,77,0,0.11), transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[90px] w-[550px] h-[550px] bottom-[-80px] right-[-100px]" style={{ background: "radial-gradient(circle, rgba(16,212,160,0.09), transparent 70%)" }} />

      <div className="max-w-[1600px] mx-auto xl:px-10 px-4 relative z-10">
        
        {/* Section Header */}
        <div className={`text-center max-w-[640px] mx-auto mb-12 xl:mb-16 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="inline-block w-[52px] h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
            <span className="text-[10.5px] tracking-[0.38em] text-[#ff4d00] uppercase">Testimonials</span>
            <span className="inline-block w-[52px] h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
          </div>
          <h2 className="font-bebas text-[clamp(38px,5.5vw,62px)] text-white leading-[1.02] tracking-[0.03em] m-0 mb-4">
            Client<br />
            <span className="text-[#ff4d00] drop-shadow-[0_0_50px_rgba(255,77,0,0.45)]">Success Stories</span>
          </h2>
          <p className="text-[13.5px] text-white/50 leading-[1.75] max-w-[480px] mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        {/* Swiper Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: ".testimonials-prev",
              nextEl: ".testimonials-next",
            }}
            pagination={{
              el: ".testimonials-pagination",
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            effect="fade"
            fadeEffect={{
              crossFade: true,
            }}
            speed={800}
            loop={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="testimonials-swiper"
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id}>
                <div
                  className={`
                    transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                  `}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-center">
                    {/* Left: Quote & Content */}
                    <div className="order-2 lg:order-1">
                      {/* Quote Icon */}
                      <div className="mb-6">
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          style={{ color: testimonial.color }}
                        >
                          <path
                            d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                            fill="currentColor"
                            opacity="0.3"
                          />
                        </svg>
                      </div>

                      {/* Quote Text */}
                      <blockquote className="mb-8">
                        <p className="font-dmMono text-[15px] xl:text-[16px] text-white/80 leading-[1.85] italic">
                          "{testimonial.quote}"
                        </p>
                      </blockquote>

                      {/* Stars */}
                      <div className="mb-6">
                        {renderStars(testimonial.rating, testimonial.color)}
                      </div>

                      {/* Project Tag */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{
                        background: `rgba(5,3,13,0.8)`,
                        border: `1px solid ${testimonial.color}44`,
                      }}>
                        <span className="w-2 h-2 rounded-full" style={{ background: testimonial.color, boxShadow: `0 0 8px ${testimonial.color}` }} />
                        <span className="font-dmMono text-[10px] tracking-[0.25em] uppercase text-white/70">
                          {testimonial.project}
                        </span>
                      </div>

                      {/* Client Info */}
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2" style={{ borderColor: testimonial.color }}>
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bebas text-[22px] text-white leading-none mb-0.5">
                            {testimonial.name}
                          </h4>
                          <p className="font-dmMono text-[11px] text-white/50">
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Visual Element */}
                    <div className="order-1 lg:order-2 relative">
                      {/* Large Quote Background */}
                      <div className="relative h-[400px] xl:h-[500px] rounded-2xl overflow-hidden" style={{
                        background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)`,
                        border: `1px solid ${testimonial.color}33`,
                        boxShadow: `0 20px 60px rgba(0,0,0,0.3), 0 0 40px ${testimonial.color}22`,
                      }}>
                        {/* Client Image Large */}
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                          <div className="relative w-full h-full rounded-xl overflow-hidden" style={{
                            background: `radial-gradient(ellipse at center, ${testimonial.color}11, transparent 70%)`,
                          }}>
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
                              style={{ filter: "grayscale(100%)" }}
                            />
                            {/* Color overlay */}
                            <div className="absolute inset-0" style={{
                              background: `linear-gradient(135deg, ${testimonial.color}44, transparent)`,
                              mixBlendMode: "overlay",
                            }} />
                          </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-6 right-6 w-20 h-20 rounded-full" style={{
                          background: `radial-gradient(circle, ${testimonial.color}33, transparent 70%)`,
                          filter: "blur(20px)",
                        }} />
                        <div className="absolute bottom-6 left-6 w-16 h-16 rounded-full" style={{
                          background: `radial-gradient(circle, ${testimonial.color}22, transparent 70%)`,
                          filter: "blur(16px)",
                        }} />

                        {/* Rating Badge */}
                        <div className="absolute bottom-6 right-6 px-4 py-2 rounded-xl backdrop-blur-md" style={{
                          background: `rgba(5,3,13,0.9)`,
                          border: `1px solid ${testimonial.color}44`,
                        }}>
                          <div className="flex items-center gap-2">
                            {renderStars(5, testimonial.color)}
                            <span className="font-dmMono text-[10px] text-white/60 ml-2">5.0 Rating</span>
                          </div>
                        </div>

                        {/* Accent Corner */}
                        <div className="absolute top-0 right-0 w-24 h-24" style={{
                          background: `linear-gradient(135deg, ${testimonial.color}, transparent)`,
                          clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                          opacity: 0.6,
                        }} />
                      </div>

                      {/* Floating Stats */}
                      <div className="absolute -bottom-4 -left-4 xl:-left-8 flex gap-3">
                        <div className="px-4 py-3 rounded-xl backdrop-blur-md border" style={{
                          background: "rgba(5,3,13,0.9)",
                          borderColor: `${testimonial.color}44`,
                          boxShadow: `0 8px 32px rgba(0,0,0,0.3)`,
                        }}>
                          <div className="font-bebas text-[28px]" style={{ color: testimonial.color }}>98%</div>
                          <div className="font-dmMono text-[9px] text-white/50 tracking-wider uppercase">Satisfaction</div>
                        </div>
                        <div className="px-4 py-3 rounded-xl backdrop-blur-md border" style={{
                          background: "rgba(5,3,13,0.9)",
                          borderColor: `${testimonial.color}44`,
                          boxShadow: `0 8px 32px rgba(0,0,0,0.3)`,
                        }}>
                          <div className="font-bebas text-[28px]" style={{ color: testimonial.color }}>150+</div>
                          <div className="font-dmMono text-[9px] text-white/50 tracking-wider uppercase">Projects</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <button
            className="testimonials-prev absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 xl:w-14 xl:h-14 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              opacity: isHovering ? 1 : 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,77,0,0.2)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#ff4d00";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            className="testimonials-next absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 xl:w-14 xl:h-14 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              opacity: isHovering ? 1 : 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,77,0,0.2)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#ff4d00";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Custom Pagination */}
          <div className="testimonials-pagination flex justify-center gap-2 mt-12 xl:mt-16" />
        </div>

        {/* Stats Bar */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 xl:gap-6 mt-16 xl:mt-20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {[
            { value: "150+", label: "Happy Clients", icon: "👥" },
            { value: "98%", label: "Satisfaction", icon: "⭐" },
            { value: "5.0", label: "Average Rating", icon: "💯" },
            { value: "24/7", label: "Support", icon: "🎧" },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-5 xl:p-6 rounded-2xl backdrop-blur-md border text-center transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              }}
            >
              <div className="text-[24px] mb-2">{stat.icon}</div>
              <div className="font-bebas text-[28px] xl:text-[32px] text-white leading-none mb-1">{stat.value}</div>
              <div className="font-dmMono text-[10px] text-white/50 tracking-[0.2em] uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS */}
      <style>{`
        @keyframes testimonialsGridDrift {
          0% { background-position: 0 0; }
          100% { background-position: 64px 64px; }
        }
        
        .testimonials-swiper {
          overflow: visible !important;
        }
        
        .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          background: rgba(255,255,255,0.2) !important;
          opacity: 1 !important;
          transition: all 0.3s ease !important;
        }
        
        .swiper-pagination-bullet-active {
          width: 28px !important;
          border-radius: 4px !important;
          background: #ff4d00 !important;
          box-shadow: 0 0 12px rgba(255,77,0,0.6) !important;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        @font-face {
          font-family: 'Bebas Neue';
          font-style: normal;
          font-weight: 400;
          src: local('Bebas Neue'), url('https://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg1_i6t8kCHKm459WxRxC7m0dR7G4w.woff2') format('woff2');
        }
        @font-face {
          font-family: 'DM Mono';
          font-style: normal;
          font-weight: 400;
          src: local('DM Mono'), url('https://fonts.gstatic.com/s/dmmono/v5/aFTR7PB1QTsUX8KYvrGyDQ.woff2') format('woff2');
        }
      `}</style>
    </section>
  );
}