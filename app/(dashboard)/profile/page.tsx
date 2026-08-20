"use client"

import { useEffect, useState } from "react"
import type { FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Compass, Save, Sparkles } from "lucide-react"

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
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useOnboarding } from "@/lib/onboarding-store"
import {
  ALL_SKILLS,
  CAREERS,
  EDUCATION_OPTIONS,
  INDUSTRY_OPTIONS,
  type CareerProfile,
} from "@/lib/careers-data"

const NOT_SURE = "not-sure"

const EXPERIENCE_OPTIONS = [
  { value: "0", label: "No experience yet" },
  { value: "1", label: "Less than a year" },
  { value: "2", label: "1–2 years" },
  { value: "3", label: "3–5 years" },
  { value: "6", label: "5+ years" },
]

function toForm(profile: CareerProfile): CareerProfile {
  return { ...profile, targetRole: profile.targetRole || NOT_SURE }
}

function fromForm(form: CareerProfile): CareerProfile {
  return { ...form, targetRole: form.targetRole === NOT_SURE ? "" : form.targetRole }
}

export default function ProfilePage() {
  const { state, setProfile } = useOnboarding()
  const router = useRouter()
  const [form, setForm] = useState<CareerProfile>(() => toForm(state.profile))

  useEffect(() => {
    setForm(toForm(state.profile))
  }, [state.profile])

  function updateField<Key extends keyof CareerProfile>(key: Key, value: CareerProfile[Key]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function toggleSkill(skill: string) {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((selected) => selected !== skill)
        : [...prev.skills, skill],
    }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (form.skills.length === 0 && (form.targetRole === NOT_SURE || form.targetRole === "")) {
      toast.error("Add at least one skill or pick a target so we can map your route")
      return
    }
    setProfile(fromForm(form))
    const greeting = form.name.trim() ? `Welcome aboard, ${form.name.trim()}! ` : ""
    toast.success(`${greeting}Profile saved — finding the careers that fit you.`)
    router.push("/recommend")
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <PageHeader
          title="My Profile"
          description="Tell us where you are today so we can map the route ahead — your starting point, not your destination."
          actions={
            <Badge variant="outline" className="h-6 px-2.5">
              Step 1 of 5
            </Badge>
          }
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Where are you now?</CardTitle>
              <CardDescription>
                The basics we use to personalize every recommendation.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="profile-name">Name</Label>
                <Input
                  id="profile-name"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="e.g. Alex"
                  autoComplete="name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profile-role">Current role</Label>
                <Input
                  id="profile-role"
                  value={form.currentRole}
                  onChange={(event) => updateField("currentRole", event.target.value)}
                  placeholder="e.g. University student"
                />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="profile-target">Target career</Label>
                <Select
                  value={form.targetRole}
                  onValueChange={(value) => updateField("targetRole", value ?? NOT_SURE)}
                >
                  <SelectTrigger id="profile-target" className="h-10 w-full">
                    <SelectValue placeholder="Pick a destination…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NOT_SURE}>Not sure yet — recommend for me</SelectItem>
                    {CAREERS.map((career) => (
                      <SelectItem key={career.slug} value={career.title}>
                        {career.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Not sure? Skip it — we&apos;ll recommend careers from your skills instead.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your background</CardTitle>
              <CardDescription>
                Education, experience and time you can invest each week.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="profile-experience">Experience</Label>
                <Select
                  value={String(form.experienceYears)}
                  onValueChange={(value) => updateField("experienceYears", Number(value) || 0)}
                >
                  <SelectTrigger id="profile-experience" className="h-10 w-full">
                    <SelectValue placeholder="How much experience?" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPERIENCE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profile-education">Education</Label>
                <Select
                  value={form.education}
                  onValueChange={(value) => updateField("education", value ?? "")}
                >
                  <SelectTrigger id="profile-education" className="h-10 w-full">
                    <SelectValue placeholder="Highest level reached" />
                  </SelectTrigger>
                  <SelectContent>
                    {EDUCATION_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profile-industry">Industry</Label>
                <Select
                  value={form.industry}
                  onValueChange={(value) => updateField("industry", value ?? "")}
                >
                  <SelectTrigger id="profile-industry" className="h-10 w-full">
                    <SelectValue placeholder="Where do you work or study?" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRY_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profile-hours">Weekly hours you can invest</Label>
                <Input
                  id="profile-hours"
                  type="number"
                  min={0}
                  max={80}
                  value={form.weeklyHours}
                  onChange={(event) =>
                    updateField("weeklyHours", Math.max(0, Number(event.target.value) || 0))
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills you already have</CardTitle>
              <CardDescription>
                Select everything you can do today — even a little. More signals, better routes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {ALL_SKILLS.map((skill) => {
                  const active = form.skills.includes(skill)
                  return (
                    <button
                      key={skill}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleSkill(skill)}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        active
                          ? "border-primary/40 bg-primary-soft text-primary"
                          : "border-border bg-background text-muted-foreground hover:border-border-strong hover:text-foreground",
                      )}
                    >
                      {skill}
                    </button>
                  )
                })}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                {form.skills.length === 0
                  ? "Pick at least one skill (or a target career) to continue."
                  : `${form.skills.length} skill${form.skills.length === 1 ? "" : "s"} selected — we'll use these to score your fits.`}
              </p>
            </CardContent>
          </Card>

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" className="h-11">
              <Save aria-hidden="true" />
              Save &amp; find my path
            </Button>
            <Button
              type="button"
              variant="ghost"
              render={<Link href="/recommend" />}
              className="h-11 text-muted-foreground"
            >
              <Compass aria-hidden="true" />
              Skip for now
            </Button>
          </div>
        </form>

        <div className="flex items-start gap-2.5 rounded-xl border border-primary/20 bg-primary-soft px-4 py-3 text-sm text-primary">
          <Sparkles className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p>
            Fit scores are guidance, not certainty — you stay the decision-maker on your path.
          </p>
        </div>
      </div>
    </div>
  )
}