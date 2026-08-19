# Landing Page Plan — Career GPS

**Product:** Career GPS · **Team:** Team Compass🧭 · **Track:** T2 Education Equity

## Brand Integration

- **Product name:** Career GPS (hero-level on marketing)
- **Tagline:** We stay with you until you do it
- **Theme:** Human-Led Navigation · Modern EdTech + Professional Networking + Mentorship Community
- **Visual language:** Trust → Connection → Guidance → Growth → Direction

## Color System — Career GPS Palette

Brand colors per design system:
- **Orange** — optimistic and successful (primary CTA, highlights)
- **Blue** — professional and formal (navigation, active states)
- **White** — clean and tidiness (backgrounds, cards)

Extended palette from design system:

```
LIGHT THEME:
background: '#F8FAFC'
surface: '#FFFFFF'
surface-muted: '#F1F5F9'
surface-subtle: '#F8FAFC'
surface-hover: '#F1F5F9'

text-primary: '#0F172A'
text-secondary: '#475569'
text-muted: '#64748B'

primary: '#2563EB'        /* Compass Blue - professional/formal */
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

primary: '#60A5FA'        /* Compass Blue - dark mode */
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

## Typography — Career GPS

Font family: **Plus Jakarta Sans** (per design system)

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
- **8px spacing system** — all major spacing multiples of 8

**Section rhythm (Landing page):**
- Desktop: 120–128px vertical spacing
- Tablet: 96px
- Mobile: 72px

## Hero Section — Career GPS

### Left Side

**Headline:**
Stop guessing. Start building your career.

**Subheadline:**
Your personalized career pathway—from where you are today to where you want to be.

**Primary CTA:** Build My Career Pathway
**Secondary CTA:** See How It Works

### Right Side — Career GPS Pathway Visualization

```
Your Goal
Data Analyst
↓
Skills
SQL · Python · Visualization
↓
Projects
Build your portfolio
↓
Experience
Internship
↓
Career
Data Analyst
```

Subtle compass element behind the interface.

## Three Benefits Section

**Know Your Path**
Discover the skills and experience you actually need for your target career.

**Know Your Next Move**
Get personalized recommendations for what to learn, build and do next.

**Grow With Guidance**
Get matched with experienced mentors who understand your career journey.

## How It Works

01 — Assess: Tell us where you are.
02 — Navigate: Get your personalized career pathway.
03 — Act: Take the right steps, one milestone at a time.
04 — Grow: Track your progress and get expert guidance.

**Final CTA:** Ready to find your path? **Build My Career Pathway →**

## Navigation

**Primary navigation:**
- Logo (Career GPS)
- Dashboard / My Pathway
- Explore
- Mentors
- Progress
- Profile

**Light mode nav:** `rgba(255,255,255,0.82)` with `backdrop-filter: blur(12px)`
**Dark mode nav:** `rgba(11,17,32,0.82)` with `backdrop-filter: blur(12px)`

## Content & Placeholders

Where content is intentionally unspecified, use clearly marked placeholders:

[CAREER GOAL]
[USER NAME]
[SKILL]
[COURSE NAME]
[MENTOR NAME]
[PROJECT NAME]
[BRAND COLOR]
INTERACTION DESIGN

## Interactions

- Primary buttons: Compass Blue background, white text, 16px radius
- Hover: slight upward movement, slightly darker blue, soft shadow
- Cards: 16-20px radius, subtle shadow, lift on hover (`translateY(-4px)`)
- Pathway animation: nodes transition Neutral → Blue → Teal as users progress through Discover → Connect → Talk → Plan → Grow

## Accessibility

- WCAG-friendly contrast
- Visible focus states
- Keyboard navigation
- Minimum 44px touch targets
- Semantic headings
- Alt text
- Reduced-motion support
- Never communicate meaning through color alone

## Primary User Journey

LANDING → ASSESSMENT → ASSESSMENT RESULT → CAREER PATHWAY → NEXT MOVE → MENTOR → PROGRESS

All important buttons should navigate to the appropriate next screen.

## Dark Mode Support

Full dark mode support per design system:
- Suitable for mentor dashboard, student dashboard, live sessions, roadmap, messaging, settings
- Background: `#0B1120`
- Cards: `#111827`
- Primary text: `#F8FAFC`
- Accent: `#60A5FA`
- Teal: `#2DD4BF`
- Amber: `#FBBF24`

## Signature Interaction — Compass Path Animation

When users scroll through Discover → Connect → Talk → Plan → Grow, the pathway progressively activates:
- Nodes transition: Neutral → Blue → Teal
- This becomes Team Compass's recognizable interaction pattern

## Brand Voice in UI

Use language that is:
- Clear
- Encouraging
- Human
- Practical
- Confident

Preferred:
- **Find a Mentor** instead of Start AI Career Analysis
- **Start the Conversation** instead of Generate Career Recommendations
- **Build Your Roadmap** instead of Optimize Your Career Strategy

## Final Brand Feeling

When someone visits Career GPS, they should feel:
1. "I'm not alone."
2. "There are people who can help me."
3. "I can start a conversation."
4. "I know my next step."

**Team Compass 🧭 — Real people. Real conversations. Real career direction.**