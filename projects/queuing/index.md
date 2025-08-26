---
layout: default
title: Bank Queueing System
description: A FastAPI + Uvicorn queueing system with Tailwind UI, hardware buttons, and printed receipts for counters.
hero:
  image: /assets/projects/queuing/queue-list.png
links:
  repo: https://github.com/max31337/queuing
  live:
---

<section class="space-y-10">
  <header class="space-y-4">
    <div>
      <h1 class="text-3xl font-semibold tracking-tight">{{ page.title }}</h1>
      <p class="text-muted-foreground max-w-2xl">{{ page.description }}</p>
    </div>
    <div class="flex flex-wrap items-center gap-2 text-[11px]">
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">FastAPI</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Uvicorn</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">SQLAlchemy</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Alembic</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Tailwind</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Hardware I/O</span>
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
      <img class="w-full" src="{{ page.hero.image | relative_url }}" alt="Queue list" />
    </button>
    <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Queue list UI</figcaption>
  </figure>
  {% endif %}

  <div class="grid gap-6 md:grid-cols-2">
    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-2">Features</h2>
      <ul class="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
        <li>Ticketing with printed receipts and manual input for counters</li>
        <li>Counter display and queue list screens</li>
        <li>Archiving, analytics, and schedule-based tasks</li>
        <li>REST APIs for integration</li>
      </ul>
    </article>
    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-2">Tech</h2>
      <ul class="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
        <li>FastAPI + Uvicorn</li>
        <li>SQLAlchemy + Alembic</li>
        <li>PostgreSQL (`psycopg2-binary`)</li>
        <li>Pydantic v2</li>
        <li>Hardware: pyserial, pywin32, serial, schedule</li>
        <li>Frontend: HTML + Tailwind</li>
  <li>Deployment: Docker containers; trial deployments on Railway using Docker images</li>
      </ul>
    </article>
  </div>

  <div class="space-y-3">
    <h2 class="font-medium">Screens</h2>
    <div class="grid gap-4 md:grid-cols-2">
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/queuing/queue-list.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/queuing/queue-list.png' | relative_url }}" alt="Queue list" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Queue list</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/queuing/counter.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/queuing/counter.png' | relative_url }}" alt="Counter display" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Counter display</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/queuing/manual-input-for-counter.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/queuing/manual-input-for-counter.png' | relative_url }}" alt="Manual input for counter" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Manual input for counter</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/queuing/archive-list.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/queuing/archive-list.png' | relative_url }}" alt="Archive list" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Archive list</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden md:col-span-2">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/queuing/analytics.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/queuing/analytics.png' | relative_url }}" alt="Analytics" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Analytics</figcaption>
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
