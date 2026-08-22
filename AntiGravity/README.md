# CivicVerify

Location-aware civic complaint verification and contractor accountability platform (citizen feed, hotspots map, officer dashboard, contractor DLP portal, analytics).

The **canonical React app is `frontend/`**. The leftover Vite template under root `src/` is unused — do not run `vite` from the repo root.

## Prerequisites

- Node.js 18+
- MongoDB locally (`mongodb://127.0.0.1:27017/civicverify`) or MongoDB Atlas

## Setup

```bash
# Backend
cd backend
cp .env.example .env   # set MONGO_URI, JWT_SECRET
npm install

# Frontend
cd ../frontend
cp .env.example .env   # VITE_API_URL=/api (Vite proxies to the API)
npm install

# Root orchestrator (optional, for one-command dev)
cd ..
npm install
```

## Seed demo data

From the repo root:

```bash
npm run seed
```

Or from `backend/`: `npm run seed`. The seeder loads `backend/.env` for `MONGO_URI`.

### Demo logins

| Role | Email | Password |
|------|--------|----------|
| Citizen | `citizen@civicverify.org` | `Password@123` |
| Officer | `officer@civicverify.org` | `Password@123` |
| Contractor | `contractor@civicverify.org` | `Password@123` |
| Admin | `admin@civicverify.org` | `Password@123` |

The header **Role** dropdown calls `POST /api/auth/perspective` and swaps JWT so you can demo all portals without logging out.

## Run

```bash
# From repo root — API on :5000, UI on :5173
npm run dev
```

Or separately:

```bash
npm run dev --prefix backend
npm run dev --prefix frontend
```

- UI: http://localhost:5173  
- API health: http://localhost:5000/api/health  
- Uploaded evidence: http://localhost:5000/uploads/... (also proxied from the Vite origin)

If MongoDB is down, the API still starts; the UI falls back to in-memory mock data.

## API overview

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/auth/register` `/login` | Register / login (JWT) |
| GET | `/api/auth/me` | Current user |
| POST | `/api/auth/perspective` | Demo role switch |
| GET/POST | `/api/complaints` | List / create (multipart `image`) |
| GET | `/api/complaints/map` | Map pins |
| PATCH | `/api/complaints/:id/progress` | Contractor progress + proof image |
| POST | `/api/complaints/:id/confirm` | Citizen two-way verification |
| POST | `/api/complaints/:id/upvote` | Upvote / un-upvote |
| POST | `/api/complaints/:id/cluster` | Join duplicate cluster |
| POST | `/api/complaints/:id/escalate` | Officer escalation |
| GET/POST | `/api/alerts` | Civic broadcast alerts |
| GET | `/api/departments` | Departments |
| GET | `/api/infrastructure` | DLP assets |
| GET | `/api/contractors` | Contractors |
| GET | `/api/analytics/overview` | Accountability metrics |
