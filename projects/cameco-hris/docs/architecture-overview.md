---
layout: default
title: System Architecture Overview - CAMECO HRIS
description: Deployment model, high-level component diagrams, and API authorization controls.
---

<section class="space-y-10">
  <header class="space-y-4">
    <div>
      <h1 class="text-3xl font-semibold tracking-tight">System Architecture Overview</h1>
      <p class="text-muted-foreground max-w-2xl">
        A deep dive into the high-level components, network topology, and security models of CAMECO HRIS.
      </p>
    </div>
  </header>

  <div class="prose prose-sm dark:prose-invert max-w-none space-y-6 text-muted-foreground text-sm">
    <h2 class="font-medium text-lg text-foreground mb-2">1. Deployment Architecture: On-Premise Core</h2>
    <p>
      During the architectural phase of this Capstone, a key design decision was choosing between a cloud-native SaaS model and an on-premise infrastructure. We ultimately designed and built CAMECO HRIS as an <strong>on-premise enterprise platform</strong>.
    </p>
    
    <div class="p-4 rounded-lg border border-border bg-secondary/10 space-y-3">
      <h3 class="font-medium text-foreground">Why On-Premise?</h3>
      <ul class="list-disc pl-5 space-y-2">
        <li>
          <strong>Intranet Latency Constraints:</strong> A factory floor or corporate office setup requires employees to tap physical RFID cards at entry gates. To maintain a smooth traffic flow, card taps must be processed, checked against schedules, and trigger gate solenoids in under 100ms. Eliminating cloud round-trip latency guarantees instant physical response.
        </li>
        <li>
          <strong>Offline Resilience:</strong> In manufacturing or industrial settings, a loss of internet connection must never halt access control or daily timecard logging. The on-premise broker queues events locally, keeping the site fully operational during external WAN outages.
        </li>
        <li>
          <strong>Strict Data Residency:</strong> Employee logs, salary information, and government tax documents contain highly sensitive Personally Identifiable Information (PII) subject to the <em>Philippine Data Privacy Act (DPA) of 2012</em>. Keeping data stored on internal server hardware ensures absolute data custody.
        </li>
      </ul>
    </div>

    <h2 class="font-medium text-lg text-foreground mt-8 mb-2">2. High-Level Components & Data Flows</h2>
    <p>
      The platform consists of four decoupled layers communicating via an intranet network:
    </p>

    <div class="my-6 rounded-xl border border-border overflow-hidden" style="font-size:0.75rem;">

      <!-- Title bar -->
      <div style="background:#0f172a;color:#94a3b8;padding:0.6rem 1.25rem;font-family:monospace;font-size:0.65rem;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;display:flex;align-items:center;gap:0.5rem;">
        <span style="color:#38bdf8;font-size:0.9rem;">◈</span> Intranet System Architecture — CAMECO HRIS
      </div>

      <!-- Diagram body -->
      <div style="background:#f8fafc;padding:1.25rem;display:flex;flex-direction:column;gap:0;">

        <!-- Layer 1: IoT -->
        <div style="background:linear-gradient(135deg,#eff6ff,#dbeafe);border:1.5px solid #bfdbfe;border-radius:0.75rem;padding:1rem;">
          <div style="font-size:0.6rem;text-transform:uppercase;letter-spacing:0.1em;color:#2563eb;font-weight:700;margin-bottom:0.75rem;">① IoT Ingestion Layer</div>
          <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
            <div style="background:white;border:1.5px solid #93c5fd;border-radius:0.6rem;padding:0.6rem 0.9rem;text-align:center;min-width:110px;box-shadow:0 1px 4px rgba(59,130,246,.1);">
              <div style="font-size:1.3rem;">💳</div>
              <div style="font-weight:700;color:#1d4ed8;margin-top:0.3rem;font-size:0.72rem;">RFID Card Tap</div>
              <div style="color:#6b7280;font-size:0.6rem;margin-top:0.15rem;">Physical gate event</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;color:#93c5fd;gap:0.1rem;">
              <span style="font-size:1.3rem;line-height:1;font-weight:bold;">→</span>
              <span style="font-size:0.6rem;color:#94a3b8;font-style:italic;">physical</span>
            </div>
            <div style="background:white;border:1.5px solid #c4b5fd;border-radius:0.6rem;padding:0.6rem 0.9rem;text-align:center;min-width:140px;box-shadow:0 1px 4px rgba(139,92,246,.1);">
              <div style="font-size:1.3rem;">📡</div>
              <div style="font-weight:700;color:#6d28d9;margin-top:0.3rem;font-size:0.72rem;">Edge RFID Reader</div>
              <div style="color:#6b7280;font-size:0.6rem;margin-top:0.15rem;">SQLite offline cache</div>
            </div>
          </div>
        </div>

        <!-- Connector 1→2 -->
        <div style="display:flex;align-items:center;gap:0.4rem;padding:0.45rem 0 0.45rem 9.5rem;color:#a78bfa;font-size:0.65rem;font-style:italic;">
          <span style="font-size:1.4rem;line-height:1;">↓</span>
          <span style="color:#94a3b8;">MQTT Event Stream (pub/sub)</span>
        </div>

        <!-- Layer 2: Application -->
        <div style="background:linear-gradient(135deg,#fff7ed,#fef3c7);border:1.5px solid #fed7aa;border-radius:0.75rem;padding:1rem;">
          <div style="font-size:0.6rem;text-transform:uppercase;letter-spacing:0.1em;color:#ea580c;font-weight:700;margin-bottom:0.75rem;">② Application Layer</div>
          <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
            <div style="background:white;border:1.5px solid #6ee7b7;border-radius:0.6rem;padding:0.6rem 0.9rem;text-align:center;min-width:130px;box-shadow:0 1px 4px rgba(16,185,129,.1);">
              <div style="font-size:1.3rem;">🖥️</div>
              <div style="font-weight:700;color:#065f46;margin-top:0.3rem;font-size:0.72rem;">Admin Web App</div>
              <div style="color:#6b7280;font-size:0.6rem;margin-top:0.15rem;">React / Tailwind CSS</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:0.1rem;">
              <span style="font-size:1.3rem;line-height:1;color:#94a3b8;font-weight:bold;">↔</span>
              <span style="color:#94a3b8;font-size:0.6rem;font-style:italic;">REST API / JWT</span>
            </div>
            <div style="background:white;border:1.5px solid #fca5a5;border-radius:0.6rem;padding:0.6rem 0.9rem;text-align:center;min-width:145px;box-shadow:0 1px 4px rgba(239,68,68,.1);">
              <div style="font-size:1.3rem;">⚙️</div>
              <div style="font-weight:700;color:#9a3412;margin-top:0.3rem;font-size:0.72rem;">ASP.NET Backend</div>
              <div style="color:#6b7280;font-size:0.6rem;margin-top:0.15rem;">.NET Web API + Workers</div>
            </div>
          </div>
        </div>

        <!-- Connector 2→3 (two arrows) -->
        <div style="display:flex;gap:5rem;padding:0.45rem 0 0.45rem 1.5rem;font-size:0.65rem;font-style:italic;">
          <div style="display:flex;flex-direction:column;align-items:center;gap:0.1rem;color:#6ee7b7;">
            <span style="font-size:1.4rem;line-height:1;">↓</span>
            <span style="color:#94a3b8;">Read/Write (ACID)</span>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:0.1rem;color:#a78bfa;">
            <span style="font-size:1.4rem;line-height:1;">↓</span>
            <span style="color:#94a3b8;">MQTT Consumer</span>
          </div>
        </div>

        <!-- Layer 3: Database -->
        <div style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);border:1.5px solid #86efac;border-radius:0.75rem;padding:1rem;">
          <div style="font-size:0.6rem;text-transform:uppercase;letter-spacing:0.1em;color:#16a34a;font-weight:700;margin-bottom:0.75rem;">③ Database Layer — PostgreSQL Cluster</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
            <div style="background:white;border:1.5px solid #7dd3fc;border-radius:0.6rem;padding:0.75rem;text-align:center;box-shadow:0 1px 4px rgba(14,165,233,.1);">
              <div style="font-size:1.2rem;">🗂️</div>
              <div style="font-weight:700;color:#0c4a6e;margin-top:0.35rem;font-size:0.7rem;">Application DB Schema</div>
              <div style="color:#64748b;font-size:0.6rem;margin-top:0.4rem;line-height:1.6;">Employee records<br/>Schedules · Leave · OT<br/>Payroll runs</div>
            </div>
            <div style="background:white;border:1.5px solid #86efac;border-radius:0.6rem;padding:0.75rem;text-align:center;box-shadow:0 1px 4px rgba(34,197,94,.1);">
              <div style="font-size:1.2rem;">🔒</div>
              <div style="font-weight:700;color:#14532d;margin-top:0.35rem;font-size:0.7rem;">Immutable Event Ledger</div>
              <div style="color:#64748b;font-size:0.6rem;margin-top:0.4rem;line-height:1.6;">Append-only RFID events<br/>SHA-256 hash chain<br/>REVOKE UPDATE/DELETE</div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Client Application Layer:</strong> Admin portal built with React, communicating with the backend via a REST API. Dynamic pages use Server-Sent Events (SSE) to display real-time employee movements.</li>
      <li><strong>API Service Layer:</strong> An ASP.NET Core Web API that encapsulates business logic (scheduling, leave processing, reporting) and houses the background workers listening to the MQTT event bus.</li>
      <li><strong>Message Ingestion Bus:</strong> An MQTT/RabbitMQ broker that decouples high-frequency physical card taps from database writes, acting as a buffer against bursts of timecard traffic.</li>
      <li><strong>Database Layer:</strong> A single PostgreSQL instance containing two distinct schemas: a relational application schema (roles, schedules, metadata) and a custom append-only ledger schema.</li>
    </ul>

    <h3 class="font-medium text-base text-foreground mt-6 mb-2">ATS & Recruitment Component Interfaces</h3>
    <p>
      The Applicant Tracking System (ATS) manages the recruitment pipeline from job creation to candidate onboarding. To illustrate this process, here are the core interface panels:
    </p>
    <div class="grid gap-6 md:grid-cols-2 my-4">
      <figure class="rounded-lg border border-border overflow-hidden bg-secondary/5">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/cameco-hris/job-posting-page.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/cameco-hris/job-posting-page.png' | relative_url }}" alt="Job Posting Page" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Job Posting Page - Internal ATS module</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden bg-secondary/5">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/cameco-hris/career-page.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/cameco-hris/career-page.png' | relative_url }}" alt="Career Page" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Career Page - Public-facing recruitment portal</figcaption>
      </figure>
    </div>

    <h2 class="font-medium text-lg text-foreground mt-8 mb-2">3. Role-Based Access Control (RBAC) at API Level</h2>
    <p>
      Because CAMECO HRIS handles highly sensitive financial and personal records, we rejected basic controller-level authorization. Instead, I designed a claim-based RBAC matrix validated at the API endpoint middleware:
    </p>

    <div style="overflow-x:auto;margin:1rem 0;">
      <table style="width:100%;font-size:0.72rem;text-align:left;border-collapse:collapse;border:1px solid #e2e8f0;">
        <thead>
          <tr style="background:#1e293b;">
            <th style="border:1px solid #334155;padding:0.5rem 0.75rem;font-weight:600;color:#e2e8f0;">Module Action</th>
            <th style="border:1px solid #334155;padding:0.5rem 0.75rem;font-weight:600;color:#e2e8f0;">Superadmin</th>
            <th style="border:1px solid #334155;padding:0.5rem 0.75rem;font-weight:600;color:#e2e8f0;">Office Admin</th>
            <th style="border:1px solid #334155;padding:0.5rem 0.75rem;font-weight:600;color:#e2e8f0;">HR Manager</th>
            <th style="border:1px solid #334155;padding:0.5rem 0.75rem;font-weight:600;color:#e2e8f0;">HR Staff</th>
            <th style="border:1px solid #334155;padding:0.5rem 0.75rem;font-weight:600;color:#e2e8f0;">Payroll Officer</th>
          </tr>
        </thead>
        <tbody>
          <tr style="background:#ffffff;">
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;font-weight:600;color:#0f172a;">System Configuration</td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#dcfce7;color:#15803d;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Full</span></td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#fef9c3;color:#a16207;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Read/Write</span></td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#fee2e2;color:#b91c1c;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Denied</span></td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#fee2e2;color:#b91c1c;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Denied</span></td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#fee2e2;color:#b91c1c;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Denied</span></td>
          </tr>
          <tr style="background:#f8fafc;">
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;font-weight:600;color:#0f172a;">Employee Records</td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#dbeafe;color:#1d4ed8;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Override Only</span></td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#e0f2fe;color:#0369a1;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Read Only</span></td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#e0f2fe;color:#0369a1;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Read Only</span></td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#dcfce7;color:#15803d;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Full</span></td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#e0f2fe;color:#0369a1;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Read Only</span></td>
          </tr>
          <tr style="background:#ffffff;">
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;font-weight:600;color:#0f172a;">Timekeeping &amp; Logs</td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#dbeafe;color:#1d4ed8;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Override Only</span></td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#e0f2fe;color:#0369a1;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Read Only</span></td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#e0f2fe;color:#0369a1;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Read Only</span></td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#dcfce7;color:#15803d;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Full</span></td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#e0f2fe;color:#0369a1;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Read Only</span></td>
          </tr>
          <tr style="background:#f8fafc;">
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;font-weight:600;color:#0f172a;">Leave &amp; Overtime Approvals</td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#dbeafe;color:#1d4ed8;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Override Only</span></td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#fee2e2;color:#b91c1c;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Denied</span></td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#dcfce7;color:#15803d;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Full</span></td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#fef9c3;color:#a16207;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Write (Draft)</span></td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#fee2e2;color:#b91c1c;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Denied</span></td>
          </tr>
          <tr style="background:#ffffff;">
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;font-weight:600;color:#0f172a;">Payroll Calculations</td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#dbeafe;color:#1d4ed8;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Override Only</span></td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#fee2e2;color:#b91c1c;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Denied</span></td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#fee2e2;color:#b91c1c;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Denied</span></td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#fee2e2;color:#b91c1c;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Denied</span></td>
            <td style="border:1px solid #e2e8f0;padding:0.5rem 0.75rem;"><span style="background:#dcfce7;color:#15803d;padding:0.15rem 0.5rem;border-radius:9999px;font-weight:600;">Full</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      In ASP.NET Core, authorization is enforced via custom <code>[AuthorizeRole(Role.HRManager)]</code> attributes. At runtime, the JWT token's <code>roles</code> claims are matched against the system permission mappings stored in a cached PostgreSQL lookup table.
    </p>

    <h2 class="font-medium text-lg text-foreground mt-8 mb-2">4. Role-Based Dashboard Previews</h2>
    <p>
      The platform serves distinct departments through personalized dashboard portals tailored to each role's access levels:
    </p>

    <div class="grid gap-6 md:grid-cols-2 my-6">
      <figure class="rounded-lg border border-border overflow-hidden bg-secondary/5">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/cameco-hris/superadmin-dashboard.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/cameco-hris/superadmin-dashboard.png' | relative_url }}" alt="Superadmin Dashboard" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Superadmin Dashboard - System performance & ledger validation monitoring</figcaption>
      </figure>

      <figure class="rounded-lg border border-border overflow-hidden bg-secondary/5">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/cameco-hris/officeadmin-dashboard.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/cameco-hris/officeadmin-dashboard.png' | relative_url }}" alt="Office Admin Dashboard" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Office Admin Dashboard - Company parameters & business rules setup</figcaption>
      </figure>

      <figure class="rounded-lg border border-border overflow-hidden bg-secondary/5">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/cameco-hris/hrmanager-dashboard.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/cameco-hris/hrmanager-dashboard.png' | relative_url }}" alt="HR Manager Dashboard" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">HR Manager Dashboard - Multi-level leave & overtime approval center</figcaption>
      </figure>

      <figure class="rounded-lg border border-border overflow-hidden bg-secondary/5">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/cameco-hris/hrstaff-dashboard.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/cameco-hris/hrstaff-dashboard.png' | relative_url }}" alt="HR Staff Dashboard" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">HR Staff Dashboard - Shift scheduling & general employee profiles management</figcaption>
      </figure>

      <figure class="rounded-lg border border-border overflow-hidden bg-secondary/5 md:col-span-2">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/cameco-hris/payroll-dashboard.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/cameco-hris/payroll-dashboard.png' | relative_url }}" alt="Payroll Dashboard" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Payroll Dashboard - Calculations lock states & government remittance reports</figcaption>
      </figure>
    </div>

    <h2 class="font-medium text-lg text-foreground mt-8 mb-2">5. Key Design Trade-offs</h2>
    <ul class="list-disc pl-5 space-y-3">
      <li>
        <strong>Strong Consistency vs. Eventual Consistency:</strong> For core data (like employee records), we use relational ACID-compliant transactional flows. However, for RFID event processing, we accepted eventual consistency—allowing card taps to queue asynchronously before appearing on admin boards—to prevent write bottlenecks.
      </li>
      <li>
        <strong>No Direct Database Access (NDDA):</strong> Even administrators cannot execute raw SQL inserts or deletes against the event log tables. Access is restricted to application service accounts utilizing isolated stored procedures that enforce the append-only rule.
      </li>
    </ul>
  </div>

  <div class="mt-8 pt-6 border-t border-border flex justify-between text-xs text-muted-foreground">
    <span>Last Updated: November 2025</span>
    <a href="../" class="text-blue-500 hover:underline">← Back to Specifications</a>
  </div>
</section>
