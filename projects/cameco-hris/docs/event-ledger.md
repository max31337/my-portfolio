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
        Ensuring data integrity for timekeeping records using Laravel event-sourcing patterns and cryptographic hash chaining.
      </p>
    </div>
  </header>

  <div class="prose prose-sm dark:prose-invert max-w-none space-y-6 text-muted-foreground text-sm">

    <h2 class="font-medium text-lg text-foreground mb-2">
      1. The Problem: Internal Fraud & Audit Integrity
    </h2>

    <p>
      In enterprise HR systems, timekeeping data directly impacts payroll computation.
      A typical mutable database approach stores attendance in a standard relational table:
    </p>

    <pre class="bg-muted border rounded-md p-4 overflow-x-auto text-xs mb-4"><code>
UPDATE attendance
SET clock_in = '08:00:00'
WHERE id = 4529;
    </code></pre>

    <p>
      This approach is vulnerable to unauthorized modification from compromised application logic or privileged database access.
      Traditional audit logs reduce visibility but do not guarantee immutability because they can also be altered under high privilege access.
    </p>

    <h2 class="font-medium text-lg text-foreground mt-8 mb-2">
      2. The Solution: Append-Only Event Ledger
    </h2>

    <p>
      CAMECO HRIS uses an event-sourced ledger design where RFID timekeeping events are treated as immutable records.
      Instead of updating historical data, all changes are appended as new events.
      Each record is cryptographically linked to the previous entry using a hash chain.
    </p>

    <h3 class="font-medium text-base text-foreground mb-2">
      Database Schema
    </h3>

    <pre class="bg-muted border rounded-md p-4 overflow-x-auto text-xs text-foreground"><code>
CREATE TABLE rfid_ledger (
    id BIGSERIAL PRIMARY KEY,
    sequence_number BIGINT NOT NULL,
    event_uuid UUID NOT NULL UNIQUE,
    employee_id VARCHAR(50) NOT NULL,
    device_id VARCHAR(50) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    direction VARCHAR(20) NOT NULL, -- IN, OUT, CORRECTION_IN, CORRECTION_OUT
    previous_hash VARCHAR(64) NOT NULL,
    current_hash VARCHAR(64) NOT NULL
);

-- Restrict direct modification from non-service roles
REVOKE UPDATE, DELETE ON rfid_ledger FROM hr_staff_role, payroll_officer_role;
    </code></pre>

    <h3 class="font-medium text-base text-foreground mt-6 mb-2">
      Hash Computation Formula
    </h3>

    <p>
      Each new event computes its hash using the previous record’s hash as a dependency.
      To prevent ambiguity attacks, a canonical serialization format is required.
    </p>

    <div class="p-4 border border-border rounded bg-secondary/5 font-mono text-xs text-center text-foreground">
      SHA256(canonical_json(sequence_number, event_uuid, employee_id, device_id, timestamp, direction, previous_hash))
    </div>

    <h2 class="font-medium text-lg text-foreground mt-8 mb-2">
      3. Ledger Verification Worker
    </h2>

    <p>
      A background Laravel worker periodically validates ledger integrity. It performs:
    </p>

    <ol class="list-decimal pl-5 space-y-2">
      <li><strong>Sequence continuity:</strong> Ensures no missing or duplicated sequence numbers.</li>
      <li><strong>Hash chain validation:</strong> Ensures each record links correctly to the previous hash.</li>
      <li><strong>Payload integrity:</strong> Recomputes hashes and compares against stored values.</li>
    </ol>

    <p>
      If tampering occurs, either the hash validation fails or chain continuity breaks, allowing detection during verification cycles.
      Payroll processing can optionally be paused depending on system policy until integrity is restored.
    </p>

    <h2 class="font-medium text-lg text-foreground mt-8 mb-2">
      4. Handling Manual Corrections
    </h2>

    <p>
      Since historical mutation is disallowed, corrections are represented as new events appended to the ledger.
      These correction events reference the original record rather than modifying it.
    </p>

    <div class="my-6 p-4 border border-border rounded bg-secondary/5 font-mono text-xs text-foreground space-y-2">
      <div>[Seq 104] clock-in (Employee A) at 09:12 AM</div>
      <div>...</div>
      <div>[Seq 118] CORRECTION_IN (Employee A, ref Seq 104) adjusted to 08:30 AM (HR override)</div>
    </div>

    <p>
      During payroll computation, the system processes events sequentially and applies corrections in-memory,
      preserving both original and adjusted states for audit transparency.
    </p>

  </div>

  <div class="mt-8 pt-6 border-t border-border flex justify-between text-xs text-muted-foreground">
    <span>Last Updated: November 2025</span>
    <a href="../" class="text-blue-500 hover:underline">← Back to Specifications</a>
  </div>
</section>