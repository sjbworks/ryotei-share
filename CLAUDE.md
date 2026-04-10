# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (webpack)
npm run build        # Production build
npm run lint         # ESLint (.ts, .tsx)
npm run typecheck    # tsc --noEmit
npm run test         # Jest
npm run test:watch   # Jest watch mode
npm run test:coverage
npm run codegen      # GraphQL code generation
npm run storybook    # Storybook on port 6006
```

Single test file:

```bash
npx jest path/to/file.test.tsx
```

## Architecture

**Tech stack**: Next.js 16 (App Router), TypeScript, MUI v7, Apollo Client 4, Supabase, GraphQL, Tailwind CSS, React Hook Form

**Directory structure**:

- `app/` — Next.js routes (App Router). `[shareId]/` is the public share page (unauthenticated)
- `feature/` — Feature modules. Each module owns its components, hooks, graphql queries, and types
  - `feature/ryotei/` — Core itinerary feature (main business logic)
  - `feature/api/graphql/` — **Auto-generated** TypeScript types from codegen. Do not edit manually
  - `feature/provider/` — Apollo Client and Snackbar context providers
  - `feature/auth/` — OAuth login/logout (GitHub, Google via Supabase)
- `component/` — Reusable UI components (Form, Timeline, Modal, Drawer, etc.)
- `utils/supabase/` — Supabase client wrappers. `client.ts` = browser, `server.ts` = server, `middleware.ts` = session refresh per request

## Key Patterns

**Server vs Client Components**: Default to Server Components. Add `'use client'` only when needed (event handlers, hooks, Apollo). Apollo queries run in Client Components via hooks.

**GraphQL workflow**: Write `.gql` files in `feature/ryotei/graphql/`, run `npm run codegen` to regenerate types in `feature/api/graphql/schema.ts` and `operations.ts`. Import generated types for all GraphQL operations — never use `any` as a substitute.

**Apollo Client chain**: `errorLink → authLink → httpLink`. The error link handles `UNAUTHENTICATED` (401) by calling `refreshAccessToken()` and retrying. Auth link attaches Supabase session token with a 5-second cache.

**Supabase auth**: Session managed via cookies in middleware. Protected routes redirect to `/login`. Share pages (`/[shareId]`) and `/legal`, `/login`, `/api/auth` are public.

**Data mutations**: All data operations go through GraphQL mutations. Apollo's `InMemoryCache` handles local state — invalidate cache after mutations via `refetchQueries` or manual cache updates.

## 📏 Code Rules

### Testing

- Write all `it` / `test` descriptions in English.

```ts
// Good
it('returns 401 when session is not found', async () => { ... })

// Bad
it('セッションがない場合は401を返す', async () => { ... })
```

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SCHEMA_URL          # Supabase GraphQL endpoint
```

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs on PRs to `main`: lint → typecheck → test → build (sequential), then code review via `anthropics/claude-code-action` after build passes.

Auto-generated files excluded from lint/typecheck: `feature/api/graphql/schema.ts`, `feature/api/graphql/operations.ts`.
