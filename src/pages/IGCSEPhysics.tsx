import { Atom, Wind, Thermometer, Gauge, Layers, Flame, Activity, BarChart3, Factory } from "lucide-react";
import { IGCSEHeader, IGCSESection, KeywordChips, Equation, FactCard, WhyMatters, ACCENT } from "../components/IGCSEPage";
import ParticleSettlingSim from "../components/ParticleSettlingSim";

const ACC = "sky" as const;

/* ─── Thermal inversion diagram ─── */
const InversionDiagram = () => (
  <div className="liquid-glass rounded-3xl p-6 md:p-8 ring-1 ring-sky-400/20">
    <svg viewBox="0 0 420 260" className="w-full h-auto">
      <defs>
        <linearGradient id="warmL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="coldL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="smog" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9ca3af" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#6b7280" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {/* Warm air layer (top) */}
      <rect x="0" y="0" width="420" height="90" fill="url(#warmL)" />
      <text x="12" y="22" fill="#fbbf24" fontSize="11" fontFamily="ui-sans-serif">WARM AIR (lid)</text>
      {/* Inversion boundary */}
      <line x1="0" y1="90" x2="420" y2="90" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="6 4" />
      <text x="408" y="103" fill="#fbbf24" fontSize="10" fontFamily="ui-sans-serif" textAnchor="end">inversion layer</text>
      {/* Cold + trapped smog */}
      <rect x="0" y="90" width="420" height="130" fill="url(#coldL)" />
      <rect x="0" y="150" width="420" height="70" fill="url(#smog)" opacity="0.7" />
      <text x="12" y="142" fill="#60a5fa" fontSize="11" fontFamily="ui-sans-serif">COLD AIR + trapped smog</text>
      {/* City silhouette */}
      <g fill="hsl(220 22% 12%)" stroke="rgba(255,255,255,0.2)">
        <rect x="40" y="190" width="40" height="30" />
        <rect x="90" y="175" width="50" height="45" />
        <rect x="150" y="195" width="35" height="25" />
        <rect x="200" y="170" width="55" height="50" />
        <rect x="270" y="185" width="40" height="35" />
        <rect x="320" y="178" width="60" height="42" />
      </g>
      {/* Ground */}
      <rect x="0" y="220" width="420" height="40" fill="hsl(220 22% 10%)" />
      {/* Smoke trying to rise */}
      {[110,225,295].map((x,i)=>(
        <g key={i} opacity="0.75">
          <circle cx={x} cy="165" r="5" fill="#9ca3af" />
          <circle cx={x-3} cy="150" r="4" fill="#9ca3af" />
          <circle cx={x+2} cy="135" r="3" fill="#9ca3af" />
          <circle cx={x} cy="120" r="2" fill="#9ca3af" />
        </g>
      ))}
    </svg>
  </div>
);

const IGCSEPhysics = () => (
  <div className="pt-32 pb-20 px-6">
    <div className="max-w-6xl mx-auto">
      <IGCSEHeader
        Icon={Atom}
        subject="IGCSE Physics"
        title="How Air Behaves"
        intro="From the particle model to thermal inversion — the physics that explains why pollution spreads, traps and lingers over cities."
        accent={ACC}
      />

      {/* 1. Particle model */}
      <IGCSESection index="01" title="Particle Model of Gases" kicker="Gases are mostly empty space — and constantly moving." accent={ACC}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FactCard Icon={Wind} title="Random motion" body="Gas particles travel in straight lines at high speed in all directions, colliding elastically with each other and the walls." accent={ACC} />
          <FactCard Icon={Thermometer} title="Heating = more energy" body="Higher temperature → particles have more kinetic energy → they move faster and hit harder." accent={ACC} />
          <FactCard Icon={Activity} title="Diffusion" body="Pollutants spread from high to low concentration by random collisions — no stirring needed." accent={ACC} />
        </div>
        <KeywordChips items={["kinetic theory","random motion","elastic collision","diffusion","Brownian motion"]} accent={ACC} />
      </IGCSESection>

      {/* 2. Gas Laws */}
      <IGCSESection index="02" title="Pressure, Volume & Temperature" kicker="The three gas laws — and why they matter for air over a city." accent={ACC}>
        <div className="grid md:grid-cols-3 gap-4">
          <Equation accent={ACC} label="At constant V" eq="P ∝ T" note="Heat a fixed volume of gas: pressure rises. Faster particles hit walls harder." />
          <Equation accent={ACC} label="At constant P" eq="V ∝ T" note="Hot air expands and rises — it's less dense than the cold air around it." />
          <Equation accent={ACC} label="At constant T" eq="P · V = constant" note="Boyle's Law. Squash a gas into half the volume → pressure doubles." />
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <FactCard Icon={Gauge} title="Smoke rising in hot air" body="Hot exhaust gas has a larger V at the same P, so its density drops — buoyancy pushes the plume upward." accent={ACC} />
          <FactCard Icon={Wind} title="Pressure trapping pollution" body="High-pressure weather systems sit still over a city for days. Without wind to mix it, pollution piles up at street level." accent={ACC} />
        </div>
      </IGCSESection>

      {/* 3. Thermal inversion */}
      <IGCSESection index="03" title="Thermal Inversion" kicker="Why some cities choke on their own air." accent={ACC}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
          <InversionDiagram />
          <div className="space-y-3">
            <FactCard Icon={Layers} title="Normal day" body="Air gets colder with altitude. Warm air near the ground rises freely, carrying pollutants high into the sky." accent={ACC} />
            <FactCard Icon={Thermometer} title="Inversion event" body="A layer of warm air sits on top of cold air — flipping the usual order. The warm 'lid' stops anything below from rising." accent={ACC} />
            <FactCard Icon={Factory} title="Result: smog" body="Smoke, NOₓ and PM2.5 are trapped right where people breathe. AQI spikes for days until weather changes." accent={ACC} />
          </div>
        </div>
        <KeywordChips items={["convection","buoyancy","atmospheric layer","temperature gradient","smog","stable atmosphere"]} accent={ACC} />
      </IGCSESection>

      {/* 4. Particle settling */}
      <IGCSESection index="04" title="Why Small Particles Stay Airborne" kicker="Stokes' Law — the smaller the particle, the slower it falls." accent={ACC}>
        <ParticleSettlingSim />
        <div className={`mt-6 rounded-2xl p-5 liquid-glass ring-1 ${ACCENT[ACC].ring}`}>
          <p className="text-foreground/70 font-body font-light text-sm leading-relaxed">
            Settling speed scales with <em>radius²</em>. PM2.5 falls so slowly that it can stay in the air for days —
            travelling hundreds of kilometres before reaching the ground.
          </p>
        </div>
      </IGCSESection>

      {/* 5. Energy & AQI */}
      <IGCSESection index="05" title="Energy & Air-Quality Measurement" kicker="Where the energy — and the pollution — comes from, and how we track it." accent={ACC}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FactCard Icon={Flame} title="Burning fossil fuels" body="Coal, oil and gas release chemical energy as heat — but also CO₂, SO₂, NOₓ and particulates." accent={ACC} />
          <FactCard Icon={Factory} title="Power stations" body="Steam turbines turn heat into electricity at ~35–45% efficiency. The rest is wasted as heat — and gas emissions." accent={ACC} />
          <FactCard Icon={Gauge} title="Air-quality sensors" body="Optical particle counters and electrochemical cells measure PM2.5, PM10, NO₂, O₃ and CO in real time." accent={ACC} />
          <FactCard Icon={BarChart3} title="The AQI" body="A 0–500 index combining several pollutants. >150 is 'unhealthy', >300 is 'hazardous' — and many cities cross that line." accent={ACC} />
        </div>
      </IGCSESection>

      <WhyMatters
        accent={ACC}
        points={[
          "Physics decides whether pollution disperses into the sky or sits on top of your city.",
          "Tiny particles (PM2.5) defy gravity for days — Stokes' Law is the reason they reach your lungs.",
          "Measuring air quality with the AQI turns invisible physics into a number you can act on.",
        ]}
      />
    </div>
  </div>
);

export default IGCSEPhysics;
