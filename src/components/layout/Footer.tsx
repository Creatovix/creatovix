"use client";
import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer ref={footerRef} className="relative bg-[#05030d] border-t border-white/10 pt-16 pb-8 font-mono" style={{ fontFamily: `'DM Mono', 'Courier New', monospace` }}>
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,77,0,0.02) 1px, transparent 1px),linear-gradient(90deg, rgba(255,77,0,0.02) 1px, transparent 1px)", backgroundSize: "48px 48px", opacity: 0.5 }} />
      
      <div className="max-w-[1600px] mx-auto xl:px-10 px-4 relative z-10">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 xl:gap-16 mb-16 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="/" className="inline-flex items-center gap-0 font-bebas text-[1.8rem] tracking-[0.12em] text-white no-underline mb-4">
              <span className="text-white">CREAT</span><span className="text-[#ff4d00]">O</span><span className="text-white">VIX</span>
            </a>
            <p className="text-[13px] text-white/40 leading-[1.7] mb-6 max-w-[280px]">
              Crafting premium digital experiences that captivate, convert, and scale. Let's build your next big thing.
            </p>
            <div className="flex gap-3">
              {["Tw", "Li", "Gh", "Dr"].map((p, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-[#ff4d00] hover:bg-white/10 transition-all duration-300 text-xs font-dmMono">
                  {p}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-dmMono text-[11px] tracking-[0.3em] uppercase text-[#ff4d00] mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About", "Services", "Portfolio", "Process"].map((link, i) => (
                <li key={i}><a href={`#${link.toLowerCase()}`} className="text-[13px] text-white/50 hover:text-white transition-colors duration-300 block">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-dmMono text-[11px] tracking-[0.3em] uppercase text-[#00c8ff] mb-5">Services</h4>
            <ul className="space-y-3">
              {["Web Design", "Graphic Design", "Web Development", "Full Stack", "Shopify"].map((s, i) => (
                <li key={i}><a href="#services" className="text-[13px] text-white/50 hover:text-white transition-colors duration-300 block">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-dmMono text-[11px] tracking-[0.3em] uppercase text-[#a855f7] mb-5">Stay Updated</h4>
            <p className="text-[13px] text-white/40 leading-[1.6] mb-4">Subscribe for design tips, dev insights, and agency updates.</p>
            <form className="flex">
              <input type="email" placeholder="your@email.com" className="flex-1 px-3 py-2.5 rounded-l-lg bg-white/5 border border-white/10 border-r-0 text-white placeholder-white/30 focus:outline-none focus:border-[#a855f7] text-sm" />
              <button type="button" className="px-4 py-2.5 rounded-r-lg bg-gradient-to-r from-[#a855f7] to-[#10d4a0] text-white text-sm hover:opacity-90 transition-opacity">→</button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-[12px] text-white/30 font-dmMono tracking-wide">
            © {new Date().getFullYear()} CREATOVIX. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[11px] text-white/30 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-[11px] text-white/30 hover:text-white transition-colors">Terms of Service</a>
            <button onClick={scrollToTop} className="text-[11px] text-white/50 hover:text-[#ff4d00] transition-colors flex items-center gap-1 font-dmMono">
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
      `}</style>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        @font-face { font-family: 'Bebas Neue'; font-style: normal; font-weight: 400; src: local('Bebas Neue'), url('https://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg1_i6t8kCHKm459WxRxC7m0dR7G4w.woff2') format('woff2'); }
        @font-face { font-family: 'DM Mono'; font-style: normal; font-weight: 400; src: local('DM Mono'), url('https://fonts.gstatic.com/s/dmmono/v5/aFTR7PB1QTsUX8KYvrGyDQ.woff2') format('woff2'); }
      `}</style>
    </footer>
  );
}