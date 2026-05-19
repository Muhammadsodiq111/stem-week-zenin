import {
  Wind, HeartPulse, Activity, Leaf, AlertTriangle, Cigarette, Factory, Car,
  Microscope, Droplets, ShieldAlert, Flame,
} from "lucide-react";
import { IGCSEHeader, IGCSESection, KeywordChips, Equation, FactCard, WhyMatters, ACCENT } from "../components/IGCSEPage";
import AnimatedSection from "../components/AnimatedSection";

const ACC = "emerald" as const;

/* ─── Lung diagram SVG with labelled parts ─── */
const LungDiagram = () => (
  <div className="liquid-glass rounded-3xl p-6 md:p-8 ring-1 ring-emerald-400/20">
    <svg viewBox="0 0 420 360" className="w-full h-auto">
      <defs>
        <radialGradient id="lungL" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#fb7185" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#fb7185" stopOpacity="0.1" />
        </radialGradient>
      </defs>
      {/* Trachea */}
      <rect x="200" y="30" width="20" height="80" rx="6" fill="rgba(125,211,252,0.2)" stroke="#7dd3fc" strokeWidth="1.5" />
      {/* Bronchi */}
      <path d="M210 110 Q170 140 130 175 L120 220" stroke="#7dd3fc" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M210 110 Q250 140 290 175 L300 220" stroke="#7dd3fc" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* Bronchioles */}
      {[[110,235],[100,250],[90,260],[140,245],[150,260],[290,235],[300,250],[310,260],[270,245],[260,260]].map(([x,y],i)=>(
        <line key={i} x1={i<5?120:300} y1={220} x2={x} y2={y} stroke="#7dd3fc" strokeWidth="2" opacity="0.5" />
      ))}
      {/* Lung lobes */}
      <ellipse cx="120" cy="240" rx="70" ry="65" fill="url(#lungL)" stroke="#fda4af" strokeWidth="1.5" />
      <ellipse cx="300" cy="240" rx="70" ry="65" fill="url(#lungL)" stroke="#fda4af" strokeWidth="1.5" />
      {/* Alveoli clusters */}
      {[[95,235],[120,220],[145,235],[120,255],[100,270],[140,265],[275,235],[300,220],[325,235],[300,255],[280,270],[320,265]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="6" fill="rgba(110,231,183,0.35)" stroke="#34d399" strokeWidth="1" />
      ))}
      {/* Diaphragm */}
      <path d="M50 310 Q210 280 370 310" stroke="#a78bfa" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Labels */}
      <g fontFamily="ui-sans-serif" fontSize="11" fill="rgba(255,255,255,0.7)">
        <text x="210" y="22" textAnchor="middle" fill="#7dd3fc">Trachea</text>
        <line x1="245" y1="140" x2="280" y2="135" stroke="rgba(255,255,255,0.3)" />
        <text x="285" y="138">Bronchus</text>
        <line x1="155" y1="255" x2="40" y2="250" stroke="rgba(255,255,255,0.3)" />
        <text x="6" y="248">Bronchioles</text>
        <line x1="120" y1="270" x2="60" y2="295" stroke="rgba(255,255,255,0.3)" />
        <text x="20" y="295" fill="#34d399">Alveoli</text>
        <line x1="300" y1="270" x2="380" y2="295" stroke="rgba(255,255,255,0.3)" />
        <text x="340" y="295" fill="#34d399">Alveoli</text>
        <text x="210" y="340" textAnchor="middle" fill="#a78bfa">Diaphragm</text>
      </g>
    </svg>
  </div>
);

const IGCSEBiology = () => (
  <div className="pt-32 pb-20 px-6">
    <div className="max-w-6xl mx-auto">
      <IGCSEHeader
        Icon={Wind}
        subject="IGCSE Biology"
        title="Lungs Under Attack"
        intro="How polluted air moves through the respiratory system, disrupts gas exchange, and damages living organisms — from your alveoli to entire ecosystems."
        accent={ACC}
      />

      {/* 1. Respiratory System */}
      <IGCSESection index="01" title="The Human Respiratory System" kicker="Trace one breath from your nose down to your alveoli." accent={ACC}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
          <LungDiagram />
          <div className="space-y-3">
            {[
              { Icon: Wind, title: "Trachea (windpipe)", body: "Lined with cilia and mucus to trap dust before air reaches the lungs." },
              { Icon: Activity, title: "Bronchi → Bronchioles", body: "Branching airways that split air evenly into both lungs, narrowing into millions of tiny tubes." },
              { Icon: Droplets, title: "Alveoli", body: "Tiny air sacs with thin walls — the actual site of gas exchange with the blood." },
              { Icon: HeartPulse, title: "Diaphragm", body: "A sheet of muscle below the lungs. Contracts to pull air in, relaxes to push air out." },
            ].map((p) => (
              <FactCard key={p.title} Icon={p.Icon} title={p.title} body={p.body} accent={ACC} />
            ))}
          </div>
        </div>
        <KeywordChips items={["cilia","mucus","trachea","bronchi","bronchioles","alveoli","diaphragm","intercostal muscles"]} accent={ACC} />
      </IGCSESection>

      {/* 2. Gas Exchange */}
      <IGCSESection index="02" title="Gas Exchange in Alveoli" kicker="The four IGCSE features that make alveoli efficient." accent={ACC}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FactCard Icon={Microscope} title="Large surface area" body="Hundreds of millions of alveoli pack the surface area of a tennis court into your chest." accent={ACC} />
          <FactCard Icon={Droplets} title="Thin walls (1 cell)" body="A single cell thick — oxygen has the shortest possible distance to diffuse into blood." accent={ACC} />
          <FactCard Icon={Activity} title="Rich blood supply" body="A dense network of capillaries keeps the concentration gradient steep." accent={ACC} />
          <FactCard Icon={Wind} title="Moist surface" body="Gases dissolve in the thin liquid layer before diffusing across the membrane." accent={ACC} />
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <Equation accent={ACC} label="Inward diffusion" eq="O₂ (alveoli) → O₂ (blood)" note="High → low concentration. Blood carries O₂ to every cell." />
          <Equation accent={ACC} label="Outward diffusion" eq="CO₂ (blood) → CO₂ (alveoli)" note="Waste CO₂ from respiration is breathed out." />
        </div>
        <KeywordChips items={["diffusion","concentration gradient","partial pressure","capillary","haemoglobin","oxyhaemoglobin"]} accent={ACC} />
      </IGCSESection>

      {/* 3. Effects on health */}
      <IGCSESection index="03" title="Effects of Polluted Air on Health" kicker="What happens when smoke, soot and toxic gases hit the alveoli." accent={ACC}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FactCard Icon={ShieldAlert} title="Cilia paralysis" body="SO₂ and tar in smoke paralyse the cilia. Mucus and particles build up — leading to a 'smoker's cough'." accent={ACC} />
          <FactCard Icon={AlertTriangle} title="Carbon monoxide" body="CO binds to haemoglobin 200× more strongly than oxygen, starving organs of O₂." accent={ACC} />
          <FactCard Icon={Flame} title="Bronchitis & asthma" body="Inflamed airways narrow, mucus thickens, breathing becomes wheezy and difficult." accent={ACC} />
          <FactCard Icon={Wind} title="Emphysema" body="Alveoli walls are destroyed and merge into large sacs — surface area collapses, gas exchange fails." accent={ACC} />
        </div>
        <KeywordChips items={["tar","carbon monoxide","haemoglobin","emphysema","bronchitis","asthma","PM2.5","cilia"]} accent={ACC} />
      </IGCSESection>

      {/* 4. Smoking vs Pollution */}
      <IGCSESection index="04" title="Smoking vs Air Pollution" kicker="Different sources, frighteningly similar damage." accent={ACC}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FactCard Icon={Cigarette} title="Cigarette smoke" body="Tar, nicotine, CO, formaldehyde, benzene. Direct hit to the alveoli, 20+ carcinogens." accent={ACC} />
          <FactCard Icon={Factory} title="Factory emissions" body="SO₂, NOₓ, particulates from burning coal/oil. Affects entire neighbourhoods downwind." accent={ACC} />
          <FactCard Icon={Car} title="Vehicle exhaust" body="CO, NO₂, PM2.5 and unburnt hydrocarbons — concentrated at street level where people walk." accent={ACC} />
        </div>
        <div className={`mt-6 rounded-2xl p-5 liquid-glass ring-1 ${ACCENT[ACC].ring}`}>
          <p className="text-foreground/70 font-body font-light text-sm leading-relaxed">
            <span className={`font-semibold ${ACCENT[ACC].text}`}>Key idea:</span> living in a heavily polluted city
            can expose your lungs to a similar dose of particulates as smoking several cigarettes a day — without ever lighting one.
          </p>
        </div>
      </IGCSESection>

      {/* 5. Plants & ecosystems */}
      <IGCSESection index="05" title="Effects on Plants & Ecosystems" kicker="Pollution doesn't stop at humans." accent={ACC}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FactCard Icon={Leaf} title="Damaged leaves" body="Acid rain strips the waxy cuticle, leaching nutrients (Mg, Ca) — leaves yellow and fall early." accent={ACC} />
          <FactCard Icon={Microscope} title="Reduced photosynthesis" body="Soot coats leaves, blocking light. Less glucose is made, slower growth, lower crop yields." accent={ACC} />
          <FactCard Icon={Droplets} title="Food chains collapse" body="Acidified lakes kill fish eggs; pollinators die from PM exposure — ripple effects up the food chain." accent={ACC} />
        </div>
      </IGCSESection>

      <WhyMatters
        accent={ACC}
        points={[
          "Every breath in polluted air delivers tar, CO and PM2.5 directly to the same alveoli responsible for keeping you alive.",
          "Damage from pollution mirrors smoking: cilia paralysis, mucus build-up, emphysema, lung cancer.",
          "It's not just human lungs — acid rain and soot dismantle the photosynthesis that feeds every ecosystem.",
        ]}
      />
    </div>
  </div>
);

export default IGCSEBiology;
