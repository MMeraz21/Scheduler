# Scheduler

Personal calendar app — Apple Calendar-style UX with real-time sync across desktop (Electron), mobile (PWA), and web.

See **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** for the full technical plan.

## Monorepo structure

```text
scheduler/
  apps/
    web/          # Next.js + Convex client (Vercel)
    electron/     # Desktop shell → loads web app URL
  convex/         # Schema, queries, mutations (Convex cloud)
  packages/
    shared/       # Shared utilities
```

## Prerequisites

- Node.js 20+
- pnpm 10+
- [Convex](https://dashboard.convex.dev/) account (free tier)

## Setup

```bash
pnpm install
```

Link Convex and start the backend (first run will prompt you to log in and create a project):

```bash
pnpm dev:convex
```

This writes `.env.local` with `NEXT_PUBLIC_CONVEX_URL`. Copy it to `apps/web/.env.local` or symlink from the repo root if the CLI only writes at root.

In a second terminal, start the web app:

```bash
pnpm dev:web
```

Open [http://localhost:3000](http://localhost:3000).

Optional — Electron desktop shell (expects the web app on port 3000):

```bash
pnpm dev:electron
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Run all `dev` tasks via Turborepo |
| `pnpm dev:web` | Next.js on port 3000 |
| `pnpm dev:convex` | Convex dev server + codegen |
| `pnpm dev:electron` | Electron shell |
| `pnpm build` | Build all packages |
| `pnpm typecheck` | Typecheck all packages |
| `pnpm lint` | Lint all packages |

## Deployment

- **Web**: Vercel (`apps/web`) with `npx convex deploy --cmd 'pnpm --filter @scheduler/web build'`
- **Backend**: Convex cloud (deployed with the command above)
- **Desktop**: GitHub Releases → Electron app pointing at your Vercel URL (`SCHEDULER_WEB_URL`)
