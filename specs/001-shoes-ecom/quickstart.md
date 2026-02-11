# Quickstart: Shoes E‑Commerce Web App

## Prerequisites

- Node.js 20.x, npm
- MySQL server (local)
- Git (optional)

## Environment Setup

Create `.env` files:

- backend/.env
```
PORT=4000
DATABASE_URL=mysql://user:pass@localhost:3306/shoesdb
JWT_SECRET=change-me-please
BCRYPT_SALT_ROUNDS=11
```

- frontend/.env
```
VITE_API_BASE=http://localhost:4000/api
```

## Project Initialization (structure only)

```
# Backend
mkdir -p backend/src/{api,models,services,middleware,utils} backend/tests/{unit,integration,contract}
cd backend
npm init -y
npm install express mysql2 sequelize jsonwebtoken bcrypt express-validator cors dotenv
npm install --save-dev jest supertest nodemon eslint

# Frontend
cd ..
mkdir -p frontend
cd frontend
npm create vite@latest . -- --template react
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# Configure Tailwind in tailwind.config.js: content: ["./index.html","./src/**/*.{js,jsx}"]

npm install axios
npm install --save-dev eslint jest @testing-library/react @testing-library/jest-dom
```

## Run Scripts (recommended)

Add scripts:

- backend/package.json
```
"scripts": {
  "dev": "nodemon src/server.js",
  "test": "jest",
  "lint": "eslint ."
}
```

- frontend/package.json
```
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "jest"
}
```

## Database Setup

```
# Create database
mysql -u root -p -e "CREATE DATABASE shoesdb;"

# Sequelize init (optional if using CLI)
# npx sequelize-cli init
# Define models as per data-model.md
```

## Development

```
# Terminal 1: backend
cd backend
npm run dev

# Terminal 2: frontend
cd frontend
npm run dev
```

Open http://localhost:5173 (frontend) and the API at http://localhost:4000/api.

## Testing

- Backend: `npm run test` (Jest + Supertest)
- Frontend: `npm run test` (React Testing Library)
- E2E (optional): Add Playwright and run key flows (cart/checkout, product detail)

## Performance & A11y Checklist

- Lighthouse: Verify LCP p75 ≤ 2.5s; TTI p95 ≤ 3.0s
- Axe: No WCAG 2.2 AA violations on navbar, carousel, forms, CTAs
- Bundle: gzipped JS page ≤ 250KB; enable code-splitting

