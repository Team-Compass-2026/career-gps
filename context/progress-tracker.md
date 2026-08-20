# Progress Tracker

## Current Phase

- Design/planning · product reframe to **Career GPS navigation model** · app
  shell scaffolded, core build not started

## Current Goal

- Finalize context against the new master spec (`context/product-spec.md`)
- Keep the existing shell (Next 16 + Bun + shadcn/ui) as the base for the MVP
  build: onboarding → recommendations → skill gaps → roadmap → coach → progress

## Completed

- Product reframed to **Career GPS** navigation model:
  *Stop guessing. Start building your career.* (was mentor-centric "We stay with
  you until you do it")
- Canonical master spec saved: `context/product-spec.md` (56 sections: problem,
  root causes, users, JTBD, solution, MVP, business model, data model, AI/RAG,
  design system, pitch)
- `project-overview.md` rewritten to the navigation framing (Where am I? /
  Where can I go? / How do I get there?); mentoring moved out of MVP must-haves
- Prototype brief saved: `context/prototype-spec.md` (6-page clickable
  prototype: Landing → Assessment → Pathway → Next Step → Mentor → Progress,
  incl. product concept, visual rules, component rules, page layouts)
- `project-overview.md` expanded with full pitch sections (Problem, Current
  Challenges, Root Causes, JTBD, Solution, Differentiation, User Journey, USP,
  Impacts, Business Model w/ mentor tiers, Market Entry, Growth, Team,
  Team Compass heritage reference)
- Brand confirmed: **Career GPS** (tagline "Stop guessing. Start building your
  career."); Team Compass 🧭 retained as team/heritage name
- Org repo context updated and synced to `career-gps/context/`
- Project scaffolded and building: Next.js 16 + React 19 + Tailwind 4 + Prisma 7
  + Zod 4, package manager Bun 1.3
- shadcn/ui initialized (base-nova style, 20 components) wired to the Career
  GPS design system (Compass Blue / Teal / Amber, Plus Jakarta Sans, dark mode)
- Root layout with font, metadata, theme color and sonner Toaster; landing and
  auth/dashboard skeleton pages (profile, recommend, gaps, roadmap, coach)
- Problem statistics validated (Gen Z, FE Choices, JICA, UNDP, Myanmar Jobs
  reports)
- Tech selection · architecture review · domain/risks/use-cases/user-stories ·
  sprint + task breakdown · coding standards
- Better Auth locked · Neon · AI provider abstraction (`lib/ai/provider.ts`, pcore‑brain / openai‑compatible, switchable via `AI_PROVIDER` env) + server brain config `/etc/career-gps-brain.env` (0600, root‑only)
- Public pages shipped: `/faq` (accordion FAQ, 7 questions), `/contact` (client
  form w/ sonner toast + contact channels), `/mentors` (6 mentor cards with
  match badges, matching explainer, CTA); header + footer nav wired to
  `/mentors`, `/faq`, `/contact` (previously `/coach` / `#`); all three routes
  build as static (verified `bun run build`)
- Backend scaffolding in place: `prisma/schema.prisma` (Better Auth core +
  domain models: Profile, Career, CareerSkill, UserSkill, Goal, Progress,
  Resource, Mentor, CoachConversation, ChatMessage) + `prisma.config.ts` +
  `@prisma/adapter-pg` driver; `lib/prisma.ts` singleton; `lib/auth.ts` Better
  Auth server config (email/password, basePath `/api/auth`); `lib/session.ts`
  helpers; `/api/auth/[...all]` route; `proxy.ts` (Next 16 proxy — replaces
  middleware) redirecting unauthenticated dashboard paths to `/sign-in`;
  `bunx prisma generate` ✅ and `bun run build` ✅ (14 routes)
- Landing polish shipped (parallel agent): all three context images
  (`team-discussion.jpg`, `career-coaching.jpg`, `mentor-session.jpg`) used
  across hero / benefits / final-cta; card hover-lift + accent reveal +
  `active:` press feedback + `whileInView` scroll animations + reduced-motion
  respect; compass canvas perf guard (`shadows={false}`)
- Coach chat upgraded: per-message timestamps on user + assistant bubbles
- Curated seed dataset shipped: `prisma/seed.ts` (16 careers incl. Data Analyst
  first, 117 CareerSkill entries across 54 shared skill names, 63 resources,
  9 mentors w/ 3 featured) + `db:seed` script (`prisma db seed`) + Prisma 7
  `migrations.seed` hook in `prisma.config.ts` (`bun prisma/seed.ts`);
idempotent upserts, no-DB guard, `bunx prisma generate` ✅ + strict tsc ✅ +
   `bun build --target bun` ✅
- Landing sections shipped: `components/landing/explore-careers.tsx` (`id="explore"`,
  6 career cards w/ industry + demand badges → `/recommend`, whileInView stagger),
  `components/landing/social-proof.tsx` (stat band: 30+ paths, 1,200+ learners,
  92% next step, 4.8★ rating), and HowItWorks upgraded to the compass-path
  signature interaction — node colors Neutral → Compass Blue → Teal progressively
  driven by `useScroll`/`useTransform` (staggered step windows), connecting line
  draws as you scroll (mobile vertical / desktop horizontal), theme-reactive
  palette ref, `useReducedMotion` static fallback, hover color-cycle kept; page
  order Hero → Benefits → ExploreCareers → HowItWorks → SocialProof → FinalCta;
  `bun run build` ✅ (14 routes, `/` static)
- **Connected MVP dashboard flow shipped (client-side, localStorage)**: new
  `lib/careers-data.ts` (8 curated careers incl. Data Analyst: required skills,
  education fit, estimated time, entry-level flag, free learning resources;
  pure logic: `getCareer`, `getRecommendedCareers` (skill match + industry +
  education + experience heuristics, capped 96), `getGaps`, `getRoadmap`
  (Foundations → Core skills → Portfolio & applications), `getProgressStats`);
  new `lib/onboarding-store.tsx` (`OnboardingProvider` + `useOnboarding`,
  React context + `useState` + `useEffect`, hydrates/persists under
  `career-gps-profile-v1` in localStorage); dashboard layout wraps children in
  provider + adds **Progress** nav item (`/progress`, TrendingUp icon); `/profile`
  rewritten as real intake form (name, current role, target career select,
  experience, education, industry, weekly hours, skill chips) → saves to store →
  `/recommend`; `/recommend` computes explained fit % cards (animated bars, why-
  you-fit bullets, "Select this path" → `/gaps`); `/gaps` computes has/gap status
  per required skill (teal check vs amber "To learn" + resource link) → `/roadmap`;
  `/roadmap` is phase-based with clickable milestone toggles persisted to store
  (motion timeline retained); new `/progress` dashboard (career readiness,
  skills, milestones, editable weekly-hours log, recent milestones, Continue →
  roadmap/coach); empty states link back to `/profile`/`/recommend`; sonner
  toasts on save/select/toggle/log; `bun run build` ✅ (**15 routes**, +`/progress`)
- Build repair (pre-existing, out of task scope): regenerated stale Prisma
  client (`bunx prisma generate` — schema had KnowledgeDoc/KnowledgeChunk the
  generated client lacked) and excluded standalone Bun tool `scripts/` from
  Next's tsconfig type-check (script targets Bun runtime + old schema API)

## In Progress

- Wire the connected dashboard MVP to the live backend (Better Auth session +
  Prisma): persist profile/recommendations/milestones per user, replace
  localStorage store when the DB path is live
- Reconcile demo prototype (mentor flow, `prototype-spec.md`) with the
  navigation-first product MVP core (`product-spec.md` §29)

## Next Up (when build resumes)

- MVP vertical live: auth → profile intake → career recommend (explained) →
  skill gaps → roadmap → coach (cite-or-abstain) → progress (dashboard flow
  works client-side today; swap store persistence to Prisma)
- Seed curated careers (10–20, incl. Data Analyst) + career_skills + resources
  → seed file written; apply first migration + run `bun run db:seed` against a
  live Neon DB to verify end-to-end
- Finish `scripts/ingest-knowledge.ts` (WIP, targets Bun + vector column via
  raw SQL; currently excluded from Next type-check)
- Unit tests for `lib/careers-data.ts` pure fns (fit/gap/roadmap/stats)
- Landing page: run accessibility review + Alex demo path

## Open Questions

- Optional later: Google OAuth for Better Auth
- Prototype data: how many sample users/careers to pre-populate
- Keep or defer mentor flow in the demo (mentoring is post-MVP per new spec)
- RAG: post-MVP direction only — structured-data MVP confirmed

## Architecture Decisions

- Career GPS navigation model · Team Compass 2026 · Education Equity
- Neon + PostgreSQL (structured data for MVP; pgvector/RAG is future direction)
- Better Auth for authentication
- Next.js 16 (App Router) + Bun 1.3 + TypeScript + Hono + Prisma + AI SDK
- Structured career→skills→resources dataset; no RAG for MVP
- MVP: onboarding + recommend + explain + skill gaps + roadmap + coach + progress
- Desktop-first responsive layout, light + dark mode

## Session Notes

- New master spec incorporated (`product-spec.md`): GPS metaphor, three
  questions (Where am I? / Where can I go? / How do I get there?), core loop
  Discover → Explore → Compare → Plan → Act → Track → Adapt
- Brand reframe: primary tagline "Stop guessing. Start building your career.";
  short "Your GPS for career decisions."; brand = **Career GPS**, Team Compass 🧭
  kept as team/heritage name
- Prototype brief (`prototype-spec.md`): 6-page clickable demo
  (Landing → Assessment → Result → Pathway → Next Move → Mentor → Progress)
  with Orange/Blue/White brand palette in the brief and a mentor page — this is
  the hackathon demo; the product MVP core remains navigation-first
- MVP must-haves: onboarding, recommendations, career explanation, skill gaps,
  roadmap, AI assistant, progress tracking — mentor connection is in the demo
  prototype and the future product direction, not the core MVP build
- Org repo context is canonical; `career-gps/context/` mirrors it
- Do not scaffold further until user says **build**
