# Tech Selection — Career GPS (MVP)

**Team Compass🧭 · No build until requested**

| Decision | Choice |
|----------|--------|
| Postgres + pgvector | **Neon** |
| LLM | OpenAI `gpt-4o-mini` (AI SDK) |
| Embeddings | OpenAI `text-embedding-3-small` |
| Better Auth | Email + password only (OAuth later) |
| Host | Vercel |
| Package manager | Bun 1.3 |
| Ops | n8n + Telegram optional |

## Env names
`DATABASE_URL` · `DIRECT_URL` · `BETTER_AUTH_SECRET` · `BETTER_AUTH_URL` ·
`NEXT_PUBLIC_APP_URL` · `OPENAI_API_KEY` · optional n8n/Telegram vars

Full rationale: enterprise tech-selection (2026-08-10).
