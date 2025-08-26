---
layout: default
title: FlowForge (WIP)
description: Multi-tenant SaaS dashboard for task management using the TALL stack — Tailwind CSS, Alpine.js, Laravel, Livewire — with PostgreSQL.
hero:
  image: /assets/projects/flowforge/superadmin-dashboard.png
links:
  repo: https://github.com/max31337/FlowForge
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
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Tailwind CSS</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Alpine.js</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Laravel</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Livewire</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">PostgreSQL</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Multi‑tenant</span>
    </div>
    <div class="flex gap-3 text-xs">
      <a class="rounded-md border border-border px-3 py-1 hover:bg-secondary {% unless page.links.live %}pointer-events-none opacity-50{% endunless %}" href="{{ page.links.live }}">Live</a>
      <a class="rounded-md border border-border px-3 py-1 hover:bg-secondary" href="{{ page.links.repo }}" target="_blank" rel="noopener">Source</a>
    </div>
  </header>

  {% if page.hero.image %}
  <figure class="rounded-lg border border-border overflow-hidden">
    <button type="button" class="project-img-btn" data-img="{{ page.hero.image | relative_url }}" aria-label="View image">
      <img class="w-full" src="{{ page.hero.image | relative_url }}" alt="FlowForge superadmin dashboard" />
    </button>
    <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Superadmin dashboard (WIP)</figcaption>
  </figure>
  {% endif %}

  <div class="grid gap-6 md:grid-cols-2">
    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-2">Vision</h2>
      <p class="text-sm text-muted-foreground">A modern SaaS platform built with the TALL stack. Multi‑tenancy, role‑based access, real‑time dashboards, and task management — designed to demonstrate best practices and pragmatic, maintainable architecture.</p>
    </article>
    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-2">Stack</h2>
      <ul class="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
        <li>Tailwind CSS, Alpine.js, Laravel, Livewire (TALL)</li>
        <li>PostgreSQL database</li>
        <li>RBAC, queues, real‑time updates (broadcasting)</li>
        <li>REST API for external integrations</li>
        <li>Light/Dark theme support</li>
      </ul>
    </article>
  </div>

  <div class="space-y-3">
    <h2 class="font-medium">Screens (WIP)</h2>
    <div class="grid gap-4 md:grid-cols-2">
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/flowforge/superadmin-dashboard.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/flowforge/superadmin-dashboard.png' | relative_url }}" alt="Superadmin dashboard" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Superadmin dashboard</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/flowforge/superadmin-tenant-management.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/flowforge/superadmin-tenant-management.png' | relative_url }}" alt="Tenant management" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Tenant management</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/flowforge/tenant dashboard.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/flowforge/tenant dashboard.png' | relative_url }}" alt="Tenant dashboard" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Tenant dashboard</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/flowforge/tenant-project-list.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/flowforge/tenant-project-list.png' | relative_url }}" alt="Tenant project list" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Tenant project list</figcaption>
      </figure>
    </div>
  </div>
</section>
