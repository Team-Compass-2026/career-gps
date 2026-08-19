"use client";

import Image from "next/image";
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
    image: {
      src: "/images/team-discussion.jpg",
      alt: "A small group collaborating on the skills and experience their careers need",
    },
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
    image: {
      src: "/images/career-coaching.jpg",
      alt: "A career coach guiding a learner toward their next milestone",
    },
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
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Clarity at every step.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-balance text-muted-foreground">
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
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] as const }}
                className="h-full"
              >
                <Card className="group/card relative h-full overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated [--card-spacing:--spacing(0)]">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-primary via-primary to-teal opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
                  />
                  <div className="flex h-full flex-col">
                    {benefit.image && (
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <Image
                          src={benefit.image.src}
                          alt={benefit.image.alt}
                          width={1600}
                          height={900}
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col gap-5 px-6 pb-6 pt-6">
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover/card:scale-110",
                          benefit.accent
                        )}
                      >
                        <benefit.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-bold tracking-tight text-foreground">{benefit.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">{benefit.copy}</p>
                      </div>
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