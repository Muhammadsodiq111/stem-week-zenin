import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import BlurText from "../components/BlurText";
import AnimatedSection from "../components/AnimatedSection";
import LungJourney from "../components/LungJourney";

const defenses = [
  { icon: "👃", name: "Nose Hairs", desc: "Trap large particles before they enter your airways" },
  { icon: "💧", name: "Mucus Lining", desc: "Sticky layer catches smaller particles in your bronchi" },
  { icon: "🦠", name: "Ciliated Cells", desc: "Tiny hair-like structures sweep mucus and debris back out" },
];

const diseases = [
  { name: "Asthma", what: "Airways swell and narrow", how: "Irritants trigger chronic inflammation", risk: "Low–Medium", organ: "Lungs", riskLevel: 2 },
  { name: "COPD", what: "Permanent lung damage", how: "Long-term particle exposure destroys air sacs", risk: "High", organ: "Lungs", riskLevel: 3 },
  { name: "Lung Cancer", what: "Uncontrolled cell growth in lungs", how: "Carcinogens in polluted air damage DNA", risk: "Very High", organ: "Lungs", riskLevel: 4 },
  { name: "Heart Disease", what: "Arteries narrow, heart struggles", how: "Particles enter bloodstream, cause inflammation", risk: "Very High", organ: "Heart", riskLevel: 4 },
  { name: "Stroke", what: "Blood flow to brain is blocked", how: "Pollution thickens blood, raises clotting risk", risk: "Very High", organ: "Brain", riskLevel: 4 },
  { name: "Pneumonia", what: "Lung infection", how: "Pollution weakens immune defenses", risk: "Medium–High", organ: "Lungs", riskLevel: 3 },
];

const bodyParts = [
  { id: "lungs", icon: "🫁", name: "Lungs", desc: "Pollution destroys alveoli — tiny air sacs where oxygen enters your blood. Once destroyed, they don't grow back. Less alveoli = less oxygen = breathlessness for life." },
  { id: "heart", icon: "❤️", name: "Heart", desc: "When tiny particles enter the bloodstream, the heart works harder to pump thickened, inflamed blood. Over time this causes heart attacks and cardiovascular failure." },
  { id: "brain", icon: "🧠", name: "Brain", desc: "Reduced oxygen from damaged lungs, plus particles that cross into the blood, can trigger strokes and have been linked to cognitive decline and dementia." },
  { id: "cilia", icon: "🦠", name: "Ciliated Cells", desc: "Pollution paralyzes and destroys these cells. Without them, mucus and trapped particles sit in your lungs instead of being cleared — leading to chronic infections." },
  { id: "mucus", icon: "💧", name: "Mucus System", desc: "Pollution causes the body to overproduce mucus as a defense, leading to chronic cough, bronchitis, and blocked airways." },
];

const riskColors: Record<number, string> = {
  2: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  3: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  4: "bg-red-500/20 text-red-300 border-red-500/30",
};

const Health = () => {
  const [activeBody, setActiveBody] = useState("lungs");
  const active = bodyParts.find((b) => b.id === activeBody)!;

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <AnimatedSection>
          <span className="liquid-glass rounded-full px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase text-foreground/60 inline-block mb-6">
            Biology
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading italic mb-6 text-foreground">
            <BlurText text="How Pollution Affects Your Body" />
          </h1>
          <p className="text-foreground/60 font-body font-light text-lg max-w-2xl leading-relaxed mb-6">
            From your first breath, pollutants begin their journey through your respiratory system, bloodstream, and cells.
          </p>
        </AnimatedSection>

        {/* ──────────────────────────── SECTION 1 ──────────────────────────── */}
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
            <div className="liquid-glass-strong rounded-3xl p-8 md:p-12 mb-10">
              <p className="text-foreground/70 font-body font-light text-lg leading-relaxed mb-6">
                Every minute you breathe <span className="text-foreground font-medium">15–20 times</span> without thinking. But in a polluted city, each breath carries invisible passengers — gases and microscopic particles that your body was never designed to handle.
              </p>
              <p className="text-foreground/70 font-body font-light text-lg leading-relaxed">
                Your respiratory system has defenses. But <span className="text-foreground font-medium">PM2.5 particles</span> are so small they bypass all of them — going straight into your lungs and bloodstream.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {defenses.map((d, i) => (
              <AnimatedSection key={i} delay={0.1 + i * 0.1}>
                <div className="liquid-glass rounded-2xl p-6 h-full text-center">
                  <span className="text-3xl mb-3 block">{d.icon}</span>
                  <h4 className="text-lg font-heading italic text-foreground mb-2">{d.name}</h4>
                  <p className="text-foreground/50 font-body font-light text-sm leading-relaxed">{d.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4}>
            <div className="mt-8 liquid-glass rounded-2xl p-6 border-l-2 border-red-500/40">
              <p className="text-foreground/80 font-body font-light text-base leading-relaxed">
                <span className="text-red-400 font-medium">The problem:</span> PM2.5 particles are just 2.5 micrometers across — 30× smaller than a human hair. They slip past every defense and embed deep in your lung tissue.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <div className="mt-10">
              <p className="text-foreground/40 font-body text-xs uppercase tracking-widest mb-4 text-center">
                Watch the journey: particles → trachea → bronchi → alveoli
              </p>
              <LungJourney />
            </div>
          </AnimatedSection>
        </section>

        {/* ──────────────────────────── SECTION 2 ──────────────────────────── */}
        <section className="mt-40">
          <AnimatedSection>
            <span className="liquid-glass rounded-full px-3 py-1 text-[10px] font-body font-medium tracking-widest uppercase text-foreground/50 inline-block mb-5">
              Section 02
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading italic mb-4 text-foreground">
              The Diseases
            </h2>
            <p className="text-foreground/50 font-body font-light text-lg mb-12 max-w-2xl">
              Pollution doesn't cause one disease — it fuels many. Here's what each one does to you.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {diseases.map((d, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="liquid-glass rounded-2xl p-7 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-heading italic text-foreground">{d.name}</h4>
                    <span className={`shrink-0 ml-3 rounded-full px-2.5 py-0.5 text-[10px] font-body font-semibold tracking-wider uppercase border ${riskColors[d.riskLevel]}`}>
                      {d.risk}
                    </span>
                  </div>
                  <p className="text-foreground/50 font-body text-xs uppercase tracking-wider mb-2">{d.what}</p>
                  <p className="text-foreground/60 font-body font-light text-sm leading-relaxed mt-auto">{d.how}</p>
                  <div className="mt-4 pt-4 border-t border-foreground/10">
                    <span className="text-foreground/40 font-body text-xs">Affected: {d.organ}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* ──────────────────────────── SECTION 3 ──────────────────────────── */}
        <section className="mt-40">
          <AnimatedSection>
            <span className="liquid-glass rounded-full px-3 py-1 text-[10px] font-body font-medium tracking-widest uppercase text-foreground/50 inline-block mb-5">
              Section 03
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading italic mb-4 text-foreground">
              Body Breakdown — The Key Players
            </h2>
            <p className="text-foreground/50 font-body font-light text-lg mb-12 max-w-2xl">
              Tap on each organ to see how pollution targets it specifically.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="liquid-glass-strong rounded-3xl p-8 md:p-12">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {bodyParts.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setActiveBody(b.id)}
                    className={`rounded-full px-5 py-2.5 text-sm font-body font-medium transition-all duration-300 ${
                      activeBody === b.id
                        ? "bg-foreground/90 text-primary-foreground"
                        : "liquid-glass text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    <span className="mr-1.5">{b.icon}</span>
                    {b.name}
                  </button>
                ))}
              </div>

              {/* Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  exit={{ opacity: 0, filter: "blur(8px)", y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-start gap-5">
                    <span className="text-5xl shrink-0">{active.icon}</span>
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

        {/* ──────────────────────────── SECTION 4 ──────────────────────────── */}
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
              <div className="liquid-glass rounded-3xl p-10 h-full flex flex-col items-center text-center">
                <span className="text-5xl mb-6">🚬</span>
                <p className="text-foreground/80 font-body font-light text-lg leading-relaxed">
                  Living in a highly polluted city is equivalent to smoking{" "}
                  <span className="text-foreground font-heading italic text-3xl block my-4">1–7 cigarettes per day</span>
                  even if you've never smoked in your life.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="liquid-glass rounded-3xl p-10 h-full flex flex-col items-center text-center">
                <span className="text-5xl mb-6">💀</span>
                <p className="text-foreground/80 font-body font-light text-lg leading-relaxed">
                  Air pollution causes approximately{" "}
                  <span className="text-foreground font-heading italic text-3xl block my-4">7 million deaths per year</span>
                  more than AIDS, malaria, and tuberculosis combined.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Health;
