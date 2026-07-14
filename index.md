---
layout: default
title: Home
---

<div class="relative min-h-screen bg-neutral-950 text-neutral-100 pb-16 overflow-hidden">
  
  <!-- Unique Element: High-Tech Blueprint SVG Vector Background -->
  <div class="absolute inset-0 -z-10 h-full w-full pointer-events-none opacity-[0.12] dark:opacity-[0.08]">
    <svg class="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Horizontal Grid Pattern -->
        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
        </pattern>
        <!-- Isometric Dot Pattern -->
        <pattern id="dot-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.25)" />
        </pattern>
      </defs>
      
      <!-- Solid Grid Backings -->
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      <rect width="100%" height="100%" fill="url(#dot-pattern)" class="translate-x-2 translate-y-2" />

      <!-- Architectural Tech Lines & Intersection Nodes -->
      <g stroke="rgba(255, 255, 255, 0.3)" stroke-width="1.5" fill="none">
        <line x1="10%" y1="0" x2="10%" y2="100%" stroke-dasharray="8 6" />
        <line x1="85%" y1="0" x2="85%" y2="100%" stroke-dasharray="4 8" />
        <line x1="0" y1="220" x2="100%" y2="220" />
        <line x1="0" y1="650" x2="100%" y2="650" stroke-dasharray="12 6" />
      </g>

      <!-- Glowing Vector Key-points -->
      <g fill="#ffffff" opacity="0.6">
        <circle cx="10%" cy="220" r="4" class="animate-pulse" />
        <circle cx="85%" cy="220" r="4" />
        <circle cx="85%" cy="650" r="4" />
        <!-- Accent Crosshairs -->
        <path d="M 35,220 L 45,220 M 40,215 L 40,225" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" />
      </g>
    </svg>
  </div>

  <!-- Soft Ambient Backdrop Glows -->
  <div class="absolute top-0 left-[20%] -z-10 h-[400px] w-[600px] rounded-full bg-neutral-800/20 blur-[140px] pointer-events-none"></div>

  <section class="space-y-12 max-w-4xl mx-auto pt-16 px-6">

    <!-- Hero Area -->
    <div class="flex flex-col-reverse items-start gap-8 md:flex-row md:items-center md:justify-between">
      <div class="space-y-5 max-w-xl">
        <div class="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs font-mono text-neutral-400">
          <span class="flex h-1.5 w-1.5 rounded-full bg-neutral-400"></span>
          portfolio_v2.0
        </div>
        
        <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl text-white">
          Hi, I’m {{ site.author.name | default: 'Mark Anthony' }}.
        </h1>
        
        <p class="text-base sm:text-lg text-neutral-400 leading-relaxed">
          I design and build modern web apps. Focused on <span class="text-white font-semibold">C#/.NET (ASP.NET Core)</span>, with range across Python FastAPI and Laravel.
        </p>
        
        <!-- Primary Actions -->
        <div class="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to={{ site.author.email }}" target="_blank" rel="noopener" class="rounded bg-white text-black px-4 py-2 hover:bg-neutral-200 transition-colors shadow-sm">
            Contact Me
          </a>
          <a href="{{ '/projects/' | relative_url }}" class="rounded border border-neutral-800 bg-neutral-900/40 px-4 py-2 hover:bg-neutral-900 hover:border-neutral-700 transition-colors">
            View projects
          </a>
          <a href="{{ '/blog/' | relative_url }}" class="rounded border border-neutral-800 bg-neutral-900/40 px-4 py-2 hover:bg-neutral-900 hover:border-neutral-700 transition-colors">
            Read blog
          </a>
          
          <!-- Next-style Clean Social Group -->
          <div class="flex items-center gap-1 border-l border-neutral-800 pl-3">
            {% if site.author.socials.github %}
              <a href="https://github.com/{{ site.author.socials.github }}" target="_blank" rel="noopener" class="p-2 text-neutral-400 hover:text-white rounded hover:bg-neutral-900 transition-colors" title="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
            {% endif %}
            {% if site.author.socials.linkedin %}
              <a href="https://www.linkedin.com/in/{{ site.author.socials.linkedin }}" target="_blank" rel="noopener" class="p-2 text-neutral-400 hover:text-white rounded hover:bg-neutral-900 transition-colors" title="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            {% endif %}
          </div>
        </div>
      </div>

      <!-- Clean Sharp Avatar Card -->
      <div class="relative">
        <div class="absolute -inset-1 rounded-lg bg-gradient-to-b from-neutral-800 to-transparent opacity-50 -z-10"></div>
        {% if site.author.avatar %}
          <img src="{{ site.author.avatar | relative_url }}" alt="{{ site.author.name }} avatar" class="h-28 w-28 sm:h-32 sm:w-32 rounded-lg border border-neutral-800 object-cover bg-neutral-900"/>
        {% else %}
          <div class="size-28 sm:size-32 rounded-lg border border-neutral-800 bg-neutral-900 flex items-center justify-center text-xl font-mono font-bold text-white">MA</div>
        {% endif %}
      </div>
    </div>

    <!-- Highlights Grid -->
    <div class="grid gap-4 md:grid-cols-3">
      <article class="rounded-lg border border-neutral-900 bg-neutral-950/40 p-5 transition-colors hover:border-neutral-800">
        <div class="flex items-center gap-2 mb-2 font-mono text-xs text-neutral-500">
          <span>[01]</span>
          <h2 class="font-bold text-neutral-200 text-sm">What I do</h2>
        </div>
        <p class="text-xs sm:text-sm text-neutral-400 leading-relaxed">Full‑stack C#/.NET development (ASP.NET Core + MSSQL) with modern frontend tooling. I ship features end‑to‑end with maintainable code.</p>
      </article>

      <article class="rounded-lg border border-neutral-900 bg-neutral-950/40 p-5 transition-colors hover:border-neutral-800">
        <div class="flex items-center gap-2 mb-2 font-mono text-xs text-neutral-500">
          <span>[02]</span>
          <h2 class="font-bold text-neutral-200 text-sm">How I work</h2>
        </div>
        <p class="text-xs sm:text-sm text-neutral-400 leading-relaxed">OOP + MVC, thoughtful data modeling, accessible UI, and pragmatic testing. I communicate clearly and iterate quickly.</p>
      </article>

      <article class="rounded-lg border border-neutral-900 bg-neutral-950/40 p-5 transition-colors hover:border-neutral-800">
        <div class="flex items-center gap-2 mb-2 font-mono text-xs text-neutral-500">
          <span>[03]</span>
          <h2 class="font-bold text-neutral-200 text-sm">Availability</h2>
        </div>
        <p class="text-xs sm:text-sm text-neutral-400 leading-relaxed">Open to full‑time and select freelance engagements. Let’s talk about your roadmap.</p>
      </article>
    </div>

    <!-- Featured project with sharp alignment -->
    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-mono tracking-wider text-neutral-400 uppercase">Featured work</h2>
        <a href="{{ '/projects/' | relative_url }}" class="group text-xs text-neutral-400 hover:text-white inline-flex items-center gap-1 transition-colors">
          All projects 
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform group-hover:translate-x-0.5 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
      
      <article class="rounded-lg border border-neutral-900 bg-neutral-950/20 overflow-hidden hover:border-neutral-800 transition-colors">
        <div class="grid md:grid-cols-2">
          <div class="relative overflow-hidden border-b border-neutral-900 md:border-b-0 md:border-r">
            <img src="{{ '/assets/projects/cameco-hris/landing-page.png' | relative_url }}" alt="Cameco HRIS preview" class="h-full w-full object-cover opacity-90"/>
          </div>
          <div class="p-6 flex flex-col gap-4 bg-neutral-950/40">
            <div class="flex items-center gap-2">
              <h3 class="font-bold text-lg text-white">Cameco HRIS</h3>
              <span class="text-[9px] font-mono bg-neutral-900 text-neutral-400 border border-neutral-800 px-2 py-0.5 rounded">
                Capstone
              </span>
            </div>
            <p class="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Enterprise Human Resource Information System featuring RFID-based attendance tracking, cryptographic event ledger, MQTT ingestion pipeline, and deterministic payroll computation engine with Philippine labor law compliance.
            </p>
            
            <div class="mt-auto pt-4 flex gap-3 text-xs font-mono">
              <a href="{{ '/projects/cameco-hris/' | relative_url }}" class="rounded border border-neutral-800 bg-neutral-950 px-3 py-1.5 hover:bg-neutral-900 transition-colors">
                read_case_study.sh
              </a>
              <a href="{{ '/projects/cameco-hris/docs/' | relative_url }}" target="_blank" rel="noopener" class="rounded border border-neutral-800 bg-neutral-950 px-3 py-1.5 hover:bg-neutral-900 transition-colors">
                view_specs.json
              </a>
            </div>
          </div>
        </div>
      </article>
    </section>

    <!-- Footer Contact -->
    <div class="rounded-lg border border-neutral-900 bg-neutral-950/40 p-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="font-bold text-lg text-white">Let’s build something great.</h2>
          <p class="text-xs sm:text-sm text-neutral-400">Have a project in mind or a role to fill? I’m happy to chat.</p>
        </div>
        
        <div class="flex flex-wrap gap-2 text-xs font-mono">
          <a href="{{ '/resume/#request' | relative_url }}" class="rounded border border-neutral-800 bg-neutral-950 px-3 py-2 hover:bg-neutral-900 transition-colors">
            Request resume
          </a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to={{ site.author.email }}" target="_blank" rel="noopener" class="rounded bg-white text-black px-4 py-2 hover:bg-neutral-200 transition-colors">
            Email me
          </a>
          
          {% if site.author.socials.github %}
            <a href="https://github.com/{{ site.author.socials.github }}" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 rounded border border-neutral-800 bg-neutral-950 px-3 py-2 hover:bg-neutral-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3.5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              GitHub
            </a>
          {% endif %}
          
          {% if site.author.socials.linkedin %}
            <a href="https://www.linkedin.com/in/{{ site.author.socials.linkedin }}" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 rounded border border-neutral-800 bg-neutral-950 px-3 py-2 hover:bg-neutral-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
            </a>
          {% endif %}
        </div>
      </div>
    </div>
    
  </section>
</div>
