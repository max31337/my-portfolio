---
layout: default
title: System Architecture Overview - CAMECO HRIS
description: Deployment model, high-level component diagrams, and API authorization controls.
---

<style>
  .arch-page { font-family: inherit; }

  /* Section headings */
  .arch-section-label {
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
  .arch-section-label span.dot {
    display: inline-block;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: currentColor;
  }

  .arch-h2 {
    font-size: 1.15rem;
    font-weight: 500;
    color: var(--color-text-primary, #1a1a1a);
    margin: 0 0 6px 0;
    letter-spacing: -0.01em;
  }
  .arch-h3 {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-text-primary, #1a1a1a);
    margin: 24px 0 8px 0;
  }
  .arch-p {
    font-size: 0.85rem;
    color: var(--color-text-secondary, #555);
    line-height: 1.75;
    margin: 0 0 14px 0;
  }
  .arch-ul {
    font-size: 0.85rem;
    color: var(--color-text-secondary, #555);
    line-height: 1.75;
    padding-left: 20px;
    margin: 0 0 14px 0;
  }
  .arch-ul li { margin-bottom: 4px; }

  /* Divider between sections */
  .arch-divider {
    border: none;
    border-top: 1px solid var(--color-border-tertiary, rgba(0,0,0,0.08));
    margin: 40px 0;
  }

  /* Callout box */
  .arch-callout {
    border: 1px solid var(--color-border-tertiary, rgba(0,0,0,0.1));
    border-radius: 10px;
    padding: 18px 20px;
    background: var(--color-background-secondary, rgba(0,0,0,0.02));
    margin: 16px 0 24px;
  }
  .arch-callout-title {
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--color-text-primary, #1a1a1a);
    margin: 0 0 10px 0;
  }
  .arch-callout ul {
    font-size: 0.82rem;
    color: var(--color-text-secondary, #555);
    line-height: 1.7;
    padding-left: 18px;
    margin: 0;
  }
  .arch-callout ul li { margin-bottom: 6px; }

  /* SVG diagram card */
  .arch-diagram-card {
    border: 1px solid var(--color-border-tertiary, rgba(0,0,0,0.1));
    border-radius: 12px;
    overflow: hidden;
    margin: 24px 0;
    background: var(--color-background-primary, #fff);
    padding: 8px 0 16px;
  }
  .arch-diagram-card svg { display: block; width: 100%; }

  /* Code block */
  .arch-code {
    background: var(--color-background-secondary, #f6f6f4);
    border: 1px solid var(--color-border-tertiary, rgba(0,0,0,0.08));
    border-radius: 8px;
    padding: 16px 18px;
    font-size: 0.78rem;
    font-family: ui-monospace, 'Cascadia Code', 'Fira Code', monospace;
    color: var(--color-text-secondary, #444);
    line-height: 1.7;
    overflow-x: auto;
    margin: 12px 0 20px;
    white-space: pre;
  }

  /* Image grid */
  .arch-img-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin: 16px 0 24px;
  }
  .arch-img-grid .span-2 { grid-column: span 2; }
  .arch-figure {
    border: 1px solid var(--color-border-tertiary, rgba(0,0,0,0.1));
    border-radius: 10px;
    overflow: hidden;
    background: var(--color-background-secondary, rgba(0,0,0,0.02));
  }
  .arch-figure img {
    width: 100%;
    display: block;
    object-fit: cover;
  }
  .arch-figcaption {
    padding: 8px 12px;
    font-size: 0.75rem;
    color: var(--color-text-tertiary, #888);
    border-top: 1px solid var(--color-border-tertiary, rgba(0,0,0,0.08));
  }

  /* Trade-off cards */
  .arch-tradeoff-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin: 16px 0;
  }
  .arch-tradeoff-card {
    border: 1px solid var(--color-border-tertiary, rgba(0,0,0,0.1));
    border-radius: 10px;
    padding: 16px;
    background: var(--color-background-secondary, rgba(0,0,0,0.02));
  }
  .arch-tradeoff-card .label {
    font-size: 0.72rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin-bottom: 6px;
  }
  .arch-tradeoff-card .label.consistency { color: #185FA5; }
  .arch-tradeoff-card .label.ndda { color: #0F6E56; }
  .arch-tradeoff-card .title {
    font-size: 0.84rem;
    font-weight: 500;
    color: var(--color-text-primary, #1a1a1a);
    margin-bottom: 6px;
  }
  .arch-tradeoff-card .desc {
    font-size: 0.8rem;
    color: var(--color-text-secondary, #555);
    line-height: 1.65;
  }

  /* Footer */
  .arch-footer {
    margin-top: 48px;
    padding-top: 20px;
    border-top: 1px solid var(--color-border-tertiary, rgba(0,0,0,0.08));
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    color: var(--color-text-tertiary, #888);
  }
  .arch-footer a {
    color: #185FA5;
    text-decoration: none;
  }
  .arch-footer a:hover { text-decoration: underline; }

  @media (max-width: 640px) {
    .arch-img-grid { grid-template-columns: 1fr; }
    .arch-img-grid .span-2 { grid-column: span 1; }
    .arch-tradeoff-grid { grid-template-columns: 1fr; }
  }
</style>

<section class="arch-page">

  <!-- Page header -->
  <header style="margin-bottom: 36px;">
    <div class="arch-section-label"><span class="dot"></span> CAMECO HRIS · Capstone</div>
    <h1 style="font-size: 1.6rem; font-weight: 600; letter-spacing: -0.02em; margin: 0 0 10px; color: var(--color-text-primary, #1a1a1a);">
      System Architecture Overview
    </h1>
    <p class="arch-p" style="max-width: 560px; margin: 0;">
      Deployment model, high-level component diagrams, and API authorization controls for the CAMECO on-premise HRIS platform.
    </p>
  </header>

  <!-- ─── Section 1: Deployment ─── -->
  <div class="arch-section-label"><span class="dot"></span> 01 · Deployment</div>
  <h2 class="arch-h2">Deployment architecture: on-premise core</h2>
  <p class="arch-p">
    During the architectural phase, the key decision was choosing between cloud SaaS and on-premise deployment.
    The system was designed as an <strong>on-premise Laravel-based enterprise platform</strong>.
  </p>

  <div class="arch-callout">
    <p class="arch-callout-title">Why on-premise?</p>
    <ul>
      <li><strong>Intranet latency constraints</strong> — RFID-based gate entry requires sub-100ms response times for smooth throughput.</li>
      <li><strong>Offline resilience</strong> — The system continues operating during WAN outages using local buffering and queued ingestion.</li>
      <li><strong>Strict data residency</strong> — Sensitive HR and payroll data remains inside internal infrastructure for compliance with the Philippine Data Privacy Act of 2012.</li>
    </ul>
  </div>

  <hr class="arch-divider">

  <!-- ─── Section 2: Component Diagram ─── -->
  <div class="arch-section-label"><span class="dot"></span> 02 · Components</div>
  <h2 class="arch-h2">High-level components &amp; data flows</h2>
  <p class="arch-p">
    The system is composed of five primary layers communicating over an internal network.
  </p>

  <!-- SVG Architecture Diagram -->
  <div class="arch-diagram-card">
    <svg viewBox="0 0 680 740" xmlns="http://www.w3.org/2000/svg" role="img">
      <title>CAMECO HRIS system architecture</title>
      <desc>Five-layer on-premise architecture: RFID Reader → Laravel API → Redis Queue → Queue Workers → PostgreSQL</desc>
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
        <style>
          .svg-t  { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 14px; font-weight: 500; fill: #1a1a1a; }
          .svg-ts { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 12px; font-weight: 400; fill: #666; }
          .svg-tl { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 11px; font-weight: 400; fill: #999; }
          .svg-label { font-family: ui-monospace, monospace; font-size: 11px; fill: #888; }
          @media (prefers-color-scheme: dark) {
            .svg-t  { fill: #e8e6de; }
            .svg-ts { fill: #9c9a92; }
            .svg-tl { fill: #666; }
            .svg-label { fill: #666; }
          }
        </style>
      </defs>

      <!-- Envelope: on-premise boundary -->
      <rect x="60" y="28" width="560" height="684" rx="16"
        fill="none" stroke="#c0bdb4" stroke-width="0.8" stroke-dasharray="6 4" opacity="0.5"/>
      <text class="svg-tl" x="340" y="20" text-anchor="middle">on-premise infrastructure boundary</text>

      <!-- ── Layer 1: RFID Reader ── -->
      <!-- coral: fill #FAECE7, stroke #D85A30, title #712B13, sub #993C1D -->
      <rect x="160" y="52" width="360" height="72" rx="10"
        fill="#FAECE7" stroke="#D85A30" stroke-width="0.8"/>
      <text class="svg-t" x="340" y="82" text-anchor="middle" dominant-baseline="central" fill="#712B13">RFID reader</text>
      <text class="svg-ts" x="340" y="104" text-anchor="middle" dominant-baseline="central" fill="#993C1D">Edge device · sub-100ms gate response</text>
      <!-- dark mode override -->
      <style>
        @media (prefers-color-scheme: dark) {
          #layer-rfid-bg   { fill: #4A1B0C; stroke: #D85A30; }
          #layer-rfid-t    { fill: #F5C4B3; }
          #layer-rfid-ts   { fill: #F0997B; }
          #layer-api-bg    { fill: #26215C; stroke: #7F77DD; }
          #layer-api-t     { fill: #CECBF6; }
          #layer-api-ts    { fill: #AFA9EC; }
          #layer-queue-bg  { fill: #412402; stroke: #BA7517; }
          #layer-queue-t   { fill: #FAC775; }
          #layer-queue-ts  { fill: #EF9F27; }
          #layer-workers-bg{ fill: #04342C; stroke: #1D9E75; }
          #layer-workers-t { fill: #9FE1CB; }
          #layer-workers-ts{ fill: #5DCAA5; }
          #layer-db-bg     { fill: #042C53; stroke: #378ADD; }
          #layer-db-t      { fill: #B5D4F4; }
          #layer-db-ts     { fill: #85B7EB; }
          #spatie-bg       { fill: #26215C; stroke: #7F77DD; }
          #spatie-t        { fill: #CECBF6; }
          #dpa-bg          { fill: #04342C; stroke: #1D9E75; }
          #dpa-t           { fill: #9FE1CB; }
        }
      </style>
      <rect id="layer-rfid-bg" x="160" y="52" width="360" height="72" rx="10"
        fill="#FAECE7" stroke="#D85A30" stroke-width="0.8"/>
      <text id="layer-rfid-t" class="svg-t" x="340" y="82" text-anchor="middle" dominant-baseline="central" fill="#712B13">RFID reader</text>
      <text id="layer-rfid-ts" class="svg-ts" x="340" y="104" text-anchor="middle" dominant-baseline="central" fill="#993C1D">Edge device · sub-100ms gate response</text>

      <!-- Connector 1 -->
      <line x1="340" y1="124" x2="340" y2="162" stroke="#bbb" stroke-width="1.2" marker-end="url(#arr)"/>
      <text class="svg-label" x="352" y="148" dominant-baseline="central">HTTP ingestion</text>

      <!-- ── Layer 2: Laravel API ── -->
      <rect id="layer-api-bg" x="160" y="164" width="360" height="72" rx="10"
        fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.8"/>
      <text id="layer-api-t" class="svg-t" x="340" y="194" text-anchor="middle" dominant-baseline="central" fill="#3C3489">Laravel API layer</text>
      <text id="layer-api-ts" class="svg-ts" x="340" y="216" text-anchor="middle" dominant-baseline="central" fill="#534AB7">REST · authentication · request validation</text>

      <!-- Connector 2 -->
      <line x1="340" y1="236" x2="340" y2="274" stroke="#bbb" stroke-width="1.2" marker-end="url(#arr)"/>
      <text class="svg-label" x="352" y="260" dominant-baseline="central">dispatch job</text>

      <!-- ── Layer 3: Redis Queue ── -->
      <rect id="layer-queue-bg" x="160" y="276" width="360" height="72" rx="10"
        fill="#FAEEDA" stroke="#BA7517" stroke-width="0.8"/>
      <text id="layer-queue-t" class="svg-t" x="340" y="306" text-anchor="middle" dominant-baseline="central" fill="#633806">Laravel queue · Redis</text>
      <text id="layer-queue-ts" class="svg-ts" x="340" y="328" text-anchor="middle" dominant-baseline="central" fill="#854F0B">Async event bus · offline-resilient buffer</text>

      <!-- Connector 3 -->
      <line x1="340" y1="348" x2="340" y2="386" stroke="#bbb" stroke-width="1.2" marker-end="url(#arr)"/>
      <text class="svg-label" x="352" y="372" dominant-baseline="central">consumed by</text>

      <!-- ── Layer 4: Queue Workers ── -->
      <rect id="layer-workers-bg" x="160" y="388" width="360" height="72" rx="10"
        fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.8"/>
      <text id="layer-workers-t" class="svg-t" x="340" y="418" text-anchor="middle" dominant-baseline="central" fill="#085041">Queue workers</text>
      <text id="layer-workers-ts" class="svg-ts" x="340" y="440" text-anchor="middle" dominant-baseline="central" fill="#0F6E56">Horizon · Supervisor · parallel processing</text>

      <!-- Connector 4 -->
      <line x1="340" y1="460" x2="340" y2="498" stroke="#bbb" stroke-width="1.2" marker-end="url(#arr)"/>
      <text class="svg-label" x="352" y="484" dominant-baseline="central">persist</text>

      <!-- ── Layer 5: PostgreSQL ── -->
      <rect id="layer-db-bg" x="160" y="500" width="360" height="72" rx="10"
        fill="#E6F1FB" stroke="#378ADD" stroke-width="0.8"/>
      <text id="layer-db-t" class="svg-t" x="340" y="530" text-anchor="middle" dominant-baseline="central" fill="#0C447C">PostgreSQL</text>
      <text id="layer-db-ts" class="svg-ts" x="340" y="552" text-anchor="middle" dominant-baseline="central" fill="#185FA5">Relational schema · append-only event ledger</text>

      <!-- ── Sidebar: Spatie RBAC ── -->
      <rect id="spatie-bg" x="74" y="164" width="74" height="72" rx="8"
        fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.6" stroke-dasharray="4 3"/>
      <text id="spatie-t" class="svg-ts" x="111" y="192" text-anchor="middle" dominant-baseline="central" fill="#3C3489">Spatie</text>
      <text class="svg-ts" x="111" y="210" text-anchor="middle" dominant-baseline="central" fill="#534AB7">RBAC</text>
      <text class="svg-ts" x="111" y="226" text-anchor="middle" dominant-baseline="central" fill="#534AB7">middleware</text>
      <line x1="148" y1="200" x2="160" y2="200" stroke="#7F77DD" stroke-width="0.7" stroke-dasharray="3 2" opacity="0.6"/>

      <!-- ── Sidebar: PH DPA compliance ── -->
      <rect id="dpa-bg" x="74" y="500" width="74" height="72" rx="8"
        fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.6" stroke-dasharray="4 3"/>
      <text class="svg-ts" x="111" y="524" text-anchor="middle" dominant-baseline="central" fill="#085041">PH Data</text>
      <text class="svg-ts" x="111" y="542" text-anchor="middle" dominant-baseline="central" fill="#085041">Privacy</text>
      <text class="svg-ts" x="111" y="560" text-anchor="middle" dominant-baseline="central" fill="#085041">Act 2012</text>
      <line x1="148" y1="536" x2="160" y2="536" stroke="#1D9E75" stroke-width="0.7" stroke-dasharray="3 2" opacity="0.6"/>

      <!-- Legend -->
      <rect x="88" y="626" width="10" height="10" rx="2" fill="#FAECE7" stroke="#D85A30" stroke-width="0.8"/>
      <text class="svg-tl" x="104" y="632" dominant-baseline="central">Edge</text>
      <rect x="154" y="626" width="10" height="10" rx="2" fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.8"/>
      <text class="svg-tl" x="170" y="632" dominant-baseline="central">API / auth</text>
      <rect x="242" y="626" width="10" height="10" rx="2" fill="#FAEEDA" stroke="#BA7517" stroke-width="0.8"/>
      <text class="svg-tl" x="258" y="632" dominant-baseline="central">Queue</text>
      <rect x="312" y="626" width="10" height="10" rx="2" fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.8"/>
      <text class="svg-tl" x="328" y="632" dominant-baseline="central">Workers</text>
      <rect x="394" y="626" width="10" height="10" rx="2" fill="#E6F1FB" stroke="#378ADD" stroke-width="0.8"/>
      <text class="svg-tl" x="410" y="632" dominant-baseline="central">Database</text>

      <!-- Footer label -->
      <text class="svg-ts" x="340" y="676" text-anchor="middle" fill="#aaa">CAMECO HRIS — system architecture overview</text>
      <text class="svg-tl" x="340" y="698" text-anchor="middle">On-premise · Laravel · PostgreSQL · Redis</text>
    </svg>
  </div>

<ul class="arch-ul">
    <li>
        <strong>Presentation layer</strong> — React.js and TypeScript interfaces delivered through Inertia.js, enabling server-driven page rendering across multiple dashboards, administrative modules, and business workflows.
    </li>
    <li>
        <strong>Application layer</strong> — Laravel manages authentication, authorization, attendance tracking, payroll processing, recruitment workflows, employee management, and reporting services.
    </li>
    <li>
        <strong>Background processing layer</strong> — Redis-backed Laravel Queue workers handle asynchronous tasks, notifications, report generation, scheduled jobs, and other long-running business processes.
    </li>
    <li>
        <strong>Database layer</strong> — PostgreSQL stores transactional and historical data using a relational schema complemented by an append-only event ledger for auditing and traceability.
    </li>
</ul>

  <h3 class="arch-h3">ATS &amp; recruitment component interfaces</h3>

  <div class="arch-img-grid">
    <figure class="arch-figure">
      <img src="{{ '/assets/projects/cameco-hris/job-posting-page.png' | relative_url }}" alt="Job Posting Page" loading="lazy"/>
      <figcaption class="arch-figcaption">Job Posting Page — Internal ATS module</figcaption>
    </figure>
    <figure class="arch-figure">
      <img src="{{ '/assets/projects/cameco-hris/career-page.png' | relative_url }}" alt="Career Page" loading="lazy"/>
      <figcaption class="arch-figcaption">Career Page — Public-facing recruitment portal</figcaption>
    </figure>
  </div>

  <hr class="arch-divider">

  <!-- ─── Section 3: RBAC ─── -->
  <div class="arch-section-label"><span class="dot"></span> 03 · Authorization</div>
  <h2 class="arch-h2">Role-based access control (RBAC) using Spatie</h2>
  <p class="arch-p">
    The system implements strict role-based access control using Laravel's authorization layer powered by
    <strong>Spatie Laravel Permission</strong>. Authorization is enforced through middleware and policies
    rather than controller-level checks, ensuring consistent security across all modules.
  </p>

  <!-- RBAC diagram -->
  <div class="arch-diagram-card">
    <svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" role="img">
      <title>RBAC authorization flow</title>
      <desc>Request flows through route middleware, then policy layer, then service-layer checks before reaching the database</desc>
      <defs>
        <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
      </defs>

      <!-- Incoming request -->
      <rect x="30" y="116" width="96" height="48" rx="8"
        fill="#F1EFE8" stroke="#5F5E5A" stroke-width="0.7"/>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:12px;font-weight:500;fill:#2C2C2A" x="78" y="136" text-anchor="middle" dominant-baseline="central">HTTP</text>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:11px;fill:#5F5E5A" x="78" y="154" text-anchor="middle" dominant-baseline="central">request</text>

      <line x1="126" y1="140" x2="156" y2="140" stroke="#bbb" stroke-width="1.2" marker-end="url(#arr2)"/>

      <!-- Route middleware -->
      <rect x="158" y="104" width="116" height="72" rx="8"
        fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.7"/>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:12px;font-weight:500;fill:#3C3489" x="216" y="128" text-anchor="middle" dominant-baseline="central">Route</text>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:12px;font-weight:500;fill:#3C3489" x="216" y="146" text-anchor="middle" dominant-baseline="central">middleware</text>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:10px;fill:#534AB7" x="216" y="164" text-anchor="middle" dominant-baseline="central">role: / permission:</text>

      <line x1="274" y1="140" x2="304" y2="140" stroke="#bbb" stroke-width="1.2" marker-end="url(#arr2)"/>

      <!-- Policy layer -->
      <rect x="306" y="104" width="116" height="72" rx="8"
        fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.7"/>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:12px;font-weight:500;fill:#3C3489" x="364" y="128" text-anchor="middle" dominant-baseline="central">Policy</text>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:12px;font-weight:500;fill:#3C3489" x="364" y="146" text-anchor="middle" dominant-baseline="central">layer</text>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:10px;fill:#534AB7" x="364" y="164" text-anchor="middle" dominant-baseline="central">model-level auth</text>

      <line x1="422" y1="140" x2="452" y2="140" stroke="#bbb" stroke-width="1.2" marker-end="url(#arr2)"/>

      <!-- Service layer -->
      <rect x="454" y="104" width="116" height="72" rx="8"
        fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.7"/>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:12px;font-weight:500;fill:#3C3489" x="512" y="128" text-anchor="middle" dominant-baseline="central">Service</text>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:12px;font-weight:500;fill:#3C3489" x="512" y="146" text-anchor="middle" dominant-baseline="central">layer</text>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:10px;fill:#534AB7" x="512" y="164" text-anchor="middle" dominant-baseline="central">payroll / approvals</text>

      <line x1="570" y1="140" x2="600" y2="140" stroke="#bbb" stroke-width="1.2" marker-end="url(#arr2)"/>

      <!-- DB -->
      <rect x="602" y="116" width="56" height="48" rx="8"
        fill="#E6F1FB" stroke="#378ADD" stroke-width="0.7"/>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:11px;font-weight:500;fill:#0C447C" x="630" y="140" text-anchor="middle" dominant-baseline="central">DB</text>

      <!-- Reject paths -->
      <line x1="216" y1="176" x2="216" y2="220" stroke="#E24B4A" stroke-width="0.9" stroke-dasharray="4 3" marker-end="url(#arr2)"/>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:10px;fill:#A32D2D" x="216" y="242" text-anchor="middle">403 forbidden</text>

      <line x1="364" y1="176" x2="364" y2="220" stroke="#E24B4A" stroke-width="0.9" stroke-dasharray="4 3" marker-end="url(#arr2)"/>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:10px;fill:#A32D2D" x="364" y="242" text-anchor="middle">403 forbidden</text>

      <line x1="512" y1="176" x2="512" y2="220" stroke="#E24B4A" stroke-width="0.9" stroke-dasharray="4 3" marker-end="url(#arr2)"/>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:10px;fill:#A32D2D" x="512" y="242" text-anchor="middle">abort / exception</text>

      <!-- Redis cache note -->
      <rect x="158" y="44" width="116" height="34" rx="6"
        fill="#FAEEDA" stroke="#BA7517" stroke-width="0.6" stroke-dasharray="4 3"/>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:10px;fill:#633806" x="216" y="57" text-anchor="middle" dominant-baseline="central">Permissions cached</text>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:10px;fill:#854F0B" x="216" y="72" text-anchor="middle" dominant-baseline="central">in Redis / file driver</text>
      <line x1="216" y1="78" x2="216" y2="104" stroke="#BA7517" stroke-width="0.6" stroke-dasharray="3 2" opacity="0.6"/>
    </svg>
  </div>

  <h3 class="arch-h3">Authorization mechanism</h3>
  <ul class="arch-ul">
    <li>Users are assigned roles via the Spatie role system.</li>
    <li>Roles contain aggregated permissions.</li>
    <li>Direct permissions can override role-level access when explicitly granted.</li>
    <li>Permissions are cached using Laravel cache (Redis or file driver).</li>
  </ul>

  <h3 class="arch-h3">Example middleware enforcement</h3>
  <div class="arch-code">Route::middleware(['auth', 'role:HR Manager'])->group(function () {
    Route::get('/employees', [EmployeeController::class, 'index']);
});

Route::middleware(['auth', 'permission:view payroll'])->group(function () {
    Route::get('/payroll', [PayrollController::class, 'index']);
});</div>

  <h3 class="arch-h3">Database structure</h3>
  <ul class="arch-ul">
    <li><code>users</code></li>
    <li><code>roles</code></li>
    <li><code>permissions</code></li>
    <li><code>model_has_roles</code></li>
    <li><code>model_has_permissions</code></li>
    <li><code>role_has_permissions</code></li>
  </ul>

  <h3 class="arch-h3">Security model</h3>
  <ul class="arch-ul">
    <li>Route middleware enforcement — early request blocking before controllers are reached.</li>
    <li>Policy layer for model-level authorization.</li>
    <li>Service-layer checks for sensitive business logic (payroll, approvals).</li>
  </ul>

  <hr class="arch-divider">

  <!-- ─── Section 4: Dashboards ─── -->
  <div class="arch-section-label"><span class="dot"></span> 04 · Dashboards</div>
  <h2 class="arch-h2">Role-based dashboard previews</h2>
  <p class="arch-p">
    The platform serves distinct dashboards tailored to each role's operational scope.
  </p>

  <div class="arch-img-grid">
    <figure class="arch-figure">
      <img src="{{ '/assets/projects/cameco-hris/superadmin-dashboard.png' | relative_url }}" alt="Superadmin Dashboard" loading="lazy"/>
      <figcaption class="arch-figcaption">Superadmin dashboard</figcaption>
    </figure>
    <figure class="arch-figure">
      <img src="{{ '/assets/projects/cameco-hris/officeadmin-dashboard.png' | relative_url }}" alt="Office Admin Dashboard" loading="lazy"/>
      <figcaption class="arch-figcaption">Office Admin dashboard</figcaption>
    </figure>
    <figure class="arch-figure">
      <img src="{{ '/assets/projects/cameco-hris/hrmanager-dashboard.png' | relative_url }}" alt="HR Manager Dashboard" loading="lazy"/>
      <figcaption class="arch-figcaption">HR Manager dashboard</figcaption>
    </figure>
    <figure class="arch-figure">
      <img src="{{ '/assets/projects/cameco-hris/hrstaff-dashboard.png' | relative_url }}" alt="HR Staff Dashboard" loading="lazy"/>
      <figcaption class="arch-figcaption">HR Staff dashboard</figcaption>
    </figure>
    <figure class="arch-figure span-2">
      <img src="{{ '/assets/projects/cameco-hris/payroll-dashboard.png' | relative_url }}" alt="Payroll Dashboard" loading="lazy"/>
      <figcaption class="arch-figcaption">Payroll dashboard</figcaption>
    </figure>
  </div>

  <hr class="arch-divider">

  <!-- ─── Section 5: Trade-offs ─── -->
  <div class="arch-section-label"><span class="dot"></span> 05 · Design trade-offs</div>
  <h2 class="arch-h2">Key design trade-offs</h2>

  <div class="arch-tradeoff-grid">
    <div class="arch-tradeoff-card">
      <div class="label consistency">Consistency model</div>
      <div class="title">Strong vs eventual consistency</div>
      <div class="desc">
        Core HR data uses full ACID transactions. RFID attendance events are processed
        asynchronously via Laravel queues, accepting a brief window of eventual consistency
        in exchange for throughput and offline resilience.
      </div>
    </div>
    <div class="arch-tradeoff-card">
      <div class="label ndda">Data access</div>
      <div class="title">No direct database access (NDDA)</div>
      <div class="desc">
        All data mutations go through the Laravel service layer. Raw SQL operations are
        restricted, keeping business logic centralized and the schema easier to evolve
        without side-effects across modules.
      </div>
    </div>
  </div>

  <!-- ─── Footer ─── -->
  <div class="arch-footer">
    <span>Last updated: November 2025</span>
    <a href="../">← Back to specifications</a>
  </div>

</section>
