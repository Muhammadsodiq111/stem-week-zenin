import { useRef, useEffect, useState, useCallback } from "react";
import AnimatedSection from "../components/AnimatedSection";
import BlurText from "../components/BlurText";


/* ─── Particle Dispersion Simulation ─── */
const ParticleDispersion = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wind, setWind] = useState(3);
  const [temp, setTemp] = useState(20);
  const [emitRate, setEmitRate] = useState(8);
  const [inversion, setInversion] = useState(false);
  const particlesRef = useRef<any[]>([]);
  const frameRef = useRef(0);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const particles = particlesRef.current;

    class Particle {
      x: number; y: number; size: number; opacity: number;
      r: number; g: number; b: number; vx = 0; vy = 0; life = 1;
      constructor() {
        this.x = 60;
        this.y = canvas!.height - 60;
        this.size = Math.random() * 2.5 + 1;
        this.opacity = Math.random() * 0.6 + 0.3;
        this.r = 160 + Math.floor(Math.random() * 60);
        this.g = 100 + Math.floor(Math.random() * 60);
        this.b = 30 + Math.floor(Math.random() * 40);
      }
    }

    const loop = () => {
      canvas.width = canvas.parentElement!.clientWidth;
      canvas.height = 320;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (inversion) {
        skyGrad.addColorStop(0, "#1a0f0a");
        skyGrad.addColorStop(0.38, "#3d2a10");
        skyGrad.addColorStop(0.39, "#1e2a42");
        skyGrad.addColorStop(1, "#0a1628");
      } else {
        skyGrad.addColorStop(0, "#0a1628");
        skyGrad.addColorStop(1, "#1e3a5f");
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Inversion line
      if (inversion) {
        const invY = canvas.height * 0.38;
        ctx.save();
        ctx.setLineDash([8, 5]);
        ctx.strokeStyle = "rgba(248,160,60,0.6)";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(0, invY); ctx.lineTo(canvas.width, invY); ctx.stroke();
        ctx.restore();
        ctx.fillStyle = "rgba(248,160,60,0.7)";
        ctx.font = "11px sans-serif";
        ctx.fillText("▲ Warm air layer (inversion ceiling)", 10, invY - 6);
      }

      // Ground
      ctx.fillStyle = "#0d1f0d";
      ctx.fillRect(0, canvas.height - 45, canvas.width, 45);

      // Factory
      ctx.fillStyle = "#3a3a3a";
      ctx.fillRect(20, canvas.height - 80, 40, 35);
      ctx.fillStyle = "#555";
      ctx.fillRect(40, canvas.height - 110, 20, 32);
      ctx.fillStyle = "#666";
      ctx.fillRect(48, canvas.height - 120, 8, 15);
      ctx.fillStyle = "#f59e0b";
      for (let w = 0; w < 3; w++) ctx.fillRect(26 + w * 12, canvas.height - 73, 8, 8);

      // Wind arrows
      if (wind > 0.5) {
        ctx.save();
        ctx.strokeStyle = "rgba(56,189,248,0.5)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        for (let row = 0; row < 3; row++) {
          ctx.beginPath();
          ctx.moveTo(80, 60 + row * 30);
          ctx.lineTo(80 + wind * 18, 60 + row * 30);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Emit
      frameRef.current++;
      if (frameRef.current % Math.max(1, Math.round(60 / emitRate)) === 0) {
        for (let i = 0; i < Math.ceil(emitRate / 10); i++) particles.push(new Particle());
      }

      // Update & draw
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const brownX = (Math.random() - 0.5) * 1.2;
        const brownY = (Math.random() - 0.5) * 1.2;
        p.vx = wind * 0.55 + brownX;
        const rise = Math.max(0, (temp - 10) * 0.025);
        p.vy = -rise + brownY + (p.size > 2 ? 0.15 : 0);
        if (inversion) {
          const ceiling = canvas.height * 0.38;
          if (p.y <= ceiling) p.vy = Math.abs(p.vy) + 0.4;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.008;

        if (p.life <= 0 || p.x > canvas.width + 40 || p.y < -40 || p.y > canvas.height + 40) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.life * p.opacity})`;
        ctx.fill();
      }

      // AQI label
      const density = particles.length;
      let aqiColor = "#22c55e", aqiLabel = "Good";
      if (density > 80) { aqiColor = "#84cc16"; aqiLabel = "Moderate"; }
      if (density > 160) { aqiColor = "#f59e0b"; aqiLabel = "Unhealthy"; }
      if (density > 280) { aqiColor = "#ef4444"; aqiLabel = "Hazardous"; }
      ctx.fillStyle = aqiColor;
      ctx.font = "bold 13px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(`AQI: ${aqiLabel} (${density} particles)`, canvas.width - 12, 22);

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [wind, temp, emitRate, inversion]);

  return (
    <div className="liquid-glass rounded-2xl p-6 md:p-8">
      <p className="text-foreground/60 font-body font-light text-base mb-6">
        Adjust the sliders to control wind, temperature, and emission rate. Toggle inversion to trap pollution near the ground.
      </p>

      <div className="space-y-4 mb-6 liquid-glass rounded-xl p-5">
        {/* Wind */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-body font-medium text-foreground min-w-[130px]">Wind Speed</span>
          <input type="range" min="0" max="10" value={wind} step={0.5}
            onChange={e => setWind(+e.target.value)}
            className="flex-1 accent-sky-400 h-1.5" />
          <span className="liquid-glass-strong rounded-full px-3 py-1 text-xs font-body font-bold min-w-[60px] text-center text-foreground">{wind} m/s</span>
        </div>
        {/* Temp */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-body font-medium text-foreground min-w-[130px]">Temperature</span>
          <input type="range" min="-10" max="40" value={temp} step={1}
            onChange={e => setTemp(+e.target.value)}
            className="flex-1 accent-sky-400 h-1.5" />
          <span className="liquid-glass-strong rounded-full px-3 py-1 text-xs font-body font-bold min-w-[60px] text-center text-foreground">{temp} °C</span>
        </div>
        {/* Emission */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-body font-medium text-foreground min-w-[130px]">Emission Rate</span>
          <input type="range" min="1" max="20" value={emitRate} step={1}
            onChange={e => setEmitRate(+e.target.value)}
            className="flex-1 accent-sky-400 h-1.5" />
          <span className="liquid-glass-strong rounded-full px-3 py-1 text-xs font-body font-bold min-w-[60px] text-center text-foreground">{emitRate} /s</span>
        </div>
        {/* Inversion */}
        <div className="flex items-center gap-4 pt-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={inversion} onChange={e => setInversion(e.target.checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-foreground/20 peer-checked:bg-sky-500 rounded-full transition-colors after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-foreground after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
          <span className="text-sm font-body font-medium text-foreground">Temperature Inversion</span>
          <span className={`text-xs font-body font-bold px-2 py-0.5 rounded-full ${inversion ? "bg-orange-500/20 text-orange-300" : "bg-foreground/10 text-foreground/50"}`}>
            {inversion ? "ON" : "OFF"}
          </span>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden">
        <canvas ref={canvasRef} height={320} className="w-full block" />
      </div>

      <p className="text-foreground/40 font-body font-light text-sm mt-4">
        When inversion is ON, a warm air layer traps cold, polluted air near the ground — a major cause of smog in cities like Tashkent and Delhi.
      </p>
    </div>
  );
};

/* ─── Brownian Motion ─── */
const BrownianMotion = () => {
  const smallRef = useRef<HTMLCanvasElement>(null);
  const largeRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const small = smallRef.current;
    const large = largeRef.current;
    if (!small || !large) return;
    const ctxS = small.getContext("2d")!;
    const ctxL = large.getContext("2d")!;

    const smallParticles = Array.from({ length: 40 }, () => ({
      x: Math.random() * 300, y: Math.random() * 200,
      size: 2, trail: [] as { x: number; y: number }[]
    }));
    const largeParticles = Array.from({ length: 15 }, () => ({
      x: Math.random() * 300, y: Math.random() * 200,
      size: 5, vy: 0, trail: [] as { x: number; y: number }[]
    }));

    const loop = () => {
      [small, large].forEach(c => {
        c.width = c.parentElement!.clientWidth;
        c.height = 200;
      });

      // Small PM2.5
      ctxS.fillStyle = "#070d1a";
      ctxS.fillRect(0, 0, small.width, small.height);
      smallParticles.forEach(p => {
        p.x += (Math.random() - 0.5) * 4;
        p.y += (Math.random() - 0.5) * 4;
        p.x = Math.max(0, Math.min(small.width, p.x));
        p.y = Math.max(0, Math.min(small.height, p.y));
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 20) p.trail.shift();

        ctxS.beginPath();
        ctxS.strokeStyle = "rgba(56,189,248,0.15)";
        ctxS.lineWidth = 0.5;
        p.trail.forEach((t, i) => { i === 0 ? ctxS.moveTo(t.x, t.y) : ctxS.lineTo(t.x, t.y); });
        ctxS.stroke();

        ctxS.beginPath();
        ctxS.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctxS.fillStyle = "rgba(56,189,248,0.8)";
        ctxS.fill();
      });

      // Large PM10
      ctxL.fillStyle = "#070d1a";
      ctxL.fillRect(0, 0, large.width, large.height);
      largeParticles.forEach(p => {
        p.x += (Math.random() - 0.5) * 1.5;
        (p as any).vy += 0.08;
        p.y += (p as any).vy + (Math.random() - 0.5) * 0.5;
        p.x = Math.max(0, Math.min(large.width, p.x));
        if (p.y > large.height - p.size) { p.y = large.height - p.size; (p as any).vy = 0; }

        ctxL.beginPath();
        ctxL.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctxL.fillStyle = "rgba(245,158,11,0.7)";
        ctxL.fill();
      });

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div className="liquid-glass rounded-2xl p-6 md:p-8">
      <p className="text-foreground/60 font-body font-light text-base mb-6">
        PM2.5 particles (≤ 2.5 µm) move randomly due to constant collisions with air molecules. Larger PM10 particles settle faster due to gravity.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-center font-body font-bold text-sm text-foreground/70 mb-2">PM2.5 (2.5 µm) — stays airborne</div>
          <div className="rounded-xl overflow-hidden"><canvas ref={smallRef} height={200} className="w-full block" /></div>
        </div>
        <div>
          <div className="text-center font-body font-bold text-sm text-foreground/70 mb-2">PM10 (10 µm) — settles faster</div>
          <div className="rounded-xl overflow-hidden"><canvas ref={largeRef} height={200} className="w-full block" /></div>
        </div>
      </div>
    </div>
  );
};

/* ─── Concentration vs Distance ─── */
const ConcentrationDistance = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dist, setDist] = useState(1);
  const conc = Math.round(100 / (dist * dist));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.parentElement!.clientWidth;
    canvas.height = 240;

    ctx.fillStyle = "#070d1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw curve
    ctx.beginPath();
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2.5;
    for (let x = 0; x < canvas.width; x++) {
      const d = 0.1 + (x / canvas.width) * 10;
      const c = 100 / (d * d);
      const y = canvas.height - (c / 100) * (canvas.height - 40) - 20;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Current point
    const px = ((dist - 0.1) / 9.9) * canvas.width;
    const py = canvas.height - (conc / 100) * (canvas.height - 40) - 20;
    ctx.beginPath();
    ctx.arc(px, py, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#ef4444";
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${conc} µg/m³`, px, py - 14);

    // Axes labels
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Distance →", canvas.width - 80, canvas.height - 5);
    ctx.save();
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Concentration →", -canvas.height + 10, 14);
    ctx.restore();
  }, [dist, conc]);

  return (
    <div className="liquid-glass rounded-2xl p-6 md:p-8">
      <p className="text-foreground/60 font-body font-light text-base mb-6">
        Pollution intensity decreases with the square of distance from the source: C ∝ 1/r²
      </p>
      <div className="liquid-glass rounded-xl p-5 mb-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-body font-medium text-foreground min-w-[180px]">Distance from source (km)</span>
          <input type="range" min="0.1" max="10" value={dist} step={0.1}
            onChange={e => setDist(+e.target.value)}
            className="flex-1 accent-sky-400 h-1.5" />
          <span className="liquid-glass-strong rounded-full px-3 py-1 text-xs font-body font-bold min-w-[60px] text-center text-foreground">{dist.toFixed(1)} km</span>
        </div>
        <div className="text-center mt-3">
          <span className="text-foreground font-body font-bold text-lg">Concentration: </span>
          <span className="text-sky-400 font-heading italic text-3xl">{conc}</span>
          <span className="text-foreground/50 font-body text-sm"> µg/m³ (relative)</span>
        </div>
      </div>
      <div className="rounded-xl overflow-hidden">
        <canvas ref={canvasRef} height={240} className="w-full block" />
      </div>
    </div>
  );
};

/* ─── Light Scattering ─── */
const LightScattering = () => {
  const cleanRef = useRef<HTMLCanvasElement>(null);
  const pollRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    [cleanRef, pollRef].forEach((ref, idx) => {
      const canvas = ref.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d")!;
      canvas.width = canvas.parentElement!.clientWidth;
      canvas.height = 180;

      const isPolluted = idx === 1;

      // Sky
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (isPolluted) {
        grad.addColorStop(0, "#8b7355");
        grad.addColorStop(0.5, "#a09070");
        grad.addColorStop(1, "#6b6050");
      } else {
        grad.addColorStop(0, "#0369a1");
        grad.addColorStop(0.5, "#38bdf8");
        grad.addColorStop(1, "#7dd3fc");
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sun
      ctx.beginPath();
      ctx.arc(canvas.width * 0.75, 40, 25, 0, Math.PI * 2);
      ctx.fillStyle = isPolluted ? "rgba(255,200,100,0.5)" : "rgba(255,255,200,0.9)";
      ctx.fill();

      // Sun rays
      if (!isPolluted) {
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(canvas.width * 0.75 + Math.cos(angle) * 30, 40 + Math.sin(angle) * 30);
          ctx.lineTo(canvas.width * 0.75 + Math.cos(angle) * 45, 40 + Math.sin(angle) * 45);
          ctx.strokeStyle = "rgba(255,255,200,0.4)";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // Haze particles for polluted
      if (isPolluted) {
        for (let i = 0; i < 200; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          ctx.beginPath();
          ctx.arc(x, y, Math.random() * 2 + 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180,160,120,${Math.random() * 0.3})`;
          ctx.fill();
        }
      }

      // Ground
      ctx.fillStyle = isPolluted ? "#4a4030" : "#166534";
      ctx.fillRect(0, canvas.height - 30, canvas.width, 30);
    });
  }, []);

  return (
    <div className="liquid-glass rounded-2xl p-6 md:p-8">
      <p className="text-foreground/60 font-body font-light text-base mb-4">
        Pollution particles scatter sunlight, reducing visibility and giving the sky a gray/yellow haze (Mie scattering).
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="rounded-xl overflow-hidden"><canvas ref={cleanRef} height={180} className="w-full block" /></div>
          <div className="text-center font-body font-bold text-sm text-foreground/70 mt-2 liquid-glass rounded-lg py-2">Clean Air</div>
        </div>
        <div>
          <div className="rounded-xl overflow-hidden"><canvas ref={pollRef} height={180} className="w-full block" /></div>
          <div className="text-center font-body font-bold text-sm text-foreground/70 mt-2 liquid-glass rounded-lg py-2">Polluted Air</div>
        </div>
      </div>
    </div>
  );
};

/* ─── PAGE ─── */
const PhysicsLab = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary to-background" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-32">
          <AnimatedSection>
            <span className="inline-block liquid-glass rounded-full px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase text-foreground/80 mb-6">
              ⚛️ Interactive Lab
            </span>
          </AnimatedSection>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading italic leading-[1.1] mb-6 text-foreground">
            <BlurText text="Physics Laboratory" />
          </h1>
          <AnimatedSection delay={0.4}>
            <p className="text-base sm:text-lg font-body font-light text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Simulate how pollutants disperse, settle, and interact with light — all powered by real physics.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 pb-20 space-y-20">
        {/* 1. Particle Dispersion */}
        <AnimatedSection>
          <h2 className="text-2xl sm:text-4xl font-heading italic text-foreground mb-2">⚛️ Particle Dispersion Simulation</h2>
          <p className="text-foreground/40 font-body text-sm mb-6">Control wind, temperature, and emission to see real-time particle behavior</p>
          <ParticleDispersion />
        </AnimatedSection>

        {/* 2. Brownian Motion */}
        <AnimatedSection>
          <h2 className="text-2xl sm:text-4xl font-heading italic text-foreground mb-2">🔬 Brownian Motion</h2>
          <p className="text-foreground/40 font-body text-sm mb-6">Watch how particle size affects movement and settling</p>
          <BrownianMotion />
        </AnimatedSection>

        {/* 3. Concentration vs Distance */}
        <AnimatedSection>
          <h2 className="text-2xl sm:text-4xl font-heading italic text-foreground mb-2">📏 Concentration vs. Distance</h2>
          <p className="text-foreground/40 font-body text-sm mb-6">Explore the inverse-square law of pollution dispersal</p>
          <ConcentrationDistance />
        </AnimatedSection>

        {/* 4. Light Scattering */}
        <AnimatedSection>
          <h2 className="text-2xl sm:text-4xl font-heading italic text-foreground mb-2">☀️ Light Scattering (Mie Scattering)</h2>
          <p className="text-foreground/40 font-body text-sm mb-6">See how pollution changes what the sky looks like</p>
          <LightScattering />
        </AnimatedSection>
      </div>
    </div>
  );
};

export default PhysicsLab;
