# Career GPS — DEEP Hackathon Product Brief

**Product:** Career GPS  
**Team:** Team Compass🧭  
**Track:** T2 — Education Equity  

Canonical short form for agents: `context/project-overview.md`.  
This file holds expanded product/architecture notes for the team.

## Problem

Information overload + unreliable advice + no personalized pathway → decision
paralysis, wasted courses/certs, lack of counselors/networks.

## Solution

Personal career navigation assistant: profile → career recommendations →
skill-gap analysis → personalized roadmap → RAG AI assistant → progress.

Differentiation: **personalization + evidence + structured planning**, not a
generic chatbot answer to “How do I become X?”

## MVP (four pillars)

1. User profile  
2. Career recommendation (3–5, explainable fit scores)  
3. Skill gap analysis  
4. AI roadmap + RAG assistant  

## Dataset

Curated **Career → Skills → Level → Resources → Projects → Jobs**.  
Prefer small high-quality CSV/seed (10–20 careers) over huge dirty scrapes.  
Example seed shape: `data/README.md`.

## RAG

Hybrid: structured queries + FTS + pgvector. Cite-or-abstain. Update KB without
retraining. Details: `docs/architecture/25-rag-career-coach.md`.

## Stack (locked)

Next.js + TS + Tailwind + shadcn · Hono · Postgres + pgvector · Prisma ·
Vercel AI SDK · **Better Auth** · Vercel host.

## Auth

**Better Auth only** (not Clerk/Auth.js for this project unless explicitly changed).

## Validation

Survey validates the problem; it is not the product. Combine survey + dataset +
RAG + LLM.

## Demo

Persona **Alex** → profile → recommendations → select Data Analyst → gaps →
roadmap → “10 hours/week, what to prioritize?” adaptation.

## Ethics

Guidance not guarantees; sources when possible; privacy-by-design; no PII in
public vectors.

## Build status

**Docs + skills only — do not scaffold/build the app until requested.**
