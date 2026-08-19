# AI Workflow Rules — Career GPS

## Approach

Spec-driven against six-file context + `docs/product/`. Do not invent careers,
courses, or employers outside curated data design.

**Current mandate: improve docs and skills only — do not build/scaffold the app
until the user explicitly asks.**

## Scoping Rules

- One MVP pillar per implementation cycle when build starts  
- Load `.cursor/skills/careerpath-domain`, `careerpath-rag`, `better-auth-next`  
- Auth is Better Auth only  

## When to Split Work

Split if combining: auth+RAG, dataset ingest+UI chrome, fit engine+chat tools.

## System Design Triggers

| Trigger | Doc / skill |
|---------|-------------|
| Recommendations / gaps | Domain skill + architecture engines |
| Chat / citations | `careerpath-rag` + `26-ai-career-coach.md` |
| Auth routes | `better-auth-next` |
| New careers/resources | `data/README.md` |

## Verification (when building)

- Alex demo path  
- Cite-or-abstain checks  
- Unauthenticated chat rejected  
- Update `progress-tracker.md`  

## Delivery Approach

1. Finish enterprise stories/acceptance (now)  
2. Optional CSV samples  
3. Scaffold only on explicit build request  
4. P0 vertical: auth → profile → dataset → recommend → gap → RAG → chat  
