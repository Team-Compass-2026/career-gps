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

## Example behaviors

- “Business admin → tech, Excel, 10h/week” → career options + gaps + order  
- “Finished JavaScript, what’s next?” → gap/roadmap aware next step  
- “Only 10h/week” → stretch timeline, prioritize high-importance gaps  

## Auth

All coach routes require **Better Auth** session.

## Non-goals (MVP)

Fine-tune, voice, unbounded web browse, CV/GitHub analysis tools.

## Skills

`.cursor/skills/careerpath-rag/SKILL.md`, `careerpath-domain/SKILL.md`
