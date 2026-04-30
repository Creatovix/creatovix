"use client";
import { useEffect, useRef, useState } from "react";

const SERVICES = [
  { value: "web-design",       label: "Web Design" },
  { value: "graphic-design",   label: "Graphic Design" },
  { value: "web-development",  label: "Web Development" },
  { value: "full-stack",       label: "Full Stack" },
  { value: "shopify",          label: "Shopify" },
  { value: "other",            label: "Other" },
];

const SOCIALS = [
  { label: "Instagram", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
  { label: "LinkedIn",  icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
  { label: "Twitter/X", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg> },
  { label: "Dribbble",  icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg> },
];

const CONTACT_INFO = [
  { accent: "#ff4d00", label: "Email",    value: "hello@creatovix.com",      href: "mailto:hello@creatovix.com",  icon: "✉" },
  { accent: "#00c8ff", label: "Phone",    value: "+1 (555) 000-0000",         href: "tel:+15550000000",             icon: "☎" },
  { accent: "#a855f7", label: "Location", value: "Remote Worldwide · PKbased", href: null,                          icon: "◎" },
];

const bebasFont = { fontFamily: "'Bebas Neue','Impact',sans-serif" };
const monoFont  = { fontFamily: "'DM Mono','Courier New',monospace" };

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FormField({
  label, children, delay, inView,
}: { label: string; children: React.ReactNode; delay: number; inView: boolean }) {
  return (
    <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      <label className="block text-[9.5px] tracking-[0.32em] text-[#8496b0] uppercase mb-2" style={monoFont}>{label}</label>
      {children}
    </div>
  );
}

const inputBase = "w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 text-white text-[13px] placeholder-white/25 focus:outline-none focus:border-[#ff4d00] focus:bg-white/[0.08] focus:shadow-[0_0_20px_rgba(255,77,0,0.12)] transition-all duration-300 backdrop-blur-sm rounded-none";

export default function ContactSection() {
  const { ref, inView } = useInView(0.1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState(false);
  const [form, setForm] = useState({ name: "", email: "", service: "", budget: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1600));
    setSubmitting(false);
    setSuccess(true);
    setForm({ name: "", email: "", service: "", budget: "", message: "" });
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden py-[8vh]"
      style={{ fontFamily: "'DM Mono','Courier New',monospace", background: "linear-gradient(165deg,#050310 0%,#0a0818 45%,#050310 100%)" }}>

      {/* ── Backgrounds ── */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage: "linear-gradient(rgba(255,77,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,77,0,0.03) 1px,transparent 1px)", backgroundSize: "64px 64px", animation: "contactGridDrift 28s linear infinite" }} />
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.02) 3px,rgba(0,0,0,0.02) 4px)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[900px] h-[900px] -top-56 -left-56"
        style={{ background: "radial-gradient(circle,rgba(255,77,0,0.10),transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[600px] h-[600px] top-[40%] -right-36"
        style={{ background: "radial-gradient(circle,rgba(168,85,247,0.08),transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[500px] h-[500px] -bottom-24 left-[30%]"
        style={{ background: "radial-gradient(circle,rgba(0,200,255,0.06),transparent 70%)" }} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-10 relative z-10">

        {/* ── Section header (same 2-col pattern) ── */}
        <div className="grid grid-cols-1 gap-7 xl:grid-cols-2 xl:gap-[60px] mb-16 xl:mb-20 items-end">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
            <div className="flex items-center gap-3.5 mb-3.5">
              <span className="inline-block w-12 h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
              <span className="text-[10.5px] tracking-[0.38em] text-[#ff4d00] uppercase" style={monoFont}>Get In Touch</span>
            </div>
            <h2 className="leading-none text-white m-0" style={{ ...bebasFont, fontSize: "clamp(40px,5.5vw,64px)", letterSpacing: "0.03em" }}>
              Let's Build<br />
              <span style={{ color: "#ff4d00", textShadow: "0 0 50px rgba(255,77,0,0.45)" }}>Something Great</span>
            </h2>
          </div>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
            <p className="text-[15px] text-[#a8b4cc] leading-[1.78] mb-6 max-w-[520px]" style={monoFont}>
              Ready to start your project? Tell us about your vision and we'll get back to you within 24 hours with a tailored proposal.
            </p>
            <div className="flex items-center gap-2.5" style={monoFont}>
              <span className="w-[7px] h-[7px] rounded-full" style={{ background: "#10d4a0", boxShadow: "0 0 10px #10d4a0", animation: "contactPulse 1.8s ease-in-out infinite" }} />
              <span className="text-[10.5px] text-[#7688a0] tracking-[0.08em]">Currently accepting new projects</span>
            </div>
          </div>
        </div>

        {/* ── Main grid: form left, info right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5 xl:gap-6">

          {/* ── Form card ── */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03]"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s" }}>
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-28 h-28 opacity-50 pointer-events-none" style={{ background: "linear-gradient(135deg,#ff4d00,transparent)", clipPath: "polygon(100% 0,0 0,100% 100%)" }} />
            {/* Ghost text */}
            <div className="absolute bottom-4 right-6 select-none pointer-events-none text-white/[0.03] leading-none" style={{ ...bebasFont, fontSize: 88, letterSpacing: "0.04em" }}>HELLO</div>

            <form onSubmit={handleSubmit} className="relative z-10 p-7 xl:p-10 flex flex-col gap-5">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Full Name" delay={0.25} inView={inView}>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required
                    className={`${inputBase}`} placeholder="John Doe" style={monoFont} />
                </FormField>
                <FormField label="Email Address" delay={0.3} inView={inView}>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required
                    className={`${inputBase}`} placeholder="john@company.com" style={monoFont} />
                </FormField>
              </div>

              {/* Service + Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Service Needed" delay={0.35} inView={inView}>
                  <div className="relative">
                    <select name="service" value={form.service} onChange={handleChange}
                      className={`${inputBase} appearance-none cursor-pointer`} style={monoFont}>
                      <option value="" className="bg-[#050310]">Select a service</option>
                      {SERVICES.map(s => <option key={s.value} value={s.value} className="bg-[#050310]">{s.label}</option>)}
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5e6e84] pointer-events-none text-xs">▼</span>
                  </div>
                </FormField>
                <FormField label="Budget Range" delay={0.4} inView={inView}>
                  <div className="relative">
                    <select name="budget" value={form.budget} onChange={handleChange}
                      className={`${inputBase} appearance-none cursor-pointer`} style={monoFont}>
                      <option value="" className="bg-[#050310]">Select budget</option>
                      {["$1k – $5k","$5k – $15k","$15k – $30k","$30k – $60k","$60k+"].map(b => (
                        <option key={b} value={b} className="bg-[#050310]">{b}</option>
                      ))}
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5e6e84] pointer-events-none text-xs">▼</span>
                  </div>
                </FormField>
              </div>

              {/* Message */}
              <FormField label="Project Details" delay={0.45} inView={inView}>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                  className={`${inputBase} resize-none`} placeholder="Tell us about your goals, timeline, and any specific requirements…" style={monoFont} />
              </FormField>

              {/* Submit */}
              <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.52s" }}>
                <button type="submit" disabled={submitting || success}
                  className="relative overflow-hidden inline-flex items-center justify-center gap-3 py-4 px-10 text-white text-[12.5px] tracking-[0.24em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_50px_rgba(255,77,0,0.5)] disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] w-full sm:w-auto"
                  style={{ ...monoFont, background: success ? "linear-gradient(135deg,#10d4a0,#0ea87e)" : "linear-gradient(135deg,#ff4d00,#ff8c00)", clipPath: "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))", boxShadow: success ? "0 8px 32px rgba(16,212,160,0.4)" : "0 8px 32px rgba(255,77,0,0.38)" }}>
                  {/* Shimmer on hover */}
                  <span className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.12) 50%,transparent 100%)", animation: submitting ? "btnShimmer 1.2s linear infinite" : "none" }} />
                  {submitting ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Sending…</span></>
                  ) : success ? (
                    <><span>✓</span><span>Message Sent!</span></>
                  ) : (
                    <><span>Send Message</span><span className="text-base">→</span></>
                  )}
                </button>
                <p className="text-[10px] text-[#546272] mt-3 tracking-[0.1em]" style={monoFont}>
                  We respond within 24 hours · No spam, ever
                </p>
              </div>
            </form>
          </div>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-5">

            {/* Contact info card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-7"
              style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s" }}>
              <div className="absolute top-0 right-0 w-20 h-20 opacity-50 pointer-events-none" style={{ background: "linear-gradient(135deg,#ff4d00,transparent)", clipPath: "polygon(100% 0,0 0,100% 100%)" }} />
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block w-6 h-px bg-[#ff4d00]" />
                <span className="text-[9.5px] tracking-[0.32em] text-[#ff4d00] uppercase" style={monoFont}>Contact Info</span>
              </div>
              <ul className="flex flex-col gap-5">
                {CONTACT_INFO.map((item, i) => (
                  <li key={i} className="flex items-start gap-4"
                    style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-16px)", transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.38 + i * 0.1}s` }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm"
                      style={{ background: `${item.accent}18`, border: `1px solid ${item.accent}44`, color: item.accent, boxShadow: `0 0 14px ${item.accent}22` }}>
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-[9px] tracking-[0.28em] text-[#697a90] uppercase block mb-0.5" style={monoFont}>{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className="text-[13px] text-white transition-colors duration-200 hover:text-[#ff4d00] no-underline" style={monoFont}>{item.value}</a>
                      ) : (
                        <span className="text-[13px] text-white" style={monoFont}>{item.value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Availability card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-7"
              style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s" }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-2 h-2 rounded-full" style={{ background: "#10d4a0", boxShadow: "0 0 10px #10d4a0", animation: "contactPulse 1.8s ease-in-out infinite" }} />
                <span className="text-[9.5px] tracking-[0.3em] text-[#9eb0c8] uppercase" style={monoFont}>Currently Available</span>
              </div>
              <div style={{ ...bebasFont, fontSize: 28, color: "#fff", letterSpacing: "0.02em", lineHeight: 1, marginBottom: 8 }}>
                Taking on<br /><span style={{ color: "#10d4a0", textShadow: "0 0 30px rgba(16,212,160,0.5)" }}>New Projects</span>
              </div>
              <p className="text-[13px] text-[#8899b4] leading-[1.65] m-0" style={monoFont}>
                We typically respond within 24 hours on business days. For urgent needs, reach us directly via email or phone.
              </p>
              {/* Mini process pills */}
              <div className="flex flex-wrap gap-2 mt-5">
                {["Free Consult", "No Obligation", "24h Response"].map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full text-[9px] tracking-[0.18em] uppercase text-[#8899b4] border border-white/10 bg-white/[0.04]" style={monoFont}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Socials card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-7"
              style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s" }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-block w-6 h-px bg-[#ff4d00]" />
                <span className="text-[9.5px] tracking-[0.32em] text-[#ff4d00] uppercase" style={monoFont}>Follow Our Work</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {SOCIALS.map((s, i) => (
                  <a key={i} href="#" aria-label={s.label}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-[#8899b4] no-underline transition-all duration-300 hover:text-white hover:border-[rgba(255,77,0,0.4)] hover:bg-[rgba(255,77,0,0.07)] group"
                    style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(12px)", transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.55 + i * 0.07}s` }}>
                    <span className="transition-colors duration-300">{s.icon}</span>
                    <span className="text-[10px] tracking-[0.18em] uppercase" style={monoFont}>{s.label}</span>
                    <span className="ml-auto text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#ff4d00]">→</span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        @keyframes contactGridDrift { 100% { background-position: 64px 64px; } }
        @keyframes contactPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.6)} }
        @keyframes btnShimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}