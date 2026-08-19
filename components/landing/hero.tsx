"use client";

import Link from "next/link";
import { ArrowRight, Check, Compass } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { Button } from "@/components/ui/button";
import { CompassCanvas } from "@/components/landing/compass-canvas";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] as const },
  },
};

const TRUST_POINTS = ["Personalized to your goals", "Free to start", "Adapts as you grow"];

export function Hero() {
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
              className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Stop guessing.{" "}
              <span className="bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                Start building your career.
              </span>
            </motion.h1>
            <motion.p variants={item} className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Your personalized career pathway—from where you are today to where you want to be.
            </motion.p>
            <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                render={<Link href="/sign-up" />}
                nativeButton={false}
                className="h-12 rounded-2xl px-8 text-base font-semibold shadow-elevated transition-all duration-300 hover:-translate-y-0.5 hover:shadow-floating"
              >
                Build My Career Pathway
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Button
                render={<Link href="#how-it-works" />}
                nativeButton={false}
                variant="outline"
                className="h-12 rounded-2xl px-8 text-base font-semibold"
              >
                See How It Works
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
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