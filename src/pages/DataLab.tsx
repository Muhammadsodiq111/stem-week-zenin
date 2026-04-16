import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, ReferenceLine, Cell
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
  { value: "31.4 µg/m³", title: "Tashkent 2024 Annual Average PM2.5", desc: "6.3× above the WHO annual guideline of 5 µg/m³. Ranked top 20 globally.", color: "#ef4444" },
  { value: "166 µg/m³", title: "Tashkent Peak Spike", desc: "Recorded during severe temperature inversion. 33× the WHO limit.", color: "#f97316" },
  { value: "400K tons", title: "Vehicle Emissions per Year", desc: "Traffic is Tashkent's largest single pollution source. ~1.4 million registered vehicles.", color: "#a855f7" },
  { value: "AQI 119", title: "Bukhara — Unhealthy for Sensitive", desc: "High pollution from industrial activity and cross-border dust transport.", color: "#f59e0b" },
];

function pmColor(pm: number) {
  if (pm <= 5) return "#22c55e";
  if (pm <= 15) return "#84cc16";
  if (pm <= 35) return "#f59e0b";
  if (pm <= 75) return "#ef4444";
  return "#7f1d1d";
}

function aqiColor(aqi: number) {
  if (aqi <= 50) return "#22c55e";
  if (aqi <= 100) return "#f59e0b";
  if (aqi <= 150) return "#f97316";
  if (aqi <= 200) return "#ef4444";
  return "#7c3aed";
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="liquid-glass rounded-lg px-4 py-2 text-sm font-body">
      <p className="text-foreground font-medium">{label}</p>
      <p className="text-foreground/60">{payload[0].value} {payload[0].name === "pm" ? "µg/m³" : "AQI"}</p>
    </div>
  );
};

/* ─── PAGE ─── */
const DataLab = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary to-background" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-32">
          <AnimatedSection>
            <span className="inline-block liquid-glass rounded-full px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase text-foreground/80 mb-6">
              📊 Real-World Data
            </span>
          </AnimatedSection>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading italic leading-[1.1] mb-6 text-foreground">
            <BlurText text="Data & Comparison" />
          </h1>
          <AnimatedSection delay={0.4}>
            <p className="text-base sm:text-lg font-body font-light text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Real-world air quality data — Tashkent, Uzbekistan, and global cities compared.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 pb-20 space-y-20">
        {/* Global PM2.5 Chart */}
        <AnimatedSection>
          <h2 className="text-2xl sm:text-4xl font-heading italic text-foreground mb-2">🌍 Global City PM2.5 Comparison</h2>
          <p className="text-foreground/40 font-body text-sm mb-6">Annual average PM2.5 (µg/m³) — WHO guideline: 5 µg/m³</p>

          <div className="liquid-glass rounded-2xl p-6 md:p-8">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={GLOBAL_DATA} layout="vertical" margin={{ left: 10, right: 20 }}>
                <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="city" tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }} axisLine={false} tickLine={false} width={110} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <ReferenceLine x={5} stroke="#ef4444" strokeDasharray="5 3" strokeWidth={1.5} label={{ value: "WHO: 5", fill: "#ef4444", fontSize: 11, position: "top" }} />
                <Bar dataKey="pm" name="pm" radius={[0, 6, 6, 0]} fill="#ef4444" fillOpacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AnimatedSection>

        {/* Global Table */}
        <AnimatedSection>
          <div className="liquid-glass rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#0f172a]">
                  <th className="py-3 px-4 text-foreground/40 font-body text-xs uppercase tracking-wider">#</th>
                  <th className="py-3 px-4 text-foreground/40 font-body text-xs uppercase tracking-wider">City</th>
                  <th className="py-3 px-4 text-foreground/40 font-body text-xs uppercase tracking-wider">PM2.5</th>
                  <th className="py-3 px-4 text-foreground/40 font-body text-xs uppercase tracking-wider">vs WHO</th>
                  <th className="py-3 px-4 text-foreground/40 font-body text-xs uppercase tracking-wider hidden md:table-cell">Status</th>
                </tr>
              </thead>
              <tbody>
                {GLOBAL_DATA.map((d, i) => (
                  <tr key={i} className="border-b border-foreground/5 hover:bg-foreground/5 transition-colors">
                    <td className="py-3 px-4 text-foreground/60 font-body text-sm font-bold">{i + 1}</td>
                    <td className="py-3 px-4 text-foreground font-body text-sm">{d.city}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 rounded-full" style={{ width: `${(d.pm / 90) * 120}px`, background: pmColor(d.pm) }} />
                        <span className="text-foreground font-body text-sm font-bold">{d.pm}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-foreground/60 font-body text-sm">{(d.pm / 5).toFixed(1)}×</td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <span className="text-xs font-body font-bold px-2 py-0.5 rounded-full" style={{ background: pmColor(d.pm) + "30", color: pmColor(d.pm) }}>
                        {d.pm <= 5 ? "Good" : d.pm <= 15 ? "Moderate" : d.pm <= 35 ? "Unhealthy" : d.pm <= 75 ? "Very Unhealthy" : "Hazardous"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        {/* Uzbekistan AQI */}
        <AnimatedSection>
          <h2 className="text-2xl sm:text-4xl font-heading italic text-foreground mb-2">🇺🇿 Uzbekistan Cities — AQI</h2>
          <p className="text-foreground/40 font-body text-sm mb-6">Air Quality Index comparison across major cities</p>

          <div className="liquid-glass rounded-2xl p-6 md:p-8">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={UZBEK_DATA}>
                <XAxis dataKey="city" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="aqi" name="aqi" radius={[6, 6, 0, 0]}>
                  {UZBEK_DATA.map((d, i) => (
                    <Cell key={i} fill={aqiColor(d.aqi)} fillOpacity={0.7} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-center text-foreground/30 font-body text-xs mt-2">
              AQI scale: 0–50 Good · 51–100 Moderate · 101–150 Unhealthy for sensitive · 151+ Unhealthy
            </p>
          </div>
        </AnimatedSection>

        {/* Monthly Tashkent */}
        <AnimatedSection>
          <h2 className="text-2xl sm:text-4xl font-heading italic text-foreground mb-2">📅 Tashkent PM2.5 — Monthly 2024</h2>
          <p className="text-foreground/40 font-body text-sm mb-6">Monthly average PM2.5 levels showing seasonal variation</p>

          <div className="liquid-glass rounded-2xl p-6 md:p-8">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={MONTHLY_DATA}>
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "5 5", stroke: "rgba(255,255,255,0.2)" }} />
                <ReferenceLine y={5} stroke="#ef4444" strokeDasharray="5 3" strokeWidth={1.5} label={{ value: "WHO: 5", fill: "#ef4444", fontSize: 11, position: "right" }} />
                <ReferenceLine y={31.4} stroke="#f59e0b" strokeDasharray="3 3" strokeWidth={1} label={{ value: "Annual avg: 31.4", fill: "#f59e0b", fontSize: 10, position: "right" }} />
                <Line type="monotone" dataKey="pm" name="pm" stroke="#38bdf8" strokeWidth={2.5} dot={{ fill: "#38bdf8", r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-foreground/40 font-body font-light text-sm mt-4">
              Winter peaks driven by heating emissions + temperature inversions. Summer lower due to wind + less heating.
            </p>
          </div>
        </AnimatedSection>

        {/* Key Facts */}
        <AnimatedSection>
          <h2 className="text-2xl sm:text-4xl font-heading italic text-foreground mb-6">📋 Key Data Points</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {KEY_FACTS.map((f, i) => (
              <div key={i} className="liquid-glass rounded-2xl p-6" style={{ borderLeft: `4px solid ${f.color}` }}>
                <div className="text-3xl font-heading italic font-bold mb-1" style={{ color: f.color }}>{f.value}</div>
                <div className="text-foreground font-body font-bold text-sm mb-1">{f.title}</div>
                <div className="text-foreground/40 font-body font-light text-sm">{f.desc}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default DataLab;
