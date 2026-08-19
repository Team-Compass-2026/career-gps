# Career GPS

**Team:** Team Compass🧭 · **Track:** T2 — Education Equity · **Hackathon:** DEEP

## Overview

Young people have abundant career information (social media, courses,
influencers, job boards) but face **information overload**, unreliable advice,
and no clear personalized pathway. Many waste time and money on irrelevant
skills or stay stuck without counselors or networks.

**Career GPS** turns scattered career information into a **clear,
personalized, actionable roadmap**. It combines **RAG**, a structured
career→skills→resources dataset, user profiles, skill-gap analysis, and AI
reasoning — not a generic chatbot.

Journey: **Confusion → Understanding → Planning → Learning → Action → Career Readiness**

One-line pitch: *Helps young people turn overwhelming career information into
a personalized, evidence-based roadmap for what to learn and do next.*

Full narrative: `docs/product/DEEP-hackathon-overview.md`

## Goals

1. Recommend 3–5 fitting careers with explainable “why” (fit signals, not certainty).
2. Show skill gaps (current vs required) for a selected career.
3. Generate a personalized roadmap (hours/week, level, learning preference).
4. Answer career questions via RAG with citations / cite-or-abstain.
5. Support Education Equity: guidance without paid counselors or elite networks.

## Core User Flow (MVP)

1. Landing → sign up (**Better Auth**) → create profile  
2. Career assessment → 3–5 recommendations with explanations  
3. Select target career → skill-gap table  
4. Personalized roadmap (phased, time-aware)  
5. AI Career Assistant (RAG) for follow-up questions / roadmap tweaks  
6. Progress: mark skills / milestones complete  

Demo persona: **Alex** (CS student, basic Python/HTML/Excel, 10h/week, Data Analyst goal).

## Features

### MVP (must)

- User profile (education, skills, interests, goals, available hours, preferences)
- Career recommendations (scored guidance indicator)
- Skill gap analysis
- Personalized roadmap (RAG + structured data)
- AI assistant (streaming, tools, citations)
- Progress tracking (basic)

### Later (out of MVP build)

- Job/internship matching, CV/portfolio analysis, interview prep  
- Mentor matching, scholarships, labor-market live feeds, multi-agent tools  

## Target Users

University / high-school / college students, recent graduates, career switchers,
self-learners lacking counselors or networks.

## Scope

### In Scope (hackathon MVP)

- 10–20 curated careers; high-quality small dataset (not web crawl)
- Postgres + pgvector hybrid retrieval; Better Auth
- Four pillars: profile, career recommend, skill gap, RAG roadmap/chat

### Out of Scope (MVP)

- Full LMS, job guarantees, payments, social scrape as KB  
- Pinecone/Qdrant unless pgvector blocked  
- Fine-tuned models, voice, unbounded web browse  

## Success Criteria

1. Profile → ≥3 career suggestions with explanations.  
2. Select career → skill-gap table + time-aware roadmap.  
3. Coach Q&A cites sources or abstains; no fake course/employer URLs.  
4. Demo completes Alex journey in one session.  
5. Survey/problem validation noted for judges (research ≠ the product).  

## Ethics & Privacy

Recommendations are **guidance**, not destiny. Cite when possible; no
discriminatory routing; collect minimum data; PII not in public vector corpus;
users can control/delete profile data (design for MVP+).
