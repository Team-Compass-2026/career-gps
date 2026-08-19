"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { toast } from "sonner"
import type { LucideIcon } from "lucide-react"
import {
  BookOpen,
  Briefcase,
  Check,
  Clock,
  Code,
  Compass,
  Database,
  Flag,
  FolderKanban,
  ListChecks,
  Route,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PageHeader } from "@/components/layout/page-header"
import { cn } from "@/lib/utils"

type MilestoneStatus = "complete" | "in-progress" | "up-next" | "future"

type Milestone = {
  phase: string
  title: string
  description: string
  duration: string
  status: MilestoneStatus
  icon: LucideIcon
}

const statusLabels: Record<MilestoneStatus, string> = {
  complete: "Complete",
  "in-progress": "In progress",
  "up-next": "Up next",
  future: "Future",
}

const statusStyles: Record<MilestoneStatus, { circle: string; badge: string }> = {
  complete: {
    circle: "bg-teal-soft text-teal ring-1 ring-teal/50",
    badge: "bg-teal-soft text-teal",
  },
  "in-progress": {
    circle: "bg-primary-soft text-primary ring-1 ring-primary/50",
    badge: "bg-primary-soft text-primary",
  },
  "up-next": {
    circle: "bg-amber-soft text-amber ring-1 ring-amber/50",
    badge: "bg-amber-soft text-amber",
  },
  future: {
    circle: "bg-muted text-muted-foreground ring-1 ring-border",
    badge: "bg-muted text-muted-foreground",
  },
}

const milestones: Milestone[] = [
  {
    phase: "Foundation",
    title: "Learn SQL essentials",
    description: "Master SELECT, JOINs, and aggregations on real datasets.",
    duration: "2 weeks",
    status: "complete",
    icon: Database,
  },
  {
    phase: "Core skills",
    title: "Build Python fundamentals",
    description: "Pandas and plotting — your daily toolkit as an analyst.",
    duration: "4 weeks",
    status: "in-progress",
    icon: Code,
  },
  {
    phase: "Portfolio",
    title: "Ship 2 analysis projects",
    description: "Turn messy data into clear stories recruiters can see.",
    duration: "6 weeks",
    status: "up-next",
    icon: FolderKanban,
  },
  {
    phase: "Experience",
    title: "Land a data internship",
    description: "Apply what you built and aim for a real analytics team.",
    duration: "2–3 months",
    status: "future",
    icon: Briefcase,
  },
  {
    phase: "Specialize",
    title: "Pick a domain",
    description: "Marketing, finance, or product — choose where you go deep.",
    duration: "1 month",
    status: "future",
    icon: Compass,
  },
  {
    phase: "Career",
    title: "Start as Data Analyst",
    description: "Your destination: a role, a team, and a growth path.",
    duration: "6 months",
    status: "future",
    icon: Flag,
  },
]

export default function RoadmapPage() {
  const completed = milestones.filter((m) => m.status === "complete").length
  const next = milestones.find((m) => m.status === "in-progress") ?? milestones[1]
  const progress = Math.round((completed / milestones.length) * 100)

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <PageHeader
          title="Your Roadmap"
          description="From where you are to Data Analyst — one milestone at a time."
          actions={
            <Badge variant="outline" className="h-6 px-2.5">
              Sample data
            </Badge>
          }
        />

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ListChecks className="size-4 text-primary" aria-hidden="true" />
              <h2 className="text-sm font-semibold text-foreground">Progress</h2>
            </div>
            <span className="text-sm text-muted-foreground">
              {completed} of {milestones.length} milestones complete
            </span>
          </div>
          <Progress
            value={progress}
            aria-label={`Roadmap progress: ${completed} of ${milestones.length} milestones complete`}
            className="mt-3"
          />
        </Card>

        <section
          aria-labelledby="next-step-heading"
          className="rounded-xl border border-primary/30 bg-primary-soft p-4 shadow-card sm:p-6"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary ring-1 ring-primary/40">
                <Code className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Next up
                </p>
                <h2 id="next-step-heading" className="mt-1 text-lg font-bold text-foreground">
                  {next.title} — {next.duration}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{next.description}</p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <Button variant="outline" render={<Link href="/coach" />} className="h-11">
                <BookOpen aria-hidden="true" />
                Find Resources
              </Button>
              <Button
                onClick={() => toast.success("Milestone marked complete — nice work!")}
                className="h-11"
              >
                <Check aria-hidden="true" />
                Mark Complete
              </Button>
            </div>
          </div>
        </section>

        <section aria-labelledby="milestones-heading">
          <div className="flex items-center gap-2 px-1">
            <Route className="size-4 text-primary" aria-hidden="true" />
            <h2 id="milestones-heading" className="text-base font-bold text-foreground">
              Milestones
            </h2>
            <Badge variant="outline" className="h-6">
              {milestones.length} steps
            </Badge>
          </div>

          <ol className="mt-6 space-y-6">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon
              const isLast = index === milestones.length - 1
              const highlightConnector =
                milestone.status === "complete" || milestone.status === "in-progress"

              return (
                <li
                  key={milestone.phase}
                  className="relative grid grid-cols-[44px_minmax(0,1fr)] gap-4"
                >
                  {!isLast && (
                    <>
                      <div
                        aria-hidden="true"
                        className="absolute left-[21px] top-11 h-[calc(100%+24px)] w-0.5 rounded-full bg-border"
                      />
                      {highlightConnector && (
                        <motion.div
                          aria-hidden="true"
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{
                            duration: 0.6,
                            ease: "easeInOut",
                            delay: 0.35 + index * 0.15,
                          }}
                          style={{ transformOrigin: "top" }}
                          className={cn(
                            "absolute left-[21px] top-11 h-[calc(100%+24px)] w-0.5 rounded-full",
                            milestone.status === "complete" ? "bg-teal" : "bg-primary",
                          )}
                        />
                      )}
                    </>
                  )}

                  <div
                    className={cn(
                      "relative z-10 flex size-11 items-center justify-center rounded-full",
                      statusStyles[milestone.status].circle,
                    )}
                  >
                    {milestone.status === "complete" ? (
                      <Check className="size-5" aria-hidden="true" />
                    ) : (
                      <Icon className="size-5" aria-hidden="true" />
                    )}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                      delay: Math.min(index * 0.05, 0.25),
                    }}
                    className={cn(
                      "rounded-xl border bg-card p-4 shadow-card sm:p-5",
                      milestone.status === "up-next"
                        ? "border-primary/40 ring-1 ring-primary/20"
                        : "border-border",
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {milestone.phase}
                      </span>
                      <Badge
                        variant="outline"
                        className="ml-auto h-6 bg-transparent text-muted-foreground"
                      >
                        <Clock className="size-3" aria-hidden="true" />
                        {milestone.duration}
                      </Badge>
                      <Badge className={cn("h-6 px-2.5", statusStyles[milestone.status].badge)}>
                        {statusLabels[milestone.status]}
                      </Badge>
                    </div>
                    <h3 className="mt-3 text-base font-bold text-foreground">{milestone.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{milestone.description}</p>
                  </motion.div>
                </li>
              )
            })}
          </ol>
        </section>
      </div>
    </div>
  )
}