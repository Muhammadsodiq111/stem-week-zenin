import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Wind, HeartPulse, Brain, Dna, Flame, Shield, Activity, Droplets,
  Zap, Battery, Skull, TrendingUp, ShieldAlert, Microscope,
  ArrowRight,
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import BlurText from "../components/BlurText";

type IconType = React.ComponentType<{ className?: string }>;

const ORGAN_DATA: Record<string, {
  Icon: IconType; name: string; accent: keyof typeof ACCENT; damage: number;
  subtitle: string;
  effects: { Icon: IconType; title: string; desc: string }[];
}> = {
  lungs: {
    Icon: Wind, name: "Lungs", accent: "sky", damage: 85,
    subtitle: "Primary entry point for all airborne pollutants",
    effects: [
      { Icon: Flame, title: "Inflammation & Asthma", desc: "PM2.5 triggers inflammatory cytokines in bronchial tissue. Chronic exposure causes persistent airway inflammation — the root of asthma." },
      { Icon: Wind, title: "Alveolar Destruction", desc: "Ultrafine particles deposit in alveoli, activating macrophages. Over time, alveolar walls are destroyed — reducing gas exchange capacity (COPD)." },
      { Icon: Dna, title: "DNA Mutation → Cancer", desc: "Polycyclic aromatic hydrocarbons (PAHs) on PM2.5 surfaces are potent carcinogens. They bind to DNA, causing mutations that can lead to lung cancer." },
      { Icon: Shield, title: "Mucociliary Shutdown", desc: "SO₂ and NO₂ paralyze cilia — the tiny hairs that sweep mucus and debris out of airways. Without them, infections and particle buildup worsen rapidly." },
    ],
  },
  heart: {
    Icon: HeartPulse, name: "Heart", accent: "rose", damage: 70,
    subtitle: "Systemic inflammation damages the cardiovascular system",
    effects: [
      { Icon: Droplets, title: "Blood Thickening", desc: "PM2.5 entering the bloodstream triggers platelet activation and fibrinogen release — making blood thicker and more likely to clot." },
      { Icon: Activity, title: "Atherosclerosis", desc: "Chronic inflammation oxidizes LDL cholesterol, building plaques inside artery walls. Pollution exposure accelerates this process significantly." },
      { Icon: Zap, title: "Arrhythmia Risk", desc: "Ultrafine particles affect the autonomic nervous system, disrupting heart rhythm. Higher PM2.5 days correlate with more cardiac arrest calls." },
      { Icon: TrendingUp, title: "Hypertension", desc: "Pollution triggers vasoconstriction through oxidative stress and endothelin release — raising blood pressure even in young, healthy adults." },
    ],
  },
  brain: {
    Icon: Brain, name: "Brain", accent: "violet", damage: 55,
    subtitle: "Ultrafine particles can cross the blood-brain barrier",
    effects: [
      { Icon: ShieldAlert, title: "Blood-Brain Barrier Breach", desc: "Ultrafine PM (<0.1µm) crosses the blood-brain barrier directly. Once inside, they trigger neuroinflammation — a key factor in cognitive decline." },
      { Icon: Brain, title: "Neurodegeneration", desc: "Long-term exposure is linked to Alzheimer's and Parkinson's disease. Pollution-related brain inflammation mirrors neurodegenerative pathology." },
      { Icon: Zap, title: "Stroke Risk", desc: "Inflammation + blood thickening + hypertension = dramatically increased stroke risk. High pollution days see 10–30% more stroke admissions." },
      { Icon: Activity, title: "Cognitive Impairment", desc: "Children exposed to high pollution show reduced working memory, lower IQ scores, and slower processing speed than peers in clean air areas." },
    ],
  },
};

const ACCENT = {
  sky:     { text: "text-sky-300",     ring: "ring-sky-400/40",     bg: "bg-sky-500/15",     glow: "from-sky-500/40",     svg: "#38bdf8" },
  rose:    { text: "text-rose-300",    ring: "ring-rose-400/40",    bg: "bg-rose-500/15",    glow: "from-rose-500/40",    svg: "#fb7185" },
  violet:  { text: "text-violet-300",  ring: "ring-violet-400/40",  bg: "bg-violet-500/15",  glow: "from-violet-500/40",  svg: "#a78bfa" },
  emerald: { text: "text-emerald-300", ring: "ring-emerald-400/40", bg: "bg-emerald-500/15", glow: "from-emerald-500/40", svg: "#34d399" },
} as const;

/* ─── Refined Anatomy SVG ─── */
const BodyDiagram = ({ activeOrgan, onSelect }: { activeOrgan: string; onSelect: (o: string) => void }) => {
  const a = (k: string) => activeOrgan === k;
  return (
    <svg viewBox="0 0 240 480" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[280px] mx-auto">
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(220 22% 28%)" />
          <stop offset="100%" stopColor="hsl(220 22% 14%)" />
        </linearGradient>
        <radialGradient id="headGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="hsl(220 22% 32%)" />
          <stop offset="100%" stopColor="hsl(220 22% 16%)" />
        </radialGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Halo */}
      <ellipse cx="120" cy="240" rx="115" ry="220" fill="rgba(255,255,255,0.02)" />

      {/* Head */}
      <ellipse cx="120" cy="58" rx="36" ry="40" fill="url(#headGrad)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      {/* Neck */}
      <path d="M108 95 L132 95 L130 115 L110 115 Z" fill="hsl(220 22% 20%)" />

      {/* Shoulders + Torso silhouette */}
      <path
        d="M70 122 Q120 110 170 122 L182 175 Q175 240 168 290 Q150 305 120 305 Q90 305 72 290 Q65 240 58 175 Z"
        fill="url(#bodyGrad)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"
      />

      {/* Arms */}
      <path d="M58 170 Q40 230 44 300 Q48 330 52 340 L66 340 Q62 320 60 290 Q66 230 78 180 Z" fill="hsl(220 22% 18%)" />
      <path d="M182 170 Q200 230 196 300 Q192 330 188 340 L174 340 Q178 320 180 290 Q174 230 162 180 Z" fill="hsl(220 22% 18%)" />

      {/* Legs */}
      <path d="M85 305 Q80 380 88 460 L108 460 Q110 380 110 320 Z" fill="hsl(220 22% 18%)" />
      <path d="M155 305 Q160 380 152 460 L132 460 Q130 380 130 320 Z" fill="hsl(220 22% 18%)" />

      {/* BRAIN */}
      <g onClick={() => onSelect("brain")} className="cursor-pointer" filter={a("brain") ? "url(#softGlow)" : undefined}>
        <ellipse cx="120" cy="55" rx="26" ry="22" fill={ACCENT.violet.svg} fillOpacity={a("brain") ? 0.85 : 0.28} stroke="#c4b5fd" strokeWidth="1.2">
          {a("brain") && <animate attributeName="fill-opacity" values="0.85;0.45;0.85" dur="2.4s" repeatCount="indefinite" />}
        </ellipse>
        <path d="M100 50 Q110 42 120 50 Q130 42 140 50 M98 60 Q108 54 118 60 Q128 54 138 60" stroke="#ddd6fe" strokeWidth="1" fill="none" opacity={a("brain") ? 0.9 : 0.5} />
      </g>

      {/* LUNGS */}
      <g onClick={() => onSelect("lungs")} className="cursor-pointer" filter={a("lungs") ? "url(#softGlow)" : undefined}>
        <path
          d="M105 145 Q88 150 82 175 Q76 215 86 245 Q95 258 110 252 Q116 215 114 175 Q113 155 105 145 Z"
          fill={ACCENT.sky.svg} fillOpacity={a("lungs") ? 0.8 : 0.35} stroke="#7dd3fc" strokeWidth="1.2"
        >
          {a("lungs") && <animate attributeName="fill-opacity" values="0.8;0.4;0.8" dur="2.2s" repeatCount="indefinite" />}
        </path>
        <path
          d="M135 145 Q152 150 158 175 Q164 215 154 245 Q145 258 130 252 Q124 215 126 175 Q127 155 135 145 Z"
          fill={ACCENT.sky.svg} fillOpacity={a("lungs") ? 0.8 : 0.35} stroke="#7dd3fc" strokeWidth="1.2"
        >
          {a("lungs") && <animate attributeName="fill-opacity" values="0.8;0.4;0.8" dur="2.2s" repeatCount="indefinite" />}
        </path>
        {/* trachea */}
        <rect x="118" y="120" width="4" height="32" rx="2" fill="#7dd3fc" opacity="0.7" />
      </g>

      {/* HEART */}
      <g onClick={() => onSelect("heart")} className="cursor-pointer" filter={a("heart") ? "url(#softGlow)" : undefined}>
        <path
          d="M120 220 C120 220 100 205 100 192 C100 184 108 178 116 184 C118 186 120 189 120 189 C120 189 122 186 124 184 C132 178 140 184 140 192 C140 205 120 220 120 220 Z"
          fill={ACCENT.rose.svg} fillOpacity={a("heart") ? 0.95 : 0.55} stroke="#fda4af" strokeWidth="1.2"
        >
          {a("heart") && <animate attributeName="fill-opacity" values="0.95;0.55;0.95" dur="1.4s" repeatCount="indefinite" />}
        </path>
      </g>

    </svg>
  );
};

/* ─── PAGE ─── */
const BiologyLab = () => {
  const [activeOrgan, setActiveOrgan] = useState<keyof typeof ORGAN_DATA>("lungs");
  const organ = ORGAN_DATA[activeOrgan];
  const accent = ACCENT[organ.accent];

  const pathway = [
    { Icon: Wind,        title: "Inhalation",       desc: "PM2.5 enters via nose / mouth and bypasses every mucociliary defence — straight to the alveoli.", color: "sky" },
    { Icon: Flame,       title: "Lung Absorption",  desc: "Particles settle in alveoli and trigger macrophages, releasing inflammatory cytokines.",            color: "amber" },
    { Icon: Droplets,    title: "Bloodstream",      desc: "Ultrafine particles slip across the alveolar membrane directly into your blood circulation.",      color: "rose" },
    { Icon: HeartPulse,  title: "Systemic Effects", desc: "Inflammation spreads to the heart, brain and liver — damaging organs far from the lungs.",         color: "fuchsia" },
    { Icon: Dna,         title: "Cellular Level",   desc: "Oxidative stress damages DNA and mitochondria — the trigger for cancer and neurodegeneration.",    color: "violet" },
  ] as const;

  const pathwayColors: Record<string, { glow: string; ring: string; bg: string; text: string; dot: string }> = {
    sky:      { glow: "from-sky-500/40",      ring: "ring-sky-400/40",      bg: "bg-sky-500/15",      text: "text-sky-300",      dot: "bg-sky-400" },
    amber:    { glow: "from-amber-500/40",    ring: "ring-amber-400/40",    bg: "bg-amber-500/15",    text: "text-amber-300",    dot: "bg-amber-400" },
    rose:     { glow: "from-rose-500/40",     ring: "ring-rose-400/40",     bg: "bg-rose-500/15",     text: "text-rose-300",     dot: "bg-rose-400" },
    fuchsia:  { glow: "from-fuchsia-500/40",  ring: "ring-fuchsia-400/40",  bg: "bg-fuchsia-500/15",  text: "text-fuchsia-300",  dot: "bg-fuchsia-400" },
    violet:   { glow: "from-violet-500/40",   ring: "ring-violet-400/40",   bg: "bg-violet-500/15",   text: "text-violet-300",   dot: "bg-violet-400" },
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <span className="liquid-glass rounded-full px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase text-foreground/60 inline-flex items-center gap-1.5 mb-6">
            <Dna className="w-3.5 h-3.5" /> Interactive Lab
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
            <div className="liquid-glass-strong rounded-3xl p-6 md:p-10 relative overflow-hidden">
              <div className={`absolute -top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-br ${accent.glow} to-transparent blur-3xl opacity-60 transition-opacity duration-700`} />
              <div className="relative grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10">
                {/* Body diagram */}
                <div>
                  <p className="text-foreground/50 font-body text-xs uppercase tracking-widest text-center mb-4">
                    Tashkent PM2.5 · 31.4 µg/m³
                  </p>
                  <BodyDiagram activeOrgan={activeOrgan} onSelect={(o) => setActiveOrgan(o as keyof typeof ORGAN_DATA)} />
                  <div className="flex flex-wrap gap-2 justify-center mt-6">
                    {Object.entries(ORGAN_DATA).map(([key, o]) => {
                      const acc = ACCENT[o.accent];
                      const isActive = activeOrgan === key;
                      const OIcon = o.Icon;
                      return (
                        <button
                          key={key}
                          onClick={() => setActiveOrgan(key as keyof typeof ORGAN_DATA)}
                          className={`rounded-full px-3.5 py-1.5 text-xs font-body font-medium transition-all border inline-flex items-center gap-1.5 ${
                            isActive
                              ? `${acc.bg} ${acc.ring} ring-1 ${acc.text}`
                              : "border-foreground/10 text-foreground/60 hover:text-foreground hover:border-foreground/25"
                          }`}
                        >
                          <OIcon className="w-3.5 h-3.5" /> {o.name}
                        </button>
                      );
                    })}
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
                      <div className={`shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-2xl ${accent.bg} ring-1 ${accent.ring}`}>
                        <organ.Icon className={`w-7 h-7 ${accent.text}`} />
                      </div>
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
                      {organ.effects.map((eff, i) => {
                        const EIcon = eff.Icon;
                        return (
                          <div key={i} className="flex items-start gap-4 pb-5 border-b border-foreground/10 last:border-0 last:pb-0">
                            <div className={`shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg ${accent.bg} ${accent.text}`}>
                              <EIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-foreground font-body font-medium text-base mb-1">{eff.title}</div>
                              <div className="text-foreground/55 font-body font-light text-sm leading-relaxed">{eff.desc}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* ─── SECTION 2: Pathway — colorful timeline ─── */}
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

          {/* Connector line on lg+ */}
          <div className="relative">
            <div className="hidden lg:block absolute top-9 left-[6%] right-[6%] h-px bg-gradient-to-r from-sky-400/40 via-rose-400/40 to-violet-400/40" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {pathway.map((step, i) => {
                const c = pathwayColors[step.color];
                const SIcon = step.Icon;
                return (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <div className={`group relative h-full rounded-2xl p-6 liquid-glass ring-1 ${c.ring} overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl`}>
                      <div className={`absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br ${c.glow} to-transparent blur-3xl opacity-70 group-hover:opacity-100 transition-opacity`} />
                      <div className="relative">
                        <div className={`relative inline-flex items-center justify-center w-14 h-14 rounded-2xl ${c.bg} ring-1 ${c.ring} mb-4`}>
                          <SIcon className={`w-6 h-6 ${c.text}`} />
                          <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full ${c.dot} text-[10px] font-body font-bold text-background flex items-center justify-center`}>
                            {i + 1}
                          </span>
                        </div>
                        <h4 className="text-foreground font-body font-semibold text-base mb-2">{step.title}</h4>
                        <p className="text-foreground/60 font-body font-light text-sm leading-relaxed">{step.desc}</p>
                      </div>
                      {i < pathway.length - 1 && (
                        <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                      )}
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BiologyLab;
