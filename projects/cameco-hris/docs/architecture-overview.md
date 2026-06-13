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
          <strong>Intranet Latency Constraints:</strong> RFID-based gate entry requires sub-100ms response times to ensure uninterrupted employee flow.
        </li>
        <li>
          <strong>Offline Resilience:</strong> The system must continue operating even during WAN outages using local event buffering and queueing.
        </li>
        <li>
          <strong>Strict Data Residency:</strong> Employee and payroll data remain within internal infrastructure to comply with the Philippine Data Privacy Act of 2012.
        </li>
      </ul>
    </div>

    <h2 class="font-medium text-lg text-foreground mt-8 mb-2">2. High-Level Components & Data Flows</h2>

    <p>
      The platform consists of four decoupled layers communicating via an intranet network:
    </p>

    <!-- (Diagram unchanged for brevity, no architecture logic changes needed here) -->

    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Client Application Layer:</strong> Admin portal built with Laravel Blade + frontend assets, communicating via REST APIs.</li>
      <li><strong>API Service Layer:</strong> Laravel application handling business logic (scheduling, leave processing, payroll, reporting).</li>
      <li><strong>Message Ingestion Bus:</strong> MQTT/RabbitMQ broker decoupling RFID events from backend processing.</li>
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

    <h2 class="font-medium text-lg text-foreground mt-8 mb-2">3. Role-Based Access Control (RBAC) at API Level</h2>

    <p>
      The system implements strict role-based access control using Laravel’s authorization layer powered by the <strong>Spatie Laravel Permission</strong> package.
    </p>

    <p>
      Instead of embedding authorization logic inside controllers, access control is enforced via middleware and permission gates, ensuring consistent security across all modules.
    </p>

    <h3 class="font-medium text-base text-foreground mt-4 mb-2">Authorization Mechanism</h3>

    <p>
      At runtime, the authenticated user’s roles and permissions are resolved from the database and cached for performance. The system follows a hierarchical model:
    </p>

    <ul class="list-disc pl-5 space-y-2">
      <li>Users → Roles → Permissions</li>
      <li>Direct user permissions (optional overrides)</li>
      <li>Role-based aggregated permissions</li>
    </ul>

    <p>
      Access is enforced using Laravel middleware provided by Spatie:
    </p>

    <pre><code>Route::middleware(['auth', 'role:HR Manager'])->group(function () {
    Route::get('/employees', [EmployeeController::class, 'index']);
});</code></pre>

    <pre><code>Route::middleware(['auth', 'permission:view payroll'])->group(function () {
    Route::get('/payroll', [PayrollController::class, 'index']);
});</code></pre>

    <h3 class="font-medium text-base text-foreground mt-4 mb-2">Database Structure</h3>

    <p>
      The system uses Spatie’s standard RBAC schema:
    </p>

    <ul class="list-disc pl-5 space-y-2">
      <li>users</li>
      <li>roles</li>
      <li>permissions</li>
      <li>model_has_roles</li>
      <li>model_has_permissions</li>
      <li>role_has_permissions</li>
    </ul>

    <h3 class="font-medium text-base text-foreground mt-4 mb-2">Performance Optimization</h3>

    <p>
      Permissions are cached using Laravel’s caching system (typically Redis or file cache), reducing database load during frequent authorization checks such as dashboard rendering and RFID event processing.
    </p>

    <p>
      Cache invalidation is automatically handled when roles or permissions are updated.
    </p>

    <h3 class="font-medium text-base text-foreground mt-4 mb-2">Security Model</h3>

    <p>
      The system enforces authorization across multiple layers:
    </p>

    <ul class="list-disc pl-5 space-y-2">
      <li>Route middleware layer for early request blocking</li>
      <li>Policy layer for model-level constraints</li>
      <li>Service layer enforcement for critical business logic protection</li>
    </ul>

    <p>
      This layered model ensures defense-in-depth across payroll, attendance, recruitment, and administrative modules.
    </p>

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
        <strong>Strong Consistency vs Eventual Consistency:</strong> Core HR data uses ACID transactions, while RFID event ingestion is processed asynchronously.
      </li>
      <li>
        <strong>No Direct Database Access (NDDA):</strong> All database operations are mediated through application services; raw SQL operations are restricted.
      </li>
    </ul>

  </div>

  <div class="mt-8 pt-6 border-t border-border flex justify-between text-xs text-muted-foreground">
    <span>Last Updated: November 2025</span>
    <a href="../" class="text-blue-500 hover:underline">← Back to Specifications</a>
  </div>
</section>