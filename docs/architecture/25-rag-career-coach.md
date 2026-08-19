# RAG Architecture — Career GPS

*Team Compass🧭 · Education Equity · curated retrieval, not RAG-everything.*

## Why RAG

Career requirements, skills, and resources change. RAG keeps answers
**controllable, explainable, updatable**, and less dependent on model memory.

## Flow

```text
User + Profile + Question
  → Query processing (optional rewrite)
  → Hybrid retriever (T0 structured | T1 FTS | T2 pgvector)
  → Career / skill / learning / job KB
  → Context pack + citations
  → LLM (AI SDK)
  → Personalized guidance / roadmap text
```

## Tiers

| Tier | Tech | Role |
|------|------|------|
| **T0** | SQL on careers, skills, resources, career_skills | Fit scores, gaps, catalogs |
| **T1** | Postgres FTS on KnowledgeChunk | Keyword career Q&A |
| **T2** | Hybrid FTS + **pgvector** + RRF | Semantic / vague questions |

Prefer **pgvector in Postgres** over Pinecone/Qdrant for MVP complexity.

## Dataset + RAG together

Structured graph: **Career → Skills → Level → Resources → Projects → Roles**  
Unstructured docs: career descriptions, job-requirement notes, learning guides.  
Survey validates problem; it is **not** the knowledge base.

## Chunking & privacy

- 300–800 tokens; store heading, source title, URL, audience, `updated_at`  
- **Never embed PII** (profile, chat) into the public corpus  
- Only `published=true` chunks for coach tools  

## Cite-or-abstain

Concrete courses, employers, salaries, “required for job X” claims need
retrieval citations (or clear general-advice labeling). Empty retrieval → abstain.

## Eval (hackathon-light)

≥10 golden Q&As; citation present %; refuse fake institutions; log retrieval ids.

## Related

- Assistant: `26-ai-career-coach.md`  
- Domain skill: `.cursor/skills/careerpath-rag/SKILL.md`  
- Seed: `data/README.md`
