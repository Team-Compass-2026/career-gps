"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Sparkles } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import * as THREE from "three";
import { Flag } from "lucide-react";

const MILESTONE_PERIOD = 5;
const MILESTONE_COUNT = 5;

const NODE_POINTS: [number, number, number][] = [
  [-2.1, 1.15, 0.2],
  [-1.0, -0.4, 0.6],
  [0.5, -1.3, 0.15],
  [1.6, -0.4, -0.5],
  [2.3, 1.05, -0.1],
];

const STATIC_NODE_POINTS: [number, number][] = [
  [60, 370],
  [150, 318],
  [112, 208],
  [224, 148],
  [334, 74],
];

const MILESTONE_LABELS = ["Goal", "Skills", "Projects", "Experience", "Career"];

const THEME_COLORS = {
  light: {
    primary: "#2563EB",
    teal: "#14B8A6",
    path: "#93C5FD",
    ring: "#CBD5E1",
    sparkle: "#2563EB",
  },
  dark: {
    primary: "#60A5FA",
    teal: "#2DD4BF",
    path: "#334155",
    ring: "#334155",
    sparkle: "#60A5FA",
  },
} as const;

type ThemeColors = (typeof THEME_COLORS)[keyof typeof THEME_COLORS];

function useMedia(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}

function StaticPathway() {
  return (
    <svg viewBox="0 0 400 480" className="h-full w-full" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="cpg-path-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--teal)" />
        </linearGradient>
        <radialGradient id="cpg-node-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--teal)" />
          <stop offset="100%" stopColor="var(--primary)" />
        </radialGradient>
      </defs>
      <g opacity="0.55">
        <circle cx="200" cy="240" r="172" fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="5 7" />
        <circle cx="200" cy="240" r="120" fill="none" stroke="var(--border)" strokeWidth="1" />
        <path d="M28 240 H372 M200 68 V412" stroke="var(--border)" strokeWidth="1" />
        <path d="M145 185 L255 295 M255 185 L145 295" stroke="var(--border)" strokeWidth="1" />
      </g>
      <path
        d="M60 370 L150 318 L112 208 L224 148 L334 74"
        fill="none"
        stroke="url(#cpg-path-grad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1 14"
      />
      <circle cx="60" cy="370" r="23" fill="none" stroke="var(--teal)" strokeWidth="2" strokeDasharray="3 5" />
      {STATIC_NODE_POINTS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="15" fill="url(#cpg-node-grad)" stroke="var(--surface)" strokeWidth="4" />
      ))}
    </svg>
  );
}

function CompassRing({ color }: { color: string }) {
  const ticks = useMemo(() => {
    const arr: { angle: number; cardinal: boolean }[] = [];
    for (let i = 0; i < 8; i++) {
      arr.push({ angle: (i * Math.PI) / 4, cardinal: i % 2 === 0 });
    }
    return arr;
  }, []);

  return (
    <group>
      <mesh>
        <torusGeometry args={[2.55, 0.02, 12, 96]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
      <mesh>
        <torusGeometry args={[1.75, 0.014, 12, 96]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
      {ticks.map(({ angle, cardinal }) => (
        <mesh
          key={angle}
          position={[Math.cos(angle) * 2.55, Math.sin(angle) * 2.55, 0]}
          rotation={[0, 0, angle - Math.PI / 2]}
        >
          <boxGeometry args={[0.05, cardinal ? 0.3 : 0.16, 0.05]} />
          <meshBasicMaterial color={color} transparent opacity={cardinal ? 0.55 : 0.3} />
        </mesh>
      ))}
    </group>
  );
}

function PathwayNode({
  position,
  index,
  colors,
}: {
  position: [number, number, number];
  index: number;
  colors: ThemeColors;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const base = useMemo(() => new THREE.Color(colors.primary), [colors]);
  const active = useMemo(() => new THREE.Color(colors.teal), [colors]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const start = (index * (MILESTONE_PERIOD / MILESTONE_COUNT)) % MILESTONE_PERIOD;
    const raw = (t - start) / 1.1;
    const p = Math.min(Math.max(raw, 0), 1);
    const smooth = p * p * (3 - 2 * p);

    if (matRef.current) {
      matRef.current.color.copy(base).lerp(active, smooth);
      matRef.current.emissive.copy(active).multiplyScalar(0.5 * smooth + 0.06);
    }
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + 0.22 * Math.sin(Math.min(p * Math.PI, Math.PI)));
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.24, 32, 32]} />
      <meshStandardMaterial ref={matRef} color={colors.primary} emissive={colors.teal} emissiveIntensity={0.15} />
    </mesh>
  );
}

function PulseDot({ curve, color }: { curve: THREE.CatmullRomCurve3; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = (state.clock.elapsedTime * 0.07) % 1;
    if (ref.current) {
      ref.current.position.copy(curve.getPointAt(t));
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.09, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function CompassScene({ colors }: { colors: ThemeColors }) {
  const group = useRef<THREE.Group>(null);
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(NODE_POINTS.map((p) => new THREE.Vector3(p[0], p[1], p[2]))),
    []
  );

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 9]} intensity={1.6} />
      <group ref={group}>
        <CompassRing color={colors.ring} />
        <Line points={NODE_POINTS} color={colors.path} lineWidth={2.5} transparent opacity={0.9} />
        {NODE_POINTS.map((p, i) => (
          <PathwayNode key={i} position={p} index={i} colors={colors} />
        ))}
        <PulseDot curve={curve} color={colors.teal} />
        <mesh>
          <sphereGeometry args={[0.3, 24, 24]} />
          <meshStandardMaterial color={colors.primary} emissive={colors.teal} emissiveIntensity={0.45} />
        </mesh>
        <pointLight color={colors.teal} intensity={2.5} distance={8} decay={2} />
        <Sparkles count={42} scale={[6.5, 4.5, 2.2]} size={1.8} speed={0.35} opacity={0.45} color={colors.sparkle} />
      </group>
    </>
  );
}

function PathwayOverlays({ colors, reduced }: { colors: ThemeColors; reduced: boolean }) {
  return (
    <>
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-2 text-xs font-medium text-foreground shadow-subtle backdrop-blur">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
        </span>
        You are here
      </div>
      <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-2 text-xs font-medium text-foreground shadow-subtle backdrop-blur">
        <Flag className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        Destination · Data Analyst
      </div>
      <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-center gap-1.5">
        {MILESTONE_LABELS.map((label, i) => (
          <span
            key={label}
            className="flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-subtle backdrop-blur"
          >
            {reduced ? (
              <span className="h-2 w-2 rounded-full bg-teal" />
            ) : (
              <motion.span
                className="h-2 w-2 rounded-full"
                animate={{
                  backgroundColor: [colors.primary, colors.primary, colors.teal, colors.teal, colors.primary],
                }}
                transition={{
                  duration: MILESTONE_PERIOD,
                  times: [
                    0,
                    i / MILESTONE_COUNT,
                    Math.min(i / MILESTONE_COUNT + 0.12, 0.97),
                    0.97,
                    1,
                  ],
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
            {label}
          </span>
        ))}
      </div>
    </>
  );
}

export function CompassCanvas() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMedia("(min-width: 1024px)");
  const reduced = useMedia("(prefers-reduced-motion: reduce)");

  useEffect(() => setMounted(true), []);

  const themeKey = mounted && resolvedTheme === "dark" ? "dark" : "light";
  const colors = THEME_COLORS[themeKey];
  const showCanvas = mounted && isDesktop && !reduced;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary-soft/80 via-surface to-teal-soft/50 shadow-card">
      <div className="relative aspect-square w-full lg:aspect-[5/6]">
        {showCanvas ? (
          <Suspense fallback={<StaticPathway />}>
            <div className="absolute inset-0">
              <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, 8.6], fov: 42 }}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                style={{ pointerEvents: "none" }}
                aria-label="Animated 3D career pathway showing progress from your goal through skills, projects and experience to your career destination"
                role="img"
              >
                <CompassScene colors={colors} />
              </Canvas>
            </div>
          </Suspense>
        ) : (
          <StaticPathway />
        )}
        <PathwayOverlays colors={colors} reduced={reduced} />
      </div>
    </div>
  );
}