---
layout: default
title: CAMECO HRIS Technical Specifications
description: Architectural specifications, cryptographic ledger design, and engineering decisions.
---

<section class="space-y-10">

  <!-- HEADER -->
  <header class="space-y-4">

    <!-- BACK BUTTON -->
    <div>
      <a
        href="http://localhost:4000/my-portfolio/projects/cameco-hris/"
        class="inline-flex items-center gap-2 rounded-md border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition"
      >
        ← Back to Project
      </a>
    </div>

    <div>
      <h1 class="text-3xl font-semibold tracking-tight">
        Technical Specifications
      </h1>
      <p class="text-muted-foreground max-w-2xl">
        Architectural breakdowns and engineering decisions behind the design of CAMECO HRIS, our Capstone Project.
      </p>
    </div>

  </header>

  <div class="grid gap-6 md:grid-cols-2">

    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-3">Specification Structure</h2>
      <p class="text-sm text-muted-foreground mb-4">
        These system specifications describe how CAMECO HRIS handles security constraints, high-throughput IoT/RFID card taps, and Philippine labor law compliance through robust database and application patterns.
      </p>
    </article>

    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-3">My Contributions as Lead Programmer</h2>
      <p class="text-sm text-muted-foreground">
        I was responsible for translating complex organizational requirements into concrete technical solutions: event ledger design, MQTT ingestion pipeline, and payroll state machine implementation.
      </p>
    </article>

  </div>

  <div class="space-y-4">

    <h2 class="font-medium text-lg">System Design Specifications</h2>

    <div class="grid gap-4">

      <a href="./architecture-overview/" class="rounded-lg border border-border p-4 hover:bg-accent block">
        <h3 class="font-medium text-sm">1. System Architecture Overview</h3>
        <p class="text-xs text-muted-foreground mt-1">
          Deployment architecture, RBAC design, and service decomposition strategy.
        </p>
      </a>

      <a href="./event-ledger/" class="rounded-lg border border-border p-4 hover:bg-accent block">
        <h3 class="font-medium text-sm">2. Cryptographic Event Ledger</h3>
        <p class="text-xs text-muted-foreground mt-1">
          Immutable hash-chained event sourcing system with PostgreSQL persistence.
        </p>
      </a>

      <a href="./rfid-integration/" class="rounded-lg border border-border p-4 hover:bg-accent block">
        <h3 class="font-medium text-sm">3. RFID Ingestion Event Bus</h3>
        <p class="text-xs text-muted-foreground mt-1">
          MQTT-based ingestion pipeline with edge caching and SSE updates.
        </p>
      </a>

      <a href="./payroll-engine/" class="rounded-lg border border-border p-4 hover:bg-accent block">
        <h3 class="font-medium text-sm">4. Payroll & Compliance Engine</h3>
        <p class="text-xs text-muted-foreground mt-1">
          Snapshot isolation and deterministic payroll computation engine.
        </p>
      </a>

    </div>

  </div>

</section>