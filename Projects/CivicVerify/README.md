# CivicVerify

CivicVerify is a MERN website for location-aware civic complaint submission and tracking.

## Features included

- Citizen registration and login (JWT auth)
- Admin registration (protected by `ADMIN_SETUP_KEY`)
- Citizen complaint submission with location and image evidence
- Citizen complaint history view
- Admin dashboard for all complaints and status updates
- AI/ML complaint classification pipeline:
  - Trained Naive Bayes model from raw data
  - Gemini fallback when model confidence is low
  - Rule-based fallback when Gemini is unavailable

## Project structure

- `backend/` - Express, MongoDB, auth, complaint APIs, and AI/ML services
- `frontend/` - React + Vite user interface for citizen and admin workflows

## Backend environment setup

Create `backend/.env` from `backend/.env.example` and set:

- `PORT`
- `MONGO_URI`
- `GEMINI_API_KEY`
- `FRONTEND_URL`
- `JWT_SECRET`
- `ADMIN_SETUP_KEY`

## Run training on raw data

The raw training data is at `backend/data/raw-complaints.json`.

Train the baseline classifier:

```bash
cd backend
npm run train-model
```

This generates `backend/trained-models/complaint-model.json`.

## Start the application

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: http://localhost:5173
Backend URL: http://localhost:5000

## Key placement (important)

- Put `MONGO_URI` in `backend/.env` only
- Put `GEMINI_API_KEY` in `backend/.env` only
- Never place keys in React frontend files
