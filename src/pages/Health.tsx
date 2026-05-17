import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Wind, Droplets, Sparkles, ShieldAlert, HeartPulse, Brain, Activity,
  Stethoscope, Flame, AlertTriangle, ExternalLink, Cigarette, Skull,
} from "lucide-react";
import BlurText from "../components/BlurText";
import AnimatedSection from "../components/AnimatedSection";

type Accent = "sky" | "rose" | "violet" | "amber" | "emerald" | "fuchsia";

const ACCENT: Record<Accent, { bg: string; ring: string; text: string; glow: string; dot: string }> = {
  sky:     { bg: "bg-sky-500/15",     ring: "ring-sky-400/40",     text: "text-sky-300",     glow: "from-sky-500/40",     dot: "bg-sky-400" },
  rose:    { bg: "bg-rose-500/15",    ring: "ring-rose-400/40",    text: "text-rose-300",    glow: "from-rose-500/40",    dot: "bg-rose-400" },
  violet:  { bg: "bg-violet-500/15",  ring: "ring-violet-400/40",  text: "text-violet-300",  glow: "from-violet-500/40",  dot: "bg-violet-400" },
  amber:   { bg: "bg-amber-500/15",   ring: "ring-amber-400/40",   text: "text-amber-300",   glow: "from-amber-500/40",   dot: "bg-amber-400" },
  emerald: { bg: "bg-emerald-500/15", ring: "ring-emerald-400/40", text: "text-emerald-300", glow: "from-emerald-500/40", dot: "bg-emerald-400" },
  fuchsia: { bg: "bg-fuchsia-500/15", ring: "ring-fuchsia-400/40", text: "text-fuchsia-300", glow: "from-fuchsia-500/40", dot: "bg-fuchsia-400" },
};

const defenses = [
  { Icon: Wind, name: "Nose Hairs", desc: "Trap large particles before they enter your airways.", accent: "sky" as Accent },
  { Icon: Droplets, name: "Mucus Lining", desc: "Sticky layer catches smaller particles inside the bronchi.", accent: "violet" as Accent },
  { Icon: Sparkles, name: "Ciliated Cells", desc: "Hair-like structures sweep mucus and debris back out.", accent: "emerald" as Accent },
];

const diseases = [
  {
    name: "Asthma", what: "Airways swell and narrow", how: "Irritants trigger chronic inflammation.",
    risk: "Low–Medium", organ: "Lungs", riskLevel: 2, accent: "amber" as Accent,
    Icon: Wind,
    link: "https://www.who.int/news-room/fact-sheets/detail/asthma",
  },
  {
    name: "COPD", what: "Permanent lung damage", how: "Long-term particle exposure destroys air sacs.",
    risk: "High", organ: "Lungs", riskLevel: 3, accent: "rose" as Accent,
    Icon: Stethoscope,
    link: "https://www.who.int/news-room/fact-sheets/detail/chronic-obstructive-pulmonary-disease-(copd)",
  },
  {
    name: "Lung Cancer", what: "Uncontrolled cell growth", how: "Carcinogens in polluted air damage DNA.",
    risk: "Very High", organ: "Lungs", riskLevel: 4, accent: "fuchsia" as Accent,
    Icon: AlertTriangle,
    link: "https://www.iarc.who.int/news-events/iarc-outdoor-air-pollution-a-leading-environmental-cause-of-cancer-deaths/",
  },
  {
    name: "Heart Disease", what: "Arteries narrow, heart strains", how: "Particles enter the bloodstream and cause inflammation.",
    risk: "Very High", organ: "Heart", riskLevel: 4, accent: "rose" as Accent,
    Icon: HeartPulse,
    link: "https://www.heart.org/en/health-topics/consumer-healthcare/air-pollution-and-heart-disease-stroke",
  },
  {
    name: "Stroke", what: "Blood flow to brain blocked", how: "Pollution thickens blood and raises clotting risk.",
    risk: "Very High", organ: "Brain", riskLevel: 4, accent: "violet" as Accent,
    Icon: Brain,
    link: "https://www.who.int/news-room/fact-sheets/detail/the-top-10-causes-of-death",
  },
  {
    name: "Pneumonia", what: "Lung infection", how: "Pollution weakens immune defenses.",
    risk: "Medium–High", organ: "Lungs", riskLevel: 3, accent: "sky" as Accent,
    Icon: Activity,
    link: "https://www.who.int/news-room/fact-sheets/detail/pneumonia",
  },
];

const bodyParts = [
  { id: "lungs", Icon: Wind, name: "Lungs", accent: "sky" as Accent,
    desc: "Pollution destroys alveoli — tiny air sacs where oxygen enters your blood. Once destroyed, they don't grow back. Fewer alveoli means less oxygen and lifelong breathlessness." },
  { id: "heart", Icon: HeartPulse, name: "Heart", accent: "rose" as Accent,
    desc: "When tiny particles enter the bloodstream, the heart works harder to pump thickened, inflamed blood. Over time this causes heart attacks and cardiovascular failure." },
  { id: "brain", Icon: Brain, name: "Brain", accent: "violet" as Accent,
    desc: "Reduced oxygen from damaged lungs — plus ultrafine particles crossing the blood-brain barrier — can trigger strokes and have been linked to cognitive decline and dementia." },
  { id: "cilia", Icon: Sparkles, name: "Ciliated Cells", accent: "emerald" as Accent,
    desc: "Pollution paralyzes and destroys these cells. Without them, mucus and trapped particles sit in your lungs instead of being cleared — leading to chronic infections." },
  { id: "mucus", Icon: Droplets, name: "Mucus System", accent: "amber" as Accent,
    desc: "Pollution causes the body to overproduce mucus as a defense, leading to chronic cough, bronchitis, and blocked airways." },
];

const riskColors: Record<number, string> = {
  2: "bg-yellow-500/15 text-yellow-300 ring-yellow-500/30",
  3: "bg-orange-500/15 text-orange-300 ring-orange-500/30",
  4: "bg-red-500/15 text-red-300 ring-red-500/30",
};

const Health = () => {
  const [activeBody, setActiveBody] = useState("lungs");
  const active = bodyParts.find((b) => b.id === activeBody)!;
  const activeAccent = ACCENT[active.accent];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <span className="liquid-glass rounded-full px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase text-foreground/60 inline-flex items-center gap-1.5 mb-6">
            <Stethoscope className="w-3.5 h-3.5" /> Biology · Health
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading italic mb-6 text-foreground">
            <BlurText text="How Pollution Affects Your Body" />
          </h1>
          <p className="text-foreground/60 font-body font-light text-lg max-w-2xl leading-relaxed">
            From your first breath, pollutants travel through your respiratory system, into your bloodstream, and down to your cells.
          </p>
        </AnimatedSection>

        {/* ─── SECTION 1: GATEWAY ─── */}
        <section className="mt-32">
          <AnimatedSection>
            <span className="liquid-glass rounded-full px-3 py-1 text-[10px] font-body font-medium tracking-widest uppercase text-foreground/50 inline-block mb-5">
              Section 01
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading italic mb-6 text-foreground">
              The Gateway — What Happens When You Breathe?
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="relative liquid-glass-strong rounded-3xl p-8 md:p-12 mb-10 overflow-hidden">
              <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-sky-500/30 to-transparent blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-br from-rose-500/20 to-transparent blur-3xl" />
              <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <p className="text-foreground/70 font-body font-light text-lg leading-relaxed mb-5">
                    Every minute you breathe <span className="text-foreground font-medium">15–20 times</span> without thinking. But in a polluted city, each breath carries invisible passengers — gases and microscopic particles that your body was never designed to handle.
                  </p>
                  <p className="text-foreground/70 font-body font-light text-lg leading-relaxed">
                    Your respiratory system has defenses. But <span className="text-foreground font-medium">PM2.5 particles</span> are so small they bypass all of them — going straight into your lungs and bloodstream.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 md:gap-3 md:grid-cols-1 md:w-44">
                  {[
                    { Icon: Wind, label: "11,000 L", sub: "air / day" },
                    { Icon: HeartPulse, label: "20,000", sub: "breaths / day" },
                    { Icon: Skull, label: "7M", sub: "deaths / year" },
                  ].map((s, i) => {
                    const SIcon = s.Icon;
                    return (
                      <div key={i} className="liquid-glass rounded-2xl p-4 text-center">
                        <SIcon className="w-5 h-5 text-foreground/70 mx-auto mb-1.5" />
                        <div className="text-foreground font-heading italic text-xl leading-none">{s.label}</div>
                        <div className="text-foreground/40 font-body text-[10px] tracking-wider uppercase mt-1">{s.sub}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {defenses.map((d, i) => {
              const a = ACCENT[d.accent];
              const DIcon = d.Icon;
              return (
                <AnimatedSection key={i} delay={0.1 + i * 0.1}>
                  <div className={`group relative h-full rounded-2xl p-6 liquid-glass ring-1 ${a.ring} overflow-hidden transition-all hover:-translate-y-1`}>
                    <div className={`absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br ${a.glow} to-transparent blur-3xl opacity-70 group-hover:opacity-100 transition-opacity`} />
                    <div className="relative">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${a.bg} ring-1 ${a.ring} mb-4`}>
                        <DIcon className={`w-5 h-5 ${a.text}`} />
                      </div>
                      <h4 className="text-lg font-heading italic text-foreground mb-2">{d.name}</h4>
                      <p className="text-foreground/55 font-body font-light text-sm leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection delay={0.4}>
            <div className="mt-8 liquid-glass rounded-2xl p-6 ring-1 ring-red-500/30 flex items-start gap-4">
              <div className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/15 ring-1 ring-red-500/30">
                <ShieldAlert className="w-5 h-5 text-red-300" />
              </div>
              <p className="text-foreground/80 font-body font-light text-base leading-relaxed">
                <span className="text-red-300 font-medium">The problem:</span> PM2.5 particles are just 2.5 micrometers across — 30× smaller than a human hair. They slip past every defense and embed deep in lung tissue.
              </p>
            </div>
          </AnimatedSection>
        </section>

        {/* ─── SECTION 2: DISEASES ─── */}
        <section className="mt-40">
          <AnimatedSection>
            <span className="liquid-glass rounded-full px-3 py-1 text-[10px] font-body font-medium tracking-widest uppercase text-foreground/50 inline-block mb-5">
              Section 02
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading italic mb-4 text-foreground">
              The Diseases
            </h2>
            <p className="text-foreground/50 font-body font-light text-lg mb-12 max-w-2xl">
              Pollution doesn't cause one disease — it fuels many. Tap any card to read the research.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {diseases.map((d, i) => {
              const a = ACCENT[d.accent];
              const DIcon = d.Icon;
              return (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <a
                    href={d.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative block h-full rounded-2xl p-7 liquid-glass ring-1 ${a.ring} overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl`}
                  >
                    <div className={`absolute -top-20 -right-20 w-56 h-56 rounded-full bg-gradient-to-br ${a.glow} to-transparent blur-3xl opacity-60 group-hover:opacity-100 transition-opacity`} />
                    <div className="relative flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${a.bg} ring-1 ${a.ring}`}>
                          <DIcon className={`w-5 h-5 ${a.text}`} />
                        </div>
                        <span className={`shrink-0 ml-3 rounded-full px-2.5 py-0.5 text-[10px] font-body font-semibold tracking-wider uppercase ring-1 ${riskColors[d.riskLevel]}`}>
                          {d.risk}
                        </span>
                      </div>
                      <h4 className="text-xl font-heading italic text-foreground mb-1">{d.name}</h4>
                      <p className="text-foreground/50 font-body text-xs uppercase tracking-wider mb-3">{d.what}</p>
                      <p className="text-foreground/60 font-body font-light text-sm leading-relaxed mb-5">{d.how}</p>
                      <div className="mt-auto pt-4 border-t border-foreground/10 flex items-center justify-between">
                        <span className="text-foreground/40 font-body text-xs">Affects: {d.organ}</span>
                        <span className={`inline-flex items-center gap-1 text-xs font-body ${a.text} group-hover:gap-2 transition-all`}>
                          Read research <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </a>
                </AnimatedSection>
              );
            })}
          </div>
        </section>

        {/* ─── SECTION 3: BODY BREAKDOWN ─── */}
        <section className="mt-40">
          <AnimatedSection>
            <span className="liquid-glass rounded-full px-3 py-1 text-[10px] font-body font-medium tracking-widest uppercase text-foreground/50 inline-block mb-5">
              Section 03
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading italic mb-4 text-foreground">
              Body Breakdown — The Key Players
            </h2>
            <p className="text-foreground/50 font-body font-light text-lg mb-12 max-w-2xl">
              Select an organ or tissue to see how pollution targets it specifically.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="relative liquid-glass-strong rounded-3xl p-6 md:p-10 overflow-hidden">
              <div className={`absolute -top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-br ${activeAccent.glow} to-transparent blur-3xl opacity-60 transition-opacity duration-700`} />

              {/* Tabs */}
              <div className="relative flex flex-wrap gap-2 mb-8">
                {bodyParts.map((b) => {
                  const a = ACCENT[b.accent];
                  const isActive = activeBody === b.id;
                  const BIcon = b.Icon;
                  return (
                    <button
                      key={b.id}
                      onClick={() => setActiveBody(b.id)}
                      className={`rounded-full px-4 py-2 text-sm font-body font-medium transition-all inline-flex items-center gap-2 ring-1 ${
                        isActive
                          ? `${a.bg} ${a.ring} ${a.text}`
                          : "ring-foreground/10 text-foreground/60 hover:text-foreground hover:ring-foreground/25"
                      }`}
                    >
                      <BIcon className="w-4 h-4" /> {b.name}
                    </button>
                  );
                })}
              </div>

              {/* Active panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  exit={{ opacity: 0, filter: "blur(8px)", y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="relative"
                >
                  <div className="flex items-start gap-5">
                    <div className={`shrink-0 inline-flex items-center justify-center w-16 h-16 rounded-2xl ${activeAccent.bg} ring-1 ${activeAccent.ring}`}>
                      <active.Icon className={`w-8 h-8 ${activeAccent.text}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-heading italic text-foreground mb-3">{active.name}</h3>
                      <p className="text-foreground/65 font-body font-light text-lg leading-relaxed max-w-2xl">
                        {active.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </section>

        {/* ─── SECTION 4: COMPARISON ─── */}
        <section className="mt-40 mb-10">
          <AnimatedSection>
            <span className="liquid-glass rounded-full px-3 py-1 text-[10px] font-body font-medium tracking-widest uppercase text-foreground/50 inline-block mb-5">
              Section 04
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading italic mb-12 text-foreground">
              A Shocking Comparison
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedSection delay={0.1}>
              <div className="group relative h-full rounded-3xl p-10 liquid-glass ring-1 ring-amber-400/40 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-amber-500/40 to-transparent blur-3xl opacity-70" />
                <div className="relative flex flex-col items-center text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/15 ring-1 ring-amber-400/40 mb-5">
                    <Cigarette className="w-7 h-7 text-amber-300" />
                  </div>
                  <p className="text-foreground/80 font-body font-light text-lg leading-relaxed">
                    Living in a highly polluted city is equivalent to smoking
                    <span className="text-foreground font-heading italic text-3xl block my-4">1–7 cigarettes per day</span>
                    even if you have never smoked in your life.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="group relative h-full rounded-3xl p-10 liquid-glass ring-1 ring-rose-400/40 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-rose-500/40 to-transparent blur-3xl opacity-70" />
                <div className="relative flex flex-col items-center text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-500/15 ring-1 ring-rose-400/40 mb-5">
                    <Flame className="w-7 h-7 text-rose-300" />
                  </div>
                  <p className="text-foreground/80 font-body font-light text-lg leading-relaxed">
                    Air pollution causes approximately
                    <span className="text-foreground font-heading italic text-3xl block my-4">7 million deaths per year</span>
                    more than AIDS, malaria, and tuberculosis combined.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Health;
