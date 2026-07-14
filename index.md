---
layout: default
title: Home
---

<div class="relative min-h-screen bg-[#0b0c10] text-[#f5f5f7] pb-16 overflow-x-hidden flex flex-col justify-between">
  
  <!-- Flowy Wave Ribbon SVG Background -->
  <div class="absolute inset-0 -z-10 w-full h-full pointer-events-none overflow-hidden">
    <svg class="absolute min-w-[1000px] w-full h-[120%] -top-10 left-1/2 -translate-x-1/2 opacity-75 md:opacity-90 transition-opacity" 
         viewBox="0 0 1440 800" 
         fill="none" 
         xmlns="http://www.w3.org/2000/svg" 
         preserveAspectRatio="xMidYMid slice">
      <defs>
        <!-- Purple to Magenta Gradient Matching the Ref Image -->
        <linearGradient id="wave-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stop-color="#d946ef" /> <!-- Vibrant Magenta -->
          <stop offset="50%" stop-color="#a855f7" /> <!-- Rich Purple -->
          <stop offset="100%" stop-color="#6366f1" /> <!-- Deep Indigo -->
        </linearGradient>
      </defs>
      
      <!-- Multi-layered mathematical curves mimicking the high-end wireframe wave -->
      <g stroke="url(#wave-gradient)" stroke-width="1.2" opacity="0.85">
        <!-- Generates 12 nested lines with slight vertical offsets to create the 3D ribbon ribbon depth -->
        <path d="M-100,550 C150,550 250,750 550,750 C850,750 950,150 1250,150 C1450,150 1550,250 1650,250" />
        <path d="M-100,530 C150,530 250,730 550,730 C850,730 950,160 1250,160 C1450,160 1550,260 1650,260" />
        <path d="M-100,510 C150,510 250,710 550,710 C850,710 950,170 1250,170 C1450,170 1550,270 1650,270" />
        <path d="M-100,490 C150,490 250,690 550,690 C850,690 950,180 1250,180 C1450,180 1550,280 1650,280" />
        <path d="M-100,470 C150,470 250,670 550,670 C850,670 950,190 1250,190 C1450,190 1550,290 1650,290" />
        <path d="M-100,450 C150,450 250,650 550,650 C850,650 950,200 1250,200 C1450,200 1550,300 1650,300" />
        <path d="M-100,430 C150,430 250,630 550,630 C850,630 950,210 1250,210 C1450,210 1550,310 1650,310" />
        <path d="M-100,410 C150,410 250,610 550,610 C850,610 950,220 1250,220 C1450,220 1550,320 1650,320" />
        <path d="M-100,390 C150,390 250,590 550,590 C850,590 950,230 1250,230 C1450,230 1550,330 1650,330" />
        <path d="M-100,370 C150,370 250,570 550,570 C850,570 950,240 1250,240 C1450,240 1550,340 1650,340" />
        <path d="M-100,350 C150,350 250,550 550,550 C850,550 950,250 1250,250 C1450,250 1550,350 1650,350" />
      </g>
    </svg>
  </div>

  <!-- Main Responsive Container -->
  <section class="w-full max-w-4xl mx-auto px-6 pt-12 md:pt-20 space-y-16">

    <!-- Hero Section: Clean layout that stacks beautifully on mobile -->
    <div class="flex flex-col-reverse items-start gap-8 md:flex-row md:items-center md:justify-between">
      <div class="space-y-5 max-w-xl">
        <!-- Subtle Active Status Badge -->
        <div class="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-[#16171d]/80 px-3 py-1 text-xs font-mono text-neutral-400 backdrop-blur-sm">
          <span class="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Active C#/.NET Dev
        </div>
        
        <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
          Hi, I’m {{ site.author.name | default: 'Mark Anthony' }}.
        </h1>
        
        <p class="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-lg">
          I design and build modern web apps. Focused on <span class="text-white font-semibold">C#/.NET (ASP.NET Core)</span>, with range across Python FastAPI and Laravel.
        </p>
        
        <!-- Call to Actions -->
        <div class="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to={{ site.author.email }}" target="_blank" rel="noopener" class="rounded bg-white text-black px-5 py-2.5 hover:bg-neutral-200 transition-colors shadow-sm">
            Contact Me
          </a>
          <a href="{{ '/projects/' | relative_url }}" class="rounded border border-neutral-800 bg-[#16171d]/40 backdrop-blur-sm px-5 py-2.5 hover:bg-neutral-900/80 hover:border-neutral-700 transition-all">
            View projects
          </a>
          <a href="{{ '/blog/' | relative_url }}" class="rounded border border-neutral-800 bg-[#16171d]/40 backdrop-blur-sm px-5 py-2.5 hover:bg-neutral-900/80 hover:border-neutral-700 transition-all">
            Read blog
          </a>
          
          <!-- Socials with Clean Borders -->
          <div class="flex items-center gap-1 border-l border-neutral-800 pl-3">
            {% if site.author.socials.github %}
              <a href="https://github.com/{{ site.author.socials.github }}" target="_blank" rel="noopener" class="p-2 text-neutral-400 hover:text-white rounded hover:bg-neutral-900 transition-colors" title="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4.5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
            {% endif %}
            {% if site.author.socials.linkedin %}
              <a href="https://www.linkedin.com/in/{{ site.author.socials.linkedin }}" target="_blank" rel="noopener" class="p-2 text-neutral-400 hover:text-white rounded hover:bg-neutral-900 transition-colors" title="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            {% endif %}
          </div>
        </div>
      </div>

      <!-- Rounded Modern Profile Avatar -->
      <div class="relative shrink-0 mx-auto md:mx-0">
        <div class="absolute -inset-1 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 opacity-20 blur-md -z-10"></div>
        {% if site.author.avatar %}
          <img src="{{ site.author.avatar | relative_url }}" alt="{{ site.author.name }} avatar" class="h-28 w-28 sm:h-36 sm:w-36 rounded-full border-2 border-neutral-800 object-cover bg-neutral-900"/>
        {% else %}
          <div class="h-28 w-28 sm:h-36 sm:w-36 rounded-full border-2 border-neutral-800 bg-neutral-900 flex items-center justify-center text-2xl font-bold text-white">MA</div>
        {% endif %}
      </div>
    </div>

    <!-- Highlights Row: Solid boxes with minimal borders to let the wave shine through -->
    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      <article class="rounded-xl border border-neutral-900/80 bg-[#12131a]/60 p-5 transition-all hover:border-neutral-700 hover:bg-[#12131a]/90">
        <div class="flex items-center gap-2 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-400"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          <h2 class="font-bold text-sm text-white">What I do</h2>
        </div>
        <p class="text-xs sm:text-sm text-neutral-400 leading-relaxed">Full‑stack C#/.NET development (ASP.NET Core + MSSQL) with modern frontend tooling. I ship features end‑to‑end with maintainable code.</p>
      </article>

      <article class="rounded-xl border border-neutral-900/80 bg-[#12131a]/60 p-5 transition-all hover:border-neutral-700 hover:bg-[#12131a]/90">
        <div class="flex items-center gap-2 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <h2 class="font-bold text-sm text-white">How I work</h2>
        </div>
        <p class="text-xs sm:text-sm text-neutral-400 leading-relaxed">OOP + MVC, thoughtful data modeling, accessible UI, and pragmatic testing. I communicate clearly and iterate quickly.</p>
      </article>

      <article class="rounded-xl border border-neutral-900/80 bg-[#12131a]/60 p-5 transition-all hover:border-neutral-700 hover:bg-[#12131a]/90 sm:col-span-2 md:col-span-1">
        <div class="flex items-center gap-2 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-400"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
          <h2 class="font-bold text-sm text-white">Availability</h2>
        </div>
        <p class="text-xs sm:text-sm text-neutral-400 leading-relaxed">Open to full‑time and select freelance engagements. Let’s talk about your roadmap.</p>
      </article>
    </div>

    <!-- Featured Project -->
    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-semibold tracking-wider text-neutral-400 uppercase">Featured work</h2>
        <a href="{{ '/projects/' | relative_url }}" class="group text-xs text-neutral-400 hover:text-white inline-flex items-center gap-1 transition-colors">
          All projects 
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform group-hover:translate-x-0.5 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
      
      <article class="rounded-xl border border-neutral-900 bg-[#12131a]/40 backdrop-blur-sm overflow-hidden hover:border-neutral-800 transition-colors">
        <div class="grid md:grid-cols-2">
          <div class="relative overflow-hidden border-b border-neutral-900 md:border-b-0 md:border-r min-h-[200px]">
            <img src="{{ '/assets/projects/cameco-hris/landing-page.png' | relative_url }}" alt="Cameco HRIS preview" class="h-full w-full object-cover opacity-90"/>
          </div>
          <div class="p-6 flex flex-col gap-4 justify-between bg-[#12131a]/20">
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <h3 class="font-bold text-lg text-white">Cameco HRIS</h3>
                <span class="text-[9px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
                  Capstone
                </span>
              </div>
              <p class="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Enterprise Human Resource Information System featuring RFID-based attendance tracking, cryptographic event ledger, MQTT ingestion pipeline, and deterministic payroll computation engine with Philippine labor law compliance.
              </p>
            </div>
            
            <div class="pt-4 flex flex-wrap gap-2 text-xs font-semibold">
              <a href="{{ '/projects/cameco-hris/' | relative_url }}" class="rounded border border-neutral-800 bg-[#16171d]/80 px-3.5 py-2 hover:bg-neutral-900 transition-colors">
                Case study
              </a>
              <a href="{{ '/projects/cameco-hris/docs/' | relative_url }}" target="_blank" rel="noopener" class="rounded border border-neutral-800 bg-[#16171d]/80 px-3.5 py-2 hover:bg-neutral-900 transition-colors">
                Technical Specs
              </a>
            </div>
          </div>
        </div>
      </article>
    </section>

    <!-- Footer Contact Panel -->
    <div class="rounded-xl border border-neutral-900 bg-[#12131a]/60 p-6">
      <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="font-bold text-lg text-white">Let’s build something great.</h2>
          <p class="text-xs sm:text-sm text-neutral-400">Have a project in mind or a role to fill? I’m happy to chat.</p>
        </div>
        
        <div class="flex flex-wrap gap-2 text-xs font-semibold">
          <a href="{{ '/resume/#request' | relative_url }}" class="rounded border border-neutral-800 bg-neutral-950 px-3.5 py-2 hover:bg-neutral-900 transition-colors">
            Request resume
          </a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to={{ site.author.email }}" target="_blank" rel="noopener" class="rounded bg-white text-black px-4.5 py-2 hover:bg-neutral-200 transition-colors">
            Email me
          </a>
          
          {% if site.author.socials.github %}
            <a href="https://github.com/{{ site.author.socials.github }}" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 rounded border border-neutral-800 bg-neutral-950 px-3.5 py-2 hover:bg-neutral-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3.5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              GitHub
            </a>
          {% endif %}
          
          {% if site.author.socials.linkedin %}
            <a href="https://www.linkedin.com/in/{{ site.author.socials.linkedin }}" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 rounded border border-neutral-800 bg-neutral-950 px-3.5 py-2 hover:bg-neutral-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
            </a>
          {% endif %}
        </div>
      </div>
    </div>
    
  </section>
</div>
