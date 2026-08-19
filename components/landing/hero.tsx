"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Compass } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { useState, type CSSProperties, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { CompassCanvas } from "@/components/landing/compass-canvas";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.98, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] as const },
  },
};

const TRUST_POINTS = ["Personalized to your goals", "Free to start", "Adapts as you grow"];

function useSpotlight() {
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const handlers = {
    onMouseMove: (e: MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setSpot({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    },
    style: { "--spot-x": `${spot.x}%`, "--spot-y": `${spot.y}%` } as CSSProperties,
  };
  return handlers;
}

export function Hero() {
  const spotlight = useSpotlight();

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary-soft blur-3xl" />
        <div className="absolute -bottom-48 -left-40 h-96 w-96 rounded-full bg-teal-soft/60 blur-3xl" />
      </div>
      <MotionConfig reducedMotion="user">
        <div className="container-career relative grid items-center gap-14 py-16 md:py-24 lg:grid-cols-2 lg:gap-12 lg:py-28">
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl">
            <motion.p
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-subtle"
            >
              <Compass className="h-4 w-4 text-primary" aria-hidden="true" />
              Your GPS for career decisions
            </motion.p>
            <motion.h1
              variants={item}
              className="mt-6 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              Stop guessing.{" "}
              <span className="bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                Start building your career.
              </span>
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-6 text-lg leading-relaxed text-balance text-muted-foreground sm:text-xl"
            >
              Your personalized career pathway—from where you are today to where you want to be.
            </motion.p>
            <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <motion.span
                  aria-hidden="true"
                  className="absolute -inset-1 rounded-[1.75rem] bg-primary/30 blur-lg motion-reduce:hidden"
                  animate={{ opacity: [0.4, 0.85, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <Button
                  render={<Link href="/sign-up" />}
                  nativeButton={false}
                  onMouseMove={spotlight.onMouseMove}
                  style={spotlight.style}
                  className="relative h-12 rounded-2xl px-8 text-base font-semibold shadow-elevated transition-all duration-300 hover:-translate-y-0.5 hover:shadow-floating active:scale-95"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_var(--spot-x)_var(--spot-y),rgba(255,255,255,0.25),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover/button:opacity-100"
                  />
                  <span className="relative z-10 inline-flex items-center gap-2">
                    Build My Career Pathway
                    <ArrowRight
                      className="size-5 transition-transform duration-300 group-hover/button:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Button>
              </div>
              <Button
                render={<Link href="#how-it-works" />}
                nativeButton={false}
                variant="outline"
                className="h-12 rounded-2xl px-8 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated active:scale-95"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  See How It Works
                  <ArrowRight
                    className="size-5 transition-transform duration-300 group-hover/button:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Button>
            </motion.div>
            <motion.ul
              variants={item}
              className="mt-10 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-6"
            >
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </motion.ul>
            <motion.div variants={item} className="mt-8">
              <div className="group flex items-center gap-4 rounded-2xl border border-border bg-card/80 p-3 pr-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elevated active:scale-[0.98]">
                <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src="/images/mentor-session.jpg"
                    alt="A mentor and student reviewing a career plan together"
                    width={1600}
                    height={723}
                    priority
                    sizes="144px"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    Guidance that keeps you moving
                  </p>
                  <p className="text-sm leading-snug text-muted-foreground">
                    Mentor check-ins on every step of your path.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.2, 0.8, 0.2, 1] as const }}
            className="relative"
          >
            <CompassCanvas />
          </motion.div>
        </div>
      </MotionConfig>
    </section>
  );
}
