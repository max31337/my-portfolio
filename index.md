---
layout: default
title: Home
---
<section class="space-y-10">
  <!-- Hero -->
  <div class="flex items-center gap-6">
    {% if site.author.avatar %}
    <img src="{{ site.author.avatar | relative_url }}" alt="{{ site.author.name }} avatar" class="h-28 w-28 sm:h-44 sm:w-44 rounded-full border border-border object-cover"/>
    {% else %}
    <div class="size-20 sm:size-24 rounded-full bg-gradient-to-tr from-primary to-muted"></div>
    {% endif %}
    <div>
      <h1 class="text-3xl font-semibold tracking-tight">Hi, I’m {{ site.author.name | default: 'Mark Anthony' }}.</h1>
      <p class="text-muted-foreground">I design and build modern web apps — focusing on clean architecture, performance, and a great user experience.</p>
      <div class="mt-3 flex flex-wrap gap-3 text-xs">
        <a href="{{ '/projects/' | relative_url }}" class="rounded-md border border-border px-3 py-1 hover:bg-secondary">View projects</a>
        <a href="{{ '/blog/' | relative_url }}" class="rounded-md border border-border px-3 py-1 hover:bg-secondary">Read blog</a>
  <a href="https://mail.google.com/mail/?view=cm&fs=1&to={{ site.author.email }}" target="_blank" rel="noopener" class="rounded-md border border-border px-3 py-1 hover:bg-secondary">Contact</a>
      </div>
    </div>
  </div>

  <!-- Highlights for employers/clients -->
  <div class="grid gap-4 md:grid-cols-3">
    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-1">What I do</h2>
      <p class="text-sm text-muted-foreground">Full‑stack web development with PHP 8, MySQL, and modern frontend tooling. I ship features end‑to‑end with maintainable code.</p>
    </article>
    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-1">How I work</h2>
      <p class="text-sm text-muted-foreground">OOP + MVC, thoughtful data modeling, accessible UI, and pragmatic testing. I communicate clearly and iterate quickly.</p>
    </article>
    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-1">Availability</h2>
      <p class="text-sm text-muted-foreground">Open to full‑time and select freelance engagements. Let’s talk about your roadmap.</p>
    </article>
  </div>

  <!-- Featured project -->
  <section class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-medium">Featured work</h2>
      <a href="{{ '/projects/' | relative_url }}" class="text-sm text-muted-foreground hover:text-foreground">See all</a>
    </div>
    <article class="rounded-lg border border-border overflow-hidden">
      <div class="grid md:grid-cols-2">
        <img src="{{ '/assets/projects/todo-app/dashboard-with-pending-task.png' | relative_url }}" alt="To‑Do App preview" class="h-full w-full object-cover border-b border-border md:border-b-0 md:border-r"/>
        <div class="p-5 flex flex-col gap-3">
          <h3 class="font-medium">To‑Do and Task Management App</h3>
          <p class="text-sm text-muted-foreground">PHP + MySQL MVC app with authentication, prioritized tasks, deadlines, lists, and an analytics dashboard (charts + pie).</p>
          <div class="mt-auto flex gap-3 text-xs">
            <a href="{{ '/projects/todo-app/' | relative_url }}" class="rounded-md border border-border px-3 py-1 hover:bg-secondary">Case study</a>
            <a href="https://github.com/{{ site.author.socials.github }}/ToDo-App" target="_blank" rel="noopener" class="rounded-md border border-border px-3 py-1 hover:bg-secondary">Source</a>
          </div>
        </div>
      </div>
    </article>
  </section>

  <!-- Contact CTA -->
  <div class="rounded-lg border border-border p-5">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="font-medium">Let’s build something great.</h2>
        <p class="text-sm text-muted-foreground">Have a project in mind or a role to fill? I’m happy to chat.</p>
      </div>
      <div class="flex gap-3 text-xs">
  <a href="https://mail.google.com/mail/?view=cm&fs=1&to={{ site.author.email }}" target="_blank" rel="noopener" class="rounded-md border border-border px-3 py-1 hover:bg-secondary">Email me</a>
        {% if site.author.socials.linkedin %}
        <a href="https://www.linkedin.com/in/{{ site.author.socials.linkedin }}" target="_blank" rel="noopener" class="rounded-md border border-border px-3 py-1 hover:bg-secondary">LinkedIn</a>
        {% endif %}
      </div>
    </div>
  </div>
</section>
