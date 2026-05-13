import { motion } from "motion/react";

/** Animated SVG showing PM2.5 particles entering airways and reaching alveoli. */
const LungJourney = () => {
  return (
    <div className="liquid-glass rounded-3xl p-6 md:p-8">
      <svg viewBox="0 0 400 320" className="w-full h-auto">
        {/* Trachea */}
        <rect x="190" y="20" width="20" height="80" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" />
        {/* Bronchi */}
        <path
          d="M200 100 Q170 130 130 160 L120 220"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M200 100 Q230 130 270 160 L280 220"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
        {/* Lung lobes */}
        <ellipse cx="110" cy="240" rx="60" ry="55" fill="rgba(244,114,182,0.12)" stroke="rgba(244,114,182,0.4)" strokeWidth="1.5" />
        <ellipse cx="290" cy="240" rx="60" ry="55" fill="rgba(244,114,182,0.12)" stroke="rgba(244,114,182,0.4)" strokeWidth="1.5" />
        {/* Alveoli clusters */}
        {[
          [85, 240], [110, 220], [135, 240], [110, 260], [90, 270], [130, 265],
          [265, 240], [290, 220], [315, 240], [290, 260], [270, 270], [310, 265],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="6" fill="rgba(244,114,182,0.25)" stroke="rgba(244,114,182,0.5)" strokeWidth="1" />
        ))}

        {/* Falling particles - PM2.5 */}
        {Array.from({ length: 8 }).map((_, i) => {
          const startX = 198 + (i % 2 === 0 ? -1 : 1) * 2;
          const endX = i % 2 === 0 ? 90 + (i * 7) : 280 + (i * 5);
          const endY = 235 + (i * 4);
          return (
            <motion.circle
              key={i}
              r={i < 3 ? 2.5 : 1.8}
              fill={i < 3 ? "#facc15" : "#9ca3af"}
              initial={{ cx: startX, cy: 10, opacity: 0 }}
              animate={{
                cx: [startX, startX, endX],
                cy: [10, 100, endY],
                opacity: [0, 1, 1, 0.6],
              }}
              transition={{
                duration: 4,
                delay: i * 0.4,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeIn",
              }}
            />
          );
        })}

        {/* Labels */}
        <text x="200" y="14" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="ui-sans-serif">
          Trachea
        </text>
        <text x="60" y="180" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="ui-sans-serif">
          Bronchi
        </text>
        <text x="110" y="305" textAnchor="middle" fill="rgba(244,114,182,0.7)" fontSize="10" fontFamily="ui-sans-serif">
          Alveoli
        </text>
        <text x="290" y="305" textAnchor="middle" fill="rgba(244,114,182,0.7)" fontSize="10" fontFamily="ui-sans-serif">
          Alveoli
        </text>
      </svg>
      <div className="flex items-center justify-center gap-6 mt-4 text-xs font-body text-foreground/60">
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" /> PM2.5
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-400" /> Soot / Dust
        </span>
      </div>
    </div>
  );
};

export default LungJourney;
