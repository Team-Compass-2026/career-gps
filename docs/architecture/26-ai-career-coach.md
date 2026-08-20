# AI Career Assistant — Career GPS

*Central interaction layer: personalized, explainable, tool-using — not a generic chatbot.*

## Role

Help one learner at a time: where they are, where they want to go, skill gaps,
what to learn next, and how to adjust for available hours — grounded in
structured data + RAG.

## Pattern

**Vercel AI SDK** `streamText` + tools. Single Career Assistant agent for MVP
(multi-tool agent later; no LangGraph DAG required for hackathon).

## System contract

1. Clarify missing profile fields (hours/week, target career, skills).  
2. Call tools before concrete recommendations.  
3. Explain **why** (fit factors, gaps) — never guarantee outcomes.  
4. Cite retrieved chunks; abstain when empty.  
5. Adapt roadmaps to available learning time.  

## Tools (MVP)

| Tool | Purpose |
|------|---------|
| `getProfile` | Education, skills, goals, hours, preferences |
| `listCareerFits` | Top careers + fit breakdown (structured engine) |
| `getSkillGaps` | Current vs required for selected career |
| `getRoadmap` | Current phased plan |
| `retrieveKnowledge` | RAG hybrid retrieve + citations |
| `listResources` | Curated resources for skills |
| `proposeRoadmapUpdate` | Draft change; **user confirms** |

## AI provider abstraction

Career GPS uses a **provider-agnostic AI layer** (`lib/ai/provider.ts`) that supports two backends:

- **pcore-brain** — opencode serve bridge at `https://pcore-brain.peterlianpi.site/` (Bearer or Basic auth). Model pool `"opencode"` → default model `mimo-v2.5-free` (free, open-source compatible). Configurable via env: `AI_BRAIN_URL`, `AI_BRAIN_TOKEN` / `AI_BRAIN_AUTH_USER/PASS`, `AI_BRAIN_MODEL_POOL`, `AI_BRAIN_MODEL`, `AI_BRAIN_WAKE_CMD`. Switch to OpenAI-compatible by setting `AI_PROVIDER=openai` and `AI_OPENAI_API_KEY` / `OPENAI_API_KEY` / `AI_OPENAI_MODEL`.

- **openai** — any OpenAI-compatible endpoint (`/chat/completions`). Configurable via `AI_OPENAI_BASE_URL`, `AI_OPENAI_API_KEY` / `OPENAI_API_KEY`, `AI_OPENAI_MODEL`.

The abstraction is **zero‑dependency** (uses `fetch` + `process.env` only) and can be swapped without code changes by changing `AI_PROVIDER` in the environment.

The coach UI sends messages to the provider via `app/api/ai/chat/route.ts`
(assistant, RAG context + `citations`) and `app/api/ai/coach/route.ts`
(career-coach, coaching prompt + RAG citations, optional `field` filter); the
coach layer builds the prompt by prepending RAG‑retrieved context citations
(see `lib/ai/rag.ts` `retrieveRAG`/`buildRAGContext`) before calling
`provider.complete()`.

## Example prompt flow (coach layer)

1. `retrieveKnowledge(userQuestion)` → returns top‑k citation‑chunks from the knowledge base.  
2. Build the `messages` array:

```
System: You are a career coach for Career GPS. Use the retrieved knowledge below to answer.

Context: [chunk 1 citation] … [chunk k citation]

User: {userQuestion}
```

3. Call `provider.complete(messages)` → returns the assistant’s reply text.  

This separation means you can swap the provider (OpenAI, OpenRouter, pcore‑brain) without touching the coach’s RAG prompt logic.

## Example behaviors

- “Business admin → tech, Excel, 10h/week” → career options + gaps + order  
- “Finished JavaScript, what’s next?” → gap/roadmap aware next step  
- “Only 10h/week” → stretch timeline, prioritize high‑importance gaps  

## Auth

All coach routes require **Better Auth** session.

## Non-goals (MVP)

Fine‑tune, voice, unbounded web browse, CV/GitHub analysis tools.

## Skills

`.cursor/skills/careerpath-rag/SKILL.md`, `careerpath-domain/SKILL.md`
