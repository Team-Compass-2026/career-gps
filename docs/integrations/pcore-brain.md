# P-Core Brain — Career GPS / Team Compass🧭

## What

**P-Core Brain** = opencode serve bridge on https://pcore-brain.peterlianpi.site/ (opencode serve v1.18.18).  
It is the AI backend for Career GPS AI assistants; switchable via the AI provider abstraction (see `lib/ai/provider.ts` and 26-ai-career-coach.md).

## Config (no secrets in git)

| Location | File | Notes |
|----------|------|-------|
| **Production (canonical)** | `/etc/career-gps-brain.env` (root, 0600) | Production creds; deployment sources it; never in git |
| **Local dev** | `.env` (gitignored) | `PCORE_BRAIN_TOKEN` / `AI_BRAIN_TOKEN` |
| **Template** | `.env.example` | Placeholders only |

## Env vars

| Variable | Required? | Default | Description |
|----------|-----------|---------|-------------|
| `AI_PROVIDER` | no | `pcore-brain` | Provider kind: `"pcore-brain"` or `"openai"` |
| `AI_BRAIN_URL` | no | `https://pcore-brain.peterlianpi.site` | Base URL of the brain instance |
| `AI_BRAIN_TOKEN` | no* | (from PCORE_BRAIN_TOKEN) | Bearer token (= serve password). Either this **or** `AI_BRAIN_AUTH_USER`+`AI_BRAIN_AUTH_PASS` |
| `AI_BRAIN_AUTH_USER` | no | `opencode-serve` | Username for Basic auth to the brain |
| `AI_BRAIN_AUTH_PASS` | no | (serve password) | Password for Basic auth |
| `AI_BRAIN_MODEL_POOL` | no | `opencode` | Model pool hint — used to pick from available models; opencode maps to the pool used by the serve instance |
| `AI_BRAIN_MODEL` | no | (auto from pool) | Override the model to use; if unset, provider picks a suitable model from the pool |
| `AI_BRAIN_WAKE_CMD` | no | `opencode-serve.service` | Systemd unit to wake the serve instance from idle |
| `AI_PROVIDER_OPENAI_BASE_URL` | no | `https://api.openai.com/v1` | Override OpenAI-compatible base URL |
| `AI_PROVIDER_OPENAI_API_KEY` | no* | | OpenAI API key; either this or `OPENAI_API_KEY` |

\* One of (`AI_BRAIN_TOKEN` / `AI_BRAIN_AUTH_PASS`) **or** (`AI_OPENAI_API_KEY` / `OPENAI_API_KEY`) must be set for the chosen provider to function.

## Provider switching (any OpenAI-compatible)

Set `AI_PROVIDER=openai` and configure OpenAI-compatible env vars; the abstraction auto-detects and routes to the correct backend without code changes.

## API

| Endpoint | Method | Auth | Expected response |
|----------|--------|------|-------------------|
| `/global/health` | `GET` | Basic or Bearer | `{"healthy":true,"version":"1.18.18"}` |
| `/session` | `POST` | Basic or Bearer | `{"id":"ses_...","slug":"...","projectID":"global",...}` |
| `/session/{id}/message` | `POST` | Basic or Bearer | `{"info":{...},"parts":[{"type":"text","text":"..."},...]}` |
| `/session/{id}/message` | `GET` | — | (returns last message text) |

Auth: **Basic** (`OPENCODE_SERVER_USERNAME:OPENCODE_SERVER_PASSWORD`) or **Bearer** token (= serve password). Both are accepted by the serve instance.

## Setup — server (canonical, production)

1. Run on sg-ec2 as root: creates `/etc/career-gps-brain.env` with AI_BRAIN_URL, AI_BRAIN_AUTH_USER, AI_BRAIN_AUTH_PASS, AI_BRAIN_WAKE_CMD, AI_BRAIN_MODEL_POOL (0600, root-owned).
2. Source it in the deployment: `. /etc/career-gps-brain.env`.
3. Restart the serve unit if creds rotate: `systemctl restart opencode-serve.service`.
4. Never commit the env file; keep it server-only.

## Smoke test (from server)

```bash
# health
curl -sS -u "$AI_BRAIN_AUTH_USER:$AI_BRAIN_AUTH_PASS" "$AI_BRAIN_URL/global/health"

# session + message
SID=$(curl -sS -u "$AI_BRAIN_AUTH_USER:$AI_BRAIN_AUTH_PASS" -X POST -H "Content-Type: application/json" "$AI_BRAIN_URL/session" | python3 -c "import sys,json;print(json.load(sys.stdin)['id'])")
curl -sS -X POST -u "$AI_BRAIN_AUTH_USER:$AI_BRAIN_AUTH_PASS" -H "Content-Type: application/json" -d '{"parts":[{"type":"text","text":"Reply with exactly: career-gps-online"}]}' "$AI_BRAIN_URL/session/$SID/message"
```

Expected output: `"career-gps-online"` + model `"mimo-v2.5-free"` + `"healthy":true`.

## Security checklist

- Token only in server env (`/etc/career-gps-brain.env`, 0600) + gitignored `.env` — **never commit**
- Rotate by replacing `OPENCODE_SERVER_PASSWORD` in `/etc/opencode-serve.env` then `systemctl restart opencode-serve.service`
- Provider info omits secrets (`AI_BRAIN_AUTH_PASS`, `AI_BRAIN_AUTH_USER` values are not logged)
- Keep the serve URL internal if exposed more broadly; the brain is a single-user develop instance
- Do not paste the token in chat, docs, or issue trackers

## Prompts + RAG integration

The provider abstraction handles **only** the backend (model selection + auth).  
The **Career Coach** builds the prompt sent to the provider by:

1. Retrieving relevant knowledge chunks via RAG (`retrieveRAG` in `lib/ai/rag.ts`).  
2. Prefixing the user’s question with the retrieved context citations.  
3. Passing the combined prompt (system + user + context) as the `messages` array to `provider.complete()`.  

Example prompt flow (coach layer, not in this abstraction):

```
System: You are a career coach for Career GPS. Use the retrieved knowledge below to answer.

Context: [retrieved chunks with citations]

User: What skills do I need for a Data Analyst role?

Assistant: [provider.complete(messages)] → returns assistant reply.
```

This separation lets you swap the provider (OpenAI, OpenRouter, pcore-brain) without touching the coach’s RAG prompt logic.

## Embeddings (RAG)

RAG retrieval needs an embeddings provider. `provider.embed(texts)` resolves it by priority:

1. `AI_BRAIN_EMBEDDING_URL` — bridge to an OpenAI‑compatible `/embeddings`
   endpoint (e.g. the pcore-brain bridge at `https://pcore-brain.peterlianpi.site/v1`).
   Uses the same auth as the brain (Bearer or Basic).
   Model: `AI_BRAIN_EMBEDDING_MODEL` (default `text-embedding-3-small`).
2. `AI_PROVIDER=openai` — OpenAI‑compatible `/embeddings` at `AI_OPENAI_BASE_URL`
   with `AI_OPENAI_API_KEY` / `OPENAI_API_KEY`; model `AI_OPENAI_EMBEDDING_MODEL`.

The DB vector column is `vector(384)` (migration `20260820000900_embedding_dim_384`),
matching the free local model `all-MiniLM-L6-v2`. **Current stage**: the
`/v1/embeddings` endpoint on the pcore-brain bridge (`bridge/app.py` of
`P-Core-System/pcore-brain`) is not yet deployed — real ingest is pending it.
`scripts/ingest-knowledge.ts --dry` passes; chat/coach routes answer without
context until embeddings are live.

## Model selection + pool

The provider reads `AI_BRAIN_MODEL_POOL` to determine available models.  
Currently the opencode serve pool `"opencode"` maps to the default model stack (`mimo-v2.5-free`, provider `opencode`).  

To override the model:

- Set `AI_BRAIN_MODEL=<model-id>` (e.g. `mimo-v2.5-free`) to force a specific model.  
- Leave unset to let the provider auto-select a suitable model from the pool.  

For OpenAI-compatible providers, `AI_OPENAI_MODEL` similarly overrides the model.

## Provider info (runtime, no secrets)

`getAIProviderInfo()` returns:

```
{
  name: "pcore-brain",
  baseURL: "https://pcore-brain.peterlianpi.site",
  model: "opencode",          // from AI_BRAIN_MODEL_POOL
  auth: "bearer",            // or "basic"
  configured: true
}
```