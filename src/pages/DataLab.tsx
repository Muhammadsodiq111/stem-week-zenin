import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, ReferenceLine, Cell, Area, AreaChart
} from "recharts";
import AnimatedSection from "../components/AnimatedSection";
import BlurText from "../components/BlurText";

/* ─── Data ─── */
const GLOBAL_DATA = [
  { city: "🇵🇰 Lahore", pm: 87.4 },
  { city: "🇮🇳 Delhi", pm: 83.2 },
  { city: "🇮🇶 Baghdad", pm: 69.3 },
  { city: "🇺🇿 Tashkent", pm: 31.4 },
  { city: "🇨🇳 Beijing", pm: 27.8 },
  { city: "🇪🇬 Cairo", pm: 25.3 },
  { city: "🇹🇷 Istanbul", pm: 18.1 },
  { city: "🇷🇺 Moscow", pm: 11.2 },
  { city: "🇬🇧 London", pm: 7.8 },
  { city: "🇩🇪 Berlin", pm: 6.1 },
];

const UZBEK_DATA = [
  { city: "Tashkent", aqi: 119 },
  { city: "Bukhara", aqi: 119 },
  { city: "Fergana", aqi: 94 },
  { city: "Namangan", aqi: 87 },
  { city: "Andijan", aqi: 82 },
  { city: "Samarkand", aqi: 63 },
  { city: "Nukus", aqi: 57 },
];

const MONTHLY_DATA = [
  { month: "Jan", pm: 52.1 }, { month: "Feb", pm: 48.3 }, { month: "Mar", pm: 39.7 },
  { month: "Apr", pm: 25.4 }, { month: "May", pm: 18.2 }, { month: "Jun", pm: 14.8 },
  { month: "Jul", pm: 13.5 }, { month: "Aug", pm: 15.9 }, { month: "Sep", pm: 21.3 },
  { month: "Oct", pm: 30.7 }, { month: "Nov", pm: 43.1 }, { month: "Dec", pm: 55.8 },
];

const KEY_FACTS = [
  { value: "31.4", unit: "µg/m³", title: "Tashkent Annual Average", desc: "6.3× above the WHO annual guideline of 5 µg/m³. Ranked top 20 globally.", accent: "rose" },
  { value: "166", unit: "µg/m³", title: "Peak PM2.5 Spike", desc: "Recorded during severe winter temperature inversion — 33× the WHO limit.", accent: "amber" },
  { value: "400K", unit: "tons/yr", title: "Vehicle Emissions", desc: "Traffic is Tashkent's largest single pollution source. ~1.4M registered vehicles.", accent: "violet" },
  { value: "AQI 119", unit: "", title: "Bukhara Air Quality", desc: "Unhealthy for sensitive groups. Industrial activity + cross-border dust transport.", accent: "amber" },
];

const ACCENT_TEXT: Record<string, string> = {
  rose: "text-rose-400", amber: "text-amber-400", violet: "text-violet-400", emerald: "text-emerald-400",
};
const ACCENT_BORDER: Record<string, string> = {
  rose: "border-rose-400/40", amber: "border-amber-400/40", violet: "border-violet-400/40", emerald: "border-emerald-400/40",
};

function pmColor(pm: number) {
  if (pm <= 5) return "#34d399";
  if (pm <= 15) return "#a3e635";
  if (pm <= 35) return "#fbbf24";
  if (pm <= 75) return "#fb7185";
  return "#dc2626";
}

function aqiColor(aqi: number) {
  if (aqi <= 50) return "#34d399";
  if (aqi <= 100) return "#fbbf24";
  if (aqi <= 150) return "#fb923c";
  if (aqi <= 200) return "#fb7185";
  return "#a78bfa";
}

function pmStatus(pm: number) {
  if (pm <= 5) return "Good";
  if (pm <= 15) return "Moderate";
  if (pm <= 35) return "Unhealthy";
  if (pm <= 75) return "Very Unhealthy";
  return "Hazardous";
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="liquid-glass-strong rounded-xl px-4 py-2.5 text-sm font-body">
      <p className="text-foreground font-medium">{label}</p>
      <p className="text-foreground/70 mt-0.5">{payload[0].value} {payload[0].name === "aqi" ? "AQI" : "µg/m³"}</p>
    </div>
  );
};

/* ─── PAGE ─── */
const DataLab = () => {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <span className="liquid-glass rounded-full px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase text-foreground/60 inline-block mb-6">
            📊 Real-World Data
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading italic mb-6 text-foreground">
            <BlurText text="Data & Comparison" />
          </h1>
          <p className="text-foreground/60 font-body font-light text-lg max-w-2xl leading-relaxed">
            Real-world air quality measurements — Tashkent in context with Uzbekistan and the world.
          </p>
        </AnimatedSection>

        {/* ─── SECTION 1: Global PM2.5 ─── */}
        <section className="mt-32">
          <AnimatedSection>
            <span className="liquid-glass rounded-full px-3 py-1 text-[10px] font-body font-medium tracking-widest uppercase text-foreground/50 inline-block mb-5">
              Section 01
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading italic mb-4 text-foreground">
              Global City Comparison
            </h2>
            <p className="text-foreground/50 font-body font-light text-lg mb-12 max-w-2xl">
              Annual average PM2.5 in µg/m³. The red dashed line marks the WHO safe limit of 5 µg/m³.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="liquid-glass-strong rounded-3xl p-6 md:p-10">
              <ResponsiveContainer width="100%" height={420}>
                <BarChart data={GLOBAL_DATA} layout="vertical" margin={{ left: 10, right: 30, top: 20 }}>
                  <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="city" tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 13 }} axisLine={false} tickLine={false} width={120} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                  <ReferenceLine x={5} stroke="#fb7185" strokeDasharray="5 3" strokeWidth={1.5} label={{ value: "WHO 5", fill: "#fb7185", fontSize: 11, position: "top" }} />
                  <Bar dataKey="pm" name="pm" radius={[0, 6, 6, 0]}>
                    {GLOBAL_DATA.map((d, i) => (
                      <Cell key={i} fill={pmColor(d.pm)} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnimatedSection>

          {/* Ranking table */}
          <AnimatedSection delay={0.2}>
            <div className="liquid-glass rounded-2xl overflow-hidden mt-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-foreground/10">
                    <th className="py-4 px-5 text-foreground/40 font-body text-[10px] uppercase tracking-widest">Rank</th>
                    <th className="py-4 px-5 text-foreground/40 font-body text-[10px] uppercase tracking-widest">City</th>
                    <th className="py-4 px-5 text-foreground/40 font-body text-[10px] uppercase tracking-widest">PM2.5</th>
                    <th className="py-4 px-5 text-foreground/40 font-body text-[10px] uppercase tracking-widest hidden sm:table-cell">vs WHO</th>
                    <th className="py-4 px-5 text-foreground/40 font-body text-[10px] uppercase tracking-widest hidden md:table-cell">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {GLOBAL_DATA.map((d, i) => (
                    <tr key={i} className="border-b border-foreground/5 last:border-0 hover:bg-foreground/5 transition-colors">
                      <td className="py-3.5 px-5 text-foreground/40 font-heading italic text-sm">{i + 1}</td>
                      <td className="py-3.5 px-5 text-foreground font-body text-sm">{d.city}</td>
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="h-1.5 rounded-full" style={{ width: `${(d.pm / 90) * 100}px`, maxWidth: 100, background: pmColor(d.pm) }} />
                          <span className="text-foreground font-body text-sm font-medium tabular-nums">{d.pm}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-5 text-foreground/60 font-body text-sm tabular-nums hidden sm:table-cell">{(d.pm / 5).toFixed(1)}×</td>
                      <td className="py-3.5 px-5 hidden md:table-cell">
                        <span className="text-[10px] font-body font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border" style={{ borderColor: pmColor(d.pm) + "55", color: pmColor(d.pm) }}>
                          {pmStatus(d.pm)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </section>

        {/* ─── SECTION 2: Uzbekistan AQI ─── */}
        <section className="mt-40">
          <AnimatedSection>
            <span className="liquid-glass rounded-full px-3 py-1 text-[10px] font-body font-medium tracking-widest uppercase text-foreground/50 inline-block mb-5">
              Section 02
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading italic mb-4 text-foreground">
              Uzbekistan — City AQI
            </h2>
            <p className="text-foreground/50 font-body font-light text-lg mb-12 max-w-2xl">
              Air Quality Index across major Uzbek cities. Above 100 is unhealthy for sensitive groups.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="liquid-glass-strong rounded-3xl p-6 md:p-10">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={UZBEK_DATA} margin={{ top: 20 }}>
                  <XAxis dataKey="city" tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                  <ReferenceLine y={100} stroke="#fb7185" strokeDasharray="5 3" strokeWidth={1.5} label={{ value: "Unhealthy", fill: "#fb7185", fontSize: 11, position: "right" }} />
                  <Bar dataKey="aqi" name="aqi" radius={[8, 8, 0, 0]}>
                    {UZBEK_DATA.map((d, i) => (
                      <Cell key={i} fill={aqiColor(d.aqi)} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center mt-6 text-[11px] font-body text-foreground/50">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> 0–50 Good</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> 51–100 Moderate</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-400" /> 101–150 Unhealthy (sensitive)</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-400" /> 151+ Unhealthy</span>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* ─── SECTION 3: Monthly Trend ─── */}
        <section className="mt-40">
          <AnimatedSection>
            <span className="liquid-glass rounded-full px-3 py-1 text-[10px] font-body font-medium tracking-widest uppercase text-foreground/50 inline-block mb-5">
              Section 03
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading italic mb-4 text-foreground">
              Tashkent — Monthly Trend
            </h2>
            <p className="text-foreground/50 font-body font-light text-lg mb-12 max-w-2xl">
              Seasonal PM2.5 across 2024. Winter peaks driven by heating emissions and temperature inversions.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="liquid-glass-strong rounded-3xl p-6 md:p-10">
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={MONTHLY_DATA} margin={{ top: 20, right: 30 }}>
                  <defs>
                    <linearGradient id="pmFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "5 5", stroke: "rgba(255,255,255,0.2)" }} />
                  <ReferenceLine y={5} stroke="#fb7185" strokeDasharray="5 3" strokeWidth={1.5} label={{ value: "WHO 5", fill: "#fb7185", fontSize: 11, position: "right" }} />
                  <ReferenceLine y={31.4} stroke="#fbbf24" strokeDasharray="3 3" strokeWidth={1} label={{ value: "Avg 31.4", fill: "#fbbf24", fontSize: 10, position: "right" }} />
                  <Area type="monotone" dataKey="pm" stroke="#38bdf8" strokeWidth={2.5} fill="url(#pmFill)" dot={{ fill: "#38bdf8", r: 3, strokeWidth: 0 }} activeDot={{ r: 6, fill: "#7dd3fc" }} />
                  <Line type="monotone" dataKey="pm" stroke="transparent" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </AnimatedSection>
        </section>

        {/* ─── SECTION 4: Key Facts ─── */}
        <section className="mt-40 mb-10">
          <AnimatedSection>
            <span className="liquid-glass rounded-full px-3 py-1 text-[10px] font-body font-medium tracking-widest uppercase text-foreground/50 inline-block mb-5">
              Section 04
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading italic mb-12 text-foreground">
              Key Data Points
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {KEY_FACTS.map((f, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className={`liquid-glass rounded-3xl p-8 h-full border-l-2 ${ACCENT_BORDER[f.accent]}`}>
                  <div className="flex items-baseline gap-2 mb-3">
                    <div className={`text-4xl sm:text-5xl font-heading italic ${ACCENT_TEXT[f.accent]}`}>{f.value}</div>
                    {f.unit && <div className="text-foreground/40 font-body text-sm">{f.unit}</div>}
                  </div>
                  <div className="text-foreground font-body font-medium text-base mb-2">{f.title}</div>
                  <div className="text-foreground/55 font-body font-light text-sm leading-relaxed">{f.desc}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DataLab;
