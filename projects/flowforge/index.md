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
<!-- Modal for image pop-up -->
<div id="img-modal" style="display:none;position:fixed;z-index:50;inset:0;background:rgba(0,0,0,0.85);align-items:center;justify-content:center;">
  <button id="img-modal-close" aria-label="Close image" style="position:absolute;top:0;right:0;padding:2rem 2rem 1rem 1rem;background:none;border:none;color:#fff;font-size:2rem;cursor:pointer;">&times;</button>
  <img id="img-modal-img" src="" alt="Project screenshot" style="max-width:90vw;max-height:90vh;border-radius:0.5rem;box-shadow:0 4px 32px #0008;" />
</div>
<script>
  // Modal logic for all .project-img-btn
  document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('img-modal');
    const modalImg = document.getElementById('img-modal-img');
    const closeBtn = document.getElementById('img-modal-close');
    document.querySelectorAll('.project-img-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        modalImg.src = btn.getAttribute('data-img');
        modal.style.display = 'flex';
        modal.focus();
      });
    });
    function closeModal() {
      modal.style.display = 'none';
      modalImg.src = '';
    }
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function(e) {
      if (modal.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) closeModal();
    });
  });
</script>
    </div>
  </div>
</section>
