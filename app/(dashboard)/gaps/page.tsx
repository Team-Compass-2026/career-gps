"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, MessageCircle, Target } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PageHeader } from "@/components/layout/page-header"
import { cn } from "@/lib/utils"

type GapStatus = "on-track" | "partial" | "missing"

type SkillGap = {
  skill: string
  note: string
  current: string
  target: string
  progress: number
  status: GapStatus
  badge: string
}

const gaps: SkillGap[] = [
  {
    skill: "SQL",
    note: "Almost there",
    current: "Beginner",
    target: "Intermediate",
    progress: 40,
    status: "partial",
    badge: "Close the gap",
  },
  {
    skill: "Python",
    note: "Needs work",
    current: "None",
    target: "Intermediate",
    progress: 0,
    status: "missing",
    badge: "Start now",
  },
  {
    skill: "Data Visualization",
    note: "New skill",
    current: "None",
    target: "Beginner",
    progress: 0,
    status: "missing",
    badge: "Start now",
  },
  {
    skill: "Statistics",
    note: "On track",
    current: "Beginner",
    target: "Intermediate",
    progress: 50,
    status: "on-track",
    badge: "On track",
  },
]

const statusStyles: Record<GapStatus, { bar: string; badge: string }> = {
  "on-track": { bar: "bg-teal", badge: "bg-teal-soft text-teal" },
  partial: { bar: "bg-amber", badge: "bg-amber-soft text-amber" },
  missing: { bar: "bg-muted-foreground", badge: "bg-muted text-muted-foreground" },
}

export default function SkillGapsPage() {
  const onTrack = gaps.filter((gap) => gap.status === "on-track").length
  const toFocus = gaps.length - onTrack

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <PageHeader
          title="Skill Gaps"
          description="What stands between you and Data Analyst — and how to close each gap."
          actions={
            <>
              <Badge variant="outline" className="h-6 px-2.5">
                Sample data
              </Badge>
              <Button variant="outline" render={<Link href="/coach" />} className="h-11">
                <MessageCircle aria-hidden="true" />
                Talk to a Mentor
              </Button>
              <Button render={<Link href="/roadmap" />} className="h-11">
                Open Roadmap
                <ArrowRight aria-hidden="true" />
              </Button>
            </>
          }
        />

        <Alert>
          <Target aria-hidden="true" />
          <AlertTitle>
            {gaps.length} gaps found · {onTrack} on track · {toFocus} to focus on
          </AlertTitle>
          <AlertDescription>
            Your closest gaps are SQL and Statistics. Start with Python — it&apos;s the biggest
            missing piece for Data Analyst roles.
          </AlertDescription>
        </Alert>

        <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card shadow-card">
          {gaps.map((gap) => (
            <div
              key={gap.skill}
              className="grid gap-4 px-5 py-5 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_auto] md:items-center"
            >
              <div>
                <h2 className="text-base font-bold text-foreground">{gap.skill}</h2>
                <p className="mt-0.5 text-sm text-muted-foreground">{gap.note}</p>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="font-medium text-muted-foreground">
                    {gap.current} <span aria-hidden="true">→</span> {gap.target}
                  </span>
                  <span className="font-semibold tabular-nums text-foreground">
                    {gap.progress}%
                  </span>
                </div>
                <div
                  role="progressbar"
                  aria-label={`${gap.skill} progress`}
                  aria-valuenow={gap.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted"
                >
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      statusStyles[gap.status].bar,
                    )}
                    style={{ width: `${gap.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 md:justify-end">
                <Badge className={cn("h-6 px-2.5", statusStyles[gap.status].badge)}>
                  {gap.badge}
                </Badge>
                <Button variant="outline" size="sm" render={<Link href="/coach" />} className="h-10">
                  <BookOpen aria-hidden="true" />
                  Resources
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}