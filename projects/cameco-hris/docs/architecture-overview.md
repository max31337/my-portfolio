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
      During the architectural phase of this Capstone, a key decision was choosing between cloud SaaS and on-premise deployment.
      The system was designed as an <strong>on-premise Laravel-based enterprise platform</strong>.
    </p>

    <div class="p-4 rounded-lg border border-border bg-secondary/10 space-y-3">
      <h3 class="font-medium text-foreground">Why On-Premise?</h3>
      <ul class="list-disc pl-5 space-y-2">
        <li>
          <strong>Intranet Latency Constraints:</strong> RFID-based gate entry requires sub-100ms response times for smooth throughput.
        </li>
        <li>
          <strong>Offline Resilience:</strong> The system continues operating during WAN outages using local buffering and queued ingestion.
        </li>
        <li>
          <strong>Strict Data Residency:</strong> Sensitive HR and payroll data remains inside internal infrastructure for compliance with the Philippine Data Privacy Act of 2012.
        </li>
      </ul>
    </div>

    <h2 class="font-medium text-lg text-foreground mt-8 mb-2">2. High-Level Components & Data Flows</h2>

    <p>
      The system is composed of four primary layers communicating over an internal network:
    </p>

    <!-- ARCHITECTURE DIAGRAM (RESTORED + FIXED) -->
    <div class="my-8 not-prose">
      <div class="rounded-xl border bg-background p-6">

        <div class="flex flex-col items-center gap-4">

          <div class="w-72 rounded-lg border bg-muted p-4 text-center">
            <div class="font-semibold">RFID Reader</div>
            <div class="text-xs text-muted-foreground">Edge Device</div>
          </div>

          <div class="text-muted-foreground">↓ HTTP Ingestion Request</div>

          <div class="w-72 rounded-lg border bg-muted p-4 text-center">
            <div class="font-semibold">Laravel API Layer</div>
            <div class="text-xs text-muted-foreground">REST + Authentication + Validation</div>
          </div>

          <div class="text-muted-foreground">↓ dispatch job</div>

          <div class="w-72 rounded-lg border bg-muted p-4 text-center">
            <div class="font-semibold">Laravel Queue (Redis)</div>
            <div class="text-xs text-muted-foreground">Asynchronous Event Processing Bus</div>
          </div>

          <div class="text-muted-foreground">↓ processed by</div>

          <div class="w-72 rounded-lg border bg-muted p-4 text-center">
            <div class="font-semibold">Laravel Queue Workers</div>
            <div class="text-xs text-muted-foreground">Horizon / Supervisor</div>
          </div>

          <div class="text-muted-foreground">↓ persist</div>

          <div class="w-72 rounded-lg border bg-muted p-4 text-center">
            <div class="font-semibold">PostgreSQL Database</div>
            <div class="text-xs text-muted-foreground">Relational + Event Ledger Schema</div>
          </div>

        </div>

      </div>
    </div>

    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Client Application Layer:</strong> Laravel Blade + frontend assets communicating via REST APIs.</li>
      <li><strong>API Service Layer:</strong> Laravel handles business logic (attendance, payroll, recruitment, reporting).</li>
      <li><strong>Message Ingestion Layer:</strong> Laravel Queue system (Redis) replaces external message brokers.</li>
      <li><strong>Database Layer:</strong> PostgreSQL with relational schema and append-only event ledger design.</li>
    </ul>

    <h3 class="font-medium text-base text-foreground mt-6 mb-2">ATS & Recruitment Component Interfaces</h3>

    <div class="grid gap-6 md:grid-cols-2 my-4">
      <figure class="rounded-lg border border-border overflow-hidden bg-secondary/5">
        <img class="w-full" src="{{ '/assets/projects/cameco-hris/job-posting-page.png' | relative_url }}" alt="Job Posting Page" />
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">
          Job Posting Page - Internal ATS module
        </figcaption>
      </figure>

      <figure class="rounded-lg border border-border overflow-hidden bg-secondary/5">
        <img class="w-full" src="{{ '/assets/projects/cameco-hris/career-page.png' | relative_url }}" alt="Career Page" />
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">
          Career Page - Public-facing recruitment portal
        </figcaption>
      </figure>
    </div>

    <h2 class="font-medium text-lg text-foreground mt-8 mb-2">3. Role-Based Access Control (RBAC) using Spatie</h2>

    <p>
      The system implements strict role-based access control using Laravel’s authorization layer powered by
      <strong>Spatie Laravel Permission</strong>.
    </p>

    <p>
      Authorization is enforced through middleware and policies rather than controller-level checks,
      ensuring consistent security across modules.
    </p>

    <h3 class="font-medium text-base text-foreground mt-4 mb-2">Authorization Mechanism</h3>

    <ul class="list-disc pl-5 space-y-2">
      <li>Users are assigned roles via Spatie role system</li>
      <li>Roles contain aggregated permissions</li>
      <li>Direct permissions can override role-level access when explicitly granted</li>
      <li>Permissions are cached using Laravel cache (Redis or file driver)</li>
    </ul>

    <p>
      Example middleware enforcement:
    </p>

    <pre><code>Route::middleware(['auth', 'role:HR Manager'])->group(function () {
    Route::get('/employees', [EmployeeController::class, 'index']);
});

Route::middleware(['auth', 'permission:view payroll'])->group(function () {
    Route::get('/payroll', [PayrollController::class, 'index']);
});</code></pre>

    <h3 class="font-medium text-base text-foreground mt-4 mb-2">Database Structure</h3>

    <ul class="list-disc pl-5 space-y-2">
      <li>users</li>
      <li>roles</li>
      <li>permissions</li>
      <li>model_has_roles</li>
      <li>model_has_permissions</li>
      <li>role_has_permissions</li>
    </ul>

    <h3 class="font-medium text-base text-foreground mt-4 mb-2">Security Model</h3>

    <ul class="list-disc pl-5 space-y-2">
      <li>Route middleware enforcement (early request blocking)</li>
      <li>Policy layer for model-level authorization</li>
      <li>Service-layer checks for sensitive business logic (payroll, approvals)</li>
    </ul>

    <h2 class="font-medium text-lg text-foreground mt-8 mb-2">4. Role-Based Dashboard Previews</h2>

    <p>
      The platform serves distinct dashboards tailored to each role’s operational scope:
    </p>

    <div class="grid gap-6 md:grid-cols-2 my-6">
      <figure class="rounded-lg border border-border overflow-hidden bg-secondary/5">
        <img class="w-full" src="{{ '/assets/projects/cameco-hris/superadmin-dashboard.png' | relative_url }}" alt="Superadmin Dashboard" />
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">
          Superadmin Dashboard
        </figcaption>
      </figure>

      <figure class="rounded-lg border border-border overflow-hidden bg-secondary/5">
        <img class="w-full" src="{{ '/assets/projects/cameco-hris/officeadmin-dashboard.png' | relative_url }}" alt="Office Admin Dashboard" />
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">
          Office Admin Dashboard
        </figcaption>
      </figure>

      <figure class="rounded-lg border border-border overflow-hidden bg-secondary/5">
        <img class="w-full" src="{{ '/assets/projects/cameco-hris/hrmanager-dashboard.png' | relative_url }}" alt="HR Manager Dashboard" />
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">
          HR Manager Dashboard
        </figcaption>
      </figure>

      <figure class="rounded-lg border border-border overflow-hidden bg-secondary/5">
        <img class="w-full" src="{{ '/assets/projects/cameco-hris/hrstaff-dashboard.png' | relative_url }}" alt="HR Staff Dashboard" />
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">
          HR Staff Dashboard
        </figcaption>
      </figure>

      <figure class="rounded-lg border border-border overflow-hidden bg-secondary/5 md:col-span-2">
        <img class="w-full" src="{{ '/assets/projects/cameco-hris/payroll-dashboard.png' | relative_url }}" alt="Payroll Dashboard" />
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">
          Payroll Dashboard
        </figcaption>
      </figure>
    </div>

    <h2 class="font-medium text-lg text-foreground mt-8 mb-2">5. Key Design Trade-offs</h2>

    <ul class="list-disc pl-5 space-y-3">
      <li>
        <strong>Strong Consistency vs Eventual Consistency:</strong> Core HR data uses ACID transactions, while RFID events are processed asynchronously via Laravel queues.
      </li>
      <li>
        <strong>No Direct Database Access (NDDA):</strong> All data mutations go through Laravel service layer; raw SQL operations are restricted.
      </li>
    </ul>

  </div>

  <div class="mt-8 pt-6 border-t border-border flex justify-between text-xs text-muted-foreground">
    <span>Last Updated: November 2025</span>
    <a href="../" class="text-blue-500 hover:underline">← Back to Specifications</a>
  </div>
</section>