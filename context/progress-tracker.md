# Progress Tracker

## Current Phase

- Active build (genesis) · connected dashboard MVP shipped client-side · Better
  Auth wired (server + client + login pages) · RAG-grounded AI chat/coach routes
  shipped · working tree commits up to `HEAD`; all local changes committed

## Current Goal

- Wire the live backend: apply auth/domain migration to Neon, persist the
  dashboard store to Prisma per user, verify sign-in/sign-up end-to-end against
  the live DB, then `bun run build` green + Vercel deploy
- Auth MVP flow: `/sign-in` `/sign-up` (Better Auth client) → `/profile` intake
  → recommendations → gaps → roadmap → coach → progress

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

- **RAG layer built (schema → corpus → ingest → retrieval → routes)**:
  - Schema + migrations applied to Neon (`vector(384)`): `KnowledgeDoc`,
    `KnowledgeChunk` (field, heading, content, tokens, embedding) + HNSW
    `vector_cosine_ops` index + GIN FTS index (migration
    `20260820000834_init_knowledge_vector`, dim resized via
    `20260820000900_embedding_dim_384`) — verified via psql
  - Curated corpus: `data/knowledge/{careers,skills,learning_paths,resources,
    salaries,mentors,faq}.md` (front matter + H2 field sections; canonical
    fields: career_description, skill_requirements, learning_path, resources,
    salary_data, mentor_profiles, faq)
  - Ingest: `scripts/ingest-knowledge.ts` (parse → chunk ~400 tokens/15% overlap
    → embed → upsert doc + insert chunks; `--dry` verified: 7 docs, 13 chunks,
    all 7 fields)
  - Retrieval: `lib/ai/rag.ts` — hybrid FTS + vector k-NN (`sim*0.7 + fts*0.3`),
    citations, graceful degrade when embedding/DB unavailable
  - Routes: `app/api/ai/chat/route.ts` now prepends RAG context + returns
    `citations`; new `app/api/ai/coach/route.ts` (coaching prompt + RAG
    citations, optional `field` filter)
  - Provider: `embed()` added to `lib/ai/provider.ts` (openai-compatible
    `/embeddings` or `AI_BRAIN_EMBEDDING_URL` bridge) + `lib/ai/embeddings.ts`
  - **Blocked**: embeddings endpoint on pcore-brain bridge not yet deployed
    (subagent aborted x2); real ingest needs a live embeddings provider
    (`AI_OPENAI_BASE_URL`+key or `AI_BRAIN_EMBEDDING_URL`) — `--dry` passes,
    chat/coach routes answer without context until then
- **Auth wired end-to-end (client side)**: `lib/auth-client.ts` (`createAuthClient`
  from `better-auth/react`, `baseURL` = `NEXT_PUBLIC_APP_URL`); `/sign-in` and
  `/sign-up` rewritten from "coming soon" placeholders to real Better Auth forms
  (`signIn.email` / `signUp.email` with `callbackURL`), loading + error handling,
  redirect to `/profile` (or `callbackUrl`) + `router.refresh()`, sonner toasts;
  Google buttons explicitly disabled ("coming soon")
- Vercel build fixes: `postinstall: "prisma generate"` (gitignored
  `lib/generated/prisma`) + `next.config.js` gates `output: 'standalone'` to
  non-Vercel only (Next 16.3 bug #96646 `.next/next-server.js.nft.json` ENOENT)

## In Progress

- Apply DB schema + seed against live Neon (auth/domain tables currently have NO
  migration — only the two knowledge/vector migrations exist; `prisma db push`
  or new `migrate dev` needed before sign-in works)
- Add demo/login usability: seeded demo user for a default login + server-side
  session guards on the account-level `/api/ai/*` routes (proxy runs on edge and
  only does cookie-presence checks)
- Wire the connected dashboard MVP to the live backend (Better Auth session +
  Prisma): persist profile/recommendations/milestones per user, replace
  localStorage store when the DB path is live
- Reconcile demo prototype (mentor flow, `prototype-spec.md`) with the
  navigation-first product MVP core (`product-spec.md` §29)

## Next Up (when build resumes)

- MVP vertical live: auth → profile intake → career recommend (explained) →
  skill gaps → roadmap → coach (cite-or-abstain) → progress (dashboard flow
  works client-side today; swap store persistence to Prisma)
- Apply first migration for auth/domain tables + run `bun run db:seed` against a
  live Neon DB to verify sign-in/sign-up + seed end-to-end
- Seed a demo user (default login) so evaluators can sign in immediately
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
