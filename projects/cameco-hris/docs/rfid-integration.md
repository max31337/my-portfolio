---
layout: default
title: RFID Ingestion Event Bus - CAMECO HRIS
description: Asynchronous RFID ingestion pipeline using Laravel Queues, edge buffering, and real-time SSE dashboard synchronization.
---

<style>
  .rfid-page { font-family: inherit; }

  .rfid-section-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-tertiary, #888);
    margin-bottom: 10px;
  }
  .rfid-section-label span.dot {
    display: inline-block;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: currentColor;
  }

  .rfid-h2 {
    font-size: 1.15rem;
    font-weight: 500;
    color: var(--color-text-primary, #1a1a1a);
    margin: 0 0 6px;
    letter-spacing: -0.01em;
  }
  .rfid-h3 {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-text-primary, #1a1a1a);
    margin: 24px 0 8px;
  }
  .rfid-p {
    font-size: 0.85rem;
    color: var(--color-text-secondary, #444);
    line-height: 1.75;
    margin: 0 0 14px;
  }
  .rfid-ul {
    font-size: 0.85rem;
    color: var(--color-text-secondary, #444);
    line-height: 1.75;
    padding-left: 20px;
    margin: 0 0 14px;
  }
  .rfid-ul li { margin-bottom: 5px; }

  .rfid-divider {
    border: none;
    border-top: 1px solid var(--color-border-tertiary, rgba(0,0,0,0.08));
    margin: 40px 0;
  }

  /* Dark code block */
  .rfid-code {
    display: block;
    background: #1e1e2e;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
    padding: 18px 20px;
    font-size: 0.78rem;
    font-family: ui-monospace, 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
    color: #cdd6f4;
    line-height: 1.75;
    overflow-x: auto;
    margin: 12px 0 20px;
    white-space: pre;
  }
  .rfid-code .kw  { color: #cba6f7; }
  .rfid-code .st  { color: #a6e3a1; }
  .rfid-code .nu  { color: #fab387; }
  .rfid-code .key { color: #89b4fa; }
  .rfid-code .val { color: #a6e3a1; }
  .rfid-code .cm  { color: #6c7086; }

  /* Diagram card */
  .rfid-diagram-card {
    border: 1px solid var(--color-border-tertiary, rgba(0,0,0,0.1));
    border-radius: 12px;
    overflow: hidden;
    margin: 24px 0;
    background: var(--color-background-primary, #fff);
    padding: 8px 0 12px;
  }
  .rfid-diagram-card svg { display: block; width: 100%; }

  /* Callout */
  .rfid-callout {
    border: 1px solid rgba(226,75,74,0.25);
    border-left: 3px solid #E24B4A;
    border-radius: 8px;
    padding: 14px 16px;
    background: rgba(226,75,74,0.04);
    font-size: 0.83rem;
    color: var(--color-text-secondary, #444);
    line-height: 1.7;
    margin: 12px 0 20px;
  }
  .rfid-callout strong { color: #A32D2D; }
  @media (prefers-color-scheme: dark) {
    .rfid-callout { background: rgba(226,75,74,0.08); border-left-color: #E24B4A; }
    .rfid-callout strong { color: #F09595; }
  }

  /* Edge buffer cards */
  .rfid-buffer-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin: 16px 0 24px;
  }
  .rfid-buffer-card {
    border: 1px solid var(--color-border-tertiary, rgba(0,0,0,0.1));
    border-radius: 10px;
    padding: 16px;
    background: var(--color-background-secondary, rgba(0,0,0,0.02));
  }
  .rfid-buffer-card .bcard-label {
    font-size: 0.72rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #185FA5;
    margin-bottom: 6px;
  }
  .rfid-buffer-card .bcard-title {
    font-size: 0.84rem;
    font-weight: 500;
    color: var(--color-text-primary, #1a1a1a);
    margin-bottom: 6px;
  }
  .rfid-buffer-card .bcard-desc {
    font-size: 0.8rem;
    color: var(--color-text-secondary, #555);
    line-height: 1.65;
  }

  /* Footer */
  .rfid-footer {
    margin-top: 48px;
    padding-top: 20px;
    border-top: 1px solid var(--color-border-tertiary, rgba(0,0,0,0.08));
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    color: var(--color-text-tertiary, #888);
  }
  .rfid-footer a { color: #185FA5; text-decoration: none; }
  .rfid-footer a:hover { text-decoration: underline; }

  @media (max-width: 640px) {
    .rfid-buffer-grid { grid-template-columns: 1fr; }
  }
</style>

<section class="rfid-page">

  <!-- Header -->
  <header style="margin-bottom: 36px;">
    <div class="rfid-section-label"><span class="dot"></span> CAMECO HRIS · Capstone</div>
    <h1 style="font-size: 1.6rem; font-weight: 600; letter-spacing: -0.02em; margin: 0 0 10px; color: var(--color-text-primary, #1a1a1a);">
      RFID ingestion event bus
    </h1>
    <p class="rfid-p" style="max-width: 560px; margin: 0;">
      Architecting a high-throughput, offline-resilient IoT ingestion pipeline using Laravel Queues and Server-Sent Events (SSE).
    </p>
  </header>

  <!-- ─── Section 1: Problem ─── -->
  <div class="rfid-section-label"><span class="dot"></span> 01 · Problem</div>
  <h2 class="rfid-h2">Concurrency bursts during shift changes</h2>
  <p class="rfid-p">
    At enterprise-scale deployments, shift transitions generate high-frequency RFID events within short time windows.
    Thousands of employees may tap simultaneously within minutes.
  </p>

  <div class="rfid-callout">
    <strong>Bottleneck:</strong> A synchronous HTTP-only pipeline leads to request queue buildup, database contention,
    and delayed gate response times — making the system unusable under peak load.
  </div>

  <!-- Burst load diagram -->
  <div class="rfid-diagram-card">
    <svg viewBox="0 0 680 190" xmlns="http://www.w3.org/2000/svg" role="img">
      <title>Shift-change concurrency burst</title>
      <desc>Many simultaneous RFID taps funneling into a single synchronous API endpoint causes contention</desc>
      <defs>
        <marker id="ba" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
        <style>
          .bt { font-family: ui-sans-serif,sans-serif; font-size: 12px; font-weight: 500; }
          .bts{ font-family: ui-sans-serif,sans-serif; font-size: 10px; }
          @media (prefers-color-scheme: dark) {
            .b-rfid-bg { fill: #4A1B0C; stroke: #D85A30; }
            .b-rfid-t  { fill: #F5C4B3; }
            .b-api-bg  { fill: #501313; stroke: #E24B4A; }
            .b-api-t   { fill: #F7C1C1; }
            .b-api-ts  { fill: #F09595; }
          }
        </style>
      </defs>

      <!-- Readers column -->
      <rect class="b-rfid-bg" x="30" y="20" width="110" height="36" rx="7" fill="#FAECE7" stroke="#D85A30" stroke-width="0.7"/>
      <text class="bt b-rfid-t" x="85" y="38" text-anchor="middle" dominant-baseline="central" fill="#712B13">RFID reader A</text>

      <rect class="b-rfid-bg" x="30" y="68" width="110" height="36" rx="7" fill="#FAECE7" stroke="#D85A30" stroke-width="0.7"/>
      <text class="bt b-rfid-t" x="85" y="86" text-anchor="middle" dominant-baseline="central" fill="#712B13">RFID reader B</text>

      <rect class="b-rfid-bg" x="30" y="116" width="110" height="36" rx="7" fill="#FAECE7" stroke="#D85A30" stroke-width="0.7"/>
      <text class="bt b-rfid-t" x="85" y="134" text-anchor="middle" dominant-baseline="central" fill="#712B13">RFID reader C</text>

      <text class="bts" x="85" y="170" text-anchor="middle" fill="#999">…N readers</text>

      <!-- Converging arrows -->
      <line x1="140" y1="38"  x2="290" y2="88"  stroke="#D85A30" stroke-width="0.9" opacity="0.5" marker-end="url(#ba)"/>
      <line x1="140" y1="86"  x2="290" y2="90"  stroke="#D85A30" stroke-width="0.9" opacity="0.5" marker-end="url(#ba)"/>
      <line x1="140" y1="134" x2="290" y2="92"  stroke="#D85A30" stroke-width="0.9" opacity="0.5" marker-end="url(#ba)"/>

      <!-- Synchronous API bottleneck -->
      <rect class="b-api-bg" x="292" y="52" width="148" height="76" rx="9" fill="#FCEBEB" stroke="#E24B4A" stroke-width="0.9"/>
      <text class="bt b-api-t" x="366" y="78" text-anchor="middle" dominant-baseline="central" fill="#791F1F">Synchronous API</text>
      <text class="bts b-api-ts" x="366" y="96" text-anchor="middle" dominant-baseline="central" fill="#A32D2D">request queue buildup</text>
      <text class="bts b-api-ts" x="366" y="112" text-anchor="middle" dominant-baseline="central" fill="#A32D2D">DB contention · slow gates</text>

      <!-- Outcome -->
      <line x1="440" y1="90" x2="490" y2="90" stroke="#E24B4A" stroke-width="1" marker-end="url(#ba)"/>
      <rect x="492" y="64" width="148" height="52" rx="8" fill="#FCEBEB" stroke="#E24B4A" stroke-width="0.7"/>
      <text class="bt" x="566" y="84" text-anchor="middle" dominant-baseline="central" fill="#791F1F">503 / timeout</text>
      <text class="bts" x="566" y="102" text-anchor="middle" dominant-baseline="central" fill="#A32D2D">unusable under load</text>
    </svg>
  </div>

  <hr class="rfid-divider">

  <!-- ─── Section 2: Decoupled pipeline ─── -->
  <div class="rfid-section-label"><span class="dot"></span> 02 · Solution</div>
  <h2 class="rfid-h2">Decoupled event processing via Laravel queue</h2>
  <p class="rfid-p">
    RFID events are pushed into Laravel's Redis-backed queue system, allowing the API to return immediately
    while dedicated workers handle processing asynchronously.
  </p>

  <!-- Pipeline diagram -->
  <div class="rfid-diagram-card">
    <svg viewBox="0 0 680 740" xmlns="http://www.w3.org/2000/svg" role="img">
      <title>RFID ingestion pipeline</title>
      <desc>Five-stage async pipeline: RFID Reader → Laravel API → Redis Queue → Queue Workers → PostgreSQL Ledger</desc>
      <defs>
        <marker id="pa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
        <style>
          .pt  { font-family: ui-sans-serif,sans-serif; font-size: 14px; font-weight: 500; }
          .pts { font-family: ui-sans-serif,sans-serif; font-size: 12px; }
          .ptl { font-family: ui-monospace,monospace; font-size: 11px; }
          @media (prefers-color-scheme: dark) {
            .p-envelope { stroke: #444441; }
            .p-rfid-bg  { fill: #4A1B0C; stroke: #D85A30; }
            .p-rfid-t   { fill: #F5C4B3; } .p-rfid-ts { fill: #F0997B; }
            .p-api-bg   { fill: #26215C; stroke: #7F77DD; }
            .p-api-t    { fill: #CECBF6; } .p-api-ts  { fill: #AFA9EC; }
            .p-q-bg     { fill: #412402; stroke: #BA7517; }
            .p-q-t      { fill: #FAC775; } .p-q-ts    { fill: #EF9F27; }
            .p-w-bg     { fill: #04342C; stroke: #1D9E75; }
            .p-w-t      { fill: #9FE1CB; } .p-w-ts    { fill: #5DCAA5; }
            .p-db-bg    { fill: #042C53; stroke: #378ADD; }
            .p-db-t     { fill: #B5D4F4; } .p-db-ts   { fill: #85B7EB; }
            .p-ok-bg    { fill: #04342C; stroke: #1D9E75; }
            .p-ok-t     { fill: #9FE1CB; }
          }
        </style>
      </defs>

      <!-- Envelope -->
      <rect class="p-envelope" x="60" y="28" width="560" height="684" rx="16"
        fill="none" stroke="#d0cec6" stroke-width="0.8" stroke-dasharray="6 4" opacity="0.5"/>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:11px;fill:#aaa" x="340" y="20" text-anchor="middle">async on-premise pipeline</text>

      <!-- Stage 1: RFID Reader -->
      <rect class="p-rfid-bg" x="160" y="52" width="360" height="72" rx="10"
        fill="#FAECE7" stroke="#D85A30" stroke-width="0.8"/>
      <text class="pt p-rfid-t" x="340" y="82" text-anchor="middle" dominant-baseline="central" fill="#712B13">RFID reader</text>
      <text class="pts p-rfid-ts" x="340" y="104" text-anchor="middle" dominant-baseline="central" fill="#993C1D">Edge device · HTTP POST to ingestion endpoint</text>

      <!-- 200 OK badge -->
      <rect class="p-ok-bg" x="534" y="62" width="70" height="28" rx="6"
        fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.6"/>
      <text class="ptl p-ok-t" x="569" y="76" text-anchor="middle" dominant-baseline="central" fill="#085041">200 OK · fast</text>

      <!-- Connector 1 -->
      <line x1="340" y1="124" x2="340" y2="162" stroke="#bbb" stroke-width="1.2" marker-end="url(#pa)"/>
      <text class="ptl" x="354" y="148" dominant-baseline="central" fill="#aaa">HTTP POST</text>

      <!-- Stage 2: Laravel API -->
      <rect class="p-api-bg" x="160" y="164" width="360" height="72" rx="10"
        fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.8"/>
      <text class="pt p-api-t" x="340" y="194" text-anchor="middle" dominant-baseline="central" fill="#3C3489">Laravel API</text>
      <text class="pts p-api-ts" x="340" y="216" text-anchor="middle" dominant-baseline="central" fill="#534AB7">Validate · deduplicate · dispatch job · return 200</text>

      <!-- Connector 2 -->
      <line x1="340" y1="236" x2="340" y2="274" stroke="#bbb" stroke-width="1.2" marker-end="url(#pa)"/>
      <text class="ptl" x="354" y="260" dominant-baseline="central" fill="#aaa">dispatch job</text>

      <!-- Stage 3: Redis Queue -->
      <rect class="p-q-bg" x="160" y="276" width="360" height="72" rx="10"
        fill="#FAEEDA" stroke="#BA7517" stroke-width="0.8"/>
      <text class="pt p-q-t" x="340" y="306" text-anchor="middle" dominant-baseline="central" fill="#633806">Laravel queue · Redis</text>
      <text class="pts p-q-ts" x="340" y="328" text-anchor="middle" dominant-baseline="central" fill="#854F0B">Async job bus · absorbs burst load · offline buffer</text>

      <!-- Connector 3 -->
      <line x1="340" y1="348" x2="340" y2="386" stroke="#bbb" stroke-width="1.2" marker-end="url(#pa)"/>
      <text class="ptl" x="354" y="372" dominant-baseline="central" fill="#aaa">consumed by</text>

      <!-- Stage 4: Workers -->
      <rect class="p-w-bg" x="160" y="388" width="360" height="72" rx="10"
        fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.8"/>
      <text class="pt p-w-t" x="340" y="418" text-anchor="middle" dominant-baseline="central" fill="#085041">Queue workers</text>
      <text class="pts p-w-ts" x="340" y="440" text-anchor="middle" dominant-baseline="central" fill="#0F6E56">Horizon · Supervisor · parallel processing</text>

      <!-- Connector 4 -->
      <line x1="340" y1="460" x2="340" y2="498" stroke="#bbb" stroke-width="1.2" marker-end="url(#pa)"/>
      <text class="ptl" x="354" y="484" dominant-baseline="central" fill="#aaa">persist</text>

      <!-- Stage 5: PostgreSQL -->
      <rect class="p-db-bg" x="160" y="500" width="360" height="72" rx="10"
        fill="#E6F1FB" stroke="#378ADD" stroke-width="0.8"/>
      <text class="pt p-db-t" x="340" y="530" text-anchor="middle" dominant-baseline="central" fill="#0C447C">PostgreSQL ledger</text>
      <text class="pts p-db-ts" x="340" y="552" text-anchor="middle" dominant-baseline="central" fill="#185FA5">Immutable event store · append-only</text>

      <!-- Legend -->
      <rect x="112" y="630" width="10" height="10" rx="2" fill="#FAECE7" stroke="#D85A30" stroke-width="0.7"/>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:11px;fill:#999" x="128" y="636" dominant-baseline="central">Edge</text>
      <rect x="174" y="630" width="10" height="10" rx="2" fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.7"/>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:11px;fill:#999" x="190" y="636" dominant-baseline="central">API / auth</text>
      <rect x="256" y="630" width="10" height="10" rx="2" fill="#FAEEDA" stroke="#BA7517" stroke-width="0.7"/>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:11px;fill:#999" x="272" y="636" dominant-baseline="central">Queue</text>
      <rect x="326" y="630" width="10" height="10" rx="2" fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.7"/>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:11px;fill:#999" x="342" y="636" dominant-baseline="central">Workers</text>
      <rect x="406" y="630" width="10" height="10" rx="2" fill="#E6F1FB" stroke="#378ADD" stroke-width="0.7"/>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:11px;fill:#999" x="422" y="636" dominant-baseline="central">Database</text>

      <text style="font-family:ui-sans-serif,sans-serif;font-size:12px;fill:#bbb" x="340" y="688" text-anchor="middle">CAMECO HRIS — RFID ingestion pipeline</text>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:11px;fill:#ccc" x="340" y="708" text-anchor="middle">Laravel · Redis · PostgreSQL</text>
    </svg>
  </div>

  <h3 class="rfid-h3">JSON ingestion payload</h3>
  <p class="rfid-p">
    Each event is processed idempotently using <code>event_uuid</code> uniqueness constraints
    to prevent duplicate ingestion during retries or network replay scenarios.
  </p>

  <code class="rfid-code">{
  <span class="key">"event_uuid"</span>: <span class="val">"b6f483c2-d38a-4934-8c81-43285b001a1e"</span>,
  <span class="key">"card_uid"</span>:   <span class="val">"04A2F8D13C6E99"</span>,
  <span class="key">"device_id"</span>:  <span class="val">"TURNSTILE_03_SOUTH"</span>,
  <span class="key">"timestamp"</span>:  <span class="val">"2025-11-29T07:58:12.458Z"</span>
}</code>

  <hr class="rfid-divider">

  <!-- ─── Section 3: Edge buffering ─── -->
  <div class="rfid-section-label"><span class="dot"></span> 03 · Offline resilience</div>
  <h2 class="rfid-h2">Edge buffering protocol</h2>
  <p class="rfid-p">
    When WAN connectivity is lost, the edge device switches to offline mode and continues operating independently.
    Events are buffered locally and replayed once the connection is restored.
  </p>

  <!-- Offline mode diagram -->
  <div class="rfid-diagram-card">
    <svg viewBox="0 0 680 230" xmlns="http://www.w3.org/2000/svg" role="img">
      <title>Edge buffering offline protocol</title>
      <desc>Three-phase offline protocol: authorization cache, local event storage, and replay on reconnect</desc>
      <defs>
        <marker id="oa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
        <style>
          .ot  { font-family: ui-sans-serif,sans-serif; font-size: 12px; font-weight: 500; }
          .ots { font-family: ui-sans-serif,sans-serif; font-size: 10px; }
          @media (prefers-color-scheme: dark) {
            .o-edge-bg   { fill: #4A1B0C; stroke: #D85A30; }
            .o-edge-t    { fill: #F5C4B3; }
            .o-cache-bg  { fill: #412402; stroke: #BA7517; }
            .o-cache-t   { fill: #FAC775; }
            .o-cache-ts  { fill: #EF9F27; }
            .o-store-bg  { fill: #26215C; stroke: #7F77DD; }
            .o-store-t   { fill: #CECBF6; }
            .o-store-ts  { fill: #AFA9EC; }
            .o-replay-bg { fill: #04342C; stroke: #1D9E75; }
            .o-replay-t  { fill: #9FE1CB; }
            .o-replay-ts { fill: #5DCAA5; }
            .o-server-bg { fill: #042C53; stroke: #378ADD; }
            .o-server-t  { fill: #B5D4F4; }
          }
        </style>
      </defs>

      <!-- WAN outage banner -->
      <rect x="30" y="14" width="620" height="26" rx="6"
        fill="#FCEBEB" stroke="#E24B4A" stroke-width="0.6"/>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:11px;font-weight:500;fill:#A32D2D"
        x="340" y="27" text-anchor="middle" dominant-baseline="central">WAN outage — offline mode active</text>

      <!-- Edge device -->
      <rect class="o-edge-bg" x="30" y="56" width="110" height="48" rx="8"
        fill="#FAECE7" stroke="#D85A30" stroke-width="0.7"/>
      <text class="ot o-edge-t" x="85" y="76" text-anchor="middle" dominant-baseline="central" fill="#712B13">RFID</text>
      <text class="ot o-edge-t" x="85" y="94" text-anchor="middle" dominant-baseline="central" fill="#712B13">reader</text>

      <line x1="140" y1="80" x2="168" y2="80" stroke="#bbb" stroke-width="1.2" marker-end="url(#oa)"/>

      <!-- Auth cache -->
      <rect class="o-cache-bg" x="170" y="44" width="140" height="72" rx="8"
        fill="#FAEEDA" stroke="#BA7517" stroke-width="0.7"/>
      <text class="ot o-cache-t" x="240" y="68" text-anchor="middle" dominant-baseline="central" fill="#633806">Auth cache</text>
      <text class="ots o-cache-ts" x="240" y="86" text-anchor="middle" dominant-baseline="central" fill="#854F0B">SQLite · local</text>
      <text class="ots o-cache-ts" x="240" y="102" text-anchor="middle" dominant-baseline="central" fill="#854F0B">RFID credential store</text>

      <line x1="310" y1="80" x2="338" y2="80" stroke="#bbb" stroke-width="1.2" marker-end="url(#oa)"/>

      <!-- Local event store -->
      <rect class="o-store-bg" x="340" y="44" width="140" height="72" rx="8"
        fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.7"/>
      <text class="ot o-store-t" x="410" y="68" text-anchor="middle" dominant-baseline="central" fill="#3C3489">Local store</text>
      <text class="ots o-store-ts" x="410" y="86" text-anchor="middle" dominant-baseline="central" fill="#534AB7">Buffer events</text>
      <text class="ots o-store-ts" x="410" y="102" text-anchor="middle" dominant-baseline="central" fill="#534AB7">preserve timestamps</text>

      <!-- Reconnect arrow (dashed, curved up and right) -->
      <path d="M480 80 Q560 80 560 148" fill="none" stroke="#1D9E75" stroke-width="1.1" stroke-dasharray="5 3" marker-end="url(#oa)"/>
      <text class="ots" x="572" y="120" text-anchor="start" fill="#0F6E56">reconnect</text>
      <text class="ots" x="572" y="134" text-anchor="start" fill="#0F6E56">→ replay</text>

      <!-- Replay mechanism -->
      <rect class="o-replay-bg" x="272" y="150" width="156" height="60" rx="8"
        fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.7"/>
      <text class="ot o-replay-t" x="350" y="172" text-anchor="middle" dominant-baseline="central" fill="#085041">Replay worker</text>
      <text class="ots o-replay-ts" x="350" y="190" text-anchor="middle" dominant-baseline="central" fill="#0F6E56">ordered · idempotent · no dupes</text>

      <line x1="270" y1="180" x2="194" y2="180" stroke="#bbb" stroke-width="1.2" marker-end="url(#oa)"/>

      <!-- Laravel API (restored) -->
      <rect class="o-server-bg" x="30" y="156" width="162" height="48" rx="8"
        fill="#E6F1FB" stroke="#378ADD" stroke-width="0.7"/>
      <text class="ot o-server-t" x="111" y="176" text-anchor="middle" dominant-baseline="central" fill="#0C447C">Laravel API</text>
      <text class="ots" x="111" y="194" text-anchor="middle" dominant-baseline="central" fill="#185FA5">ingestion endpoint</text>
    </svg>
  </div>

  <div class="rfid-buffer-grid">
    <div class="rfid-buffer-card">
      <div class="bcard-label">Phase 1</div>
      <div class="bcard-title">Authorization cache</div>
      <div class="bcard-desc">Local SQLite cache of RFID credentials used for offline validation at the edge device.</div>
    </div>
    <div class="rfid-buffer-card">
      <div class="bcard-label">Phase 2</div>
      <div class="bcard-title">Local event storage</div>
      <div class="bcard-desc">Temporarily stores RFID events locally during outages with original timestamps preserved.</div>
    </div>
    <div class="rfid-buffer-card">
      <div class="bcard-label">Phase 3</div>
      <div class="bcard-title">Replay mechanism</div>
      <div class="bcard-desc">Buffered events are replayed in order once connectivity is restored, using idempotent ingestion to prevent duplicates.</div>
    </div>
  </div>

  <hr class="rfid-divider">

  <!-- ─── Section 4: SSE ─── -->
  <div class="rfid-section-label"><span class="dot"></span> 04 · Real-time UI</div>
  <h2 class="rfid-h2">Real-time synchronization via Server-Sent Events</h2>
  <p class="rfid-p">
    Instead of polling, Laravel broadcasts events to connected clients using Server-Sent Events (SSE)
    after successful processing. SSE updates are emitted only after the database transaction commits,
    maintaining strict consistency between persisted state and UI state.
  </p>

  <!-- SSE flow diagram -->
  <div class="rfid-diagram-card">
    <svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" role="img">
      <title>SSE real-time synchronization flow</title>
      <desc>After DB commit, worker broadcasts via SSE stream to dashboard clients</desc>
      <defs>
        <marker id="sa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
        <style>
          .st  { font-family: ui-sans-serif,sans-serif; font-size: 12px; font-weight: 500; }
          .sts { font-family: ui-sans-serif,sans-serif; font-size: 10px; }
          @media (prefers-color-scheme: dark) {
            .s-worker-bg { fill: #04342C; stroke: #1D9E75; }
            .s-worker-t  { fill: #9FE1CB; }
            .s-worker-ts { fill: #5DCAA5; }
            .s-db-bg     { fill: #042C53; stroke: #378ADD; }
            .s-db-t      { fill: #B5D4F4; }
            .s-sse-bg    { fill: #26215C; stroke: #7F77DD; }
            .s-sse-t     { fill: #CECBF6; }
            .s-sse-ts    { fill: #AFA9EC; }
            .s-dash-bg   { fill: #04342C; stroke: #1D9E75; }
            .s-dash-t    { fill: #9FE1CB; }
            .s-dash-ts   { fill: #5DCAA5; }
          }
        </style>
      </defs>

      <!-- Worker -->
      <rect class="s-worker-bg" x="30" y="72" width="128" height="56" rx="8"
        fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.7"/>
      <text class="st s-worker-t" x="94" y="94" text-anchor="middle" dominant-baseline="central" fill="#085041">Queue worker</text>
      <text class="sts s-worker-ts" x="94" y="112" text-anchor="middle" dominant-baseline="central" fill="#0F6E56">processes event</text>

      <line x1="158" y1="100" x2="186" y2="100" stroke="#bbb" stroke-width="1.2" marker-end="url(#sa)"/>
      <text class="sts" x="172" y="90" text-anchor="middle" fill="#aaa">commit</text>

      <!-- DB -->
      <rect class="s-db-bg" x="188" y="72" width="120" height="56" rx="8"
        fill="#E6F1FB" stroke="#378ADD" stroke-width="0.7"/>
      <text class="st s-db-t" x="248" y="94" text-anchor="middle" dominant-baseline="central" fill="#0C447C">PostgreSQL</text>
      <text class="sts s-db-t" x="248" y="112" text-anchor="middle" dominant-baseline="central" fill="#185FA5">transaction committed</text>

      <line x1="308" y1="100" x2="336" y2="100" stroke="#bbb" stroke-width="1.2" marker-end="url(#sa)"/>
      <text class="sts" x="322" y="90" text-anchor="middle" fill="#aaa">emit</text>

      <!-- SSE stream -->
      <rect class="s-sse-bg" x="338" y="64" width="140" height="72" rx="8"
        fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.7"/>
      <text class="st s-sse-t" x="408" y="88" text-anchor="middle" dominant-baseline="central" fill="#3C3489">SSE stream</text>
      <text class="sts s-sse-ts" x="408" y="106" text-anchor="middle" dominant-baseline="central" fill="#534AB7">Laravel broadcast</text>
      <text class="sts s-sse-ts" x="408" y="122" text-anchor="middle" dominant-baseline="central" fill="#534AB7">persistent connection</text>

      <!-- Fan out to dashboards -->
      <line x1="478" y1="88"  x2="508" y2="66"  stroke="#7F77DD" stroke-width="0.9" opacity="0.6" marker-end="url(#sa)"/>
      <line x1="478" y1="100" x2="508" y2="100" stroke="#7F77DD" stroke-width="0.9" opacity="0.6" marker-end="url(#sa)"/>
      <line x1="478" y1="112" x2="508" y2="134" stroke="#7F77DD" stroke-width="0.9" opacity="0.6" marker-end="url(#sa)"/>

      <!-- Dashboard clients -->
      <rect class="s-dash-bg" x="510" y="44" width="140" height="36" rx="7"
        fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.6"/>
      <text class="sts s-dash-t" x="580" y="62" text-anchor="middle" dominant-baseline="central" fill="#085041">HR manager dashboard</text>

      <rect class="s-dash-bg" x="510" y="82" width="140" height="36" rx="7"
        fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.6"/>
      <text class="sts s-dash-t" x="580" y="100" text-anchor="middle" dominant-baseline="central" fill="#085041">Security dashboard</text>

      <rect class="s-dash-bg" x="510" y="120" width="140" height="36" rx="7"
        fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.6"/>
      <text class="sts s-dash-t" x="580" y="138" text-anchor="middle" dominant-baseline="central" fill="#085041">Payroll dashboard</text>

      <!-- Latency note -->
      <text class="sts" x="340" y="184" text-anchor="middle" fill="#0F6E56">
        sub-second latency · no polling · consistent with persisted state
      </text>
    </svg>
  </div>

  <ul class="rfid-ul">
    <li>Queue worker processes RFID event.</li>
    <li>Database transaction commits successfully.</li>
    <li>Event is broadcast to the SSE stream.</li>
    <li>Dashboard updates in near real-time (sub-second latency).</li>
  </ul>

  <!-- Footer -->
  <div class="rfid-footer">
    <span>Last updated: November 2025</span>
    <a href="../">← Back to specifications</a>
  </div>

</section>