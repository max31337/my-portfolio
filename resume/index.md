---
layout: default
title: Resume
---
<section class="space-y-6">
  <header class="flex items-start justify-between gap-4 print:block">
    <div>
      <h1 class="text-3xl font-semibold tracking-tight">{{ site.author.name }}</h1>
      <p class="text-sm text-muted-foreground">Full‑stack developer focused on C#/.NET (ASP.NET Core). Also Python FastAPI and PHP/Laravel.</p>
      <div class="mt-2 text-xs text-muted-foreground">
        <span class="mr-3">GitHub: <a class="underline hover:no-underline" href="https://github.com/{{ site.author.socials.github }}" target="_blank" rel="noopener">@{{ site.author.socials.github }}</a></span>
        {% if site.author.socials.linkedin %}<span>LinkedIn: <a class="underline hover:no-underline" href="https://www.linkedin.com/in/{{ site.author.socials.linkedin }}/" target="_blank" rel="noopener">/{{ site.author.socials.linkedin }}</a></span>{% endif %}
      </div>
    </div>
    <div class="hidden print:block text-right text-xs text-muted-foreground">
      <div>{{ site.author.email }}</div>
      <div>{{ site.url }}{{ site.baseurl }}/resume/</div>
    </div>
  </header>

  <div class="flex flex-wrap gap-2">
    <a id="request-btn" class="rounded-md border border-border px-3 py-1 text-xs hover:bg-secondary" href="#request">Request resume via email</a>
    <button onclick="window.print()" class="rounded-md border border-border px-3 py-1 text-xs hover:bg-secondary">Download/Print PDF</button>
  </div>

  <section>
    <h2 class="text-lg font-medium mb-2">Summary</h2>
    <p class="text-sm text-muted-foreground">I build pragmatic web applications with a strong focus on backend correctness and clean UI. Primary stack is C#/.NET (ASP.NET Core + MSSQL), with production‑ready REST APIs, authentication/authorization, and thoughtful data modeling. Comfortable with modern frontends (Tailwind, shadcn/ui) and Python FastAPI; some PHP/Laravel for TALL stack projects.</p>
  </section>

  <section>
    <h2 class="text-lg font-medium mb-2">Skills</h2>
    <ul class="text-sm text-muted-foreground grid sm:grid-cols-2 gap-y-1 list-disc pl-5">
      <li>C#, ASP.NET Core MVC, Entity Framework, MSSQL</li>
      <li>REST APIs, WebSockets, JWT auth</li>
      <li>Frontend: Tailwind CSS, shadcn/ui, Next.js</li>
      <li>Python: FastAPI, Uvicorn</li>
      <li>PHP/Laravel; TALL stack (Tailwind, Alpine, Laravel, Livewire)</li>
      <li>Databases: SQL Server, PostgreSQL, MySQL</li>
      <li>DevOps: Docker (containerization), Railway (trial deployments), GitHub Actions</li>
      <li>Tooling: Jekyll, GitHub Pages</li>
    </ul>
  </section>

  <section>
    <h2 class="text-lg font-medium mb-3">Selected Projects</h2>
    <div class="space-y-3">
    <article class="rounded-lg border border-border p-3">
        <div class="flex items-center gap-2">
          <h3 class="font-medium">SalesOptimizer (WIP)</h3>
          <span class="text-[10px] inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 bg-secondary/60"><span class="size-1.5 rounded-full bg-yellow-500"></span> WIP</span>
        </div>
        <p class="text-xs text-muted-foreground">CRM with task management and predictive analytics — FastAPI (DDD, JWT) with REST APIs and WebSockets for SLA; Next.js + TypeScript + shadcn/ui frontend.</p>
        <ul class="mt-2 text-xs list-disc pl-5 text-muted-foreground">
      <li>Implements auth, self‑serve onboarding/free trial, and SLA tracking with real‑time metrics and alerts via WebSockets.</li>
      <li>Containerized with Docker; trial deployments validated on Railway using Docker images.</li>
        </ul>
      </article>
      <article class="rounded-lg border border-border p-3">
        <h3 class="font-medium">Patient Management System</h3>
        <p class="text-xs text-muted-foreground">ASP.NET Core MVC + MSSQL with secure auth and REST API for supersystem integrations.</p>
        <ul class="mt-2 text-xs list-disc pl-5 text-muted-foreground">
          <li>Designed database schema and REST endpoints; built clean MVC views with Tailwind for day‑to‑day operations.</li>
        </ul>
      </article>
    <article class="rounded-lg border border-border p-3">
        <h3 class="font-medium">Bank Queueing System</h3>
        <p class="text-xs text-muted-foreground">FastAPI + Uvicorn queueing with Tailwind UI, hardware buttons, and printed receipts.</p>
        <ul class="mt-2 text-xs list-disc pl-5 text-muted-foreground">
      <li>Real‑time queue updates and operator dashboards; pragmatic hardware integrations.</li>
      <li>Containerized and trial‑deployed on Railway using Docker images.</li>
        </ul>
      </article>
      <article class="rounded-lg border border-border p-3">
        <h3 class="font-medium">To‑Do and Task Management App</h3>
        <p class="text-xs text-muted-foreground">PHP + MySQL MVC app with auth, prioritized tasks, lists, deadlines, and analytics.</p>
        <ul class="mt-2 text-xs list-disc pl-5 text-muted-foreground">
          <li>Implemented CRUD, auth, and reporting with clear UI and sensible defaults.</li>
        </ul>
      </article>
      <article class="rounded-lg border border-border p-3">
        <div class="flex items-center gap-2">
          <h3 class="font-medium">FlowForge (WIP)</h3>
          <span class="text-[10px] inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 bg-secondary/60"><span class="size-1.5 rounded-full bg-yellow-500"></span> WIP</span>
        </div>
        <p class="text-xs text-muted-foreground">Multi‑tenant SaaS dashboard using the TALL stack (Tailwind, Alpine.js, Laravel, Livewire) with PostgreSQL.</p>
      </article>
    </div>
  </section>

  <section>
    <h2 class="text-lg font-medium mb-2">Contact</h2>
    <p class="text-sm text-muted-foreground">Email: <a class="underline hover:no-underline" href="mailto:{{ site.author.email }}">{{ site.author.email }}</a></p>
  </section>

  <section id="request" class="rounded-lg border border-border p-4">
    <h2 class="text-lg font-medium mb-1">Request my resume by email</h2>
    <p class="text-sm text-muted-foreground mb-3">This sends a pre‑filled email to me. Feel free to add context about your role/company.</p>
    {% capture subject %}Resume request — {{ site.title }}{% endcapture %}
    {% capture body %}Hi {{ site.author.name }},%0D%0A%0D%0AI'd like to request your latest resume.%0D%0A%0D%0AName:%0D%0ACompany:%0D%0ARole/Position:%0D%0AHow did you find my portfolio?:%0D%0A%0D%0AThanks!{% endcapture %}
    <div class="flex flex-wrap gap-2 text-xs">
      <a class="rounded-md border border-border px-3 py-1 hover:bg-secondary" target="_blank" rel="noopener"
         href="https://mail.google.com/mail/?view=cm&fs=1&to={{ site.author.email | uri_escape }}&su={{ subject | uri_escape }}&body={{ body }}">
        Request via Gmail
      </a>
      <a class="rounded-md border border-border px-3 py-1 hover:bg-secondary"
         href="mailto:{{ site.author.email | uri_escape }}?subject={{ subject | uri_escape }}&body={{ body }}">
        Request via Email client
      </a>
    </div>
  </section>
</section>

<style>
  @media print {
    header, nav, footer { display: none !important; }
    body { background: #fff !important; }
    .border { border-color: #e5e7eb !important; }
    .text-muted-foreground { color: #111827 !important; }
    a { color: #111827 !important; text-decoration: none !important; }
    .rounded-lg { border-radius: 0; }
    .prose { max-width: 100%; }
  }
</style>

<script>
  // If arriving from the home CTA, scroll to request box
  if (location.hash === '#request') {
    setTimeout(() => document.getElementById('request')?.scrollIntoView({ behavior: 'smooth' }), 0);
  }
</script>
