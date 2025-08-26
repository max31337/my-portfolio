---
layout: default
title: SalesOptimizer (WIP)
description: CRM with task management and predictive analytics — FastAPI backend (DDD, modular, JWT) exposing REST APIs and WebSockets for SLA monitoring; Next.js + TypeScript + shadcn/ui frontend.
hero:
  image: /assets/projects/salesoptimizer/superadmin-overview.webp
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
  <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Docker</span>
  <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Railway (trial)</span>
    </div>
    <div class="flex gap-3 text-xs">
      <a class="rounded-md border border-border px-3 py-1 hover:bg-secondary {% unless page.links.live %}pointer-events-none opacity-50{% endunless %}" href="{{ page.links.live }}">Live</a>
      <a class="rounded-md border border-border px-3 py-1 hover:bg-secondary" href="{{ page.links.repo }}" target="_blank" rel="noopener">Source</a>
    </div>
  </header>

  {% if page.hero.image %}
  <figure class="rounded-lg border border-border overflow-hidden">
    <button type="button" class="project-img-btn" data-img="{{ page.hero.image | relative_url }}" aria-label="View image">
      <picture>
        <source type="image/webp" srcset="{{ page.hero.image | relative_url }}" />
        <img class="w-full" src="{{ page.hero.image | replace: '.webp', '.png' | relative_url }}" alt="SalesOptimizer overview" loading="eager" fetchpriority="high" decoding="async" sizes="100vw" />
      </picture>
    </button>
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
        <li>API Docs: Swagger UI (FastAPI's built-in OpenAPI support) for API endpoint management</li>
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
    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-2">Deployment</h2>
      <p class="text-sm text-muted-foreground">Containerized with Docker. Trial deployments tested on Railway using Docker images to validate runtime and service wiring. Exploring hosting options and CI for automated deploys.</p>
    </article>
  </div>

  <div class="space-y-3">
    <h2 class="font-medium">Screens (WIP)</h2>
  <div class="grid gap-4 md:grid-cols-2 cv-auto">
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/salesoptimizer/superadmin-overview.webp' | relative_url }}" aria-label="View image">
          <picture>
            <source type="image/webp" srcset="{{ '/assets/projects/salesoptimizer/superadmin-overview.webp' | relative_url }}" />
            <img class="w-full" src="{{ '/assets/projects/salesoptimizer/superadmin-overview.png' | relative_url }}" alt="Superadmin overview" loading="lazy" decoding="async" sizes="(min-width:768px) 50vw, 100vw" />
          </picture>
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Superadmin overview</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/salesoptimizer/superadmin-system-metrics.png' | relative_url }}" aria-label="View image">
            <img class="w-full" src="{{ '/assets/projects/salesoptimizer/superadmin-system-metrics.png' | relative_url }}" alt="System metrics" loading="lazy" decoding="async" fetchpriority="low" sizes="(min-width:768px) 50vw, 100vw" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">System metrics</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/salesoptimizer/superadmin-SLA-reports.png' | relative_url }}" aria-label="View image">
            <img class="w-full" src="{{ '/assets/projects/salesoptimizer/superadmin-SLA-reports.png' | relative_url }}" alt="SLA reports" loading="lazy" decoding="async" fetchpriority="low" sizes="(min-width:768px) 50vw, 100vw" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">SLA reports</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/salesoptimizer/superadmin-system-alerts.png' | relative_url }}" aria-label="View image">
            <img class="w-full" src="{{ '/assets/projects/salesoptimizer/superadmin-system-alerts.png' | relative_url }}" alt="System alerts" loading="lazy" decoding="async" fetchpriority="low" sizes="(min-width:768px) 50vw, 100vw" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">System alerts</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/salesoptimizer/profile.png' | relative_url }}" aria-label="View image">
            <img class="w-full" src="{{ '/assets/projects/salesoptimizer/profile.png' | relative_url }}" alt="Profile" loading="lazy" decoding="async" fetchpriority="low" sizes="(min-width:768px) 50vw, 100vw" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Profile</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/salesoptimizer/profile-settings.png' | relative_url }}" aria-label="View image">
            <img class="w-full" src="{{ '/assets/projects/salesoptimizer/profile-settings.png' | relative_url }}" alt="Profile settings" loading="lazy" decoding="async" fetchpriority="low" sizes="(min-width:768px) 50vw, 100vw" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Profile settings</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/salesoptimizer/security-settings.png' | relative_url }}" aria-label="View image">
            <img class="w-full" src="{{ '/assets/projects/salesoptimizer/security-settings.png' | relative_url }}" alt="Security settings" loading="lazy" decoding="async" fetchpriority="low" sizes="(min-width:768px) 50vw, 100vw" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Security settings</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden md:col-span-2">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/salesoptimizer/sample-dark-mode.png' | relative_url }}" aria-label="View image">
            <img class="w-full" src="{{ '/assets/projects/salesoptimizer/sample-dark-mode.png' | relative_url }}" alt="Dark mode sample" loading="lazy" decoding="async" fetchpriority="low" sizes="100vw" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Dark mode sample</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/salesoptimizer/sign-up-form.png' | relative_url }}" aria-label="View image">
            <img class="w-full" src="{{ '/assets/projects/salesoptimizer/sign-up-form.png' | relative_url }}" alt="Sign up form" loading="lazy" decoding="async" fetchpriority="low" sizes="(min-width:768px) 50vw, 100vw" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Sign up form</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden md:col-span-2">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/salesoptimizer/sample-tenant.png' | relative_url }}" aria-label="View image">
            <img class="w-full" src="{{ '/assets/projects/salesoptimizer/sample-tenant.png' | relative_url }}" alt="Sample tenant" loading="lazy" decoding="async" fetchpriority="low" sizes="100vw" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Sample tenant</figcaption>
      </figure>

    </div>
  </div>
</section>
