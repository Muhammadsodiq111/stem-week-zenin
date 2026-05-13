import { motion } from "motion/react";
import { useMemo } from "react";

/**
 * Stokes' Law visualization — three columns of particles of decreasing size,
 * each falling at different speeds. Demonstrates why PM2.5 stays airborne.
 */
const ParticleSettlingSim = () => {
  const columns = [
    { label: "Dust", size: "50 μm", radius: 7, speed: 3, color: "#fbbf24", count: 6 },
    { label: "PM10", size: "10 μm", radius: 4, speed: 7, color: "#fb923c", count: 8 },
    { label: "PM2.5", size: "2.5 μm", radius: 2, speed: 16, color: "#f87171", count: 14 },
  ];

  return (
    <div className="liquid-glass rounded-3xl p-6 md:p-8">
      <div className="grid grid-cols-3 gap-4">
        {columns.map((c) => (
          <Column key={c.label} {...c} />
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 justify-center text-xs font-body text-foreground/60">
        <span>Larger particles fall fast</span>
        <span className="text-foreground/30">·</span>
        <span>Smaller ones drift forever</span>
        <span className="text-foreground/30">·</span>
        <span>Stokes' Law in action</span>
      </div>
    </div>
  );
};

const Column = ({
  label,
  size,
  radius,
  speed,
  color,
  count,
}: {
  label: string;
  size: string;
  radius: number;
  speed: number;
  color: string;
  count: number;
}) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: 10 + Math.random() * 80,
        delay: Math.random() * speed,
      })),
    [count, speed],
  );

  return (
    <div>
      <div className="text-center mb-2">
        <div className="text-foreground font-heading italic text-base">{label}</div>
        <div className="text-foreground/40 font-body text-[10px]">{size}</div>
      </div>
      <div className="relative h-56 rounded-xl overflow-hidden border border-foreground/10 bg-black/30">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: radius * 2,
              height: radius * 2,
              left: `${p.x}%`,
              background: color,
              boxShadow: `0 0 ${radius * 2}px ${color}80`,
            }}
            initial={{ top: -10 }}
            animate={{ top: ["−5%", "105%"] as unknown as string[] }}
            transition={{
              duration: speed,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ParticleSettlingSim;
