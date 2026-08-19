# Folder Structure — Career GPS (MVP)

**Team Compass🧭 · Docs only — do not scaffold `src/` until build is requested**

## Tree (summary)

```text
src/app/(marketing|auth|dashboard)/ …
src/app/api/auth/[...all] · api/[[...route]]  # Better Auth + Hono
src/server/{auth,db,api,services,ai,rag}/
src/client/{api,auth,hooks}/
src/components/{ui,forms,layout,recommend,gaps,roadmap,coach}/
src/lib/validations/
prisma/ · data/*.csv · data/knowledge/
```

## Ownership

| Path | Context |
|------|---------|
| `(marketing)` | Public |
| `(auth)` + `server/auth` | Better Auth |
| `(dashboard)` | Learner UX |
| `server/services` | Fit / gap / roadmap / progress (T0) |
| `server/ai` + `rag` | Coach + hybrid retrieve |
| `data/` + `prisma/seed.ts` | Curated corpus |

## Do not create yet

Full `src/`, migrations, OAuth, curator admin UI, n8n under `src/`.

Full tree: enterprise folder-structure (2026-08-10).
