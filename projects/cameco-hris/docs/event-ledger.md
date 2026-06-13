---
layout: default
title: Cryptographic Event Ledger - CAMECO HRIS
description: Inner workings of the append-only event-sourcing ledger, SHA-256 hashing chain, and historical integrity verification.
---

<style>
  .led-page { font-family: inherit; }

  .led-section-label {
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
  .led-section-label span.dot {
    display: inline-block;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: currentColor;
  }

  .led-h2 {
    font-size: 1.15rem;
    font-weight: 500;
    color: var(--color-text-primary, #1a1a1a);
    margin: 0 0 6px 0;
    letter-spacing: -0.01em;
  }
  .led-h3 {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-text-primary, #1a1a1a);
    margin: 24px 0 8px 0;
  }
  .led-p {
    font-size: 0.85rem;
    color: var(--color-text-secondary, #444);
    line-height: 1.75;
    margin: 0 0 14px 0;
  }
  .led-ol {
    font-size: 0.85rem;
    color: var(--color-text-secondary, #444);
    line-height: 1.75;
    padding-left: 20px;
    margin: 0 0 14px 0;
  }
  .led-ol li { margin-bottom: 6px; }

  .led-divider {
    border: none;
    border-top: 1px solid var(--color-border-tertiary, rgba(0,0,0,0.08));
    margin: 40px 0;
  }

  /* Code blocks — high contrast in both modes */
  .led-code {
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
  /* SQL keyword coloring */
  .led-code .kw  { color: #cba6f7; } /* purple  – keywords */
  .led-code .ty  { color: #89b4fa; } /* blue    – types */
  .led-code .st  { color: #a6e3a1; } /* green   – strings / values */
  .led-code .cm  { color: #6c7086; } /* gray    – comments */
  .led-code .fn  { color: #89dceb; } /* cyan    – functions */
  .led-code .nu  { color: #fab387; } /* peach   – numbers */

  /* Formula box */
  .led-formula {
    border: 1px solid rgba(127,119,221,0.35);
    border-radius: 10px;
    padding: 16px 20px;
    background: rgba(127,119,221,0.06);
    font-family: ui-monospace, 'Cascadia Code', 'Fira Code', monospace;
    font-size: 0.8rem;
    color: #3C3489;
    text-align: center;
    margin: 12px 0 20px;
    letter-spacing: 0.01em;
  }
  @media (prefers-color-scheme: dark) {
    .led-formula {
      background: rgba(127,119,221,0.1);
      border-color: rgba(175,169,236,0.3);
      color: #CECBF6;
    }
  }

  /* Event stream box */
  .led-eventstream {
    border: 1px solid var(--color-border-tertiary, rgba(0,0,0,0.1));
    border-radius: 10px;
    padding: 16px 20px;
    background: var(--color-background-secondary, rgba(0,0,0,0.02));
    font-family: ui-monospace, 'Cascadia Code', 'Fira Code', monospace;
    font-size: 0.8rem;
    color: var(--color-text-secondary, #444);
    line-height: 2;
    margin: 12px 0 20px;
  }
  .led-eventstream .seq { color: #185FA5; font-weight: 500; }
  .led-eventstream .corr { color: #854F0B; font-weight: 500; }
  .led-eventstream .dim { color: var(--color-text-tertiary, #999); }

  /* Diagram card */
  .led-diagram-card {
    border: 1px solid var(--color-border-tertiary, rgba(0,0,0,0.1));
    border-radius: 12px;
    overflow: hidden;
    margin: 24px 0;
    background: var(--color-background-primary, #fff);
    padding: 8px 0 12px;
  }
  .led-diagram-card svg { display: block; width: 100%; }

  /* Callout */
  .led-callout {
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
  .led-callout strong { color: #A32D2D; }
  @media (prefers-color-scheme: dark) {
    .led-callout { background: rgba(226,75,74,0.08); border-color: rgba(226,75,74,0.3); border-left-color: #E24B4A; }
    .led-callout strong { color: #F09595; }
  }

  /* Footer */
  .led-footer {
    margin-top: 48px;
    padding-top: 20px;
    border-top: 1px solid var(--color-border-tertiary, rgba(0,0,0,0.08));
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    color: var(--color-text-tertiary, #888);
  }
  .led-footer a { color: #185FA5; text-decoration: none; }
  .led-footer a:hover { text-decoration: underline; }
</style>

<section class="led-page">

  <!-- Header -->
  <header style="margin-bottom: 36px;">
    <div class="led-section-label"><span class="dot"></span> CAMECO HRIS · Capstone</div>
    <h1 style="font-size: 1.6rem; font-weight: 600; letter-spacing: -0.02em; margin: 0 0 10px; color: var(--color-text-primary, #1a1a1a);">
      Cryptographic event ledger
    </h1>
    <p class="led-p" style="max-width: 560px; margin: 0;">
      Ensuring data integrity for timekeeping records using Laravel event-sourcing patterns and cryptographic hash chaining.
    </p>
  </header>

  <!-- ─── Section 1: Problem ─── -->
  <div class="led-section-label"><span class="dot"></span> 01 · Problem</div>
  <h2 class="led-h2">Internal fraud &amp; audit integrity</h2>
  <p class="led-p">
    In enterprise HR systems, timekeeping data directly impacts payroll computation.
    A typical mutable database approach stores attendance in a standard relational table:
  </p>

  <code class="led-code"><span class="kw">UPDATE</span> attendance
<span class="kw">SET</span>    clock_in <span class="kw">=</span> <span class="st">'08:00:00'</span>
<span class="kw">WHERE</span>  id <span class="kw">=</span> <span class="nu">4529</span>;</code>

  <div class="led-callout">
    <strong>Vulnerability:</strong> This approach is susceptible to unauthorized modification from compromised application logic or privileged database access.
    Traditional audit logs reduce visibility but do not guarantee immutability — they can also be altered under high-privilege access.
  </div>

  <hr class="led-divider">

  <!-- ─── Section 2: Solution ─── -->
  <div class="led-section-label"><span class="dot"></span> 02 · Solution</div>
  <h2 class="led-h2">Append-only event ledger</h2>
  <p class="led-p">
    CAMECO HRIS uses an event-sourced ledger design where RFID timekeeping events are treated as immutable records.
    Instead of updating historical data, all changes are appended as new events.
    Each record is cryptographically linked to the previous entry using a hash chain.
  </p>

  <!-- Hash chain diagram -->
  <div class="led-diagram-card">
    <svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" role="img">
      <title>Hash chain diagram</title>
      <desc>Each ledger event contains a hash of the previous record, forming a tamper-evident chain</desc>
      <defs>
        <marker id="harr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
        <style>
          .ht  { font-family: ui-sans-serif,sans-serif; font-size: 12px; font-weight: 500; }
          .hts { font-family: ui-monospace,'Fira Code',monospace; font-size: 10px; }
          .htl { font-family: ui-sans-serif,sans-serif; font-size: 10px; }
          @media (prefers-color-scheme: dark) {
            .hc-genesis-bg { fill: #2C2C2A; stroke: #888780; }
            .hc-genesis-t  { fill: #D3D1C7; }
            .hc-genesis-ts { fill: #B4B2A9; }
            .hc-block-bg   { fill: #26215C; stroke: #7F77DD; }
            .hc-block-t    { fill: #CECBF6; }
            .hc-block-ts   { fill: #AFA9EC; }
            .hc-hash-bg    { fill: #04342C; stroke: #1D9E75; }
            .hc-hash-ts    { fill: #9FE1CB; }
            .hc-arrow-line { stroke: #444441; }
          }
        </style>
      </defs>

      <!-- Genesis block -->
      <rect class="hc-genesis-bg" x="30" y="60" width="110" height="100" rx="8"
        fill="#F1EFE8" stroke="#888780" stroke-width="0.7"/>
      <text class="ht hc-genesis-t" x="85" y="84" text-anchor="middle" dominant-baseline="central" fill="#2C2C2A">Genesis</text>
      <text class="htl hc-genesis-ts" x="85" y="102" text-anchor="middle" dominant-baseline="central" fill="#5F5E5A">seq: 0</text>
      <rect class="hc-hash-bg" x="42" y="116" width="86" height="32" rx="5"
        fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.6"/>
      <text class="hts hc-hash-ts" x="85" y="132" text-anchor="middle" dominant-baseline="central" fill="#085041">hash: 0000…</text>

      <!-- Arrow -->
      <line class="hc-arrow-line" x1="140" y1="110" x2="168" y2="110" stroke="#ccc" stroke-width="1.2" marker-end="url(#harr)"/>
      <text class="htl" x="154" y="102" text-anchor="middle" fill="#aaa">prev_hash</text>

      <!-- Block 101 -->
      <rect class="hc-block-bg" x="170" y="48" width="148" height="124" rx="8"
        fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.7"/>
      <text class="ht hc-block-t" x="244" y="72" text-anchor="middle" dominant-baseline="central" fill="#3C3489">Event #101</text>
      <text class="htl hc-block-ts" x="244" y="90" text-anchor="middle" dominant-baseline="central" fill="#534AB7">emp: E-004 · IN</text>
      <text class="htl hc-block-ts" x="244" y="106" text-anchor="middle" dominant-baseline="central" fill="#534AB7">09:12 AM</text>
      <rect class="hc-hash-bg" x="182" y="118" width="124" height="42" rx="5"
        fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.6"/>
      <text class="hts hc-hash-ts" x="244" y="133" text-anchor="middle" dominant-baseline="central" fill="#085041">prev: 0000…</text>
      <text class="hts hc-hash-ts" x="244" y="149" text-anchor="middle" dominant-baseline="central" fill="#085041">hash: a3f9…</text>

      <!-- Arrow -->
      <line class="hc-arrow-line" x1="318" y1="110" x2="346" y2="110" stroke="#ccc" stroke-width="1.2" marker-end="url(#harr)"/>
      <text class="htl" x="332" y="102" text-anchor="middle" fill="#aaa">prev_hash</text>

      <!-- Block 102 -->
      <rect class="hc-block-bg" x="348" y="48" width="148" height="124" rx="8"
        fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.7"/>
      <text class="ht hc-block-t" x="422" y="72" text-anchor="middle" dominant-baseline="central" fill="#3C3489">Event #102</text>
      <text class="htl hc-block-ts" x="422" y="90" text-anchor="middle" dominant-baseline="central" fill="#534AB7">emp: E-011 · OUT</text>
      <text class="htl hc-block-ts" x="422" y="106" text-anchor="middle" dominant-baseline="central" fill="#534AB7">05:30 PM</text>
      <rect class="hc-hash-bg" x="360" y="118" width="124" height="42" rx="5"
        fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.6"/>
      <text class="hts hc-hash-ts" x="422" y="133" text-anchor="middle" dominant-baseline="central" fill="#085041">prev: a3f9…</text>
      <text class="hts hc-hash-ts" x="422" y="149" text-anchor="middle" dominant-baseline="central" fill="#085041">hash: d72c…</text>

      <!-- Arrow -->
      <line class="hc-arrow-line" x1="496" y1="110" x2="524" y2="110" stroke="#ccc" stroke-width="1.2" marker-end="url(#harr)"/>
      <text class="htl" x="510" y="102" text-anchor="middle" fill="#aaa">prev_hash</text>

      <!-- Block 103 (next) -->
      <rect x="526" y="78" width="124" height="64" rx="8"
        fill="none" stroke="#ccc" stroke-width="0.7" stroke-dasharray="5 3"/>
      <text class="htl" x="588" y="106" text-anchor="middle" dominant-baseline="central" fill="#bbb">next event…</text>

      <!-- Tamper note -->
      <text class="htl" x="340" y="200" text-anchor="middle" fill="#A32D2D">
        Mutating any record invalidates all subsequent hashes → tampering detected
      </text>
    </svg>
  </div>

  <h3 class="led-h3">Database schema</h3>

  <code class="led-code"><span class="kw">CREATE TABLE</span> rfid_ledger (
    id               <span class="ty">BIGSERIAL</span>    <span class="kw">PRIMARY KEY</span>,
    sequence_number  <span class="ty">BIGINT</span>       <span class="kw">NOT NULL</span>,
    event_uuid       <span class="ty">UUID</span>         <span class="kw">NOT NULL UNIQUE</span>,
    employee_id      <span class="ty">VARCHAR</span>(<span class="nu">50</span>)  <span class="kw">NOT NULL</span>,
    device_id        <span class="ty">VARCHAR</span>(<span class="nu">50</span>)  <span class="kw">NOT NULL</span>,
    timestamp        <span class="ty">TIMESTAMPTZ</span>  <span class="kw">NOT NULL</span>,
    direction        <span class="ty">VARCHAR</span>(<span class="nu">20</span>)  <span class="kw">NOT NULL</span>, <span class="cm">-- IN, OUT, CORRECTION_IN, CORRECTION_OUT</span>
    previous_hash    <span class="ty">VARCHAR</span>(<span class="nu">64</span>)  <span class="kw">NOT NULL</span>,
    current_hash     <span class="ty">VARCHAR</span>(<span class="nu">64</span>)  <span class="kw">NOT NULL</span>
);

<span class="cm">-- Restrict direct modification from non-service roles</span>
<span class="kw">REVOKE</span> <span class="kw">UPDATE</span>, <span class="kw">DELETE</span> <span class="kw">ON</span> rfid_ledger
    <span class="kw">FROM</span> hr_staff_role, payroll_officer_role;</code>

  <h3 class="led-h3">Hash computation formula</h3>
  <p class="led-p">
    Each new event computes its hash using the previous record's hash as a dependency.
    A canonical serialization format is required to prevent ambiguity attacks.
  </p>

  <div class="led-formula">SHA256( canonical_json( sequence_number, event_uuid, employee_id, device_id, timestamp, direction, previous_hash ) )</div>

  <hr class="led-divider">

  <!-- ─── Section 3: Verification worker ─── -->
  <div class="led-section-label"><span class="dot"></span> 03 · Verification</div>
  <h2 class="led-h2">Ledger verification worker</h2>
  <p class="led-p">
    A background Laravel worker periodically validates ledger integrity across three checks:
  </p>

  <!-- Verification diagram -->
  <div class="led-diagram-card">
    <svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" role="img">
      <title>Ledger verification flow</title>
      <desc>Worker runs three sequential checks: sequence continuity, hash chain validation, payload integrity</desc>
      <defs>
        <marker id="varr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
        <style>
          .vt  { font-family: ui-sans-serif,sans-serif; font-size: 12px; font-weight: 500; }
          .vts { font-family: ui-sans-serif,sans-serif; font-size: 10px; }
          @media (prefers-color-scheme: dark) {
            .vc-worker-bg { fill: #2C2C2A; stroke: #888780; }
            .vc-worker-t  { fill: #D3D1C7; }
            .vc-check-bg  { fill: #EEEDFE; stroke: #7F77DD; }
            .vc-check-t   { fill: #3C3489; }
            .vc-check-ts  { fill: #534AB7; }
            .vc-ok-bg     { fill: #E1F5EE; stroke: #1D9E75; }
            .vc-ok-t      { fill: #085041; }
            .vc-fail-bg   { fill: #FCEBEB; stroke: #E24B4A; }
            .vc-fail-t    { fill: #A32D2D; }
          }
        </style>
      </defs>

      <!-- Worker trigger -->
      <rect class="vc-worker-bg" x="24" y="72" width="88" height="56" rx="8"
        fill="#F1EFE8" stroke="#888780" stroke-width="0.7"/>
      <text class="vt vc-worker-t" x="68" y="94" text-anchor="middle" dominant-baseline="central" fill="#2C2C2A">Queue</text>
      <text class="vt vc-worker-t" x="68" y="112" text-anchor="middle" dominant-baseline="central" fill="#2C2C2A">worker</text>

      <line x1="112" y1="100" x2="138" y2="100" stroke="#ccc" stroke-width="1.2" marker-end="url(#varr)"/>

      <!-- Check 1 -->
      <rect class="vc-check-bg" x="140" y="62" width="130" height="76" rx="8"
        fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.7"/>
      <text class="vt vc-check-t" x="205" y="84" text-anchor="middle" dominant-baseline="central" fill="#3C3489">Sequence</text>
      <text class="vt vc-check-t" x="205" y="100" text-anchor="middle" dominant-baseline="central" fill="#3C3489">continuity</text>
      <text class="vts vc-check-ts" x="205" y="120" text-anchor="middle" dominant-baseline="central" fill="#534AB7">no gaps / dupes</text>

      <line x1="270" y1="100" x2="296" y2="100" stroke="#ccc" stroke-width="1.2" marker-end="url(#varr)"/>

      <!-- Check 2 -->
      <rect class="vc-check-bg" x="298" y="62" width="130" height="76" rx="8"
        fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.7"/>
      <text class="vt vc-check-t" x="363" y="84" text-anchor="middle" dominant-baseline="central" fill="#3C3489">Hash chain</text>
      <text class="vt vc-check-t" x="363" y="100" text-anchor="middle" dominant-baseline="central" fill="#3C3489">validation</text>
      <text class="vts vc-check-ts" x="363" y="120" text-anchor="middle" dominant-baseline="central" fill="#534AB7">prev_hash links</text>

      <line x1="428" y1="100" x2="454" y2="100" stroke="#ccc" stroke-width="1.2" marker-end="url(#varr)"/>

      <!-- Check 3 -->
      <rect class="vc-check-bg" x="456" y="62" width="130" height="76" rx="8"
        fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.7"/>
      <text class="vt vc-check-t" x="521" y="84" text-anchor="middle" dominant-baseline="central" fill="#3C3489">Payload</text>
      <text class="vt vc-check-t" x="521" y="100" text-anchor="middle" dominant-baseline="central" fill="#3C3489">integrity</text>
      <text class="vts vc-check-ts" x="521" y="120" text-anchor="middle" dominant-baseline="central" fill="#534AB7">recompute &amp; compare</text>

      <!-- Pass / fail outcomes -->
      <line x1="521" y1="138" x2="521" y2="158" stroke="#1D9E75" stroke-width="1" marker-end="url(#varr)"/>
      <rect class="vc-ok-bg" x="456" y="158" width="130" height="30" rx="6"
        fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.6"/>
      <text class="vts vc-ok-t" x="521" y="173" text-anchor="middle" dominant-baseline="central" fill="#085041">✓ Integrity confirmed</text>

      <line x1="205" y1="138" x2="205" y2="158" stroke="#E24B4A" stroke-width="1" stroke-dasharray="4 3" marker-end="url(#varr)"/>
      <rect class="vc-fail-bg" x="140" y="158" width="130" height="30" rx="6"
        fill="#FCEBEB" stroke="#E24B4A" stroke-width="0.6"/>
      <text class="vts vc-fail-t" x="205" y="173" text-anchor="middle" dominant-baseline="central" fill="#A32D2D">✗ Alert · pause payroll</text>
    </svg>
  </div>

  <ol class="led-ol">
    <li><strong>Sequence continuity</strong> — ensures no missing or duplicated sequence numbers.</li>
    <li><strong>Hash chain validation</strong> — ensures each record links correctly to the previous hash.</li>
    <li><strong>Payload integrity</strong> — recomputes hashes and compares against stored values.</li>
  </ol>

  <p class="led-p">
    If tampering occurs, either the hash validation fails or chain continuity breaks, allowing detection during verification cycles.
    Payroll processing can optionally be paused depending on system policy until integrity is restored.
  </p>

  <hr class="led-divider">

  <!-- ─── Section 4: Corrections ─── -->
  <div class="led-section-label"><span class="dot"></span> 04 · Corrections</div>
  <h2 class="led-h2">Handling manual corrections</h2>
  <p class="led-p">
    Since historical mutation is disallowed, corrections are represented as new events appended to the ledger.
    These correction events reference the original record rather than modifying it.
  </p>

  <div class="led-eventstream">
    <div><span class="seq">[Seq 101]</span> clock_in  · Employee A · <strong>09:12 AM</strong></div>
    <div><span class="seq">[Seq 102]</span> clock_out · Employee B · 06:00 PM</div>
    <div><span class="dim">...</span></div>
    <div><span class="seq">[Seq 117]</span> clock_in  · Employee C · 08:55 AM</div>
    <div><span class="corr">[Seq 118]</span> <span class="corr">CORRECTION_IN</span> · Employee A · ref Seq 101 · adjusted to <strong>08:30 AM</strong> <span class="dim">(HR override)</span></div>
  </div>

  <p class="led-p">
    During payroll computation, the system processes events sequentially and applies corrections in-memory,
    preserving both original and adjusted states for full audit transparency.
  </p>

  <!-- Correction diagram -->
  <div class="led-diagram-card">
    <svg viewBox="0 0 680 180" xmlns="http://www.w3.org/2000/svg" role="img">
      <title>Correction event diagram</title>
      <desc>Correction events append to the ledger and reference the original event without mutating it</desc>
      <defs>
        <marker id="carr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
        <style>
          .ct  { font-family: ui-sans-serif,sans-serif; font-size: 12px; font-weight: 500; }
          .cts { font-family: ui-sans-serif,sans-serif; font-size: 10px; }
          @media (prefers-color-scheme: dark) {
            .cc-orig-bg { fill: #26215C; stroke: #7F77DD; }
            .cc-orig-t  { fill: #CECBF6; }
            .cc-orig-ts { fill: #AFA9EC; }
            .cc-mid-bg  { fill: #2C2C2A; stroke: #444441; }
            .cc-mid-t   { fill: #888780; }
            .cc-corr-bg { fill: #412402; stroke: #BA7517; }
            .cc-corr-t  { fill: #FAC775; }
            .cc-corr-ts { fill: #EF9F27; }
            .cc-lock-bg { fill: #501313; stroke: #E24B4A; }
            .cc-lock-t  { fill: #F7C1C1; }
          }
        </style>
      </defs>

      <!-- Original event -->
      <rect class="cc-orig-bg" x="30" y="40" width="148" height="100" rx="8"
        fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.7"/>
      <text class="ct cc-orig-t" x="104" y="66" text-anchor="middle" dominant-baseline="central" fill="#3C3489">Seq 101 (original)</text>
      <text class="cts cc-orig-ts" x="104" y="84" text-anchor="middle" dominant-baseline="central" fill="#534AB7">clock_in · 09:12 AM</text>
      <rect class="cc-lock-bg" x="42" y="100" width="124" height="28" rx="5"
        fill="#FCEBEB" stroke="#E24B4A" stroke-width="0.6"/>
      <text class="cts cc-lock-t" x="104" y="114" text-anchor="middle" dominant-baseline="central" fill="#A32D2D">immutable · no UPDATE</text>

      <!-- Ellipsis -->
      <rect class="cc-mid-bg" x="210" y="76" width="70" height="48" rx="8"
        fill="#F1EFE8" stroke="#D3D1C7" stroke-width="0.6" stroke-dasharray="4 3"/>
      <text class="cts cc-mid-t" x="245" y="100" text-anchor="middle" dominant-baseline="central" fill="#888780">Seq 102…117</text>

      <!-- Chain arrows -->
      <line x1="178" y1="90" x2="208" y2="90" stroke="#ccc" stroke-width="1.2" marker-end="url(#carr)"/>
      <line x1="280" y1="90" x2="308" y2="90" stroke="#ccc" stroke-width="1.2" marker-end="url(#carr)"/>

      <!-- Correction event -->
      <rect class="cc-corr-bg" x="310" y="40" width="192" height="100" rx="8"
        fill="#FAEEDA" stroke="#BA7517" stroke-width="0.7"/>
      <text class="ct cc-corr-t" x="406" y="66" text-anchor="middle" dominant-baseline="central" fill="#633806">Seq 118 (correction)</text>
      <text class="cts cc-corr-ts" x="406" y="84" text-anchor="middle" dominant-baseline="central" fill="#854F0B">CORRECTION_IN · 08:30 AM</text>
      <text class="cts cc-corr-ts" x="406" y="100" text-anchor="middle" dominant-baseline="central" fill="#854F0B">ref: Seq 101 · HR override</text>
      <text class="cts cc-corr-ts" x="406" y="118" text-anchor="middle" dominant-baseline="central" fill="#854F0B">prev_hash: …d72c</text>

      <!-- ref arrow from correction back to original -->
      <path d="M406 140 Q406 160 245 160 Q104 160 104 140" fill="none" stroke="#BA7517" stroke-width="0.9" stroke-dasharray="5 3" marker-end="url(#carr)"/>
      <text class="cts" x="270" y="172" text-anchor="middle" fill="#854F0B">references original · does not mutate</text>

      <!-- Payroll consumer -->
      <rect x="530" y="64" width="120" height="52" rx="8"
        fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.7"/>
      <text class="ct" x="590" y="84" text-anchor="middle" dominant-baseline="central" fill="#085041">Payroll</text>
      <text class="cts" x="590" y="100" text-anchor="middle" dominant-baseline="central" fill="#0F6E56">applies correction</text>
      <text class="cts" x="590" y="114" text-anchor="middle" dominant-baseline="central" fill="#0F6E56">in-memory</text>
      <line x1="502" y1="90" x2="528" y2="90" stroke="#ccc" stroke-width="1.2" marker-end="url(#carr)"/>
    </svg>
  </div>

  <!-- Footer -->
  <div class="led-footer">
    <span>Last updated: November 2025</span>
    <a href="../">← Back to specifications</a>
  </div>

</section>