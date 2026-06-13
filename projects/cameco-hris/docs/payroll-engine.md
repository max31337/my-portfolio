---
layout: default
title: Payroll & Compliance Engine - CAMECO HRIS
description: Deterministic payroll computation engine using immutable snapshot tables for audit-safe recalculation.
---

<section class="space-y-10">

  <!-- HEADER -->
  <header class="space-y-4">
    <div>
      <h1 class="text-3xl font-semibold tracking-tight">
        Payroll & Compliance Engine
      </h1>
      <p class="text-muted-foreground max-w-2xl">
        Deterministic payroll computation engine using immutable snapshot tables and rule-based evaluation for audit-safe recalculation.
      </p>
    </div>
  </header>

  <!-- SECTION 1 -->
  <section class="rounded-xl border bg-card p-8 space-y-6">

    <h2 class="text-lg font-semibold text-foreground">
      1. The Problem: Calculation Contamination
    </h2>

    <p class="text-sm text-muted-foreground">
      Traditional payroll systems compute salaries directly from live relational data. Any mutation during processing can change outputs mid-calculation, resulting in non-reproducible financial results.
    </p>

    <p class="text-sm text-muted-foreground">
      This creates a critical failure mode: payroll results that vary depending on when computation is executed, making audit reconciliation unreliable.
    </p>

  </section>

  <!-- SECTION 2 -->
  <section class="rounded-xl border bg-card p-8 space-y-6">

    <h2 class="text-lg font-semibold text-foreground">
      2. Deterministic Payroll State Machine (Snapshot-Based Execution)
    </h2>

    <p class="text-sm text-muted-foreground">
      Payroll execution is modeled as a deterministic state machine operating over immutable snapshot tables generated at a fixed cutoff timestamp.
    </p>

    <!-- STATE MACHINE DIAGRAM -->
    <div class="not-prose my-6">
      <div class="rounded-xl border bg-background p-6">

        <div class="flex flex-col items-center gap-4 font-mono text-sm">

          <div class="rounded-lg border bg-muted px-4 py-2">
            DRAFT
          </div>

          <div class="text-muted-foreground">↓ create snapshot (cutoff timestamp locked)</div>

          <div class="rounded-lg border bg-muted px-4 py-2">
            LOCKED
          </div>

          <div class="text-muted-foreground">↓ execute rules engine</div>

          <div class="rounded-lg border bg-muted px-4 py-2">
            CALCULATING
          </div>

          <div class="text-muted-foreground">↓ finalize payroll batch</div>

          <div class="rounded-lg border bg-muted px-4 py-2">
            FINALIZED
          </div>

        </div>

      </div>
    </div>

  </section>

  <!-- SECTION 3 -->
  <section class="rounded-xl border bg-card p-8 space-y-6">

    <h2 class="text-lg font-semibold text-foreground">
      3. Snapshot Generation Strategy
    </h2>

    <p class="text-sm text-muted-foreground">
      Once locked, payroll execution materializes all required state into immutable snapshot tables using a fixed cutoff timestamp to ensure deterministic recomputation.
    </p>

    <div class="not-prose rounded-lg border bg-muted p-4 overflow-x-auto">
<pre class="text-xs font-mono text-foreground">-- Snapshot employees at cutoff timestamp
INSERT INTO payroll_snapshot_employees (period_id, employee_id, basic_salary, tax_status, sss_exempted)
SELECT 12, id, basic_salary, tax_status, sss_exempted
FROM employees
WHERE is_active = TRUE
AND created_at <= :snapshot_cutoff_at;

-- Snapshot timecards at cutoff timestamp
INSERT INTO payroll_snapshot_timecards (period_id, employee_id, date, raw_minutes_worked, tardy_minutes)
SELECT 12, employee_id, date, minutes_worked, tardy_minutes
FROM compiled_timecards
WHERE date BETWEEN '2025-11-01' AND '2025-11-15'
AND created_at <= :snapshot_cutoff_at;</pre>
    </div>

  </section>

  <!-- SECTION 4 -->
  <section class="rounded-xl border bg-card p-8 space-y-6">

    <h2 class="text-lg font-semibold text-foreground">
      4. Philippine Compliance Rules Engine
    </h2>

    <p class="text-sm text-muted-foreground">
      Payroll computation is deterministic but rule-heavy, requiring a configurable rules engine based on statutory labor classifications and organizational policies.
    </p>

    <!-- RULE CARDS -->
    <div class="grid md:grid-cols-2 gap-4 not-prose">

      <div class="rounded-lg border bg-muted p-4">
        <div class="font-semibold">Overtime</div>
        <div class="text-sm text-muted-foreground">Base multiplier: 1.25x after 8 hours (configurable rule)</div>
      </div>

      <div class="rounded-lg border bg-muted p-4">
        <div class="font-semibold">Night Differential</div>
        <div class="text-sm text-muted-foreground">+10% (10PM–6AM window)</div>
      </div>

      <div class="rounded-lg border bg-muted p-4">
        <div class="font-semibold">Holiday Pay</div>
        <div class="text-sm text-muted-foreground">Rule-based multiplier depending on statutory classification</div>
      </div>

      <div class="rounded-lg border bg-muted p-4">
        <div class="font-semibold">Statutory Deductions</div>
        <div class="text-sm text-muted-foreground">SSS / PhilHealth / Pag-IBIG (government-defined rates)</div>
      </div>

    </div>

  </section>

  <!-- SECTION 5 -->
  <section class="rounded-xl border bg-card p-8 space-y-6">

    <h2 class="text-lg font-semibold text-foreground">
      5. Payroll Line Materialization
    </h2>

    <p class="text-sm text-muted-foreground">
      Payroll results are materialized as immutable ledger entries tied to a unique payroll batch to ensure idempotent execution.
    </p>

    <div class="not-prose rounded-lg border bg-muted p-4 overflow-x-auto">
<pre class="text-xs font-mono text-foreground">-- Idempotent payroll batch output (protected by batch_id in application layer)
INSERT INTO payslip_lines (payslip_id, code, description, amount, type) VALUES
(2048, 'BASIC', 'Locked Basic Salary', 15000.00, 'EARNING'),
(2048, 'OT_REG', 'Regular Overtime', 625.50, 'EARNING'),
(2048, 'DED_TARDY', 'Tardiness', -120.00, 'DEDUCTION'),
(2048, 'DED_SSS', 'SSS Contribution', -500.00, 'STATUTORY'),
(2048, 'TAX_BIR', 'Withholding Tax', -1240.25, 'TAX');</pre>
    </div>

  </section>

  <!-- FOOTER -->
  <div class="mt-8 pt-6 border-t border-border flex justify-between text-xs text-muted-foreground">
    <span>Last Updated: November 2025</span>
    <a href="../" class="text-blue-500 hover:underline">
      ← Back to Specifications
    </a>
  </div>

</section>