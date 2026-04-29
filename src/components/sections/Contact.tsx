"use client";
import { useEffect, useRef, useState } from "react";

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", service: "", message: "" });
    setTimeout(() => setIsSuccess(false), 4000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-[10vh] xl:py-[14vh] overflow-hidden font-mono"
      style={{ fontFamily: `'DM Mono', 'Courier New', monospace`, background: "linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)" }}
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 80% 50% at 20% 40%, rgba(255,77,0,0.10) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(0,200,255,0.08) 0%, transparent 50%)` }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,77,0,0.04) 1px, transparent 1px),linear-gradient(90deg, rgba(255,77,0,0.04) 1px, transparent 1px)", backgroundSize: "64px 64px", animation: "contactGridDrift 28s linear infinite", opacity: 0.6 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.02) 3px, rgba(0,0,0,0.02) 4px)", opacity: 0.4 }} />
      <div className="absolute pointer-events-none rounded-full blur-[90px] w-[700px] h-[700px] top-[-120px] left-[-180px]" style={{ background: "radial-gradient(circle, rgba(255,77,0,0.11), transparent 70%)" }} />

      <div className="max-w-[1600px] mx-auto xl:px-10 px-4 relative z-10">
        {/* Header */}
        <div className={`text-center max-w-[640px] mx-auto mb-12 xl:mb-16 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="inline-block w-[52px] h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
            <span className="text-[10.5px] tracking-[0.38em] text-[#ff4d00] uppercase">Get In Touch</span>
            <span className="inline-block w-[52px] h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
          </div>
          <h2 className="font-bebas text-[clamp(38px,5.5vw,62px)] text-white leading-[1.02] tracking-[0.03em] m-0 mb-4">
            Let's Build<br />
            <span className="text-[#ff4d00] drop-shadow-[0_0_50px_rgba(255,77,0,0.45)]">Something Great</span>
          </h2>
          <p className="text-[13.5px] text-white/50 leading-[1.75] max-w-[480px] mx-auto">
            Ready to start your project? Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-16">
          
          {/* Form */}
          <form onSubmit={handleSubmit} className={`lg:col-span-3 space-y-5 transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="font-dmMono text-[11px] tracking-[0.2em] uppercase text-white/60 mb-2 block">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#ff4d00] focus:bg-white/10 focus:shadow-[0_0_20px_rgba(255,77,0,0.15)] transition-all duration-300 backdrop-blur-sm" placeholder="John Doe" />
              </div>
              <div>
                <label className="font-dmMono text-[11px] tracking-[0.2em] uppercase text-white/60 mb-2 block">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#ff4d00] focus:bg-white/10 focus:shadow-[0_0_20px_rgba(255,77,0,0.15)] transition-all duration-300 backdrop-blur-sm" placeholder="john@example.com" />
              </div>
            </div>
            
            <div>
              <label className="font-dmMono text-[11px] tracking-[0.2em] uppercase text-white/60 mb-2 block">Service Interested In</label>
              <select name="service" value={formData.service} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff4d00] focus:bg-white/10 focus:shadow-[0_0_20px_rgba(255,77,0,0.15)] transition-all duration-300 backdrop-blur-sm appearance-none cursor-pointer">
                <option value="" className="bg-[#0a0a0f]">Select a service</option>
                <option value="web-design" className="bg-[#0a0a0f]">Web Design</option>
                <option value="graphic-design" className="bg-[#0a0a0f]">Graphic Design</option>
                <option value="web-development" className="bg-[#0a0a0f]">Web Development</option>
                <option value="full-stack" className="bg-[#0a0a0f]">Full Stack</option>
                <option value="shopify" className="bg-[#0a0a0f]">Shopify</option>
                <option value="other" className="bg-[#0a0a0f]">Other</option>
              </select>
            </div>

            <div>
              <label className="font-dmMono text-[11px] tracking-[0.2em] uppercase text-white/60 mb-2 block">Project Details</label>
              <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#ff4d00] focus:bg-white/10 focus:shadow-[0_0_20px_rgba(255,77,0,0.15)] transition-all duration-300 backdrop-blur-sm resize-none min-h-[140px]" placeholder="Tell us about your goals, timeline, and budget..." />
            </div>

            <button type="submit" disabled={isSubmitting} className={`
              inline-flex items-center justify-center gap-3 py-4 px-10 w-full sm:w-auto font-dmMono text-[12px] tracking-[.22em] uppercase text-white no-underline rounded-xl
              transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${isSubmitting ? "bg-white/20 cursor-not-allowed" : "bg-gradient-to-br from-[#ff4d00] to-[#ff8c00] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,77,0,0.45)]"}
            `}>
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Sending...</span>
                </>
              ) : isSuccess ? (
                <>✅ Message Sent!</>
              ) : (
                <>Send Message <span>→</span></>
              )}
            </button>
          </form>

          {/* Contact Info */}
          <div className={`lg:col-span-2 space-y-8 transition-all duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="p-6 rounded-2xl backdrop-blur-md border border-white/10 bg-white/5">
              <h3 className="font-bebas text-[24px] text-white leading-none mb-4 tracking-[0.02em]">Contact Information</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#ff4d00] mt-1">✉</span>
                  <div>
                    <span className="font-dmMono text-[11px] text-white/50 tracking-[0.15em] uppercase block mb-1">Email</span>
                    <a href="mailto:hello@creativox.com" className="text-white hover:text-[#ff4d00] transition-colors">hello@creativox.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#00c8ff] mt-1">📞</span>
                  <div>
                    <span className="font-dmMono text-[11px] text-white/50 tracking-[0.15em] uppercase block mb-1">Phone</span>
                    <a href="tel:+15550000000" className="text-white hover:text-[#00c8ff] transition-colors">+1 (555) 000-0000</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#a855f7] mt-1">📍</span>
                  <div>
                    <span className="font-dmMono text-[11px] text-white/50 tracking-[0.15em] uppercase block mb-1">Location</span>
                    <span className="text-white">Remote Worldwide • NYC Based</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl backdrop-blur-md border border-white/10 bg-white/5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#10d4a0] animate-pulse shadow-[0_0_8px_#10d4a0]" />
                <span className="font-dmMono text-[11px] text-white/60 tracking-[0.2em] uppercase">Response Time</span>
              </div>
              <p className="text-[13px] text-white/50 leading-[1.6]">We typically respond within 24 hours on business days. For urgent inquiries, please call or DM us on social.</p>
            </div>

            <div>
              <span className="font-dmMono text-[11px] text-white/40 tracking-[0.25em] uppercase block mb-4">Follow Us</span>
              <div className="flex gap-3">
                {["Twitter", "LinkedIn", "GitHub", "Dribbble"].map((platform, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-[#ff4d00] hover:bg-white/10 transition-all duration-300" aria-label={platform}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={i === 0 ? "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" : i === 1 ? "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" : i === 2 ? "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" : "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"} /></svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes contactGridDrift { 0% { background-position: 0 0; } 100% { background-position: 64px 64px; } }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
      `}</style>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        @font-face { font-family: 'Bebas Neue'; font-style: normal; font-weight: 400; src: local('Bebas Neue'), url('https://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg1_i6t8kCHKm459WxRxC7m0dR7G4w.woff2') format('woff2'); }
        @font-face { font-family: 'DM Mono'; font-style: normal; font-weight: 400; src: local('DM Mono'), url('https://fonts.gstatic.com/s/dmmono/v5/aFTR7PB1QTsUX8KYvrGyDQ.woff2') format('woff2'); }
      `}</style>
    </section>
  );
}