# Architecture Context — Career GPS

## Stack

| Layer | Technology | Role |
| ----- | ---------- | ---- |
| Framework | Next.js (App Router) + TypeScript | Web + API host |
| API | Hono on Next route handlers | Type-safe API |
| UI | Tailwind + shadcn/ui | Product UI |
| Client data | TanStack Query | Server state |
| Auth | **Better Auth** (email/password MVP) | Sessions / identity (locked) |
| Database | **Neon** PostgreSQL + Prisma | Users, profiles, careers, skills, roadmaps, chat |
| Vectors | **pgvector** on Neon | RAG embeddings store |
| Search | Postgres FTS + hybrid vector | Keyword + semantic |
| AI | Vercel AI SDK + **OpenAI** (`gpt-4o-mini` + `text-embedding-3-small`) | Coach + roadmap + embeddings |
| Hosting | **Vercel** + Neon | Hackathon deploy |

Template reference: `docs/architecture/21-next-hono-prisma-query.md`

## System Boundaries

- `src/app/(marketing)/` — landing, pitch  
- `src/app/(auth)/` — Better Auth sign-in/up  
- `src/app/(dashboard)/` — profile, recommend, gaps, roadmap, coach  
- `src/server/api/` — Hono routes  
- `src/server/services/` — fit scoring, skill-gap, roadmap builder  
- `src/server/ai/` — Career Assistant agent + tools  
- `src/server/rag/` — ingest, chunk, embed, hybrid retrieve, cite  
- `prisma/` + `data/` — schema + curated CSV/seed dataset  
- `context/` + `docs/` — product ground truth  
- `.cursor/skills/` — agent skills (no app build yet)

## Storage Model

- **Postgres:** users (Better Auth tables), profiles, careers, skills,
  `career_skills`, resources, `user_skills`, roadmaps, roadmap_steps, chat,
  knowledge sources/chunks + embeddings  
- **Structured graph:** Career → Skills → Level → Resources → Projects → Roles  
- **Vectors:** published knowledge chunks only — **no PII embeddings**

## Auth and Access Model

- **Better Auth** email/password for MVP (Google OAuth deferred)  
- Learner owns profile, roadmap, chat  
- Curator role publishes knowledge (`published=true`)  
- Coach tools read only published corpus + caller’s own profile/roadmap  

## Recommendation & gap engines (non-LLM core)

- **Career fit score** (guidance indicator): interest + skill + education +
  experience + goal + preference weights — never presented as certainty  
- **Skill gap:** current `user_skills` vs `career_skills` required levels  
- **Roadmap:** gap priority + available hours/week + learning preference → phases  

LLM explains and personalizes; structured engines own deterministic comparisons.

## System Design & Infrastructure

| Concept | Service / Tech | Notes |
|---------|---------------|-------|
| **Compute** | Next.js on Vercel | Serverless API + chat stream |
| **Database** | Neon + pgvector | One DB for app + vectors |
| **Search** | FTS → hybrid pgvector | See `25-rag-career-coach.md` |
| **Auth** | Better Auth | Locked |
| **Rate limiting** | Per-user on `/api/chat` | Cost + abuse |
| **Observability** | Provider usage logs + Sentry later | Token spend |

## Scaling & Performance Constraints

- Demo: tens of concurrent users  
- Chat TTFT P99 &lt; 2s warm  
- Corpus: 10–20 careers, curated resources (hundreds of chunks max for MVP)  

## Invariants

1. Cite-or-abstain for concrete courses, employers, salaries, job claims.  
2. Fit scores are **guidance**, not predictions of success.  
3. PII never written into the public vector index.  
4. Better Auth session required for profile/roadmap/chat mutations.  
5. Roadmap/chat tools propose; user confirms destructive pathway changes.  
6. No secrets in git.  
7. **Do not scaffold/build the app until product owner says build** — docs +
   skills first (current phase).
