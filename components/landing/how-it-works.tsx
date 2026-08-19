"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";
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

export function HowItWorks() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const colors = mounted && resolvedTheme === "dark" ? NODE_COLORS.dark : NODE_COLORS.light;

  return (
    <section id="how-it-works" className="scroll-mt-24 bg-surface-muted/50 py-24 md:py-28">
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
                className="h-full w-full origin-top rounded-full bg-gradient-to-b from-primary to-teal opacity-90 transition-opacity duration-300 group-hover/stepper:opacity-100"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
            </div>
            <div
              className="absolute left-[12%] right-[12%] top-7 hidden h-0.5 rounded-full bg-border lg:block"
              aria-hidden="true"
            >
              <motion.div
                className="h-full w-full origin-left rounded-full bg-gradient-to-r from-primary via-primary to-teal opacity-90 transition-opacity duration-300 group-hover/stepper:opacity-100"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
            </div>

            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {STEPS.map((step, i) => (
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
                      initial={{
                        backgroundColor: colors.neutral,
                        borderColor: colors.neutralBorder,
                        color: colors.neutralText,
                        scale: 0.85,
                      }}
                      whileInView={{
                        backgroundColor: [colors.neutral, colors.blue, colors.teal],
                        borderColor: [colors.neutralBorder, colors.blue, colors.teal],
                        color: [colors.neutralText, colors.blueText, colors.tealText],
                        scale: 1,
                      }}
                      whileHover={{
                        backgroundColor: [colors.blue, colors.teal, colors.neutral],
                        borderColor: [colors.blue, colors.teal, colors.neutralBorder],
                        color: [colors.blueText, colors.tealText, colors.neutralText],
                        scale: 1.08,
                      }}
                      viewport={{ once: true, margin: "-20%" }}
                      transition={{
                        duration: 1.3,
                        times: [0, 0.35, 1],
                        ease: "easeInOut",
                        delay: i * 0.12,
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
              ))}
            </div>
          </div>
        </MotionConfig>
      </div>
    </section>
  );
}
