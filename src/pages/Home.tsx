import { Link } from "react-router-dom";
import BlurText from "../components/BlurText";
import AnimatedSection from "../components/AnimatedSection";
import NightSkyBackground from "../components/NightSkyBackground";
import VideoBackground from "../components/VideoBackground";
import AnimatedHeading from "../components/AnimatedHeading";
import FadeIn from "../components/FadeIn";
import featureChemistry from "../assets/feature-chemistry.jpg";
import featureBiology from "../assets/feature-biology.jpg";
import featurePhysics from "../assets/feature-physics.jpg";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4";

const pollutants = [
  { label: "PM2.5", desc: "Microscopic particles" },
  { label: "NO₂", desc: "Nitrogen dioxide" },
  { label: "Ozone", desc: "Ground-level pollution" },
  { label: "SO₂", desc: "Sulfur dioxide" },
];

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
  { title: "Health Risk", desc: "Air pollution is the leading environmental cause of disease and premature death worldwide." },
  { title: "Invisible Threat", desc: "You can't see, smell, or taste the most dangerous pollutants—but they're always present." },
  { title: "Global Impact", desc: "No country is immune. Pollution crosses borders, oceans, and continents." },
  { title: "Preventable Problem", desc: "With the right data and action, we can reduce exposure and save millions of lives." },
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
      <section className="relative h-[1000px] flex items-center justify-center overflow-hidden">
        <NightSkyBackground />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <span className="inline-block liquid-glass rounded-full px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase text-foreground/80 mb-8">
              STEM Project 2026
            </span>
          </AnimatedSection>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading italic leading-[1.1] mb-6 text-foreground">
            <BlurText text="The Air You Breathe Is Slowly Killing You" />
          </h1>

          <AnimatedSection delay={0.6}>
            <p className="text-base sm:text-lg font-body font-light text-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Invisible gases. Microscopic particles. Real consequences. Explore how pollution affects your body, your city, and your future.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.8}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/pollution"
                className="liquid-glass-strong rounded-full px-8 py-3 text-sm font-body font-medium text-foreground hover:bg-foreground/10 transition-all"
              >
                Explore Pollution
              </Link>
              <button className="rounded-full px-8 py-3 text-sm font-body font-medium border border-foreground/20 text-foreground/80 hover:text-foreground hover:border-foreground/40 transition-all">
                Watch Explanation
              </button>
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a1a6e] to-transparent z-10 pointer-events-none" />

        {/* Bottom pollutant bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-6 py-8">
          <div className="max-w-5xl mx-auto liquid-glass-strong rounded-2xl px-6 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {pollutants.map((p, i) => (
                <AnimatedSection key={i} delay={1 + i * 0.1}>
                  <div className="text-center">
                    <div className="text-lg font-heading italic text-foreground">{p.label}</div>
                    <div className="text-xs font-body text-foreground/50 uppercase tracking-wider">{p.desc}</div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S HAPPENING */}
      <section className="relative py-40 overflow-hidden">
        <NightSkyBackground />
        <div className="section-fade-top" />
        <div className="section-fade-bottom" />
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
        <NightSkyBackground />
        <div className="section-fade-top" />
        <div className="section-fade-bottom" />
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