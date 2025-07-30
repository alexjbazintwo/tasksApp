Current Full-Stack Setup

🗂 Tech Stack
Frontend: React + Vite

Backend: Express + Prisma

Database: PostgreSQL

Testing: Playwright (split into mocked, e2e, and API tests)

CI: GitHub Actions running all 3 test types in separate jobs

Dockerized: Full app (frontend, backend, database) via docker-compose

🧪 Test Setup
✅ Mocked Playwright tests run without backend (mocked API responses)

✅ E2E Playwright tests run with frontend + backend + real DB

✅ API tests run with backend + real DB (no frontend)


🐳 Docker Details
Docker containers for:

frontend (Vite app)

backend (Express + Prisma)

db (PostgreSQL, persistent via volume)

Launch via:

docker compose up --build
