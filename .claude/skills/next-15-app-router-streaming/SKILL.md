---
name: next-15-app-router-streaming
description: Build streaming server components in Next.js 15 App Router with React 19 — Suspense boundaries, async server components, partial prerendering (PPR), `use cache` directive, server actions for mutations. Use when adding a new page, debugging hydration mismatches, or optimizing TTFB on a Next.js 15 project.
category: frontend
version: 0.1.0
tags: [next, nextjs, react, app-router, streaming, server-components]
recommended_npm: ["next", "react", "react-dom", "@vercel/postgres"]
license: MIT
author: claude-code-skills
---

Next.js 15 + React 19 ships streaming server components with partial prerendering (PPR) on by default for opted-in routes. Here's how to use it without the common foot-guns.

## Mental model

- **Default = static.** A page with no dynamic API call is fully prerendered at build.
- **`Suspense` is the streaming boundary.** Anything inside a `<Suspense fallback={…}>` streams in after the shell arrives.
- **`'use cache'` (experimental, behind `dynamicIO`) caches a function's output.** Tagged invalidation via `cacheTag()` and `cacheLife()`.
- **Server Actions** (`'use server'`) replace API routes for mutations. They co-locate with the component, validate on the server, and revalidate cache tags.
- **`cookies()`, `headers()`, `params`, `searchParams` are now async.** Always `await` them in Next 15.

## Page pattern: shell + streamed islands

```tsx
// app/dashboard/page.tsx
import { Suspense } from "react";
import { ProductGrid } from "./product-grid";
import { ProductGridSkeleton } from "./skeletons";
import { RecentActivity } from "./recent-activity";

export default async function DashboardPage(props: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await props.searchParams;
  return (
    <main>
      <h1>Dashboard</h1>
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid query={q} />
      </Suspense>
      <Suspense fallback={null}>
        <RecentActivity />
      </Suspense>
    </main>
  );
}
```

## Server action with cache invalidation

```tsx
// app/dashboard/actions.ts
"use server";
import { revalidateTag } from "next/cache";
import { db } from "@/lib/db";
import { z } from "zod";

const Schema = z.object({ name: z.string().min(1).max(80) });

export async function createProduct(formData: FormData) {
  const parsed = Schema.safeParse({ name: formData.get("name") });
  if (!parsed.success) return { ok: false, error: parsed.error.flatten() };
  await db.insert(/* … */);
  revalidateTag("products");
  return { ok: true };
}
```

## `use cache` (Next 15 experimental)

```tsx
async function getProducts(q?: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("products", q ? `products:${q}` : "products:all");
  return db.query(/* … */);
}
```

## Hydration-mismatch causes (always-on debug list)

1. `Date.now()`, `Math.random()`, `new Date().toLocaleString()` rendered on the server. → Move to a client component or wrap in `useEffect`.
2. Browser-only globals (`window`, `localStorage`) read at module scope. → Lazy-import or guard with `typeof window !== 'undefined'`.
3. Conditional rendering based on `useSyncExternalStore` without a stable server snapshot. → Provide one.
4. Class/style attribute drift from a CSS-in-JS lib that doesn't SSR. → Use the framework adapter (e.g. `@vanilla-extract/next-plugin`).

## Anti-patterns

- ❌ Using `"use client"` on the page itself just to call `useState`. Move state to a small leaf component instead.
- ❌ Wrapping every component in `<Suspense>` "just in case" — empty boundaries waste streaming budget.
- ❌ Calling `fetch(..., { cache: 'no-store' })` everywhere. Default is good; opt out only for genuinely dynamic data.
- ❌ Mixing Pages Router and App Router for the same route segment.
- ❌ Returning JSX from a server action — return serializable data; the caller renders.

## Performance gates

- LCP element is in the static shell, not behind a `Suspense`.
- Total JavaScript shipped per route < 90KB gzipped (check `.next/analyze`).
- No `'use client'` boundary above the layout level.
