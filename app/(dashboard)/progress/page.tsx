"use client"

import { useEffect, useState } from "react"
import type { FormEvent } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { toast } from "sonner"
import type { LucideIcon } from "lucide-react"
import {
  ArrowRight,
  Check,
  Clock,
  Compass,
  MessageCircle,
  Route,
  Sparkles,
  TrendingUp,
} from "lucide-react"

import { PageHeader } from "@/components/layout/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useOnboarding } from "@/lib/onboarding-store"
import { getProgressStats } from "@/lib/careers-data"

function StatCard({
  icon: Icon,
  label,
  value,
  percent,
  barClass,
  hint,
}: {
  icon: LucideIcon
  label: string
  value: string
  percent: number
  barClass: string
  hint?: string
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <CardTitle className="text-sm">{label}</CardTitle>
          </div>
          <span className="text-2xl font-extrabold tabular-nums text-foreground">{value}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div
          role="progressbar"
          aria-label={`${label} progress`}
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 w-full overflow-hidden rounded-full bg-muted"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${percent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={cn("h-full rounded-full", barClass)}
          />
        </div>
        {hint ? <p className="mt-2 text-xs text-muted-foreground">{hint}</p> : null}
      </CardContent>
    </Card>
  )
}

export default function ProgressPage() {
  const { state, setLoggedHours } = useOnboarding()
  const [hours, setHours] = useState(state.loggedHours)

  const hasProfile =
    state.profile.skills.length > 0 ||
    state.profile.targetRole !== "" ||
    state.profile.industry !== "" ||
    state.profile.education !== ""

  const stats = getProgressStats(state)
  const career = stats.career

  useEffect(() => {
    setHours(state.loggedHours)
  }, [state.loggedHours])

  if (!hasProfile) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl space-y-8">
          <PageHeader
            title="My Progress"
            description="Your dashboard summary — skills, milestones and weekly momentum."
          />
          <Card>
            <CardContent className="flex flex-col items-center gap-4 px-6 py-14 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-primary-soft text-primary">
                <TrendingUp className="size-7" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-foreground">Set your starting point first</h2>
                <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
                  Once you build a profile and pick a path, this dashboard will track your
                  skills, milestones and weekly hours.
                </p>
              </div>
              <Button render={<Link href="/profile" />} className="h-11">
                Build your profile
                <ArrowRight aria-hidden="true" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!career) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl space-y-8">
          <PageHeader
            title="My Progress"
            description="Your dashboard summary — skills, milestones and weekly momentum."
          />
          <Card>
            <CardContent className="flex flex-col items-center gap-4 px-6 py-14 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Compass className="size-7" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-foreground">Pick a direction to track</h2>
                <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
                  Choose a recommended path and we&apos;ll start counting your milestones
                  and skill gains toward it.
                </p>
              </div>
              <Button render={<Link href="/recommend" />} className="h-11">
                See my recommendations
                <ArrowRight aria-hidden="true" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const target = state.profile.weeklyHours || 8
  const hoursPercent = Math.min(100, Math.round((state.loggedHours / target) * 100))
  const remainingSkills = stats.skillsTotal - stats.skillsGained.length
  const recentMilestones = stats.roadmap
    .flatMap((phase) => phase.milestones)
    .filter((milestone) => state.completedMilestones.includes(milestone.id))
    .slice(-3)

  function saveHours(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoggedHours(Math.max(0, Number(hours) || 0))
    toast.success("Weekly hours logged — keep the pace.")
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <PageHeader
          title="My Progress"
          description={`How far along the ${career.title} route you are — and what's next.`}
          actions={
            <Badge variant="outline" className="h-6 px-2.5">
              Target: {career.title}
            </Badge>
          }
        />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={TrendingUp}
            label="Career readiness"
            value={`${stats.overallPercent}%`}
            percent={stats.overallPercent}
            barClass="bg-gradient-to-r from-primary to-teal"
            hint="Fit % is guidance, not certainty."
          />
          <StatCard
            icon={Sparkles}
            label="Skills in place"
            value={`${stats.skillsGained.length}/${stats.skillsTotal}`}
            percent={stats.skillsPercent}
            barClass="bg-teal"
            hint={remainingSkills > 0 ? `${remainingSkills} skill${remainingSkills === 1 ? "" : "s"} still to learn` : "All required skills covered"}
          />
          <StatCard
            icon={Route}
            label="Milestones"
            value={`${stats.milestonesDone}/${stats.milestonesTotal}`}
            percent={stats.roadmapPercent}
            barClass="bg-primary"
            hint={stats.nextMilestone ? `Next: ${stats.nextMilestone.title}` : "Route complete"}
          />
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary-soft text-primary">
                    <Clock className="size-4" aria-hidden="true" />
                  </span>
                  <CardTitle className="text-sm">Weekly hours</CardTitle>
                </div>
                <span className="text-2xl font-extrabold tabular-nums text-foreground">
                  {state.loggedHours}
                  <span className="text-sm font-medium text-muted-foreground">/{target}h</span>
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={saveHours} className="flex items-center gap-2">
                <Input
                  type="number"
                  min={0}
                  max={168}
                  value={hours}
                  onChange={(event) => setHours(Math.max(0, Number(event.target.value) || 0))}
                  aria-label="Hours logged this week"
                  className="h-10"
                />
                <Button type="submit" className="h-10 shrink-0">
                  Log
                </Button>
              </form>
              <div
                role="progressbar"
                aria-label="Weekly hours logged"
                aria-valuenow={hoursPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted"
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${hoursPercent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="h-full rounded-full bg-amber"
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {state.loggedHours >= target
                  ? "On or past target — nice pace."
                  : `${target - state.loggedHours} hrs to go this week.`}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-teal" aria-hidden="true" />
                <CardTitle className="text-sm">Skills gained</CardTitle>
              </div>
              <CardDescription>
                Required skills you already bring to {career.title}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {stats.skillsGained.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {stats.skillsGained.map((skill) => (
                    <Badge
                      key={skill}
                      className="h-7 gap-1 bg-teal-soft px-2.5 text-teal"
                    >
                      <Check className="size-3" aria-hidden="true" />
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No required skills on your list yet —{" "}
                  <Link
                    href="/gaps"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    see what to learn next
                  </Link>
                  .
                </p>
              )}
              {remainingSkills > 0 ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  {remainingSkills} skill{remainingSkills === 1 ? "" : "s"} still to learn —{" "}
                  <Link
                    href="/gaps"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    view your gaps
                  </Link>
                  .
                </p>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Route className="size-4 text-primary" aria-hidden="true" />
                <CardTitle className="text-sm">Recent milestones</CardTitle>
              </div>
              <CardDescription>
                {stats.nextMilestone
                  ? "Your next step is ready when you are."
                  : "Every milestone on this route is complete."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {stats.nextMilestone ? (
                <div className="rounded-lg border border-amber/30 bg-amber-soft/40 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber">
                    Next up
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {stats.nextMilestone.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {stats.nextMilestone.description}
                  </p>
                </div>
              ) : null}
              {recentMilestones.length > 0 ? (
                <ul className="mt-3 space-y-2">
                  {recentMilestones.map((milestone) => (
                    <li
                      key={milestone.id}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />
                      <span>
                        {milestone.title}
                        <span className="ml-1.5 text-xs text-muted-foreground/70">
                          · {milestone.phase}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No milestones marked yet — your roadmap is waiting.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button render={<Link href="/roadmap" />} className="h-11">
            Continue on your route
            <ArrowRight aria-hidden="true" />
          </Button>
          <Button variant="outline" render={<Link href="/coach" />} className="h-11">
            <MessageCircle aria-hidden="true" />
            Ask your coach
          </Button>
        </div>
      </div>
    </div>
  )
}