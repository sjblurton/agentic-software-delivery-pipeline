# AI Next Supabase Boilerplate

Baseline Next.js + Supabase boilerplate with TypeScript strict mode, Drizzle tooling, Tailwind + shadcn/ui foundations, and boundary-validation dependencies prewired.

## Prerequisites

- Node.js 22 (`.nvmrc`)
- pnpm (via Corepack)

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Create local environment file:

```bash
cp .env.example .env.local
```

3. Fill in required values in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL`

4. Start development server:

```bash
pnpm dev
```

Visit http://localhost:3000 to confirm the bootstrap baseline route renders.

## Scripts

- `pnpm dev` — run local app
- `pnpm build` — production build
- `pnpm format` — format the repo with Prettier
- `pnpm format:check` — verify formatting without writing changes
- `pnpm lint` — run ESLint
- `pnpm typecheck` — run TypeScript checks
- `pnpm test` — run Vitest once
- `pnpm test:watch` — run Vitest in watch mode
- `pnpm test:e2e` — run the Playwright smoke test suite
- `pnpm test:e2e:ui` — open Playwright UI mode
- `pnpm db:generate` — generate Drizzle migration files
- `pnpm db:push` — push schema to database
- `pnpm db:studio` — open Drizzle Studio

## E2E testing

Playwright runs the smoke test in `tests/e2e/` against the app's home page. The config starts the Next.js dev server automatically when needed.

To install Chromium locally or in CI:

```bash
npx playwright install --with-deps chromium
```
