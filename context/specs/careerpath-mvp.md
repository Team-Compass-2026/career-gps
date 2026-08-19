# Spec: CareerPath MVP pillars (docs-ready; build later)

## Goal

When build starts: profile → career recommend → skill gap → structured roadmap/chat
with Better Auth — demo Alex persona end-to-end.

## In scope (first build)

- Better Auth sign-up/in  
- Profile fields per overview  
- Seed 10–20 careers + career_skills + resources  
- Fit score API + UI (3–5 careers)  
- Skill gap table  
- Roadmap generation  
- Streaming assistant with citations  

## Out of scope

- Scaffold before explicit “build” request  
- Mentors/jobs/CV/interview/scholarship features  

## Acceptance (when built)

1. Alex demo flow completes without unsourced course URLs.  
2. Fit scores labeled as guidance.  
3. Empty structured → abstain.  
4. Unauthenticated chat rejected.  

## Skills to load when building

- `.cursor/skills/careerpath-domain`  
- `.cursor/skills/careerpath-rag`  
- `.cursor/skills/better-auth-next`  
