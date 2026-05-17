import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Wind, Microscope, Building2, Shield, Atom, Plus, ArrowRight,
  Factory, Mountain, Layers, Gauge, Sparkles, Thermometer,
} from "lucide-react";
import BlurText from "../components/BlurText";
import AnimatedSection from "../components/AnimatedSection";
import ParticleSettlingSim from "../components/ParticleSettlingSim";

type Accent = "sky" | "rose" | "violet" | "amber" | "emerald" | "fuchsia";

const ACCENT: Record<Accent, { bg: string; ring: string; text: string; glow: string; dot: string }> = {
  sky:     { bg: "bg-sky-500/15",     ring: "ring-sky-400/40",     text: "text-sky-300",     glow: "from-sky-500/40",     dot: "bg-sky-400" },
  rose:    { bg: "bg-rose-500/15",    ring: "ring-rose-400/40",    text: "text-rose-300",    glow: "from-rose-500/40",    dot: "bg-rose-400" },
  violet:  { bg: "bg-violet-500/15",  ring: "ring-violet-400/40",  text: "text-violet-300",  glow: "from-violet-500/40",  dot: "bg-violet-400" },
  amber:   { bg: "bg-amber-500/15",   ring: "ring-amber-400/40",   text: "text-amber-300",   glow: "from-amber-500/40",   dot: "bg-amber-400" },
  emerald: { bg: "bg-emerald-500/15", ring: "ring-emerald-400/40", text: "text-emerald-300", glow: "from-emerald-500/40", dot: "bg-emerald-400" },
  fuchsia: { bg: "bg-fuchsia-500/15", ring: "ring-fuchsia-400/40", text: "text-fuchsia-300", glow: "from-fuchsia-500/40", dot: "bg-fuchsia-400" },
};

const particles = [
  { label: "Dust / Pollen", size: "50–100 μm", fate: "Falls quickly due to gravity, caught by nose" },
  { label: "PM10", size: "10 μm", fate: "Stays airborne longer, caught by upper airways" },
  { label: "PM2.5", size: "2.5 μm", fate: "Stays airborne for days, reaches deep lungs" },
  { label: "Ultrafine PM", size: "< 0.1 μm", fate: "Enters bloodstream directly" },
];

const lungDefenses = [
  { name: "Inertial Impaction", desc: "Large particles moving fast hit the walls of your airways and stick to mucus. Physics saves you from big particles.", Icon: Shield, accent: "sky" as Accent },
  { name: "Gravitational Settling", desc: "Medium particles slow down and sink onto airway surfaces before reaching deep lungs.", Icon: Gauge, accent: "amber" as Accent },
  { name: "Diffusion", desc: "Ultrafine particles are so small they don't follow straight paths — they diffuse randomly into the deepest lung tissue.", Icon: Sparkles, accent: "violet" as Accent },
];

const bigIdeas = [
  {
    id: "wind",
    Icon: Wind,
    accent: "sky" as Accent,
    title: "Why Pollution Travels So Far",
    subtitle: "Fluid Dynamics & Wind",
    content: (
      <>
        <p className="text-foreground/65 font-body font-light text-lg leading-relaxed mb-6">
          Air behaves like a fluid — it flows, swirls, and carries things with it. Pollutants released from a factory chimney don't just fall straight down. Wind currents can carry them hundreds or thousands of kilometers away.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { Icon: Wind, term: "Wind speed", detail: "Faster wind disperses pollution more widely but spreads it further. A city 500 km away can receive pollution from another country." },
            { Icon: Layers, term: "Air pressure", detail: "High pressure pushes air downward, trapping pollution close to the ground like a lid on a pot." },
            { Icon: Thermometer, term: "Inversion layer", detail: "A warm layer above cold air acts as a ceiling. Pollution gets trapped underneath and concentrates rapidly." },
          ].map((c, idx) => {
            const a = ACCENT[(["sky", "violet", "rose"] as Accent[])[idx]];
            const CIcon = c.Icon;
            return (
              <div key={c.term} className={`liquid-glass rounded-2xl p-5 ring-1 ${a.ring}`}>
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${a.bg} ring-1 ${a.ring} mb-3`}>
                  <CIcon className={`w-4 h-4 ${a.text}`} />
                </div>
                <div className="text-foreground font-heading italic text-base mb-1">{c.term}</div>
                <div className="text-foreground/55 font-body font-light text-sm leading-relaxed">{c.detail}</div>
              </div>
            );
          })}
        </div>
        <div className="liquid-glass-strong rounded-2xl p-6 ring-1 ring-rose-400/40 flex items-start gap-4">
          <div className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-rose-500/15 ring-1 ring-rose-400/40">
            <Factory className="w-5 h-5 text-rose-300" />
          </div>
          <div>
            <p className="text-foreground font-heading italic text-lg mb-1">The Great Smog of London, 1952</p>
            <p className="text-foreground/60 font-body font-light text-sm leading-relaxed">
              A temperature inversion trapped coal smoke over the city for 5 days. An estimated <span className="text-foreground font-medium">12,000 people died</span>.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "size",
    Icon: Microscope,
    accent: "violet" as Accent,
    title: "Why Size Is Everything",
    subtitle: "The Physics of Particles",
    content: (
      <>
        <p className="text-foreground/65 font-body font-light text-lg leading-relaxed mb-6">
          The reason PM2.5 is so dangerous is pure physics — size, mass, and how particles behave in air.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {particles.map((p, i) => {
            const a = ACCENT[(["amber", "rose", "fuchsia", "violet"] as Accent[])[i]];
            return (
              <div key={p.label} className={`liquid-glass rounded-2xl p-5 ring-1 ${a.ring}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground font-heading italic text-lg">{p.label}</span>
                  <span className={`text-[10px] font-body font-semibold tracking-wider uppercase rounded-full px-2 py-0.5 ${a.bg} ${a.text}`}>{p.size}</span>
                </div>
                <p className="text-foreground/55 font-body font-light text-sm leading-relaxed">{p.fate}</p>
              </div>
            );
          })}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="liquid-glass rounded-2xl p-5 ring-1 ring-amber-400/40">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/15 ring-1 ring-amber-400/40 mb-3">
              <Atom className="w-4 h-4 text-amber-300" />
            </div>
            <h4 className="text-foreground font-heading italic text-lg mb-1">Gravity</h4>
            <p className="text-foreground/55 font-body font-light text-sm leading-relaxed">
              The smaller and lighter a particle, the weaker gravity's pull relative to air resistance. PM2.5 is so light it essentially floats indefinitely.
            </p>
          </div>
          <div className="liquid-glass rounded-2xl p-5 ring-1 ring-emerald-400/40">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/40 mb-3">
              <Sparkles className="w-4 h-4 text-emerald-300" />
            </div>
            <h4 className="text-foreground font-heading italic text-lg mb-1">Brownian Motion</h4>
            <p className="text-foreground/55 font-body font-light text-sm leading-relaxed">
              Ultrafine particles get bumped randomly by air molecules themselves, making them impossible to settle. They zigzag constantly.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "urban",
    Icon: Building2,
    accent: "rose" as Accent,
    title: "The Urban Heat Trap",
    subtitle: "Cities Make It Worse",
    content: (
      <>
        <p className="text-foreground/65 font-body font-light text-lg leading-relaxed mb-6">
          Cities are physically different from the countryside — and that difference makes pollution more dangerous.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="liquid-glass rounded-2xl p-6 ring-1 ring-amber-400/40">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-amber-500/15 ring-1 ring-amber-400/40 mb-4">
              <Thermometer className="w-5 h-5 text-amber-300" />
            </div>
            <h4 className="text-foreground font-heading italic text-xl mb-3">Urban Heat Island</h4>
            <ul className="space-y-2">
              {[
                "Concrete absorbs heat by day and releases it at night",
                "Cities run 1–3°C warmer than rural areas",
                "Heat accelerates ozone and smog formation",
                "Hot air holds more moisture, speeding acid formation",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-300/70 mt-1.5 text-[10px]">●</span>
                  <span className="text-foreground/55 font-body font-light text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="liquid-glass rounded-2xl p-6 ring-1 ring-violet-400/40">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-violet-500/15 ring-1 ring-violet-400/40 mb-4">
              <Mountain className="w-5 h-5 text-violet-300" />
            </div>
            <h4 className="text-foreground font-heading italic text-xl mb-3">Street Canyon Effect</h4>
            <ul className="space-y-2">
              {[
                "Tall buildings form a channel like a canyon",
                "Wind can't flow through, exhaust gets trapped",
                "Pollution can be 2–3× higher than an open road",
                "Pedestrians breathe the highest concentrations",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-violet-300/70 mt-1.5 text-[10px]">●</span>
                  <span className="text-foreground/55 font-body font-light text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    ),
  },
];

const Physics = () => {
  const [activeIdea, setActiveIdea] = useState<string | null>("wind");

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <AnimatedSection>
          <span className="liquid-glass rounded-full px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase text-foreground/60 inline-flex items-center gap-1.5 mb-6">
            <Atom className="w-3.5 h-3.5" /> Physics
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading italic mb-6 text-foreground">
            <BlurText text="How Particles Move Through Air" />
          </h1>
          <p className="text-foreground/60 font-body font-light text-lg max-w-2xl leading-relaxed mb-6">
            You can't see it, you can't feel it — but physics decides where pollution goes, how far it travels, and whether it reaches your lungs.
          </p>
        </AnimatedSection>

        {/* ─── SECTION 1: BIG IDEAS ─── */}
        <section className="mt-32">
          <AnimatedSection>
            <span className="liquid-glass rounded-full px-3 py-1 text-[10px] font-body font-medium tracking-widest uppercase text-foreground/50 inline-block mb-5">
              Section 01
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading italic mb-4 text-foreground">
              Three Big Ideas
            </h2>
            <p className="text-foreground/50 font-body font-light text-lg mb-12 max-w-2xl">
              Tap any idea to expand its full breakdown.
            </p>
          </AnimatedSection>

          <div className="space-y-5">
            {bigIdeas.map((idea, i) => {
              const a = ACCENT[idea.accent];
              const isActive = activeIdea === idea.id;
              const IIcon = idea.Icon;
              return (
                <AnimatedSection key={idea.id} delay={i * 0.08}>
                  <div className={`relative rounded-3xl liquid-glass ring-1 ${a.ring} overflow-hidden transition-all`}>
                    <div className={`absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br ${a.glow} to-transparent blur-3xl opacity-60`} />
                    <button
                      onClick={() => setActiveIdea(isActive ? null : idea.id)}
                      className="relative w-full text-left p-7 md:p-9"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className={`shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-2xl ${a.bg} ring-1 ${a.ring}`}>
                            <IIcon className={`w-6 h-6 ${a.text}`} />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-xl sm:text-2xl font-heading italic text-foreground truncate">{idea.title}</h3>
                            <p className={`font-body text-sm mt-1 ${a.text}`}>{idea.subtitle}</p>
                          </div>
                        </div>
                        <motion.span
                          animate={{ rotate: isActive ? 45 : 0 }}
                          className={`shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full ${a.bg} ${a.text}`}
                        >
                          <Plus className="w-4 h-4" />
                        </motion.span>
                      </div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                          className="relative overflow-hidden"
                        >
                          <div className="px-7 md:px-9 pb-9 pt-2">{idea.content}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </section>

        {/* ─── SECTION 2: LUNG DEFENSE ─── */}
        <section className="mt-40">
          <AnimatedSection>
            <span className="liquid-glass rounded-full px-3 py-1 text-[10px] font-body font-medium tracking-widest uppercase text-foreground/50 inline-block mb-5">
              Section 02
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading italic mb-4 text-foreground">
              The Physics of Your Lungs
            </h2>
            <p className="text-foreground/50 font-body font-light text-lg max-w-2xl leading-relaxed mb-12">
              Your body uses physics too — your lungs are an incredible filtration system, but they have a size limit they can't beat.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {lungDefenses.map((d, i) => {
              const a = ACCENT[d.accent];
              const DIcon = d.Icon;
              return (
                <AnimatedSection key={d.name} delay={i * 0.1}>
                  <div className={`group relative h-full rounded-2xl p-7 liquid-glass ring-1 ${a.ring} overflow-hidden transition-all hover:-translate-y-1`}>
                    <div className={`absolute -top-16 -right-16 w-52 h-52 rounded-full bg-gradient-to-br ${a.glow} to-transparent blur-3xl opacity-70 group-hover:opacity-100 transition-opacity`} />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${a.bg} ring-1 ${a.ring}`}>
                          <DIcon className={`w-5 h-5 ${a.text}`} />
                        </div>
                        <span className={`font-heading italic text-3xl ${a.text} opacity-60`}>0{i + 1}</span>
                      </div>
                      <h4 className="text-xl font-heading italic text-foreground mb-3">{d.name}</h4>
                      <p className="text-foreground/55 font-body font-light text-sm leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </section>

        {/* ─── SECTION 3: STOKES' LAW ─── */}
        <section className="mt-32">
          <AnimatedSection>
            <span className="liquid-glass rounded-full px-3 py-1 text-[10px] font-body font-medium tracking-widest uppercase text-foreground/50 inline-block mb-5">
              Section 03
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading italic mb-4 text-foreground">
              One Simple Principle
            </h2>
            <p className="text-foreground/50 font-body font-light text-lg max-w-2xl leading-relaxed mb-10">
              Stokes' Law describes how fast a particle falls through air. Watch it happen — three particle sizes, three very different fates.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="mb-8">
              <ParticleSettlingSim />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.25}>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "Smaller & lighter", result: "Falls slower", accent: "sky" as Accent },
                { label: "Falls slower", result: "Stays airborne longer", accent: "violet" as Accent },
                { label: "Stays airborne longer", result: "More likely you breathe it", accent: "rose" as Accent },
              ].map((step, i) => {
                const a = ACCENT[step.accent];
                return (
                  <div key={i} className={`relative rounded-2xl p-6 liquid-glass ring-1 ${a.ring} overflow-hidden`}>
                    <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${a.glow} to-transparent blur-3xl opacity-60`} />
                    <div className="relative text-center">
                      <div className="text-foreground font-heading italic text-lg mb-2">{step.label}</div>
                      <ArrowRight className={`w-5 h-5 mx-auto my-2 ${a.text} rotate-90`} />
                      <div className="text-foreground/60 font-body font-light text-sm">{step.result}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </section>

        {/* ─── TAKEAWAY ─── */}
        <section className="mt-32 mb-10">
          <AnimatedSection>
            <div className="relative liquid-glass-strong rounded-3xl p-10 md:p-16 text-center overflow-hidden">
              <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-br from-sky-500/30 to-transparent blur-3xl" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-rose-500/30 to-transparent blur-3xl" />
              <div className="relative">
                <span className="text-foreground/40 font-body text-xs tracking-widest uppercase block mb-6">The Takeaway</span>
                <p className="text-foreground font-heading italic text-2xl md:text-3xl lg:text-4xl leading-snug max-w-4xl mx-auto">
                  "Physics doesn't care about borders, buildings, or bodies. It just follows its rules — and right now, those rules are working against us."
                </p>
              </div>
            </div>
          </AnimatedSection>
        </section>
      </div>
    </div>
  );
};

export default Physics;
