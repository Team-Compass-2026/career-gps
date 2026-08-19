"use client";

import { motion, MotionConfig } from "motion/react";
import { Navigation, RefreshCw, Route } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const BENEFITS = [
  {
    icon: Route,
    title: "Know Your Path",
    copy: "Discover the skills and experience you actually need for your target career.",
    accent: "bg-primary-soft text-primary",
  },
  {
    icon: Navigation,
    title: "Know Your Next Move",
    copy: "Get personalized recommendations for what to learn, build and do next.",
    accent: "bg-teal-soft text-teal",
  },
  {
    icon: RefreshCw,
    title: "Track & Adapt",
    copy: "Mark milestones as you go; your roadmap recalculates as you grow.",
    accent: "bg-amber-soft text-amber",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="scroll-mt-24 py-24 md:py-28">
      <div className="container-career">
        <MotionConfig reducedMotion="user">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Why Career GPS</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Clarity at every step.</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Know where you are, where you&apos;re going, and what to do next—without the guesswork.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.2, 0.8, 0.2, 1] as const }}
                className="h-full"
              >
                <Card className="[--card-spacing:--spacing(6)] h-full rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated">
                  <div className="flex flex-col gap-5 px-(--card-spacing) pt-(--card-spacing)">
                    <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", benefit.accent)}>
                      <benefit.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-bold tracking-tight text-foreground">{benefit.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{benefit.copy}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </MotionConfig>
      </div>
    </section>
  );
}