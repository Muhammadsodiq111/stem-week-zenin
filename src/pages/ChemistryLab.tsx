import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import AnimatedSection from "../components/AnimatedSection";
import BlurText from "../components/BlurText";


/* ─── Pollutant Data ─── */
const molecules = [
  {
    id: "co", symbol: "CO", name: "Carbon Monoxide", badge: "Toxic", badgeClass: "bg-red-500/20 text-red-300",
    color: "#f97316",
    reaction: { lines: ["2C + O₂ → 2CO"], effect: "⚠️ Binds hemoglobin 240× stronger than O₂ — blocks oxygen transport" },
    info: "Carbon monoxide is produced by incomplete combustion in vehicles, heaters, and stoves. Colorless and odorless, it's extremely dangerous because you can't detect it without instruments."
  },
  {
    id: "no2", symbol: "NO₂", name: "Nitrogen Dioxide", badge: "Toxic", badgeClass: "bg-red-500/20 text-red-300",
    color: "#a855f7",
    reaction: { lines: ["N₂ + 2O₂ → 2NO₂", "NO₂ + hν → NO + O·", "O· + O₂ → O₃"], effect: "⚠️ Creates ground-level ozone and irritates airways, forming nitric acid in lungs" },
    info: "NO₂ is a reddish-brown gas from vehicle exhaust and power plants. It reacts with sunlight to produce ground-level ozone — a key component of photochemical smog."
  },
  {
    id: "so2", symbol: "SO₂", name: "Sulfur Dioxide", badge: "Irritant", badgeClass: "bg-yellow-500/20 text-yellow-300",
    color: "#f59e0b",
    reaction: { lines: ["S + O₂ → SO₂", "SO₂ + H₂O → H₂SO₃", "2SO₂ + O₂ + 2H₂O → 2H₂SO₄"], effect: "⚠️ Forms sulfuric acid — causes acid rain that damages ecosystems" },
    info: "SO₂ comes from burning coal and oil containing sulfur impurities. It causes immediate airway constriction and is especially dangerous for people with asthma."
  },
  {
    id: "o3", symbol: "O₃", name: "Ground-level Ozone", badge: "Oxidant", badgeClass: "bg-red-500/20 text-red-300",
    color: "#06b6d4",
    reaction: { lines: ["NO₂ + hν → NO + O·", "O· + O₂ → O₃"], effect: "⚠️ Oxidizes lung tissue — reduces lung function, triggers asthma attacks" },
    info: "Unlike the protective ozone layer in the stratosphere, ground-level ozone is a toxic irritant. It forms when NO₂ and VOCs react in sunlight — worst on hot, sunny days."
  },
  {
    id: "pm", symbol: "PM₂.₅", name: "Fine Particles", badge: "Systemic", badgeClass: "bg-red-500/20 text-red-300",
    color: "#ef4444",
    reaction: { lines: ["PM2.5 enters alveoli → crosses membrane", "PM2.5 → triggers ROS → oxidative stress", "ROS → DNA damage + cell death"], effect: "⚠️ Systemic inflammation — damages lungs, heart, brain, and DNA" },
    info: "PM2.5 particles are so small (≤2.5 µm) they bypass all lung defenses. They enter the bloodstream and cause inflammation throughout the body. WHO calls it the most dangerous air pollutant."
  },
];

/* ─── Step Chain Component ─── */
const StepChain = ({ steps, highlight }: { steps: { formula: string; desc: string; highlighted?: boolean }[]; highlight?: string }) => (
  <div className="flex flex-wrap items-start gap-2 my-6">
    {steps.map((s, i) => (
      <div key={i} className="flex items-center gap-2">
        {i > 0 && <span className="text-sky-400 font-bold text-lg">→</span>}
        <div className={`rounded-xl p-3 text-center min-w-[80px] flex-1 ${
          s.highlighted ? "border-2 border-sky-400/50 bg-sky-500/10" : "bg-[#0f172a]"
        }`}>
          <div className={`text-base font-heading italic font-bold ${s.highlighted ? "text-sky-400" : "text-sky-300"}`}>{s.formula}</div>
          <div className="text-[11px] text-foreground/40 mt-1 leading-tight">{s.desc}</div>
        </div>
      </div>
    ))}
  </div>
);

/* ─── PAGE ─── */
const ChemistryLab = () => {
  const [activeMol, setActiveMol] = useState("co");
  const active = molecules.find(m => m.id === activeMol)!;

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary to-background" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-32">
          <AnimatedSection>
            <span className="inline-block liquid-glass rounded-full px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase text-foreground/80 mb-6">
              🧪 Interactive Lab
            </span>
          </AnimatedSection>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading italic leading-[1.1] mb-6 text-foreground">
            <BlurText text="Chemistry Laboratory" />
          </h1>
          <AnimatedSection delay={0.4}>
            <p className="text-base sm:text-lg font-body font-light text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Explore chemical transformations of pollutants in the atmosphere and the human body.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 pb-20 space-y-20">
        {/* Pollutant Selector */}
        <AnimatedSection>
          <h2 className="text-2xl sm:text-4xl font-heading italic text-foreground mb-2">🧪 Major Pollutants</h2>
          <p className="text-foreground/40 font-body text-sm mb-6">Click to explore each pollutant's atmospheric reaction</p>

          <div className="liquid-glass rounded-2xl p-6 md:p-8">
            {/* Molecule cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
              {molecules.map(m => (
                <button
                  key={m.id}
                  onClick={() => setActiveMol(m.id)}
                  className={`rounded-xl p-4 text-center transition-all duration-300 border-2 ${
                    activeMol === m.id
                      ? "border-sky-400 bg-sky-500/10 shadow-lg shadow-sky-500/10"
                      : "border-foreground/10 liquid-glass hover:border-foreground/30"
                  }`}
                >
                  <div className="text-2xl font-heading italic font-bold mb-1" style={{ color: m.color }}>{m.symbol}</div>
                  <div className="text-[11px] text-foreground/50 font-body">{m.name}</div>
                  <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-body font-bold mt-2 ${m.badgeClass}`}>{m.badge}</span>
                </button>
              ))}
            </div>

            {/* Reaction Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-[#0a1020] rounded-xl p-6 border border-foreground/10">
                  <h3 className="text-foreground/50 font-body text-xs uppercase tracking-widest mb-4">Atmospheric Reaction</h3>
                  <div className="space-y-2 mb-4">
                    {active.reaction.lines.map((line, i) => (
                      <div key={i} className="text-foreground font-mono text-base text-center">{line}</div>
                    ))}
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-200 font-body text-center">
                    {active.reaction.effect}
                  </div>
                </div>

                <div className="mt-4 liquid-glass rounded-xl p-5">
                  <p className="text-foreground/60 font-body font-light text-sm leading-relaxed">{active.info}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </AnimatedSection>

        {/* Ozone Formation */}
        <AnimatedSection>
          <h2 className="text-2xl sm:text-4xl font-heading italic text-foreground mb-2">⚗️ Ozone Formation (Photochemical Smog)</h2>
          <p className="text-foreground/40 font-body text-sm mb-6">How sunlight turns vehicle exhaust into toxic ozone</p>

          <div className="liquid-glass rounded-2xl p-6 md:p-8">
            <p className="text-foreground/60 font-body font-light text-base mb-4">
              Sunlight breaks NO₂ into NO and atomic oxygen. That oxygen reacts with O₂ to form ground-level ozone O₃ — a toxic irritant harmful to lungs.
            </p>

            <StepChain steps={[
              { formula: "NO₂", desc: "Nitrogen dioxide\n(from vehicles)" },
              { formula: "☀️ hν", desc: "UV sunlight\n(photon energy)" },
              { formula: "NO", desc: "Nitric oxide" },
              { formula: "O·", desc: "Atomic oxygen\n(reactive)" },
              { formula: "O₃", desc: "Ground ozone\n⚠️ toxic", highlighted: true },
            ]} />

            <div className="bg-[#0a1020] rounded-lg p-4 font-mono text-foreground text-center text-base leading-8">
              NO₂ + hν → NO + O·<br />
              O· + O₂ → <span className="text-sky-400 font-bold">O₃</span>
            </div>

            <p className="text-foreground/40 font-body font-light text-sm mt-4">
              💡 Ground-level ozone (smog) is different from the protective stratospheric ozone layer. At ground level it causes respiratory inflammation and reduced lung function.
            </p>
          </div>
        </AnimatedSection>

        {/* Acid Rain */}
        <AnimatedSection>
          <h2 className="text-2xl sm:text-4xl font-heading italic text-foreground mb-2">🌧️ Acid Rain Formation</h2>
          <p className="text-foreground/40 font-body text-sm mb-6">From SO₂ emissions to sulfuric acid rain</p>

          <div className="liquid-glass rounded-2xl p-6 md:p-8">
            <p className="text-foreground/60 font-body font-light text-base mb-4">
              SO₂ from burning fossil fuels dissolves in atmospheric water to form sulfurous acid, which oxidises to sulfuric acid — causing acid rain.
            </p>

            <StepChain steps={[
              { formula: "SO₂", desc: "Sulfur dioxide\n(coal, fuel)" },
              { formula: "H₂O", desc: "Atmospheric\nwater vapour" },
              { formula: "H₂SO₃", desc: "Sulfurous acid\n(pH ~4)" },
              { formula: "H₂SO₄", desc: "Sulfuric acid\n⛈️ acid rain", highlighted: true },
            ]} />

            <div className="border-t border-foreground/10 pt-6 mt-6">
              <h4 className="font-body font-bold text-sm text-foreground mb-3">Also from NO₂: Nitric Acid Rain</h4>
              <StepChain steps={[
                { formula: "NO₂", desc: "Nitrogen dioxide" },
                { formula: "H₂O", desc: "Water" },
                { formula: "HNO₃", desc: "Nitric acid ⛈️", highlighted: true },
              ]} />
            </div>
          </div>
        </AnimatedSection>

        {/* Body Reactions */}
        <AnimatedSection>
          <h2 className="text-2xl sm:text-4xl font-heading italic text-foreground mb-2">🫀 Reactions in the Human Body</h2>
          <p className="text-foreground/40 font-body text-sm mb-6">How pollutants chemically damage your organs</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0a1020] border border-foreground/10 rounded-2xl p-6">
              <h4 className="text-sky-400 font-body font-bold text-sm mb-3">🩸 CO + Haemoglobin</h4>
              <div className="inline-block font-mono text-sky-200 bg-sky-500/10 border border-sky-500/20 rounded-lg px-3 py-1.5 text-sm mb-3">
                CO + Hb → COHb
              </div>
              <p className="text-foreground/50 font-body font-light text-sm leading-relaxed">
                CO binds haemoglobin ~240× more strongly than O₂, forming carboxyhaemoglobin. This blocks oxygen delivery to tissues and organs.
              </p>
              <div className="mt-3 bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-[12px] text-red-200 font-body">
                ⚠️ CO source: incomplete combustion in vehicles, heating systems. Odourless and invisible.
              </div>
            </div>

            <div className="bg-[#0a1020] border border-foreground/10 rounded-2xl p-6">
              <h4 className="text-sky-400 font-body font-bold text-sm mb-3">⚡ PM2.5 → Oxidative Stress</h4>
              <div className="inline-block font-mono text-sky-200 bg-sky-500/10 border border-sky-500/20 rounded-lg px-3 py-1.5 text-sm mb-3">
                PM2.5 → ROS → DNA damage
              </div>
              <p className="text-foreground/50 font-body font-light text-sm leading-relaxed">
                PM2.5 triggers Reactive Oxygen Species (ROS) — unstable molecules that attack DNA, proteins, and cell membranes, causing oxidative stress.
              </p>
              <div className="mt-3 bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-[12px] text-red-200 font-body">
                ⚠️ ROS damage is cumulative and linked to cancer, premature ageing, and cardiovascular disease.
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ChemistryLab;
