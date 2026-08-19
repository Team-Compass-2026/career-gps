# Seed dataset (MVP)

Place curated CSVs here before build. Prefer quality over quantity (10–20 careers).

## Suggested files

| File | Purpose |
|------|---------|
| `careers.csv` | id, name, category, description |
| `skills.csv` | id, name, category, description |
| `career_skills.csv` | career, skill, importance, required_level |
| `resources.csv` | title, type, url, skill, level, description |
| `knowledge_docs.md` / chunks | Unstructured text for RAG ingest |

## Example row shape (`career_skills` + resource)

```csv
career,skill,importance,level,resource_type,description
Software Developer,JavaScript,High,Intermediate,Course,Core programming skill
Data Analyst,SQL,High,Intermediate,Course,Database querying
UI UX Designer,Figma,High,Intermediate,Course,Interface design
```

## Rules

- No scraped influencer content as source of truth  
- Every resource should have a stable URL or explicit “internal note”  
- Mark publish status in DB at ingest time  
