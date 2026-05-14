import { Link } from "react-router-dom";
import { HeartPulse, EyeOff, Globe2, Sparkles } from "lucide-react";
import BlurText from "../components/BlurText";
import AnimatedSection from "../components/AnimatedSection";
import VideoBackground from "../components/VideoBackground";
import AnimatedHeading from "../components/AnimatedHeading";
import FadeIn from "../components/FadeIn";
import featureChemistry from "../assets/feature-chemistry.jpg";
import featureBiology from "../assets/feature-biology.jpg";
import featurePhysics from "../assets/feature-physics.jpg";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4";


const features = [
  {
    title: "What's really in the air?",
    text: "Toxic gases and particles react in complex ways—forming dangerous compounds that impact everything you breathe.",
    link: "/pollution",
    label: "Chemistry",
    image: featureChemistry,
  },
  {
    title: "It enters your body silently.",
    text: "Pollutants bypass your natural defenses, triggering inflammation, damaging cells, and increasing disease risk.",
    link: "/health",
    label: "Biology",
    image: featureBiology,
  },
  {
    title: "Tiny particles travel far.",
    text: "Through airflow, turbulence, and Brownian motion, microscopic particles spread faster and further than you think.",
    link: "/physics",
    label: "Physics",
    image: featurePhysics,
  },
];

const gridCards = [
  {
    title: "Health Risk",
    desc: "Air pollution is the leading environmental cause of disease and premature death worldwide.",
    icon: HeartPulse,
    gradient: "from-rose-500/30 via-rose-500/10 to-transparent",
    ring: "ring-rose-400/30",
    iconColor: "text-rose-300",
    iconBg: "bg-rose-500/15",
  },
  {
    title: "Invisible Threat",
    desc: "You can't see, smell, or taste the most dangerous pollutants—but they're always present.",
    icon: EyeOff,
    gradient: "from-amber-500/30 via-amber-500/10 to-transparent",
    ring: "ring-amber-400/30",
    iconColor: "text-amber-300",
    iconBg: "bg-amber-500/15",
  },
  {
    title: "Global Impact",
    desc: "No country is immune. Pollution crosses borders, oceans, and continents.",
    icon: Globe2,
    gradient: "from-sky-500/30 via-sky-500/10 to-transparent",
    ring: "ring-sky-400/30",
    iconColor: "text-sky-300",
    iconBg: "bg-sky-500/15",
  },
  {
    title: "Preventable Problem",
    desc: "With the right data and action, we can reduce exposure and save millions of lives.",
    icon: Sparkles,
    gradient: "from-emerald-500/30 via-emerald-500/10 to-transparent",
    ring: "ring-emerald-400/30",
    iconColor: "text-emerald-300",
    iconBg: "bg-emerald-500/15",
  },
];

const stats = [
  { value: "7M+", label: "Deaths per year" },
  { value: "99%", label: "People breathing polluted air" },
  { value: "PM2.5", label: "Most dangerous particle" },
  { value: "#1", label: "Environmental health risk" },
];

const Home = () => {
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen w-full flex flex-col overflow-hidden">
        <VideoBackground src={HERO_VIDEO} overlay={false} />

        {/* Top spacer for fixed navbar */}
        <div className="relative z-10 pt-24" />

        {/* Hero content pinned to bottom */}
        <div className="relative z-10 flex-1 flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-12 lg:pb-16">
          <div className="lg:grid lg:grid-cols-2 lg:items-end lg:gap-10">
            {/* Left column */}
            <div>
              <FadeIn delay={100} duration={800}>
                <span className="inline-block liquid-glass rounded-full px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase text-foreground/80 mb-6">
                  STEM Project 2026
                </span>
              </FadeIn>

              <AnimatedHeading
                text={"The Air You Breathe\nIs Slowly Killing You"}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading italic font-normal leading-[1.05] mb-4 text-foreground"
                style={{ letterSpacing: "-0.04em" }}
              />

              <FadeIn delay={800} duration={1000}>
                <p className="text-base md:text-lg font-body font-light text-foreground/80 max-w-xl mb-5 leading-relaxed">
                  Invisible gases. Microscopic particles. Real consequences. Explore how
                  pollution affects your body, your city, and your future.
                </p>
              </FadeIn>

              <FadeIn delay={1200} duration={1000}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/pollution"
                    className="bg-white text-black px-8 py-3 rounded-lg font-body font-medium hover:bg-gray-100 transition-colors"
                  >
                    Explore Pollution
                  </Link>
                  <button
                    className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-body font-medium hover:bg-white hover:text-black transition-colors"
                  >
                    Watch Explanation
                  </button>
                </div>
              </FadeIn>
            </div>

            {/* Right column tag */}
            <div className="mt-10 lg:mt-0 flex items-end justify-start lg:justify-end">
              <FadeIn delay={1400} duration={1000}>
                <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                  <p className="text-lg md:text-xl lg:text-2xl font-body font-light text-foreground">
                    Chemistry. Biology. Physics.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S HAPPENING */}
      <section className="relative py-40 overflow-hidden">
        <VideoBackground src={HERO_VIDEO} overlay={false} />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading italic mb-6 text-foreground">
            <BlurText text="You can't see it. But it's everywhere." />
          </h2>
          <AnimatedSection delay={0.3}>
            <p className="text-foreground/60 font-body font-light text-lg mb-10 leading-relaxed">
              Air pollution surrounds us daily—entering our lungs, bloodstream, and cells without warning.
            </p>
            <Link
              to="/solutions"
              className="liquid-glass-strong rounded-full px-8 py-3 text-sm font-body font-medium text-foreground hover:bg-foreground/10 transition-all inline-block"
            >
              See Solutions
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* FEATURES CHESS */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto space-y-32">
          {features.map((f, i) => (
            <AnimatedSection key={i} delay={0.1}>
              <div className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className="flex-1 space-y-4">
                  <span className="liquid-glass rounded-full px-3 py-1 text-xs font-body font-medium tracking-widest uppercase text-foreground/60">
                    {f.label}
                  </span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading italic text-foreground leading-tight">
                    {f.title}
                  </h3>
                  <p className="text-foreground/60 font-body font-light text-lg leading-relaxed max-w-lg">
                    {f.text}
                  </p>
                  <Link
                    to={f.link}
                    className="inline-block text-sm font-body font-medium text-foreground/80 hover:text-foreground border-b border-foreground/30 hover:border-foreground/60 transition-all pb-0.5"
                  >
                    Learn more →
                  </Link>
                </div>
                <div className="flex-1 h-64 md:h-80 liquid-glass rounded-2xl overflow-hidden">
                  <img src={f.image} alt={f.label} loading="lazy" width={800} height={640} className="w-full h-full object-cover" />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-5xl font-heading italic text-center mb-16 text-foreground">
              Why It Matters
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {gridCards.map((c, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="liquid-glass rounded-2xl p-8 h-full">
                  <h4 className="text-xl font-heading italic mb-3 text-foreground">{c.title}</h4>
                  <p className="text-foreground/60 font-body font-light leading-relaxed">{c.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-40 overflow-hidden">
        <VideoBackground src={HERO_VIDEO} overlay={false} />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="liquid-glass-strong rounded-3xl p-10 md:p-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {stats.map((s, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-heading italic text-foreground mb-2">{s.value}</div>
                    <div className="text-sm font-body text-foreground/50 uppercase tracking-wider">{s.label}</div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 px-6">
        <div className="text-center max-w-2xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl sm:text-6xl font-heading italic mb-6 text-foreground">
              Now you know.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-foreground/60 font-body font-light text-lg mb-10">
              What will you do next?
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/data"
                className="liquid-glass-strong rounded-full px-8 py-3 text-sm font-body font-medium text-foreground hover:bg-foreground/10 transition-all"
              >
                Explore Data
              </Link>
              <Link
                to="/health"
                className="rounded-full px-8 py-3 text-sm font-body font-medium border border-foreground/20 text-foreground/80 hover:text-foreground hover:border-foreground/40 transition-all"
              >
                Learn More
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Home;