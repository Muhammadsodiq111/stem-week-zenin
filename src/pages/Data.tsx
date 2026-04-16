import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import BlurText from "../components/BlurText";
import AnimatedSection from "../components/AnimatedSection";

/* ── AQI Scale ── */
const aqiLevels = [
  { range: "0–50", icon: "🟢", label: "Good", desc: "Air is clean, no risk" },
  { range: "51–100", icon: "🟡", label: "Moderate", desc: "Acceptable, some risk for sensitive people" },
  { range: "101–150", icon: "🟠", label: "Unhealthy for sensitive groups", desc: "Children, elderly, asthma patients at risk" },
  { range: "151–200", icon: "🔴", label: "Unhealthy", desc: "Everyone starts experiencing effects" },
  { range: "201–300", icon: "🟣", label: "Very Unhealthy", desc: "Serious health effects for everyone" },
  { range: "301+", icon: "⚫", label: "Hazardous", desc: "Emergency conditions. Entire population at risk" },
];

/* ── Chart 1: Most Polluted Countries ── */
const pollutedCountries = [
  { name: "Bangladesh", pm25: 79.9 },
  { name: "Pakistan", pm25: 70.9 },
  { name: "India", pm25: 58.1 },
  { name: "Tajikistan", pm25: 57.8 },
  { name: "Burkina Faso", pm25: 52.9 },
  { name: "Iraq", pm25: 49.7 },
  { name: "Nepal", pm25: 46.5 },
  { name: "Egypt", pm25: 44.9 },
  { name: "DR Congo", pm25: 40.8 },
  { name: "China", pm25: 32.6 },
];

/* ── Chart 2: Deaths by Region ── */
const deathsByRegion = [
  { name: "East & South Asia", value: 4200000 },
  { name: "Sub-Saharan Africa", value: 1100000 },
  { name: "N. Africa & Middle East", value: 450000 },
  { name: "Europe", value: 400000 },
  { name: "Latin America", value: 350000 },
  { name: "North America", value: 230000 },
  { name: "Oceania", value: 50000 },
];
const regionColors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#06b6d4"];

/* ── Chart 3: Causes of Death ── */
const causesOfDeath = [
  { name: "Stroke", value: 29 },
  { name: "Heart Disease", value: 25 },
  { name: "COPD", value: 18 },
  { name: "Lung Cancer", value: 15 },
  { name: "Pneumonia", value: 13 },
];
const causeColors = ["#ef4444", "#f97316", "#eab308", "#8b5cf6", "#3b82f6"];

/* ── Chart 4: Most Polluted Cities ── */
const pollutedCities = [
  { name: "Lahore", country: "Pakistan", aqi: 286 },
  { name: "Hotan", country: "China", aqi: 275 },
  { name: "Bhiwadi", country: "India", aqi: 272 },
  { name: "Delhi", country: "India", aqi: 261 },
  { name: "Peshawar", country: "Pakistan", aqi: 259 },
  { name: "Dhaka", country: "Bangladesh", aqi: 254 },
  { name: "Noida", country: "India", aqi: 249 },
  { name: "Kabul", country: "Afghanistan", aqi: 235 },
  { name: "Baghdad", country: "Iraq", aqi: 218 },
  { name: "Cairo", country: "Egypt", aqi: 207 },
];

/* ── Chart 5: Life Expectancy ── */
const lifeExpectancy = [
  { label: "Clean air (WHO)", years: 0 },
  { label: "Moderate (~AQI 100)", years: 1.5 },
  { label: "High (~AQI 200)", years: 4 },
  { label: "Hazardous (AQI 300+)", years: 6.5 },
];

/* ── Chart 6: Death Tally ── */
const deathTally = [
  { period: "Per year", deaths: "7,000,000" },
  { period: "Per month", deaths: "583,000" },
  { period: "Per week", deaths: "134,600" },
  { period: "Per day", deaths: "19,178" },
  { period: "Per hour", deaths: "799" },
  { period: "Per minute", deaths: "13" },
];

/* ── Skills ── */
const mathSkills = [
  "Reading and interpreting charts — bar, pie, tally",
  "Percentages and proportions — breaking down causes of death",
  "Unit conversion — yearly to per-minute death rates",
  "Comparing data sets — clean vs polluted cities",
  "Understanding scientific measurement — AQI scale, μg/m³ units",
];

/* ── Shared tooltip ── */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="liquid-glass rounded-lg px-4 py-2 text-sm font-body">
      <p className="text-foreground font-medium">{label}</p>
      <p className="text-foreground/60">{payload[0].name}: {payload[0].value.toLocaleString()}</p>
    </div>
  );
};

/* ── Live Counter ── */
const LiveCounter = () => {
  const deathsPerSecond = 7000000 / 365.25 / 24 / 3600;
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      setCount(Math.floor(elapsed * deathsPerSecond));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="tabular-nums text-foreground font-heading italic text-5xl md:text-7xl">
      {count}
    </span>
  );
};

/* ──────────────── PAGE ──────────────── */
const Data = () => (
  <div className="pt-32 pb-20 px-6">
    <div className="max-w-5xl mx-auto">

      {/* ── Hero ── */}
      <AnimatedSection>
        <span className="liquid-glass rounded-full px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase text-foreground/60 inline-block mb-6">
          Mathematics
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading italic mb-6 text-foreground">
          <BlurText text="The Numbers Behind Pollution" />
        </h1>
        <p className="text-foreground/60 font-body font-light text-lg max-w-2xl leading-relaxed mb-4">
          Pollution isn't just a feeling or a hazy sky. It's measurable, trackable, and the numbers are alarming.
        </p>
        <p className="text-foreground/40 font-body font-light text-base max-w-2xl leading-relaxed mb-20">
          This page is heavy on charts, light on text. Every stat should feel like a punch, not a lecture.
        </p>
      </AnimatedSection>

      {/* ── AQI Scale ── */}
      <AnimatedSection className="mb-20">
        <h2 className="text-3xl sm:text-4xl font-heading italic text-foreground mb-3">Understanding AQI</h2>
        <p className="text-foreground/50 font-body font-light text-lg max-w-3xl leading-relaxed mb-10">
          AQI is a scale governments use to measure how dangerous the air is on any given day. Think of it like a thermometer — but for pollution.
        </p>
        <div className="space-y-3">
          {aqiLevels.map((l, i) => (
            <AnimatedSection key={i} delay={i * 0.06}>
              <div className="liquid-glass rounded-xl p-5 flex items-start gap-4">
                <span className="text-2xl mt-0.5">{l.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-foreground font-heading italic text-lg">{l.range}</span>
                    <span className="text-foreground/50 font-body text-sm">— {l.label}</span>
                  </div>
                  <p className="text-foreground/40 font-body font-light text-sm">{l.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <div className="liquid-glass-strong rounded-xl p-6 mt-6">
          <p className="text-foreground/60 font-body font-light text-base leading-relaxed">
            💡 <em>For context — on a bad pollution day, cities like Lahore, Delhi, and Dhaka regularly hit AQI levels above 300. That's the hazardous emergency zone.</em>
          </p>
        </div>
      </AnimatedSection>

      {/* ── Chart 1: Countries ── */}
      <AnimatedSection className="mb-20">
        <h2 className="text-3xl sm:text-4xl font-heading italic text-foreground mb-2">Most Polluted Countries</h2>
        <p className="text-foreground/40 font-body font-light text-sm mb-1">Average Annual PM2.5 (μg/m³) — WHO safe limit: 5 μg/m³</p>
        <p className="text-foreground/50 font-body font-light text-base mb-8">Horizontal bar chart</p>
        <div className="liquid-glass rounded-2xl p-6 md:p-10">
          <ResponsiveContainer width="100%" height={420}>
            <BarChart data={pollutedCountries} layout="vertical" margin={{ left: 20, right: 20 }}>
              <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "Barlow" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 13, fontFamily: "Barlow" }} axisLine={false} tickLine={false} width={100} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Bar dataKey="pm25" name="PM2.5" radius={[0, 6, 6, 0]} fill="#ef4444" fillOpacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
          {/* WHO line note */}
          <p className="text-center text-foreground/30 font-body text-xs mt-2">WHO safe limit (5 μg/m³) would be barely visible on this chart.</p>
        </div>
        <div className="liquid-glass-strong rounded-xl p-6 mt-6">
          <p className="text-foreground/60 font-body font-light text-base">
            🔴 <em>Every single country on this list exceeds the WHO safe limit by at least 6×. Bangladesh exceeds it by nearly 16×.</em>
          </p>
        </div>
      </AnimatedSection>

      {/* ── Chart 2: Deaths by Region ── */}
      <AnimatedSection className="mb-20">
        <h2 className="text-3xl sm:text-4xl font-heading italic text-foreground mb-2">Deaths by Region</h2>
        <p className="text-foreground/40 font-body font-light text-sm mb-8">Annual deaths from air pollution — ~7 million total</p>
        <div className="liquid-glass rounded-2xl p-6 md:p-10">
          <ResponsiveContainer width="100%" height={380}>
            <PieChart>
              <Pie data={deathsByRegion} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={140} paddingAngle={2} stroke="none">
                {deathsByRegion.map((_, i) => (
                  <Cell key={i} fill={regionColors[i]} fillOpacity={0.75} />
                ))}
              </Pie>
              <Tooltip formatter={(val: number) => val.toLocaleString()} contentStyle={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, fontFamily: "Barlow", fontSize: 13 }} itemStyle={{ color: "#fff" }} />
              <Legend wrapperStyle={{ fontFamily: "Barlow", fontSize: 12, color: "rgba(255,255,255,0.5)" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </AnimatedSection>

      {/* ── Chart 3: Causes of Death ── */}
      <AnimatedSection className="mb-20">
        <h2 className="text-3xl sm:text-4xl font-heading italic text-foreground mb-2">Causes of Death</h2>
        <p className="text-foreground/40 font-body font-light text-sm mb-8">Of the 7 million annual deaths from air pollution</p>
        <div className="liquid-glass rounded-2xl p-6 md:p-10">
          <ResponsiveContainer width="100%" height={360}>
            <PieChart>
              <Pie data={causesOfDeath} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={130} stroke="none" label={({ name, value }) => `${name} ${value}%`}>
                {causesOfDeath.map((_, i) => (
                  <Cell key={i} fill={causeColors[i]} fillOpacity={0.75} />
                ))}
              </Pie>
              <Tooltip formatter={(val: number) => `${val}%`} contentStyle={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, fontFamily: "Barlow", fontSize: 13 }} itemStyle={{ color: "#fff" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="liquid-glass-strong rounded-xl p-6 mt-6">
          <p className="text-foreground/60 font-body font-light text-base">
            💡 <em>Most deaths aren't even lung diseases directly. Pollution damages the whole body, and the heart and brain pay the biggest price.</em>
          </p>
        </div>
      </AnimatedSection>

      {/* ── Chart 4: Most Polluted Cities ── */}
      <AnimatedSection className="mb-20">
        <h2 className="text-3xl sm:text-4xl font-heading italic text-foreground mb-2">Most Polluted Cities</h2>
        <p className="text-foreground/40 font-body font-light text-sm mb-8">Average AQI levels (2023 data)</p>
        <div className="liquid-glass rounded-2xl p-6 md:p-10">
          <ResponsiveContainer width="100%" height={420}>
            <BarChart data={pollutedCities} margin={{ bottom: 60 }}>
              <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily: "Barlow" }} axisLine={false} tickLine={false} angle={-40} textAnchor="end" />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "Barlow" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Bar dataKey="aqi" name="AQI" radius={[6, 6, 0, 0]} fill="#8b5cf6" fillOpacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </AnimatedSection>

      {/* ── Chart 5: Life Expectancy Impact ── */}
      <AnimatedSection className="mb-20">
        <h2 className="text-3xl sm:text-4xl font-heading italic text-foreground mb-2">Life Expectancy Impact</h2>
        <p className="text-foreground/40 font-body font-light text-sm mb-8">Years lost from average life expectancy</p>
        <div className="liquid-glass rounded-2xl p-8 md:p-12">
          <div className="space-y-6">
            {lifeExpectancy.map((item, i) => (
              <div key={i} className="flex items-center gap-6">
                <span className="text-foreground/60 font-body text-sm w-44 shrink-0">{item.label}</span>
                <div className="flex-1 h-8 rounded-full overflow-hidden bg-foreground/5">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: item.years === 0 ? "#22c55e" : item.years <= 2 ? "#eab308" : item.years <= 5 ? "#f97316" : "#ef4444" }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(item.years / 8) * 100}%` }}
                    transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>
                <span className="text-foreground font-heading italic text-xl w-24 text-right">
                  {item.years === 0 ? "0" : `−${item.years}`} yrs
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="liquid-glass-strong rounded-xl p-6 mt-6">
          <p className="text-foreground/60 font-body font-light text-base">
            ⏳ <em>People living in the world's most polluted cities are losing up to 8 years of their life — just from the air around them.</em>
          </p>
        </div>
      </AnimatedSection>

      {/* ── Chart 6: Death Tally + Live Counter ── */}
      <AnimatedSection className="mb-20">
        <h2 className="text-3xl sm:text-4xl font-heading italic text-foreground mb-2">How Deaths Add Up</h2>
        <p className="text-foreground/40 font-body font-light text-sm mb-8">Breaking down 7 million deaths per year</p>

        <div className="liquid-glass-strong rounded-2xl p-10 md:p-14 text-center mb-8">
          <p className="text-foreground/40 font-body text-sm uppercase tracking-widest mb-3">Since you opened this page</p>
          <LiveCounter />
          <p className="text-foreground/40 font-body font-light text-base mt-3">people have died from air pollution</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {deathTally.map((t, i) => (
            <AnimatedSection key={i} delay={i * 0.06}>
              <div className="liquid-glass rounded-xl p-6 text-center">
                <div className="text-foreground font-heading italic text-2xl md:text-3xl mb-1">{t.deaths}</div>
                <div className="text-foreground/40 font-body text-sm">{t.period}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="liquid-glass-strong rounded-xl p-6 mt-6">
          <p className="text-foreground/60 font-body font-light text-base">
            ⚫ <em>Every minute, 13 people die from breathing polluted air. In the time it takes to read this page, over 50 people will have died.</em>
          </p>
        </div>
      </AnimatedSection>

      {/* ── Math Skills ── */}
      <AnimatedSection className="mb-24">
        <h2 className="text-3xl sm:text-4xl font-heading italic text-foreground mb-4">Mathematical Skills Demonstrated</h2>
        <p className="text-foreground/50 font-body font-light text-base mb-8">What students learn from this page:</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {mathSkills.map((s, i) => (
            <AnimatedSection key={i} delay={i * 0.06}>
              <div className="liquid-glass rounded-xl p-6 h-full">
                <div className="text-foreground/20 font-heading italic text-3xl mb-3">{String(i + 1).padStart(2, "0")}</div>
                <p className="text-foreground/60 font-body font-light text-sm leading-relaxed">{s}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>

      {/* ── Closing Hook ── */}
      <AnimatedSection>
        <div className="liquid-glass-strong rounded-2xl p-12 md:p-16 text-center">
          <span className="text-foreground/30 font-body text-sm tracking-widest uppercase block mb-6">The Takeaway</span>
          <p className="text-foreground font-heading italic text-2xl md:text-3xl lg:text-4xl leading-snug max-w-4xl mx-auto">
            "Every number on this page represents a real person. Math doesn't create these statistics — it reveals them. And once you've seen them, you can't unsee them."
          </p>
        </div>
      </AnimatedSection>
    </div>
  </div>
);

export default Data;
