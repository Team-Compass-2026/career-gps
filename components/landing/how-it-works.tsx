"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { useTheme } from "next-themes";

const STEPS = [
  { no: "01", title: "Assess", copy: "Tell us where you are.", href: "/profile" },
  { no: "02", title: "Navigate", copy: "Get your personalized career pathway.", href: "/recommend" },
  { no: "03", title: "Act", copy: "Take the right steps, one milestone at a time.", href: "/roadmap" },
  { no: "04", title: "Grow", copy: "Track your progress and get AI (and later human) guidance.", href: "/coach" },
];

const NODE_COLORS = {
  light: {
    neutral: "#F1F5F9",
    neutralBorder: "#CBD5E1",
    neutralText: "#475569",
    blue: "#2563EB",
    blueText: "#FFFFFF",
    teal: "#14B8A6",
    tealText: "#042F2E",
  },
  dark: {
    neutral: "#172033",
    neutralBorder: "#334155",
    neutralText: "#CBD5E1",
    blue: "#60A5FA",
    blueText: "#0B1120",
    teal: "#2DD4BF",
    tealText: "#042F2E",
  },
} as const;

type NodePalette = (typeof NODE_COLORS)[keyof typeof NODE_COLORS];

const STEP_START = [0, 0.2, 0.4, 0.6];

function hexToRgb(hex: string): [number, number, number] {
  const value = Number.parseInt(hex.replace("#", ""), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function mix(from: string, to: string, t: number): string {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

function clampPhase(value: number): number {
  return Math.min(2, Math.max(0, value));
}

function useStepActivation(
  progress: MotionValue<number>,
  start: number,
  paletteRef: RefObject<NodePalette>
) {
  const phase = useTransform(progress, [start, start + 0.15, start + 0.3], [0, 1, 2]);
  const backgroundColor = useTransform(phase, (v) => {
    const p = paletteRef.current;
    const t = clampPhase(v);
    return t <= 1 ? mix(p.neutral, p.blue, t) : mix(p.blue, p.teal, t - 1);
  });
  const borderColor = useTransform(phase, (v) => {
    const p = paletteRef.current;
    const t = clampPhase(v);
    return t <= 1 ? mix(p.neutralBorder, p.blue, t) : mix(p.blue, p.teal, t - 1);
  });
  const color = useTransform(phase, (v) => {
    const p = paletteRef.current;
    const t = clampPhase(v);
    return t <= 1 ? mix(p.neutralText, p.blueText, t) : mix(p.blueText, p.tealText, t - 1);
  });
  const scale = useTransform(phase, (v) => 0.9 + 0.1 * (clampPhase(v) / 2));
  return { backgroundColor, borderColor, color, scale };
}

export function HowItWorks() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion() === true;

  useEffect(() => setMounted(true), []);

  const palette = mounted && resolvedTheme === "dark" ? NODE_COLORS.dark : NODE_COLORS.light;
  const paletteRef = useRef<NodePalette>(palette);
  paletteRef.current = palette;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.4"],
  });

  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const step0 = useStepActivation(scrollYProgress, STEP_START[0], paletteRef);
  const step1 = useStepActivation(scrollYProgress, STEP_START[1], paletteRef);
  const step2 = useStepActivation(scrollYProgress, STEP_START[2], paletteRef);
  const step3 = useStepActivation(scrollYProgress, STEP_START[3], paletteRef);
  const stepActivations = [step0, step1, step2, step3];

  const lineStyleX = reduced ? { scaleX: 1 } : { scaleX: lineProgress };
  const lineStyleY = reduced ? { scaleY: 1 } : { scaleY: lineProgress };

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="scroll-mt-24 bg-surface-muted/50 py-24 md:py-28"
    >
      <div className="container-career">
        <MotionConfig reducedMotion="user">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">How it works</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              A pathway, not a maze.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Four simple steps from where you are today to where you want to be.
            </p>
          </motion.div>

          <div className="group/stepper relative mt-16">
            <div className="absolute bottom-7 left-7 top-7 w-0.5 rounded-full bg-border sm:hidden" aria-hidden="true">
              <motion.div
                style={lineStyleY}
                className="h-full w-full origin-top rounded-full bg-gradient-to-b from-primary to-teal opacity-90 transition-opacity duration-300 group-hover/stepper:opacity-100"
              />
            </div>
            <div
              className="absolute left-[12%] right-[12%] top-7 hidden h-0.5 rounded-full bg-border lg:block"
              aria-hidden="true"
            >
              <motion.div
                style={lineStyleX}
                className="h-full w-full origin-left rounded-full bg-gradient-to-r from-primary via-primary to-teal opacity-90 transition-opacity duration-300 group-hover/stepper:opacity-100"
              />
            </div>

            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {STEPS.map((step, i) => {
                const activation = stepActivations[i];
                return (
                  <motion.div
                    key={step.no}
                    initial={{ opacity: 0, y: 24, scale: 0.98, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.55, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] as const }}
                    className="relative -m-4 flex flex-col p-4 pl-16 sm:pl-0"
                  >
                    <div className="group flex w-full flex-col rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-card/70 hover:shadow-elevated active:scale-[0.98] lg:items-center">
                      <motion.div
                        className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border-2 text-lg font-bold sm:static"
                        style={
                          reduced
                            ? {
                                backgroundColor: palette.teal,
                                borderColor: palette.teal,
                                color: palette.tealText,
                                scale: 1,
                              }
                            : {
                                backgroundColor: activation.backgroundColor,
                                borderColor: activation.borderColor,
                                color: activation.color,
                                scale: activation.scale,
                              }
                        }
                        whileHover={{
                          backgroundColor: [palette.blue, palette.teal, palette.neutral],
                          borderColor: [palette.blue, palette.teal, palette.neutralBorder],
                          color: [palette.blueText, palette.tealText, palette.neutralText],
                          scale: 1.08,
                        }}
                      >
                        {step.no}
                      </motion.div>
                      <div className="mt-5 flex flex-col items-start gap-2 lg:items-center lg:text-center">
                        <h3 className="text-xl font-bold tracking-tight text-foreground">
                          <Link
                            href={step.href}
                            className="rounded transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {step.title}
                          </Link>
                        </h3>
                        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{step.copy}</p>
                        <Link
                          href={step.href}
                          className="mt-2 inline-flex items-center gap-1 rounded-lg text-sm font-semibold text-primary transition-colors hover:text-primary-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          Open {step.title}
                          <ArrowRight
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </MotionConfig>
      </div>
    </section>
  );
}