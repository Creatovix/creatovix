"use client";
import { useEffect, useRef, useState } from "react";

const SERVICES = [
  { value: "web-design", label: "Web Design" },
  { value: "graphic-design", label: "Graphic Design" },
  { value: "web-development", label: "Web Development" },
  { value: "full-stack", label: "Full Stack" },
  { value: "shopify", label: "Shopify" },
  { value: "other", label: "Other" },
];

const SOCIALS = [
  { label: "Instagram", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
  { label: "LinkedIn", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> },
  { label: "Twitter/X", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg> },
  { label: "Dribbble", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" /></svg> },
];

const CONTACT_INFO = [
  { accent: "#ff4d00", label: "Email", value: "contact@creatovix.com", href: "mailto:contact@creatovix.com", icon: "✉" },
  { accent: "#00c8ff", label: "Phone", value: "+92 3097909914", href: "tel:+923097909914", icon: "☎" },
  { accent: "#a855f7", label: "Location", value: "Remote Worldwide · PKbased", href: null, icon: "◎" },
];

const bebasFont = { fontFamily: "'Bebas Neue','Impact',sans-serif" };
// Updated to Inter font
const sansFont = { fontFamily: "'Inter', sans-serif" };

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
      <label className="block text-[9.5px] tracking-[0.32em] text-[#6b7280] uppercase mb-2 font-semibold" style={sansFont}>{label}</label>
      {children}
    </div>
  );
}

// Updated input styles for light theme
const inputBase = "w-full px-4 py-3.5 bg-white border border-black/10 text-[#1a1a2e] text-[13px] placeholder-[#9ca3af] focus:outline-none focus:border-[#ff4d00] focus:bg-[#fffaf5] focus:shadow-[0_0_20px_rgba(255,77,0,0.15)] transition-all duration-300 backdrop-blur-sm rounded-none font-medium";

export default function ContactSection() {
  const { ref, inView } = useInView(0.1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", service: "", budget: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: AbortSignal.timeout(10000),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Submission failed");
      }

      setSuccess(true);
      setForm({ name: "", email: "", service: "", budget: "", message: "" });

      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "contact_form_submit", {
          event_category: "engagement",
          event_label: result.id,
        });
      }

    } catch (error: any) {
      console.error("❌ Form submission error:", error);
      alert(
        error.message === "Validation failed"
          ? "Please check your input and try again."
          : "Something went wrong. Please try again or email us directly at contact@creatovix.com"
      );
    } finally {
      setSubmitting(false);
      if (success) setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden py-[8vh] font-sans"
      style={{ fontFamily: "'Inter', sans-serif", background: "linear-gradient(165deg,#fafafa 0%,#f5f5f5 45%,#fafafa 100%)" }}>

      {/* ── Backgrounds - Light Theme ── */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)", backgroundSize: "64px 64px", animation: "contactGridDrift 28s linear infinite" }} />
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.01) 3px,rgba(0,0,0,0.01) 4px)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[900px] h-[900px] -top-56 -left-56"
        style={{ background: "radial-gradient(circle,rgba(255,77,0,0.05),transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[600px] h-[600px] top-[40%] -right-36"
        style={{ background: "radial-gradient(circle,rgba(168,85,247,0.04),transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[500px] h-[500px] -bottom-24 left-[30%]"
        style={{ background: "radial-gradient(circle,rgba(0,200,255,0.04),transparent 70%)" }} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-10 relative z-10">

        {/* ── Section header ── */}
        <div className="grid grid-cols-1 gap-7 xl:grid-cols-2 xl:gap-[60px] mb-16 xl:mb-20 items-end">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
            <div className="flex items-center gap-3.5 mb-3.5">
              <span className="inline-block w-12 h-px bg-[#ff4d00] shadow-[0_0_12px_rgba(255,77,0,0.4)]" />
              <span className="text-[10.5px] tracking-[0.38em] text-[#ff4d00] uppercase font-semibold" style={sansFont}>Get In Touch</span>
            </div>
            <h2 className="leading-none text-[#1a1a2e] m-0" style={{ ...bebasFont, fontSize: "clamp(40px,5.5vw,64px)", letterSpacing: "0.03em" }}>
              Let's Build<br />
              <span style={{ color: "#ff4d00", textShadow: "0 0 35px rgba(255,77,0,0.3)" }}>Something Great</span>
            </h2>
          </div>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
            <p className="text-[16px] text-[#4a5568] leading-[1.78] mb-6 max-w-[520px] font-medium" style={sansFont}>
              Ready to start your project? Tell us about your vision and we'll get back to you within 24 hours with a tailored proposal.
            </p>
            <div className="flex items-center gap-2.5" style={sansFont}>
              <span className="w-[7px] h-[7px] rounded-full" style={{ background: "#10d4a0", boxShadow: "0 0 10px rgba(16,212,160,0.5)", animation: "contactPulse 1.8s ease-in-out infinite" }} />
              <span className="text-[12px] text-[#6b7280] tracking-[0.08em] font-medium">Currently accepting new projects</span>
            </div>
          </div>
        </div>

        {/* ── Main grid: form left, info right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5 xl:gap-6">

          {/* ── Form card - Light Theme ── */}
          <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-white to-[#fafafa]"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s" }}>
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-28 h-28 opacity-55 pointer-events-none" style={{ background: "linear-gradient(135deg,#ff4d00,transparent)", clipPath: "polygon(100% 0,0 0,100% 100%)" }} />
            {/* Ghost text - Light Theme */}
            <div className="absolute bottom-4 right-6 select-none pointer-events-none text-black/[0.04] leading-none" style={{ ...bebasFont, fontSize: 88, letterSpacing: "0.04em" }}>Creatovix</div>

            <form onSubmit={handleSubmit} className="relative z-10 p-7 xl:p-10 flex flex-col gap-5">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Full Name" delay={0.25} inView={inView}>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required
                    className={`${inputBase}`} placeholder="John Doe" style={sansFont} />
                </FormField>
                <FormField label="Email Address" delay={0.3} inView={inView}>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required
                    className={`${inputBase}`} placeholder="john@company.com" style={sansFont} />
                </FormField>
              </div>

              {/* Service + Budget */}
              <div className="grid grid-cols-1 gap-5">
                <FormField label="Service Needed" delay={0.35} inView={inView}>
                  <div className="relative">
                    <select name="service" value={form.service} onChange={handleChange}
                      className={`${inputBase} appearance-none cursor-pointer`} style={sansFont}>
                      <option value="" className="bg-white text-[#1a1a2e]">Select a service</option>
                      {SERVICES.map(s => <option key={s.value} value={s.value} className="bg-white text-[#1a1a2e]">{s.label}</option>)}
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none text-xs">▼</span>
                  </div>
                </FormField>
              </div>

              {/* Message */}
              <FormField label="Project Details" delay={0.45} inView={inView}>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                  className={`${inputBase} resize-none`} placeholder="Tell us about your goals, timeline, and any specific requirements…" style={sansFont} />
              </FormField>

              {/* Submit */}
              <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.52s" }}>
                <button type="submit" disabled={submitting || success}
                  className="relative overflow-hidden inline-flex items-center justify-center gap-3 py-4 px-10 text-white text-[12.5px] tracking-[0.24em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_50px_rgba(255,77,0,0.45)] disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] w-full sm:w-auto font-semibold"
                  style={{ ...sansFont, background: success ? "linear-gradient(135deg,#10d4a0,#0ea87e)" : "linear-gradient(135deg,#ff4d00,#ff8c00)", clipPath: "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))", boxShadow: success ? "0 8px 32px rgba(16,212,160,0.35)" : "0 8px 32px rgba(255,77,0,0.35)" }}>
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
                <p className="text-[10px] text-[#6b7280] mt-3 tracking-[0.1em] font-medium" style={sansFont}>
                  We respond within 24 hours · No spam, ever
                </p>
              </div>
            </form>
          </div>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-5">

            {/* Contact info card - Light Theme */}
            <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-white to-[#fafafa] p-7"
              style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s" }}>
              <div className="absolute top-0 right-0 w-20 h-20 opacity-55 pointer-events-none" style={{ background: "linear-gradient(135deg,#ff4d00,transparent)", clipPath: "polygon(100% 0,0 0,100% 100%)" }} />
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block w-6 h-px bg-[#ff4d00]" />
                <span className="text-[9.5px] tracking-[0.32em] text-[#ff4d00] uppercase font-semibold" style={sansFont}>Contact Info</span>
              </div>
              <ul className="flex flex-col gap-5">
                {CONTACT_INFO.map((item, i) => (
                  <li key={i} className="flex items-start gap-4"
                    style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-16px)", transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.38 + i * 0.1}s` }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm"
                      style={{ background: `rgba(${item.accent.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.12)`, border: `1px solid ${item.accent}55`, color: item.accent, boxShadow: `0 0 14px rgba(${item.accent.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.2)` }}>
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-[9px] tracking-[0.28em] text-[#6b7280] uppercase block mb-0.5 font-semibold" style={sansFont}>{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className="text-[13px] text-[#1a1a2e] transition-colors duration-200 hover:text-[#ff4d00] no-underline font-medium" style={sansFont}>{item.value}</a>
                      ) : (
                        <span className="text-[13px] text-[#1a1a2e] font-medium" style={sansFont}>{item.value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Availability card - Light Theme */}
            <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-white to-[#fafafa] p-7"
              style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s" }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-2 h-2 rounded-full" style={{ background: "#10d4a0", boxShadow: "0 0 10px rgba(16,212,160,0.5)", animation: "contactPulse 1.8s ease-in-out infinite" }} />
                <span className="text-[9.5px] tracking-[0.3em] text-[#4a5568] uppercase font-semibold" style={sansFont}>Currently Available</span>
              </div>
              <div style={{ ...bebasFont, fontSize: 28, color: "#1a1a2e", letterSpacing: "0.02em", lineHeight: 1, marginBottom: 8 }}>
                Taking on<br /><span style={{ color: "#10d4a0", textShadow: "0 0 30px rgba(16,212,160,0.35)" }}>New Projects</span>
              </div>
              <p className="text-[13px] text-[#4a5568] leading-[1.65] m-0 font-medium" style={sansFont}>
                We typically respond within 24 hours on business days. For urgent needs, reach us directly via email or phone.
              </p>
              {/* Mini process pills - Light Theme */}
              <div className="flex flex-wrap gap-2 mt-5">
                {["Free Consult", "No Obligation", "24h Response"].map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full text-[9px] tracking-[0.18em] uppercase text-[#4a5568] border border-black/10 bg-black/[0.04] font-medium" style={sansFont}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Socials card - Light Theme */}
            <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-white to-[#fafafa] p-7"
              style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s" }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-block w-6 h-px bg-[#ff4d00]" />
                <span className="text-[9.5px] tracking-[0.32em] text-[#ff4d00] uppercase font-semibold" style={sansFont}>Follow Our Work</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {SOCIALS.map((s, i) => (
                  <a key={i} href="#" aria-label={s.label}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-black/10 bg-black/[0.04] text-[#4a5568] no-underline transition-all duration-300 hover:text-[#1a1a2e] hover:border-[rgba(255,77,0,0.5)] hover:bg-[rgba(255,77,0,0.08)] group font-medium"
                    style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(12px)", transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.55 + i * 0.07}s` }}>
                    <span className="transition-colors duration-300">{s.icon}</span>
                    <span className="text-[10px] tracking-[0.18em] uppercase" style={sansFont}>{s.label}</span>
                    <span className="ml-auto text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#ff4d00]">→</span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
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