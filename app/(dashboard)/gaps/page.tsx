"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Check, Compass, MessageCircle, Target } from "lucide-react"

import { PageHeader } from "@/components/layout/page-header"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useOnboarding } from "@/lib/onboarding-store"
import { getCareer, getGaps, getRecommendedCareers } from "@/lib/careers-data"

export default function SkillGapsPage() {
  const { state } = useOnboarding()

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
            title="Skill Gaps"
            description="What stands between you and your target career — and how to close each gap."
          />
          <Card>
            <CardContent className="flex flex-col items-center gap-4 px-6 py-14 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Target className="size-7" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-foreground">No career selected yet</h2>
                <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
                  Build your profile first, then pick a path — we&apos;ll compare your skills
                  against what that career really needs.
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

  const gaps = getGaps(activeCareer, state.profile)
  const inPlace = gaps.filter((gap) => gap.has).length
  const toLearn = gaps.length - inPlace
  const firstGap = gaps.find((gap) => !gap.has)

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <PageHeader
          title="Skill Gaps"
          description={`What stands between you and ${activeCareer.title} — and how to close each gap.`}
          actions={
            <>
              <Badge variant="outline" className="h-6 px-2.5">
                {selected ? "Selected path" : "Best match"}
              </Badge>
              <Button variant="outline" render={<Link href="/recommend" />} className="h-11">
                <Compass aria-hidden="true" />
                Change path
              </Button>
              <Button variant="outline" render={<Link href="/coach" />} className="h-11">
                <MessageCircle aria-hidden="true" />
                Talk to a Mentor
              </Button>
              <Button render={<Link href="/roadmap" />} className="h-11">
                See how to close these
                <ArrowRight aria-hidden="true" />
              </Button>
            </>
          }
        />

        <Alert>
          <Target aria-hidden="true" />
          <AlertTitle>
            {gaps.length} required skills · {inPlace} in place · {toLearn} to learn
          </AlertTitle>
          <AlertDescription>
            {toLearn > 0 && firstGap
              ? `Start with ${firstGap.skill} — it's the biggest missing piece for ${activeCareer.title} roles. A typical route takes ${activeCareer.estimatedTime.toLowerCase()} at your pace.`
              : "Every required skill is already on your list — time to build proof, then start applying."}
          </AlertDescription>
        </Alert>

        <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card shadow-card">
          {gaps.map((gap) => (
            <div
              key={gap.skill}
              className="flex flex-col gap-4 px-5 py-5 sm:px-6 md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-bold text-foreground">{gap.skill}</h2>
                  {gap.has ? (
                    <Badge className="h-6 bg-teal-soft px-2.5 text-teal">
                      <Check aria-hidden="true" />
                      You&apos;ve got this
                    </Badge>
                  ) : (
                    <Badge className="h-6 bg-amber-soft px-2.5 text-amber">
                      <BookOpen aria-hidden="true" />
                      To learn
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{gap.action}</p>
              </div>
              {!gap.has && gap.resource ? (
                <Button
                  variant="outline"
                  className="h-10 shrink-0"
                  render={
                    <a href={gap.resource.url} target="_blank" rel="noreferrer" />
                  }
                >
                  <BookOpen aria-hidden="true" />
                  {gap.resource.title}
                </Button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}