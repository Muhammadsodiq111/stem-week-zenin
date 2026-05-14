import { Link } from "react-router-dom";
import BlurText from "../components/BlurText";
import AnimatedSection from "../components/AnimatedSection";
import VideoBackground from "../components/VideoBackground";
import { Lightbulb, Globe, GraduationCap, Heart, Factory, Zap, Car, Monitor, TreePine, Footprints, Plug, Megaphone, School, Smartphone } from "lucide-react";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4";

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
  return (
    <div>
      {/* ── HERO / HOOK ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <VideoBackground src={HERO_VIDEO} overlay={false} />
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
        <VideoBackground src={HERO_VIDEO} overlay={false} />
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
                <div className="liquid-glass-dark rounded-2xl p-8 md:p-10">
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

      {/* ── SECTION 4: INDIVIDUAL ACTIONS — colorful ── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <p className="text-center text-xs font-body uppercase tracking-[0.3em] text-foreground/40 mb-3">Your move</p>
            <h2 className="text-3xl sm:text-5xl font-heading italic text-center mb-4 text-foreground">
              What You Can Do
            </h2>
            <p className="text-foreground/50 font-body font-light text-center max-w-lg mx-auto mb-16">
              Small actions. Real impact. Every choice matters.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {individualActions.map((a, i) => {
              const palettes = [
                { grad: "from-emerald-500/30 via-emerald-500/10 to-transparent", ring: "ring-emerald-400/30", iconBg: "bg-emerald-500/20", iconColor: "text-emerald-300" },
                { grad: "from-lime-500/30 via-lime-500/10 to-transparent", ring: "ring-lime-400/30", iconBg: "bg-lime-500/20", iconColor: "text-lime-300" },
                { grad: "from-amber-500/30 via-amber-500/10 to-transparent", ring: "ring-amber-400/30", iconBg: "bg-amber-500/20", iconColor: "text-amber-300" },
                { grad: "from-sky-500/30 via-sky-500/10 to-transparent", ring: "ring-sky-400/30", iconBg: "bg-sky-500/20", iconColor: "text-sky-300" },
                { grad: "from-fuchsia-500/30 via-fuchsia-500/10 to-transparent", ring: "ring-fuchsia-400/30", iconBg: "bg-fuchsia-500/20", iconColor: "text-fuchsia-300" },
                { grad: "from-rose-500/30 via-rose-500/10 to-transparent", ring: "ring-rose-400/30", iconBg: "bg-rose-500/20", iconColor: "text-rose-300" },
              ];
              const p = palettes[i % palettes.length];
              return (
                <AnimatedSection key={i} delay={i * 0.06}>
                  <div className={`group relative overflow-hidden rounded-3xl p-6 h-full liquid-glass ring-1 ${p.ring} transition-all hover:-translate-y-1 hover:shadow-2xl`}>
                    <div className={`absolute -top-20 -right-20 w-56 h-56 rounded-full bg-gradient-to-br ${p.grad} blur-3xl opacity-80 group-hover:opacity-100 transition-opacity`} />
                    <div className="relative flex flex-col gap-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${p.iconBg}`}>
                        <a.icon className={`w-6 h-6 ${p.iconColor}`} />
                      </div>
                      <p className="text-foreground/80 font-body font-light leading-relaxed text-sm">{a.text}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-20">
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
