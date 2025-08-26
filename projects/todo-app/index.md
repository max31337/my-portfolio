---
layout: default
title: To‑Do and Task Management App
description: A PHP + MySQL MVC to‑do app with auth, lists, priorities, deadlines, and analytics.
hero:
  image: /assets/projects/todo-app/dashboard-with-pending-task.png
links:
  repo: https://github.com/max31337/ToDo-App
  live:
---

<section class="space-y-10">
  <header class="space-y-4">
    <div>
      <h1 class="text-3xl font-semibold tracking-tight">{{ page.title }}</h1>
      <p class="text-muted-foreground max-w-2xl">{{ page.description }}</p>
    </div>
    <div class="flex flex-wrap items-center gap-2 text-[11px]">
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">PHP 8</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">MySQL</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">MVC</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">OOP</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Composer</span>
    </div>
    <div class="flex gap-3 text-xs">
      <a class="rounded-md border border-border px-3 py-1 hover:bg-secondary {% unless page.links.live %}pointer-events-none opacity-50{% endunless %}" href="{{ page.links.live }}">Live</a>
      <a class="rounded-md border border-border px-3 py-1 hover:bg-secondary" href="{{ page.links.repo }}" target="_blank" rel="noopener">Source</a>
    </div>
  </header>

  {% if page.hero.image %}
  <figure class="rounded-lg border border-border overflow-hidden">
    <button type="button" class="project-img-btn" data-img="{{ page.hero.image | relative_url }}" aria-label="View image">
      <img class="w-full" src="{{ page.hero.image | relative_url }}" alt="To‑Do App dashboard" />
    </button>
    <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Dashboard with pending tasks</figcaption>
  </figure>
  {% endif %}

  <div class="grid gap-6 md:grid-cols-2">
    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-2">Features</h2>
      <ul class="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
        <li>User authentication (login/registration)</li>
        <li>Create, view, and delete tasks</li>
        <li>Priorities: low, medium, high</li>
        <li>Status: pending, completed</li>
        <li>Deadlines and to‑do lists</li>
        <li>Responsive UI (desktop and mobile)</li>
        <li>Analytics dashboard with charts and pie visualizations</li>
        <li>Environment-based configuration via .env</li>
      </ul>
    </article>
    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-2">Tech</h2>
      <ul class="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
        <li>PHP 8 (OOP + MVC)</li>
        <li>MySQL</li>
        <li>Composer</li>
        <li>Apache/Nginx</li>
      </ul>
    </article>
  </div>

  <div class="space-y-3">
    <h2 class="font-medium">Screens</h2>
    <div class="grid gap-4 md:grid-cols-2">
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/todo-app/dashboard-with-pending-task.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/todo-app/dashboard-with-pending-task.png' | relative_url }}" alt="Dashboard showing pending tasks and charts" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Dashboard — Pending tasks</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/todo-app/dashboard-with-completed-task.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/todo-app/dashboard-with-completed-task.png' | relative_url }}" alt="Dashboard showing completed tasks and charts" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Dashboard — Completed tasks</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/todo-app/login-page.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/todo-app/login-page.png' | relative_url }}" alt="Login page" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Login</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/todo-app/registration-page.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/todo-app/registration-page.png' | relative_url }}" alt="Registration page" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Registration</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/todo-app/task-creation-form.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/todo-app/task-creation-form.png' | relative_url }}" alt="Task creation form" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Create task</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/todo-app/profile-page.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/todo-app/profile-page.png' | relative_url }}" alt="Profile page" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Profile</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden md:col-span-2">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/todo-app/welcome-page.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/todo-app/welcome-page.png' | relative_url }}" alt="Welcome page" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Welcome page</figcaption>
      </figure>
    </div>
  </div>
</section>
