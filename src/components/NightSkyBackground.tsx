import { useMemo } from "react";

const NightSkyBackground = ({ className = "" }: { className?: string }) => {
  const stars = useMemo(() => {
    return Array.from({ length: 70 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 50,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
    }));
  }, []);

  const sparkles = useMemo(() => {
    return [
      { left: 15, top: 12, delay: 0 },
      { left: 72, top: 8, delay: 1.2 },
      { left: 45, top: 25, delay: 2.5 },
      { left: 88, top: 18, delay: 0.8 },
      { left: 30, top: 38, delay: 3.1 },
    ];
  }, []);

  const clouds = useMemo(() => [
    { bottom: 8, scale: 1, delay: 0, duration: 60 },
    { bottom: 15, scale: 0.8, delay: -20, duration: 80 },
    { bottom: 5, scale: 1.2, delay: -40, duration: 70 },
    { bottom: 20, scale: 0.6, delay: -10, duration: 90 },
  ], []);

  const shootingStars = useMemo(() => [
    { top: 8, left: 10, delay: 2, duration: 1.2 },
    { top: 20, left: 50, delay: 6, duration: 0.9 },
    { top: 12, left: 75, delay: 10, duration: 1.1 },
    { top: 30, left: 30, delay: 15, duration: 1.0 },
  ], []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Gradient sky */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #000000 0%, #0a1a6e 50%, #1a56db 100%)",
        }}
      />

      {/* Stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* Sparkles ✦ */}
      {sparkles.map((sp, i) => (
        <div
          key={i}
          className="absolute text-white/80 select-none pointer-events-none"
          style={{
            left: `${sp.left}%`,
            top: `${sp.top}%`,
            fontSize: "16px",
            textShadow: "0 0 8px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)",
            animation: `sparkleGlow 3s ease-in-out ${sp.delay}s infinite`,
          }}
        >
          ✦
        </div>
      ))}

      {/* Shooting Stars */}
      {shootingStars.map((ss, i) => (
        <div
          key={`shooting-${i}`}
          className="absolute"
          style={{
            top: `${ss.top}%`,
            left: `${ss.left}%`,
            animation: `shootingStar ${ss.duration}s ease-in ${ss.delay}s infinite`,
            opacity: 0,
          }}
        >
          <div
            style={{
              width: 80,
              height: 2,
              borderRadius: 2,
              background: "linear-gradient(to left, rgba(255,255,255,0.9), transparent)",
              transform: "rotate(-35deg)",
              boxShadow: "0 0 6px rgba(255,255,255,0.6)",
            }}
          />
        </div>
      ))}

      {/* Clouds */}
      {clouds.map((c, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            bottom: `${c.bottom}%`,
            transform: `scale(${c.scale})`,
            animation: `cloudDrift ${c.duration}s linear ${c.delay}s infinite`,
          }}
        >
          <CloudShape />
        </div>
      ))}

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes sparkleGlow {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes cloudDrift {
          0% { left: -20%; }
          100% { left: 110%; }
        }
        @keyframes shootingStar {
          0% { opacity: 0; transform: translate(0, 0); }
          5% { opacity: 1; }
          20% { opacity: 1; transform: translate(120px, 70px); }
          25% { opacity: 0; transform: translate(160px, 95px); }
          100% { opacity: 0; transform: translate(160px, 95px); }
        }
      `}</style>
    </div>
  );
};

const CloudShape = () => (
  <div className="relative w-[200px] h-[80px]">
    {[
      { w: 80, h: 50, l: 20, b: 0 },
      { w: 100, h: 60, l: 50, b: 5 },
      { w: 70, h: 45, l: 100, b: 0 },
      { w: 60, h: 40, l: 0, b: 5 },
      { w: 90, h: 55, l: 70, b: 10 },
    ].map((blob, i) => (
      <div
        key={i}
        className="absolute rounded-full"
        style={{
          width: blob.w,
          height: blob.h,
          left: blob.l,
          bottom: blob.b,
          background: "rgba(255,255,255,0.25)",
          filter: "blur(12px)",
        }}
      />
    ))}
  </div>
);

export default NightSkyBackground;
