import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "motion/react";
import { Factory, Filter, Sun, TreePine, Flag, RotateCcw, Info, Wind, Flame, CloudFog, Leaf, Scale } from "lucide-react";
import BlurText from "../components/BlurText";
import AnimatedSection from "../components/AnimatedSection";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/* ═══════════════ 3D PRIMITIVES ═══════════════ */

// Smoke particle stream from chimney
const SmokeStream = ({
  position,
  filtered,
  color = "#3a3a3a",
}: {
  position: [number, number, number];
  filtered: boolean;
  color?: string;
}) => {
  const COUNT = filtered ? 25 : 90;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const data = useMemo(
    () =>
      Array.from({ length: 90 }, () => ({
        offset: Math.random() * 6,
        speed: 0.4 + Math.random() * 0.6,
        spread: (Math.random() - 0.5) * 0.4,
        spread2: (Math.random() - 0.5) * 0.4,
        scale: 0.3 + Math.random() * 0.5,
      })),
    []
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < COUNT; i++) {
      const d = data[i];
      const life = ((t * d.speed + d.offset) % 6) / 6; // 0..1
      const y = life * 4.5;
      const wobble = Math.sin(t * 2 + i) * 0.15;
      dummy.position.set(
        position[0] + d.spread + wobble + life * d.spread * 2,
        position[1] + y,
        position[2] + d.spread2 + wobble
      );
      const s = d.scale * (0.4 + life * 1.6) * (filtered ? 0.4 : 1);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    // hide unused instances
    for (let i = COUNT; i < 90; i++) {
      dummy.scale.setScalar(0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, 90]}>
      <sphereGeometry args={[0.35, 8, 8]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={filtered ? 0.25 : 0.55}
        depthWrite={false}
      />
    </instancedMesh>
  );
};

// Brick orange building block
const Building = ({
  position,
  size,
  roofColor = "#5a5a5a",
}: {
  position: [number, number, number];
  size: [number, number, number];
  roofColor?: string;
}) => (
  <group position={position}>
    <mesh castShadow receiveShadow position={[0, size[1] / 2, 0]}>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#c44a1a" roughness={0.85} />
    </mesh>
    {/* roof trim */}
    <mesh position={[0, size[1] + 0.05, 0]}>
      <boxGeometry args={[size[0] + 0.1, 0.1, size[2] + 0.1]} />
      <meshStandardMaterial color={roofColor} roughness={0.6} />
    </mesh>
    {/* small window */}
    <mesh position={[0, size[1] * 0.6, size[2] / 2 + 0.01]}>
      <boxGeometry args={[size[0] * 0.3, size[1] * 0.2, 0.02]} />
      <meshStandardMaterial color="#1a3a5a" emissive="#0a2540" emissiveIntensity={0.4} />
    </mesh>
  </group>
);

// Striped chimney
const Chimney = ({
  position,
  height = 4,
  filtered,
}: {
  position: [number, number, number];
  height?: number;
  filtered: boolean;
}) => (
  <group position={position}>
    {/* stripes - 4 sections */}
    {Array.from({ length: 4 }).map((_, i) => (
      <mesh key={i} position={[0, (i + 0.5) * (height / 4), 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.32, height / 4, 16]} />
        <meshStandardMaterial color={i % 2 === 0 ? "#f5f5f5" : "#b53a2a"} roughness={0.7} />
      </mesh>
    ))}
    {/* opening */}
    <mesh position={[0, height + 0.05, 0]}>
      <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
      <meshStandardMaterial color="#1a1a1a" />
    </mesh>
    {/* filter cap */}
    {filtered && (
      <mesh position={[0, height + 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.4, 0.4, 16]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.4} metalness={0.3} />
      </mesh>
    )}
    <SmokeStream
      position={[position[0] * 0 + 0, height + (filtered ? 0.5 : 0.15), 0]}
      filtered={filtered}
    />
  </group>
);

// Water tank
const WaterTank = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    {/* legs */}
    {[
      [-0.4, 0, -0.4],
      [0.4, 0, -0.4],
      [-0.4, 0, 0.4],
      [0.4, 0, 0.4],
    ].map((p, i) => (
      <mesh key={i} position={[p[0], 0.75, p[2]]}>
        <boxGeometry args={[0.08, 1.5, 0.08]} />
        <meshStandardMaterial color="#888" />
      </mesh>
    ))}
    <mesh position={[0, 1.9, 0]} castShadow>
      <cylinderGeometry args={[0.55, 0.55, 0.7, 20]} />
      <meshStandardMaterial color="#e8a93a" roughness={0.6} />
    </mesh>
    <mesh position={[0, 2.3, 0]}>
      <cylinderGeometry args={[0.55, 0.55, 0.1, 20]} />
      <meshStandardMaterial color="#888" />
    </mesh>
  </group>
);

// House with blue roof
const SmallHouse = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    <mesh position={[0, 0.4, 0]} castShadow>
      <boxGeometry args={[1, 0.8, 0.9]} />
      <meshStandardMaterial color="#c44a1a" roughness={0.85} />
    </mesh>
    {/* roof */}
    <mesh position={[0, 0.95, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
      <coneGeometry args={[0.75, 0.4, 4]} />
      <meshStandardMaterial color="#2a6cb0" roughness={0.5} />
    </mesh>
    <mesh position={[0, 0.4, 0.46]}>
      <boxGeometry args={[0.3, 0.4, 0.02]} />
      <meshStandardMaterial color="#1a3a5a" emissive="#0a2540" emissiveIntensity={0.4} />
    </mesh>
  </group>
);

// Storage tanks
const StorageTanks = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    {[-0.5, 0, 0.5].map((x, i) => (
      <mesh key={i} position={[x, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.6, 16]} />
        <meshStandardMaterial color="#e8e0d0" roughness={0.7} />
      </mesh>
    ))}
    {/* pipes */}
    <mesh position={[0, 0.65, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.15, 0.04, 8, 16, Math.PI]} />
      <meshStandardMaterial color="#666" />
    </mesh>
  </group>
);

// Lamp post
const LampPost = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    <mesh position={[0, 0.5, 0]}>
      <cylinderGeometry args={[0.04, 0.04, 1, 8]} />
      <meshStandardMaterial color="#444" />
    </mesh>
    <mesh position={[0, 1.05, 0]} castShadow>
      <sphereGeometry args={[0.12, 12, 12]} />
      <meshStandardMaterial color="#2a6cb0" emissive="#3a8cd0" emissiveIntensity={0.6} />
    </mesh>
  </group>
);

// Solar panel array on roof
const SolarPanels = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    {[-0.6, 0, 0.6].map((x, i) =>
      [-0.4, 0.4].map((z, j) => (
        <mesh key={`${i}-${j}`} position={[x, 0, z]} rotation={[-0.25, 0, 0]} castShadow>
          <boxGeometry args={[0.55, 0.04, 0.7]} />
          <meshStandardMaterial
            color="#0a2540"
            metalness={0.7}
            roughness={0.2}
            emissive="#1a4a8a"
            emissiveIntensity={0.15}
          />
        </mesh>
      ))
    )}
  </group>
);

// Tree
const Tree = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => (
  <group position={position} scale={scale}>
    <mesh position={[0, 0.3, 0]} castShadow>
      <cylinderGeometry args={[0.06, 0.08, 0.6, 8]} />
      <meshStandardMaterial color="#5a3a1a" />
    </mesh>
    <mesh position={[0, 0.85, 0]} castShadow>
      <coneGeometry args={[0.35, 1.0, 10]} />
      <meshStandardMaterial color="#2d6a3a" roughness={0.8} />
    </mesh>
    <mesh position={[0, 1.3, 0]} castShadow>
      <coneGeometry args={[0.25, 0.6, 10]} />
      <meshStandardMaterial color="#3a8a4a" roughness={0.8} />
    </mesh>
  </group>
);

// Info flag with hover label
const InfoFlag = ({
  position,
  label,
  detail,
  color = "#e84a1a",
}: {
  position: [number, number, number];
  label: string;
  detail: string;
  color?: string;
}) => {
  const [hover, setHover] = useState(false);
  return (
    <group position={position}>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 1.2, 6]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      <mesh
        position={[0.18, 1.05, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
        }}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[0.36, 0.2, 0.01]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Html position={[0, 1.4, 0]} center distanceFactor={8} style={{ pointerEvents: "none" }}>
        <div
          className={`whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-medium transition-all ${
            hover ? "opacity-100 scale-100" : "opacity-80 scale-95"
          }`}
          style={{
            background: "rgba(15,15,20,0.85)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(8px)",
          }}
        >
          {hover ? detail : label}
        </div>
      </Html>
    </group>
  );
};

/* ═══════════════ THE FACTORY SCENE ═══════════════ */

const FactoryScene = ({
  filter,
  solar,
  green,
  splitMode,
}: {
  filter: boolean;
  solar: boolean;
  green: boolean;
  splitMode: boolean;
}) => {
  // base platform: orange walls + grey concrete + black road
  return (
    <group>
      {/* Black road base (diamond) */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#1a1a1a" roughness={1} />
      </mesh>

      {/* Road dashed lines (decorative) */}
      {Array.from({ length: 8 }).map((_, i) => {
        const t = -3.5 + i;
        return (
          <mesh
            key={`l1-${i}`}
            position={[t * Math.cos(Math.PI / 4), -0.04, t * Math.sin(Math.PI / 4) - 4]}
            rotation={[-Math.PI / 2, 0, Math.PI / 4]}
          >
            <planeGeometry args={[0.4, 0.08]} />
            <meshStandardMaterial color="white" />
          </mesh>
        );
      })}

      {/* Orange perimeter walls */}
      {[
        { p: [0, 0.2, 3.5] as [number, number, number], s: [7, 0.4, 0.2] as [number, number, number] },
        { p: [0, 0.2, -3.5] as [number, number, number], s: [7, 0.4, 0.2] as [number, number, number] },
        { p: [3.5, 0.2, 0] as [number, number, number], s: [0.2, 0.4, 7] as [number, number, number] },
        { p: [-3.5, 0.2, 0] as [number, number, number], s: [0.2, 0.4, 7] as [number, number, number] },
      ].map((w, i) => (
        <mesh key={i} position={w.p} castShadow>
          <boxGeometry args={w.s} />
          <meshStandardMaterial color={splitMode && w.p[0] < 0 ? "#3a8a4a" : "#e85a1a"} roughness={0.8} />
        </mesh>
      ))}

      {/* Concrete floor inside walls */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[7, 7]} />
        <meshStandardMaterial color={splitMode ? "#a8b8a8" : "#bcc4c8"} roughness={0.95} />
      </mesh>

      {/* split divider line */}
      {splitMode && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.08, 7]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.3} />
        </mesh>
      )}

      {/* MAIN FACTORY BUILDING (center-back) */}
      <Building position={[0.6, 0, -1.2]} size={[2.2, 1.4, 1.6]} />

      {/* Side annex */}
      <Building position={[-1.3, 0, -0.8]} size={[1.2, 1.0, 1.2]} />

      {/* Small house with blue roof */}
      <SmallHouse position={[-2.0, 0, 0.3]} />

      {/* Storage tanks */}
      <StorageTanks position={[-1.3, 0, 1.4]} />

      {/* Water tank tower */}
      <WaterTank position={[2.3, 0, 0.0]} />

      {/* CHIMNEYS — emit smoke unless filter enabled */}
      <Chimney position={[-2.7, 0.6, -2.2]} height={3.6} filtered={filter} />
      <Chimney position={[1.2, 1.4, -1.5]} height={3.0} filtered={filter} />
      <Chimney position={[1.9, 1.4, -1.5]} height={3.4} filtered={filter} />

      {/* Lamp posts */}
      {[
        [-3, 0, -3],
        [3, 0, -3],
        [-3, 0, 3],
        [3, 0, 3],
        [0, 0, 3.2],
      ].map((p, i) => (
        <LampPost key={i} position={p as [number, number, number]} />
      ))}

      {/* SOLAR PANELS on factory roof */}
      {solar && <SolarPanels position={[0.6, 1.45, -1.2]} />}

      {/* GREEN ZONE — trees on left side / outside walls */}
      {green && (
        <>
          <Tree position={[-3.0, 0, 1.5]} scale={0.9} />
          <Tree position={[-3.2, 0, 2.5]} scale={1.1} />
          <Tree position={[-2.5, 0, 2.8]} scale={0.8} />
          <Tree position={[-3.3, 0, -1.0]} scale={1.0} />
          <Tree position={[2.8, 0, 2.8]} scale={0.9} />
          <Tree position={[3.2, 0, -2.2]} scale={0.85} />
          {/* small plants inside */}
          <Tree position={[0.8, 0, 1.8]} scale={0.5} />
          <Tree position={[-0.5, 0, 1.6]} scale={0.4} />
        </>
      )}

      {/* INFO FLAGS */}
      {filter && (
        <InfoFlag
          position={[1.5, 4.5, -1.5]}
          label="Filter"
          detail="Industrial Scrubber — China & Japan mandate"
          color="#e8e8e8"
        />
      )}
      {solar && (
        <InfoFlag
          position={[0.6, 1.7, -1.2]}
          label="Solar"
          detail="Renewable Energy — China's 5-Year Plan"
          color="#3a8cd0"
        />
      )}
      {green && (
        <InfoFlag
          position={[-3.2, 0.5, 2.0]}
          label="Green Zone"
          detail="Urban Green Barriers absorb pollutants"
          color="#3a8a4a"
        />
      )}
      {splitMode && (
        <InfoFlag
          position={[-2.5, 1.5, 3.2]}
          label="After"
          detail="Clean side — solutions applied"
          color="#3a8a4a"
        />
      )}
      {splitMode && (
        <InfoFlag
          position={[2.5, 1.5, 3.2]}
          label="Before"
          detail="Polluted side — no intervention"
          color="#b53a2a"
        />
      )}
    </group>
  );
};

/* ═══════════════ PAGE ═══════════════ */

const ModelLab = () => {
  const [filter, setFilter] = useState(false);
  const [solar, setSolar] = useState(false);
  const [green, setGreen] = useState(false);
  const [splitMode, setSplitMode] = useState(false);

  const reset = () => {
    setFilter(false);
    setSolar(false);
    setGreen(false);
    setSplitMode(false);
  };

  const activeCount = [filter, solar, green].filter(Boolean).length;
  const aqi = 285 - activeCount * 70 - (splitMode ? 20 : 0);
  const aqiLabel =
    aqi > 200 ? "Hazardous" : aqi > 150 ? "Unhealthy" : aqi > 100 ? "Moderate" : "Good";
  const aqiColor =
    aqi > 200 ? "#b53a2a" : aqi > 150 ? "#e85a1a" : aqi > 100 ? "#e8a93a" : "#3a8a4a";

  const toggles = [
    {
      key: "filter",
      label: "Industrial Scrubber",
      sub: "Filter on chimney",
      tooltip: "Scrubber filter on the smokestack. Reduces SO₂ by 40% and PM2.5 by 60%.",
      icon: Filter,
      active: filter,
      onClick: () => setFilter(!filter),
    },
    {
      key: "solar",
      label: "Solar Panels",
      sub: "Renewable energy",
      tooltip: "Roof-mounted solar panels replace fossil fuels. Cuts CO₂ by 50% and NOₓ by 30%.",
      icon: Sun,
      active: solar,
      onClick: () => setSolar(!solar),
    },
    {
      key: "green",
      label: "Urban Green Zone",
      sub: "Trees absorb pollutants",
      tooltip: "Tree barrier around the site. Absorbs 15% CO₂, 20% NOₓ and 10% PM2.5.",
      icon: TreePine,
      active: green,
      onClick: () => setGreen(!green),
    },
    {
      key: "split",
      label: "Before / After",
      sub: "Split the model",
      tooltip: "Splits the platform into a polluted half and a clean half so you can compare.",
      icon: Flag,
      active: splitMode,
      onClick: () => setSplitMode(!splitMode),
    },
  ];

  // Live gas breakdown — base 100% each, reduced by active interventions
  const gases = [
    {
      key: "co2",
      label: "CO₂",
      icon: Wind,
      value: Math.max(0, 100 - (solar ? 50 : 0) - (green ? 15 : 0)),
    },
    {
      key: "so2",
      label: "SO₂",
      icon: Flame,
      value: Math.max(0, 100 - (filter ? 40 : 0)),
    },
    {
      key: "nox",
      label: "NOₓ",
      icon: CloudFog,
      value: Math.max(0, 100 - (solar ? 30 : 0) - (green ? 20 : 0)),
    },
    {
      key: "pm",
      label: "PM2.5",
      icon: Leaf,
      value: Math.max(0, 100 - (filter ? 60 : 0) - (green ? 10 : 0)),
    },
  ];
  const gasColor = (v: number) =>
    v > 75 ? "#b53a2a" : v > 50 ? "#e85a1a" : v > 25 ? "#e8a93a" : "#3a8a4a";

  return (
    <TooltipProvider delayDuration={150}>
    <div className="min-h-screen bg-gradient-to-b from-background via-[#1a1410] to-background">

      {/* HERO */}
      <section className="relative pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <AnimatedSection>
            <span className="inline-block liquid-glass rounded-full px-4 py-1.5 text-xs font-body font-medium tracking-widest uppercase text-foreground/80 mb-6">
              <Factory className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />
              Interactive 3D Model Lab
            </span>
          </AnimatedSection>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading italic leading-[1.1] mb-6 text-foreground">
            <BlurText text="Build the Solution" />
          </h1>
          <AnimatedSection delay={0.4}>
            <p className="text-base sm:text-lg font-body font-light text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              A working scale model of an industrial complex. Toggle solutions and watch the
              emissions transform — from hazardous smog to clean industry.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 3D STAGE + CONTROLS */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Canvas */}
          <div className="relative liquid-glass-strong rounded-3xl overflow-hidden h-[60vh] sm:h-[72vh] min-h-[480px]">
            <Canvas
              shadows
              camera={{ position: [8, 6, 8], fov: 45 }}
              gl={{ antialias: true }}
            >
              <color attach="background" args={["#0d0a08"]} />
              <fog attach="fog" args={["#0d0a08", 18, 32]} />

              <ambientLight intensity={0.4} />
              <directionalLight
                position={[8, 12, 5]}
                intensity={1.2}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={30}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
              />
              <pointLight position={[-5, 4, -5]} intensity={0.4} color="#e8a93a" />

              <Suspense fallback={null}>
                <Environment preset="city" />
                <FactoryScene
                  filter={filter}
                  solar={solar}
                  green={green}
                  splitMode={splitMode}
                />
              </Suspense>

              <OrbitControls
                enablePan={false}
                minDistance={6}
                maxDistance={18}
                maxPolarAngle={Math.PI / 2.1}
                target={[0, 1, 0]}
              />
            </Canvas>

            {/* AQI overlay */}
            <div className="absolute top-4 left-4 liquid-glass-strong rounded-2xl px-4 py-3 min-w-[160px]">
              <p className="text-[10px] uppercase tracking-widest text-foreground/50 font-body">
                Live AQI
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={aqi}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-baseline gap-2"
                >
                  <span
                    className="text-3xl font-heading italic"
                    style={{ color: aqiColor }}
                  >
                    {Math.max(aqi, 25)}
                  </span>
                  <span className="text-xs font-body" style={{ color: aqiColor }}>
                    {aqiLabel}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Legend overlay */}
            <div className="absolute top-4 right-4 liquid-glass-strong rounded-2xl px-4 py-3 max-w-[220px]">
              <p className="text-[10px] uppercase tracking-widest text-foreground/50 font-body mb-2">
                Legend
              </p>
              <div className="space-y-2">
                {/* Toggles */}
                <div className="flex items-start gap-2">
                  <Filter className="w-3 h-3 text-foreground/70 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-body font-medium text-foreground leading-tight">Scrubber Filter</p>
                    <p className="text-[10px] font-body text-foreground/50 leading-tight">Traps PM2.5, PM10, SO₂</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Sun className="w-3 h-3 text-foreground/70 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-body font-medium text-foreground leading-tight">Solar Panels</p>
                    <p className="text-[10px] font-body text-foreground/50 leading-tight">Cuts CO₂, NOₓ from fossil fuels</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <TreePine className="w-3 h-3 text-foreground/70 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-body font-medium text-foreground leading-tight">Green Zone</p>
                    <p className="text-[10px] font-body text-foreground/50 leading-tight">Trees absorb CO₂, NOₓ, O₃</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Scale className="w-3 h-3 text-foreground/70 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-body font-medium text-foreground leading-tight">Before / After</p>
                    <p className="text-[10px] font-body text-foreground/50 leading-tight">Split-view comparison</p>
                  </div>
                </div>
                {/* Divider */}
                <div className="h-px bg-foreground/10 my-2" />
                {/* Gases */}
                <p className="text-[10px] uppercase tracking-widest text-foreground/40 font-body mb-1">Emissions</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-body bg-foreground/10 text-foreground/70">
                    <Wind className="w-2.5 h-2.5" /> CO₂
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-body bg-foreground/10 text-foreground/70">
                    <Flame className="w-2.5 h-2.5" /> SO₂
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-body bg-foreground/10 text-foreground/70">
                    <CloudFog className="w-2.5 h-2.5" /> NOₓ
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-body bg-foreground/10 text-foreground/70">
                    <Leaf className="w-2.5 h-2.5" /> PM2.5
                  </span>
                </div>
              </div>
            </div>

            {/* Hint */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-[11px] text-foreground/50 font-body">
              <Info className="w-3.5 h-3.5" />
              <span>Drag to rotate · Scroll to zoom · Hover the flags</span>
            </div>
          </div>

          {/* Control panel */}
          <div className="space-y-3">
            <div className="liquid-glass rounded-2xl p-5">
              <p className="text-[10px] uppercase tracking-widest text-foreground/50 font-body mb-1">
                Solutions Panel
              </p>
              <h3 className="text-xl font-heading italic text-foreground mb-1">
                Apply interventions
              </h3>
              <p className="text-xs font-body font-light text-foreground/50">
                Toggle real-world strategies and watch the smog clear.
              </p>
            </div>

            {toggles.map((t) => (
              <motion.button
                key={t.key}
                onClick={t.onClick}
                whileTap={{ scale: 0.97 }}
                className={`w-full text-left rounded-2xl p-4 transition-all duration-300 ${
                  t.active
                    ? "liquid-glass-strong bg-foreground/10"
                    : "liquid-glass hover:bg-foreground/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-xl p-2.5 transition-colors ${
                      t.active ? "bg-foreground/20" : "bg-foreground/5"
                    }`}
                  >
                    <t.icon
                      className={`w-4 h-4 ${
                        t.active ? "text-foreground" : "text-foreground/60"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-body font-medium text-foreground">
                      {t.label}
                    </p>
                    <p className="text-[11px] font-body font-light text-foreground/50">
                      {t.sub}
                    </p>
                  </div>
                  <div
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                      t.active ? "bg-foreground/80" : "bg-foreground/15"
                    }`}
                  >
                    <motion.div
                      animate={{ x: t.active ? 16 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className={`w-4 h-4 rounded-full ${
                        t.active ? "bg-background" : "bg-foreground/60"
                      }`}
                    />
                  </div>
                </div>
              </motion.button>
            ))}

            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 text-xs font-body font-medium text-foreground/60 hover:text-foreground border border-foreground/10 hover:border-foreground/30 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset model
            </button>
          </div>
        </div>
      </section>

      {/* LEGEND / EXPLANATION */}
      <section className="px-6 pb-32">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-heading italic text-center mb-4 text-foreground">
              How the model tells the story
            </h2>
            <p className="text-foreground/50 font-body font-light text-center max-w-xl mx-auto mb-12">
              Five interventions, each grounded in real-world policy. Layer them to see how
              quickly the air can change.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: Filter,
                title: "1. Filter on the chimney",
                body: "A scrubber catches particulates before they reach the air — exactly what China and Japan mandate for factories.",
              },
              {
                icon: Flag,
                title: "2. Before / After split",
                body: "Half the base stays polluted; half goes green. The contrast tells the whole story at a glance.",
              },
              {
                icon: Sun,
                title: "3. Solar panels on the roof",
                body: "Switching to renewable energy mirrors China's Five-Year Plan — fewer fossil fuels, less smog.",
              },
              {
                icon: TreePine,
                title: "4. Urban green barriers",
                body: "Trees absorb pollutants. Even a small green ring around an industrial site measurably improves local air.",
              },
              {
                icon: Flag,
                title: "5. Info flag tags",
                body: "Tiny flags label every intervention — the details that turn a model into an explanation.",
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="liquid-glass rounded-2xl p-6 h-full flex gap-4">
                  <div className="liquid-glass-strong rounded-xl p-2.5 shrink-0 h-fit">
                    <item.icon className="w-5 h-5 text-foreground/70" />
                  </div>
                  <div>
                    <h3 className="text-base font-body font-medium text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm font-body font-light text-foreground/60 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
    </TooltipProvider>
  );
};

export default ModelLab;
