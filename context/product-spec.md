# Career GPS 🧭 — Master Project Context, Scope, Data & Product Specification

Canonical source of truth for the Career GPS product. Distilled operational
view: `context/project-overview.md`. Specs that constrain implementation live
in `context/specs/`.

---

# 1. Project Identity

**Product name:** Career GPS

**Previous / team name:** Team Compass 🧭

**Category:** AI-powered career guidance, career exploration, personalized career
planning, education technology, youth development, human-centered AI.

**Hackathon:** DEEP Hackathon · Track T2 — Education Equity

**Core concept:** A personalized career navigation platform that helps young
people move from career confusion to a clear, evidence-based, actionable career
pathway.

**Core metaphor:** A GPS helps people understand *where they are*, *where they
want to go*, *which routes are available*, *what obstacles exist*, *which route
is most suitable*, and *what the next step should be*. Career GPS applies the
same idea to careers.

**Core promise:** *Stop guessing. Start building your career.*

**Positioning:** *Your personalized career pathway — from where you are today to
where you want to be.*

**Brand idea:** *We are your compass 🧭 for navigating your career.*

---

# 2. The Problem

Young people today have access to enormous amounts of career information
through social media, YouTube, TikTok, Facebook, LinkedIn, online courses,
career websites, influencers, universities, friends and family, professionals,
job platforms, AI tools, and online communities.

More information does not necessarily create better career decisions.
Information overload creates:

- Confusion
- Uncertainty
- Decision paralysis
- Conflicting advice
- Lack of direction
- Poor career choices
- Wasted time and money
- Random course / internship selection
- Skill gaps
- Lack of confidence
- Difficulty understanding the labor market
- Difficulty connecting education with employment

The fundamental problem is therefore not simply *"young people cannot find
career information."* The deeper problem is:

> **"Young people struggle to turn fragmented career information into a
> personalized and actionable career strategy."**

---

# 3. Current Challenges

A young person may ask:

- What career should I choose?
- What am I actually good at?
- Which career fits my interests?
- What skills do I need?
- Which university major should I choose?
- Should I change my major?
- Which internship should I apply for?
- Which course should I take?
- What jobs are available?
- What is the difference between similar careers?
- What should I learn first?
- Am I wasting time?
- How can I move from my current situation to my desired career?
- What should I do this month?
- How can I know whether my career plan is realistic?

Existing solutions each answer only one part of the problem:

| Solution | Provides |
|----------|----------|
| Career websites | Information |
| Job platforms | Vacancies |
| Course platforms | Learning resources |
| Personality tests | Assessments |
| Mentors | Human advice |
| AI assistants | Conversational answers |

Users must connect all these pieces themselves. **Career GPS connects the
pieces.**

---

# 4. Root Causes

1. **Information fragmentation** — career information is distributed across many
   platforms and sources.
2. **Information overload** — too many options without a way to prioritize.
3. **Lack of personalization** — generic advice ignores the individual's
   education, skills, interests, experience, goals, constraints, location, and
   career preferences.
4. **Weak connection between current state and future goal** — tools describe a
   career but rarely answer *"given where you are now, what should you do
   next?"*
5. **Lack of continuous guidance** — career decisions are not one-time; skills,
   interests, and circumstances change.
6. **Limited access to quality career mentoring** — not every young person has
   access to experienced professionals, counselors, or mentors.

---

# 5. Target Users

**Primary:** high-school students, university students, recent graduates,
early-career professionals, career explorers, people considering a career
transition.

**Secondary (future stakeholders):** universities, schools, training
organizations, career centers, NGOs, youth-development organizations,
employers, mentors, career coaches, internship providers.

---

# 6. User Jobs-to-Be-Done

- When I am confused about my career, I want to **understand myself** so that I
  can make a better career decision.
- When I know the career I want, I want to **understand the gap between my
  current skills and the required skills** so that I know what to learn.
- When I am exploring careers, I want **reliable information** so that I do not
  depend on random social-media advice.
- When I am choosing between multiple career paths, I want to **compare them**
  so that I can make an informed decision.
- When I have a career goal, I want a **step-by-step roadmap** so that I know
  what to do next.
- When my situation changes, I want to **update my career plan** so that my
  roadmap stays relevant.
- When I need advice, I want **AI and potentially human mentors** so that I
  receive both scalable and contextual guidance.

---

# 7. Proposed Solution

Career GPS combines: career self-discovery, career exploration, skills
analysis, career-path matching, personalized roadmaps, learning
recommendations, internship/job guidance, AI career assistance, potential human
mentoring, and progress tracking.

The platform answers three fundamental questions:

| Question | Meaning |
|----------|---------|
| **Where am I?** | Understanding the user's current profile |
| **Where can I go?** | Identifying suitable career possibilities |
| **How do I get there?** | Creating a personalized roadmap |

---

# 8. Core Value Proposition

> Career GPS transforms scattered career information into a personalized career
> pathway.

Instead of simply giving users more information, Career GPS helps users:

**Discover → Explore → Compare → Plan → Act → Track → Adapt**

---

# 9. Core User Journey

1. **Start** — create an account and provide basic information.
2. **Understand Yourself** — collect education, skills, interests, experience,
   goals, preferences, strengths, career interests.
3. **Explore Careers** — system recommends potential career paths based on the
   profile.
4. **Compare Paths** — compare careers by required skills, education, typical
   responsibilities, growth, market demand, learning and entry requirements.
5. **Select a Direction** — choose a target career or keep several possible
   paths.
6. **Identify the Gap** — compare *current profile → target career
   requirements*; identify missing skills, weak skills, required experience,
   recommended learning, portfolio and internship requirements.
7. **Generate Career Roadmap** — create a personalized pathway.

   Example: *University student (basic programming, no experience) → Junior
   Full-Stack Developer*:
   1. Strengthen HTML/CSS
   2. Learn JavaScript
   3. Learn a frontend framework
   4. Learn backend development
   5. Learn databases
   6. Build projects
   7. Create portfolio
   8. Apply for internships
   9. Gain professional experience
   10. Apply for junior roles

8. **Take Action** — recommend concrete next steps.
9. **Track Progress** — track completed skills, courses, projects,
   applications, experience, milestones.
10. **Adapt** — the roadmap changes as the user gains skills, experience, or
    interests.

---

# 10. Product Structure

## Landing Page

**Navigation:** How It Works · Mentors · About
**Primary CTA:** Get Started

**Hero:**
- Headline: *Stop guessing. Start building your career.*
- Subheadline: *Your personalized career pathway — from where you are today to
  where you want to be.*
- Primary CTA: *Build My Career Pathway*
- Secondary CTA: *See How It Works*
- Visual: a GPS-inspired visualization — *You are here → Career Goal → Route →
  Milestones*.

---

# 11. Core Product Pages

## 11.1 Landing Page

Purpose: explain the problem, introduce Career GPS, show how it works, build
trust, convert visitors.

Main sections: Hero · Problem · How Career GPS works · Career pathway
visualization · Features · Mentor / human guidance · Impact · CTA · Footer.

## 11.2 Onboarding

Collect the minimum information required to personalize the experience.

- **Basic Profile:** age range, education level, field of study, current
  occupation, location.
- **Interests:** technology, business, engineering, design, healthcare,
  education, agriculture, finance, marketing, other.
- **Skills:** technical, soft, digital, communication, leadership, problem
  solving.
- **Experience:** internship, volunteer work, projects, freelancing, part-time
  work, employment.
- **Goals:** find a career, change career, find an internship, improve skills,
  find a job, build a portfolio, start a business.

---

# 12. Self-Discovery Module

Helps users understand interests, strengths, skills, values, working
preferences, motivations, and career preferences.

Assessment categories: interests (what activities are enjoyed), strengths (what
the user performs well), skills (what the user can currently do), values (what
matters in a career), work preferences (individual vs team; remote vs office;
stable vs entrepreneurial; creative vs analytical; people-focused vs
technology-focused).

> Assessment results are **signals that support exploration**, not absolute
> predictions.

---

# 13. Career Exploration Module

Explore careers through: career categories, search, recommendations,
skill-based matching, interest-based matching, goal-based recommendations.

Each career profile can contain: title, description, typical responsibilities,
required skills, recommended education, entry-level requirements, common tools,
related careers, learning pathways, portfolio examples, internship
opportunities, job opportunities, career progression.

---

# 14. Career Matching

AI computes a compatibility score between a user's profile and a career:

**Career Match = f(interests, skills, education, experience, goals,
preferences)**

| Career             | Match |
| ------------------ | ----: |
| Frontend Developer |   87% |
| UX/UI Designer     |   78% |
| Product Manager    |   72% |
| Data Analyst       |   68% |

The score is **guidance, not a definitive judgment**. The system explains:

- **Why this career?** e.g. strong interest in technology, existing JavaScript
  knowledge, good problem-solving skills, current CS education.
- **What is missing?** e.g. React, backend development, database experience,
  professional project experience.

---

# 15. Skill Gap Analysis

One of the most important parts of Career GPS. Compares **user skills** against
**career requirements** and produces:

- **Strong skills** — already meeting the target requirement.
- **Developing skills** — need improvement.
- **Missing skills** — not yet present.
- **Experience gaps** — e.g. no internship, no portfolio, no real-world
  project, no teamwork experience.

---

# 16. Personalized Career Roadmap

Converts career goals into manageable steps.

Example: **Destination** Junior Software Engineer · **Current Position**
Computer Science Student.

- **Phase 1 — Foundation** (1–2 months): programming fundamentals, Git/GitHub,
  HTML/CSS, JavaScript.
- **Phase 2 — Development** (2–3 months): React, Node.js, REST APIs, databases.
- **Phase 3 — Portfolio:** build 2–3 projects, deploy projects, create GitHub
  portfolio.
- **Phase 4 — Experience:** internships, hackathons, freelance, open source.
- **Phase 5 — Employment:** resume, LinkedIn, interview preparation, job
  applications.

---

# 17. AI Career Assistant

Not a general chatbot. The assistant understands the user's profile, career
goals, skills, roadmap, progress, previous conversations, and career interests.

Example questions:

- What should I learn next?
- Am I ready for a frontend internship?
- Which skill should I prioritize this month?
- What projects should I build?
- Should I choose software engineering or data analysis?
- How can I improve my portfolio?
- What should I do if I cannot complete my roadmap?

The AI answers using the user's personal context and trusted career data.

---

# 18. RAG / Knowledge System

A major technical direction is **RAG-style architecture**
(Retrieval-Augmented Generation): retrieve relevant information from a curated
career knowledge base before generating an answer.

Possible knowledge sources: career descriptions, skill frameworks, job
descriptions, learning resources, industry information, internship
information, career pathways, educational information, labor-market data,
mentor knowledge, user-specific information.

Basic architecture:

```
User → Career GPS Interface → AI Career Assistant →
User Profile + Career Context → Retriever → Career Knowledge Base →
Relevant Documents → LLM → Personalized Response
```

> **MVP decision (see `architecture.md`):** the MVP uses structured, curated
> data for deterministic recommendations/gaps/roadmap and a citation-grounded
> assistant — no full RAG pipeline in the first build. RAG is the documented
> future direction for expanding the knowledge base.

---

# 19. Data Strategy

Not dependent only on AI-generated knowledge. Combine:

- **User-generated data:** profile, skills, interests, goals, experience,
  progress, feedback.
- **Curated career data:** career descriptions, skill requirements, career
  pathways, learning resources, competency frameworks.
- **External / public data:** job descriptions, public labor-market info,
  public educational resources, public career databases.
- **Interaction data:** searches, career views, saved careers, roadmap actions,
  completed milestones, user feedback.

---

# 20. Potential Data Model

- **User:** user_id, name, education, field_of_study, experience, location,
  interests, skills, goals, preferences
- **Skill:** skill_id, name, category, description, level
- **Career:** career_id, title, description, category, responsibilities,
  required_skills, preferred_skills, education, related_careers
- **CareerSkill:** career_id, skill_id, importance, required_level
- **UserSkill:** user_id, skill_id, current_level, evidence, last_updated
- **Roadmap:** roadmap_id, user_id, target_career, created_at, updated_at,
  status
- **RoadmapStep:** step_id, roadmap_id, title, description, skill, priority,
  estimated_duration, status
- **LearningResource:** resource_id, title, provider, URL, skills, level,
  format
- **Mentor:** mentor_id, expertise, experience, availability, career_fields

---

# 21. Data Quality Principles

Recommendations prioritize: accuracy, recency, relevance, source transparency,
explainability, diversity of career paths.

The system distinguishes **verified information** from **AI-generated
recommendations**, and users can understand why a recommendation was made.

---

# 22. Human Mentoring

Broader direction: combine AI with human mentoring.

- **AI for scalability:** instant guidance, roadmap generation, skill-gap
  analysis, career exploration, daily support.
- **Humans for depth:** personal experience, context, emotional support,
  industry insight, feedback, accountability, real-world perspective.

> AI helps users navigate; humans help users understand the journey.

> **MVP status:** mentoring is a future/nice-to-have direction. The MVP focuses
> on the AI-navigation core.

---

# 23. Differentiation

Not another job board, course platform, personality test, career-information
website, or AI chatbot. Differentiation is the connection between:

**Self → Career → Skills → Gap → Roadmap → Action → Progress → Mentoring**

The product focuses on the entire career-navigation journey.

---

# 24. Unique Selling Proposition

> A personalized career navigation system that turns your current skills,
> interests, and goals into an actionable career roadmap.

Short: *Your GPS for career decisions.*
Alternative: *Know where you are. Know where you want to go. Know what to do
next.*

---

# 25. Impact

**Reduce:** career confusion, information overload, random career decisions,
unnecessary learning, skill gaps, time wasted on unsuitable paths.

**Increase:** career clarity, self-awareness, skill development, employability,
internship readiness, job readiness, confidence, access to mentoring.

---

# 26. Social Impact

Especially valuable for young people without access to professional networks,
career counselors, experienced mentors, or reliable career information. Long-term
vision: make high-quality career guidance more accessible.

---

# 27. Business Model

- **Freemium:** free basic exploration/profile/recommendations; premium
  personalized roadmap, advanced skill-gap analysis, AI career assistant,
  progress tracking, advanced recommendations.
- **B2B / Institutional:** "Career GPS for institutions" (universities,
  schools, training orgs, NGOs, youth programs).
- **Mentor Marketplace (future):** paid sessions, subscriptions, commission.
- **Employer Partnerships (future):** internship matching, graduate talent
  discovery, skills-based recruitment.

---

# 28. Market Entry Strategy

1. **Phase 1 — Students:** university students and young people.
2. **Phase 2 — Career Communities:** student orgs, youth orgs, universities,
   NGOs.
3. **Phase 3 — Mentors:** build a mentor network.
4. **Phase 4 — Institutions:** offer Career GPS as a career-development
   platform.
5. **Phase 5 — Employers:** connect qualified users with internships and
   entry-level opportunities.

---

# 29. MVP Scope

Focus on the essentials.

**Must have:**
1. User onboarding — education, skills, interests, career goal, experience.
2. Career recommendations — a shortlist of suitable careers.
3. Career explanation — why the career fits, required skills, missing skills.
4. Personalized roadmap — a step-by-step pathway.
5. AI career assistant — answer questions about the roadmap.
6. Progress tracking — mark steps as not started / in progress / completed.

---

# 30. Nice-to-Have Features (post-MVP)

Human mentor matching · job matching · internship matching · portfolio analysis
· resume analysis · LinkedIn profile analysis · skill verification ·
labor-market analytics · community · peer support · gamification ·
notifications · career-path simulations · institution dashboard.

---

# 31. Out of Scope for Initial MVP

Full recruitment marketplace · full online-course platform · large social
network · complex psychometric testing · real-time labor-market prediction ·
full HR management system · full mentor marketplace · advanced enterprise
analytics.

The MVP proves the core hypothesis:

> Personalized career information + skill-gap analysis + actionable roadmap can
> reduce career confusion and improve decision-making.

---

# 32. Validation Strategy

Investigate: career confusion and its causes · information sources and trust ·
decision problems · skill-gap understanding · usefulness of roadmaps ·
desire for human mentors · trust in an AI career assistant · willingness to
use/pay and which features are most valuable.

---

# 33. Validation Hypotheses

1. Young people experience significant career uncertainty despite abundant
   information.
2. Users need personalized guidance, not generic career information.
3. Users value knowing the gap between current skills and career requirements.
4. A step-by-step roadmap is more actionable than a simple recommendation.
5. Users are interested in combining AI guidance with human mentoring.

---

# 34. Success Metrics

- **User:** onboarding completion, exploration rate, recommendation
  engagement, roadmap creation/completion, weekly active users, returning users.
- **Outcome:** career clarity before/after, confidence before/after, completed
  roadmap steps, skill development, internship/job applications.
- **AI:** recommendation relevance, user satisfaction, retrieval accuracy,
  hallucination rate, response usefulness.

---

# 35. AI Safety and Trust

Career advice influences important life decisions. The system should:

- Avoid claiming certainty.
- Explain recommendations.
- Show evidence where possible.
- Encourage considering multiple paths.
- Avoid discriminatory recommendations.
- Avoid making decisions on behalf of the user.
- Clearly distinguish data from AI suggestions.
- Allow users to challenge recommendations.

The product guides users rather than controls their choices.

---

# 36. Technical Concept

- **Frontend:** React / Next.js, responsive, light/dark theme.
- **Backend:** Node.js / Python, REST API or similar.
- **Database:** PostgreSQL / Supabase / Firebase.
- **AI:** LLM, embeddings, RAG, vector database.
- **Retrieval:** pgvector / Pinecone / Weaviate / Qdrant.
- **Authentication:** email/password, OAuth.
- **Deployment:** Vercel / Cloudflare / AWS / Render / Supabase.

The exact stack can change according to team implementation capacity. Locked
choices for this project: `context/architecture.md`, `specs/tech-selection.md`.

---

# 37. High-Level AI Architecture

```
                    USER
                      |
                      v
              CAREER GPS WEB APP
                      |
          +-----------+-----------+
          |                       |
          v                       v
    USER PROFILE             AI ASSISTANT
          |                       |
          +-----------+-----------+
                      |
                      v
              CAREER ENGINE
                      |
       +--------------+--------------+
       |              |              |
       v              v              v
 Career Database   Skill Database   User Data
       |              |              |
       +--------------+--------------+
                      |
                      v
                 RETRIEVER
                      |
                      v
             RELEVANT CONTEXT
                      |
                      v
                     LLM
                      |
                      v
          PERSONALIZED RESPONSE
                      |
                      v
               USER / ROADMAP
```

---

# 38. Possible RAG Pipeline

```
Career Data → Data Cleaning → Chunking → Embedding Generation → Vector Database
User Query → Query Embedding → Similarity Search → Relevant Career Information
Prompt + User Profile + Retrieved Context → LLM → Personalized Career Guidance
```

---

# 39. Example AI Request

> "I am a second-year computer science student. I know basic Python and HTML,
> but I have never worked professionally. I want to become a software engineer.
> What should I do next?"

Career GPS should understand:

- **Current state:** CS student, basic Python, basic HTML, no professional
  experience.
- **Goal:** Software Engineer.

Then identify **skill gaps:** data structures, algorithms, Git, another
relevant language, frontend/backend development, databases, APIs, testing,
software-engineering practices.

Then create **next actions:** strengthen fundamentals → learn Git/GitHub →
learn web/backend development → build projects → create portfolio → apply for
internships.

---

# 40. Design System

**Brand:** Career GPS 🧭. Communicate: direction, progress, confidence, clarity,
exploration, growth, trust.

**Design metaphor:** subtle navigation concepts — compass, routes, waypoints,
progress paths, destination markers, maps, coordinates, milestones. Avoid a
literal Google Maps clone.

---

# 41. UI Style

Modern, clean, friendly, professional, youth-oriented, trustworthy, accessible,
AI-native. Avoid: too corporate, too childish, too futuristic, too visually
complicated.

---

# 42. Theme

Support light mode, dark mode, custom theme tokens.

The previous Team Compass design-system work explored a neutral, soft
surface-based UI system (Surface, Surface-dim, Surface-bright,
Surface-container-lowest/low/container/high/highest). Final theme is adapted to
the Career GPS brand rather than copied blindly.

---

# 43. Landing Page Copy

- **Hero:** *Stop guessing. Start building your career.*
- **Subhead:** *Your personalized career pathway — from where you are today to
  where you want to be.*
- **Primary CTA:** Build My Career Pathway
- **Secondary CTA:** See How It Works
- **Supporting message:** "Career decisions are confusing when you have too much
  information and not enough direction. Career GPS helps you understand
  yourself, explore your options, identify your skill gaps, and build a clear
  path toward your goals."

---

# 44. Brand Language

Use navigation language carefully.

Preferred concepts: your starting point, your destination, your pathway, your
next step, career route, career milestones, skill gap, progress, explore,
navigate, recalculate, career direction.

Example: *"You are here. Let's find your next step."*

---

# 45. Pitch Structure

1. **Problem** — more career information than ever, but overload creates
   confusion.
2. **Current challenges** — fragmented, generic, hard to turn into action.
3. **Root causes** — no personalization, no structured pathways, limited
   guidance access.
4. **Jobs-to-be-done** — understand self, explore careers, identify gaps, know
   the next step.
5. **Solution** — an AI-powered career navigation platform turning profile and
   goals into a personalized pathway.
6. **Differentiation** — connects self-discovery → matching → gaps → roadmap →
   action → progress → mentoring.
7. **How it works** — Discover → Explore → Plan → Act → Track.
8. **USP** — *Your GPS for career decisions.*
9. **Impact** — career clarity, employability, confidence, access to guidance.
10. **Business model** — freemium + institutional + mentor + employer.
11. **Market entry** — students → universities → mentors → employers.
12. **Growth** — career-navigation infrastructure connecting people, education,
    mentors, resources, employers.
13. **Team** — Team Compass / Career GPS.
14. **References** — credible career/education/skills/labor-market/youth
    sources.

---

# 46. Core Product Loop

```
UNDERSTAND YOURSELF → EXPLORE CAREERS → CHOOSE A DIRECTION → IDENTIFY SKILL GAPS
→ BUILD YOUR ROADMAP → TAKE ACTION → TRACK PROGRESS → GET GUIDANCE → REASSESS
→ UPDATE YOUR PATH
```

An ongoing career-management system, not a one-time career test.

---

# 47. Long-Term Vision

From a recommendation website into a complete career-development ecosystem:

```
CAREER GPS → STUDENTS · MENTORS · INSTITUTIONS → CAREER DATA →
EDUCATION · SKILLS · JOBS → EMPLOYERS
```

Ultimate vision: *Help every young person understand where they are, discover
where they can go, and know what to do next.*

---

# 48. Project Scope Summary

**In scope:** self-discovery, exploration, recommendations, skill analysis,
skill-gap analysis, personalized roadmaps, AI assistant, progress tracking,
career knowledge base, RAG-based guidance, basic mentoring concept, feedback
and validation.

**Future:** mentor marketplace, internship/job matching, employer platform,
resume/portfolio analysis, institutional dashboards, labor-market analytics,
skill verification, community, advanced personalization.

**Out of scope for MVP:** full recruitment platform, full LMS, large social
network, complete psychometric platform, enterprise HR system, real-time global
labor-market forecasting.

---

# 49. Core MVP Statement

> If young people provide information about who they are and where they want to
> go, Career GPS can use structured career data and AI to show them a realistic
> pathway, identify what they are missing, and tell them what to do next.

---

# 50. One-Sentence Description

> Career GPS is an AI-powered career navigation platform that turns a young
> person's interests, skills, education, and goals into a personalized,
> actionable career roadmap.

---

# 51. Short Description

> Career GPS helps young people move from career confusion to career clarity by
> combining self-discovery, career exploration, skill-gap analysis,
> personalized roadmaps, AI guidance, and human mentoring.

---

# 52. Tagline Options

- **Primary:** Stop guessing. Start building your career.
- **Short:** Your GPS for career decisions.
- **Navigation:** Know where you are. Know where you're going. Know what to do
  next.
- **Youth:** Your future needs a direction.
- **Action:** From career confusion to your next step.
- **Compass:** Find your direction. Build your path.

---

# 53. Project Keywords

Career GPS · Career Compass · Career Navigation · Career Guidance · Career
Exploration · Career Planning · Personalized Career Roadmap · AI Career
Assistant · RAG · Artificial Intelligence · Career Matching · Skill Gap
Analysis · Skills-Based Career Guidance · Youth Employability · Youth
Development · Mentoring · Education Technology · EdTech · Career Development ·
Student Career Planning · Internship Readiness · Job Readiness · Personalized
Learning · Human-AI Collaboration

---

# 54. Important Project Principle

Career GPS does **not** tell users: *"This is the career you must choose."*

Instead it says: *"Based on your information, these paths may fit you. Here is
why, here are the gaps, and here are the next steps you can consider."*

**The user remains the decision-maker.**

---

# 55. Final Product Vision

**Career GPS 🧭** — a trusted career-navigation companion that helps young
people: understand themselves, explore possibilities, choose with confidence,
build the right skills, take meaningful action, connect with people, track
their progress, and adapt their career path.

The goal is not to predict someone's future. The goal is to help them navigate
it.

---

# 56. Master Flow

```
CAREER GPS 🧭 → "Where am I?" → SELF-DISCOVERY → "Where can I go?" →
CAREER EXPLORATION → CAREER MATCHING → "What's missing?" → SKILL GAP ANALYSIS →
"How do I get there?" → PERSONALIZED ROADMAP → TAKE ACTION → TRACK PROGRESS →
AI + HUMAN GUIDANCE → RECALCULATE → CONTINUE THE JOURNEY
```

**Career GPS is therefore not simply a career-information platform. It is a
personalized career navigation system.**