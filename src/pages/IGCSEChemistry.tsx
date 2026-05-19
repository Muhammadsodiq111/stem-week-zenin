import { FlaskConical, Wind, Factory, Car, CloudRain, Thermometer, Flame, AlertTriangle, Cloud } from "lucide-react";
import { IGCSEHeader, IGCSESection, KeywordChips, Equation, FactCard, WhyMatters, ACCENT } from "../components/IGCSEPage";

const ACC = "amber" as const;

/* ─── Clean Air pie chart ─── */
const AirPie = () => {
  // N2 78, O2 21, Ar 0.93, CO2 0.04, ~ other 0.03 — approximated
  const slices = [
    { label: "Nitrogen (N₂)", pct: 78, color: "#60a5fa" },
    { label: "Oxygen (O₂)", pct: 21, color: "#34d399" },
    { label: "Argon (Ar)", pct: 0.93, color: "#a78bfa" },
    { label: "CO₂ + others", pct: 0.07, color: "#fbbf24" },
  ];
  let acc = 0;
  const R = 90, CX = 110, CY = 110;
  const arcs = slices.map((s) => {
    const start = (acc / 100) * 360;
    acc += s.pct;
    const end = (acc / 100) * 360;
    const a1 = ((start - 90) * Math.PI) / 180;
    const a2 = ((end - 90) * Math.PI) / 180;
    const x1 = CX + R * Math.cos(a1), y1 = CY + R * Math.sin(a1);
    const x2 = CX + R * Math.cos(a2), y2 = CY + R * Math.sin(a2);
    const large = end - start > 180 ? 1 : 0;
    return { d: `M ${CX} ${CY} L ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} Z`, color: s.color };
  });
  return (
    <div className="liquid-glass rounded-3xl p-6 md:p-8 ring-1 ring-amber-400/20">
      <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-6 items-center">
        <svg viewBox="0 0 220 220" className="w-full max-w-[220px] mx-auto">
          {arcs.map((a, i) => (<path key={i} d={a.d} fill={a.color} fillOpacity="0.85" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />))}
          <circle cx={CX} cy={CY} r="40" fill="hsl(220 22% 12%)" />
          <text x={CX} y={CY - 4} textAnchor="middle" fontSize="11" fontFamily="ui-sans-serif" fill="rgba(255,255,255,0.5)">CLEAN AIR</text>
          <text x={CX} y={CY + 14} textAnchor="middle" fontSize="14" fontFamily="ui-sans-serif" fill="#fff" fontStyle="italic">composition</text>
        </svg>
        <ul className="space-y-2">
          {slices.map((s) => (
            <li key={s.label} className="flex items-center justify-between text-sm font-body">
              <span className="flex items-center gap-2 text-foreground/80">
                <span className="w-3 h-3 rounded-sm" style={{ background: s.color }} />
                {s.label}
              </span>
              <span className="text-foreground/60">{s.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const IGCSEChemistry = () => (
  <div className="pt-32 pb-20 px-6">
    <div className="max-w-6xl mx-auto">
      <IGCSEHeader
        Icon={FlaskConical}
        subject="IGCSE Chemistry"
        title="What's In The Air"
        intro="From the clean balance of N₂ and O₂ to the toxic cocktail produced by combustion, acid rain and the enhanced greenhouse effect."
        accent={ACC}
      />

      {/* 1. Composition */}
      <IGCSESection index="01" title="Composition of Clean Air" kicker="The air you'd breathe far from any city or factory." accent={ACC}>
        <AirPie />
        <div className={`mt-6 rounded-2xl p-5 liquid-glass ring-1 ${ACCENT[ACC].ring}`}>
          <p className="text-foreground/70 font-body font-light text-sm leading-relaxed">
            <span className={`font-semibold ${ACCENT[ACC].text}`}>Polluted air</span> still contains N₂ and O₂, but it gains
            measurable amounts of CO, SO₂, NOₓ, ozone (O₃) and tiny solid particulates — enough to harm health even at parts-per-million levels.
          </p>
        </div>
      </IGCSESection>

      {/* 2. Pollutants */}
      <IGCSESection index="02" title="Harmful Pollutants" kicker="The five most-tested IGCSE pollutants and what they do." accent={ACC}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FactCard Icon={AlertTriangle} title="Carbon monoxide (CO)" body="From incomplete combustion in car engines. Toxic — binds to haemoglobin, starving the body of oxygen." accent={ACC} />
          <FactCard Icon={CloudRain} title="Sulfur dioxide (SO₂)" body="From burning sulfur-containing fuels (coal, diesel). Causes acid rain and lung irritation." accent={ACC} />
          <FactCard Icon={Car} title="Nitrogen oxides (NOₓ)" body="Formed inside hot engines (N₂ + O₂). Cause acid rain, smog and asthma attacks." accent={ACC} />
          <FactCard Icon={Cloud} title="Carbon dioxide (CO₂)" body="Product of complete combustion. Not toxic at low levels, but the main greenhouse gas." accent={ACC} />
          <FactCard Icon={Wind} title="Particulates (PM)" body="Microscopic soot/dust. Lodge deep in alveoli, cross into blood. Linked to heart and lung disease." accent={ACC} />
          <FactCard Icon={Flame} title="Unburnt hydrocarbons" body="Escape from inefficient combustion. React in sunlight with NOₓ to make ground-level ozone (smog)." accent={ACC} />
        </div>
      </IGCSESection>

      {/* 3. Combustion */}
      <IGCSESection index="03" title="Combustion" kicker="The chemistry behind every car, stove and power station." accent={ACC}>
        <div className="grid md:grid-cols-2 gap-4">
          <Equation accent={ACC} label="Complete combustion" eq="CH₄ + 2 O₂ → CO₂ + 2 H₂O" note="Enough oxygen → carbon dioxide and water. Maximum energy released." />
          <Equation accent={ACC} label="Incomplete combustion" eq="2 CH₄ + 3 O₂ → 2 CO + 4 H₂O" note="Limited oxygen → toxic carbon monoxide (and sometimes soot, C)." />
          <Equation accent={ACC} label="In a hot engine" eq="N₂ + O₂ → 2 NO" note="Air's own nitrogen reacts with oxygen at high temperatures, forming NOₓ." />
          <Equation accent={ACC} label="Sulfur impurity burning" eq="S + O₂ → SO₂" note="Sulfur in fossil fuels burns to make sulfur dioxide — the start of acid rain." />
        </div>
        <KeywordChips items={["complete combustion","incomplete combustion","hydrocarbon","oxidation","exothermic","soot"]} accent={ACC} />
      </IGCSESection>

      {/* 4. Acid Rain */}
      <IGCSESection index="04" title="Acid Rain" kicker="When pollutant gases dissolve into clouds." accent={ACC}>
        <div className="grid md:grid-cols-2 gap-4">
          <Equation accent={ACC} label="Sulfurous → sulfuric acid" eq="SO₂ + H₂O → H₂SO₃ ;  2 SO₂ + O₂ → 2 SO₃ ;  SO₃ + H₂O → H₂SO₄" />
          <Equation accent={ACC} label="Nitric acid formation" eq="4 NO₂ + O₂ + 2 H₂O → 4 HNO₃" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <FactCard Icon={Factory} title="Source" body="Coal-fired power stations, smelters and diesel vehicles release SO₂ and NOₓ high into the atmosphere." accent={ACC} />
          <FactCard Icon={CloudRain} title="Reaction in clouds" body="Pollutant gases dissolve in water droplets and oxidise, forming sulfuric and nitric acids — pH ~4." accent={ACC} />
          <FactCard Icon={AlertTriangle} title="Damage" body="Acidified lakes kill fish; soil leaches aluminium; limestone buildings and statues erode." accent={ACC} />
        </div>
      </IGCSESection>

      {/* 5. Greenhouse */}
      <IGCSESection index="05" title="Greenhouse Effect & Global Warming" kicker="A natural process turned dangerous." accent={ACC}>
        <div className="grid md:grid-cols-2 gap-4">
          <FactCard Icon={Thermometer} title="The natural greenhouse effect" body="CO₂, CH₄ and H₂O vapour absorb infrared radiation re-emitted from Earth's surface — keeping the planet warm enough for life." accent={ACC} />
          <FactCard Icon={Flame} title="The enhanced effect" body="Burning fossil fuels has raised CO₂ from 280 → 420+ ppm. More heat is trapped, raising global temperatures and disrupting climate." accent={ACC} />
        </div>
        <KeywordChips items={["infrared radiation","greenhouse gas","CO₂","CH₄","fossil fuel","climate change"]} accent={ACC} />
      </IGCSESection>

      <WhyMatters
        accent={ACC}
        points={[
          "Polluted air is not random — every harmful gas can be traced to a specific combustion reaction we cause.",
          "Knowing complete vs incomplete combustion lets us design cleaner engines, catalytic converters and scrubbers.",
          "Acid rain and the enhanced greenhouse effect are two chemistry problems with one shared solution: stop adding SO₂, NOₓ and CO₂ to the atmosphere.",
        ]}
      />
    </div>
  </div>
);

export default IGCSEChemistry;
