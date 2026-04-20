import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import AnimatedSection from "../components/AnimatedSection";
import BlurText from "../components/BlurText";

/* ─── Organ Data ─── */
const ORGAN_DATA: Record<string, {
  icon: string; name: string; accent: string; damage: number;
  subtitle: string; effects: { icon: string; title: string; desc: string }[];
}> = {
  lungs: {
    icon: "🫁", name: "Lungs", accent: "sky", damage: 85,
    subtitle: "Primary entry point for all airborne pollutants",
    effects: [
      { icon: "🔥", title: "Inflammation & Asthma", desc: "PM2.5 triggers inflammatory cytokines in bronchial tissue. Chronic exposure causes persistent airway inflammation — the root of asthma." },
      { icon: "🫁", title: "Alveolar Destruction", desc: "Ultrafine particles deposit in alveoli, activating macrophages. Over time, alveolar walls are destroyed — reducing gas exchange capacity (COPD)." },
      { icon: "🧬", title: "DNA Mutation → Cancer", desc: "Polycyclic aromatic hydrocarbons (PAHs) on PM2.5 surfaces are potent carcinogens. They bind to DNA, causing mutations that can lead to lung cancer." },
      { icon: "🛡️", title: "Mucociliary Shutdown", desc: "SO₂ and NO₂ paralyze cilia — the tiny hairs that sweep mucus and debris out of airways. Without them, infections and particle buildup worsen rapidly." },
    ]
  },
  heart: {
    icon: "❤️", name: "Heart", accent: "rose", damage: 70,
    subtitle: "Systemic inflammation damages the cardiovascular system",
    effects: [
      { icon: "🩸", title: "Blood Thickening", desc: "PM2.5 entering the bloodstream triggers platelet activation and fibrinogen release — making blood thicker and more likely to clot." },
      { icon: "💔", title: "Atherosclerosis", desc: "Chronic inflammation oxidizes LDL cholesterol, building plaques inside artery walls. Pollution exposure accelerates this process significantly." },
      { icon: "⚡", title: "Arrhythmia Risk", desc: "Ultrafine particles affect the autonomic nervous system, disrupting heart rhythm. Higher PM2.5 days correlate with more cardiac arrest calls." },
      { icon: "📈", title: "Hypertension", desc: "Pollution triggers vasoconstriction through oxidative stress and endothelin release — raising blood pressure even in young, healthy adults." },
    ]
  },
  brain: {
    icon: "🧠", name: "Brain", accent: "violet", damage: 55,
    subtitle: "Ultrafine particles can cross the blood-brain barrier",
    effects: [
      { icon: "🧱", title: "Blood-Brain Barrier Breach", desc: "Ultrafine PM (<0.1µm) crosses the blood-brain barrier directly. Once inside, they trigger neuroinflammation — a key factor in cognitive decline." },
      { icon: "🧓", title: "Neurodegeneration", desc: "Long-term exposure is linked to Alzheimer's and Parkinson's disease. Pollution-related brain inflammation mirrors neurodegenerative pathology." },
      { icon: "⚡", title: "Stroke Risk", desc: "Inflammation + blood thickening + hypertension = dramatically increased stroke risk. High pollution days see 10–30% more stroke admissions." },
      { icon: "📉", title: "Cognitive Impairment", desc: "Children exposed to high pollution show reduced working memory, lower IQ scores, and slower processing speed than peers in clean air areas." },
    ]
  },
  cells: {
    icon: "🧬", name: "Cells", accent: "emerald", damage: 90,
    subtitle: "Oxidative stress at the molecular level",
    effects: [
      { icon: "⚡", title: "Reactive Oxygen Species", desc: "PM2.5 triggers ROS — unstable molecules that damage everything they touch: DNA, proteins, lipids, and mitochondria." },
      { icon: "🧬", title: "DNA Damage", desc: "ROS cause single and double-strand DNA breaks. If repair mechanisms fail, mutations accumulate — increasing cancer risk across multiple organs." },
      { icon: "🔋", title: "Mitochondrial Dysfunction", desc: "ROS attack mitochondria — the cell's power plants. Damaged mitochondria produce less energy and more ROS, creating a destructive feedback loop." },
      { icon: "💀", title: "Apoptosis & Necrosis", desc: "Overwhelming oxidative stress triggers programmed or uncontrolled cell death — both leading to tissue damage and organ failure." },
    ]
  },
};

const ACCENT_TEXT: Record<string, string> = {
  sky: "text-sky-300", rose: "text-rose-300", violet: "text-violet-300", emerald: "text-emerald-300",
};
const ACCENT_BORDER: Record<string, string> = {
  sky: "border-sky-400/40", rose: "border-rose-400/40", violet: "border-violet-400/40", emerald: "border-emerald-400/40",
};
const ACCENT_BG: Record<string, string> = {
  sky: "bg-sky-400/10", rose: "bg-rose-400/10", violet: "bg-violet-400/10", emerald: "bg-emerald-400/10",
};

/* ─── SVG Body Diagram ─── */
const BodyDiagram = ({ activeOrgan, onSelect }: { activeOrgan: string; onSelect: (o: string) => void }) => (
  <svg viewBox="0 0 200 420" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[240px] mx-auto">
    <defs>
      <radialGradient id="bodyGrad" cx="50%" cy="40%" r="55%">
        <stop offset="0%" stopColor="hsl(220 20% 22%)" />
        <stop offset="100%" stopColor="hsl(220 20% 12%)" />
      </radialGradient>
    </defs>

    <rect x="72" y="280" width="24" height="120" rx="10" fill="hsl(220 20% 18%)" />
    <rect x="104" y="280" width="24" height="120" rx="10" fill="hsl(220 20% 18%)" />
    <ellipse cx="84" cy="400" rx="18" ry="8" fill="hsl(220 20% 14%)" />
    <ellipse cx="116" cy="400" rx="18" ry="8" fill="hsl(220 20% 14%)" />

    <rect x="60" y="155" width="80" height="130" rx="18" fill="url(#bodyGrad)" />

    <rect x="30" y="155" width="22" height="95" rx="11" fill="hsl(220 20% 18%)" />
    <rect x="148" y="155" width="22" height="95" rx="11" fill="hsl(220 20% 18%)" />
    <ellipse cx="41" cy="255" rx="14" ry="10" fill="hsl(220 20% 14%)" />
    <ellipse cx="159" cy="255" rx="14" ry="10" fill="hsl(220 20% 14%)" />

    <rect x="86" y="128" width="28" height="30" rx="8" fill="hsl(220 20% 18%)" />

    <circle cx="100" cy="105" r="45" fill="url(#bodyGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
    <circle cx="88" cy="100" r="3" fill="rgba(255,255,255,0.5)" />
    <circle cx="112" cy="100" r="3" fill="rgba(255,255,255,0.5)" />
    <path d="M88 118 Q100 126 112 118" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />

    {/* Lungs */}
    <g onClick={() => onSelect("lungs")} className="cursor-pointer">
      <ellipse cx="82" cy="205" rx="16" ry="24" fill="#38bdf8" fillOpacity={activeOrgan === "lungs" ? 0.85 : 0.4} stroke="#7dd3fc" strokeWidth="1.5">
        {activeOrgan === "lungs" && <animate attributeName="fill-opacity" values="0.85;0.45;0.85" dur="2.2s" repeatCount="indefinite" />}
      </ellipse>
      <ellipse cx="118" cy="205" rx="16" ry="24" fill="#38bdf8" fillOpacity={activeOrgan === "lungs" ? 0.85 : 0.4} stroke="#7dd3fc" strokeWidth="1.5">
        {activeOrgan === "lungs" && <animate attributeName="fill-opacity" values="0.85;0.45;0.85" dur="2.2s" repeatCount="indefinite" />}
      </ellipse>
    </g>

    {/* Heart */}
    <g onClick={() => onSelect("heart")} className="cursor-pointer">
      <path d="M100 220 C100 220 85 207 85 200 C85 195 90 191 95 194 C97 195 100 198 100 198 C100 198 103 195 105 194 C110 191 115 195 115 200 C115 207 100 220 100 220Z"
        fill="#fb7185" fillOpacity={activeOrgan === "heart" ? 0.95 : 0.55} stroke="#fda4af" strokeWidth="1.2">
        {activeOrgan === "heart" && <animate attributeName="fill-opacity" values="0.95;0.55;0.95" dur="1.8s" repeatCount="indefinite" />}
      </path>
    </g>

    {/* Brain */}
    <g onClick={() => onSelect("brain")} className="cursor-pointer">
      <ellipse cx="100" cy="97" rx="30" ry="26" fill="#a78bfa" fillOpacity={activeOrgan === "brain" ? 0.7 : 0.3} stroke="#c4b5fd" strokeWidth="1.5">
        {activeOrgan === "brain" && <animate attributeName="fill-opacity" values="0.7;0.3;0.7" dur="2.4s" repeatCount="indefinite" />}
      </ellipse>
      <path d="M80 90 Q90 82 100 88 Q110 82 120 90" stroke="#c4b5fd" strokeWidth="1.2" fill="none" opacity=".8" />
      <path d="M78 100 Q88 95 98 100 Q108 95 118 100" stroke="#c4b5fd" strokeWidth="1.2" fill="none" opacity=".7" />
    </g>

    {/* Cells */}
    <g onClick={() => onSelect("cells")} className="cursor-pointer">
      <rect x="88" y="240" width="24" height="24" rx="5" fill="#34d399" fillOpacity={activeOrgan === "cells" ? 0.8 : 0.4} stroke="#6ee7b7" strokeWidth="1.5">
        {activeOrgan === "cells" && <animate attributeName="fill-opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" />}
      </rect>
      <circle cx="100" cy="252" r="5" fill="none" stroke="#6ee7b7" strokeWidth="1" opacity=".8" />
    </g>
  </svg>
);

/* ─── PAGE ─── */
const BiologyLab = () => {
  const [activeOrgan, setActiveOrgan] = useState("lungs");
  const organ = ORGAN_DATA[activeOrgan];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <span className="liquid-glass rounded-full px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase text-foreground/60 inline-block mb-6">
            🧬 Interactive Lab
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading italic mb-6 text-foreground">
            <BlurText text="Biology Laboratory" />
          </h1>
          <p className="text-foreground/60 font-body font-light text-lg max-w-2xl leading-relaxed">
            Discover how air pollution damages the human body — from organ to cellular level.
          </p>
        </AnimatedSection>

        {/* ─── SECTION 1: Organ Explorer ─── */}
        <section className="mt-32">
          <AnimatedSection>
            <span className="liquid-glass rounded-full px-3 py-1 text-[10px] font-body font-medium tracking-widest uppercase text-foreground/50 inline-block mb-5">
              Section 01
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading italic mb-4 text-foreground">
              Organ Explorer
            </h2>
            <p className="text-foreground/50 font-body font-light text-lg mb-12 max-w-2xl">
              Click any organ on the body to explore the specific effects of pollution.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="liquid-glass-strong rounded-3xl p-6 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
                {/* Body diagram */}
                <div>
                  <p className="text-foreground/50 font-body text-xs uppercase tracking-widest text-center mb-4">
                    Tashkent PM2.5 · 31.4 µg/m³
                  </p>
                  <BodyDiagram activeOrgan={activeOrgan} onSelect={setActiveOrgan} />
                  <div className="flex flex-wrap gap-2 justify-center mt-6">
                    {Object.entries(ORGAN_DATA).map(([key, o]) => (
                      <button
                        key={key}
                        onClick={() => setActiveOrgan(key)}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-body font-medium transition-all border ${
                          activeOrgan === key
                            ? `${ACCENT_BG[o.accent]} ${ACCENT_BORDER[o.accent]} ${ACCENT_TEXT[o.accent]}`
                            : "border-foreground/10 text-foreground/60 hover:text-foreground hover:border-foreground/25"
                        }`}
                      >
                        <span className="mr-1">{o.icon}</span>{o.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info panel */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeOrgan}
                    initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    exit={{ opacity: 0, filter: "blur(8px)", y: -10 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <span className="text-4xl shrink-0">{organ.icon}</span>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-heading italic text-foreground mb-1">{organ.name}</h3>
                        <p className="text-foreground/50 font-body font-light text-sm">{organ.subtitle}</p>
                      </div>
                    </div>

                    {/* Damage bar */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-foreground/50 font-body text-xs uppercase tracking-widest">Damage Level</span>
                        <span className="text-foreground font-heading italic text-lg">{organ.damage}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-foreground/10 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-rose-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${organ.damage}%` }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* Effects list */}
                    <div className="space-y-5">
                      {organ.effects.map((eff, i) => (
                        <div key={i} className="flex items-start gap-4 pb-5 border-b border-foreground/10 last:border-0 last:pb-0">
                          <span className="text-xl mt-0.5 shrink-0">{eff.icon}</span>
                          <div>
                            <div className="text-foreground font-body font-medium text-base mb-1">{eff.title}</div>
                            <div className="text-foreground/55 font-body font-light text-sm leading-relaxed">{eff.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* ─── SECTION 2: Pathway ─── */}
        <section className="mt-40 mb-10">
          <AnimatedSection>
            <span className="liquid-glass rounded-full px-3 py-1 text-[10px] font-body font-medium tracking-widest uppercase text-foreground/50 inline-block mb-5">
              Section 02
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading italic mb-4 text-foreground">
              Exposure Pathway
            </h2>
            <p className="text-foreground/50 font-body font-light text-lg mb-12 max-w-2xl">
              Follow how a single particle travels from the air into your bloodstream and beyond.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: "😮‍💨", title: "Inhalation", desc: "PM2.5 enters via nose/mouth, bypasses mucociliary defences, reaches alveoli." },
              { icon: "🫁", title: "Lung Absorption", desc: "Particles deposit in alveoli, trigger macrophage response and inflammatory cytokines." },
              { icon: "🩸", title: "Bloodstream", desc: "Ultrafine particles cross alveolar membrane directly into blood circulation." },
              { icon: "🧠", title: "Systemic Effects", desc: "Inflammation spreads to heart, brain, and liver — damaging organs far from the lungs." },
              { icon: "🧬", title: "Cellular Level", desc: "Oxidative stress damages DNA and mitochondria — linked to cancer and neurodegeneration." },
            ].map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="liquid-glass rounded-2xl p-6 h-full relative">
                  <div className="absolute top-4 right-4 text-foreground/20 font-heading italic text-sm">0{i + 1}</div>
                  <div className="text-3xl mb-4">{step.icon}</div>
                  <h4 className="text-foreground font-body font-medium text-base mb-2">{step.title}</h4>
                  <p className="text-foreground/50 font-body font-light text-sm leading-relaxed">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BiologyLab;
