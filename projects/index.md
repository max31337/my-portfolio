---
layout: default
title: Projects
---
<section class="space-y-6">
  <header>
    <h1 class="text-3xl font-semibold tracking-tight">Projects</h1>
    <p class="text-muted-foreground">Selected work and experiments.</p>
  </header>
  <div class="grid gap-4 sm:grid-cols-2">
    <article class="rounded-lg border border-border p-4 hover:bg-accent">
      <a class="block" href="{{ '/projects/todo-app/' | relative_url }}">
        <img class="rounded-md border border-border mb-3" src="{{ '/assets/projects/todo-app/dashboard-with-completed-task.png' | relative_url }}" alt="To‑Do App preview" />
        <h2 class="font-medium">To‑Do and Task Management App</h2>
      </a>
      <p class="text-sm text-muted-foreground">PHP + MySQL MVC app with auth, prioritized tasks, lists, deadlines, and analytics (charts + pie).</p>
      <div class="mt-3 flex gap-3 text-xs">
        <a class="rounded-md border border-border px-2 py-1 hover:bg-secondary {% if nil %}pointer-events-none opacity-50{% endif %}" href="#">Demo</a>
        <a class="rounded-md border border-border px-2 py-1 hover:bg-secondary" href="https://github.com/max31337/ToDo-App" target="_blank" rel="noopener">Source</a>
      </div>
    </article>
  </div>
</section>
