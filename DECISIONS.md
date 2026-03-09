# Suki Rewards Decisions

- Kept architecture as one React app with two route groups (`/user/*` and `/admin/*`) to follow `readme.md` override.
- Merged notifications into the Home page bell dropdown and did not expose `/notifications` route.
- Added `/user/profile` as the 5th tab target to keep TabBar complete while core P0 pages remain unchanged.
- Centralized all mock data in `src/data/mockData.js` with extra dashboard/member/push/trend datasets required by checklist.
- Implemented a global toast provider plus per-page `useLoading` flow so all actions follow fake loading then feedback.
- Used SVG matrix as mock QR for coupon redemption to avoid external dependencies.
- Implemented P2 admin pages (`tiers`, `points-rules`, `stores`) as lightweight read or mostly read versions per low-priority guidance.
- Added subtle animations via Tailwind keyframes: route fade-in, count-up numbers, and check-in `+10 pts` rise effect.
- Used Vite with `npm start` script alias to satisfy quick local run and modern React setup.
- Added a dedicated Chinese UI screen at `/user/chinese` with a profile entry point to support bilingual demos without changing existing English flows.
- Upgraded to global bilingual support with `I18nProvider` + `useI18n` + `LanguageSwitcher`; language now persists in `localStorage` (`suki_lang`) and applies across user/admin/login routes.
- Added a minimal Vercel serverless backend with cookie session auth and Postgres persistence for login, member summary, birthday claim, and coupon wallet usage.
