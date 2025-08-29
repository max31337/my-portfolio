---
layout: default
title: GeoScope – IP Geolocation Dashboard
description: Full‑stack IP intelligence dashboard (Next.js 14 + Express) with guest + auth flows, map visualization, Redis-backed history, secure cookie auth, and dark/light theming.
hero:
  image: /assets/projects/geoscope/dashboard.png
links:
  repo: https://github.com/max31337/test-react-program
  live: https://test-react-program.vercel.app
status: Complete
---

<section class="space-y-10">
  <header class="space-y-4">
    <div>
      <h1 class="text-3xl font-semibold tracking-tight">{{ page.title }}</h1>
      <p class="text-muted-foreground max-w-2xl">{{ page.description }}</p>
      <div class="mt-2 text-[11px] inline-flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-2 py-1">
        <span class="size-2 rounded-full bg-emerald-500"></span>
        <span>Deployed & stable</span>
      </div>
    </div>
    <div class="flex flex-wrap items-center gap-2 text-[11px]">
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Next.js 14</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Express</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">TypeScript</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Tailwind CSS</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Leaflet</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Redis (Upstash)</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">JWT Auth</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Serverless</span>
    </div>
    <div class="flex gap-3 text-xs">
      <a class="rounded-md border border-border px-3 py-1 hover:bg-secondary" href="{{ page.links.live }}" target="_blank" rel="noopener">Live</a>
      <a class="rounded-md border border-border px-3 py-1 hover:bg-secondary" href="{{ page.links.repo }}" target="_blank" rel="noopener">Source</a>
    </div>
  </header>

  {% if page.hero.image %}
  <figure class="rounded-lg border border-border overflow-hidden">
    <button type="button" class="project-img-btn" data-img="{{ page.hero.image | relative_url }}" aria-label="View image">
      <img class="w-full" src="{{ page.hero.image | relative_url }}" alt="GeoScope dashboard" />
    </button>
    <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Authenticated dashboard (light mode)</figcaption>
  </figure>
  {% endif %}

  <div class="grid gap-6 md:grid-cols-2">
    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-2">Overview</h2>
      <p class="text-sm text-muted-foreground">GeoScope is a production‑ready IP geolocation intelligence dashboard: guest lookups, authenticated history, map visualization, secure cookie auth (JWT in HttpOnly, SameSite=Strict), and dark/light theming – all deployed as a single Vercel project (monorepo style) combining API + UI.</p>
    </article>
    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-2">Architecture</h2>
      <ul class="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
        <li>Monorepo: <code>api/</code> (Express) + <code>web/</code> (Next.js App Router)</li>
        <li>Serverless friendly: Vercel rewrites route <code>/api/*</code> → Express handler</li>
        <li>Data: JSON file store in dev, Upstash Redis in production</li>
        <li>Leaflet map dynamically imported to avoid SSR pitfalls</li>
        <li>Strict cookie security + helmet hardening headers</li>
      </ul>
    </article>
    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-2">Key Features</h2>
      <ul class="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
        <li>Guest + authenticated modes (history only for logged users)</li>
        <li>Searchable lookup history (Redis list + item keys)</li>
        <li>Bulk multi‑delete with pipelined Redis commands</li>
        <li>Dark/light theme with flicker‑free pre-hydration script</li>
        <li>Graceful invalid IP handling + modals</li>
      </ul>
    </article>
    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-2">Implementation Choices</h2>
      <ul class="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
        <li>Dynamic map import to avoid hydration mismatch</li>
        <li>Origin allow‑list from comma‑separated env var</li>
        <li>Conditional store factory (local JSON vs Redis)</li>
        <li>Optimistic auth flag + background cookie validation</li>
        <li>Pipelined deletes for performance</li>
      </ul>
    </article>
  </div>

  <div class="space-y-3">
    <h2 class="font-medium">Screens</h2>
    <div class="grid gap-4 md:grid-cols-2">
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/geoscope/login-page.png' | relative_url }}" aria-label="View image"><img class="w-full" src="{{ '/assets/projects/geoscope/login-page.png' | relative_url }}" alt="Login page" /></button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Login page</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/geoscope/guest-or-signin.png' | relative_url }}" aria-label="View image"><img class="w-full" src="{{ '/assets/projects/geoscope/guest-or-signin.png' | relative_url }}" alt="Guest prompt" /></button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Guest vs sign‑in prompt</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/geoscope/guest-dashboard.png' | relative_url }}" aria-label="View image"><img class="w-full" src="{{ '/assets/projects/geoscope/guest-dashboard.png' | relative_url }}" alt="Guest dashboard" /></button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Guest dashboard</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/geoscope/dashboard.png' | relative_url }}" aria-label="View image"><img class="w-full" src="{{ '/assets/projects/geoscope/dashboard.png' | relative_url }}" alt="Authenticated dashboard" /></button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Authenticated dashboard</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/geoscope/features-section.png' | relative_url }}" aria-label="View image"><img class="w-full" src="{{ '/assets/projects/geoscope/features-section.png' | relative_url }}" alt="Features section" /></button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Features section</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/geoscope/get-started-section.png' | relative_url }}" aria-label="View image"><img class="w-full" src="{{ '/assets/projects/geoscope/get-started-section.png' | relative_url }}" alt="Get started section" /></button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Get started section</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/geoscope/invalid-ip.png' | relative_url }}" aria-label="View image"><img class="w-full" src="{{ '/assets/projects/geoscope/invalid-ip.png' | relative_url }}" alt="Invalid IP modal" /></button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Invalid IP modal</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden md:col-span-2">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/geoscope/sample-dark-mode.png' | relative_url }}" aria-label="View image"><img class="w-full" src="{{ '/assets/projects/geoscope/sample-dark-mode.png' | relative_url }}" alt="Dark mode sample" /></button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Dark mode sample</figcaption>
      </figure>
    </div>
  </div>

  <div class="space-y-4">
    <h2 class="font-medium">Security: Current Protections</h2>
    <ul class="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
      <li>HttpOnly + SameSite=Strict auth cookie (Secure in production)</li>
      <li>helmet security headers (CSP enabled in production)</li>
      <li>CORS origin allow‑list (multi-environment support)</li>
      <li>No JWT in localStorage / sessionStorage (reduces XSS replay)</li>
      <li>Guest isolation (no history persistence)</li>
    </ul>
    <h3 class="font-medium">Known Vulnerabilities / Gaps (to address)</h3>
    <ul class="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
      <li>Plaintext password storage (needs hashing: bcrypt or argon2)</li>
      <li>Weak default JWT secret fallback ('dev-secret')</li>
      <li>No rate limiting / brute force protection</li>
      <li>No password strength / rotation policy</li>
      <li>No CSRF token (defense-in-depth)</li>
      <li>Possible user enumeration via distinct auth error responses</li>
      <li>No session revocation / rotation (static 1h lifetime)</li>
      <li>External geolocation data trusted (ensure escaped rendering)</li>
      <li>No per-IP throttling (potential abuse / DOS)</li>
      <li>IPv4 validation loose (does not enforce 0‑255 ranges)</li>
      <li>Missing audit / security logging</li>
      <li>Dev CSP less strict than prod; ensure parity</li>
      <li>Generic cookie name; consider __Host- prefix + opaque value</li>
      <li>No automated dependency scanning (Dependabot / npm audit)</li>
      <li>Check production error pages don't leak stack traces</li>
      <li>Future SSRF risk if arbitrary host lookups allowed</li>
    </ul>
  </div>

  <div class="space-y-4">
    <h2 class="font-medium">Local Development</h2>
    <pre class="text-xs rounded-lg border border-border bg-secondary/40 p-4 overflow-x-auto"><code>npm install
# Run API + Web concurrently (api:4000, web:3000)
npm run dev

# Build for production
npm run build

# Demo users
user1@example.com / password1
user2@example.com / password2
user3@example.com / password3</code></pre>
  </div>

  <div class="space-y-4">
    <h2 class="font-medium">Data Model (Conceptual)</h2>
    <pre class="text-xs rounded-lg border border-border bg-secondary/40 p-4 overflow-x-auto"><code>User { id, email, password }
HistoryItem { id, userId, ip, data, createdAt }
Redis Keys:
  user:email:&lt;email&gt;  -> User JSON
  history:list:&lt;userId&gt; (list of history item IDs)
  history:&lt;id&gt;        -> HistoryItem JSON</code></pre>
  </div>

  <div class="space-y-4">
    <h2 class="font-medium">Future Improvements</h2>
    <ul class="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
      <li>Password hashing + rate limiting</li>
      <li>CSRF protection + session rotation</li>
      <li>IPv6 support + stricter IP validation</li>
      <li>Heatmap / multi-point geolocation visualization</li>
      <li>Structured logging and metrics endpoint</li>
      <li>Admin console for user + usage management</li>
    </ul>
  </div>

  <div class="space-y-4">
    <h2 class="font-medium">Pitch</h2>
    <p class="text-sm text-muted-foreground">GeoScope showcases end‑to‑end delivery: typed backend APIs, responsive UI, authentication & session security, environment‑aware runtime, observable health endpoints, and a pragmatic path toward hardening & scalability.</p>
  </div>

  <!-- Modal for image pop-up -->
  <div id="img-modal" style="display:none;position:fixed;z-index:50;inset:0;background:rgba(0,0,0,0.85);align-items:center;justify-content:center;">
    <button id="img-modal-close" aria-label="Close image" style="position:absolute;top:0;right:0;padding:2rem 2rem 1rem 1rem;background:none;border:none;color:#fff;font-size:2rem;cursor:pointer;">&times;</button>
    <img id="img-modal-img" src="" alt="Project screenshot" style="max-width:90vw;max-height:90vh;border-radius:0.5rem;box-shadow:0 4px 32px #0008;" />
  </div>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const modal = document.getElementById('img-modal');
      const modalImg = document.getElementById('img-modal-img');
      const closeBtn = document.getElementById('img-modal-close');
      document.querySelectorAll('.project-img-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          modalImg.src = btn.getAttribute('data-img');
          modal.style.display = 'flex';
          modal.focus();
        });
      });
      function closeModal() {
        modal.style.display = 'none';
        modalImg.src = '';
      }
      closeBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
      });
      document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) closeModal();
      });
    });
  </script>
</section>
