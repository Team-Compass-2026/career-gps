export type CareerDemand = "High" | "Growing" | "Steady"

export type CareerResource = {
  title: string
  url: string
  description: string
  skills: string[]
}

export type Career = {
  slug: string
  title: string
  industry: string
  demand: CareerDemand
  description: string
  requiredSkills: string[]
  education: string[]
  estimatedTime: string
  entryLevel: boolean
  resources: CareerResource[]
}

export type CareerProfile = {
  name: string
  currentRole: string
  targetRole: string
  experienceYears: number
  education: string
  industry: string
  weeklyHours: number
  skills: string[]
}

export type OnboardingState = {
  profile: CareerProfile
  selectedCareerSlug: string | null
  completedMilestones: string[]
  loggedHours: number
}

export type CareerRecommendation = {
  career: Career
  score: number
  matchedSkills: string[]
  reasons: string[]
}

export type SkillGap = {
  skill: string
  has: boolean
  action: string
  resource: CareerResource | null
}

export type RoadmapMilestone = {
  id: string
  phase: string
  title: string
  description: string
  duration: string
}

export type RoadmapPhase = {
  name: string
  description: string
  milestones: RoadmapMilestone[]
}

export type ProgressStats = {
  career: Career | null
  gaps: SkillGap[]
  skillsGained: string[]
  skillsTotal: number
  skillsPercent: number
  roadmap: RoadmapPhase[]
  milestonesTotal: number
  milestonesDone: number
  roadmapPercent: number
  overallPercent: number
  nextMilestone: RoadmapMilestone | null
}

export const EDUCATION_OPTIONS = [
  "High school",
  "Some college",
  "Bachelor's degree",
  "Master's degree",
  "Bootcamp / certificate",
  "Self-taught",
] as const

export const INDUSTRY_OPTIONS = [
  "Technology",
  "Data & Analytics",
  "Design",
  "Marketing",
  "Business & Finance",
  "Healthcare",
  "Education",
  "Other",
] as const

export const CAREERS: Career[] = [
  {
    slug: "data-analyst",
    title: "Data Analyst",
    industry: "Data & Analytics",
    demand: "High",
    description:
      "Turn raw data into decisions — SQL, Excel and dashboards that teams actually use.",
    requiredSkills: ["SQL", "Excel", "Statistics", "Python", "Data Visualization", "Communication"],
    education: ["High school", "Some college", "Bachelor's degree", "Bootcamp / certificate", "Self-taught"],
    estimatedTime: "3–6 months",
    entryLevel: true,
    resources: [
      {
        title: "SQLBolt",
        url: "https://sqlbolt.com",
        description: "Interactive SQL course — SELECT, JOINs and aggregates in your browser.",
        skills: ["SQL"],
      },
      {
        title: "Excel Easy",
        url: "https://www.excel-easy.com",
        description: "Free Excel tutorials from the basics to formulas and pivot tables.",
        skills: ["Excel"],
      },
      {
        title: "Khan Academy Statistics",
        url: "https://www.khanacademy.org/math/statistics-probability",
        description: "Free, self-paced statistics and probability course.",
        skills: ["Statistics"],
      },
      {
        title: "freeCodeCamp Data Analysis with Python",
        url: "https://www.freecodecamp.org/learn/data-analysis-with-python/",
        description: "A free, hands-on Python + pandas track.",
        skills: ["Python"],
      },
      {
        title: "Storytelling with Data",
        url: "https://www.storytellingwithdata.com/blog",
        description: "Free tips for turning numbers into clear charts and stories.",
        skills: ["Data Visualization", "Communication"],
      },
    ],
  },
  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    industry: "Technology",
    demand: "High",
    description:
      "Build the interfaces people interact with — from first layout to production React apps.",
    requiredSkills: ["HTML/CSS", "JavaScript", "React", "Git", "Responsive Design", "Testing"],
    education: ["High school", "Some college", "Bachelor's degree", "Bootcamp / certificate", "Self-taught"],
    estimatedTime: "4–8 months",
    entryLevel: true,
    resources: [
      {
        title: "freeCodeCamp Responsive Web Design",
        url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
        description: "Free certification covering HTML, CSS and responsive layouts.",
        skills: ["HTML/CSS", "Responsive Design"],
      },
      {
        title: "MDN JavaScript Guide",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
        description: "The definitive free reference for modern JavaScript.",
        skills: ["JavaScript"],
      },
      {
        title: "React.dev Learn",
        url: "https://react.dev/learn",
        description: "Official interactive React tutorials.",
        skills: ["React"],
      },
      {
        title: "GitHub Skills",
        url: "https://skills.github.com",
        description: "Free hands-on Git and GitHub courses.",
        skills: ["Git"],
      },
      {
        title: "Testing Library Docs",
        url: "https://testing-library.com/docs/",
        description: "Guides for writing tests the way users experience your app.",
        skills: ["Testing", "JavaScript"],
      },
    ],
  },
  {
    slug: "ux-designer",
    title: "UX/UI Designer",
    industry: "Design",
    demand: "Growing",
    description:
      "Research, prototype and polish digital products people find easy — and enjoyable — to use.",
    requiredSkills: ["User Research", "Wireframing", "Prototyping", "Figma", "Visual Design", "Usability Testing"],
    education: ["High school", "Some college", "Bachelor's degree", "Bootcamp / certificate", "Self-taught"],
    estimatedTime: "3–6 months",
    entryLevel: true,
    resources: [
      {
        title: "Figma Learn",
        url: "https://www.figma.com/learn",
        description: "Official free Figma courses and templates.",
        skills: ["Figma"],
      },
      {
        title: "Nielsen Norman Group",
        url: "https://www.nngroup.com/articles/",
        description: "Free, credible articles on research and usability testing methods.",
        skills: ["User Research", "Usability Testing"],
      },
      {
        title: "Interaction Design Foundation",
        url: "https://www.interaction-design.org",
        description: "Free guides on wireframing, prototyping and the design process.",
        skills: ["Wireframing", "Prototyping"],
      },
      {
        title: "Canva Design School",
        url: "https://www.canva.com/designschool/",
        description: "Free design basics and visual hierarchy lessons.",
        skills: ["Visual Design"],
      },
    ],
  },
  {
    slug: "product-manager",
    title: "Product Manager",
    industry: "Technology",
    demand: "High",
    description:
      "Own the why — set direction, align teams and ship products that solve real problems.",
    requiredSkills: ["Product Strategy", "User Research", "Roadmapping", "Analytics", "Communication", "Stakeholder Management"],
    education: ["Some college", "Bachelor's degree", "Master's degree", "Bootcamp / certificate"],
    estimatedTime: "6–12 months",
    entryLevel: false,
    resources: [
      {
        title: "Lenny's Newsletter",
        url: "https://www.lennysnewsletter.com",
        description: "Free essays on strategy, roadmaps and product craft.",
        skills: ["Product Strategy", "Roadmapping"],
      },
      {
        title: "Nielsen Norman Group",
        url: "https://www.nngroup.com/articles/",
        description: "Credible research methods and templates.",
        skills: ["User Research"],
      },
      {
        title: "Google Analytics Academy",
        url: "https://analytics.google.com/analytics/academy/",
        description: "Free courses on product and marketing analytics.",
        skills: ["Analytics"],
      },
      {
        title: "Mind the Product",
        url: "https://www.mindtheproduct.com",
        description: "Free community articles on PM communication and stakeholder skills.",
        skills: ["Communication", "Stakeholder Management"],
      },
    ],
  },
  {
    slug: "digital-marketer",
    title: "Digital Marketing Specialist",
    industry: "Marketing",
    demand: "High",
    description:
      "Grow audiences and revenue through search, content, social and email — all measurable.",
    requiredSkills: ["SEO", "Content Strategy", "Social Media", "Analytics", "Email Marketing", "Copywriting"],
    education: ["High school", "Some college", "Bachelor's degree", "Bootcamp / certificate", "Self-taught"],
    estimatedTime: "3–6 months",
    entryLevel: true,
    resources: [
      {
        title: "Moz Beginner's Guide to SEO",
        url: "https://moz.com/beginners-guide-to-seo",
        description: "The classic free guide to search optimization.",
        skills: ["SEO"],
      },
      {
        title: "Google Analytics Academy",
        url: "https://analytics.google.com/analytics/academy/",
        description: "Free analytics courses for marketers.",
        skills: ["Analytics"],
      },
      {
        title: "Copyblogger",
        url: "https://copyblogger.com",
        description: "Free writing and content strategy articles.",
        skills: ["Content Strategy", "Copywriting"],
      },
      {
        title: "Mailchimp Marketing Glossary",
        url: "https://mailchimp.com/marketing-glossary/",
        description: "Free explainers on email marketing fundamentals.",
        skills: ["Email Marketing"],
      },
      {
        title: "Buffer Resources",
        url: "https://buffer.com/resources",
        description: "Free social media strategy and scheduling guides.",
        skills: ["Social Media"],
      },
    ],
  },
  {
    slug: "data-scientist",
    title: "Data Scientist",
    industry: "Data & Analytics",
    demand: "Growing",
    description:
      "Go beyond describing what happened — build models that predict what happens next.",
    requiredSkills: ["Python", "Statistics", "Machine Learning", "SQL", "Data Wrangling", "Communication"],
    education: ["Bachelor's degree", "Master's degree", "Bootcamp / certificate"],
    estimatedTime: "8–14 months",
    entryLevel: false,
    resources: [
      {
        title: "freeCodeCamp Data Analysis with Python",
        url: "https://www.freecodecamp.org/learn/data-analysis-with-python/",
        description: "A free, hands-on Python + pandas track.",
        skills: ["Python", "Data Wrangling"],
      },
      {
        title: "Khan Academy Statistics",
        url: "https://www.khanacademy.org/math/statistics-probability",
        description: "Free, self-paced statistics and probability course.",
        skills: ["Statistics"],
      },
      {
        title: "Machine Learning Crash Course",
        url: "https://developers.google.com/machine-learning/crash-course",
        description: "Google's free ML fundamentals course.",
        skills: ["Machine Learning"],
      },
      {
        title: "SQLBolt",
        url: "https://sqlbolt.com",
        description: "Interactive SQL course — SELECT, JOINs and aggregates in your browser.",
        skills: ["SQL"],
      },
      {
        title: "Storytelling with Data",
        url: "https://www.storytellingwithdata.com/blog",
        description: "Free tips for communicating findings clearly.",
        skills: ["Communication"],
      },
    ],
  },
  {
    slug: "software-engineer",
    title: "Software Engineer",
    industry: "Technology",
    demand: "High",
    description:
      "Design, build and ship reliable software — from data structures to deployed APIs.",
    requiredSkills: ["Programming", "Data Structures", "Git", "Databases", "APIs", "Testing"],
    education: ["Some college", "Bachelor's degree", "Master's degree", "Bootcamp / certificate", "Self-taught"],
    estimatedTime: "8–12 months",
    entryLevel: false,
    resources: [
      {
        title: "freeCodeCamp",
        url: "https://www.freecodecamp.org/learn/",
        description: "Free coding curriculum with certifications.",
        skills: ["Programming", "Data Structures"],
      },
      {
        title: "GitHub Skills",
        url: "https://skills.github.com",
        description: "Free hands-on Git and GitHub courses.",
        skills: ["Git"],
      },
      {
        title: "SQLBolt",
        url: "https://sqlbolt.com",
        description: "Interactive SQL course for database fundamentals.",
        skills: ["Databases"],
      },
      {
        title: "MDN Fetch API",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",
        description: "Free docs on building and consuming APIs.",
        skills: ["APIs", "Programming"],
      },
      {
        title: "Testing Library Docs",
        url: "https://testing-library.com/docs/",
        description: "Guides for writing tests the way users experience your app.",
        skills: ["Testing"],
      },
    ],
  },
  {
    slug: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    industry: "Technology",
    demand: "Growing",
    description:
      "Protect systems and data — monitor, respond to and prevent security incidents.",
    requiredSkills: ["Networking", "Linux", "Security Fundamentals", "Incident Response", "Scripting", "Risk Assessment"],
    education: ["Some college", "Bachelor's degree", "Bootcamp / certificate"],
    estimatedTime: "6–10 months",
    entryLevel: false,
    resources: [
      {
        title: "Cisco Networking Academy",
        url: "https://www.netacad.com",
        description: "Free networking and security fundamentals courses.",
        skills: ["Networking", "Security Fundamentals"],
      },
      {
        title: "Linux Journey",
        url: "https://linuxjourney.com",
        description: "Free interactive Linux lessons.",
        skills: ["Linux"],
      },
      {
        title: "NIST Cyber Framework",
        url: "https://www.nist.gov/cyberframework",
        description: "Free, authoritative framework for incident response and risk.",
        skills: ["Incident Response", "Risk Assessment"],
      },
      {
        title: "Python.org Tutorial",
        url: "https://docs.python.org/3/tutorial/",
        description: "Free Python tutorial for security scripting.",
        skills: ["Scripting"],
      },
    ],
  },
]

export const ALL_SKILLS = Array.from(new Set(CAREERS.flatMap((career) => career.requiredSkills))).sort()

export function getCareer(slug: string): Career | undefined {
  return CAREERS.find((career) => career.slug === slug)
}

function buildReasons(career: Career, profile: CareerProfile, matchedSkills: string[]): string[] {
  const reasons: string[] = []
  if (matchedSkills.length > 0) {
    const listed = matchedSkills.slice(0, 3).join(", ")
    reasons.push(
      matchedSkills.length === 1
        ? `You already have ${matchedSkills[0]} — a core skill for this path.`
        : `You already bring ${matchedSkills.length} core skills: ${listed}.`,
    )
  } else {
    reasons.push("None of your skills are listed yet — but most people start exactly here.")
  }
  if (profile.industry && profile.industry === career.industry) {
    reasons.push(`You're coming from ${profile.industry}, where this path is in demand.`)
  } else if (career.demand === "High") {
    reasons.push("High demand means more entry points and open roles.")
  } else {
    reasons.push("Demand for this path is growing steadily.")
  }
  if (profile.education && career.education.includes(profile.education)) {
    reasons.push(`Your ${profile.education.toLowerCase()} background fits the typical entry requirements.`)
  } else if (career.entryLevel) {
    reasons.push("Entry-level friendly — you can start without years of experience.")
  } else {
    reasons.push("Expect to invest in focused training along the way.")
  }
  if (profile.experienceYears >= 2) {
    reasons.push(`Your ${profile.experienceYears} years of experience give you a head start.`)
  } else if (career.entryLevel) {
    reasons.push("A strong first destination — most people start here.")
  } else {
    reasons.push("You'll build most of the required experience as you go.")
  }
  return reasons.slice(0, 4)
}

export function getRecommendedCareers(profile: CareerProfile): CareerRecommendation[] {
  const userSkills = profile.skills.map((skill) => skill.trim().toLowerCase()).filter(Boolean)
  const recommendations = CAREERS.map((career) => {
    const matchedSkills = career.requiredSkills.filter((skill) => userSkills.includes(skill.toLowerCase()))
    let score = 0
    score += Math.min(matchedSkills.length, 4) * 14
    if (profile.industry && profile.industry === career.industry) score += 12
    if (profile.education && career.education.includes(profile.education)) score += 10
    if (profile.targetRole && profile.targetRole.toLowerCase() === career.title.toLowerCase()) score += 16
    score += profile.experienceYears >= 2 ? (career.entryLevel ? 4 : 10) : career.entryLevel ? 10 : 4
    score = Math.max(6, Math.min(96, score))
    return { career, score, matchedSkills, reasons: buildReasons(career, profile, matchedSkills) }
  })
  return recommendations.sort((a, b) => b.score - a.score)
}

export function getGaps(career: Career, profile: CareerProfile): SkillGap[] {
  const userSkills = profile.skills.map((skill) => skill.trim().toLowerCase()).filter(Boolean)
  return career.requiredSkills.map((skill) => {
    const has = userSkills.includes(skill.toLowerCase())
    const resource =
      career.resources.find((entry) =>
        entry.skills.some((entrySkill) => entrySkill.toLowerCase() === skill.toLowerCase()),
      ) ?? null
    return {
      skill,
      has,
      action: has
        ? "Already on your list — keep sharpening it with real projects."
        : `Learn ${skill} essentials, then practice on a small project.`,
      resource: has ? null : resource,
    }
  })
}

export function getRoadmap(career: Career): RoadmapPhase[] {
  const skills = career.requiredSkills
  const phases: RoadmapPhase[] = []
  phases.push({
    name: "Foundations",
    description: `Build the core toolkit every ${career.title} relies on.`,
    milestones: skills.slice(0, Math.min(3, skills.length)).map((skill, index) => ({
      id: `${career.slug}-f${index}`,
      phase: "Foundations",
      title: `Learn ${skill} essentials`,
      description: `Get comfortable with ${skill} through guided practice and small exercises.`,
      duration: "2–3 weeks",
    })),
  })
  const core = skills.slice(3)
  if (core.length > 0) {
    phases.push({
      name: "Core skills",
      description: "Go deeper on the skills that set you apart in interviews.",
      milestones: core.map((skill, index) => ({
        id: `${career.slug}-c${index}`,
        phase: "Core skills",
        title: `Master ${skill} in practice`,
        description: `Apply ${skill} to real scenarios until it feels natural.`,
        duration: "3–4 weeks",
      })),
    })
  }
  phases.push({
    name: "Portfolio & applications",
    description: "Turn what you know into proof employers can see.",
    milestones: [
      {
        id: `${career.slug}-p0`,
        phase: "Portfolio & applications",
        title: "Ship a portfolio project",
        description: "Build one solid project that shows off your new skills end to end.",
        duration: "4–6 weeks",
      },
      {
        id: `${career.slug}-p1`,
        phase: "Portfolio & applications",
        title: "Start applying",
        description: "Polish your resume and apply to entry-level roles and internships.",
        duration: "Ongoing",
      },
    ],
  })
  return phases
}

export function getProgressStats(state: OnboardingState): ProgressStats {
  const career = state.selectedCareerSlug ? (getCareer(state.selectedCareerSlug) ?? null) : null
  if (!career) {
    return {
      career: null,
      gaps: [],
      skillsGained: [],
      skillsTotal: 0,
      skillsPercent: 0,
      roadmap: [],
      milestonesTotal: 0,
      milestonesDone: 0,
      roadmapPercent: 0,
      overallPercent: 0,
      nextMilestone: null,
    }
  }
  const gaps = getGaps(career, state.profile)
  const skillsGained = gaps.filter((gap) => gap.has).map((gap) => gap.skill)
  const skillsPercent = gaps.length > 0 ? Math.round((skillsGained.length / gaps.length) * 100) : 0
  const roadmap = getRoadmap(career)
  const allMilestones = roadmap.flatMap((phase) => phase.milestones)
  const milestonesDone = allMilestones.filter((milestone) =>
    state.completedMilestones.includes(milestone.id),
  ).length
  const roadmapPercent =
    allMilestones.length > 0 ? Math.round((milestonesDone / allMilestones.length) * 100) : 0
  const overallPercent = Math.round((skillsPercent + roadmapPercent) / 2)
  const nextMilestone =
    allMilestones.find((milestone) => !state.completedMilestones.includes(milestone.id)) ?? null
  return {
    career,
    gaps,
    skillsGained,
    skillsTotal: gaps.length,
    skillsPercent,
    roadmap,
    milestonesTotal: allMilestones.length,
    milestonesDone,
    roadmapPercent,
    overallPercent,
    nextMilestone,
  }
}