"use client";
import { useEffect, useState } from "react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"counting" | "reveal" | "exit">("counting");

  useEffect(() => {
    const duration = 2600;
    const interval = 18;
    const steps = duration / interval;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      const t = current / steps;
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setProgress(Math.min(Math.round(eased * 100), 100));
      if (current >= steps) {
        clearInterval(timer);
        setPhase("reveal");
        setTimeout(() => { setPhase("exit"); setTimeout(onComplete, 750); }, 500);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#fafafa] flex flex-col items-center justify-center overflow-hidden transition-transform duration-700 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] ${phase === "exit" ? "-translate-y-full" : "translate-y-0"}`}
    >
      {/* Ambient glow - Light Theme */}
      <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(255,77,0,0.08) 0%,transparent 70%)", filter: "blur(60px)", animation: "ambientPulse 3s ease-in-out infinite" }} />
      <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(0,200,255,0.05) 0%,transparent 70%)", filter: "blur(60px)", animation: "ambientPulse 3s ease-in-out infinite 1.5s" }} />

      {/* 3D Cube - Light Theme */}
      <div className="w-20 h-20 mb-12" style={{ perspective: 320 }}>
        <div className="w-full h-full relative" style={{ transformStyle: "preserve-3d", animation: "rotateCube 2.2s linear infinite" }}>
          {[
            { transform: "translateZ(40px)", bg: "rgba(255,77,0,0.9)" },
            { transform: "translateZ(-40px) rotateY(180deg)", bg: "rgba(255,120,0,0.75)" },
            { transform: "rotateY(90deg) translateZ(40px)", bg: "rgba(255,77,0,0.65)" },
            { transform: "rotateY(-90deg) translateZ(40px)", bg: "rgba(200,50,0,0.8)" },
            { transform: "rotateX(90deg) translateZ(40px)", bg: "rgba(255,100,30,0.7)" },
            { transform: "rotateX(-90deg) translateZ(40px)", bg: "rgba(180,40,0,0.65)" },
          ].map((face, i) => (
            <div key={i} className="absolute w-20 h-20 border border-[rgba(255,120,50,0.25)]" style={{ transform: face.transform, background: face.bg, boxShadow: "inset 0 0 20px rgba(255,255,255,0.4)" }} />
          ))}
        </div>
      </div>

      {/* Logo - Light Theme */}
      <div className="mb-2" style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
        <span className="text-[#1a1a2e] text-5xl tracking-[0.15em]">CREAT</span>
        <span className="text-[#ff4d00] text-5xl tracking-[0.15em]" style={{ textShadow: "0 0 30px rgba(255,77,0,0.4)" }}>O</span>
        <span className="text-[#1a1a2e] text-5xl tracking-[0.15em]">VIX</span>
      </div>
      <p className="text-[#6b7280] text-[10px] tracking-[0.45em] uppercase mb-14" style={{ fontFamily: "'Inter', sans-serif" }}>Digital Agency</p>

      {/* Progress track - Light Theme */}
      <div className="relative overflow-hidden" style={{ width: "min(340px,80vw)", height: 2, background: "rgba(0,0,0,0.08)" }}>
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#ff4d00] to-[#ff8c00] transition-[width] duration-[18ms] linear"
          style={{ width: `${progress}%`, boxShadow: "0 0 14px rgba(255,77,0,0.5)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,transparent 0%,rgba(0,0,0,0.15) 50%,transparent 100%)", animation: "shimmer 1.6s infinite" }} />
      </div>

      {/* Counter - Light Theme */}
      <p className="mt-5 text-[#6b7280] text-[13px] tracking-[0.25em]" style={{ fontFamily: "'Inter', sans-serif" }}>
        {String(progress).padStart(3, "0")}<span className="text-[#ff4d00]">%</span>
      </p>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500&display=swap');
        @keyframes rotateCube { 0%{transform:rotateX(0deg) rotateY(0deg);} 100%{transform:rotateX(360deg) rotateY(360deg);} }
        @keyframes ambientPulse { 0%,100%{opacity:0.6;transform:scale(1);} 50%{opacity:1;transform:scale(1.12);} }
        @keyframes shimmer { 0%{transform:translateX(-100%);} 100%{transform:translateX(100%);} }
      `}</style>
    </div>
  );
}