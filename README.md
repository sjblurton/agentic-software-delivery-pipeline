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
- `pnpm lint` — run ESLint
- `pnpm typecheck` — run TypeScript checks
- `pnpm test` — run Vitest once
- `pnpm test:watch` — run Vitest in watch mode
- `pnpm db:generate` — generate Drizzle migration files
- `pnpm db:push` — push schema to database
- `pnpm db:studio` — open Drizzle Studio
