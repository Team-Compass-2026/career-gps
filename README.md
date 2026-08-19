# Career GPS
A Personalised Career Companion that stays with you until you reach the milestone.

**Slogan:** We stay with you until you do it.

## Team
- **Organization:** Team-Compass-2026 (DEEP Hackathon T2 Education Equity)
- **Track:** Education Equity
- **Members:** 
  - Tech Lead (Lead Developer, Architecture, Implementation)
  - Business Member 1 (Market Research, User Insights, Business Model)
  - Business Member 2 (Market Research, User Insights, Business Model)

## Project Overview
Career GPS is a personalized Career Navigation platform for young people and university students. The platform helps users move from career uncertainty to career action.

Instead of simply providing career information, courses, certificates, or generic advice, the platform:

1. **Understands** the user's career goal, current skills, experience, interests, and constraints.
2. **Identifies** the gap between the user's current state and desired career.
3. **Creates** a personalized career pathway.
4. **Prioritizes** what the user should do next.
5. **Recommends** relevant learning resources, projects, experiences, and opportunities.
6. **Connects** the user with relevant professional mentors.
7. **Tracks** progress toward career readiness.
8. **Continuously adapts** the pathway as the user progresses.

## Problem Solved
- 69% of students report significant stress thinking about future careers
- 49% feel pressure from parents to make good career decisions
- 44% of Myanmar youth cannot imagine their future jobs and skills
- 80% of Myanmar employers report skills mismatch

## Solution
Transforms career goals into clear and actionable pathways based on:
- Each user's goals, current skills and experience
- Relevant courses, projects, internships and career opportunities
- Achievable timelines
- Ongoing support, accountability and access to experienced mentors

## Primary Users
- University students
- Recent graduates
- Young professionals in early stages of their careers
- People overwhelmed by career information
- People who have a career goal but do not know how to reach it

## User Journey
LANDING → ASSESSMENT → ASSESSMENT RESULT → CAREER PATHWAY → NEXT MOVE → MENTOR → PROGRESS

## Screens (MVP)
1. **Landing** — Brand, hero, three benefits, how it works, CTA
2. **Assessment** — Career goal, background, skills, preferences
3. **Career Pathway** — Personalized route from current position to target career
4. **Next Step** — One clear action the user can take now
5. **Mentor** — Relevant professional mentor with matching reasons
6. **Progress** — How the user is progressing toward career goal

## Technology Stack
- **Framework:** Next.js 16 (App Router) + TypeScript 7
- **Runtime:** Bun 1.3 (package manager + runtime)
- **UI:** Tailwind CSS 4 + shadcn/ui
- **Client data:** TanStack Query
- **Auth:** Better Auth 1.7 (email/password MVP)
- **Database:** Neon PostgreSQL + Prisma 7
- **Vectors:** pgvector on Neon for RAG embeddings store
- **AI:** Vercel AI SDK + OpenAI (gpt-4o-mini + text-embedding-3-small)
- **Hosting:** Vercel + Neon

## Project Structure
```
career-gps/
├── app/                    ← Next.js App Router (no /src/ folder)
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx           ← Landing page
│   ├── (marketing)/page.tsx
│   ├── (auth)/
│   │   ├── sign-in/page.tsx
│   │   └── sign-up/page.tsx
│   └── (dashboard)/
│       ├── profile/page.tsx
│       ├── recommend/page.tsx
│       ├── gaps/page.tsx
│       ├── roadmap/page.tsx
│       └── coach/page.tsx
├── components/             ← UI components
├── lib/                    ← Utilities & validations
├── prisma/                 ← Database schema
├── data/                   ← CSV + knowledge base
├── scripts/ingest-knowledge.ts  # post-scaffold
├── manifest.json           ← PWA manifest
├── favicon.ico
├── next.config.js
├── tailwind.config.js
├── package.json
└── .env.example
```

## Development
```bash
# Install dependencies (Bun)
bun install

# Run development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

## Key Context Files (Updated to Career GPS Branding)
All files in `context/` have been updated from "CareerPath AI" to "Career GPS":
- `context/project-overview.md`
- `context/architecture.md`
- `context/ui-context.md`
- `context/progress-tracker.md`
- `context/specs/*.md` (14 files)
- `AGENTS.md`
- `project.yaml`

## Branding
- **Product Name:** Career GPS (hero-level on marketing)
- **Organization:** Team Compass🧭 (secondary, about/footer)
- **Slogan:** We stay with you until you do it
- **Color System:** Orange (optimistic/successful), Blue (professional/formal), White (clean/tidiness)
- **Typography:** Plus Jakarta Sans
- **Theme:** Human-Led Navigation → Modern EdTech + Professional Networking + Mentorship Community

## Hackathon Participation
- **Track:** T2 Education Equity
- **Organization:** Team-Compass-2026
- **Demo Persona:** Alex (CS student, basic Python/HTML/Excel, 10h/week, Data Analyst goal)
- **Success Criteria:**
  1. Profile → ≥3 career suggestions with explanations
  2. Select career → skill-gap table + time-aware roadmap
  3. Coach Q&A cites sources or abstains; no fake course/employer URLs
  4. Demo completes Alex journey in one session
  5. Survey/problem validation noted for judges

## Contributing
- **Tech Lead:** Code implementation, API development, UI components
- **Business Members:** Market research, user interviews, business model canvas, market analysis
- **Contribution Flow:** 
  - Tech: Code features, fix bugs, write tests
  - Business: Add user research, update market data, refine business model, review UI/UX
  - All: Contribute to context specs, review acceptance criteria

## Licensing
This project is part of the DEEP Hackathon T2 Education Equity.