---
layout: post
title: "GeoScope: From 5‑Day Internship Technical Assessment to Production‑Style IP Intelligence Dashboard"
description: Turning a time‑boxed internship assessment into a secure, extensible geolocation platform (Next.js + Express + Redis) with guest vs auth flows, map visualization, and structured hardening plan.
tags: [nextjs, typescript, security, architecture, redis, leaflet]
---

In an **internship technical assessment** I was tasked with building a simple IP lookup tool. I treated the 5‑day window as an opportunity to demonstrate end‑to‑end product thinking: user experience, infrastructure, security posture, and a clear roadmap. The result is **GeoScope**—a unified IP geolocation dashboard combining a Next.js 14 App Router frontend with an Express API in a single Vercel deployment.

> Note: I completed and submitted this assessment even though I will likely decline the internship (no feasible remote option and the office location is impractical for commute). I still treated the brief professionally to demonstrate how I approach product delivery under tight time constraints.

## Scope & Time Constraints
- Time available: **5 days** (design, implementation, polish, documentation)
- Goal baseline: IP geolocation lookup + map
- Stretch objectives I pursued: persistent history (auth only), guest mode, dark/light theming, secure session cookie, health endpoints, bulk actions, and a forward‑looking hardening plan.

## Architecture Overview
Monorepo (single deploy):
```
/ (root)
  api/   Express + TypeScript (exported serverless handler)
  web/   Next.js 14 (App Router) UI
  vercel.json (rewrites /api/* to api handler)
```
Key decisions:
- **Serverless friendly**: One Vercel project splits API + UI via rewrites.
- **Store abstraction**: Local JSON file for dev, Upstash Redis for production.
- **Dynamic map**: Leaflet imported client‑side to avoid SSR hydration issues.
- **Theming**: Pre‑hydration script prevents flash; prefers system on first load.
- **Security defaults**: JWT in HttpOnly + SameSite=Strict cookie (Secure in prod), no token in localStorage.

## Delivered Features (Within 5 Days)
<div class="grid gap-4 sm:grid-cols-2">
  <div class="rounded-md border border-border p-3 bg-secondary/30">
    <h4 class="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Lookup</h4>
    <p class="text-sm">IP geolocation (ip-api.com) with normalized fields</p>
  </div>
  <div class="rounded-md border border-border p-3 bg-secondary/30">
    <h4 class="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Guest Mode</h4>
    <p class="text-sm">Read‑only lookups; no persistence</p>
  </div>
  <div class="rounded-md border border-border p-3 bg-secondary/30">
    <h4 class="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Auth Mode</h4>
    <p class="text-sm">Persistent, searchable history (Redis list + item keys)</p>
  </div>
  <div class="rounded-md border border-border p-3 bg-secondary/30">
    <h4 class="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Bulk Actions</h4>
    <p class="text-sm">Multi‑select + pipelined Redis deletion</p>
  </div>
  <div class="rounded-md border border-border p-3 bg-secondary/30">
    <h4 class="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Map</h4>
    <p class="text-sm">Dynamic Leaflet component positioned to current IP result</p>
  </div>
  <div class="rounded-md border border-border p-3 bg-secondary/30">
    <h4 class="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Theme</h4>
    <p class="text-sm">Dark/light toggle, flicker‑free load</p>
  </div>
  <div class="rounded-md border border-border p-3 bg-secondary/30">
    <h4 class="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Errors</h4>
    <p class="text-sm">Invalid IP modal + graceful fallbacks</p>
  </div>
  <div class="rounded-md border border-border p-3 bg-secondary/30">
    <h4 class="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Health</h4>
    <p class="text-sm"><code>/api/health</code> + <code>/api/healthz</code> (uptime, version)</p>
  </div>
</div>

## Implementation Highlights
<ul class="space-y-2 text-sm">
  <li><span class="font-medium">Dev vs Prod Data:</span> Factory selects JSON or Redis store.</li>
  <li><span class="font-medium">CORS Across Envs:</span> Comma‑separated origin allow‑list parser.</li>
  <li><span class="font-medium">Hydration Mismatch:</span> Dynamic import + suspense fallback.</li>
  <li><span class="font-medium">Fast Bulk Deletes:</span> Redis pipeline commands.</li>
  <li><span class="font-medium">Perceived Auth Latency:</span> Optimistic UI flag + background cookie validation.</li>
</ul>

## Security Posture
**Current Protections:** HttpOnly + SameSite=Strict auth cookie (Secure in production), helmet headers (CSP in production), CORS allow‑list, no JWT in client storage, guest mode isolation.

**Known Gaps (Planned Fixes):**
- Plaintext password storage (will add bcrypt/argon2)
- Weak default JWT secret fallback (`dev-secret`)
- No rate limiting / brute force mitigation
- No password policy or rotation
- No CSRF token (defense‑in‑depth improvement)
- Possible user enumeration via error variance
- No session rotation / revocation (single 1h lifetime)
- External data trust (ensure consistently escaped rendering)
- No per‑IP throttling (abuse potential)
- IPv4 regex not range‑strict; no IPv6 yet
- Missing audit + security logging
- Dev CSP less strict than prod parity target
- Generic cookie name (could adopt `__Host-` prefix + opaque session id)
- No automated dependency scanning (Dependabot / audit)
- Ensure production doesn’t leak stack traces
- Future SSRF concerns if expanding lookup scope

## Data Model (Conceptual)
```
User { id, email, password }
HistoryItem { id, userId, ip, data, createdAt }
Redis Keys:
  user:email:<email>      -> User JSON
  history:list:<userId>   -> Ordered list of history item IDs
  history:<id>            -> HistoryItem JSON
```

## Local Development Flow
```
npm install
npm run dev        # api:4000, web:3000 (relative /api calls)
# Demo users
user1@example.com / password1
user2@example.com / password2
user3@example.com / password3
```

## Roadmap (Post‑Assessment)
1. Password hashing (argon2) + rate limiting (Upstash) + lockout policy
2. CSRF token + session rotation (refresh or opaque session IDs)
3. Strict IPv4 parsing + IPv6 support + validation library
4. Observability: structured logging + metrics endpoint + request IDs
5. Dependency + container scanning automation
6. Advanced map: multi‑point history visualization / heatmap
7. Admin console (user management, usage analytics)

## Key Lessons
- A clear abstraction boundary (store factory) accelerates environment shifts.
- Investing in security scaffolding early reduces retrofit cost.
- Dynamic import patterns prevent chasing hydration edge cases.
- A concise, honest gap list builds trust and guides iteration.

## Links
- Live: https://test-react-program.vercel.app
- Source: https://github.com/max31337/test-react-program
- Project page: {{ '/projects/geoscope/' | relative_url }}

This assessment emphasized pragmatic design under tight time constraints—shipping a coherent, extensible foundation instead of a thin prototype. Future iterations will focus on hardening, observability, and richer analytics.
