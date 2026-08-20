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
  Flag,
  FolderKanban,
  ListChecks,
  Route,
  Sparkles,
} from "lucide-react"

import { PageHeader } from "@/components/layout/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useOnboarding } from "@/lib/onboarding-store"
import {
  getCareer,
  getRecommendedCareers,
  getRoadmap,
  type RoadmapMilestone,
} from "@/lib/careers-data"

type MilestoneStatus = "complete" | "up-next" | "future"

const statusLabels: Record<MilestoneStatus, string> = {
  complete: "Complete",
  "up-next": "Up next",
  future: "Future",
}

const statusStyles: Record<MilestoneStatus, { circle: string; badge: string }> = {
  complete: {
    circle: "bg-teal-soft text-teal ring-1 ring-teal/50",
    badge: "bg-teal-soft text-teal",
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

const phaseIcons: Record<string, LucideIcon> = {
  Foundations: BookOpen,
  "Core skills": Code,
  "Portfolio & applications": FolderKanban,
}

function milestoneIcon(milestone: RoadmapMilestone): LucideIcon {
  if (milestone.title.startsWith("Start applying")) return Briefcase
  return phaseIcons[milestone.phase] ?? Route
}

export default function RoadmapPage() {
  const { state, toggleMilestone } = useOnboarding()

  const hasProfile =
    state.profile.skills.length > 0 ||
    state.profile.targetRole !== "" ||
    state.profile.industry !== "" ||
    state.profile.education !== ""

  const selected = state.selectedCareerSlug ? getCareer(state.selectedCareerSlug) : null
  const firstRecommendation = hasProfile ? getRecommendedCareers(state.profile)[0]?.career : null
  const activeCareer = selected ?? firstRecommendation ?? null

  if (!hasProfile || !activeCareer) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl space-y-8">
          <PageHeader
            title="Your Roadmap"
            description="From where you are to your destination — one milestone at a time."
          />
          <Card>
            <CardContent className="flex flex-col items-center gap-4 px-6 py-14 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Route className="size-7" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-foreground">No destination set yet</h2>
                <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
                  Tell us where you are, then choose a path — we&apos;ll draw the route to
                  your first milestone.
                </p>
              </div>
              <Button render={<Link href="/profile" />} className="h-11">
                Build your profile
                <Compass aria-hidden="true" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const roadmap = getRoadmap(activeCareer)
  const allMilestones = roadmap.flatMap((phase) => phase.milestones)
  const completedCount = allMilestones.filter((milestone) =>
    state.completedMilestones.includes(milestone.id),
  ).length
  const progress = Math.round((completedCount / allMilestones.length) * 100)
  const nextMilestone =
    allMilestones.find((milestone) => !state.completedMilestones.includes(milestone.id)) ?? null
  const doneIds = new Set(state.completedMilestones)

  function handleToggle(milestone: RoadmapMilestone) {
    const completing = !doneIds.has(milestone.id)
    toggleMilestone(milestone.id)
    if (completing) {
      toast.success("Milestone marked complete — nice work!")
    } else {
      toast("Milestone reopened — keep going.")
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <PageHeader
          title="Your Roadmap"
          description={`From where you are to ${activeCareer.title} — one milestone at a time.`}
          actions={
            <>
              <Badge variant="outline" className="h-6 px-2.5">
                Target: {activeCareer.title}
              </Badge>
              <Badge variant="outline" className="h-6 px-2.5 text-muted-foreground">
                {activeCareer.estimatedTime} typical route
              </Badge>
            </>
          }
        />

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ListChecks className="size-4 text-primary" aria-hidden="true" />
              <h2 className="text-sm font-semibold text-foreground">Progress</h2>
            </div>
            <span className="text-sm text-muted-foreground">
              {completedCount} of {allMilestones.length} milestones complete
            </span>
          </div>
          <Progress
            value={progress}
            aria-label={`Roadmap progress: ${completedCount} of ${allMilestones.length} milestones complete`}
            className="mt-3"
          />
        </Card>

        {nextMilestone ? (
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
                    {nextMilestone.title} — {nextMilestone.duration}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">{nextMilestone.description}</p>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <Button variant="outline" render={<Link href="/coach" />} className="h-11">
                  <Sparkles aria-hidden="true" />
                  Ask your coach
                </Button>
                <Button onClick={() => handleToggle(nextMilestone)} className="h-11">
                  <Check aria-hidden="true" />
                  Mark milestone complete
                </Button>
              </div>
            </div>
          </section>
        ) : (
          <section
            aria-labelledby="destination-heading"
            className="rounded-xl border border-teal/30 bg-teal-soft/50 p-4 shadow-card sm:p-6"
          >
            <div className="flex items-start gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-soft text-teal ring-1 ring-teal/50">
                <Flag className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-teal">
                  Destination reached
                </p>
                <h2 id="destination-heading" className="mt-1 text-lg font-bold text-foreground">
                  You&apos;ve completed every milestone on this route. 🎉
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Keep the momentum — start applying, or ask your coach what comes next.
                </p>
              </div>
            </div>
          </section>
        )}

        <div className="space-y-10">
          {roadmap.map((phase) => (
            <section key={phase.name} aria-labelledby={`phase-${phase.name}`}>
              <div className="flex items-center gap-2 px-1">
                <Route className="size-4 text-primary" aria-hidden="true" />
                <h2 id={`phase-${phase.name}`} className="text-base font-bold text-foreground">
                  {phase.name}
                </h2>
                <Badge variant="outline" className="h-6">
                  {phase.milestones.length} step{phase.milestones.length === 1 ? "" : "s"}
                </Badge>
              </div>
              <p className="mt-1 px-1 text-sm text-muted-foreground">{phase.description}</p>

              <ol className="mt-6 space-y-6">
                {phase.milestones.map((milestone, index) => {
                  const isDone = doneIds.has(milestone.id)
                  const isNext = nextMilestone?.id === milestone.id
                  const status: MilestoneStatus = isDone ? "complete" : isNext ? "up-next" : "future"
                  const Icon = milestoneIcon(milestone)
                  const isLast = index === phase.milestones.length - 1
                  const highlightConnector = status !== "future"

                  return (
                    <li
                      key={milestone.id}
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
                                status === "complete" ? "bg-teal" : "bg-primary",
                              )}
                            />
                          )}
                        </>
                      )}

                      <button
                        type="button"
                        onClick={() => handleToggle(milestone)}
                        aria-pressed={isDone}
                        aria-label={`${isDone ? "Mark as not complete" : "Mark complete"}: ${milestone.title}`}
                        className={cn(
                          "relative z-10 flex size-11 items-center justify-center rounded-full transition-transform outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:scale-105",
                          statusStyles[status].circle,
                        )}
                      >
                        {isDone ? (
                          <Check className="size-5" aria-hidden="true" />
                        ) : (
                          <Icon className="size-5" aria-hidden="true" />
                        )}
                      </button>

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
                          status === "up-next"
                            ? "border-primary/40 ring-1 ring-primary/20"
                            : status === "complete"
                              ? "border-teal/30"
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
                          <Badge className={cn("h-6 px-2.5", statusStyles[status].badge)}>
                            {statusLabels[status]}
                          </Badge>
                        </div>
                        <h3 className="mt-3 text-base font-bold text-foreground">
                          {milestone.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">{milestone.description}</p>
                        <span
                          className={cn(
                            "mt-3 inline-flex items-center gap-1 text-xs font-medium",
                            isDone ? "text-teal" : "text-primary",
                          )}
                        >
                          {isDone ? (
                            <>
                              <Check className="size-3.5" aria-hidden="true" />
                              Completed
                            </>
                          ) : (
                            <>
                              <Check className="size-3.5" aria-hidden="true" />
                              Click to mark complete
                            </>
                          )}
                        </span>
                      </motion.div>
                    </li>
                  )
                })}
              </ol>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}