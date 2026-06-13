---
layout: default
title: CAMECO HRIS
description: Capstone Project (Lead Programmer) — Systems architecture, event-sourcing design, and enterprise HRIS engineering.
hero:
  image: /assets/projects/cameco-hris/landing-page.png
links:
  docs: /projects/cameco-hris/docs/
status: Complete
---

<section class="space-y-10">

  <header class="space-y-4">
    <div>
      <h1 class="text-3xl font-semibold tracking-tight">{{ page.title }}</h1>
      <p class="text-muted-foreground max-w-2xl">{{ page.description }}</p>

      <div class="mt-2 text-[11px] inline-flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-2 py-1">
        <span class="size-2 rounded-full bg-blue-500"></span>
        <span>Architecture & Systems Design Spec</span>
      </div>
    </div>
  </header>

  {% if page.hero.image %}
  <figure class="rounded-lg border border-border overflow-hidden">
    <button type="button" class="project-img-btn" data-img="{{ page.hero.image | relative_url }}" aria-label="View image">
      <img class="w-full" src="{{ page.hero.image | relative_url }}" alt="{{ page.title }}" />
    </button>
    <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">
      CAMECO HRIS system architecture overview
    </figcaption>
  </figure>
  {% endif %}

  <div class="grid gap-6 md:grid-cols-2">

    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-2">Project Context & My Role</h2>
      <p class="text-sm text-muted-foreground">
        CAMECO HRIS was developed as an academic Capstone Project where I served as Lead Programmer.
        The system was designed by building the core application architecture, database schema design,
        event-sourcing model, and payroll computation logic on top of Laravel.
      </p>
    </article>

    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-2">Key Architectural Decisions</h2>
      <ul class="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
        <li><strong>On-Premise Deployment:</strong> Optimized for intranet RFID latency and offline resilience.</li>
        <li><strong>Event-Sourced Ledger:</strong> PostgreSQL append-only model for auditability of timekeeping data.</li>
        <li><strong>Laravel Queue System:</strong> Redis-backed asynchronous processing for RFID ingestion bursts.</li>
        <li><strong>Snapshot Payroll Engine:</strong> Deterministic payroll computation using isolated dataset snapshots.</li>
      </ul>
    </article>

  </div>

  <div class="space-y-6">
    <h2 class="font-semibold text-xl tracking-tight">Core Engineering Challenges</h2>

    <div class="grid gap-6 md:grid-cols-3">

      <div class="space-y-2">
        <h3 class="font-medium text-base">1. Cryptographic Log Integrity</h3>
        <p class="text-sm text-muted-foreground">
          To prevent undetected modification of attendance data, an append-only event ledger was implemented.
          Each record is chained using SHA-256 hashing. Any retrospective modification breaks chain continuity
          and is immediately detectable during verification.
        </p>
      </div>

      <div class="space-y-2">
        <h3 class="font-medium text-base">2. Burst Timekeeping Ingestion</h3>
        <p class="text-sm text-muted-foreground">
          During shift transitions, thousands of RFID events are generated within short time windows.
          To handle this load, events are buffered and processed asynchronously using Laravel’s Redis queue system,
          preventing request bottlenecks at the API layer.
        </p>
      </div>

      <div class="space-y-2">
        <h3 class="font-medium text-base">3. Philippine Payroll Rules Engine</h3>
        <p class="text-sm text-muted-foreground">
          Payroll computation handles layered statutory rules including SSS, PhilHealth, Pag-IBIG,
          overtime multipliers, and tax brackets. A modular rules engine ensures deterministic and reproducible
          payroll outputs across executions.
        </p>
      </div>

    </div>
  </div>

  <div class="mt-8 p-6 rounded-lg border border-border bg-secondary/30">
    <h2 class="font-medium text-lg mb-2">Explore the Technical Specifications</h2>
    <p class="text-sm text-muted-foreground mb-4">
      Dive deeper into system design documents, event-sourcing implementation, and payroll computation logic.
    </p>
    <a class="inline-block rounded-md border border-border px-4 py-2 hover:bg-secondary"
       href="{{ page.links.docs | relative_url }}">
      View Technical Specifications →
    </a>
  </div>

</section>