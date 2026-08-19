# Spec: Career Coach chat + structured data retrieve (MVP slice)

## Goal

Signed-in learner can ask a career question and receive a streamed answer
with citations from the curated knowledge base (or a clear abstain).

## In scope

- `POST` chat stream endpoint (AI SDK)
- Tools: `getProfile`, `retrieveKnowledge` (minimum)
- Seed ≥ 20 published chunks in education/career domains
- UI: simple chat + citation list

## Out of scope

- Mentor booking
- Pathway mutation from chat
- PDF ingest pipeline

## Acceptance

1. Question about a seeded topic returns ≥ 1 citation from seed data.
2. Question about a fake university/course abstains or gives general advice
   without fake URLs.
3. Unauthenticated requests are rejected.

## Risks

- Empty corpus → coach hallucinates (mitigate: refuse when retrieval empty)
- Token cost (mitigate: rate limit + chunk cap 8)
