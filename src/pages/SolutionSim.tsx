import { useState, useCallback } from "react";
import { motion } from "motion/react";
import AnimatedSection from "../components/AnimatedSection";
import BlurText from "../components/BlurText";


const BASELINE = 31.4;
const WHO_LIMIT = 5;

const FACTORS = {
  cars: { label: "🚗 Vehicle Emission Reduction", maxReduction: 13.2, color: "#3b82f6", desc: "Shift to EVs, restrict old diesel vehicles, expand metro" },
  trees: { label: "🌳 Urban Tree Coverage", maxReduction: 4.1, color: "#22c55e", desc: "Trees absorb PM2.5 and CO₂, reduce urban heat" },
  fact: { label: "🏭 Industrial Regulation", maxReduction: 8.1, color: "#f59e0b", desc: "Require scrubbers, switch to gas/renewables, enforce limits" },
};

type FactorKey = keyof typeof FACTORS;

function pmColor(pm: number) {
  if (pm <= 5) return "#22c55e";
  if (pm <= 12) return "#84cc16";
  if (pm <= 15) return "#eab308";
  if (pm <= 35) return "#f59e0b";
  if (pm <= 75) return "#ef4444";
  return "#7f1d1d";
}

function pmStatus(pm: number) {
  if (pm <= 5) return "Good (WHO target)";
  if (pm <= 12) return "Moderate";
  if (pm <= 15) return "Slightly Unhealthy";
  if (pm <= 35) return "Unhealthy";
  if (pm <= 75) return "Very Unhealthy";
  return "Hazardous";
}

const scenarios = [
  { name: "❌ No Action", desc: "Current trajectory — no policy change", cars: 0, trees: 0, fact: 0 },
  { name: "📈 Moderate Reform", desc: "Partial EV shift, some greening, basic industrial rules", cars: 30, trees: 20, fact: 20 },
  { name: "🌱 Ambitious Action", desc: "Aggressive EVs, major green belt, strict factory laws", cars: 60, trees: 40, fact: 50 },
  { name: "🏆 Best Case", desc: "Maximum feasible action across all sectors", cars: 80, trees: 60, fact: 70 },
];

const SolutionSim = () => {
  const [vals, setVals] = useState<Record<FactorKey, number>>({ cars: 0, trees: 0, fact: 0 });

  const reductions = Object.entries(FACTORS).map(([key, f]) => {
    const v = vals[key as FactorKey];
    const red = (v / 100) * f.maxReduction;
    return { key, ...f, value: v, reduction: red };
  });

  const totalReduction = reductions.reduce((s, r) => s + r.reduction, 0);
  const currentPM = Math.max(BASELINE - totalReduction, 0);
  const color = pmColor(currentPM);
  const status = pmStatus(currentPM);
  const whoRatio = (currentPM / WHO_LIMIT).toFixed(1);

  const applyScenario = useCallback((cars: number, trees: number, fact: number) => {
    setVals({ cars, trees, fact });
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <NightSkyBackground />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-32">
          <AnimatedSection>
            <span className="inline-block liquid-glass rounded-full px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase text-foreground/80 mb-6">
              🎛️ Interactive Simulator
            </span>
          </AnimatedSection>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading italic leading-[1.1] mb-6 text-foreground">
            <BlurText text="Solution Simulator" />
          </h1>
          <AnimatedSection delay={0.4}>
            <p className="text-base sm:text-lg font-body font-light text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Adjust policy sliders and see how PM2.5 levels in Tashkent could change in real time.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          {/* Left: Controls */}
          <div className="space-y-6">
            {/* Policy Sliders */}
            <div className="liquid-glass rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-heading italic text-foreground mb-6">🎛️ Policy Controls</h3>

              {reductions.map(r => (
                <div key={r.key} className="mb-6 last:mb-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-body font-medium text-foreground">{r.label}</span>
                    <span className="liquid-glass-strong rounded-full px-3 py-1 text-xs font-body font-bold text-foreground">{r.value}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={r.key === "cars" ? 80 : r.key === "trees" ? 60 : 70}
                    value={r.value}
                    step={5}
                    onChange={e => setVals(v => ({ ...v, [r.key]: +e.target.value }))}
                    className="w-full accent-sky-400 h-1.5"
                  />
                  <div className="text-foreground/40 font-body text-xs mt-1">
                    {r.desc}. <strong>Max potential: −{r.maxReduction} µg/m³</strong>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-foreground/10 text-foreground/40 font-body text-xs space-y-1">
                <div>Current Tashkent baseline: {BASELINE} µg/m³</div>
                <div>WHO annual target: {WHO_LIMIT} µg/m³</div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="liquid-glass rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-heading italic text-foreground mb-4">Reduction Breakdown</h3>
              {reductions.map(r => (
                <div key={r.key} className="flex items-center gap-3 py-2 border-b border-foreground/5 last:border-0">
                  <span className="text-sm font-body font-medium text-foreground min-w-[200px]">{r.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-foreground/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: r.color }}
                      animate={{ width: `${(r.reduction / BASELINE) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="text-sm font-body font-bold text-foreground min-w-[70px] text-right">
                    −{r.reduction.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>

            {/* Scenarios */}
            <div className="liquid-glass rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-heading italic text-foreground mb-4">📋 Try a Scenario</h3>
              <div className="grid grid-cols-2 gap-3">
                {scenarios.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => applyScenario(s.cars, s.trees, s.fact)}
                    className="liquid-glass rounded-xl p-4 text-left hover:border-foreground/30 transition-all border border-foreground/10"
                  >
                    <div className="text-sm font-body font-bold text-foreground mb-1">{s.name}</div>
                    <div className="text-xs text-foreground/40 font-body">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: PM2.5 Meter */}
          <div className="space-y-6">
            <div className="liquid-glass-strong rounded-2xl p-6 text-center sticky top-24">
              <div className="text-foreground/50 font-body text-xs font-bold uppercase tracking-widest mb-4">Estimated PM2.5</div>

              <motion.div
                className="text-6xl font-heading italic mb-1"
                style={{ color }}
                key={currentPM.toFixed(1)}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {currentPM.toFixed(1)}
              </motion.div>
              <div className="text-foreground/40 font-body text-sm">µg/m³</div>
              <div className="font-body font-bold text-sm mt-2" style={{ color }}>{status}</div>

              {/* Gradient bar */}
              <div className="mt-6 mb-2">
                <div className="h-3 rounded-full overflow-hidden relative" style={{ background: "linear-gradient(to right, #22c55e, #84cc16, #eab308, #f59e0b, #ef4444, #7f1d1d)" }}>
                  <motion.div
                    className="absolute top-0 w-3 h-3 rounded-full bg-foreground border-2 border-background"
                    animate={{ left: `${Math.min((currentPM / 75) * 100, 100)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-foreground/30 font-body mt-1">
                  <span>WHO 5</span><span>15</span><span>35</span><span>75+</span>
                </div>
              </div>

              {/* Summary */}
              <div className="liquid-glass rounded-xl p-4 mt-4 text-left">
                <div className="text-foreground/40 font-body text-xs">Total reduction</div>
                <div className="text-2xl font-heading italic text-green-400">−{totalReduction.toFixed(1)} µg/m³</div>
                <div className="text-foreground/40 font-body text-xs mt-1">
                  {currentPM.toFixed(1)} µg/m³ remaining ({whoRatio}× WHO limit)
                </div>
              </div>

              {/* WHO comparison bar */}
              <div className="liquid-glass rounded-xl p-4 mt-3 text-left">
                <div className="text-foreground/50 font-body text-xs font-bold mb-2">vs WHO Annual Limit (5 µg/m³)</div>
                <div className="relative h-3 rounded-full bg-foreground/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, #22c55e, ${color})` }}
                    animate={{ width: `${Math.min((currentPM / 50) * 100, 100)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute top-0 h-full border-r-2 border-foreground" style={{ left: `${(WHO_LIMIT / 50) * 100}%` }} />
                </div>
                <div className="flex justify-between text-[10px] text-foreground/30 font-body mt-1">
                  <span>0</span><span>WHO: 5</span><span>50 µg/m³</span>
                </div>
              </div>
            </div>

            {/* Co-benefits */}
            <div className="liquid-glass rounded-2xl p-6">
              <h3 className="text-lg font-heading italic text-foreground mb-3">💚 Co-Benefits</h3>
              <div className="space-y-3">
                {[
                  { num: `${Math.round(totalReduction * 200)}+`, label: "Lives saved per year in Tashkent" },
                  { num: `${Math.round(totalReduction * 0.3 * 10) / 10}%`, label: "Reduction in child asthma cases" },
                  { num: `${Math.round(totalReduction * 50)}`, label: "Hospital admissions prevented" },
                  { num: `$${Math.round(totalReduction * 8)}M`, label: "Healthcare cost savings" },
                ].map((b, i) => (
                  <div key={i} className="bg-[#0f172a] rounded-xl p-3 border-l-3 border-sky-400">
                    <div className="text-sky-400 font-heading italic text-lg">{b.num}</div>
                    <div className="text-foreground/40 font-body text-xs">{b.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionSim;
