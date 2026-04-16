import { Link } from "react-router-dom";
import { useState } from "react";
import BlurText from "../components/BlurText";
import AnimatedSection from "../components/AnimatedSection";
import NightSkyBackground from "../components/NightSkyBackground";
import { Lightbulb, Globe, GraduationCap, Heart, Factory, Zap, Car, Monitor, TreePine, Footprints, Plug, Megaphone, School, Smartphone } from "lucide-react";

/* ─── DATA ─── */

const orgs = [
  {
    icon: Globe,
    name: "WHO",
    full: "World Health Organization",
    color: "text-blue-400",
    points: [
      "Set legally binding air quality standards based on WHO guidelines",
      "Phase out coal-fired power plants by 2030",
      "Transition public transport to electric or hydrogen-powered vehicles",
      "Mandate clean cooking fuels for households — indoor pollution from wood/coal stoves kills millions",
      "Invest in early warning systems for high pollution days",
    ],
    quote: "WHO estimates that if every country met their air quality guidelines, global air pollution deaths could be cut by 80%.",
  },
  {
    icon: GraduationCap,
    name: "UNESCO",
    full: "United Nations Educational, Scientific and Cultural Organization",
    color: "text-emerald-400",
    points: [
      "Integrate air quality and climate literacy into school curriculums worldwide",
      "Fund scientific research in developing countries lacking monitoring infrastructure",
      "Support community-led environmental awareness programs",
      "Promote open access to pollution data so citizens can hold governments accountable",
    ],
    quote: "UNESCO believes that an educated generation is the most powerful tool against environmental destruction — which is exactly what your project represents.",
  },
  {
    icon: Heart,
    name: "UNICEF",
    full: "United Nations Children's Fund",
    color: "text-pink-400",
    points: [
      "600 million children worldwide live in areas with extremely high air pollution",
      "Calls for child-sensitive air quality laws — stricter standards near schools and hospitals",
      "Campaigns for clean cooking solutions in South Asia and Sub-Saharan Africa",
      "Advocates for pollution monitoring stations placed near schools",
    ],
    quote: "UNICEF reports that air pollution is now the second biggest risk factor for children's health globally, after malnutrition.",
  },
];

const countries = [
  {
    flag: "🇯🇵",
    name: "Japan",
    subtitle: "The Long Game",
    icon: Factory,
    points: [
      "In the 1960s Japan had some of the worst industrial pollution in the world",
      "Responded with the Basic Law for Environmental Pollution Control (1967)",
      "Strict vehicle emission standards, mandatory factory filters, investment in public transport",
      "Today has dramatically cleaner air despite being one of the world's largest economies",
    ],
    lesson: "Strong laws + long term commitment = results",
  },
  {
    flag: "🇨🇳",
    name: "China",
    subtitle: "The Fastest Turnaround in History",
    icon: Zap,
    points: [
      "In 2013 Beijing recorded AQI levels above 500 — schools and roads were shut",
      'Launched the "War on Pollution" — shutting coal plants, restricting cars, investing $360B in renewables',
      "Between 2013 and 2020 PM2.5 levels dropped by approximately 40%",
      "Now the world's largest producer of solar panels and electric vehicles",
    ],
    lesson: "When governments commit fully, change can happen fast",
  },
  {
    flag: "🇩🇪",
    name: "Germany & EU",
    subtitle: "The European Green Deal",
    icon: Globe,
    points: [
      "EU introduced legally binding air quality targets across all 27 member countries",
      "Germany invested heavily in wind and solar, phasing out coal entirely by 2038",
      "Cities like Berlin introduced low emission zones banning polluting vehicles",
      "Europe has seen consistent year-on-year improvement in air quality since 2000",
    ],
    lesson: "Regional cooperation and legal enforcement works",
  },
  {
    flag: "🇰🇷",
    name: "South Korea",
    subtitle: "Fighting Dust With Technology",
    icon: Monitor,
    points: [
      'Suffers from heavy pollution blown from China — called "yellow dust" season',
      "Installed one of the world's most advanced real-time monitoring networks — 600+ stations",
      "Created a public app for hourly AQI checks and alerts",
      "Deployed air purifying towers in heavily polluted public spaces",
    ],
    lesson: "Technology and public awareness together are powerful",
  },
  {
    flag: "🇳🇴",
    name: "Norway",
    subtitle: "The Electric Vehicle Revolution",
    icon: Car,
    points: [
      "Massive government incentives — no purchase tax, free parking, reduced tolls for EVs",
      "Over 80% of new cars sold in 2023 were electric — highest rate in the world",
      "Oslo's air quality has improved dramatically as a direct result",
    ],
    lesson: "Financial incentives change behavior faster than bans",
  },
];

const individualActions = [
  { icon: Footprints, text: "Choose walking, cycling, or public transport when possible — every car left at home reduces emissions" },
  { icon: TreePine, text: "Plant something — trees absorb CO₂ and filter particulates. Even indoor plants help slightly" },
  { icon: Plug, text: "Switch off unnecessarily — saving electricity directly reduces power plant emissions" },
  { icon: Megaphone, text: "Talk about it — awareness is the first step to political pressure. Sharing accurate information matters" },
  { icon: School, text: "Advocate at school — push for no-idling zones. Many schools have successfully banned cars from idling outside" },
  { icon: Smartphone, text: "Check your AQI — on high pollution days, limit outdoor exercise, keep windows closed, wear a mask" },
];

/* ─── COMPONENT ─── */

const Solutions = () => {
  const [pledgeCount, setPledgeCount] = useState(() => {
    const stored = localStorage.getItem("pledge-count");
    return stored ? parseInt(stored, 10) : 4827;
  });
  const [hasPledged, setHasPledged] = useState(() => !!localStorage.getItem("has-pledged"));

  const handlePledge = () => {
    if (hasPledged) return;
    const next = pledgeCount + 1;
    setPledgeCount(next);
    setHasPledged(true);
    localStorage.setItem("pledge-count", String(next));
    localStorage.setItem("has-pledged", "true");
  };

  return (
    <div>
      {/* ── HERO / HOOK ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <NightSkyBackground />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-40">
          <AnimatedSection>
            <span className="inline-block liquid-glass rounded-full px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase text-foreground/80 mb-8">
              <Lightbulb className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />
              Solutions & Global Action
            </span>
          </AnimatedSection>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading italic leading-[1.1] mb-8 text-foreground">
            <BlurText text="It's Not Too Late" />
          </h1>

          <AnimatedSection delay={0.5}>
            <p className="text-base sm:text-lg font-body font-light text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              7 million deaths a year. Cities choking under hazardous AQI. It sounds hopeless — but humans created this problem, and humans are already fighting back. Here's what's actually working.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 2: GLOBAL ORGANIZATIONS ── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-5xl font-heading italic text-center mb-4 text-foreground">
              What The World Recommends
            </h2>
            <p className="text-foreground/50 font-body font-light text-center max-w-xl mx-auto mb-20">
              The largest global organizations have clear, evidence-based recommendations for fighting air pollution.
            </p>
          </AnimatedSection>

          <div className="space-y-16">
            {orgs.map((org, i) => (
              <AnimatedSection key={i} delay={0.1}>
                <div className="liquid-glass rounded-2xl p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <org.icon className={`w-6 h-6 ${org.color}`} />
                    <div>
                      <h3 className="text-2xl font-heading italic text-foreground">{org.name}</h3>
                      <p className="text-xs font-body text-foreground/40">{org.full}</p>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {org.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/30 mt-2 shrink-0" />
                        <span className="text-foreground/70 font-body font-light leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                  <blockquote className="border-l-2 border-foreground/20 pl-5 italic text-foreground/50 font-body text-sm leading-relaxed">
                    {org.quote}
                  </blockquote>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: COUNTRIES ── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <NightSkyBackground />
        <div className="section-fade-top" />
        <div className="section-fade-bottom" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-5xl font-heading italic text-center mb-4 text-foreground">
              Policies That Actually Work
            </h2>
            <p className="text-foreground/50 font-body font-light text-center max-w-xl mx-auto mb-20">
              Real countries. Real results. Proof that action makes a difference.
            </p>
          </AnimatedSection>

          <div className="space-y-8">
            {countries.map((c, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="liquid-glass-strong rounded-2xl p-8 md:p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl">{c.flag}</span>
                    <div>
                      <h3 className="text-2xl font-heading italic text-foreground">{c.name}</h3>
                      <p className="text-xs font-body text-foreground/40 tracking-wider uppercase">{c.subtitle}</p>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {c.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/30 mt-2 shrink-0" />
                        <span className="text-foreground/70 font-body font-light leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 pt-4 border-t border-foreground/10">
                    <c.icon className="w-4 h-4 text-foreground/40" />
                    <span className="text-sm font-body font-medium text-foreground/60 italic">Lesson: {c.lesson}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: INDIVIDUAL ACTIONS ── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-5xl font-heading italic text-center mb-4 text-foreground">
              What You Can Do
            </h2>
            <p className="text-foreground/50 font-body font-light text-center max-w-lg mx-auto mb-16">
              Small actions. Real impact. Every choice matters.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {individualActions.map((a, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="liquid-glass rounded-2xl p-6 h-full flex items-start gap-4">
                  <div className="liquid-glass-strong rounded-xl p-2.5 shrink-0">
                    <a.icon className="w-5 h-5 text-foreground/70" />
                  </div>
                  <p className="text-foreground/70 font-body font-light leading-relaxed text-sm">{a.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: CLOSING + PLEDGE ── */}
      <section className="py-40 px-6">
        <div className="text-center max-w-2xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl sm:text-6xl font-heading italic mb-8 text-foreground leading-tight">
              The air belongs to every living thing on Earth.
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-foreground/60 font-body font-light text-lg mb-4 leading-relaxed">
              The fact that 7 million people die from it every year isn't inevitable — it's a choice. And choices can be changed.
            </p>
            <p className="text-foreground/60 font-body font-light text-lg mb-12 leading-relaxed">
              You just spent time learning about one of the most important issues of our generation. That already makes you part of the solution.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <button
              onClick={handlePledge}
              disabled={hasPledged}
              className={`liquid-glass-strong rounded-full px-10 py-4 text-base font-body font-medium transition-all duration-300 ${
                hasPledged
                  ? "text-foreground/50 cursor-default"
                  : "text-foreground hover:bg-foreground/10 hover:scale-105"
              }`}
            >
              {hasPledged ? "✓ You've pledged" : "I'll do my part"}
            </button>
            <p className="text-foreground/30 font-body text-sm mt-4">
              {pledgeCount.toLocaleString()} people have pledged
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
              <Link
                to="/data"
                className="liquid-glass rounded-full px-8 py-3 text-sm font-body font-medium text-foreground hover:bg-foreground/10 transition-all"
              >
                Explore Data
              </Link>
              <Link
                to="/"
                className="rounded-full px-8 py-3 text-sm font-body font-medium border border-foreground/20 text-foreground/80 hover:text-foreground hover:border-foreground/40 transition-all"
              >
                Back to Home
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
