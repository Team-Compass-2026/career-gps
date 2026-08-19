# Task Breakdown — Career GPS (MVP)

**Team Compass🧭 · Estimates S/M/L · Depends-on listed**

## M1 Shell + identity + profile
- T1.1 Scaffold Next + pnpm + env stubs — **M**
- T1.2 Neon + Prisma User/Profile — **M** ← T1.1
- T1.3 Better Auth email + session — **M** ← T1.2
- T1.4 Sign-up/in UI (US-1) — **S** ← T1.3
- T1.5 Profile API + form (US-2) — **M** ← T1.3
- T1.6 Smoke protected routes — **S** ← T1.4, T1.5

## M2 Curated KB
- T2.1 Career/Skill/Resource/Chunk models — **M** ← T1.2
- T2.2 Seed 10–20 careers incl. Data Analyst (US-9) — **M** ← T2.1
- T2.3 pgvector + embed published — **M** ← T2.2
- T2.4 Curator verify corpus — **S** ← T2.2, T2.3

## M3 Recommend + select
- T3.1 T0 fit-score service — **M** ← T1.5, T2.2
- T3.2 Recs UI 3–5 + why (US-3) — **M** ← T3.1
- T3.3 Select target career (US-4) — **S** ← T3.2
- T3.4 Alex check recommend/select — **S** ← T3.3

## M4 Gaps + roadmap
- T4.1 Skill-gap + table (US-5) — **M** ← T3.3, T2.2
- T4.2 Roadmap generator (US-6) — **L** ← T4.1
- T4.3 Seed/cited resources only — **S** ← T4.2
- T4.4 Alex check gaps/roadmap — **S** ← T4.2

## M5 Coach + progress + demo
- T5.1 Hybrid retrieve + streaming coach (US-7) — **L** ← T2.3, T4.2
- T5.2 Cite-or-abstain + empty dataset — **M** ← T5.1
- T5.3 Progress marks (US-8) — **M** ← T4.2
- T5.4 Full Alex rehearsal — **M** ← T5.2, T5.3
- T5.5 Vercel + Neon deploy — **S** ← T5.4

Start at **T1.1** only after explicit **build**.
