# Prototype Development Spec — Career GPS

**Brand:** Career GPS · **Team:** Team Compass 🧭 · **Track:** T2 Education Equity

Goal: build a high-fidelity **clickable web prototype** of the Career GPS career
navigation platform for the hackathon demo. The product is a personalized
Career Navigation platform for young people and university students.

> Brand = **Career GPS**. Canonical design tokens implemented in the app live in
> `context/ui-context.md` and `app/globals.css`. This file is the prototype
> development brief (page-by-page).

---

## Product Concept

The platform helps users move from career uncertainty to career action. Instead
of simply providing career information, courses, certificates, or generic
advice, the platform:

1. Understands the user's career goal, current skills, experience, interests,
   and constraints.
2. Identifies the gap between the user's current state and desired career.
3. Creates a personalized career pathway.
4. Prioritizes what the user should do next.
5. Recommends relevant learning resources, projects, experiences, and
   opportunities.
6. Connects the user with relevant professional mentors.
7. Tracks progress toward career readiness.
8. Continuously adapts the pathway as the user progresses.

The product should NOT feel like:
- A generic online course marketplace
- A job board
- A social media platform
- A generic AI chatbot
- A personality test
- A conventional university career center

## Target Users

Primary users:
- University students
- Recent graduates
- Young professionals in the early stages of their careers
- People who feel overwhelmed by career information
- People who have a career goal but do not know how to reach it

## User Experience

The experience should feel: **Personal · Clear · Intelligent · Trustworthy ·
Modern · Encouraging · Action-oriented · Human**

## Visual Style

Create a polished contemporary digital product with a premium but approachable
aesthetic. Use:
- Clean modern typography
- Generous whitespace
- Strong visual hierarchy
- Rounded cards with restrained corner radius
- Subtle borders
- Light shadows
- Clear primary and secondary buttons
- Minimal decorative elements
- High-quality icons
- Consistent spacing
- Strong alignment and grid structure

## Color System

Use a restrained professional palette.
- **Brand colors:** Orange for optimistic and successful, Blue for professional
  and formal, White for clean and tidy
- **Primary text:** Black
- **Secondary text:** White
- **Success:** Green, Orange
- **Warning:** Red

Use the brand color consistently for:
- Primary CTA buttons
- Active navigation states
- Important progress indicators
- Selected elements
- Key highlights

Do not introduce arbitrary colors that conflict with the brand system.

## Typography

Use a modern, highly legible sans-serif typeface with a clear hierarchy:

- **H1** — Large, confident, highly readable.
- **H2** — Strong section heading.
- **H3** — Card or subsection heading.
- **Body** — Highly readable with comfortable line height.
- **Caption** — Smaller muted text.

## Layout

Use a consistent desktop-first responsive layout.

Primary navigation:
- Logo
- Dashboard / My Pathway
- Explore
- Mentors
- Progress
- Profile

For the prototype, prioritize desktop/laptop presentation because the product
will be demonstrated to hackathon judges.

## Component Consistency

Create reusable components for: buttons, cards, progress bars, skill indicators,
tags, milestones, navigation, avatars, mentor cards, course/resource cards,
timeline/pathway components, status indicators, modal/dialog components.

The same component must look identical across all pages.

## Important Prototype Rule

Do not invent major product features that are not specified.

Do not add: cryptocurrency, gamification systems, social feeds, AI chatbots,
unnecessary community features, random dashboards, financial services,
e-commerce functionality.

The prototype should focus on the core career navigation experience.

## Content Rule

Use realistic prototype data. Do not invent unnecessary content.

Where content is intentionally unspecified, use clearly marked placeholders such
as: `[CAREER GOAL]`, `[USER NAME]`, `[SKILL]`, `[COURSE NAME]`, `[MENTOR NAME]`,
`[PROJECT NAME]`, `[BRAND COLOR]`.

## Interaction Design

The prototype must be clickable. Important buttons should navigate to the
appropriate next screen. The primary user journey:

```
LANDING → ASSESSMENT → ASSESSMENT RESULT → CAREER PATHWAY → NEXT MOVE → MENTOR → PROGRESS
```

Interactions should feel intentional rather than decorative.

## Accessibility

Maintain: strong text contrast, clear button labels, sufficient spacing,
readable font sizes, distinguishable states, logical keyboard-style navigation
hierarchy.

---

# Page Layouts

## 1. Landing Page

**Navigation:** How It Works · Mentors · About · **Button:** Get Started

**Hero — Left**
- Headline: *Stop guessing. Start building your career.*
- Subheadline: *Your personalized career pathway — from where you are today to
  where you want to be.*
- Primary CTA: **Build My Career Pathway**
- Secondary CTA: **See How It Works**

**Hero — Right graphic:** Career GPS / pathway visualization:

```
Your Goal
Data Analyst
↓
Skills
SQL · Python · Visualization
↓
Projects
Build your portfolio
↓
Experience
Internship
↓
Career
Data Analyst
```

**Below hero — Three benefits**
- **Know Your Path** — Discover the skills and experience you actually need for
  your target career.
- **Know Your Next Move** — Get personalized recommendations for what to learn,
  build and do next.
- **Grow With Guidance** — Get matched with experienced mentors who understand
  your career journey.

**Below that — How it works**
- 01 — **Assess**: Tell us where you are.
- 02 — **Navigate**: Get your personalized career pathway.
- 03 — **Act**: Take the right steps, one milestone at a time.
- 04 — **Grow**: Track your progress and get expert guidance.

**Final CTA:** Ready to find your path? **Build My Career Pathway →**

## 2. Assessment Page

**Header:** Career Assessment
**Subtext:** Let's understand where you are so we can build a pathway that fits
you.
**Progress:** Step 3 of 5

- **Question 1 — Career Goal:** What career are you working toward?
  Selected: Data Analyst · Small text: *Not sure yet? Explore career options →*
- **Question 2 — Background:** Tell us about yourself.
  - Education: Bachelor's Degree · Business Administration
  - Current experience: University projects · No professional experience
- **Question 3 — Skills:** How would you rate your current skills?

  | Skill | Level |
  |-------|-------|
  | Excel | Intermediate |
  | Statistics | Beginner |
  | SQL | Beginner |
  | Python | Beginner |
  | Data Visualization | Beginner |

- **Question 4 — Preferences:**
  - How much time can you invest each week? **8 hours / week**
  - When do you want to be internship-ready? **Within 6 months**

**Right side:** [ASSESSMENT SUMMARY / USER PROFILE VISUAL]
**Bottom:** [BACK] [CONTINUE]

## 3. My Career Pathway

**Purpose:** Show the personalized route from the user's current position to
their target career.

- **Header:** [MY CAREER PATHWAY] + [SHORT PERSONALIZED DESCRIPTION]
- **Top:** [USER PROFILE] · [TARGET CAREER] · [CAREER READINESS]
- **Main body:** large visual career roadmap:

```
CURRENT STATE
↓
[FOUNDATION]
↓
[SKILLS]
↓
[PROJECTS]
↓
[EXPERIENCE]
↓
[INTERNSHIP]
↓
[CAREER GOAL]
```

- **Left/main side:** [VISUAL CAREER ROADMAP]
- **Right side:** [USER STRENGTHS] · [SKILL GAPS] · [PATHWAY SUMMARY]
- **Bottom:** [VIEW YOUR NEXT STEP CTA]

## 4. Your Next Step

**Purpose:** Turn the long-term career pathway into one clear action the user
can take now.

- **Header:** [YOUR NEXT STEP] + [SHORT SUPPORTING TEXT]
- **Left side:** [MAIN RECOMMENDED COURSE / PROJECT / TASK], [DESCRIPTION],
  [WHY THIS IS RECOMMENDED], [ESTIMATED TIME], [EXPECTED OUTCOME],
  [START NOW CTA]
- **Right side:** [RECOMMENDED RESOURCES] · [PROGRESS TOWARD CURRENT MILESTONE]
- **Bottom:** [ASK MY MENTOR CTA]

## 5. Your Mentor

**Purpose:** Show how the platform connects the user with a relevant
professional mentor.

- **Header:** [YOUR MENTOR] + [SHORT DESCRIPTION]
- **Left side:** [MENTOR PHOTO], [MENTOR NAME], [JOB TITLE / COMPANY],
  [SHORT BIO], [EXPERTISE]
- **Right side:** [WHY THIS MENTOR WAS MATCHED], [MATCHING REASONS],
  [AVAILABILITY], [BOOK SESSION CTA]
- **Bottom:** [RECENT MENTOR ADVICE / FEEDBACK] · [NEXT SESSION]

## 6. My Progress

**Purpose:** Show how the user is progressing toward their career goal.

- **Header:** [MY PROGRESS] + [SHORT SUPPORTING TEXT]
- **Top:** [TARGET CAREER] · [CAREER READINESS %] · [MILESTONES COMPLETED] ·
  [PROJECTS COMPLETED]
- **Left side:** [SKILL PROGRESS] · [PORTFOLIO PROGRESS]
- **Right side:** [CAREER PATHWAY PROGRESS] · [COMPLETED / CURRENT / UPCOMING
  MILESTONES]
- **Bottom:** [RECENT ACHIEVEMENTS] · [NEXT MILESTONE] · [CONTINUE PATHWAY CTA]