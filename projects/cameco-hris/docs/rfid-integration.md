---
layout: default
title: RFID Ingestion Event Bus - CAMECO HRIS
description: Asynchronous IoT card tap ingestion, edge caching protocols, and real-time dashboard state synchronization.
---

<section class="space-y-10">

  <header class="space-y-4">
    <div>
      <h1 class="text-3xl font-semibold tracking-tight">
        RFID Ingestion Event Bus
      </h1>
      <p class="text-muted-foreground max-w-2xl">
        Architecting a high-throughput, offline-resilient IoT data ingestion pipeline using MQTT and Server-Sent Events (SSE).
      </p>
    </div>
  </header>

  <!-- SECTION 1 -->
  <section class="rounded-xl border bg-card p-8 space-y-6">

    <h2 class="text-lg font-semibold text-foreground">
      1. The Problem: Concurrency Bursts during Shift Changes
    </h2>

    <p class="text-sm text-muted-foreground">
      At a typical factory or enterprise site, shifts begin and end in short, synchronized windows.
      Thousands of employees tap RFID cards within a 15-minute window.
    </p>

    <p class="text-sm text-muted-foreground">
      A synchronous HTTP pipeline would collapse under load due to thread pool exhaustion and DB latency spikes,
      freezing physical turnstiles and creating operational bottlenecks.
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
      2. Decoupled MQTT Messaging Architecture
    </h2>

    <p class="text-sm text-muted-foreground">
      To eliminate synchronous bottlenecks, the system uses MQTT as a lightweight event bus between edge devices and backend consumers.
    </p>

    <!-- ARCHITECTURE DIAGRAM -->
    <div class="not-prose my-8">
      <div class="rounded-xl border bg-background p-6">

        <div class="flex flex-col items-center gap-4">

          <div class="w-72 rounded-lg border bg-muted p-4 text-center">
            <div class="font-semibold">RFID Reader</div>
            <div class="text-xs text-muted-foreground">Edge Device</div>
          </div>

          <div class="text-muted-foreground">↓ publish rfid/taps</div>

          <div class="w-72 rounded-lg border bg-muted p-4 text-center">
            <div class="font-semibold">MQTT Broker</div>
            <div class="text-xs text-muted-foreground">Message Queue</div>
          </div>

          <div class="text-muted-foreground">↓ async consume</div>

          <div class="w-72 rounded-lg border bg-muted p-4 text-center">
            <div class="font-semibold">ASP.NET Workers</div>
            <div class="text-xs text-muted-foreground">Background Consumers</div>
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
          Local SQLite cache of valid RFID credentials for offline validation.
        </p>
      </div>

      <div class="rounded-lg border bg-muted p-4">
        <h4 class="font-semibold text-foreground mb-2">
          Local Event Storage
        </h4>
        <p>
          Buffered event log stored locally with timestamp preservation during outages.
        </p>
      </div>

      <div class="rounded-lg border bg-muted p-4">
        <h4 class="font-semibold text-foreground mb-2">
          Reconnection Replay
        </h4>
        <p>
          Ordered batch replay to MQTT broker after network restoration.
        </p>
      </div>

    </div>

  </section>

  <!-- SECTION 4 -->
  <section class="rounded-xl border bg-card p-8 space-y-6">

    <h2 class="text-lg font-semibold text-foreground">
      4. Real-Time UI Synchronization via SSE
    </h2>

    <p class="text-sm text-muted-foreground">
      Instead of polling, Server-Sent Events push updates directly to dashboards when new ledger entries are committed.
    </p>

    <ul class="list-disc pl-5 text-sm text-muted-foreground space-y-2">
      <li>Workers publish internal events after DB write</li>
      <li>SSE stream pushes updates to browser clients</li>
      <li>UI updates occur in near real-time (sub-second latency)</li>
    </ul>

  </section>

  <!-- FOOTER -->
  <div class="mt-8 pt-6 border-t border-border flex justify-between text-xs text-muted-foreground">
    <span>Last Updated: November 2025</span>
    <a href="../" class="text-blue-500 hover:underline">
      ← Back to Specifications
    </a>
  </div>

</section>