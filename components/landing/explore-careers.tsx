"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, BrainCircuit, Code2, Megaphone, Palette, PenTool } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { cn } from "@/lib/utils";

const CAREERS = [
  {
    icon: BarChart3,
    title: "Data Analyst",
    industry: "Data & Analytics",
    demand: "High demand",
    demandTone: "bg-teal-soft text-teal",
    iconTone: "bg-primary-soft text-primary",
    summary: "Turn numbers into decisions with SQL, Python, and clear dashboards.",
  },
  {
    icon: PenTool,
    title: "UX Designer",
    industry: "Design",
    demand: "Growing demand",
    demandTone: "bg-amber-soft text-amber",
    iconTone: "bg-teal-soft text-teal",
    summary: "Shape products people love—from research to polished interfaces.",
  },
  {
    icon: Code2,
    title: "Software Engineer",
    industry: "Technology",
    demand: "High demand",
    demandTone: "bg-teal-soft text-teal",
    iconTone: "bg-primary-soft text-primary",
    summary: "Build the apps and systems the world runs on, one feature at a time.",
  },
  {
    icon: BrainCircuit,
    title: "Data Scientist",
    industry: "Data & Analytics",
    demand: "High demand",
    demandTone: "bg-teal-soft text-teal",
    iconTone: "bg-teal-soft text-teal",
    summary: "Use statistics and machine learning to find answers hidden in data.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketer",
    industry: "Marketing",
    demand: "Growing demand",
    demandTone: "bg-amber-soft text-amber",
    iconTone: "bg-amber-soft text-amber",
    summary: "Reach the right audience with campaigns that build and convert.",
  },
  {
    icon: Palette,
    title: "Graphic Designer",
    industry: "Design",
    demand: "Steady demand",
    demandTone: "bg-primary-soft text-primary",
    iconTone: "bg-primary-soft text-primary",
    summary: "Make ideas visual—brand, print, and digital design that stands out.",
  },
];

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] as const },
  },
};

export function ExploreCareers() {
  return (
    <section id="explore" className="scroll-mt-24 py-24 md:py-28">
      <div className="container-career">
        <MotionConfig reducedMotion="user">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Explore careers</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Where could you go next?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-balance text-muted-foreground">
              A few starting points to consider. Open any path to see what it asks of you and where it leads.
            </p>
          </motion.div>

          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {CAREERS.map((career) => (
              <motion.div key={career.title} variants={cardVariants} className="h-full">
                <div className="group/career relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated active:scale-[0.98]">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary to-teal opacity-0 transition-opacity duration-300 group-hover/career:opacity-100"
                  />
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover/career:scale-110",
                        career.iconTone
                      )}
                    >
                      <career.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                      {career.industry}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold tracking-tight text-foreground">{career.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{career.summary}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                        career.demandTone
                      )}
                    >
                      {career.demand}
                    </span>
                    <Link
                      href="/recommend"
                      className="inline-flex items-center gap-1 rounded-lg text-sm font-semibold text-primary transition-colors hover:text-primary-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      Explore
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover/career:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </MotionConfig>
      </div>
    </section>
  );
}