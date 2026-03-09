# Suki Rewards Minimal Backend Setup (Vercel + Postgres)

## 1) Create Vercel Postgres (Neon integration)
- In Vercel project dashboard, add storage and choose Postgres.
- Vercel will inject Postgres connection env vars for preview/production.

## 2) Add session secret
- In Vercel project settings, add:
  - `SESSION_SECRET` = a long random string

## 3) Initialize database
- Run SQL in Vercel SQL editor:
  - `database/init.sql`

This creates tables and seeds demo account:
- Phone: `0917-123-4567`
- Password: `123456`

## 4) Deploy
- Connect GitHub repo to Vercel.
- Push to `main` to trigger auto deployment.

## 5) Local development
- Pull Vercel env vars locally (or set equivalent Postgres env vars manually).
- Start app:
```bash
npm start
```

## Implemented API routes
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/member/summary`
- `POST /api/member/claim-birthday`
- `GET /api/coupons`
- `POST /api/coupons/use`

