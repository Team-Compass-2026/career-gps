# Code Standards — Career GPS

**Team Compass🧭 · Apply when build starts (no scaffold yet)**

## TypeScript
- `strict: true`; avoid `any`; prefer `unknown` + narrow
- Shared types from Zod (`z.infer`); `server-only` where needed
- ESM; match Next + Hono conventions

## Naming
- Components: `PascalCase.tsx` · hooks: `useCamelCase.ts`
- Server dirs: `kebab-case` / domain (`rag/`, `ai/`, `services/`)
- Prisma: PascalCase models, camelCase fields

## API & Zod
- Validate all inputs with Zod before logic
- Consistent `{ data }` / `{ error: { code, message } }`
- Better Auth session before mutations; `401` if missing
- Rate-limit `/api/chat` per user

## Prisma / Neon / pgvector
- Prisma singleton only; vector/FTS helpers in `rag/`
- Migrations + curated `data/` seeds
- **No PII in embeddings**; published chunks only for coach

## Better Auth
- Email/password MVP only — no parallel auth libs
- Coach tools: own profile/roadmap + published corpus

## AI / Structured Data
- Vercel AI SDK; OpenAI mini + embedding-3-small
- **Cite-or-abstain** for courses/employers/salaries/jobs
- Fit/gap/roadmap math in `services/`; LLM explains only
- Fit scores = guidance, not certainty

## Testing (MVP)
- Unit: fusion, citations, fit/gap pure fns
- Smoke: mocked chat; unauthenticated rejected
- Manual: Alex demo path

## Git / secrets
- `feat|fix|docs|chore|refactor|test(scope): why`
- Never commit `.env` / tokens

## Lint / format
- ESLint + Prettier **or** Biome once scaffolded; CI: lint + typecheck

## Definition of Done
Spec met · types clean · auth/tenancy · cite-or-abstain if AI · guidance copy · tests for touched logic · no secrets · progress-tracker updated · Alex path unbroken
