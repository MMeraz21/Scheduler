# Agent instructions

## General

Always use pnpm over other package managers

Follow standard React, Shadcn conventions when implementing something.

## UI components

When adding or changing UI, follow patterns and primitives aligned with [shadcn/ui](https://ui.shadcn.com): composition with Radix-style behavior where it fits, Tailwind for styling, copy-in components rather than opaque component libraries, and the same accessibility and structure conventions the shadcn docs exemplify. Prefer matching shadcn’s approach over ad-hoc one-off UI unless there is a clear reason not to.

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
