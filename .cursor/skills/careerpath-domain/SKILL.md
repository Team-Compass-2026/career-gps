---
name: careerpath-domain
description: >-
  CareerPath AI (Team Compass🧭, DEEP T2 Education Equity) product domain:
  profiles, career fit scores, skill gaps, roadmaps, progress. Use when
  implementing or planning CareerPath features — not generic chatbot apps.
---

# CareerPath AI — Domain Skill

**Do not scaffold the app unless the user explicitly asks to build.**

## Product

- Name: CareerPath AI · Team: Team Compass🧭 · Track: Education Equity  
- Read: `context/project-overview.md`, `docs/product/DEEP-hackathon-overview.md`

## MVP order (when building)

1. Better Auth + profile  
2. Curated career/skills dataset + seed  
3. Career recommendation (fit score + explanations)  
4. Skill gap engine  
5. RAG pipeline  
6. Personalized roadmap  
7. AI chat UI  
8. Progress tracking  

## Engines (deterministic)

- Fit score = weighted interest/skill/education/experience/goal/preference — label as guidance  
- Skill gap = user_skills vs career_skills required levels  
- Roadmap = gaps + available_hours + preferences → phases  

## Invariants

- Cite-or-abstain for concrete claims  
- No PII in vector index  
- Auth = Better Auth only  

## Out of MVP

LMS, job guarantees, payments, mentor marketplace, live labor APIs, multi-agent DAG.
