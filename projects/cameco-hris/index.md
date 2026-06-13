---
layout: default
title: CAMECO HRIS
description: Capstone Project (Lead Programmer) — Technical architecture, cryptographic event-sourcing, and enterprise systems integration.
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
    <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">CAMECO HRIS system architecture overview</figcaption>
  </figure>
  {% endif %}

  <div class="grid gap-6 md:grid-cols-2">
    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-2">Project Context & My Role</h2>
      <p class="text-sm text-muted-foreground">
        CAMECO HRIS was built as our **academic Capstone Project**, where I served as the **Lead Programmer**. Rather than adopting generic out-of-the-box HR frameworks, I designed and implemented the entire systems architecture from scratch. This includes the database schema, cryptographic verification ledger, event-driven ingestion broker, and the core payroll calculations engine.
      </p>
    </article>
    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-2">Key Architectural Decisions</h2>
      <ul class="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
        <li><strong>On-Premise Deployment:</strong> Optimized for intranet physical gate speed and offline resilience.</li>
        <li><strong>Event-Sourcing Ledger:</strong> Immutable PostgreSQL event store for tamper-proof timekeeping logs.</li>
        <li><strong>MQTT Ingestion:</strong> Asynchronous queueing to prevent thread starvation during peak card-tap bursts.</li>
        <li><strong>State-Machine Payroll:</strong> Snapshot isolation of employee data to ensure calculation reproducibility.</li>
      </ul>
    </article>
  </div>

  <div class="space-y-6">
    <h2 class="font-semibold text-xl tracking-tight">Core Engineering Challenges</h2>
    
    <div class="grid gap-6 md:grid-cols-3">
      <div class="space-y-2">
        <h3 class="font-medium text-base">1. Cryptographic Log Integrity</h3>
        <p class="text-sm text-muted-foreground">
          To prevent DBA or SQL injection manipulation of attendance records (which directly dictate payroll costs), I implemented an append-only event ledger. Taps are cryptographically chained using SHA-256 hashes, ensuring that any unauthorized retrospective updates break the ledger chain.
        </p>
      </div>
      
      <div class="space-y-2">
        <h3 class="font-medium text-base">2. Burst Timekeeping Ingestion</h3>
        <p class="text-sm text-muted-foreground">
          During shift transitions, thousands of workers tap in within narrow 15-minute windows. To handle this high throughput without dropped packets, RFID edge readers queue taps locally and stream them via MQTT to an asynchronous event bus that materializes events into the database.
        </p>
      </div>
      
      <div class="space-y-2">
        <h3 class="font-medium text-base">3. Philippine Payroll Rules Engine</h3>
        <p class="text-sm text-muted-foreground">
          Philippine labor regulations involve complex tax brackets (BIR 2316), changing statutory contribution limits (SSS, PhilHealth, Pag-IBIG), and multi-tiered overtime rates. I designed a modular rules engine that processes scheduling patterns and timesheets with reproducible accuracy.
        </p>
      </div>
    </div>
  </div>

  <div class="mt-8 p-6 rounded-lg border border-border bg-secondary/30">
    <h2 class="font-medium text-lg mb-2">Explore the Technical Specifications</h2>
    <p class="text-sm text-muted-foreground mb-4">
      Dive deep into the system design documents, message broker schemas, cryptographic verification flowcharts, and the inner workings of our compliance engines.
    </p>
    <a class="inline-block rounded-md border border-border px-4 py-2 hover:bg-secondary" href="{{ page.links.docs | relative_url }}">View Technical Specifications →</a>
  </div>
</section>