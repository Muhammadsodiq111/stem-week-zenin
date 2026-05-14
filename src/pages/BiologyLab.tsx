import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Wind, HeartPulse, Brain, Dna, Flame, Shield, Activity, Droplets,
  Zap, Battery, Skull, TrendingUp, ShieldAlert, Microscope,
  Cigarette, Baby, ArrowRight,
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import BlurText from "../components/BlurText";

/* ─── Organ Data ─── */
const ORGAN_DATA: Record<string, {
  Icon: React.ComponentType<{ className?: string }>;
  name: string; accent: string; damage: number;
  subtitle: string;
  effects: { Icon: React.ComponentType<{ className?: string }>; title: string; desc: string }[];
}> = {
  lungs: {
    Icon: Wind, name: "Lungs", accent: "sky", damage: 85,
    subtitle: "Primary entry point for all airborne pollutants",
    effects: [
      { Icon: Flame, title: "Inflammation & Asthma", desc: "PM2.5 triggers inflammatory cytokines in bronchial tissue. Chronic exposure causes persistent airway inflammation — the root of asthma." },
      { Icon: Wind, title: "Alveolar Destruction", desc: "Ultrafine particles deposit in alveoli, activating macrophages. Over time, alveolar walls are destroyed — reducing gas exchange capacity (COPD)." },
      { Icon: Dna, title: "DNA Mutation → Cancer", desc: "Polycyclic aromatic hydrocarbons (PAHs) on PM2.5 surfaces are potent carcinogens. They bind to DNA, causing mutations that can lead to lung cancer." },
      { Icon: Shield, title: "Mucociliary Shutdown", desc: "SO₂ and NO₂ paralyze cilia — the tiny hairs that sweep mucus and debris out of airways. Without them, infections and particle buildup worsen rapidly." },
    ],
  },
  heart: {
    Icon: HeartPulse, name: "Heart", accent: "rose", damage: 70,
    subtitle: "Systemic inflammation damages the cardiovascular system",
    effects: [
      { Icon: Droplets, title: "Blood Thickening", desc: "PM2.5 entering the bloodstream triggers platelet activation and fibrinogen release — making blood thicker and more likely to clot." },
      { Icon: Activity, title: "Atherosclerosis", desc: "Chronic inflammation oxidizes LDL cholesterol, building plaques inside artery walls. Pollution exposure accelerates this process significantly." },
      { Icon: Zap, title: "Arrhythmia Risk", desc: "Ultrafine particles affect the autonomic nervous system, disrupting heart rhythm. Higher PM2.5 days correlate with more cardiac arrest calls." },
      { Icon: TrendingUp, title: "Hypertension", desc: "Pollution triggers vasoconstriction through oxidative stress and endothelin release — raising blood pressure even in young, healthy adults." },
    ],
  },
  brain: {
    Icon: Brain, name: "Brain", accent: "violet", damage: 55,
    subtitle: "Ultrafine particles can cross the blood-brain barrier",
    effects: [
      { Icon: ShieldAlert, title: "Blood-Brain Barrier Breach", desc: "Ultrafine PM (<0.1µm) crosses the blood-brain barrier directly. Once inside, they trigger neuroinflammation — a key factor in cognitive decline." },
      { Icon: Brain, title: "Neurodegeneration", desc: "Long-term exposure is linked to Alzheimer's and Parkinson's disease. Pollution-related brain inflammation mirrors neurodegenerative pathology." },
      { Icon: Zap, title: "Stroke Risk", desc: "Inflammation + blood thickening + hypertension = dramatically increased stroke risk. High pollution days see 10–30% more stroke admissions." },
      { Icon: Activity, title: "Cognitive Impairment", desc: "Children exposed to high pollution show reduced working memory, lower IQ scores, and slower processing speed than peers in clean air areas." },
    ],
  },
  cells: {
    Icon: Microscope, name: "Cells", accent: "emerald", damage: 90,
    subtitle: "Oxidative stress at the molecular level",
    effects: [
      { Icon: Zap, title: "Reactive Oxygen Species", desc: "PM2.5 triggers ROS — unstable molecules that damage everything they touch: DNA, proteins, lipids, and mitochondria." },
      { Icon: Dna, title: "DNA Damage", desc: "ROS cause single and double-strand DNA breaks. If repair mechanisms fail, mutations accumulate — increasing cancer risk across multiple organs." },
      { Icon: Battery, title: "Mitochondrial Dysfunction", desc: "ROS attack mitochondria — the cell's power plants. Damaged mitochondria produce less energy and more ROS, creating a destructive feedback loop." },
      { Icon: Skull, title: "Apoptosis & Necrosis", desc: "Overwhelming oxidative stress triggers programmed or uncontrolled cell death — both leading to tissue damage and organ failure." },
    ],
  },
};

const ACCENT: Record<string, { text: string; ring: string; bg: string; glow: string; svg: string }> = {
  sky:     { text: "text-sky-300",     ring: "ring-sky-400/40",     bg: "bg-sky-500/15",     glow: "from-sky-500/30",     svg: "#38bdf8" },
  rose:    { text: "text-rose-300",    ring: "ring-rose-400/40",    bg: "bg-rose-500/15",    glow: "from-rose-500/30",    svg: "#fb7185" },
  violet:  { text: "text-violet-300",  ring: "ring-violet-400/40",  bg: "bg-violet-500/15",  glow: "from-violet-500/30",  svg: "#a78bfa" },
  emerald: { text: "text-emerald-300", ring: "ring-emerald-400/40", bg: "bg-emerald-500/15", glow: "from-emerald-500/30", svg: "#34d399" },
};

/* ─── Refined SVG Body Diagram ─── */
const BodyDiagram = ({ activeOrgan, onSelect }: { activeOrgan: string; onSelect: (o: string) => void }) => (
  <svg viewBox="0 0 240 460" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[260px] mx-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]">
    <defs>
      <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(220 25% 28%)" />
        <stop offset="100%" stopColor="hsl(220 25% 14%)" />
      </linearGradient>
      <radialGradient id="headGrad" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="hsl(220 25% 32%)" />
        <stop offset="100%" stopColor="hsl(220 25% 16%)" />
      </radialGradient>
      <filter id="orgGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" />
      </filter>
    </defs>

    {/* Head */}
    <circle cx="120" cy="60" r="38" fill="url(#headGrad)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
    {/* Neck */}
    <rect x="108" y="92" width="24" height="22" rx="6" fill="hsl(220 25% 20%)" />
    {/* Torso */}
    <path d="M70 118 Q120