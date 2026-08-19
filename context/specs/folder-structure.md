# Folder Structure (full MVP proposal)

See also: `docs/architecture/27-folder-structure.md`

```text
career-gps/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx              # Landing page (Marketing)
│   ├── (marketing)/
│   │   └── page.tsx
│   ├── (auth)/
│   │   ├── sign-in/
│   │   │   └── page.tsx
│   │   └── sign-up/
│   │       └── page.tsx
│   └── (dashboard)/
│       ├── profile/
│       │   └── page.tsx
│       ├── recommend/
│       │   └── page.tsx
│       ├── gaps/
│       │   └── page.tsx
│       ├── roadmap/
│       │   └── page.tsx
│       └── coach/
│           └── page.tsx
├── components/
│   ├── ui/
│   ├── mentor-cards/
│   ├── course-cards/
│   ├── progress-bars/
│   └── navigation/
├── lib/
│   ├── validations/
│   ├── ai-tools/
│   └──supabase/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── data/                      # CSV + knowledge base
├── scripts/ingest-knowledge.ts  # post-scaffold
├── context/ · docs/ · .cursor/skills/
├── manifest.json              # PWA manifest
├── favicon.ico
├── next-config.js
├── tailwind.config.js
├── package.json
└── .env.example
```

**Scaffold only when product owner says build.**
