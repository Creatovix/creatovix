// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#050310] px-4" style={{ fontFamily: "'DM Mono','Courier New',monospace" }}>
      <div className="text-center">
        <h1 className="text-[120px] md:text-[180px] font-bold text-[#ff4d00] m-0" style={{ fontFamily: "'Bebas Neue','Impact',sans-serif", lineHeight: 0.8 }}>404</h1>
        <p className="text-[#a8b4cc] text-lg mb-8">The page you're looking for has vanished into the digital void.</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/" className="inline-flex items-center gap-2 py-3 px-6 text-white text-[12px] tracking-[0.24em] uppercase no-underline transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#ff4d00,#ff4d00d9)", clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))", boxShadow: "0 8px 28px rgba(255,77,0,0.44)" }}
          >
            Return Home <span>→</span>
          </Link>
          <Link href="/#services" className="inline-flex items-center gap-2 py-3 px-6 text-[#a8b4cc] text-[12px] tracking-[0.24em] uppercase no-underline transition-colors hover:text-white border border-white/20">
            View Services
          </Link>
        </div>
      </div>
    </main>
  );
}