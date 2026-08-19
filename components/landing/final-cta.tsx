"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, MessagesSquare } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { useState, type CSSProperties, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  const handleSpot = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const spotStyle = { "--spot-x": `${spot.x}%`, "--spot-y": `${spot.y}%` } as CSSProperties;

  return (
    <section className="py-24 md:py-28">
      <div className="container-career">
        <MotionConfig reducedMotion="user">
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] as const }}
            className="relative overflow-hidden rounded-3xl border border-border shadow-card"
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <Image
                src="/images/mentor-session.jpg"
                alt="A mentor and student mapping out a career plan together"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background/90" />
              <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary-soft/70 blur-3xl" />
              <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-teal-soft/60 blur-3xl" />
            </div>
            <div className="relative px-6 py-16 text-center md:py-24">
              <Compass className="absolute -right-16 -top-16 h-64 w-64 text-primary/10" aria-hidden="true" />
              <div className="relative mx-auto max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Your next step starts here
                </p>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                  Ready to find your path?
                </h2>
                <p className="mt-4 text-lg text-balance text-muted-foreground">
                  We stay with you until you do it.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
                      onMouseMove={handleSpot}
                      style={spotStyle}
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
                    render={<Link href="/coach" />}
                    nativeButton={false}
                    variant="outline"
                    className="h-12 rounded-2xl px-8 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated active:scale-95"
                  >
                    <span className="relative z-10 inline-flex items-center gap-2">
                      Talk to a coach
                      <MessagesSquare
                        className="size-5 transition-transform duration-300 group-hover/button:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </MotionConfig>
      </div>
    </section>
  );
}