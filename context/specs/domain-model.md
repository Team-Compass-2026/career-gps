# Domain Model — Career GPS (MVP)

**Team Compass🧭 · Better Auth · No build until requested**

## Entities

User · Profile · UserSkill · Career · Skill · CareerSkill · Resource ·
Roadmap · RoadmapStep · KnowledgeSource · KnowledgeChunk · ChatThread · ChatMessage

Computed (not SoT): CareerFitScore, SkillGap.

## Relationships

User 1—1 Profile · User—* UserSkill — Skill · Profile → target Career?  
User —* Roadmap — Career · Roadmap —* RoadmapStep → Skill?/Resource?  
Career —* CareerSkill — Skill · Resource linked to skills/careers  
KnowledgeSource —* KnowledgeChunk (published, no PII) · User —* ChatThread —* ChatMessage

## Bounded contexts

auth · learner-profile · catalog · recommendation · roadmap · rag-coach · curation

## Invariants

Session on mutations · fit = guidance · cite-or-abstain · published-only retrieve ·
no PII in vectors · coach proposes roadmap changes · curator publishes corpus

Full write-up: enterprise domain-model phase (2026-08-10).
