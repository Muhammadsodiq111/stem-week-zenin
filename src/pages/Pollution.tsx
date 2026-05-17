import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, CloudRain, Sun, ArrowRight } from "lucide-react";
import BlurText from "../components/BlurText";
import AnimatedSection from "../components/AnimatedSection";
import MoleculeDiagram from "../components/MoleculeDiagram";

const culprits = ["CO", "CO₂", "NO₂", "SO₂", "O₃", "PM2.5"];

const gases = [
  {
    id: "co",
    formula: "CO",
    name: "Carbon Monoxide",
    color: "🟤",
    looks: "One carbon + one oxygen atom. Colorless, odorless — completely invisible.",
    forms: "Incomplete burning of fuel (car engines, gas stoves, cigarettes). When there isn't enough oxygen for a full reaction: C + O → CO instead of CO₂.",
    does: "Binds to hemoglobin in your blood 240× more strongly than oxygen — essentially kicking oxygen out. Your cells start suffocating from the inside.",
    deadly: "You can't smell it, see it, or taste it. At high levels it kills within minutes. At low levels — chronic headaches, fatigue, brain fog.",
    accent: "border-amber-800/40",
  },
  {
    id: "co2",
    formula: "CO₂",
    name: "Carbon Dioxide",
    color: "🔴",
    looks: "One carbon between two oxygen atoms.",
    forms: "Complete combustion — burning any carbon-based fuel fully. Also natural (we exhale it) but industrial levels are far beyond natural.",
    does: "At normal levels (0.04%) it's harmless. In enclosed polluted spaces it displaces oxygen, causing dizziness and suffocation. Long term, it's the main greenhouse gas trapping heat on Earth.",
    deadly: "Less immediately toxic than CO, but its role in climate change indirectly worsens all other pollution and creates more extreme heat events that kill thousands.",
    accent: "border-red-500/40",
  },
  {
    id: "no2",
    formula: "NO₂",
    name: "Nitrogen Dioxide",
    color: "🟠",
    looks: "One nitrogen + two oxygen atoms. Reddish-brown, sharp smell.",
    forms: "When engines burn fuel at high temperatures, nitrogen in the air reacts with oxygen: N₂ + 2O₂ → 2NO₂. Cars and power plants are the biggest sources.",
    does: "Directly irritates and inflames the airways. Reacts with water in your lungs to form nitric acid — essentially creating a mild acid burn inside your respiratory tract every time you breathe.",
    deadly: "Long term exposure causes asthma, reduces lung development in children, and reacts in the atmosphere to create smog and ozone.",
    accent: "border-orange-500/40",
  },
  {
    id: "so2",
    formula: "SO₂",
    name: "Sulfur Dioxide",
    color: "🟡",
    looks: "One sulfur + two oxygen atoms. Colorless, sharp, suffocating smell.",
    forms: "Burning coal and oil that contain sulfur impurities: S + O₂ → SO₂. Power plants and ships are major sources.",
    does: "Causes immediate airway constriction, especially dangerous for people with asthma. Long term it scars lung tissue. In the atmosphere SO₂ + H₂O → H₂SO₃ (sulfurous acid) which becomes acid rain.",
    deadly: "Even short exposure at moderate levels can trigger life-threatening asthma attacks.",
    accent: "border-yellow-500/40",
  },
  {
    id: "o3",
    formula: "O₃",
    name: "Ground-Level Ozone",
    color: "🟢",
    looks: "Three oxygen atoms bonded together. Unstable, reactive.",
    forms: "NOT released directly — it's created by a chemical reaction. NO₂ + sunlight + VOCs (volatile organic compounds from cars) → O₃. This is why smog is worst on hot, sunny days.",
    does: "Ozone is extremely reactive. It attacks and oxidizes the tissues in your lungs the same way rust corrodes metal — literally oxidizing your lung cells.",
    deadly: "It reduces lung function, triggers asthma attacks, and long term exposure permanently reduces lung capacity. In the upper atmosphere it protects us — at ground level it's a poison.",
    accent: "border-green-500/40",
  },
  {
    id: "pm25",
    formula: "PM2.5",
    name: "Particulate Matter",
    color: "⚫️",
    looks: "Not a gas — microscopic solid or liquid particles suspended in air. PM2.5 = particles 2.5 micrometers or smaller. A human hair is ~70μm wide — PM2.5 is 28× smaller.",
    forms: "Comes from burning (engines, fires, factories), construction dust, and chemical reactions between other pollutants in the air.",
    does: "Small enough to bypass your nose, throat, and bronchi entirely. Goes straight into the deepest part of your lungs, and the very finest particles cross into your bloodstream.",
    deadly: "Once in the blood it travels everywhere — heart, brain, kidneys. It triggers systemic inflammation across the whole body. WHO calls it the single most dangerous air pollutant.",
    accent: "border-foreground/30",
  },
];

const reactions = [
  {
    title: "Why CO forms instead of CO₂",
    Icon: Flame,
    accent: { bg: "bg-amber-500/15", ring: "ring-amber-400/40", text: "text-amber-300", glow: "from-amber-500/40", dot: "bg-amber-400" },
    lines: [
      { label: "Enough oxygen", eq: "C + O₂ → CO₂", note: "safe" },
      { label: "Not enough oxygen", eq: "2C + O₂ → 2CO", note: "deadly" },
    ],
    caption: "This happens inside every car engine and gas stove thousands of times per second.",
  },
  {
    title: "How SO₂ becomes acid rain",
    Icon: CloudRain,
    accent: { bg: "bg-sky-500/15", ring: "ring-sky-400/40", text: "text-sky-300", glow: "from-sky-500/40", dot: "bg-sky-400" },
    lines: [
      { eq: "SO₂ + H₂O → H₂SO₃", note: "sulfurous acid" },
      { eq: "2SO₂ + O₂ + 2H₂O → 2H₂SO₄", note: "sulfuric acid" },
    ],
    caption: "That acid falls as rain — killing fish, corroding forests, contaminating drinking water.",
  },
  {
    title: "How smog is born — the ozone recipe",
    Icon: Sun,
    accent: { bg: "bg-rose-500/15", ring: "ring-rose-400/40", text: "text-rose-300", glow: "from-rose-500/40", dot: "bg-rose-400" },
    lines: [
      { eq: "NO₂ + Sunlight + Heat → O₃", note: "ground ozone" },
      { eq: "O₃ + more pollutants → Smog", note: "" },
    ],
    caption: "This is why cities like Los Angeles, Beijing, and Karachi have that iconic hazy brown sky on hot days.",
  },
];

const Pollution = () => {
  const [activeGas, setActiveGas] = useState<string | null>(null);

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <span className="liquid-glass rounded-full px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase text-foreground/60 inline-block mb-6">
            Chemistry
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading italic mb-6 text-foreground">
            <BlurText text="What's in the Air?" />
          </h1>
          <p className="text-foreground/60 font-body font-light text-lg max-w-2xl leading-relaxed">
            The atmosphere contains a complex mix of harmful gases and particles that react, transform, and endanger human life.
          </p>
        </AnimatedSection>

        {/* ─── SECTION 1 ─── */}
        <section className="mt-32">
          <AnimatedSection>
            <span className="liquid-glass rounded-full px-3 py-1 text-[10px] font-body font-medium tracking-widest uppercase text-foreground/50 inline-block mb-5">
              Section 01
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading italic mb-6 text-foreground">
              What Is Polluted Air Made Of?
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="liquid-glass-strong rounded-3xl p-8 md:p-12 mb-10">
              <p className="text-foreground/70 font-body font-light text-lg leading-relaxed mb-4">
                Clean air is roughly <span className="text-foreground font-medium">78% nitrogen</span>, <span className="text-foreground font-medium">21% oxygen</span>, and tiny amounts of other gases.
              </p>
              <p className="text-foreground/70 font-body font-light text-lg leading-relaxed">
                Polluted air has something extra — a cocktail of harmful gases and particles released by cars, factories, fires, and power plants. These are the <span className="text-foreground font-medium">6 main culprits</span>:
              </p>
            </div>
          </AnimatedSection>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {culprits.map((c, i) => (
              <AnimatedSection key={c} delay={0.1 + i * 0.07}>
                <span className="font-heading italic text-3xl sm:text-4xl text-foreground/40">{c}</span>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.2}>
            <p className="text-foreground/40 font-body text-xs uppercase tracking-widest mb-4 text-center">
              Live Molecular Structures
            </p>
            <MoleculeDiagram />
          </AnimatedSection>
        </section>

        {/* ─── SECTION 2: VILLAIN CARDS ─── */}
        <section className="mt-40">
          <AnimatedSection>
            <span className="liquid-glass rounded-full px-3 py-1 text-[10px] font-body font-medium tracking-widest uppercase text-foreground/50 inline-block mb-5">
              Section 02
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading italic mb-4 text-foreground">
              The Villains
            </h2>
            <p className="text-foreground/50 font-body font-light text-lg mb-12 max-w-2xl">
              Tap any gas to reveal what makes it dangerous.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {gases.map((g, i) => (
              <AnimatedSection key={g.id} delay={i * 0.06}>
                <button
                  onClick={() => setActiveGas(activeGas === g.id ? null : g.id)}
                  className={`w-full rounded-2xl p-5 text-center transition-all duration-300 ${
                    activeGas === g.id
                      ? "bg-foreground/90 text-primary-foreground"
                      : "liquid-glass text-foreground/80 hover:text-foreground"
                  }`}
                >
                  <span className="text-lg block mb-1">{g.color}</span>
                  <span className="text-xl font-heading italic block">{g.formula}</span>
                  <span className="text-[10px] font-body block mt-1 opacity-60 leading-tight">{g.name}</span>
                </button>
              </AnimatedSection>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeGas && (() => {
              const g = gases.find((x) => x.id === activeGas)!;
              return (
                <motion.div
                  key={g.id}
                  initial={{ opacity: 0, filter: "blur(10px)", y: 12 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  exit={{ opacity: 0, filter: "blur(10px)", y: -12 }}
                  transition={{ duration: 0.4 }}
                  className={`liquid-glass-strong rounded-3xl p-8 md:p-12 border-l-2 ${g.accent}`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl">{g.color}</span>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-heading italic text-foreground">{g.name}</h3>
                      <span className="text-foreground/40 font-body text-sm">{g.formula}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-body font-semibold tracking-widest uppercase text-foreground/40 mb-2">What it looks like</h4>
                      <p className="text-foreground/70 font-body font-light text-sm leading-relaxed">{g.looks}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-body font-semibold tracking-widest uppercase text-foreground/40 mb-2">How it forms</h4>
                      <p className="text-foreground/70 font-body font-light text-sm leading-relaxed">{g.forms}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-body font-semibold tracking-widest uppercase text-foreground/40 mb-2">What it does to you</h4>
                      <p className="text-foreground/70 font-body font-light text-sm leading-relaxed">{g.does}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-body font-semibold tracking-widest uppercase text-foreground/40 mb-2">Why it's deadly</h4>
                      <p className="text-foreground/70 font-body font-light text-sm leading-relaxed">{g.deadly}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </section>

        {/* ─── SECTION 3: REACTIONS ─── */}
        <section className="mt-40">
          <AnimatedSection>
            <span className="liquid-glass rounded-full px-3 py-1 text-[10px] font-body font-medium tracking-widest uppercase text-foreground/50 inline-block mb-5">
              Section 03
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading italic mb-4 text-foreground">
              The Reactions
            </h2>
            <p className="text-foreground/50 font-body font-light text-lg mb-12 max-w-2xl">
              Three key chemical reactions that explain how pollution forms and transforms.
            </p>
          </AnimatedSection>

          <div className="space-y-8">
            {reactions.map((r, i) => (
              <AnimatedSection key={i} delay={i * 0.12}>
                <div className="liquid-glass rounded-2xl p-8 md:p-10">
                  <h3 className="text-xl sm:text-2xl font-heading italic text-foreground mb-6">{r.title}</h3>
                  <div className="space-y-3 mb-6">
                    {r.lines.map((l, j) => (
                      <div key={j} className="flex flex-wrap items-center gap-3">
                        {l.label && (
                          <span className="text-foreground/40 font-body text-xs uppercase tracking-wider w-36 shrink-0">{l.label}</span>
                        )}
                        <code className="font-body font-medium text-foreground text-base sm:text-lg tracking-wide">{l.eq}</code>
                        {l.note && (
                          <span className="text-foreground/40 font-body text-xs italic">({l.note})</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-foreground/50 font-body font-light text-sm leading-relaxed border-t border-foreground/10 pt-5">{r.caption}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* ─── SECTION 4: STORYTELLING HOOK ─── */}
        <section className="mt-40 mb-10">
          <AnimatedSection>
            <div className="liquid-glass-strong rounded-3xl p-10 md:p-16 text-center">
              <span className="text-4xl mb-6 block">⚗️</span>
              <p className="text-foreground/80 font-body font-light text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto italic">
                "These aren't exotic laboratory chemicals. CO forms in your kitchen. NO₂ is created by every car on your street. SO₂ travels thousands of kilometers from power plants you'll never see.
                <span className="text-foreground font-medium block mt-4 not-italic">
                  Chemistry isn't just in classrooms — it's in every breath.
                </span>
              </p>
            </div>
          </AnimatedSection>
        </section>
      </div>
    </div>
  );
};

export default Pollution;
