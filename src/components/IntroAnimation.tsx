import { useState, useEffect } from "react";
import lampadaImg from "@/assets/img-lamp.png";
import inovLogo from "@/assets/img-inov-slamp.png";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [phase, setPhase] = useState<"dark" | "logo" | "lamp" | "merge" | "fadeout">("dark");

  const lampAnimation =
    phase === "dark" || phase === "logo"
      ? "none"
      : phase === "lamp"
      ? "lampAppear 1s ease-out forwards"
      : phase === "merge"
      ? "lampMerge 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards"
      : phase === "fadeout"
      ? "none"
      : "none";

  const logoAnimation =
    phase === "logo"
      ? "logoReveal 0.9s cubic-bezier(0.2,0.8,0.2,1) forwards"
      : "none";

useEffect(() => {
    // Fase 1: O logo aparece (1.2s)
    const t1 = setTimeout(() => setPhase("logo"), 1200);

    // Fase 2: A lâmpada aparece e cresce (1.2s)
    const t2 = setTimeout(() => setPhase("lamp"), 1200);

    // Fase 3: A lâmpada se funde ao logo (2.5s)
    const t3 = setTimeout(() => setPhase("merge"), 2500);

    // Fase 4: Início do desaparecimento suave - Fade out (3.5s)
    const t4 = setTimeout(() => setPhase("fadeout"), 3500);

    // Fase 5: Animação completa e encerramento (3.5s)
    const t5 = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-1000 ${
        phase === "fadeout" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ background: "#000" }}
    >
      <style>{`
        @keyframes logoReveal {
          0% {
            transform: scale(0.6) rotateY(6deg);
            opacity: 0;
            filter: blur(12px) saturate(0.8);
            clip-path: circle(0% at 50% 50%);
          }
          60% {
            transform: scale(1.06) rotateY(2deg);
            opacity: 1;
            filter: blur(3px) saturate(1.05);
            clip-path: circle(72% at 50% 50%);
          }
          100% {
            transform: scale(1) rotateY(0deg);
            opacity: 1;
            filter: blur(0px) saturate(1);
            clip-path: circle(75% at 50% 50%);
          }
        }
        @keyframes logoSlideRight {
          0% { transform: translateX(40%) scale(0.8) rotateY(8deg); opacity: 0; filter: blur(10px); clip-path: circle(0% at 100% 50%); }
          60% { transform: translateX(-6%) scale(1.02) rotateY(2deg); opacity: 1; filter: blur(3px); clip-path: circle(72% at 50% 50%); }
          100% { transform: translateX(0) scale(1) rotateY(0); opacity: 1; filter: blur(0); clip-path: circle(75% at 50% 50%); }
        }

        @keyframes beamPulse {
          0% { opacity: 0.18; transform: scaleY(1); }
          50% { opacity: 0.6; transform: scaleY(1.05); }
          100% { opacity: 0.18; transform: scaleY(1); }
        }
        @keyframes lampAppear {
          0% { transform: scale(0) translateY(100px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes lampMerge {
          0% { 
            transform: scale(1) translateY(0);
            filter: drop-shadow(0 0 30px hsl(45, 100%, 60%));
            opacity: 1;
          }
          100% { 
            transform: scale(0.4) translateY(-65px) translateX(20px);
            filter: drop-shadow(0 0 15px hsl(45, 100%, 55%)) brightness(1.2);
            opacity: 1;
          }
        }
      `}</style>
      {/* Spotlight beams */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          phase === "logo" || phase === "lamp" ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Left spotlight */}
        <div
          className="absolute top-0 left-[15%] w-[300px] h-[600px]"
          style={{
            background: "conic-gradient(from 160deg at 50% 0%, transparent 0deg, hsl(280 80% 50% / 0.3) 20deg, transparent 40deg)",
            filter: "blur(30px)",
          }}
        />
        {/* Right spotlight */}
        <div
          className="absolute top-0 right-[15%] w-[300px] h-[600px]"
          style={{
            background: "conic-gradient(from 200deg at 50% 0%, transparent 0deg, hsl(220 80% 50% / 0.3) 20deg, transparent 40deg)",
            filter: "blur(30px)",
          }}
        />
        {/* Additional focus beams */}
        <div
          className="absolute top-[10%] left-[30%] w-[200px] h-[420px]"
          style={{
            background: "conic-gradient(from 160deg at 50% 0%, transparent 0deg, rgba(255,200,50,0.18) 20deg, transparent 50deg)",
            filter: "blur(36px)",
            animation: "beamPulse 2.2s ease-in-out infinite",
            opacity: 0.24,
          }}
        />
        <div
          className="absolute top-[12%] right-[30%] w-[220px] h-[460px]"
          style={{
            background: "conic-gradient(from 200deg at 50% 0%, transparent 0deg, rgba(120,150,255,0.16) 18deg, transparent 50deg)",
            filter: "blur(34px)",
            animation: "beamPulse 2.6s ease-in-out infinite",
            opacity: 0.2,
          }}
        />
        <div
          className="absolute bottom-[10%] left-[45%] w-[260px] h-[160px] rounded-full"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(255,220,100,0.22), transparent 60%)",
            filter: "blur(18px)",
            animation: "beamPulse 3s ease-in-out infinite",
            opacity: 0.26,
          }}
        />
      </div>

      {/* Central glow */}
      <div
        className={`absolute transition-all ${
          phase === "logo" || phase === "lamp" || phase === "merge"
            ? "opacity-100 scale-100 duration-500"
            : "opacity-0 scale-50 duration-500"
        }`}
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(45 100% 70% / 0.5) 0%, hsl(45 100% 50% / 0.2) 30%, hsl(187 100% 50% / 0.1) 60%, transparent 80%)",
          filter: "blur(60px)",
        }}
      />

      {/* Flash overlay - the "clarão" */}
      <div
        className={`absolute inset-0 transition-opacity ${
          phase === "lamp" ? "opacity-15 duration-300" : "opacity-0 duration-300"
        }`}
        style={{
          background: "radial-gradient(circle at center, hsl(45 100% 90% / 0.8) 0%, hsl(45 100% 70% / 0.3) 30%, transparent 70%)",
        }}
      />

      {/* Lightbulb image */}
      <img
        src={lampadaImg}
        alt="Lâmpada Inov"
        className="relative z-20 w-48 h-48 sm:w-64 sm:h-64 object-contain"
        style={{
          mixBlendMode: "normal",
          animation: lampAnimation,
          opacity: phase === "dark" || phase === "logo" ? 0 : 1,
          transition: phase === "fadeout" ? "opacity 1s ease-out" : "none",
          filter: phase === "merge" ? "brightness(1.3) saturate(1.2)" : "brightness(1)",
        }}
      />

      {/* INOV Logo - appears first */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all ${phase === "dark" ? "opacity-0" : "opacity-100"}`}
        style={{
          animation: logoAnimation,
        }}
      >
        <img src={inovLogo} alt="INOV Letreiros" className="w-72 h-72 sm:w-80 sm:h-80 object-contain" />
      </div>

      {/* Floor reflection */}
      <div
        className={`absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[400px] h-[4px] rounded-full transition-opacity duration-1000 ${
          phase === "logo" || phase === "lamp" ? "opacity-60" : "opacity-0"
        }`}
        style={{
          background: "linear-gradient(90deg, transparent, hsl(280 80% 50% / 0.6), hsl(220 80% 50% / 0.6), transparent)",
          filter: "blur(4px)",
        }}
      />
    </div>
  );
};

export default IntroAnimation;
