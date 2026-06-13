---
layout: default
title: Payroll & Compliance Engine - CAMECO HRIS
description: Deterministic payroll computation engine using immutable snapshot tables for audit-safe recalculation.
---

<style>
  .pay-page { font-family: inherit; }

  .pay-section-label {
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
  .pay-section-label span.dot {
    display: inline-block;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: currentColor;
  }

  .pay-h2 {
    font-size: 1.15rem;
    font-weight: 500;
    color: var(--color-text-primary, #1a1a1a);
    margin: 0 0 6px;
    letter-spacing: -0.01em;
  }
  .pay-h3 {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-text-primary, #1a1a1a);
    margin: 24px 0 8px;
  }
  .pay-p {
    font-size: 0.85rem;
    color: var(--color-text-secondary, #444);
    line-height: 1.75;
    margin: 0 0 14px;
  }
  .pay-ul {
    font-size: 0.85rem;
    color: var(--color-text-secondary, #444);
    line-height: 1.75;
    padding-left: 20px;
    margin: 0 0 14px;
  }
  .pay-ul li { margin-bottom: 5px; }

  .pay-divider {
    border: none;
    border-top: 1px solid var(--color-border-tertiary, rgba(0,0,0,0.08));
    margin: 40px 0;
  }

  /* Dark code block — identical to RFID page */
  .pay-code {
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
  .pay-code .kw  { color: #cba6f7; }
  .pay-code .st  { color: #a6e3a1; }
  .pay-code .nu  { color: #fab387; }
  .pay-code .key { color: #89b4fa; }
  .pay-code .val { color: #a6e3a1; }
  .pay-code .cm  { color: #6c7086; }
  .pay-code .fn  { color: #f38ba8; }
  .pay-code .op  { color: #cba6f7; }

  /* Diagram card — identical to RFID page */
  .pay-diagram-card {
    border: 1px solid var(--color-border-tertiary, rgba(0,0,0,0.1));
    border-radius: 12px;
    overflow: hidden;
    margin: 24px 0;
    background: var(--color-background-primary, #fff);
    padding: 8px 0 12px;
  }
  .pay-diagram-card svg { display: block; width: 100%; }

  /* Callout — amber variant for "audit risk" */
  .pay-callout {
    border: 1px solid rgba(186,117,23,0.28);
    border-left: 3px solid #BA7517;
    border-radius: 8px;
    padding: 14px 16px;
    background: rgba(186,117,23,0.05);
    font-size: 0.83rem;
    color: var(--color-text-secondary, #444);
    line-height: 1.7;
    margin: 12px 0 20px;
  }
  .pay-callout strong { color: #7A4B00; }
  @media (prefers-color-scheme: dark) {
    .pay-callout { background: rgba(186,117,23,0.10); border-left-color: #BA7517; }
    .pay-callout strong { color: #F0C060; }
  }

  /* Rule cards grid */
  .pay-rule-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    margin: 16px 0 24px;
  }
  .pay-rule-card {
    border: 1px solid var(--color-border-tertiary, rgba(0,0,0,0.1));
    border-radius: 10px;
    padding: 16px;
    background: var(--color-background-secondary, rgba(0,0,0,0.02));
  }
  .pay-rule-card .rcard-label {
    font-size: 0.72rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #185FA5;
    margin-bottom: 6px;
  }
  .pay-rule-card .rcard-title {
    font-size: 0.84rem;
    font-weight: 500;
    color: var(--color-text-primary, #1a1a1a);
    margin-bottom: 5px;
  }
  .pay-rule-card .rcard-desc {
    font-size: 0.80rem;
    color: var(--color-text-secondary, #555);
    line-height: 1.65;
  }
  .pay-rule-card .rcard-badge {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 600;
    font-family: ui-monospace, monospace;
    padding: 2px 7px;
    border-radius: 4px;
    margin-top: 6px;
  }
  .badge-green  { background: #e1f5ee; color: #085041; border: 1px solid #1D9E75; }
  .badge-blue   { background: #e6f1fb; color: #0c447c; border: 1px solid #378ADD; }
  .badge-orange { background: #faeeda; color: #633806; border: 1px solid #BA7517; }
  .badge-purple { background: #eeedfe; color: #3c3489; border: 1px solid #7F77DD; }
  @media (prefers-color-scheme: dark) {
    .badge-green  { background: rgba(29,158,117,0.15); color: #9FE1CB; }
    .badge-blue   { background: rgba(55,138,221,0.15); color: #B5D4F4; }
    .badge-orange { background: rgba(186,117,23,0.15); color: #FAC775; }
    .badge-purple { background: rgba(127,119,221,0.15); color: #CECBF6; }
  }

  /* Footer */
  .pay-footer {
    margin-top: 48px;
    padding-top: 20px;
    border-top: 1px solid var(--color-border-tertiary, rgba(0,0,0,0.08));
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    color: var(--color-text-tertiary, #888);
  }
  .pay-footer a { color: #185FA5; text-decoration: none; }
  .pay-footer a:hover { text-decoration: underline; }

  @media (max-width: 640px) {
    .pay-rule-grid { grid-template-columns: 1fr; }
  }
</style>

<section class="pay-page">

  <!-- ─── Header ─── -->
  <header style="margin-bottom: 36px;">
    <div class="pay-section-label"><span class="dot"></span> CAMECO HRIS · Capstone</div>
    <h1 style="font-size: 1.6rem; font-weight: 600; letter-spacing: -0.02em; margin: 0 0 10px; color: var(--color-text-primary, #1a1a1a);">
      Payroll &amp; compliance engine
    </h1>
    <p class="pay-p" style="max-width: 560px; margin: 0;">
      Deterministic payroll computation using immutable snapshot tables and a rule-based evaluation engine for audit-safe, fully reproducible recalculation.
    </p>
  </header>

  <!-- ─── Section 1: Problem ─── -->
  <div class="pay-section-label"><span class="dot"></span> 01 · Problem</div>
  <h2 class="pay-h2">Calculation contamination from live data mutation</h2>
  <p class="pay-p">
    Traditional payroll systems compute salaries directly against live relational data. Any mutation
    to an employee record, salary component, or timecard during an active run can silently shift
    results mid-calculation — producing figures that can never be reproduced exactly on re-run.
  </p>

  <div class="pay-callout">
    <strong>Audit failure mode:</strong> Payroll results that vary depending on <em>when</em> computation
    is executed make reconciliation unreliable. A re-run after a data correction cannot be trusted
    to match the original disbursement — breaking BIR audit trails.
  </div>

  <!-- Contamination diagram -->
  <div class="pay-diagram-card">
    <svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" role="img">
      <title>Live-data contamination problem</title>
      <desc>Concurrent writes to live employee tables corrupt in-flight payroll computation</desc>
      <defs>
        <marker id="ca" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
        <style>
          .ct { font-family: ui-sans-serif,sans-serif; font-size: 12px; font-weight: 500; }
          .cts{ font-family: ui-sans-serif,sans-serif; font-size: 10px; }
        </style>
      </defs>

      <!-- Live DB -->
      <rect x="30" y="64" width="140" height="72" rx="9"
        fill="#E6F1FB" stroke="#378ADD" stroke-width="0.8"/>
      <text class="ct" x="100" y="90" text-anchor="middle" dominant-baseline="central" fill="#0C447C">Live DB</text>
      <text class="cts" x="100" y="108" text-anchor="middle" dominant-baseline="central" fill="#185FA5">employees · timecards</text>
      <text class="cts" x="100" y="124" text-anchor="middle" dominant-baseline="central" fill="#185FA5">salary components</text>

      <!-- Payroll engine reads -->
      <line x1="170" y1="100" x2="220" y2="100" stroke="#378ADD" stroke-width="1.1" marker-end="url(#ca)"/>
      <text class="cts" x="195" y="90" text-anchor="middle" fill="#aaa">reads</text>

      <!-- Engine -->
      <rect x="222" y="52" width="156" height="96" rx="9"
        fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.8"/>
      <text class="ct" x="300" y="84" text-anchor="middle" dominant-baseline="central" fill="#3C3489">Payroll engine</text>
      <text class="cts" x="300" y="104" text-anchor="middle" dominant-baseline="central" fill="#534AB7">in-flight computation</text>
      <text class="cts" x="300" y="120" text-anchor="middle" dominant-baseline="central" fill="#534AB7">processing employees…</text>

      <!-- Concurrent write arrow (danger) -->
      <path d="M100 64 Q100 20 222 60" fill="none" stroke="#E24B4A" stroke-width="1.1" stroke-dasharray="5 3" marker-end="url(#ca)"/>
      <text class="cts" x="148" y="24" text-anchor="middle" fill="#A32D2D">concurrent write</text>
      <text class="cts" x="148" y="37" text-anchor="middle" fill="#A32D2D">(salary updated mid-run)</text>

      <!-- Output -->
      <line x1="378" y1="100" x2="426" y2="100" stroke="#bbb" stroke-width="1.1" marker-end="url(#ca)"/>

      <rect x="428" y="52" width="222" height="96" rx="9"
        fill="#FCEBEB" stroke="#E24B4A" stroke-width="0.8"/>
      <text class="ct" x="539" y="78" text-anchor="middle" dominant-baseline="central" fill="#791F1F">Non-deterministic output</text>
      <text class="cts" x="539" y="98" text-anchor="middle" dominant-baseline="central" fill="#A32D2D">run A ≠ run B (same period)</text>
      <text class="cts" x="539" y="114" text-anchor="middle" dominant-baseline="central" fill="#A32D2D">BIR audit reconciliation fails</text>

      <!-- X mark -->
      <text style="font-size:22px;font-weight:700;fill:#E24B4A;font-family:ui-sans-serif,sans-serif"
        x="492" y="148" text-anchor="middle">✕</text>
      <text class="cts" x="539" y="148" text-anchor="middle" dominant-baseline="central" fill="#A32D2D">unreproducible</text>
    </svg>
  </div>

  <hr class="pay-divider">

  <!-- ─── Section 2: State machine ─── -->
  <div class="pay-section-label"><span class="dot"></span> 02 · Architecture</div>
  <h2 class="pay-h2">Deterministic payroll state machine</h2>
  <p class="pay-p">
    Payroll execution is modeled as a deterministic state machine. The critical insight is the
    <strong>LOCKED</strong> state: once entered, a cutoff timestamp is frozen and all subsequent
    reads come from immutable snapshot tables — never from live data.
  </p>

  <!-- State machine diagram -->
  <div class="pay-diagram-card">
    <svg viewBox="0 0 680 460" xmlns="http://www.w3.org/2000/svg" role="img">
      <title>Payroll state machine — full lifecycle</title>
      <defs>
        <marker id="sm2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
        <style>
          .s2t  { font-family: ui-monospace,monospace; font-size: 13px; font-weight: 600; }
          .s2ts { font-family: ui-sans-serif,sans-serif; font-size: 10px; }
          .s2l  { font-family: ui-monospace,monospace; font-size: 10px; }
        </style>
      </defs>

      <!-- Envelope -->
      <rect x="60" y="22" width="560" height="416" rx="16"
        fill="none" stroke="#d0cec6" stroke-width="0.8" stroke-dasharray="6 4" opacity="0.5"/>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:11px;fill:#aaa" x="340" y="14" text-anchor="middle">payroll state machine · deterministic lifecycle</text>

      <!-- DRAFT -->
      <rect x="238" y="40" width="204" height="56" rx="10"
        fill="#FAEEDA" stroke="#BA7517" stroke-width="0.8"/>
      <text class="s2t" x="340" y="60" text-anchor="middle" dominant-baseline="central" fill="#633806">DRAFT</text>
      <text class="s2ts" x="340" y="80" text-anchor="middle" dominant-baseline="central" fill="#854F0B">editable · live data · no snapshot</text>

      <!-- DRAFT → LOCKED -->
      <line x1="340" y1="96" x2="340" y2="128" stroke="#bbb" stroke-width="1.2" marker-end="url(#sm2)"/>
      <text class="s2l" x="354" y="116" dominant-baseline="central" fill="#aaa">create_snapshot(cutoff_at)</text>

      <!-- LOCKED (highlighted) -->
      <rect x="213" y="130" width="254" height="76" rx="10"
        fill="#EEEDFE" stroke="#7F77DD" stroke-width="1.4"/>
      <rect x="209" y="126" width="262" height="84" rx="13"
        fill="none" stroke="#7F77DD" stroke-width="0.5" opacity="0.3"/>
      <text class="s2t" x="340" y="158" text-anchor="middle" dominant-baseline="central" fill="#3C3489">LOCKED</text>
      <text class="s2ts" x="340" y="177" text-anchor="middle" dominant-baseline="central" fill="#534AB7">cutoff timestamp immutable · snapshot materialized</text>
      <text class="s2ts" x="340" y="194" text-anchor="middle" dominant-baseline="central" fill="#534AB7">all reads come from snapshot tables only</text>
      <!-- badge -->
      <rect x="461" y="145" width="82" height="22" rx="5"
        fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.6"/>
      <text class="s2ts" x="502" y="156" text-anchor="middle" dominant-baseline="central" fill="#3C3489">key invariant</text>

      <!-- LOCKED → CALCULATING -->
      <line x1="340" y1="206" x2="340" y2="238" stroke="#bbb" stroke-width="1.2" marker-end="url(#sm2)"/>
      <text class="s2l" x="354" y="226" dominant-baseline="central" fill="#aaa">execute_rules_engine()</text>

      <!-- CALCULATING -->
      <rect x="228" y="240" width="224" height="56" rx="10"
        fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.8"/>
      <text class="s2t" x="340" y="260" text-anchor="middle" dominant-baseline="central" fill="#085041">CALCULATING</text>
      <text class="s2ts" x="340" y="280" text-anchor="middle" dominant-baseline="central" fill="#0F6E56">rules engine running · payslip lines materializing</text>

      <!-- Error branch -->
      <path d="M452 268 Q560 268 560 318" fill="none" stroke="#E24B4A" stroke-width="0.9" stroke-dasharray="4 3" marker-end="url(#sm2)"/>
      <text class="s2ts" x="516" y="291" text-anchor="middle" fill="#A32D2D">on error</text>
      <rect x="496" y="300" width="108" height="52" rx="8"
        fill="#FCEBEB" stroke="#E24B4A" stroke-width="0.7"/>
      <text class="s2t" x="550" y="320" text-anchor="middle" dominant-baseline="central" fill="#791F1F">ERROR</text>
      <text class="s2ts" x="550" y="338" text-anchor="middle" dominant-baseline="central" fill="#A32D2D">snapshot retained</text>
      <text class="s2ts" x="550" y="352" text-anchor="middle" dominant-baseline="central" fill="#A32D2D">re-runnable safely</text>

      <!-- CALCULATING → FINALIZED -->
      <line x1="340" y1="296" x2="340" y2="328" stroke="#bbb" stroke-width="1.2" marker-end="url(#sm2)"/>
      <text class="s2l" x="354" y="316" dominant-baseline="central" fill="#aaa">finalize_batch()</text>

      <!-- FINALIZED -->
      <rect x="213" y="330" width="254" height="68" rx="10"
        fill="#E6F1FB" stroke="#378ADD" stroke-width="0.8"/>
      <text class="s2t" x="340" y="357" text-anchor="middle" dominant-baseline="central" fill="#0C447C">FINALIZED</text>
      <text class="s2ts" x="340" y="377" text-anchor="middle" dominant-baseline="central" fill="#185FA5">immutable · payslips locked · BIR-auditable</text>

      <!-- Legend -->
      <rect x="112" y="416" width="10" height="10" rx="2" fill="#FAEEDA" stroke="#BA7517" stroke-width="0.7"/>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:11px;fill:#999" x="128" y="422" dominant-baseline="central">Draft</text>
      <rect x="170" y="416" width="10" height="10" rx="2" fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.7"/>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:11px;fill:#999" x="186" y="422" dominant-baseline="central">Locked</text>
      <rect x="252" y="416" width="10" height="10" rx="2" fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.7"/>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:11px;fill:#999" x="268" y="422" dominant-baseline="central">Calculating</text>
      <rect x="358" y="416" width="10" height="10" rx="2" fill="#E6F1FB" stroke="#378ADD" stroke-width="0.7"/>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:11px;fill:#999" x="374" y="422" dominant-baseline="central">Finalized</text>
      <rect x="450" y="416" width="10" height="10" rx="2" fill="#FCEBEB" stroke="#E24B4A" stroke-width="0.7"/>
      <text style="font-family:ui-sans-serif,sans-serif;font-size:11px;fill:#999" x="466" y="422" dominant-baseline="central">Error</text>

      <text style="font-family:ui-sans-serif,sans-serif;font-size:11px;fill:#ccc" x="340" y="448" text-anchor="middle">CAMECO HRIS — Payroll state machine</text>
    </svg>
  </div>

  <hr class="pay-divider">

  <!-- ─── Section 3: Snapshot generation ─── -->
  <div class="pay-section-label"><span class="dot"></span> 03 · Snapshots</div>
  <h2 class="pay-h2">Snapshot generation strategy</h2>
  <p class="pay-p">
    When a payroll period transitions to <strong>LOCKED</strong>, all required state is materialized
    into append-only snapshot tables using a single frozen <code>cutoff_at</code> timestamp.
    No live table is queried again after this point.
  </p>

  <!-- Snapshot isolation diagram -->
  <div class="pay-diagram-card">
    <svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" role="img">
      <title>Snapshot isolation strategy</title>
      <desc>Live tables are read once at cutoff, materialized into snapshot tables; rules engine reads only snapshots</desc>
      <defs>
        <marker id="sna" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
        <style>
          .snt  { font-family: ui-sans-serif,sans-serif; font-size: 12px; font-weight: 500; }
          .snts { font-family: ui-sans-serif,sans-serif; font-size: 10px; }
          .snl  { font-family: ui-monospace,monospace; font-size: 10px; }
        </style>
      </defs>

      <!-- Live tables column -->
      <text class="snts" x="120" y="32" text-anchor="middle" fill="#aaa" style="text-transform:uppercase;letter-spacing:.06em">live tables</text>
      <rect x="30" y="44" width="180" height="44" rx="8"
        fill="#E6F1FB" stroke="#378ADD" stroke-width="0.7"/>
      <text class="snt" x="120" y="66" text-anchor="middle" dominant-baseline="central" fill="#0C447C">employees</text>

      <rect x="30" y="98" width="180" height="44" rx="8"
        fill="#E6F1FB" stroke="#378ADD" stroke-width="0.7"/>
      <text class="snt" x="120" y="120" text-anchor="middle" dominant-baseline="central" fill="#0C447C">compiled_timecards</text>

      <rect x="30" y="152" width="180" height="44" rx="8"
        fill="#E6F1FB" stroke="#378ADD" stroke-width="0.7"/>
      <text class="snt" x="120" y="174" text-anchor="middle" dominant-baseline="central" fill="#0C447C">salary_components</text>

      <!-- Cutoff barrier -->
      <line x1="242" y1="28" x2="242" y2="232" stroke="#BA7517" stroke-width="1.5" stroke-dasharray="6 3"/>
      <rect x="218" y="100" width="48" height="60" rx="6" fill="#FAEEDA" stroke="#BA7517" stroke-width="0.7"/>
      <text class="snts" x="242" y="124" text-anchor="middle" dominant-baseline="central" fill="#633806" transform="rotate(-90,242,124)">cutoff_at</text>
      <text class="snts" x="220" y="20" fill="#BA7517">↓ one read</text>

      <!-- Snapshot tables column -->
      <text class="snts" x="450" y="32" text-anchor="middle" fill="#aaa" style="text-transform:uppercase;letter-spacing:.06em">snapshot tables · immutable</text>

      <rect x="310" y="44" width="240" height="44" rx="8"
        fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.7"/>
      <text class="snt" x="430" y="66" text-anchor="middle" dominant-baseline="central" fill="#085041">payroll_snapshot_employees</text>

      <rect x="310" y="98" width="240" height="44" rx="8"
        fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.7"/>
      <text class="snt" x="430" y="120" text-anchor="middle" dominant-baseline="central" fill="#085041">payroll_snapshot_timecards</text>

      <rect x="310" y="152" width="240" height="44" rx="8"
        fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.7"/>
      <text class="snt" x="430" y="174" text-anchor="middle" dominant-baseline="central" fill="#085041">payroll_snapshot_components</text>

      <!-- Arrows live → snapshot -->
      <line x1="210" y1="66"  x2="308" y2="66"  stroke="#1D9E75" stroke-width="1" marker-end="url(#sna)"/>
      <line x1="210" y1="120" x2="308" y2="120" stroke="#1D9E75" stroke-width="1" marker-end="url(#sna)"/>
      <line x1="210" y1="174" x2="308" y2="174" stroke="#1D9E75" stroke-width="1" marker-end="url(#sna)"/>

      <!-- Rules engine reads snapshots -->
      <rect x="310" y="210" width="240" height="36" rx="8"
        fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.7"/>
      <text class="snt" x="430" y="228" text-anchor="middle" dominant-baseline="central" fill="#3C3489">Rules engine → reads snapshots only</text>

      <!-- Arrows snapshots → rules -->
      <line x1="430" y1="196" x2="430" y2="208" stroke="#7F77DD" stroke-width="1" marker-end="url(#sna)"/>

      <text class="snts" x="340" y="250" text-anchor="middle" fill="#0F6E56">
        re-run any time · identical result guaranteed
      </text>
    </svg>
  </div>

  <h3 class="pay-h3">Snapshot SQL — employees &amp; timecards</h3>
  <code class="pay-code"><span class="cm">-- Snapshot employees at cutoff timestamp</span>
<span class="kw">INSERT INTO</span> payroll_snapshot_employees
  (period_id, employee_id, basic_salary, tax_status, sss_exempted)
<span class="kw">SELECT</span>
  <span class="nu">12</span>, id, basic_salary, tax_status, sss_exempted
<span class="kw">FROM</span> employees
<span class="kw">WHERE</span> is_active <span class="op">=</span> <span class="kw">TRUE</span>
  <span class="kw">AND</span> created_at <span class="op">&lt;=</span> <span class="key">:snapshot_cutoff_at</span>;

<span class="cm">-- Snapshot timecards at cutoff timestamp</span>
<span class="kw">INSERT INTO</span> payroll_snapshot_timecards
  (period_id, employee_id, date, raw_minutes_worked, tardy_minutes)
<span class="kw">SELECT</span>
  <span class="nu">12</span>, employee_id, date, minutes_worked, tardy_minutes
<span class="kw">FROM</span> compiled_timecards
<span class="kw">WHERE</span> date <span class="kw">BETWEEN</span> <span class="st">'2025-11-01'</span> <span class="kw">AND</span> <span class="st">'2025-11-15'</span>
  <span class="kw">AND</span> created_at <span class="op">&lt;=</span> <span class="key">:snapshot_cutoff_at</span>;</code>

  <hr class="pay-divider">

  <!-- ─── Section 4: Rules engine ─── -->
  <div class="pay-section-label"><span class="dot"></span> 04 · Rules engine</div>
  <h2 class="pay-h2">Philippine compliance rules engine</h2>
  <p class="pay-p">
    Computation is deterministic but rule-heavy. Each payroll line is produced by evaluating a configurable
    set of statutory and organizational rules against the frozen snapshot state.
  </p>

  <!-- Rules engine flow diagram -->
  <div class="pay-diagram-card">
    <svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" role="img">
      <title>Rules engine evaluation flow</title>
      <desc>Snapshot data flows into the rules evaluator, producing earnings and deduction line items</desc>
      <defs>
        <marker id="re" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
        <style>
          .rt  { font-family: ui-sans-serif,sans-serif; font-size: 12px; font-weight: 500; }
          .rts { font-family: ui-sans-serif,sans-serif; font-size: 10px; }
        </style>
      </defs>

      <!-- Snapshot input -->
      <rect x="30" y="80" width="144" height="60" rx="8"
        fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.7"/>
      <text class="rt" x="102" y="102" text-anchor="middle" dominant-baseline="central" fill="#085041">Snapshot tables</text>
      <text class="rts" x="102" y="122" text-anchor="middle" dominant-baseline="central" fill="#0F6E56">frozen at cutoff_at</text>

      <line x1="174" y1="110" x2="204" y2="110" stroke="#bbb" stroke-width="1.1" marker-end="url(#re)"/>

      <!-- Rules evaluator -->
      <rect x="206" y="56" width="200" height="108" rx="10"
        fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.8"/>
      <text class="rt" x="306" y="82" text-anchor="middle" dominant-baseline="central" fill="#3C3489">Rules evaluator</text>
      <text class="rts" x="306" y="102" text-anchor="middle" dominant-baseline="central" fill="#534AB7">OT multiplier · night diff</text>
      <text class="rts" x="306" y="118" text-anchor="middle" dominant-baseline="central" fill="#534AB7">holiday pay · tardy deduction</text>
      <text class="rts" x="306" y="134" text-anchor="middle" dominant-baseline="central" fill="#534AB7">SSS · PhilHealth · Pag-IBIG · BIR</text>

      <!-- Out arrows (fan) -->
      <line x1="406" y1="90"  x2="434" y2="66"  stroke="#7F77DD" stroke-width="1" opacity="0.7" marker-end="url(#re)"/>
      <line x1="406" y1="110" x2="434" y2="110" stroke="#7F77DD" stroke-width="1" opacity="0.7" marker-end="url(#re)"/>
      <line x1="406" y1="130" x2="434" y2="154" stroke="#7F77DD" stroke-width="1" opacity="0.7" marker-end="url(#re)"/>

      <!-- Earnings -->
      <rect x="436" y="40" width="214" height="40" rx="8"
        fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.7"/>
      <text class="rt" x="543" y="60" text-anchor="middle" dominant-baseline="central" fill="#085041">EARNING lines</text>

      <!-- Neutral / stat -->
      <rect x="436" y="90" width="214" height="40" rx="8"
        fill="#FAEEDA" stroke="#BA7517" stroke-width="0.7"/>
      <text class="rt" x="543" y="110" text-anchor="middle" dominant-baseline="central" fill="#633806">STATUTORY lines</text>

      <!-- Deductions -->
      <rect x="436" y="140" width="214" height="40" rx="8"
        fill="#FCEBEB" stroke="#E24B4A" stroke-width="0.7"/>
      <text class="rt" x="543" y="160" text-anchor="middle" dominant-baseline="central" fill="#791F1F">DEDUCTION / TAX lines</text>

      <!-- Bottom note -->
      <text class="rts" x="340" y="205" text-anchor="middle" fill="#aaa">each line is immutable once written to payslip_lines</text>
    </svg>
  </div>

  <!-- Rule cards -->
  <div class="pay-rule-grid">
    <div class="pay-rule-card">
      <div class="rcard-label">Earning</div>
      <div class="rcard-title">Overtime</div>
      <div class="rcard-desc">Base multiplier of 1.25× after 8 hours; configurable per employment classification.</div>
      <span class="rcard-badge badge-green">OT_REG · 1.25×</span>
    </div>
    <div class="pay-rule-card">
      <div class="rcard-label">Earning</div>
      <div class="rcard-title">Night differential</div>
      <div class="rcard-desc">+10% premium applied to hours worked between 10 PM and 6 AM.</div>
      <span class="rcard-badge badge-green">NIGHT_DIFF · +10%</span>
    </div>
    <div class="pay-rule-card">
      <div class="rcard-label">Earning</div>
      <div class="rcard-title">Holiday pay</div>
      <div class="rcard-desc">Rule-based multiplier depending on statutory classification — regular (×2) vs special non-working (×1.30).</div>
      <span class="rcard-badge badge-orange">HOL_REG · ×2.0</span>
    </div>
    <div class="pay-rule-card">
      <div class="rcard-label">Statutory</div>
      <div class="rcard-title">Government contributions</div>
      <div class="rcard-desc">SSS, PhilHealth, and Pag-IBIG computed from government-defined bracket tables.</div>
      <span class="rcard-badge badge-blue">SSS · PhilHealth · Pag-IBIG</span>
    </div>
    <div class="pay-rule-card">
      <div class="rcard-label">Tax</div>
      <div class="rcard-title">BIR withholding tax</div>
      <div class="rcard-desc">Monthly withholding tax computed from BIR Tax Table B based on taxable income after deductions.</div>
      <span class="rcard-badge badge-purple">TAX_BIR · TRAIN Law</span>
    </div>
    <div class="pay-rule-card">
      <div class="rcard-label">Deduction</div>
      <div class="rcard-title">Tardiness</div>
      <div class="rcard-desc">Tardy minutes deducted from gross at pro-rated daily rate; sourced from frozen timecard snapshot.</div>
      <span class="rcard-badge badge-orange">DED_TARDY · pro-rated</span>
    </div>
  </div>

  <hr class="pay-divider">

  <!-- ─── Section 5: Ledger materialization ─── -->
  <div class="pay-section-label"><span class="dot"></span> 05 · Ledger output</div>
  <h2 class="pay-h2">Payroll line materialization</h2>
  <p class="pay-p">
    Each payroll run produces an immutable set of <code>payslip_lines</code> records, one per earning
    or deduction code, keyed to a unique <code>payslip_id</code>. Idempotency is enforced at the
    application layer via batch ID guards — re-running the same snapshot always produces identical rows.
  </p>

  <!-- Ledger diagram -->
  <div class="pay-diagram-card">
    <svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" role="img">
      <title>Payslip ledger structure</title>
      <desc>payslip_lines table with earning, statutory, deduction, and tax rows keyed to payslip_id</desc>
      <defs>
        <marker id="ld" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
        <style>
          .lt  { font-family: ui-monospace,monospace; font-size: 11px; font-weight: 500; }
          .lts { font-family: ui-sans-serif,sans-serif; font-size: 10px; }
          .lh  { font-family: ui-sans-serif,sans-serif; font-size: 10px; font-weight: 600; }
        </style>
      </defs>

      <!-- Payslip node -->
      <rect x="30" y="80" width="140" height="60" rx="8"
        fill="#E6F1FB" stroke="#378ADD" stroke-width="0.7"/>
      <text style="font-family:ui-monospace,monospace;font-size:12px;font-weight:600"
        x="100" y="102" text-anchor="middle" dominant-baseline="central" fill="#0C447C">payslip</text>
      <text class="lts" x="100" y="122" text-anchor="middle" dominant-baseline="central" fill="#185FA5">id: 2048 · period_id: 12</text>

      <!-- Arrow payslip → lines -->
      <line x1="170" y1="110" x2="198" y2="110" stroke="#bbb" stroke-width="1.1" marker-end="url(#ld)"/>
      <text class="lts" x="184" y="100" text-anchor="middle" fill="#aaa">has many</text>

      <!-- payslip_lines table -->
      <rect x="200" y="20" width="460" height="180" rx="10"
        fill="var(--color-background-primary,#fff)" stroke="var(--color-border-tertiary,rgba(0,0,0,0.1))" stroke-width="0.8"/>

      <!-- Table header row -->
      <rect x="200" y="20" width="460" height="26" rx="10" fill="#E6F1FB"/>
      <rect x="200" y="33" width="460" height="13" fill="#E6F1FB"/>
      <text class="lh" x="216" y="33" dominant-baseline="central" fill="#0C447C">payslip_lines</text>
      <text class="lh" x="286" y="33" dominant-baseline="central" fill="#555">code</text>
      <text class="lh" x="386" y="33" dominant-baseline="central" fill="#555">description</text>
      <text class="lh" x="556" y="33" dominant-baseline="central" fill="#555">amount</text>
      <text class="lh" x="626" y="33" dominant-baseline="central" fill="#555">type</text>

      <!-- Divider -->
      <line x1="200" y1="46" x2="660" y2="46" stroke="rgba(0,0,0,0.07)" stroke-width="0.8"/>

      <!-- Row 1: BASIC -->
      <text class="lt" x="216" y="62" dominant-baseline="central" fill="#999">2048</text>
      <text class="lt" x="286" y="62" dominant-baseline="central" fill="#3C3489">BASIC</text>
      <text class="lts" x="386" y="62" dominant-baseline="central" fill="#444">Locked Basic Salary</text>
      <text class="lt" x="556" y="62" dominant-baseline="central" fill="#085041">+15,000.00</text>
      <rect x="620" y="53" width="34" height="16" rx="4" fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.5"/>
      <text class="lts" x="637" y="61" text-anchor="middle" dominant-baseline="central" fill="#085041">EARN</text>

      <line x1="210" y1="74" x2="650" y2="74" stroke="rgba(0,0,0,0.05)" stroke-width="0.7"/>

      <!-- Row 2: OT_REG -->
      <text class="lt" x="216" y="90" dominant-baseline="central" fill="#999">2048</text>
      <text class="lt" x="286" y="90" dominant-baseline="central" fill="#3C3489">OT_REG</text>
      <text class="lts" x="386" y="90" dominant-baseline="central" fill="#444">Regular Overtime</text>
      <text class="lt" x="556" y="90" dominant-baseline="central" fill="#085041">+625.50</text>
      <rect x="620" y="81" width="34" height="16" rx="4" fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.5"/>
      <text class="lts" x="637" y="89" text-anchor="middle" dominant-baseline="central" fill="#085041">EARN</text>

      <line x1="210" y1="102" x2="650" y2="102" stroke="rgba(0,0,0,0.05)" stroke-width="0.7"/>

      <!-- Row 3: DED_TARDY -->
      <text class="lt" x="216" y="118" dominant-baseline="central" fill="#999">2048</text>
      <text class="lt" x="286" y="118" dominant-baseline="central" fill="#3C3489">DED_TARDY</text>
      <text class="lts" x="386" y="118" dominant-baseline="central" fill="#444">Tardiness deduction</text>
      <text class="lt" x="556" y="118" dominant-baseline="central" fill="#A32D2D">−120.00</text>
      <rect x="614" y="109" width="46" height="16" rx="4" fill="#FCEBEB" stroke="#E24B4A" stroke-width="0.5"/>
      <text class="lts" x="637" y="117" text-anchor="middle" dominant-baseline="central" fill="#791F1F">DEDUCT</text>

      <line x1="210" y1="130" x2="650" y2="130" stroke="rgba(0,0,0,0.05)" stroke-width="0.7"/>

      <!-- Row 4: DED_SSS -->
      <text class="lt" x="216" y="146" dominant-baseline="central" fill="#999">2048</text>
      <text class="lt" x="286" y="146" dominant-baseline="central" fill="#3C3489">DED_SSS</text>
      <text class="lts" x="386" y="146" dominant-baseline="central" fill="#444">SSS Contribution</text>
      <text class="lt" x="556" y="146" dominant-baseline="central" fill="#A32D2D">−500.00</text>
      <rect x="612" y="137" width="50" height="16" rx="4" fill="#FAEEDA" stroke="#BA7517" stroke-width="0.5"/>
      <text class="lts" x="637" y="145" text-anchor="middle" dominant-baseline="central" fill="#633806">STATUT</text>

      <line x1="210" y1="158" x2="650" y2="158" stroke="rgba(0,0,0,0.05)" stroke-width="0.7"/>

      <!-- Row 5: TAX_BIR -->
      <text class="lt" x="216" y="174" dominant-baseline="central" fill="#999">2048</text>
      <text class="lt" x="286" y="174" dominant-baseline="central" fill="#3C3489">TAX_BIR</text>
      <text class="lts" x="386" y="174" dominant-baseline="central" fill="#444">BIR Withholding Tax</text>
      <text class="lt" x="556" y="174" dominant-baseline="central" fill="#A32D2D">−1,240.25</text>
      <rect x="620" y="165" width="34" height="16" rx="4" fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.5"/>
      <text class="lts" x="637" y="173" text-anchor="middle" dominant-baseline="central" fill="#3C3489">TAX</text>

      <text style="font-family:ui-sans-serif,sans-serif;font-size:10px;fill:#0F6E56" x="430" y="208" text-anchor="middle">idempotent · batch_id guarded · append-only</text>
    </svg>
  </div>

  <h3 class="pay-h3">Idempotent batch insert</h3>
  <code class="pay-code"><span class="cm">-- Idempotent payroll batch output (protected by batch_id in application layer)</span>
<span class="kw">INSERT INTO</span> payslip_lines (payslip_id, code, description, amount, type) <span class="kw">VALUES</span>
  (<span class="nu">2048</span>, <span class="st">'BASIC'</span>,     <span class="st">'Locked Basic Salary'</span>,  <span class="nu">15000.00</span>,  <span class="st">'EARNING'</span>),
  (<span class="nu">2048</span>, <span class="st">'OT_REG'</span>,    <span class="st">'Regular Overtime'</span>,     <span class="nu">625.50</span>,    <span class="st">'EARNING'</span>),
  (<span class="nu">2048</span>, <span class="st">'DED_TARDY'</span>, <span class="st">'Tardiness'</span>,           <span class="nu">-120.00</span>,   <span class="st">'DEDUCTION'</span>),
  (<span class="nu">2048</span>, <span class="st">'DED_SSS'</span>,   <span class="st">'SSS Contribution'</span>,    <span class="nu">-500.00</span>,   <span class="st">'STATUTORY'</span>),
  (<span class="nu">2048</span>, <span class="st">'TAX_BIR'</span>,   <span class="st">'Withholding Tax'</span>,     <span class="nu">-1240.25</span>,  <span class="st">'TAX'</span>);</code>

  <ul class="pay-ul">
    <li>Snapshot is frozen at <code>cutoff_at</code> — live data cannot contaminate results.</li>
    <li>Re-running the same period always produces byte-identical <code>payslip_lines</code>.</li>
    <li>Batch ID guard prevents double-insertion on retry without requiring <code>ON CONFLICT</code>.</li>
    <li>All lines are append-only — corrections open a new period, never mutate historical rows.</li>
  </ul>

  <!-- Footer -->
  <div class="pay-footer">
    <span>Last updated: November 2025</span>
    <a href="../">← Back to specifications</a>
  </div>

</section>