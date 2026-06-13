---
layout: default
title: Cryptographic Event Ledger - CAMECO HRIS
description: Inner workings of the append-only event-sourcing ledger, SHA-256 hashing chain, and historical integrity verification.
---

<section class="space-y-10">
  <header class="space-y-4">
    <div>
      <h1 class="text-3xl font-semibold tracking-tight">Cryptographic Event Ledger</h1>
      <p class="text-muted-foreground max-w-2xl">
        Ensuring absolute data integrity for timekeeping records using PostgreSQL event-sourcing and hash chains.
      </p>
    </div>
  </header>
<div class="prose prose-sm dark:prose-invert max-w-none space-y-6 text-muted-foreground text-sm">

    <h2 class="font-medium text-lg text-foreground mb-2">
        1. The Problem: Internal Fraud & Audit Integrity
    </h2>

    <p>
        In enterprise HR platforms, timekeeping data represents direct financial value:
        every recorded minute contributes to payroll payouts. A typical database design
        stores this in a mutable <code>attendance</code> table:
    </p>

    <pre class="bg-muted border rounded-md p-4 overflow-x-auto text-xs mb-4">
<code>UPDATE attendance
SET clock_in = '08:00:00'
WHERE id = 4529;</code>
    </pre>

    <p>
        This design is highly vulnerable. A malicious database administrator (DBA) or
        an HR staff member exploiting a SQL injection vulnerability can easily manipulate
        historic attendance logs to inflate wages or falsify attendance records.
        Standard audit tables are insufficient because a root database user can simply
        disable triggers or truncate the audit log.
    </p>

    <h2 class="font-medium text-lg text-foreground mt-8 mb-2">
        2. The Solution: Append-Only Cryptographic Chain
    </h2>

    <p>
        To solve this, I designed CAMECO HRIS's timekeeping module around an
        <strong>event-sourced, cryptographically chained ledger</strong>.
        In this model, physical card taps are treated as immutable events.
        The database table enforces append-only permissions, and each row is
        mathematically bound to the row before it, forming a blockchain-like hash chain.
    </p>

    <h3 class="font-medium text-base text-foreground mb-2">
        Database Schema
    </h3>

    <pre class="bg-muted border rounded-md p-4 overflow-x-auto text-xs text-foreground">
<code>CREATE TABLE rfid_ledger (
    sequence_number BIGINT PRIMARY KEY,
    event_uuid UUID NOT NULL UNIQUE,
    employee_id VARCHAR(50) NOT NULL,
    device_id VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    direction VARCHAR(20) NOT NULL, -- IN, OUT, CORRECTION_IN, CORRECTION_OUT
    previous_hash VARCHAR(64) NOT NULL,
    current_hash VARCHAR(64) NOT NULL
);</code>
    </pre>

</div>

-- Deny updates and deletes on the ledger table to standard database roles
REVOKE UPDATE, DELETE ON rfid_ledger FROM hr_staff_role, payroll_officer_role;</code></pre>

    <h3 class="font-medium text-base text-foreground mt-6 mb-2">Hash Computation Formula</h3>
    <p>
      When a new card tap is processed, the system reads the preceding row's <code>current_hash</code> and uses it as the <code>previous_hash</code> of the new row. The new row's <code>current_hash</code> is computed as:
    </p>
    <div class="p-4 border border-border rounded bg-secondary/5 font-mono text-xs text-center text-foreground">
      current_hash = SHA256(sequence_number || event_uuid || employee_id || device_id || timestamp || direction || previous_hash)
    </div>

    <h2 class="font-medium text-lg text-foreground mt-8 mb-2">3. The Ledger Verification Worker</h2>
    <p>
      A background validation service runs continuously to audit ledger health. The checker performs three checks:
    </p>
    <ol class="list-decimal pl-5 space-y-2">
      <li>
        <strong>Sequence Continuity:</strong> Asserts that there are no missing sequence numbers (e.g., verifying that sequence jumps are strictly incremental by 1).
      </li>
      <li>
        <strong>Hash Chain Continuity:</strong> Verifies that for every row <code>N</code> (where <code>N > 1</code>), the <code>previous_hash</code> field exactly matches the <code>current_hash</code> of row <code>N - 1</code>.
      </li>
      <li>
        <strong>Payload Signature Integrity:</strong> Re-computes the SHA-256 hash using the stored row columns and validates that it matches the stored <code>current_hash</code>.
      </li>
    </ol>
    
    <p>
      If a malicious actor alters a record directly in PostgreSQL, the signature check fails. If they attempt to recalculate the hash for that row, the following row's <code>previous_hash</code> mismatch immediately triggers a system alert, locking down payroll operations until verified.
    </p>

    <h2 class="font-medium text-lg text-foreground mt-8 mb-2">4. Handling Manual Corrections Without Mutation</h2>
    <p>
      In a real office environment, employees inevitably forget their RFID cards or make mistakes. Traditional systems handle corrections by updating the cell value. In our system, modifying historical records is impossible as it would invalidate the ledger's hash chain.
    </p>
    <p>
      To resolve this, manual adjustments are registered as <strong>Correction Events</strong> appended to the end of the ledger:
    </p>
    
    <div class="my-6 p-4 border border-border rounded bg-secondary/5 font-mono text-xs text-foreground space-y-2">
      <div>[Seq 104] clock-in (Employee A) at 09:12 AM (Hash: 9a3f...)</div>
      <div>...</div>
      <div>[Seq 118] CORRECTION_IN (Employee A, ref Seq 104) -> adjusted to 08:30 AM. Signed by HR Manager B. (Hash: fd2c...)</div>
    </div>

    <p>
      <strong>Calculation Playback:</strong> When the payroll engine compiles timesheets, it pulls all events chronologically for an employee. It maintains a state machine. When it encounters a <code>CORRECTION</code> event, the engine overrides the record of the referenced sequence ID in-memory. The audit history remains perfectly preserved: the developer can inspect both the original physical gate tap time and the manual manager correction side-by-side.
    </p>
  </div>

  <div class="mt-8 pt-6 border-t border-border flex justify-between text-xs text-muted-foreground">
    <span>Last Updated: November 2025</span>
    <a href="../" class="text-blue-500 hover:underline">← Back to Specifications</a>
  </div>
</section>
