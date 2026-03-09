You are building a complete frontend demo called "Suki Rewards" — a loyalty/membership marketing system targeting Philippine SMB merchants.

## YOUR INSTRUCTIONS

Read the two planning docs in this directory:
- `suki-rewards-frontend-plan.md` — Full requirements: page wireframes, mock data definitions, interaction specs
- `suki-rewards-dev-checklist.md` — Development task checklist with priorities and order

**Build the ENTIRE project from Step 1 to Step 21 without stopping to ask me.** Just build it all. If you hit ambiguity, make a reasonable decision and move on. Log your decisions in a `DECISIONS.md` file as you go.

## KEY ARCHITECTURE DECISIONS (already made, follow these)

1. **Single project, two route groups**: `/user/*` (mobile H5) and `/admin/*` (PC dashboard). NOT two separate apps.
2. **Tech stack**: React + Tailwind CSS + Recharts + React Router. No backend. All mock data.
3. **One mock data file**: `src/data/mockData.js` — all mock data centralized here.
4. **Shared components**: LoadingOverlay, Toast, Modal, TabBar (user), Sidebar (admin), useLoading hook.
5. **Notifications merged into Home**: No separate `/notifications` route. Bell icon on Home opens notification dropdown.
6. **All interactions**: fake loading 1-1.5s → success toast/callback. Use a `useLoading` custom hook.
7. **P2 pages (Tiers, Points Rules, Stores)**: minimal read-only versions, don't over-invest.

## DESIGN SPECS

- Primary color: `#6C3CE1` (purple)
- Accent color: `#F5A623` (gold, for points/rewards)
- User app background: `#F8F6FF`
- Admin accent: `#10B981` (green/positive), `#F59E0B` (yellow/warning)
- User app: vibrant gradients, 16px border-radius, mobile-first (375px base)
- Admin: clean white background, card shadows, professional dashboard style
- Font: Inter / system-ui
- Currency: ₱ PHP, thousands comma separator (2,450), date format MM/DD/YYYY
- All UI in English

## BUILD ORDER

Follow the checklist strictly:

### Phase 1: Skeleton + Data
1. Init React + Tailwind + Recharts + React Router, configure all routes (return placeholder text)
2. Create `src/data/mockData.js` with ALL mock data (user, business, coupons, store items, points history, tasks, referral, notifications, members, campaigns, push history, tiers, points rules, stores, referral stats, dashboard KPIs + chart data)
3. Build shared components: LoadingOverlay, Toast, Modal, TabBar, Sidebar, PageHeader, useLoading hook
4. User app layout: viewport meta, TabBar + 5 placeholder pages
5. Admin layout: Sidebar + 8 placeholder pages

### Phase 2: User Pages (P0 first)
6. Login `/login` — phone+OTP flow, Facebook button, brand gradient header
7. Home `/user/home` — greeting, notification bell+dropdown, gradient membership card, 4-grid shortcuts, daily tasks, offers carousel, recent activity
8. Points `/user/points` — points card, 7-day check-in calendar, task list, points history with Earned/Used tabs
9. Coupons `/user/coupons` — All/Active/Used tabs, coupon cards, QR code redemption modal
10. Store `/user/store` — category tabs, 2-col product grid, redeem confirmation modal
11. Refer `/user/refer` — incentive card, invite code with copy, share buttons, referral list

### Phase 3: Admin Pages
12. Dashboard `/admin/dashboard` — 4 KPI cards, line chart (30d), pie chart (tiers), bar chart (points issued vs consumed), AI insights section
13. Members `/admin/members` — table + search/filter, click row → slide-out drawer with detail + adjust points + tags
14. Campaigns `/admin/campaigns` — status tabs, campaign cards, create campaign modal form
15. Push `/admin/push` — compose form, target audience selector, send history list
16. Referral `/admin/referral` — stat cards, line chart, top referrers table
17. Tiers `/admin/tiers` — 4 tier cards side by side (read-only, Edit button shows "Coming soon" toast)
18. Points Rules `/admin/points-rules` — form with pre-filled mock values, Save button
19. Stores `/admin/stores` — store table, expandable cashier list

### Phase 4: Polish
20. Add subtle animations: page transitions, number counting, check-in success effect
21. Run through demo flow (user 5min + admin 5min path from the plan doc), fix any broken routing/layout

## WHEN DONE

- Run `npm start` and verify it compiles without errors
- Create `DECISIONS.md` listing any judgment calls you made
- Print a summary of what was built

GO. Start now from Step 1.readme.md
suki-rewards-dev-checklist.md
suki-rewards-frontend-plan.md# -demo
