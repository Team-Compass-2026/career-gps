"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import { toast } from "sonner"
import { ArrowRight, Compass, PencilLine } from "lucide-react"

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
import { cn } from "@/lib/utils"
import { useOnboarding } from "@/lib/onboarding-store"
import { getCareer, getRecommendedCareers, type Career, type CareerDemand } from "@/lib/careers-data"

const demandStyles: Record<CareerDemand, string> = {
  High: "bg-teal-soft text-teal",
  Growing: "bg-primary-soft text-primary",
  Steady: "bg-muted text-muted-foreground",
}

export default function RecommendationsPage() {
  const { state, setSelectedCareerSlug } = useOnboarding()
  const router = useRouter()

  const hasProfile =
    state.profile.skills.length > 0 ||
    state.profile.targetRole !== "" ||
    state.profile.industry !== "" ||
    state.profile.education !== ""

  const recommendations = hasProfile ? getRecommendedCareers(state.profile).slice(0, 6) : []
  const selected = state.selectedCareerSlug ? getCareer(state.selectedCareerSlug) : null

  function selectPath(career: Career) {
    setSelectedCareerSlug(career.slug)
    toast.success(`Path set: ${career.title}. Let's find your gaps.`)
    router.push("/gaps")
  }

  if (!hasProfile) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl space-y-8">
          <PageHeader
            title="Your Recommendations"
            description="Careers matched to your starting point — fit % is guidance, not certainty."
            actions={
              <Button variant="outline" render={<Link href="/profile" />} className="h-11">
                <PencilLine aria-hidden="true" />
                Build your profile
              </Button>
            }
          />
          <Card>
            <CardContent className="flex flex-col items-center gap-4 px-6 py-14 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Compass className="size-7" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  We don&apos;t know your starting point yet
                </h2>
                <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
                  Tell us about your skills, background and goals so we can recommend careers
                  that actually fit you — not generic ones.
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

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <PageHeader
          title="Your Recommendations"
          description={`Based on ${state.profile.name.trim() ? `${state.profile.name.trim()}'s` : "your"} starting point — these paths may fit you. Fit % is guidance, not certainty.`}
          actions={
            <Button variant="outline" render={<Link href="/profile" />} className="h-11">
              <PencilLine aria-hidden="true" />
              Update profile
            </Button>
          }
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {recommendations.map((rec) => {
            const isSelected = selected?.slug === rec.career.slug
            return (
              <Card
                key={rec.career.slug}
                className={cn(isSelected && "border-primary/50 ring-1 ring-primary/30")}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg font-bold text-foreground">
                        {rec.career.title}
                      </CardTitle>
                      <CardDescription className="mt-1">{rec.career.description}</CardDescription>
                    </div>
                    <span className="shrink-0 text-3xl font-extrabold tabular-nums text-primary">
                      {rec.score}%
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="outline" className="h-6 px-2.5">
                      {rec.career.industry}
                    </Badge>
                    <Badge className={cn("h-6 px-2.5", demandStyles[rec.career.demand])}>
                      {rec.career.demand} demand
                    </Badge>
                    <Badge variant="outline" className="h-6 px-2.5 text-muted-foreground">
                      {rec.career.estimatedTime}
                    </Badge>
                    {isSelected ? (
                      <Badge className="h-6 px-2.5">Your path</Badge>
                    ) : null}
                  </div>
                  <div
                    role="progressbar"
                    aria-label={`${rec.career.title} match`}
                    aria-valuenow={rec.score}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${rec.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-teal"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {rec.reasons.map((reason) => (
                      <li key={reason} className="flex gap-2 text-sm text-muted-foreground">
                        <Compass className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-5 h-11 w-full"
                    onClick={() => selectPath(rec.career)}
                    aria-label={`${isSelected ? "Continue on" : "Select"} ${rec.career.title} path`}
                  >
                    {isSelected ? "Continue on this path" : "Select this path"}
                    <ArrowRight aria-hidden="true" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Not feeling these?{" "}
          <Link href="/profile" className="font-medium text-primary underline-offset-4 hover:underline">
            Update your profile
          </Link>{" "}
          to recalculate your route.
        </p>
      </div>
    </div>
  )
}