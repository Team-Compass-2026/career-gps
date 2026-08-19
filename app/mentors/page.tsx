"use client";

import Link from "next/link";
import { motion, MotionConfig } from "motion/react";
import { toast } from "sonner";
import {
  ArrowRight,
  BadgeCheck,
  Compass,
  MessageCircle,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MENTORS = [
  {
    name: "Priya Sharma",
    role: "Senior Data Analyst",
    org: "Nova Analytics",
    initials: "PS",
    match: 92,
    focus: "SQL, Python, and analytics — she has guided 40+ students into data roles.",
    ringClass: "ring-teal",
    fallbackClass: "bg-teal-soft text-teal",
  },
  {
    name: "Marcus Chen",
    role: "Data Science Mentor",
    org: "FinBright",
    initials: "MC",
    match: 88,
    focus: "Career switches into data science and machine learning fundamentals.",
    ringClass: "ring-primary",
    fallbackClass: "bg-primary-soft text-primary",
  },
  {
    name: "Daniel Kim",
    role: "Frontend Engineer",
    org: "Streamline",
    initials: "DK",
    match: 86,
    focus: "JavaScript, React, and building a portfolio that actually gets noticed.",
    ringClass: "ring-primary",
    fallbackClass: "bg-primary-soft text-primary",
  },
  {
    name: "Amara Okafor",
    role: "Analytics Lead",
    org: "CarePath Health",
    initials: "AO",
    match: 84,
    focus: "Healthcare analytics and leading your first real-world project.",
    ringClass: "ring-amber",
    fallbackClass: "bg-amber-soft text-amber",
  },
  {
    name: "Sofia Reyes",
    role: "Product Manager",
    org: "LaunchPad",
    initials: "SR",
    match: 81,
    focus: "Product thinking, case interviews, and landing your first PM role.",
    ringClass: "ring-teal",
    fallbackClass: "bg-teal-soft text-teal",
  },
  {
    name: "Ethan Brooks",
    role: "UX/UI Designer",
    org: "Northwind Studio",
    initials: "EB",
    match: 79,
    focus: "Design systems, UX portfolios, and creative career pivots.",
    ringClass: "ring-amber",
    fallbackClass: "bg-amber-soft text-amber",
  },
];

type Mentor = (typeof MENTORS)[number];

const MATCH_STEPS = [
  {
    icon: Compass,
    title: "Tell us where you are",
    copy: "Your profile and career goal shape who we match you with.",
    accent: "bg-primary-soft text-primary",
  },
  {
    icon: Star,
    title: "We match you",
    copy: "Fit scores compare experience, expertise, and your target path.",
    accent: "bg-teal-soft text-teal",
  },
  {
    icon: MessageCircle,
    title: "Learn from the journey",
    copy: "Real advice from people who have already walked your route.",
    accent: "bg-amber-soft text-amber",
  },
];

function MentorCard({ mentor, index }: { mentor: Mentor; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] as const }}
      className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated"
    >
      <div className="flex items-start justify-between gap-3">
        <Avatar
          className={cn(
            "h-14 w-14 ring-2 ring-offset-2 ring-offset-background",
            mentor.ringClass,
          )}
        >
          <AvatarFallback className={cn("text-base font-semibold", mentor.fallbackClass)}>
            {mentor.initials}
          </AvatarFallback>
        </Avatar>
        <Badge variant="secondary" className="bg-teal-soft text-teal">
          {mentor.match}% match
        </Badge>
      </div>
      <div>
        <h3 className="text-lg font-bold tracking-tight text-foreground">{mentor.name}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {mentor.role} · {mentor.org}
        </p>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{mentor.focus}</p>
      <div className="mt-auto flex items-center gap-2 pt-1">
        <Button
          variant="outline"
          className="h-11 flex-1 rounded-xl"
          onClick={() => toast("Mentor matching is coming soon 🧭")}
        >
          View profile
        </Button>
        <Button
          className="h-11 flex-1 rounded-xl"
          onClick={() => toast("Mentor matching is coming soon 🧭")}
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Connect
        </Button>
      </div>
    </motion.div>
  );
}

export default function MentorsPage() {
  return (
    <>
      <SiteHeader />
      <main className="container-career py-16 md:py-24">
        <MotionConfig reducedMotion="user">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-subtle">
              <Users className="h-4 w-4 text-primary" aria-hidden="true" />
              Mentors
            </p>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Real people on{" "}
              <span className="bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                your route.
              </span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Get matched with experienced professionals who understand your career journey — and
              who have already walked the path you&apos;re on.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] as const }}
            className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <Badge className="gap-1.5 bg-teal-soft text-teal">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
              {MENTORS.length} mentors
            </Badge>
            <Badge variant="outline" className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
              4 industries
            </Badge>
            <Badge variant="outline" className="gap-1.5">
              <Star className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
              Matched to your goals
            </Badge>
          </motion.div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {MENTORS.map((mentor, index) => (
              <MentorCard key={mentor.name} mentor={mentor} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const }}
            className="mx-auto mt-20 max-w-2xl text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              How matching works
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Guidance from people who&apos;ve been there.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {MATCH_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: index * 0.1, ease: [0.2, 0.8, 0.2, 1] as const }}
                  className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-card"
                >
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", step.accent)}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.copy}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const }}
            className="relative mx-auto mt-20 max-w-3xl overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary-soft via-surface to-teal-soft px-6 py-12 text-center shadow-card"
          >
            <Compass className="absolute -right-12 -top-12 h-48 w-48 text-primary/10" aria-hidden="true" />
            <div className="relative mx-auto max-w-xl">
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Ready to find your mentor?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Build your profile and we&apos;ll match you with mentors who fit your goals and
                timeline.
              </p>
              <div className="mt-7">
                <Link href="/sign-up">
                  <Button className="h-12 rounded-2xl px-8 text-base font-semibold shadow-elevated transition-all duration-300 hover:-translate-y-0.5 hover:shadow-floating active:scale-95">
                    Build My Career Pathway
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </MotionConfig>
      </main>
      <SiteFooter />
    </>
  );
}