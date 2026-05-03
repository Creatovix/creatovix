// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="text-center">
        <h1 className="text-[120px] md:text-[180px] font-bold text-[#ff4d00] m-0" style={{ fontFamily: "'Bebas Neue','Impact',sans-serif", lineHeight: 0.8 }}>404</h1>
        <p className="text-[#4a5568] text-lg mb-8 font-medium">The page you're looking for has vanished into the digital void.</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/" className="inline-flex items-center gap-2 py-3 px-6 text-white text-[12px] tracking-[0.24em] uppercase no-underline transition-all hover:-translate-y-0.5 font-semibold"
            style={{ background: "linear-gradient(135deg,#ff4d00,#ff4d00d9)", clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))", boxShadow: "0 8px 28px rgba(255,77,0,0.35)" }}
          >
            Return Home <span>→</span>
          </Link>
          <Link href="/#services" className="inline-flex items-center gap-2 py-3 px-6 text-[#4a5568] text-[12px] tracking-[0.24em] uppercase no-underline transition-colors hover:text-[#1a1a2e] border border-black/20 font-medium">
            View Services
          </Link>
        </div>
      </div>
    </main>
  );
}