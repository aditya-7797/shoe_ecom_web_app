---

description: "Task list for Shoes E‑Commerce Web App"
---

# Tasks: Shoes E‑Commerce Web App

**Input**: Design documents from `/specs/001-shoes-ecom/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Critical flows require tests per constitution — include unit, contract, and integration tasks as specified in the feature specification and plan.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`, tests in respective project folders

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project directories per plan in backend/src/, backend/tests/, frontend/src/, frontend/tests/ (repository root)
- [x] T002 Initialize backend npm project with dependencies in backend/package.json (backend/package.json)
- [x] T003 [P] Initialize frontend React + Vite app and Tailwind config (frontend/package.json)
- [x] T004 [P] Configure ESLint for backend and frontend (backend/.eslintrc.cjs, frontend/.eslintrc.cjs)
- [x] T005 Create environment files for API and UI (backend/.env, frontend/.env)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

 - [x] T006 Setup Sequelize with MySQL connection and loader (backend/src/models/index.js)
 - [x] T007 [P] Define Sequelize models: Product, ProductImage, Review, User, Cart, CartItem, ContactRequest (backend/src/models/*.js)
 - [x] T008 [P] Create migrations for all entities (backend/src/models/migrations/)
 - [x] T009 Implement Express server with core middleware (backend/src/server.js)
  
 **Progress Note**: Minimal Express server added with `/api/health` and CORS (backend/src/server.js). Health check succeeded on localhost — marking complete.
 - [x] T010 [P] Implement JWT utils and bcrypt helpers (backend/src/utils/jwt.js, backend/src/utils/auth.js)
 - [x] T011 [P] Implement auth middleware (backend/src/middleware/auth.js)
 - [x] T012 Setup API routing index and base /api (backend/src/api/index.js)
 - [x] T013 Configure error handling and logger (backend/src/middleware/error.js, backend/src/utils/logger.js)
 - [x] T014 Setup Tailwind and global styles (frontend/tailwind.config.js, frontend/src/styles/tailwind.css)
 - [x] T015 [P] Setup React Router, base pages, and Navbar scaffold (frontend/src/main.jsx, frontend/src/components/Navbar.jsx, frontend/src/pages/*.jsx)
 - [x] T016 [P] Configure axios API client with base URL (frontend/src/services/api.js)

**Checkpoint**: Foundation ready — user story implementation can now begin in parallel

---

## Phase 3: User Story 1 — Discover Shoes (Landing + Navigation) (Priority: P1) 🎯 MVP

**Goal**: Modern landing page with carousel and clean navbar enabling navigation to key sections

**Independent Test**: Navigate via navbar to Home, About, Products, Contact; carousel controls accessible and responsive

### Tests for User Story 1 (critical UX navigation)

- [x] T017 [P] [US1] Integration test for navbar routes (frontend/tests/integration/nav.test.jsx)

### Implementation for User Story 1

- [x] T018 [P] [US1] Implement Carousel component with accessible controls (frontend/src/components/Carousel.jsx)
- [x] T019 [US1] Implement Home page using Carousel (frontend/src/pages/Home.jsx)
- [x] T020 [US1] Implement Navbar with links and auth corner (frontend/src/components/Navbar.jsx)
- [x] T021 [US1] Create About and Contact pages (frontend/src/pages/About.jsx, frontend/src/pages/Contact.jsx)
- [x] T022 [US1] Apply responsive and a11y styles for navbar/carousel (frontend/src/styles/tailwind.css)

**Checkpoint**: User Story 1 independently functional and testable

---

## Phase 4: User Story 2 — Browse Products Grid (Priority: P2)

**Goal**: Products page displays ≥16 shoes as 4 cards/row on desktop with key info

**Independent Test**: Load Products page and verify 16 cards render with correct fields and responsive layout

### Tests for User Story 2

- [x] T023 [P] [US2] Integration test for product grid rendering and responsiveness (frontend/tests/integration/products-grid.test.jsx)

### Implementation for User Story 2

- [x] T024 [P] [US2] Implement GET /products endpoint (backend/src/api/products.js)
- [x] T025 [P] [US2] Seed DB with ≥16 products for dev (backend/src/services/seed.js)
- [x] T026 [US2] Implement Products page grid (frontend/src/pages/Products.jsx)
- [x] T027 [US2] Implement ProductCard showing image, name, one-line desc, rating, price (frontend/src/components/ProductCard.jsx)
- [x] T028 [US2] Apply responsive styles and a11y for cards (frontend/src/styles/tailwind.css)

**Checkpoint**: User Stories 1 and 2 independently functional

---

## Phase 5: User Story 3 — Product Detail (Gallery, CTA, Reviews) (Priority: P3)

**Goal**: Detail page with gallery (3–4 images), model name, price, Add to Cart & Buy Now, and reviews

**Independent Test**: Click any card to open detail page and verify gallery, CTAs, and reviews rendering

### Tests for User Story 3

- [x] T029 [P] [US3] Contract test for GET /products/{id} (backend/tests/contract/products-id.test.js)
- [x] T030 [P] [US3] Integration test for detail page gallery and CTAs (frontend/tests/integration/product-detail.test.jsx)

### Implementation for User Story 3

- [x] T031 [P] [US3] Implement product detail API (backend/src/api/product-detail.js)
- [x] T032 [US3] Implement ProductDetail page and gallery component (frontend/src/pages/ProductDetail.jsx, frontend/src/components/ImageGallery.jsx)
- [x] T033 [US3] Implement Add to Cart and Buy Now actions (frontend/src/components/ProductDetailActions.jsx, frontend/src/services/cart.js)
- [x] T034 [US3] Implement reviews API and list component (backend/src/api/reviews.js, frontend/src/components/ReviewList.jsx)

**Checkpoint**: User Stories 1–3 independently functional

---

## Phase 6: User Story 4 — Cart & Checkout (No Payment Gateway) (Priority: P4)

**Goal**: Cart page with quantity updates/removals; Checkout page with summary and confirmation

**Independent Test**: Add item to cart, update quantities, remove items, and complete checkout confirmation

### Tests for User Story 4

- [x] T035 [P] [US4] Contract tests for /cart endpoints (backend/tests/contract/cart.test.js)
- [x] T036 [P] [US4] Integration test for cart updates and checkout confirmation (frontend/tests/integration/cart-checkout.test.jsx)

### Implementation for User Story 4

- [x] T037 [P] [US4] Implement cart API routes (backend/src/api/cart.js)
- [x] T038 [US4] Implement Cart page (frontend/src/pages/Cart.jsx)
- [x] T039 [US4] Implement Checkout page with order summary (frontend/src/pages/Checkout.jsx)
- [x] T040 [US4] Persist cart by user/session in service (backend/src/services/cartService.js)

**Checkpoint**: User Stories 1–4 independently functional

---

## Phase 7: User Story 5 — Authentication (Login/Signup) (Priority: P5)

**Goal**: Users can sign up and log in via navbar; auth state reflected in UI

**Independent Test**: Register user, log in, verify protected routes and navbar state

### Tests for User Story 5

- [x] T041 [P] [US5] Contract tests for /auth/signup and /auth/login (backend/tests/contract/auth.test.js)

### Implementation for User Story 5

- [x] T042 [P] [US5] Implement auth routes (backend/src/api/auth.js)
- [x] T043 [US5] Implement Login and Signup pages (frontend/src/pages/Login.jsx, frontend/src/pages/Signup.jsx)
- [x] T044 [US5] Wire navbar to auth state (frontend/src/components/Navbar.jsx)

**Checkpoint**: User Stories 1–5 independently functional

---

## Phase 8: User Story 6 — Admin Product Management & Contacts (Priority: P6)

**Goal**: Admin panel to view contact requests and manage products (add/edit/delete with images)

**Independent Test**: Sign in as admin; perform product CRUD and view contact requests

### Tests for User Story 6

- [x] T045 [P] [US6] Contract tests for /admin/products and /admin/contacts (backend/tests/contract/admin.test.js)

### Implementation for User Story 6

- [x] T046 [P] [US6] Implement admin product CRUD API (backend/src/api/admin-products.js)
- [x] T047 [P] [US6] Implement admin contacts API (backend/src/api/admin-contacts.js)
- [x] T048 [US6] Implement Admin dashboard pages (frontend/src/pages/AdminDashboard.jsx, frontend/src/pages/AdminProducts.jsx, frontend/src/pages/AdminContacts.jsx)
- [x] T049 [US6] Implement product image management components (frontend/src/components/AdminProductImages.jsx, backend/src/services/productImageService.js)

**Checkpoint**: All user stories independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T050 [P] Documentation updates (specs/001-shoes-ecom/quickstart.md)
- [ ] T051 Code cleanup and refactoring (backend/src/, frontend/src/)
- [ ] T052 Performance optimization per budgets (frontend/src/components/, backend/src/api/)
- [ ] T053 [P] Accessibility audit fixes across UI (frontend/src/components/)
- [ ] T054 Security hardening (backend/src/middleware/auth.js, backend/src/utils/jwt.js)
- [ ] T055 Run quickstart validation steps (specs/001-shoes-ecom/quickstart.md)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational completion; proceed in priority order (P1 → P2 → P3 → P4 → P5 → P6) or in parallel by team capacity
- **Polish (Final Phase)**: Depends on desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: No dependency on other stories
- **User Story 2 (P2)**: Can start after Foundational; independent
- **User Story 3 (P3)**: Can start after Foundational; independent
- **User Story 4 (P4)**: Can start after Foundational; independent (uses cart but can seed if needed)
- **User Story 5 (P5)**: Can start after Foundational; independent; enables admin access
- **User Story 6 (P6)**: Can start after Foundational; independent; requires admin role

### Within Each User Story

- Tests (if included) SHOULD be written and FAIL before implementation for critical flows
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- Setup tasks marked [P] can run in parallel
- Foundational tasks marked [P] can run in parallel within Phase 2
- After Foundation, user stories can be developed in parallel by different developers
- Within a story, tests and models marked [P] can run in parallel

---

## Parallel Example: User Story 2

```
Task: "Integration test for product grid rendering and responsiveness" (frontend/tests/integration/products-grid.test.jsx)
Task: "Implement GET /products endpoint" (backend/src/api/products.js)
Task: "Seed DB with ≥16 products for dev" (backend/src/services/seed.js)
Task: "Implement Products page grid" (frontend/src/pages/Products.jsx)
Task: "Implement ProductCard" (frontend/src/components/ProductCard.jsx)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Add User Story 6 → Test independently → Deploy/Demo

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
   - Developer E: User Story 5
   - Developer F: User Story 6
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing critical flows
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same-file conflicts, cross-story dependencies that break independence
