import { motion } from "motion/react";

type Atom = { el: string; x: number; y: number; r: number; fill: string };
type Bond = { x1: number; y1: number; x2: number; y2: number; double?: boolean };

const molecules: { id: string; name: string; formula: string; atoms: Atom[]; bonds: Bond[] }[] = [
  {
    id: "co2",
    name: "Carbon Dioxide",
    formula: "CO₂",
    atoms: [
      { el: "O", x: 30, y: 70, r: 22, fill: "#ef4444" },
      { el: "C", x: 90, y: 70, r: 18, fill: "#1f2937" },
      { el: "O", x: 150, y: 70, r: 22, fill: "#ef4444" },
    ],
    bonds: [
      { x1: 52, y1: 70, x2: 72, y2: 70, double: true },
      { x1: 108, y1: 70, x2: 128, y2: 70, double: true },
    ],
  },
  {
    id: "no2",
    name: "Nitrogen Dioxide",
    formula: "NO₂",
    atoms: [
      { el: "O", x: 35, y: 110, r: 22, fill: "#ef4444" },
      { el: "N", x: 90, y: 60, r: 20, fill: "#3b82f6" },
      { el: "O", x: 145, y: 110, r: 22, fill: "#ef4444" },
    ],
    bonds: [
      { x1: 52, y1: 95, x2: 78, y2: 75, double: true },
      { x1: 102, y1: 75, x2: 128, y2: 95 },
    ],
  },
  {
    id: "so2",
    name: "Sulfur Dioxide",
    formula: "SO₂",
    atoms: [
      { el: "O", x: 35, y: 110, r: 22, fill: "#ef4444" },
      { el: "S", x: 90, y: 55, r: 24, fill: "#eab308" },
      { el: "O", x: 145, y: 110, r: 22, fill: "#ef4444" },
    ],
    bonds: [
      { x1: 54, y1: 95, x2: 76, y2: 73, double: true },
      { x1: 104, y1: 73, x2: 126, y2: 95, double: true },
    ],
  },
];

const MoleculeDiagram = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {molecules.map((m, idx) => (
        <motion.div
          key={m.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          className="liquid-glass rounded-2xl p-5 flex flex-col items-center"
        >
          <motion.svg
            viewBox="0 0 180 150"
            className="w-full h-32"
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {m.bonds.map((b, i) => (
              <g key={i}>
                <line
                  x1={b.x1}
                  y1={b.y1}
                  x2={b.x2}
                  y2={b.y2}
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth={b.double ? 2 : 2.5}
                />
                {b.double && (
                  <line
                    x1={b.x1}
                    y1={b.y1 + 5}
                    x2={b.x2}
                    y2={b.y2 + 5}
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth={2}
                  />
                )}
              </g>
            ))}
            {m.atoms.map((a, i) => (
              <g key={i}>
                <circle cx={a.x} cy={a.y} r={a.r} fill={a.fill} stroke="rgba(255,255,255,0.4)" strokeWidth={1.5} />
                <text
                  x={a.x}
                  y={a.y + 5}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="600"
                  fill="white"
                  fontFamily="ui-sans-serif, system-ui"
                >
                  {a.el}
                </text>
              </g>
            ))}
          </motion.svg>
          <div className="mt-2 text-center">
            <div className="font-heading italic text-xl text-foreground">{m.formula}</div>
            <div className="text-foreground/40 font-body text-xs">{m.name}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MoleculeDiagram;
