# Progress Tracker

## Current Phase

- Planning complete · re-scoping after new problem definition

## Current Goal

- Finalize problem statement, root causes, and user journey for Team Compass DEEP Hackathon T2
- Prepare prototype development plan (no RAG for now — structured data approach)

## Completed

- Project scaffolded and building: Next.js 16 + React 19 + Tailwind 4 + Prisma 7 + Zod 4
- Package manager migrated: Bun 1.3 (was pnpm/npm)
- Sprint + milestones + tasks (`context/specs/sprint-plan.md`, `task-breakdown.md`)
- Coding standards (`context/code-standards.md`)
- Tech selection · folder structure · architecture review · domain/risks/use-cases
- Product/RAG/AI docs re-framed · Team Compass 2026
- Better Auth locked · Neon · OpenAI
- n8n MCP + Telegram secrets (gitignored)
- Problem statistics validated (Gen Z, FE Choices, JICA, UNDP, Myanmar Jobs reports)
- Root causes documented: generic advice, conflicting pathways, choice overload
- Solution re-framed: Personalised Career Companion — "We stay with you until you do it"
- User journey mapped: 6 steps + career support journey (Discover→Prepare→Experience→Launch→Grow)
- Mentor tiers defined: Community / Professional / Industry / Career advisor
- Stakeholder contributions documented (mentor: experience/feedback/perspective/professional advice/industry context/networking; platform: roadmap/tasks/progress tracking/reminders/accountability/reporting; student: execution)
- Competitor analysis completed: traditional mentor model vs. our action-tracking platform
- Page layouts defined: LANDING through PROGRESS (6-page clickable prototype)
- Prototype rules established: no RAG, no crypto, no gamification, no social feeds, no AI chatbots
- Content rules: realistic prototype data, placeholders for [CAREER GOAL], [USER NAME], [SKILL], etc.
- Accessibility requirements: contrast, button labels, spacing, font sizes, states, keyboard navigation

## In Progress

- Finalize 6-page clickable prototype (Landing → Assessment → Career Pathway → Next Step → Mentor → Progress)
- Prototype data population with realistic placeholder content
- Set up Better Auth authentication flow
- Initialize Neon PostgreSQL schema (profile, careers, skills, mentorship, progress)
- Design visual style: professional palette (Orange/Blue/White), typography, layout

## Next Up

- Build prototype pages 1-6 with Next.js + TypeScript
- Implement Assessment page flow (Questions 1-4 → Summary)
- Create Career Pathway visual roadmap
- Connect Next Step recommendations
- Mentor matching and booking flow
- Progress tracking dashboard
- Run accessibility review

## Open Questions

- Optional later: Google OAuth for Better Auth
- Prototype data: how many sample users/careers to pre-populate
- Mentor onboarding process for demo
- Offline/low-connectivity considerations

## Architecture Decisions

- Career GPS · Team Compass 2026 · Education Equity
- Neon + PostgreSQL (no pgvector for now — structured data only)
- Better Auth for authentication
- Next.js 16 (App Router) + Bun 1.3 + TypeScript 7
- No RAG for MVP — structured career→skills→resources dataset
- MVP: profile + career recommend + skill gap + roadmap + progress tracking
- 6-page clickable web prototype for demo
- Desktop-first responsive layout

## Session Notes

- New problem definition incorporated: 69% career stress, 44% Myanmar youth unsure of future, 80% skills mismatch
- RAG deprioritized for now — focusing on structured data + mentor coordination
- Prototype must be clickable with intentional interactions
- Primary user journey: LANDING → ASSESSMENT → ASSESSMENT RESULT → CAREER PATHWAY → NEXT MOVE → MENTOR → PROGRESS
- Do not scaffold until user says **build**