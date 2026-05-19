import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, GraduationCap, Sparkles } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import BlurText from "./BlurText";

type IconType = React.ComponentType<{ className?: string }>;

export type Accent = "emerald" | "amber" | "sky" | "rose" | "violet" | "fuchsia";

export const ACCENT: Record<Accent, { text: string; ring: string; bg: string; glow: string; dot: string }> = {
  emerald: { text: "text-emerald-300", ring: "ring-emerald-400/40", bg: "bg-emerald-500/15", glow: "from-emerald-500/40", dot: "bg-emerald-400" },
  amber:   { text: "text-amber-300",   ring: "ring-amber-400/40",   bg: "bg-amber-500/15",   glow: "from-amber-500/40",   dot: "bg-amber-400" },
  sky:     { text: "text-sky-300",     ring: "ring-sky-400/40",     bg: "bg-sky-500/15",     glow: "from-sky-500/40",     dot: "bg-sky-400" },
  rose:    { text: "text-rose-300",    ring: "ring-rose-400/40",    bg: "bg-rose-500/15",    glow: "from-rose-500/40",    dot: "bg-rose-400" },
  violet:  { text: "text-violet-300",  ring: "ring-violet-400/40",  bg: "bg-violet-500/15",  glow: "from-violet-500/40",  dot: "bg-violet-400" },
  fuchsia: { text: "text-fuchsia-300", ring: "ring-fuchsia-400/40", bg: "bg-fuchsia-500/15", glow: "from-fuchsia-500/40", dot: "bg-fuchsia-400" },
};

export const IGCSEHeader = ({
  Icon, subject, title, intro, accent,
}: { Icon: IconType; subject: string; title: string; intro: string; accent: Accent }) => {
  const a = ACCENT[accent];
  return (
    <AnimatedSection>
      <Link to="/igcse" className="inline-flex items-center gap-1.5 text-foreground/50 hover:text-foreground font-body text-sm mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Study Hub
      </Link>
      <div className="flex items-center gap-3 mb-6">
        <span className={`liquid-glass rounded-full px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase inline-flex items-center gap-1.5 ${a.text}`}>
          <GraduationCap className="w-3.5 h-3.5" /> {subject}
        </span>
      </div>
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading italic mb-6 text-foreground">
        <BlurText text={title} />
      </h1>
      <p className="text-foreground/60 font-body font-light text-lg max-w-2xl leading-relaxed">
        {intro}
      </p>
    </AnimatedSection>
  );
};

export const IGCSESection = ({
  index, title, kicker, accent, children,
}: { index: string; title: string; kicker?: string; accent: Accent; children: ReactNode }) => {
  const a = ACCENT[accent];
  return (
    <section className="mt-24">
      <AnimatedSection>
        <span className={`font-body text-xs uppercase tracking-widest mb-3 inline-block ${a.text}`}>
          Section {index}
        </span>
        <h2 className="text-3xl sm:text-5xl font-heading italic mb-3 text-foreground">{title}</h2>
        {kicker && <p className="text-foreground/55 font-body font-light text-base max-w-2xl mb-8">{kicker}</p>}
      </AnimatedSection>
      <div className="mt-6">{children}</div>
    </section>
  );
};

export const KeywordChips = ({ items, accent }: { items: string[]; accent: Accent }) => {
  const a = ACCENT[accent];
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {items.map((k) => (
        <span key={k} className={`rounded-full px-3 py-1 text-xs font-body ${a.bg} ring-1 ${a.ring} ${a.text}`}>
          {k}
        </span>
      ))}
    </div>
  );
};

export const Equation = ({ label, eq, note, accent }: { label?: string; eq: string; note?: string; accent: Accent }) => {
  const a = ACCENT[accent];
  return (
    <div className={`liquid-glass rounded-2xl p-5 ring-1 ${a.ring}`}>
      {label && <p className={`text-[10px] font-body uppercase tracking-widest mb-2 ${a.text}`}>{label}</p>}
      <p className="font-heading italic text-xl text-foreground leading-relaxed">{eq}</p>
      {note && <p className="text-foreground/55 font-body font-light text-sm mt-2">{note}</p>}
    </div>
  );
};

export const FactCard = ({
  Icon, title, body, accent,
}: { Icon: IconType; title: string; body: string; accent: Accent }) => {
  const a = ACCENT[accent];
  return (
    <div className={`group relative h-full rounded-2xl p-6 liquid-glass ring-1 ${a.ring} overflow-hidden transition-transform hover:-translate-y-1`}>
      <div className={`absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br ${a.glow} to-transparent blur-3xl opacity-60 group-hover:opacity-100 transition-opacity`} />
      <div className="relative">
        <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${a.bg} ring-1 ${a.ring} mb-4`}>
          <Icon className={`w-5 h-5 ${a.text}`} />
        </div>
        <h4 className="text-foreground font-body font-semibold text-base mb-2">{title}</h4>
        <p className="text-foreground/60 font-body font-light text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  );
};

export const WhyMatters = ({ points, accent }: { points: string[]; accent: Accent }) => {
  const a = ACCENT[accent];
  return (
    <section className="mt-24 mb-8">
      <div className={`relative rounded-3xl p-8 md:p-10 liquid-glass-strong ring-1 ${a.ring} overflow-hidden`}>
        <div className={`absolute -top-24 -left-24 w-80 h-80 rounded-full bg-gradient-to-br ${a.glow} to-transparent blur-3xl opacity-50`} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className={`w-5 h-5 ${a.text}`} />
            <span className={`font-body text-xs uppercase tracking-widest ${a.text}`}>Why This Matters</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading italic text-foreground mb-5">The big takeaway</h3>
          <ul className="space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-foreground/75 font-body font-light leading-relaxed">
                <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${a.dot}`} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
