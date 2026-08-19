# UI Context — Career GPS

## Product feel

Calm, clear, navigator-like. Reduce anxiety; emphasize **clarity and next steps**.
Avoid hype, "AI purple", or cluttered dashboards on first viewport.

## Brand

- Product name **Career GPS** is hero-level on marketing
- Team Compass🧭 secondary (about / footer)
- Primary tagline: **Stop guessing. Start building your career.**
- Short tagline: **Your GPS for career decisions.**
- Alternative: *Know where you are. Know where you want to go. Know what to do next.*

## Theme — Career Navigation

Product should feel like: **Modern EdTech + a clear navigation system** — the
product loop of Career GPS, not a generic AI startup.

Visual language communicates: **Direction → Progress → Confidence → Clarity →
Growth → Trust**

Emotional journey:
- "I'm confused." → "I understand where I am." → "I see where I can go." →
  "I know my next step."

## Navigation Metaphor

Use subtle GPS/navigation concepts — compass, routes, waypoints, destination
markers, milestones, coordinates. **Do not make the UI look like a literal
Google Maps clone.**

Brand language to use: your starting point, your destination, your pathway, your
next step, career route, career milestones, skill gap, progress, explore,
navigate, recalculate, career direction.

Example: *"You are here. Let's find your next step."*

UI style: modern, clean, friendly, professional, youth-oriented, trustworthy,
accessible, AI-native. Avoid too corporate, too childish, too futuristic, or too
visually complicated.

## Theme Strategy

### Light Mode — Primary Experience

Default for: Landing page, Marketing pages, Mentor discovery, Career exploration, Community, Public profiles
Overall experience: bright, optimistic, welcoming

**White + Soft Blue Gray + Deep Navy + Compass Blue**
with small amounts of teal and amber.
Do not use pure black backgrounds.

### Dark Mode — Product / Focus Experience

Fully supported. Feel: **Professional + Focused + Premium**
Dark navy surfaces instead of pure black.

Recommended hierarchy:
- Background: `#0B1120`
- Cards: `#111827`
- Elevated surfaces: `#172033`
- Primary text: `#F8FAFC`
- Secondary text: `#CBD5E1`
- Accent: `#60A5FA`
- Teal: `#2DD4BF`
- Amber: `#FBBF24`

Dark mode especially suitable for: Mentor dashboard, Student dashboard, Live mentoring sessions, Career roadmap, Messaging, Settings

## Color System — Career GPS Palette

Light theme:
```
background: '#F8FAFC'
surface: '#FFFFFF'
surface-muted: '#F1F5F9'
surface-subtle: '#F8FAFC'
surface-hover: '#F1F5F9'

text-primary: '#0F172A'
text-secondary: '#475569'
text-muted: '#64748B'
text-disabled: '#94A3B8'

border: '#E2E8F0'
border-strong: '#CBD5E1'

primary: '#2563EB'        /* Compass Blue */
primary-hover: '#1D4ED8'
primary-active: '#1E40AF'
primary-soft: '#EFF6FF'
primary-container: '#DBEAFE'

secondary: '#0F172A'
on-primary: '#FFFFFF'

teal: '#14B8A6'           /* Fresh Teal */
teal-soft: '#CCFBF1'
on-teal: '#042F2E'

amber: '#F59E0B'          /* Soft Amber */
amber-soft: '#FEF3C7'
on-amber: '#451A03'

success: '#16A34A'
success-soft: '#DCFCE7'

error: '#DC2626'
error-soft: '#FEE2E2'

compass-blue: '#2563EB'
fresh-teal: '#14B8A6'
soft-amber: '#F59E0B'

path: '#93C5FD'
path-active: '#2563EB'
node: '#2563EB'

inverse-surface: '#0F172A'
inverse-text: '#F8FAFC'

DARK THEME:
background: '#0B1120'
surface: '#111827'
surface-muted: '#172033'
surface-subtle: '#0F172A'
surface-hover: '#1E293B'

text-primary: '#F8FAFC'
text-secondary: '#CBD5E1'
text-muted: '#94A3B8'
text-disabled: '#64748B'

border: '#263449'
border-strong: '#334155'

primary: '#60A5FA'        /* Compass Blue - dark */
primary-hover: '#93C5FD'
primary-active: '#3B82F6'
primary-soft: '#172554'
primary-container: '#1E3A8A'
on-primary: '#0F172A'

secondary: '#F8FAFC'
on-secondary: '#0F172A'

teal: '#2DD4BF'
teal-soft: '#134E4A'
on-teal: '#042F2E'

amber: '#FBBF24'
amber-soft: '#451A03'
on-amber: '#FFFBEB'

success: '#4ADE80'
success-soft: '#14532D'

error: '#F87171'
error-soft: '#450A0A'

compass-blue: '#60A5FA'
fresh-teal: '#2DD4BF'
soft-amber: '#FBBF24'

path: '#334155'
path-active: '#60A5FA'
node: '#60A5FA'

inverse-surface: '#F8FAFC'
inverse-text: '#0F172A'
```

## Typography — Plus Jakarta Sans

fontFamily: 'Plus Jakarta Sans'

```
hero-display:     64px  800  '72px'  '-0.02em'
hero-display-mobile: 40px  800  '48px'  '-0.02em'

headline-xl: 48px  800  '56px'  '-0.02em'
headline-lg:  36px  700  '44px'
headline-md:  24px  700  '32px'
title-lg:     20px  700  '28px'

body-lg:  18px  400  '28px'
body-md:  16px  400  '24px'
body-sm:  14px  400  '20px'

label:    14px  600  '20px'
label-caps: 12px  600  '16px'  '0.05em'
```

## Layout System

- **12-column desktop grid**
- **Max content width:** 1280px
- **Desktop horizontal padding:** 80px
- **Tablet:** 40px
- **Mobile:** 20px
- **8px spacing system** — all major spacing values multiples of 8

**Section rhythm (Landing page):**
- Desktop: 120–128px vertical spacing
- Tablet: 96px
- Mobile: 72px

Avoid compressing sections together. Career GPS should feel calm and intentional.

## Key screens (MVP)

1. Landing — brand, one headline, one CTA, pathway visualization ("You are here → Goal → Route → Milestones")
2. Auth — Better Auth sign-in/up
3. Onboarding / profile intake
4. Career recommendations (fit % as guidance + why / what's missing)
5. Skill gap table
6. Roadmap timeline (phases + milestones)
7. AI assistant + citations
8. Progress tracking (not started / in progress / completed)

## Responsive

- Mobile: roadmap first; coach in sheet/tab
- Desktop: roadmap + coach side panel
