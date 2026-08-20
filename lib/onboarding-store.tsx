"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import type { ReactNode } from "react"
import type { CareerProfile, OnboardingState } from "@/lib/careers-data"

const STORAGE_KEY = "career-gps-profile-v1"

const DEFAULT_STATE: OnboardingState = {
  profile: {
    name: "",
    currentRole: "",
    targetRole: "",
    experienceYears: 0,
    education: "",
    industry: "",
    weeklyHours: 8,
    skills: [],
  },
  selectedCareerSlug: null,
  completedMilestones: [],
  loggedHours: 0,
}

type OnboardingContextValue = {
  state: OnboardingState
  setProfile: (profile: CareerProfile) => void
  setSelectedCareerSlug: (slug: string) => void
  toggleMilestone: (id: string) => void
  setLoggedHours: (hours: number) => void
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null)

function loadState(): OnboardingState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_STATE
    const parsed = JSON.parse(raw) as Partial<OnboardingState>
    return {
      ...DEFAULT_STATE,
      ...parsed,
      profile: { ...DEFAULT_STATE.profile, ...(parsed.profile ?? {}) },
      completedMilestones: Array.isArray(parsed.completedMilestones) ? parsed.completedMilestones : [],
      selectedCareerSlug:
        typeof parsed.selectedCareerSlug === "string" ? parsed.selectedCareerSlug : null,
      loggedHours: typeof parsed.loggedHours === "number" ? parsed.loggedHours : 0,
    }
  } catch {
    return DEFAULT_STATE
  }
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(DEFAULT_STATE)
  const hydratedRef = useRef(false)

  useEffect(() => {
    setState(loadState())
    hydratedRef.current = true
  }, [])

  useEffect(() => {
    if (!hydratedRef.current) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      void 0
    }
  }, [state])

  const setProfile = useCallback((profile: CareerProfile) => {
    setState((prev) => ({ ...prev, profile }))
  }, [])

  const setSelectedCareerSlug = useCallback((slug: string) => {
    setState((prev) => ({ ...prev, selectedCareerSlug: slug }))
  }, [])

  const toggleMilestone = useCallback((id: string) => {
    setState((prev) => {
      const completed = prev.completedMilestones.includes(id)
      return {
        ...prev,
        completedMilestones: completed
          ? prev.completedMilestones.filter((milestoneId) => milestoneId !== id)
          : [...prev.completedMilestones, id],
      }
    })
  }, [])

  const setLoggedHours = useCallback((hours: number) => {
    setState((prev) => ({ ...prev, loggedHours: hours }))
  }, [])

  const value = useMemo<OnboardingContextValue>(
    () => ({ state, setProfile, setSelectedCareerSlug, toggleMilestone, setLoggedHours }),
    [state, setProfile, setSelectedCareerSlug, toggleMilestone, setLoggedHours],
  )

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>
}

export function useOnboarding(): OnboardingContextValue {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}