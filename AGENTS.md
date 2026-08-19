## Application Building Context

**Product:** Career GPS · **Team:** Team Compass🧭 · **Track:** T2 Education Equity  
**Auth:** Better Auth · **Build:** do not scaffold until explicitly requested.

Project skills (load when relevant): `.cursor/skills/careerpath-domain`,
`careerpath-rag`, `better-auth-next`.

n8n workflows (MCP): see `docs/integrations/n8n-mcp.md`. Token via
`N8N_MCP_TOKEN` only — never commit secrets.

Telegram bot (`@teamcompass_bot`): see `docs/integrations/telegram.md`.
Use `TELEGRAM_BOT_TOKEN` + `TELEGRAM_ADMIN_ID` from `.env` only.

Read the following files in order before implementing
or making any architectural decision:

0. `project.yaml` — project identity, version, lifecycle
   stage, team, and stack definition
1. `context/project-setup.md` — onboarding guide, version/lifecycle
   management, and daily workflow
2. `docs/architecture/` — stack + RAG + Career Assistant + folders
   (`21-next-hono-prisma-query.md`, `25-rag-career-coach.md`,
   `26-ai-career-coach.md`, `27-folder-structure.md`) and
   `docs/product/DEEP-hackathon-overview.md`
3. `context/project-overview.md` — product definition,
   goals, features, and scope
4. `context/architecture.md` — system structure,
   boundaries, storage model, system design &
   infrastructure, and invariants
5. `context/ui-context.md` — theme, colors, typography,
   and component conventions
6. `context/code-standards.md` — implementation rules
   and conventions
7. `context/ai-workflow-rules.md` — development workflow,
   scoping rules, and delivery approach
8. `context/progress-tracker.md` — current phase,
   completed work, open questions, and next steps
9. `context/specs/` — optional unit specs (one file per
   feature); see `specs/README.md`

Update `context/progress-tracker.md` after each
meaningful implementation change.
Update `project.yaml` lifecycle stage and version when
the project advances through SDLC phases.

If implementation changes the architecture, scope, or
standards documented in the context files, update the
relevant file before continuing.
