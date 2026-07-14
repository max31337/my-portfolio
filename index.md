---
layout: default
title: Home
---

<div class="relative min-h-screen bg-background text-foreground pb-16">
  <!-- Next.js Style Dotted Matrix Grid (Crisp & Solid, No Blur) -->
  <div class="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none"></div>

  <section class="space-y-10 max-w-4xl mx-auto pt-8 px-4">
    
    <!-- Unique Element 1: Vercel-Style Dev Status & Command Menu Bar -->
    <div class="flex flex-wrap items-center justify-between gap-3 border border-border bg-card px-4 py-2.5 rounded-lg text-xs font-mono shadow-sm">
      <div class="flex items-center gap-3">
        <span class="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="text-muted-foreground">env: <span class="text-foreground">production</span></span>
        <span class="text-muted-foreground">|</span>
        <span class="text-muted-foreground">api_latency: <span class="text-foreground">14ms</span></span>
      </div>
      <div class="hidden sm:flex items-center gap-1.5 text-muted-foreground">
        <span>Press</span>
        <kbd class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground shadow-sm">⌘</kbd>
        <kbd class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground shadow-sm">K</kbd>
        <span>to search</span>
      </div>
    </div>

    <!-- Hero Section -->
    <div class="flex flex-col-reverse items-start gap-8 md:flex-row md:items-center md:justify-between pt-4">
      <div class="space-y-4 max-w-xl">
        <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
          Hi, I’m {{ site.author.name | default: 'Mark Anthony' }}.
        </h1>
        <p class="text-base sm:text-lg text-muted-foreground leading-relaxed">
          I design and build modern web apps. Focused on <span class="text-foreground font-semibold underline decoration-primary decoration-2 underline-offset-4">C#/.NET (ASP.NET Core)</span>, with range across Python FastAPI and Laravel.
        </p>
        
        <!-- Action Group -->
        <div class="pt-2 flex flex-wrap items-center gap-3 text-xs font-medium">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to={{ site.author.email }}" target="_blank" rel="noopener" class="rounded-md bg-foreground text-background px-4 py-2 shadow-sm transition-transform hover:-translate-y-0.5 active:translate-y-0">
            Contact Me
          </a>
          <a href="{{ '/projects/' | relative_url }}" class="rounded-md border border-border bg-card px-4 py-2 shadow-sm transition-colors hover:bg-muted">
            View projects
          </a>
          <a href="{{ '/blog/' | relative_url }}" class="rounded-md border border-border bg-card px-4 py-2 shadow-sm transition-colors hover:bg-muted">
            Read blog
          </a>
          
          <!-- Next.js Flat Social Connectors -->
          <div class="flex items-center gap-1 border-l border-border pl-3">
            {% if site.author.socials.github %}
              <a href="https://github.com/{{ site.author.socials.github }}" target="_blank" rel="noopener" class="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors" title="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
            {% endif %}
            {% if site.author.socials.linkedin %}
              <a href="https://www.linkedin.com/in/{{ site.author.socials.linkedin }}" target="_blank" rel="noopener" class="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors" title="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            {% endif %}
          </div>
        </div>
      </div>

      <!-- Sharp Frame Avatar -->
      <div class="relative">
        <!-- Rigid, double-border offset block instead of glowing gradients -->
        <div class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-foreground rounded-lg -z-10"></div>
        {% if site.author.avatar %}
          <img src="{{ site.author.avatar | relative_url }}" alt="{{ site.author.name }} avatar" class="h-28 w-28 sm:h-32 sm:w-32 rounded-lg border-2 border-foreground object-cover bg-card"/>
        {% else %}
          <div class="size-28 sm:size-32 rounded-lg border-2 border-foreground bg-card flex items-center justify-center text-xl font-mono font-bold">MA</div>
        {% endif %}
      </div>
    </div>

    <!-- Pillars / Highlights -->
    <div class="grid gap-4 md:grid-cols-3">
      <article class="rounded-lg border border-border bg-card p-5 transition-colors hover:border-foreground/30">
        <div class="flex items-center gap-2 mb-2 font-mono text-xs text-muted-foreground">
          <span>// 01</span>
          <h2 class="font-bold text-foreground text-sm">What I do</h2>
        </div>
        <p class="text-xs sm:text-sm text-muted-foreground leading-relaxed">Full‑stack C#/.NET development (ASP.NET Core + MSSQL) with modern frontend tooling. I ship features end‑to‑end with maintainable code.</p>
      </article>

      <article class="rounded-lg border border-border bg-card p-5 transition-colors hover:border-foreground/30">
        <div class="flex items-center gap-2 mb-2 font-mono text-xs text-muted-foreground">
          <span>// 02</span>
          <h2 class="font-bold text-foreground text-sm">How I work</h2>
        </div>
        <p class="text-xs sm:text-sm text-muted-foreground leading-relaxed">OOP + MVC, thoughtful data modeling, accessible UI, and pragmatic testing. I communicate clearly and iterate quickly.</p>
      </article>

      <article class="rounded-lg border border-border bg-card p-5 transition-colors hover:border-foreground/30">
        <div class="flex items-center gap-2 mb-2 font-mono text-xs text-muted-foreground">
          <span>// 03</span>
          <h2 class="font-bold text-foreground text-sm">Availability</h2>
        </div>
        <p class="text-xs sm:text-sm text-muted-foreground leading-relaxed">Open to full‑time and select freelance engagements. Let’s talk about your roadmap.</p>
      </article>
    </div>

    <!-- Featured project -->
    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-bold tracking-tight">Featured work</h2>
        <a href="{{ '/projects/' | relative_url }}" class="group text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors">
          See all projects 
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform group-hover:translate-x-0.5 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
      
      <!-- Unique Element 2: Vercel "Terminal Console" Case Study Container -->
      <article class="rounded-lg border border-border bg-card overflow-hidden shadow-sm hover:border-foreground/30 transition-colors">
        <!-- Terminal Header Controls -->
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/30">
          <div class="flex items-center gap-1.5">
            <span class="size-2.5 rounded-full bg-neutral-300 dark:bg-neutral-800"></span>
            <span class="size-2.5 rounded-full bg-neutral-300 dark:bg-neutral-800"></span>
            <span class="size-2.5 rounded-full bg-neutral-300 dark:bg-neutral-800"></span>
            <span class="text-[10px] font-mono text-muted-foreground ml-2">cameco-hris.cs</span>
          </div>
          <span class="text-[9px] font-mono bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded">
            Active Capstone
          </span>
        </div>

        <div class="grid md:grid-cols-2">
          <div class="relative overflow-hidden border-b border-border md:border-b-0 md:border-r">
            <img src="{{ '/assets/projects/cameco-hris/landing-page.png' | relative_url }}" alt="Cameco HRIS preview" class="h-full w-full object-cover"/>
          </div>
          <div class="p-6 flex flex-col gap-4">
            <h3 class="font-bold text-lg text-foreground">Cameco HRIS</h3>
            <p class="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Enterprise Human Resource Information System featuring RFID-based attendance tracking, cryptographic event ledger, MQTT ingestion pipeline, and deterministic payroll computation engine with Philippine labor law compliance.
            </p>
            
            <div class="mt-auto pt-4 flex gap-3 text-xs font-mono">
              <a href="{{ '/projects/cameco-hris/' | relative_url }}" class="rounded border border-border bg-background px-3 py-1.5 shadow-sm hover:bg-muted transition-colors">
                $ cat case_study.md
              </a>
              <a href="{{ '/projects/cameco-hris/docs/' | relative_url }}" target="_blank" rel="noopener" class="rounded border border-border bg-background px-3 py-1.5 shadow-sm hover:bg-muted transition-colors">
                $ view specs.json
              </a>
            </div>
          </div>
        </div>
      </article>
    </section>

    <!-- Contact CTA -->
    <div class="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="font-bold text-lg text-foreground">Let’s build something great.</h2>
          <p class="text-sm text-muted-foreground">Have a project in mind or a role to fill? I’m happy to chat.</p>
        </div>
        
        <div class="flex flex-wrap gap-2 text-xs font-mono">
          <a href="{{ '/resume/#request' | relative_url }}" class="rounded border border-border bg-background px-3 py-2 hover:bg-muted transition-colors">
            Request resume
          </a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to={{ site.author.email }}" target="_blank" rel="noopener" class="rounded bg-foreground text-background px-4 py-2 hover:opacity-90 transition-opacity">
            Email me
          </a>
          
          {% if site.author.socials.github %}
            <a href="https://github.com/{{ site.author.socials.github }}" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 rounded border border-border bg-background px-3 py-2 hover:bg-muted transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3.5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              GitHub
            </a>
          {% endif %}
          
          {% if site.author.socials.linkedin %}
            <a href="https://www.linkedin.com/in/{{ site.author.socials.linkedin }}" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 rounded border border-border bg-background px-3 py-2 hover:bg-muted transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
            </a>
          {% endif %}
        </div>
      </div>
    </div>
    
  </section>
</div>
