---
layout: default
title: Projects
---
<section class="space-y-6">
  <header>
    <h1 class="text-3xl font-semibold tracking-tight">Projects</h1>
  <p class="text-muted-foreground">Primarily C#/.NET (ASP.NET Core). Also Python FastAPI and some PHP. Some services are containerized with Docker; trial deployments tested on Railway using Docker images.</p>
  </header>
  <div class="grid gap-4 sm:grid-cols-2">
    <!-- New: GeoScope -->
    <article class="rounded-lg border border-border p-4 hover:bg-accent">
      <a class="block" href="{{ '/projects/geoscope/' | relative_url }}">
        <img class="rounded-md border border-border mb-3" src="{{ '/assets/projects/geoscope/dashboard.png' | relative_url }}" alt="GeoScope preview" />
        <div class="flex items-center gap-2">
          <h2 class="font-medium">GeoScope</h2>
          <span class="text-[10px] inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 bg-secondary/60">
            <span class="size-1.5 rounded-full bg-emerald-500"></span>
            Live
          </span>
        </div>
      </a>
      <p class="text-sm text-muted-foreground">IP geolocation dashboard (Next.js + Express) with guest mode, Redis-backed history, map, and secure cookie auth.</p>
      <div class="mt-3 flex gap-3 text-xs">
        <a class="rounded-md border border-border px-2 py-1 hover:bg-secondary" href="https://test-react-program.vercel.app" target="_blank" rel="noopener">Demo</a>
        <a class="rounded-md border border-border px-2 py-1 hover:bg-secondary" href="https://github.com/max31337/test-react-program" target="_blank" rel="noopener">Source</a>
      </div>
    </article>
    <!-- WIP: FlowForge (TALL) -->
    <article class="rounded-lg border border-border p-4 hover:bg-accent">
      <a class="block" href="{{ '/projects/flowforge/' | relative_url }}">
        <img class="rounded-md border border-border mb-3" src="{{ '/assets/projects/flowforge/superadmin-dashboard.png' | relative_url }}" alt="FlowForge preview" />
        <div class="flex items-center gap-2">
          <h2 class="font-medium">FlowForge (WIP)</h2>
          <span class="text-[10px] inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 bg-secondary/60">
            <span class="size-1.5 rounded-full bg-yellow-500"></span>
            WIP
          </span>
        </div>
      </a>
      <p class="text-sm text-muted-foreground">Multi‑tenant SaaS dashboard using the TALL stack (Tailwind, Alpine.js, Laravel, Livewire) with PostgreSQL.</p>
      <div class="mt-3 flex gap-3 text-xs">
        <a class="rounded-md border border-border px-2 py-1 hover:bg-secondary {% if nil %}pointer-events-none opacity-50{% endif %}" href="#">Demo</a>
        <a class="rounded-md border border-border px-2 py-1 hover:bg-secondary" href="https://github.com/max31337/FlowForge" target="_blank" rel="noopener">Source</a>
      </div>
    </article>
    <!-- WIP: SalesOptimizer -->
    <article class="rounded-lg border border-border p-4 hover:bg-accent">
      <a class="block" href="{{ '/projects/salesoptimizer/' | relative_url }}">
        <img class="rounded-md border border-border mb-3" src="{{ '/assets/projects/salesoptimizer/superadmin-overview.webp' | relative_url }}" alt="SalesOptimizer preview" />
        <div class="flex items-center gap-2">
          <h2 class="font-medium">SalesOptimizer (WIP)</h2>
          <span class="text-[10px] inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 bg-secondary/60">
            <span class="size-1.5 rounded-full bg-yellow-500"></span>
            WIP
          </span>
        </div>
      </a>
  <p class="text-sm text-muted-foreground">CRM with task management and predictive analytics — FastAPI (DDD, JWT) with REST APIs and WebSockets for SLA; Next.js + shadcn/ui frontend.</p>
      <div class="mt-3 flex gap-3 text-xs">
        <a class="rounded-md border border-border px-2 py-1 hover:bg-secondary {% if nil %}pointer-events-none opacity-50{% endif %}" href="#">Demo</a>
        <a class="rounded-md border border-border px-2 py-1 hover:bg-secondary" href="https://github.com/max31337/salesoptimizer" target="_blank" rel="noopener">Source</a>
      </div>
    </article>
    <!-- Feature .NET project first -->
    <article class="rounded-lg border border-border p-4 hover:bg-accent">
      <a class="block" href="{{ '/projects/patientmanagementsystem/' | relative_url }}">
        <img class="rounded-md border border-border mb-3" src="{{ '/assets/projects/patientmanagementsystem/dashboard.png' | relative_url }}" alt="Patient Management System preview" />
        <h2 class="font-medium">Patient Management System</h2>
      </a>
      <p class="text-sm text-muted-foreground">ASP.NET Core MVC + MSSQL with secure auth and REST API for supersystem integrations.</p>
      <div class="mt-3 flex gap-3 text-xs">
        <a class="rounded-md border border-border px-2 py-1 hover:bg-secondary {% if nil %}pointer-events-none opacity-50{% endif %}" href="#">Demo</a>
        <a class="rounded-md border border-border px-2 py-1 hover:bg-secondary" href="https://github.com/max31337/PatientManagementSystem" target="_blank" rel="noopener">Source</a>
      </div>
    </article>
    <!-- Python project -->
    <article class="rounded-lg border border-border p-4 hover:bg-accent">
      <a class="block" href="{{ '/projects/queuing/' | relative_url }}">
        <img class="rounded-md border border-border mb-3" src="{{ '/assets/projects/queuing/queue-list.png' | relative_url }}" alt="Bank Queueing System preview" />
        <h2 class="font-medium">Bank Queueing System</h2>
      </a>
      <p class="text-sm text-muted-foreground">FastAPI + Uvicorn queueing with Tailwind UI, hardware buttons, and printed receipts.</p>
      <div class="mt-3 flex gap-3 text-xs">
        <a class="rounded-md border border-border px-2 py-1 hover:bg-secondary {% if nil %}pointer-events-none opacity-50{% endif %}" href="#">Demo</a>
        <a class="rounded-md border border-border px-2 py-1 hover:bg-secondary" href="https://github.com/max31337/queuing" target="_blank" rel="noopener">Source</a>
      </div>
    </article>
    <!-- PHP project -->
    <article class="rounded-lg border border-border p-4 hover:bg-accent">
      <a class="block" href="{{ '/projects/todo-app/' | relative_url }}">
        <img class="rounded-md border border-border mb-3" src="{{ '/assets/projects/todo-app/dashboard-with-completed-task.png' | relative_url }}" alt="To‑Do App preview" />
        <h2 class="font-medium">To‑Do and Task Management App</h2>
      </a>
      <p class="text-sm text-muted-foreground">PHP + MySQL MVC app with auth, prioritized tasks, lists, deadlines, and analytics (charts + pie).</p>
      <div class="mt-3 flex gap-3 text-xs">
        <a class="rounded-md border border-border px-2 py-1 hover:bg-secondary {% if nil %}pointer-events-none opacity-50{% endif %}" href="#">Demo</a>
        <a class="rounded-md border border-border px-2 py-1 hover:bg-secondary" href="https://github.com/max31337/ToDo-App" target="_blank" rel="noopener">Source</a>
      </div>
    </article>
  </div>
</section>
