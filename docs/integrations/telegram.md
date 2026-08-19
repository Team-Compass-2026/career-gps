# Telegram — Team Compass🧭

## Bot

| Field | Value |
|-------|--------|
| Username | `@teamcompass_bot` |
| Display | Team Compass 🧭 |
| Admin Telegram user id | from `TELEGRAM_ADMIN_ID` in `.env` |

Secrets live only in:

- Project `.env` (gitignored)
- `~/.cursor/secrets/telegram.env` (gitignored / local)

```bash
TELEGRAM_BOT_TOKEN=   # from @BotFather — never commit
TELEGRAM_ADMIN_ID=    # numeric Telegram user id for admin alerts
```

## Usage (later / n8n)

- Admin notifications (deploy, seed done, demo ready)
- Optional learner Q&A bridge — **not** MVP web core
- Prefer n8n Telegram nodes using the same env vars over hardcoding

## Security

- Never put the bot token in `mcp.json`, docs, or git
- If the token was pasted in chat, **revoke/regenerate in BotFather** and update `.env`
- Restrict bot commands that mutate data to `TELEGRAM_ADMIN_ID`
