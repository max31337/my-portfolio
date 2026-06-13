---
layout: default
title: RFID Ingestion Event Bus - CAMECO HRIS
description: Asynchronous RFID ingestion pipeline using Laravel Queues, edge buffering, and real-time SSE dashboard synchronization.
---

<section class="space-y-10">

  <header class="space-y-4">
    <div>
      <h1 class="text-3xl font-semibold tracking-tight">
        RFID Ingestion Event Bus
      </h1>
      <p class="text-muted-foreground max-w-2xl">
        Architecting a high-throughput, offline-resilient IoT ingestion pipeline using Laravel Queues and Server-Sent Events (SSE).
      </p>
    </div>
  </header>

  <!-- SECTION 1 -->
  <section class="rounded-xl border bg-card p-8 space-y-6">

    <h2 class="text-lg font-semibold text-foreground">
      1. The Problem: Concurrency Bursts during Shift Changes
    </h2>

    <p class="text-sm text-muted-foreground">
      At enterprise-scale deployments, shift transitions generate high-frequency RFID events within short time windows.
      Thousands of employees may tap simultaneously within minutes.
    </p>

    <p class="text-sm text-muted-foreground">
      A synchronous HTTP-only pipeline would lead to request queue buildup, database contention, and delayed gate response times,
      making the system unusable under peak load.
    </p>

    <div class="not-prose rounded-lg border bg-muted p-4 overflow-x-auto">
<pre class="text-xs font-mono text-foreground">UPDATE attendance
SET clock_in = '08:00:00'
WHERE id = 4529;</pre>
    </div>

  </section>

  <!-- SECTION 2 -->
  <section class="rounded-xl border bg-card p-8 space-y-6">

    <h2 class="text-lg font-semibold text-foreground">
      2. Decoupled Event Processing Using Laravel Queue System
    </h2>

    <p class="text-sm text-muted-foreground">
      To eliminate synchronous bottlenecks, RFID events are pushed into Laravel’s queue system (Redis-backed),
      allowing asynchronous processing by dedicated workers.
    </p>

    <!-- ARCHITECTURE DIAGRAM -->
    <div class="not-prose my-8">
      <div class="rounded-xl border bg-background p-6">

        <div class="flex flex-col items-center gap-4">

          <div class="w-72 rounded-lg border bg-muted p-4 text-center">
            <div class="font-semibold">RFID Reader</div>
            <div class="text-xs text-muted-foreground">Edge Device</div>
          </div>

          <div class="text-muted-foreground">↓ HTTP request</div>

          <div class="w-72 rounded-lg border bg-muted p-4 text-center">
            <div class="font-semibold">Laravel API</div>
            <div class="text-xs text-muted-foreground">Ingestion Endpoint</div>
          </div>

          <div class="text-muted-foreground">↓ dispatch job</div>

          <div class="w-72 rounded-lg border bg-muted p-4 text-center">
            <div class="font-semibold">Laravel Queue (Redis)</div>
            <div class="text-xs text-muted-foreground">Asynchronous Job Bus</div>
          </div>

          <div class="text-muted-foreground">↓ processed by</div>

          <div class="w-72 rounded-lg border bg-muted p-4 text-center">
            <div class="font-semibold">Laravel Queue Workers</div>
            <div class="text-xs text-muted-foreground">Horizon / Supervisor</div>
          </div>

          <div class="text-muted-foreground">↓ persist</div>

          <div class="w-72 rounded-lg border bg-muted p-4 text-center">
            <div class="font-semibold">PostgreSQL Ledger</div>
            <div class="text-xs text-muted-foreground">Immutable Event Store</div>
          </div>

        </div>

      </div>
    </div>

    <h3 class="text-base font-semibold text-foreground">
      JSON Ingestion Payload
    </h3>

    <div class="not-prose rounded-lg border bg-muted p-4 overflow-x-auto">
<pre class="text-xs font-mono text-foreground">{
  "event_uuid": "b6f483c2-d38a-4934-8c81-43285b001a1e",
  "card_uid": "04A2F8D13C6E99",
  "device_id": "TURNSTILE_03_SOUTH",
  "timestamp": "2025-11-29T07:58:12.458Z"
}</pre>
    </div>

    <p class="text-sm text-muted-foreground mt-4">
      Each event is processed idempotently using <code>event_uuid</code> uniqueness constraints to prevent duplicate ingestion during retries or network replay scenarios.
    </p>

  </section>

  <!-- SECTION 3 -->
  <section class="rounded-xl border bg-card p-8 space-y-6">

    <h2 class="text-lg font-semibold text-foreground">
      3. Edge Buffering Protocol (Offline Mode)
    </h2>

    <div class="space-y-4 text-sm text-muted-foreground">

      <div class="rounded-lg border bg-muted p-4">
        <h4 class="font-semibold text-foreground mb-2">
          Authorization Cache
        </h4>
        <p>
          Local SQLite cache of RFID credentials used for offline validation at the edge device.
        </p>
      </div>

      <div class="rounded-lg border bg-muted p-4">
        <h4 class="font-semibold text-foreground mb-2">
          Local Event Storage
        </h4>
        <p>
          Temporarily stores RFID events locally during network outages with preserved timestamps.
        </p>
      </div>

      <div class="rounded-lg border bg-muted p-4">
        <h4 class="font-semibold text-foreground mb-2">
          Replay Mechanism
        </h4>
        <p>
          Buffered events are replayed in order once connectivity is restored, using idempotent ingestion to prevent duplicates.
        </p>
      </div>

    </div>

  </section>

  <!-- SECTION 4 -->
  <section class="rounded-xl border bg-card p-8 space-y-6">

    <h2 class="text-lg font-semibold text-foreground">
      4. Real-Time UI Synchronization via Server-Sent Events (SSE)
    </h2>

    <p class="text-sm text-muted-foreground">
      Instead of polling, Laravel broadcasts events to connected clients using Server-Sent Events (SSE) after successful processing.
    </p>

    <ul class="list-disc pl-5 text-sm text-muted-foreground space-y-2">
      <li>Queue worker processes RFID event</li>
      <li>Database transaction commits successfully</li>
      <li>Event is broadcast to SSE stream</li>
      <li>Dashboard updates in near real-time (sub-second latency)</li>
    </ul>

    <p class="text-sm text-muted-foreground mt-4">
      SSE updates are emitted only after database commit to maintain consistency between persisted state and UI state.
    </p>

  </section>

  <!-- FOOTER -->
  <div class="mt-8 pt-6 border-t border-border flex justify-between text-xs text-muted-foreground">
    <span>Last Updated: November 2025</span>
    <a href="../" class="text-blue-500 hover:underline">
      ← Back to Specifications
    </a>
  </div>

</section>