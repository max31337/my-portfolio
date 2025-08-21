---
layout: default
title: SalesOptimizer (WIP)
description: CRM with task management and predictive analytics — FastAPI backend (DDD, modular, JWT) exposing REST APIs and WebSockets for SLA monitoring; Next.js + TypeScript + shadcn/ui frontend.
hero:
  image: /assets/projects/salesoptimizer/superadmin-overview.png
links:
  repo: https://github.com/max31337/salesoptimizer
  live:
status: WIP
---

<section class="space-y-10">
  <header class="space-y-4">
    <div>
      <h1 class="text-3xl font-semibold tracking-tight">{{ page.title }}</h1>
      <p class="text-muted-foreground max-w-2xl">{{ page.description }}</p>
      <div class="mt-2 text-[11px] inline-flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-2 py-1">
        <span class="size-2 rounded-full bg-yellow-500"></span>
        <span>Work in progress — under active development</span>
      </div>
    </div>
    <div class="flex flex-wrap items-center gap-2 text-[11px]">
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">FastAPI</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">DDD + Modular</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">JWT Auth</span>
  <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">REST APIs</span>
  <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">WebSockets (SLA)</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">PostgreSQL</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Redis</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Next.js (TypeScript)</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">shadcn/ui</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Zustand</span>
    </div>
    <div class="flex gap-3 text-xs">
      <a class="rounded-md border border-border px-3 py-1 hover:bg-secondary {% unless page.links.live %}pointer-events-none opacity-50{% endunless %}" href="{{ page.links.live }}">Live</a>
      <a class="rounded-md border border-border px-3 py-1 hover:bg-secondary" href="{{ page.links.repo }}" target="_blank" rel="noopener">Source</a>
    </div>
  </header>

  {% if page.hero.image %}
  <figure class="rounded-lg border border-border overflow-hidden">
    <img class="w-full" src="{{ page.hero.image | relative_url }}" alt="SalesOptimizer overview" />
    <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Superadmin overview (WIP)</figcaption>
  </figure>
  {% endif %}

  <div class="grid gap-6 md:grid-cols-2">
    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-2">Vision</h2>
      <p class="text-sm text-muted-foreground">A multi-tenant CRM focused on productivity and insights: task management, pipeline, and predictive analytics. The backend follows DDD and modular patterns with JWT-based auth and exposes REST APIs plus WebSockets for real-time SLA monitoring (metrics, reports, alerts). The frontend uses Next.js + TypeScript with shadcn/ui and Zustand.</p>
    </article>
    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-2">Stack</h2>
      <ul class="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
        <li>Backend: FastAPI (REST + WebSockets), SQLAlchemy, Alembic, Pydantic v2, Redis, psycopg/asyncpg</li>
        <li>Auth: JWT (pyjwt), passlib[bcrypt], cryptography; OAuth via Authlib</li>
        <li>Infra: dotenv, psutil, Jinja2 (templating), websockets</li>
        <li>Frontend: Next.js (TypeScript), shadcn/ui, Zustand</li>
        <li>Tests: pytest (+ asyncio, cov, mock), factory-boy, faker</li>
      </ul>
    </article>
    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-2">Current status</h2>
      <ul class="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
        <li>Authentication is implemented (JWT) and working.</li>
        <li>Self-serve tenant onboarding with free trial is live.</li>
        <li>SLA module is fully functional.</li>
        <li>Real-time SLA metrics, reports, and alerts delivered via WebSockets.</li>
      </ul>
    </article>
  </div>

  <div class="space-y-3">
    <h2 class="font-medium">Screens (WIP)</h2>
    <div class="grid gap-4 md:grid-cols-2">
      <figure class="rounded-lg border border-border overflow-hidden">
        <img class="w-full" src="{{ '/assets/projects/salesoptimizer/superadmin-overview.png' | relative_url }}" alt="Superadmin overview" />
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Superadmin overview</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <img class="w-full" src="{{ '/assets/projects/salesoptimizer/superadmin-system-metrics.png' | relative_url }}" alt="System metrics" />
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">System metrics</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <img class="w-full" src="{{ '/assets/projects/salesoptimizer/superadmin-SLA-reports.png' | relative_url }}" alt="SLA reports" />
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">SLA reports</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <img class="w-full" src="{{ '/assets/projects/salesoptimizer/superadmin-system-alerts.png' | relative_url }}" alt="System alerts" />
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">System alerts</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <img class="w-full" src="{{ '/assets/projects/salesoptimizer/profile.png' | relative_url }}" alt="Profile" />
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Profile</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <img class="w-full" src="{{ '/assets/projects/salesoptimizer/profile-settings.png' | relative_url }}" alt="Profile settings" />
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Profile settings</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <img class="w-full" src="{{ '/assets/projects/salesoptimizer/security-settings.png' | relative_url }}" alt="Security settings" />
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Security settings</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden md:col-span-2">
        <img class="w-full" src="{{ '/assets/projects/salesoptimizer/sample-dark-mode.png' | relative_url }}" alt="Dark mode sample" />
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Dark mode sample</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <img class="w-full" src="{{ '/assets/projects/salesoptimizer/sign-up-form.png' | relative_url }}" alt="Sign up form" />
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Sign up form</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden md:col-span-2">
        <img class="w-full" src="{{ '/assets/projects/salesoptimizer/sample-tenant.png' | relative_url }}" alt="Sample tenant" />
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Sample tenant</figcaption>
      </figure>
    </div>
  </div>
</section>
