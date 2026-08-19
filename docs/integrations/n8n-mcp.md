# n8n workflow usage — Career GPS / Team Compass🧭

## What

Remote **n8n MCP** lets Cursor agents list/run/manage n8n workflows on
`https://n8n.peterlianpi.site` (HTTP MCP).

## Config (no secrets in git)

| Location | File | Notes |
|----------|------|--------|
| Project | `.cursor/mcp.json` | Uses `${env:N8N_MCP_TOKEN}` |
| Global Cursor | `~/.cursor/mcp.json` | Same |
| Secrets | `.env` (gitignored) + `~/.cursor/secrets/n8n.env` | Token only here |
| Template | `.env.example` | Empty token placeholder |

## Env vars

```bash
N8N_MCP_URL=https://n8n.peterlianpi.site/mcp-server/http
N8N_MCP_TOKEN=<jwt from n8n MCP API>
```

Export for Cursor (GUI apps need this at **login/session** start):

```bash
# already appended to ~/.zshrc if installer ran
set -a && source ~/.cursor/secrets/n8n.env && set +a
```

**Restart Cursor** after changing env so MCP picks up the token.

## CareerPath usage ideas (later)

- Ingest/curate career dataset rows into Postgres  
- Scheduled re-embed of published knowledge chunks  
- Survey → sheet → validation summary  
- Demo seed refresh before pitch  

Do not put Bearer tokens in committed `mcp.json`.
