---
name: careerpath-rag
description: >-
  CareerPath AI RAG pipeline: curated career/skills KB, hybrid FTS+pgvector,
  cite-or-abstain, AI SDK coach tools. Use when designing or implementing
  retrieval, embeddings, knowledge ingest, or grounded career answers.
---

# CareerPath AI — RAG Skill

**Docs only until build is requested.** Architecture: `docs/architecture/25-rag-career-coach.md`,
`docs/architecture/26-ai-career-coach.md`.

## Tiers

| Tier | Tech | Use |
|------|------|-----|
| T0 | SQL on careers/skills/resources | Fit, gaps, catalog |
| T1 | Postgres FTS on chunks | Keyword Q&A |
| T2 | Hybrid FTS + pgvector + RRF | Semantic questions |

Start T0+T1; enable T2 after seed ≥20 chunks.

## Pipeline

Clean → chunk (300–800 tokens) → embed → upsert → retrieve top 6–8 → pack ≤3–4k tokens → LLM with citations.

## Coach tools (MVP)

`getProfile`, `retrieveKnowledge`, `getPathway`/`getRoadmap`, `listOpportunities` (resources), `proposeRoadmapUpdate` (user confirms).

## Anti-patterns

RAG-everything; embedding chat history/PII; inventing course URLs; 30+ chunks per prompt.
