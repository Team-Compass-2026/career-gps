# Use Cases — Career GPS (MVP)

**Team Compass🧭 · Better Auth · No build until requested**

| ID | Name | Primary actor |
|----|------|----------------|
| UC-1 | Sign up / sign in | Learner |
| UC-2 | Create / edit profile | Learner |
| UC-3 | Career recommendations (T0 fit) | Learner |
| UC-4 | Select target career | Learner |
| UC-5 | Skill gap analysis (T0) | Learner |
| UC-6 | Personalized roadmap | Learner |
| UC-7 | Ask Career Assistant | Learner |
| UC-8 | Track progress | Learner |
| UC-9 | Curator seed knowledge | Curator |

**Alex demo:** UC-1→2→3→4→5→6→7→8 (UC-9 before demo).

## Domain (sketch)

User (Better Auth) → Profile → UserSkill/Career target/Roadmap/Chat  
Career ↔ Skill via CareerSkill · Resource · KnowledgeChunk (published, no PII)

## Architecture

- T0 SQL: fit + gaps · T1/T2: Q&A · Cite-or-abstain · Session on all mutations

Full architect write-up: enterprise phase use-cases (2026-08-10).
