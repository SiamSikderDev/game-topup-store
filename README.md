# TopUpGhor — Game Top-Up Store (v1)

Bangla-first instant UID top-up store for Bangladesh. Next.js 16 + React 19 + Tailwind,
macaly design system (paper #EDF5B4, 2px ink borders, hard offset shadows, Fraunces + Inter).

## What's built

- **Home** (`/`) — hero with sticker badges, game catalog grid, 4-step how-it-works,
  delivery-promise banner, reviews/proof section (clearly labeled SAMPLES), FAQ teaser
- **Per-game page** (`/game/[slug]`) — Free Fire, PUBG Mobile, MLBB, CODM; package grid
  with ৳ prices, UID **double-entry confirm**, order summary card
- **Checkout** (`/checkout`) — 3 steps: package confirm → billing (name/phone) → payment
  (method select, merchant number, sender number + TrxID) → tracking page
- **Tracking** (`/track`) — order ID / phone lookup, status timeline (localStorage)
- **UID guide** (`/uid-guide`), **FAQ + terms** (`/faq`), **Reviews** (`/reviews`, samples labeled)
- **Admin** (`/admin`, PIN-gated) — order queue, paid/delivered/cancelled actions,
  TrxID fraud helper (repeat-TrxID + same-sender warnings), float tracker, revenue total.
  Shows DEMO-DATA notice; v1 orders live in the admin's browser localStorage.
- **BN/EN toggle** — working language switcher in header (Bangla default, persisted);
  all customer-facing copy translated
- Global: sticky header, footer (contact/terms/refund), floating WhatsApp support button

## Before launch — Siam must confirm

1. **Prices**: all ৳ prices are placeholders from business plan §6 (gamesbd24.app, Oct 2026).
   Items marked `placeholder: true` in `lib/data.ts` are pure estimates. Confirm with supplier.
2. **Merchant numbers**: `MERCHANT_BKASH` / `MERCHANT_NAGAD` in `lib/data.ts` are `01XXX-XXXXXX`.
3. **WhatsApp**: `SUPPORT_WHATSAPP` is `wa.me/8801XXXXXXXXX`.
4. **Admin PIN**: default `1234` — change before sharing the link.
5. **Storage**: v1 uses browser localStorage. Real launch needs a DB (Supabase/Neon) +
   real admin auth — the PIN gate is demo-grade.
6. **Reviews**: all reviews are illustrative SAMPLES with visible badges — replace with
   real delivery-proof screenshots after the first orders. Never present samples as real.

## Deploy

```bash
cd ~/workspace/game-topup-store
npm install
npm run build   # must pass
gh repo create SiamSikderDev/game-topup-store --public --source=. --push
```

Vercel: project connected to the GitHub repo (auto-deploy on push to `main`).
If re-deploying via MCP `create_deployment`, remember to disable SSO Deployment
Protection afterwards or the public URL serves a login wall:
`vercel call-tool --name update_project --arguments-json '{"idOrName":"<project>","requestBody":{"ssoProtection":null,"passwordProtection":null}}'`
