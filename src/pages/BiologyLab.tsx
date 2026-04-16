import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import AnimatedSection from "../components/AnimatedSection";
import BlurText from "../components/BlurText";


/* ─── Organ Data ─── */
const ORGAN_DATA: Record<string, {
  icon: string; name: string; color: string; damage: number;
  subtitle: string; effects: { icon: string; title: string; desc: string }[];
}> = {
  lungs: {
    icon: "🫁", name: "Lungs", color: "#3b82f6", damage: 85,
    subtitle: "Primary entry point for all airborne pollutants",
    effects: [
      { icon: "🔥", title: "Inflammation & Asthma", desc: "PM2.5 triggers inflammatory cytokines in bronchial tissue. Chronic exposure causes persistent airway inflammation — the root of asthma." },
      { icon: "🫁", title: "Alveolar Destruction", desc: "Ultrafine particles deposit in alveoli, activating macrophages. Over time, alveolar walls are destroyed — reducing gas exchange capacity (COPD)." },
      { icon: "🧬", title: "DNA Mutation → Cancer", desc: "Polycyclic aromatic hydrocarbons (PAHs) on PM2.5 surfaces are potent carcinogens. They bind to DNA, causing mutations that can lead to lung cancer." },
      { icon: "🛡️", title: "Mucociliary Shutdown", desc: "SO₂ and NO₂ paralyze cilia — the tiny hairs that sweep mucus and debris out of airways. Without them, infections and particle buildup worsen rapidly." },
    ]
  },
  heart: {
    icon: "❤️", name: "Heart", color: "#ef4444", damage: 70,
    subtitle: "Systemic inflammation from pollutants damages cardiovascular system",
    effects: [
      { icon: "🩸", title: "Blood Thickening", desc: "PM2.5 entering the bloodstream triggers platelet activation and fibrinogen release — making blood thicker and more likely to clot." },
      { icon: "💔", title: "Atherosclerosis Acceleration", desc: "Chronic inflammation oxidizes LDL cholesterol, building plaques inside artery walls. Pollution exposure accelerates this process significantly." },
      { icon: "⚡", title: "Arrhythmia Risk", desc: "Ultrafine particles affect the autonomic nervous system, disrupting heart rhythm. Studies show higher PM2.5 days correlate with increased cardiac arrest calls." },
      { icon: "📈", title: "Hypertension", desc: "Pollution triggers vasoconstriction through oxidative stress and endothelin release — raising blood pressure even in young, healthy adults." },
    ]
  },
  brain: {
    icon: "🧠", name: "Brain", color: "#a855f7", damage: 55,
    subtitle: "Ultrafine particles can cross the blood-brain barrier",
    effects: [
      { icon: "🧱", title: "Blood-Brain Barrier Breach", desc: "Ultrafine PM (<0.1µm) can cross the blood-brain barrier directly. Once inside, they trigger neuroinflammation — a key factor in cognitive decline." },
      { icon: "🧓", title: "Accelerated Neurodegeneration", desc: "Long-term exposure is linked to increased risk of Alzheimer's and Parkinson's disease. Pollution-related brain inflammation mirrors neurodegenerative pathology." },
      { icon: "⚡", title: "Stroke Risk", desc: "Inflammation + blood thickening + hypertension = dramatically increased stroke risk. High pollution days see 10–30% more stroke hospital admissions." },
      { icon: "📉", title: "Cognitive Impairment in Children", desc: "Children exposed to high pollution show reduced working memory, lower IQ scores, and slower processing speed compared to peers in clean air areas." },
    ]
  },
  cells: {
    icon: "🧬", name: "Cells", color: "#22c55e", damage: 90,
    subtitle: "Oxidative stress at the molecular level",
    effects: [
      { icon: "⚡", title: "Reactive Oxygen Species (ROS)", desc: "PM2.5 triggers production of ROS — unstable molecules that damage everything they touch: DNA, proteins, lipids, and mitochondria." },
      { icon: "🧬", title: "DNA Damage & Mutation", desc: "ROS cause single and double-strand DNA breaks. If repair mechanisms fail, mutations accumulate — increasing cancer risk across multiple organs." },
      { icon: "🔋", title: "Mitochondrial Dysfunction", desc: "ROS attack mitochondria — the cell's power plants. Damaged mitochondria produce less energy and more ROS, creating a destructive feedback loop." },
      { icon: "💀", title: "Apoptosis & Necrosis", desc: "Overwhelming oxidative stress triggers programmed cell death (apoptosis) or uncontrolled cell death (necrosis) — both leading to tissue damage and organ failure." },
    ]
  },
};

/* ─── SVG Body Diagram ─── */
const BodyDiagram = ({ activeOrgan, onSelect }: { activeOrgan: string; onSelect: (o: string) => void }) => (
  <svg viewBox="0 0 200 420" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[240px] mx-auto">
    <defs>
      <radialGradient id="bodyGrad" cx="50%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#1e3a5f" />
        <stop offset="100%" stopColor="#0f172a" />
      </radialGradient>
    </defs>

    {/* Legs */}
    <rect x="72" y="280" width="24" height="120" rx="10" fill="#1e3a5f" />
    <rect x="104" y="280" width="24" height="120" rx="10" fill="#1e3a5f" />
    <ellipse cx="84" cy="400" rx="18" ry="8" fill="#1a3050" />
    <ellipse cx="116" cy="400" rx="18" ry="8" fill="#1a3050" />

    {/* Torso */}
    <rect x="60" y="155" width="80" height="130" rx="18" fill="url(#bodyGrad)" />

    {/* Arms */}
    <rect x="30" y="155" width="22" height="95" rx="11" fill="#1e3a5f" />
    <rect x="148" y="155" width="22" height="95" rx="11" fill="#1e3a5f" />
    <ellipse cx="41" cy="255" rx="14" ry="10" fill="#1a3050" />
    <ellipse cx="159" cy="255" rx="14" ry="10" fill="#1a3050" />

    {/* Neck */}
    <rect x="86" y="128" width="28" height="30" rx="8" fill="#1e3a5f" />

    {/* Head */}
    <circle cx="100" cy="105" r="45" fill="url(#bodyGrad)" stroke="#2d4a6f" strokeWidth="1.5" />
    <circle cx="88" cy="100" r="4" fill="#38bdf8" opacity=".7" />
    <circle cx="112" cy="100" r="4" fill="#38bdf8" opacity=".7" />
    <path d="M88 118 Q100 126 112 118" stroke="#38bdf8" strokeWidth="2" fill="none" opacity=".5" />

    {/* Clickable Organs */}
    <g onClick={() => onSelect("lungs")} className="cursor-pointer">
      <ellipse cx="82" cy="205" rx="16" ry="24" fill="#3b82f6" fillOpacity={activeOrgan === "lungs" ? 0.9 : 0.5} stroke="#60a5fa" strokeWidth="1.5">
        {activeOrgan === "lungs" && <animate attributeName="fill-opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite" />}
      </ellipse>
      <ellipse cx="118" cy="205" rx="16" ry="24" fill="#3b82f6" fillOpacity={activeOrgan === "lungs" ? 0.9 : 0.5} stroke="#60a5fa" strokeWidth="1.5">
        {activeOrgan === "lungs" && <animate attributeName="fill-opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite" />}
      </ellipse>
      <line x1="100" y1="175" x2="100" y2="182" stroke="#93c5fd" strokeWidth="2" />
      <line x1="100" y1="180" x2="87" y2="192" stroke="#93c5fd" strokeWidth="2" />
      <line x1="100" y1="180" x2="113" y2="192" stroke="#93c5fd" strokeWidth="2" />
    </g>

    <g onClick={() => onSelect("heart")} className="cursor-pointer">
      <path d="M100 220 C100 220 85 207 85 200 C85 195 90 191 95 194 C97 195 100 198 100 198 C100 198 103 195 105 194 C110 191 115 195 115 200 C115 207 100 220 100 220Z"
        fill="#ef4444" fillOpacity={activeOrgan === "heart" ? 0.95 : 0.6} stroke="#fca5a5" strokeWidth="1.2">
        {activeOrgan === "heart" && <animate attributeName="fill-opacity" values="0.95;0.5;0.95" dur="2s" repeatCount="indefinite" />}
      </path>
    </g>

    <g onClick={() => onSelect("brain")} className="cursor-pointer">
      <ellipse cx="100" cy="97" rx="30" ry="26" fill="#a855f7" fillOpacity={activeOrgan === "brain" ? 0.7 : 0.35} stroke="#c084fc" strokeWidth="1.5">
        {activeOrgan === "brain" && <animate attributeName="fill-opacity" values="0.7;0.35;0.7" dur="2s" repeatCount="indefinite" />}
      </ellipse>
      <path d="M80 90 Q90 82 100 88 Q110 82 120 90" stroke="#c084fc" strokeWidth="1.2" fill="none" opacity=".8" />
      <path d="M78 100 Q88 95 98 100 Q108 95 118 100" stroke="#c084fc" strokeWidth="1.2" fill="none" opacity=".7" />
    </g>

    <g onClick={() => onSelect("cells")} className="cursor-pointer">
      <rect x="88" y="240" width="24" height="24" rx="5" fill="#22c55e" fillOpacity={activeOrgan === "cells" ? 0.8 : 0.45} stroke="#86efac" strokeWidth="1.5">
        {activeOrgan === "cells" && <animate attributeName="fill-opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" />}
      </rect>
      <circle cx="100" cy="252" r="5" fill="none" stroke="#86efac" strokeWidth="1" opacity=".8" />
    </g>

    {/* Labels */}
    <text x="52" y="168" fontSize="8" fill="#60a5fa" fontFamily="sans-serif" textAnchor="middle">Lungs</text>
    <line x1="65" y1="169" x2="76" y2="190" stroke="#60a5fa" strokeWidth=".8" opacity=".5" />
    <text x="148" y="225" fontSize="8" fill="#fca5a5" fontFamily="sans-serif" textAnchor="middle">Heart</text>
    <line x1="138" y1="222" x2="115" y2="213" stroke="#fca5a5" strokeWidth=".8" opacity=".5" />
    <text x="148" y="100" fontSize="8" fill="#c084fc" fontFamily="sans-serif" textAnchor="middle">Brain</text>
    <line x1="138" y1="97" x2="130" y2="97" stroke="#c084fc" strokeWidth=".8" opacity=".5" />
    <text x="148" y="258" fontSize="8" fill="#86efac" fontFamily="sans-serif" textAnchor="middle">Cells</text>
    <line x1="138" y1="256" x2="112" y2="253" stroke="#86efac" strokeWidth=".8" opacity=".5" />
  </svg>
);

/* ─── PAGE ─── */
const BiologyLab = () => {
  const [activeOrgan, setActiveOrgan] = useState("lungs");
  const organ = ORGAN_DATA[activeOrgan];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <NightSkyBackground />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-32">
          <AnimatedSection>
            <span className="inline-block liquid-glass rounded-full px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase text-foreground/80 mb-6">
              🧬 Interactive Lab
            </span>
          </AnimatedSection>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading italic leading-[1.1] mb-6 text-foreground">
            <BlurText text="Biology Laboratory" />
          </h1>
          <AnimatedSection delay={0.4}>
            <p className="text-base sm:text-lg font-body font-light text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Discover how air pollution damages the human body from organ to cellular level.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 pb-20 space-y-20">
        {/* Organ Explorer */}
        <AnimatedSection>
          <h2 className="text-2xl sm:text-4xl font-heading italic text-foreground mb-2">🧬 Organ Effects</h2>
          <p className="text-foreground/40 font-body text-sm mb-6">Click an organ on the body to explore the effects of pollution</p>

          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
            {/* Left: Body */}
            <div className="liquid-glass rounded-2xl p-6">
              <h3 className="text-foreground/50 font-body font-medium text-sm text-center mb-4">
                Damage level at Tashkent PM2.5 (31.4 µg/m³):
              </h3>
              <BodyDiagram activeOrgan={activeOrgan} onSelect={setActiveOrgan} />
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {Object.entries(ORGAN_DATA).map(([key, o]) => (
                  <button
                    key={key}
                    onClick={() => setActiveOrgan(key)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-body font-medium transition-all border-2 ${
                      activeOrgan === key
                        ? "border-sky-400 bg-sky-500/10 text-sky-300"
                        : "border-foreground/10 text-foreground/60 hover:border-foreground/30"
                    }`}
                  >
                    {o.icon} {o.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Info Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeOrgan}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.3 }}
                className="liquid-glass rounded-2xl p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{organ.icon}</span>
                  <div>
                    <h3 className="text-2xl font-heading italic text-foreground">{organ.name}</h3>
                    <p className="text-foreground/40 font-body text-sm">{organ.subtitle}</p>
                  </div>
                </div>

                {/* Damage bar */}
                <div className="mt-4 mb-6">
                  <div className="text-foreground/50 font-body text-xs font-medium mb-1">Damage Level</div>
                  <div className="h-2.5 rounded-full bg-red-500/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, #f59e0b, #ef4444)` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${organ.damage}%` }}
                      transition={{ duration: 0.7 }}
                    />
                  </div>
                  <div className="text-right text-xs text-foreground/40 font-body mt-1">{organ.damage}%</div>
                </div>

                {/* Effects list */}
                <div className="space-y-4">
                  {organ.effects.map((eff, i) => (
                    <div key={i} className="flex items-start gap-3 pb-4 border-b border-foreground/5 last:border-0">
                      <span className="text-lg mt-0.5">{eff.icon}</span>
                      <div>
                        <div className="text-foreground font-body font-medium text-sm">{eff.title}</div>
                        <div className="text-foreground/50 font-body font-light text-sm leading-relaxed mt-1">{eff.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </AnimatedSection>

        {/* Exposure Pathway */}
        <AnimatedSection>
          <h2 className="text-2xl sm:text-4xl font-heading italic text-foreground mb-2">🔬 Pollution Exposure Pathway</h2>
          <p className="text-foreground/40 font-body text-sm mb-6">How particles travel from air to organ damage</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { icon: "😮‍💨", title: "Inhalation", desc: "PM2.5 enters via nose/mouth, bypasses mucociliary defences, reaches alveoli", color: "border-sky-400" },
              { icon: "🫁", title: "Lung Absorption", desc: "Particles deposit in alveoli, trigger macrophage response and inflammatory cytokines", color: "border-red-400" },
              { icon: "🩸", title: "Bloodstream Entry", desc: "Ultrafine particles cross alveolar membrane directly into blood circulation", color: "border-yellow-400" },
              { icon: "🧠", title: "Systemic Effects", desc: "Inflammation spreads to heart, brain, liver — damaging organs far from the lungs", color: "border-purple-400" },
              { icon: "🧬", title: "Cellular Level", desc: "Oxidative stress damages DNA and mitochondria — linked to cancer, ageing, neurodegeneration", color: "border-green-400" },
            ].map((step, i) => (
              <div key={i} className={`bg-[#0f172a] rounded-xl p-4 border-l-3 ${step.color}`}>
                <div className="text-2xl mb-2">{step.icon}</div>
                <div className="text-foreground font-body font-bold text-sm mb-1">{step.title}</div>
                <div className="text-foreground/40 font-body font-light text-xs leading-relaxed">{step.desc}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default BiologyLab;
