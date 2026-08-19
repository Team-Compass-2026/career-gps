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
- All pages built (parallel subagents): landing (hero + Three.js compass canvas
  + benefits + how-it-works + final CTA), auth sign-in/sign-up, dashboard shell
  (sidebar layout), profile intake, career recommendations (fit %), skill gaps,
  roadmap timeline, coach chat
- Animation stack installed: `three` + `@react-three/fiber` + `@react-three/drei`
  + `motion` (framer-motion successor); theme provider (next-themes, light
  default) + theme toggle wired
- Problem statistics validated (Gen Z, FE Choices, JICA, UNDP, Myanmar Jobs
  reports)
- Tech selection · architecture review · domain/risks/use-cases/user-stories ·
  sprint + task breakdown · coding standards
- Better Auth locked · Neon · OpenAI · no secrets in git (n8n/Telegram tokens
  gitignored)

## In Progress

- Landing + auth + dashboard pages built with demo data; awaiting user review
  of visuals/animation before wiring Better Auth + Prisma + real data
- Decide whether the existing dashboard skeleton pages stay as MVP routes or
  are replaced by the onboarding-first flow from `product-spec.md` §11.2
- Reconcile demo prototype (mentor flow, `prototype-spec.md`) with the
  navigation-first product MVP core (`product-spec.md` §29)

## Next Up (when build resumes)

- MVP vertical: auth → profile intake → career recommend (explained) → skill
  gaps → roadmap → coach (cite-or-abstain) → progress
- Seed curated careers (10–20, incl. Data Analyst) + career_skills + resources
- Wire Better Auth sign-in/sign-up + Prisma schema + Neon DB
- Run accessibility review + Alex demo path

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
