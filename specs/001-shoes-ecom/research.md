# Research Decisions: Shoes E‑Commerce Web App

**Context**: Node.js + Express backend, React + Tailwind frontend, MySQL DB, JWT + bcrypt auth, localhost dev. JavaScript (not TypeScript).

## Decisions

- Decision: Use Sequelize ORM with `mysql2`
  - Rationale: Mature JS ORM, supports migrations and associations; works well without TypeScript.
  - Alternatives considered: Prisma (best DX but TS-oriented), Knex (query builder without ORM), TypeORM (TS-first).

- Decision: Vite + React + Tailwind for frontend scaffolding
  - Rationale: Fast dev server, simple Tailwind integration, modern React 18 features.
  - Alternatives considered: CRA (deprecated), Next.js (SSR/ISR adds complexity), Webpack (heavier config).

- Decision: JWT (HS256) for stateless auth; bcrypt with 10–12 salt rounds
  - Rationale: Simple local dev; standard practice; rounds balance security/perf.
  - Alternatives considered: Session cookies (stateful), Argon2 (stronger but adds dependency); RS256 with key management (overkill for localhost MVP).

- Decision: Store product image URLs in DB; serve local images from `frontend/src/assets/` during dev
  - Rationale: Simplifies association and rendering; dev-only local hosting keeps complexity low.
  - Alternatives considered: S3/CDN storage (future scale), Base64 blobs (inefficient), dedicated media service (overkill for MVP).

- Decision: Validation via `express-validator`; a11y via semantic HTML and aria roles; lighthouse + axe checks in CI (where available)
  - Rationale: Lightweight, JS-first; aligns with constitution.
  - Alternatives considered: Zod (nice DX), Joi (popular but heavier).

- Decision: Testing tools
  - Backend: Jest + Supertest (HTTP assertions)
  - Frontend: React Testing Library + Jest
  - Critical e2e: Playwright for cart/checkout and product detail
  - Rationale: Deterministic tests with broad ecosystem support.

- Decision: Performance budgets
  - Homepage LCP p75 ≤ 2.5s (mid-tier mobile, 4G)
  - Products/Detail TTI p95 ≤ 3.0s
  - API p95 product listing < 200ms; checkout ops < 300ms
  - Rationale: Constitution-aligned budgets for fast UX.

## Open Questions (resolved)

- Image storage: Resolve as DB URLs with local assets for dev (future CDN optional).
- Auth flows: Login/Signup only; guest checkout allowed.
- DB schema: Minimal normalized tables for Product, ProductImage, Review, User, Cart, CartItem, ContactRequest.

## Implementation Notes

- Use feature flags minimally (e.g., reviews visibility) via env.
- Apply caching headers for static assets; memoize product list fetches on frontend.
- Avoid N+1 via Sequelize eager loading for images/reviews.
