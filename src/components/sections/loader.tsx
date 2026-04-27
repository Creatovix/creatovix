"use client";
import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"counting" | "reveal" | "exit">(
    "counting"
  );

  useEffect(() => {
    const duration = 2400;
    const interval = 20;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const eased =
        current / steps < 0.5
          ? 2 * (current / steps) * (current / steps)
          : -1 + (4 - 2 * (current / steps)) * (current / steps);
      setProgress(Math.min(Math.round(eased * 100), 100));
      if (current >= steps) {
        clearInterval(timer);
        setPhase("reveal");
        setTimeout(() => {
          setPhase("exit");
          setTimeout(onComplete, 700);
        }, 600);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#04020a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform:
          phase === "exit" ? "translateY(-100%)" : "translateY(0)",
        transition:
          phase === "exit" ? "transform 0.7s cubic-bezier(0.76,0,0.24,1)" : "none",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow blobs */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,77,0,0.12) 0%, transparent 70%)",
          top: "10%",
          left: "20%",
          filter: "blur(60px)",
          animation: "pulse 3s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,200,255,0.08) 0%, transparent 70%)",
          bottom: "10%",
          right: "15%",
          filter: "blur(60px)",
          animation: "pulse 3s ease-in-out infinite 1.5s",
        }}
      />

      {/* 3D Rotating cube */}
      <div
        style={{
          width: 80,
          height: 80,
          marginBottom: 48,
          perspective: 300,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            animation: "rotateCube 2s linear infinite",
          }}
        >
          {[
            {
              transform: "translateZ(40px)",
              bg: "rgba(255,77,0,0.8)",
            },
            {
              transform: "translateZ(-40px) rotateY(180deg)",
              bg: "rgba(255,130,0,0.6)",
            },
            {
              transform: "rotateY(90deg) translateZ(40px)",
              bg: "rgba(255,77,0,0.5)",
            },
            {
              transform: "rotateY(-90deg) translateZ(40px)",
              bg: "rgba(200,50,0,0.7)",
            },
            {
              transform: "rotateX(90deg) translateZ(40px)",
              bg: "rgba(255,100,30,0.6)",
            },
            {
              transform: "rotateX(-90deg) translateZ(40px)",
              bg: "rgba(180,40,0,0.5)",
            },
          ].map((face, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 80,
                height: 80,
                background: face.bg,
                border: "1px solid rgba(255,120,50,0.4)",
                transform: face.transform,
                boxShadow: "inset 0 0 20px rgba(255,77,0,0.3)",
                backdropFilter: "blur(2px)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Logo text */}
      <div
        style={{
          fontFamily: "'Bebas Neue', 'Impact', sans-serif",
          fontSize: "clamp(32px, 6vw, 52px)",
          letterSpacing: "0.15em",
          color: "#fff",
          marginBottom: 8,
          opacity: phase === "reveal" || phase === "exit" ? 1 : 0.9,
          transition: "opacity 0.4s ease",
        }}
      >
        CREAT
        <span style={{ color: "#ff4d00" }}>O</span>
        VIX
      </div>
      <div
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 11,
          letterSpacing: "0.4em",
          color: "rgba(255,255,255,0.3)",
          textTransform: "uppercase",
          marginBottom: 56,
        }}
      >
        Digital Agency
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "min(340px, 80vw)",
          height: 2,
          background: "rgba(255,255,255,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${progress}%`,
            background:
              "linear-gradient(90deg, #ff4d00, #ff8c00)",
            transition: "width 0.02s linear",
            boxShadow: "0 0 12px rgba(255,77,0,0.8)",
          }}
        />
        {/* Shimmer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
            animation: "shimmer 1.5s infinite",
          }}
        />
      </div>

      {/* Counter */}
      <div
        style={{
          marginTop: 20,
          fontFamily: "'Courier New', monospace",
          fontSize: 13,
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.2em",
        }}
      >
        {String(progress).padStart(3, "0")}
        <span style={{ color: "#ff4d00" }}>%</span>
      </div>

      <style>{`
        @keyframes rotateCube {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}