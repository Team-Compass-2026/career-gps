"use client";

import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="py-24 md:py-28">
      <div className="container-career">
        <MotionConfig reducedMotion="user">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] as const }}
            className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary-soft via-surface to-teal-soft px-6 py-16 text-center shadow-card md:py-24"
          >
            <Compass className="absolute -right-16 -top-16 h-64 w-64 text-primary/10" aria-hidden="true" />
            <div className="relative mx-auto max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Your next step starts here
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Ready to find your path?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">We stay with you until you do it.</p>
              <div className="mt-8">
                <Button
                  render={<Link href="/sign-up" />}
                  nativeButton={false}
                  className="h-12 rounded-2xl px-8 text-base font-semibold shadow-elevated transition-all duration-300 hover:-translate-y-0.5 hover:shadow-floating"
                >
                  Build My Career Pathway
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </motion.div>
        </MotionConfig>
      </div>
    </section>
  );
}