import { Link } from "react-router-dom";
import { Dna, FlaskConical, Atom, ArrowRight, GraduationCap } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import BlurText from "../components/BlurText";

const subjects = [
  {
    to: "/igcse/biology",
    Icon: Dna,
    title: "IGCSE Biology",
    tag: "The Living Cost",
    desc: "How polluted air damages the respiratory system, gas exchange, plants and whole ecosystems.",
    bullets: ["Respiratory system", "Gas exchange in alveoli", "Diseases & smoking", "Acid rain on plants"],
    accent: "emerald",
  },
  {
    to: "/igcse/chemistry",
    Icon: FlaskConical,
    title: "IGCSE Chemistry",
    tag: "What's In The Air",
    desc: "The composition of clean vs polluted air, combustion equations, acid rain and the greenhouse effect.",
    bullets: ["Air composition", "CO, SO₂, NOₓ, PM", "Complete & incomplete combustion", "Greenhouse effect"],
    accent: "amber",
  },
  {
    to: "/igcse/physics",
    Icon: Atom,
    title: "IGCSE Physics",
    tag: "How Air Behaves",
    desc: "Particle model, gas laws, thermal inversion and energy from fossil fuels — the physics of smog.",
    bullets: ["Particle model", "Pressure · Volume · Temp", "Thermal inversion", "Air-quality measurement"],
    accent: "sky",
  },
] as const;

const ACCENT = {
  emerald: { text: "text-emerald-300", ring: "ring-emerald-400/40", bg: "bg-emerald-500/15", glow: "from-emerald-500/40" },
  amber:   { text: "text-amber-300",   ring: "ring-amber-400/40",   bg: "bg-amber-500/15",   glow: "from-amber-500/40" },
  sky:     { text: "text-sky-300",     ring: "ring-sky-400/40",     bg: "bg-sky-500/15",     glow: "from-sky-500/40" },
} as const;

const IGCSE = () => (
  <div className="pt-32 pb-20 px-6">
    <div className="max-w-6xl mx-auto">
      <AnimatedSection>
        <span className="liquid-glass rounded-full px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase text-foreground/60 inline-flex items-center gap-1.5 mb-6">
          <GraduationCap className="w-3.5 h-3.5" /> Study Hub
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading italic mb-6 text-foreground">
          <BlurText text="IGCSE Study Hub" />
        </h1>
        <p className="text-foreground/60 font-body font-light text-lg max-w-2xl leading-relaxed mb-16">
          The science behind <em>Breathing Polluted Air</em> — explained at IGCSE level across Biology, Chemistry and Physics.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subjects.map((s, i) => {
          const a = ACCENT[s.accent];
          const SIcon = s.Icon;
          return (
            <AnimatedSection key={s.to} delay={i * 0.1}>
              <Link
                to={s.to}
                className={`group relative block h-full rounded-3xl p-7 liquid-glass-strong ring-1 ${a.ring} overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl`}
              >
                <div className={`absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br ${a.glow} to-transparent blur-3xl opacity-60 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${a.bg} ring-1 ${a.ring} mb-5`}>
                    <SIcon className={`w-7 h-7 ${a.text}`} />
                  </div>
                  <p className={`font-body text-xs uppercase tracking-widest mb-2 ${a.text}`}>{s.tag}</p>
                  <h3 className="text-2xl font-heading italic text-foreground mb-3">{s.title}</h3>
                  <p className="text-foreground/60 font-body font-light text-sm leading-relaxed mb-5">{s.desc}</p>
                  <ul className="space-y-1.5 mb-6">
                    {s.bullets.map((b) => (
                      <li key={b} className="text-foreground/55 font-body text-sm flex items-center gap-2">
                        <span className={`w-1 h-1 rounded-full ${a.bg.replace("/15","/80")}`} /> {b}
                      </li>
                    ))}
                  </ul>
                  <span className={`inline-flex items-center gap-1.5 text-sm font-body font-medium ${a.text}`}>
                    Open syllabus <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  </div>
);

export default IGCSE;
