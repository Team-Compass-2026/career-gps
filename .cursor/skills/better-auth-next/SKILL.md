---
name: better-auth-next
description: >-
  Better Auth for CareerPath AI (Next.js App Router). Use when adding auth,
  sessions, sign-in/up, or protecting dashboard/API routes. Project auth is
  locked to Better Auth — do not switch to Clerk/Auth.js unless asked.
---

# Better Auth — CareerPath AI

**Locked choice:** Better Auth + Postgres (Prisma adapter when scaffolding).

## When building (not yet)

1. Install `better-auth` + Prisma schema tables per Better Auth docs  
2. `auth.ts` server config; client `auth-client.ts`  
3. Route handlers under `app/api/auth/[...all]`  
4. Protect dashboard + `/api/chat` with session  
5. Map Better Auth `user.id` → `profiles.userId`

## Rules

- No Clerk/Auth0/Auth.js unless product owner changes `project.yaml`  
- Secrets in env (`BETTER_AUTH_SECRET`, social keys)  
- Learners own their data; delete-account path in backlog  

## Docs

- https://www.better-auth.com/docs  
- Project: `context/architecture.md` (Auth section)
