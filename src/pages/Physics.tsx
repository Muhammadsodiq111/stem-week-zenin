import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import BlurText from "../components/BlurText";
import AnimatedSection from "../components/AnimatedSection";

const particles = [
  { label: "Dust / Pollen", size: "50–100 μm", fate: "Falls quickly due to gravity, caught by nose" },
  { label: "PM10", size: "10 μm", fate: "Stays airborne longer, caught by upper airways" },
  { label: "PM2.5", size: "2.5 μm", fate: "Stays airborne for days, reaches deep lungs" },
  { label: "Ultrafine PM", size: "< 0.1 μm", fate: "Enters bloodstream directly" },
];

const lungDefenses = [
  { name: "Inertial Impaction", desc: "Large particles moving fast hit the walls of your airways and stick to mucus. Physics saves you from big particles." },
  { name: "Gravitational Settling", desc: "Medium particles slow down and sink onto airway surfaces before reaching deep lungs." },
  { name: "Diffusion", desc: "Ultrafine particles are so small they don't follow straight paths. They diffuse randomly and sneak into the deepest lung tissue." },
];

const bigIdeas = [
  {
    id: "wind",
    icon: "💨",
    title: "Why Pollution Travels So Far",
    subtitle: "Fluid Dynamics & Wind",
    content: (
      <>
        <p className="text-foreground/60 font-body font-light text-lg leading-relaxed mb-6">
          Air behaves like a fluid — it flows, swirls, and carries things with it. Pollutants released from a factory chimney don't just fall straight down. They get carried by wind currents sometimes hundreds or thousands of kilometers away.
        </p>
        <div className="space-y-4 mb-8">
          {[
            { term: "Wind speed", detail: "Faster wind disperses pollution more widely but also spreads it further. A city 500km away can receive pollution from another country." },
            { term: "Air pressure", detail: "High pressure systems push air downward, trapping pollution close to the ground like a lid on a pot." },
            { term: "Temperature inversion", detail: "Normally warm air rises and takes pollution with it. But sometimes a layer of warm air sits above cold air, acting as a ceiling. Pollution gets trapped underneath and concentrates." },
          ].map((c) => (
            <div key={c.term} className="liquid-glass rounded-xl p-5">
              <span className="text-foreground font-heading italic text-lg">{c.term}</span>
              <span className="text-foreground/50 font-body font-light text-base ml-2">— {c.detail}</span>
            </div>
          ))}
        </div>
        <div className="liquid-glass-strong rounded-2xl p-8 border-l-2 border-foreground/20">
          <p className="text-foreground font-heading italic text-xl mb-2">🏭 The Great Smog of London, 1952</p>
          <p className="text-foreground/60 font-body font-light text-base leading-relaxed">
            A temperature inversion trapped coal smoke over the city for 5 days. An estimated <span className="text-foreground font-medium">12,000 people died</span>.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "size",
    icon: "🔬",
    title: "Why Size Is Everything",
    subtitle: "The Physics of Particles",
    content: (
      <>
        <p className="text-foreground/60 font-body font-light text-lg leading-relaxed mb-8">
          The reason PM2.5 is so dangerous is pure physics — it comes down to size, mass, and how particles behave in air.
        </p>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-foreground/10">
                <th className="py-3 px-4 text-foreground/40 font-body font-medium text-sm uppercase tracking-wider">Particle</th>
                <th className="py-3 px-4 text-foreground/40 font-body font-medium text-sm uppercase tracking-wider">Size</th>
                <th className="py-3 px-4 text-foreground/40 font-body font-medium text-sm uppercase tracking-wider">What happens</th>
              </tr>
            </thead>
            <tbody>
              {particles.map((p) => (
                <tr key={p.label} className="border-b border-foreground/5">
                  <td className="py-4 px-4 text-foreground font-heading italic text-lg">{p.label}</td>
                  <td className="py-4 px-4 text-foreground/80 font-body font-medium">{p.size}</td>
                  <td className="py-4 px-4 text-foreground/50 font-body font-light">{p.fate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="liquid-glass rounded-xl p-6">
            <h4 className="text-foreground font-heading italic text-xl mb-2">Gravity</h4>
            <p className="text-foreground/50 font-body font-light text-base leading-relaxed">
              Pulls particles down — but the smaller and lighter a particle, the weaker gravity's pull relative to air resistance. PM2.5 is so light it essentially floats indefinitely.
            </p>
          </div>
          <div className="liquid-glass rounded-xl p-6">
            <h4 className="text-foreground font-heading italic text-xl mb-2">Brownian Motion</h4>
            <p className="text-foreground/50 font-body font-light text-base leading-relaxed">
              Ultrafine particles are so tiny they get bumped around randomly by air molecules themselves, making them impossible to settle. They zigzag constantly.
            </p>
          </div>
        </div>
        <div className="liquid-glass-strong rounded-2xl p-6 text-center">
          <p className="text-foreground font-heading italic text-xl">
            🔬 PM2.5 is so small that <span className="text-foreground">30 of them lined up</span> side by side would equal the width of a single human hair.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "urban",
    icon: "🌆",
    title: "The Urban Heat Trap",
    subtitle: "Cities Make It Worse",
    content: (
      <>
        <p className="text-foreground/60 font-body font-light text-lg leading-relaxed mb-8">
          Cities are physically different from the countryside — and that difference makes pollution more dangerous through two physics phenomena.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="liquid-glass rounded-2xl p-8">
            <h4 className="text-foreground font-heading italic text-2xl mb-4">Urban Heat Island</h4>
            <ul className="space-y-3">
              {[
                "Buildings, roads, and concrete absorb heat during the day and release it at night",
                "Cities are on average 1–3°C warmer than surrounding rural areas",
                "Extra heat accelerates chemical reactions — speeding up ozone and smog formation",
                "Hot air holds more water vapor, which reacts with SO₂ and NO₂ to form acids faster",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-foreground/30 mt-1.5 text-xs">●</span>
                  <span className="text-foreground/50 font-body font-light text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="liquid-glass rounded-2xl p-8">
            <h4 className="text-foreground font-heading italic text-2xl mb-4">Street Canyon Effect</h4>
            <ul className="space-y-3">
              {[
                "Tall buildings on both sides of a street create a channel — like a canyon",
                "Wind can't flow through properly, so exhaust gets trapped at street level",
                "Pollution levels inside a street canyon can be 2–3× higher than on an open road",
                "People walking and breathing are right in the middle of the highest concentrations",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-foreground/30 mt-1.5 text-xs">●</span>
                  <span className="text-foreground/50 font-body font-light text-base leading-relaxed">{item}</span>
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
  const [activeIdea, setActiveIdea] = useState<string | null>(null);

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <AnimatedSection>
          <span className="liquid-glass rounded-full px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase text-foreground/60 inline-block mb-6">
            Physics
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading italic mb-6 text-foreground">
            <BlurText text="How Particles Move Through Air" />
          </h1>
          <p className="text-foreground/60 font-body font-light text-lg max-w-2xl leading-relaxed mb-6">
            You can't see it, you can't feel it — but physics decides where pollution goes, how far it travels, and whether it reaches your lungs. The air around you is never still.
          </p>
          <p className="text-foreground/40 font-body font-light text-base max-w-2xl leading-relaxed mb-20">
            Physics here isn't about heavy equations. It's about movement, size, and invisible forces — all of which determine how dangerous the air you breathe actually is.
          </p>
        </AnimatedSection>

        {/* Big Ideas */}
        <AnimatedSection className="mb-24">
          <h2 className="text-3xl sm:text-4xl font-heading italic text-foreground mb-12">Three Big Ideas</h2>
          <div className="space-y-4">
            {bigIdeas.map((idea, i) => {
              const isActive = activeIdea === idea.id;
              return (
                <AnimatedSection key={idea.id} delay={i * 0.08}>
                  <button
                    onClick={() => setActiveIdea(isActive ? null : idea.id)}
                    className="w-full text-left liquid-glass rounded-2xl p-8 md:p-10 transition-all duration-300 hover:border-foreground/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{idea.icon}</span>
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-heading italic text-foreground">{idea.title}</h3>
                          <p className="text-foreground/40 font-body text-sm mt-1">{idea.subtitle}</p>
                        </div>
                      </div>
                      <motion.span
                        animate={{ rotate: isActive ? 45 : 0 }}
                        className="text-foreground/40 text-2xl font-light"
                      >
                        +
                      </motion.span>
                    </div>
                  </button>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, filter: "blur(8px)" }}
                        animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
                        exit={{ opacity: 0, height: 0, filter: "blur(8px)" }}
                        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 pb-2 px-2">{idea.content}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </AnimatedSection>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Lung Defense */}
        <AnimatedSection className="mb-24">
          <h2 className="text-3xl sm:text-4xl font-heading italic text-foreground mb-4">
            The Physics of Your Lungs
          </h2>
          <p className="text-foreground/50 font-body font-light text-lg max-w-2xl leading-relaxed mb-12">
            Your body uses physics too — your lungs are an incredible filtration system, but they have a size limit they can't beat.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {lungDefenses.map((d, i) => (
              <AnimatedSection key={d.name} delay={i * 0.1}>
                <div className="liquid-glass rounded-2xl p-8 h-full">
                  <div className="text-foreground/20 font-heading italic text-5xl mb-4">{String(i + 1).padStart(2, "0")}</div>
                  <h4 className="text-xl font-heading italic text-foreground mb-3">{d.name}</h4>
                  <p className="text-foreground/50 font-body font-light text-base leading-relaxed">{d.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="liquid-glass-strong rounded-2xl p-10 text-center">
            <p className="text-foreground font-heading italic text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
              ⚛️ Your lungs evolved to filter nature — dust, pollen, smoke from small fires. They were never designed for the physics of industrial-scale pollution.
            </p>
          </div>
        </AnimatedSection>

        {/* Stokes' Law */}
        <AnimatedSection className="mb-24">
          <h2 className="text-3xl sm:text-4xl font-heading italic text-foreground mb-4">
            One Simple Principle
          </h2>
          <p className="text-foreground/50 font-body font-light text-lg max-w-2xl leading-relaxed mb-10">
            Stokes' Law describes how fast a particle falls through air:
          </p>
          <div className="liquid-glass rounded-2xl p-10 md:p-14">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { label: "Smaller & lighter", result: "Falls slower" },
                { label: "Falls slower", result: "Stays airborne longer" },
                { label: "Stays airborne longer", result: "More likely you breathe it" },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-foreground font-heading italic text-xl mb-2">{step.label}</div>
                  <span className="text-foreground/30 text-2xl mb-2">↓</span>
                  <div className="text-foreground/50 font-body font-light text-base">{step.result}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Hook */}
        <AnimatedSection>
          <div className="liquid-glass-strong rounded-2xl p-12 md:p-16 text-center">
            <span className="text-foreground/30 font-body text-sm tracking-widest uppercase block mb-6">The Takeaway</span>
            <p className="text-foreground font-heading italic text-2xl md:text-3xl lg:text-4xl leading-snug max-w-4xl mx-auto">
              "Physics doesn't care about borders, buildings, or bodies. It just follows its rules — and right now, those rules are working against us. The same forces that make a city feel alive are trapping poison in the air its people breathe."
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Physics;
