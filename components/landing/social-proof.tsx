"use client";

import { Compass, MapPinned, Route, Star } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { cn } from "@/lib/utils";

const STATS = [
  {
    icon: Compass,
    value: "30+",
    label: "career paths mapped",
    tone: "bg-primary-soft text-primary",
    numberTone: "text-primary",
  },
  {
    icon: Route,
    value: "1,200+",
    label: "learners guided",
    tone: "bg-teal-soft text-teal",
    numberTone: "text-teal",
  },
  {
    icon: MapPinned,
    value: "92%",
    label: "find their next step",
    tone: "bg-primary-soft text-primary",
    numberTone: "text-primary",
  },
  {
    icon: Star,
    value: "4.8",
    label: "average mentor rating",
    tone: "bg-amber-soft text-amber",
    numberTone: "text-teal",
    suffix: "★",
  },
];

export function SocialProof() {
  return (
    <section id="social-proof" className="py-16 md:py-20">
      <div className="container-career">
        <MotionConfig reducedMotion="user">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Proof in the journey</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              A path others have already walked.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-balance text-muted-foreground">
              Built around real career journeys—so the next step always feels possible.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] as const }}
            className="mt-12 rounded-3xl border border-border bg-surface-muted px-6 py-12 md:px-12"
          >
            <dl className="grid grid-cols-2 gap-10 lg:grid-cols-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] as const }}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl",
                      stat.tone
                    )}
                  >
                    <stat.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="flex flex-col gap-1">
                    <span className={cn("text-3xl font-extrabold tracking-tight sm:text-4xl", stat.numberTone)}>
                      {stat.value}
                      {stat.suffix && <span aria-hidden="true">{stat.suffix}</span>}
                    </span>
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>
        </MotionConfig>
      </div>
    </section>
  );
}