---
layout: default
title: Patient Management System
description: An ASP.NET Core MVC app with MS SQL Server, Razor (CSHTML), and Tailwind CSS to manage patients, appointments, and records—with a REST API for integrating with other systems as part of a larger supersystem.
hero:
  image: /assets/projects/patientmanagementsystem/dashboard.png
links:
  repo: https://github.com/max31337/PatientManagementSystem
  live:
---

<section class="space-y-10">
  <header class="space-y-4">
    <div>
      <h1 class="text-3xl font-semibold tracking-tight">{{ page.title }}</h1>
      <p class="text-muted-foreground max-w-2xl">{{ page.description }}</p>
    </div>
    <div class="flex flex-wrap items-center gap-2 text-[11px]">
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">ASP.NET Core MVC</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">MS SQL Server</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Razor (CSHTML)</span>
      <span class="rounded-full border border-border px-2 py-0.5 bg-secondary/40">Tailwind CSS</span>
    </div>
    <div class="flex gap-3 text-xs">
      <a class="rounded-md border border-border px-3 py-1 hover:bg-secondary {% unless page.links.live %}pointer-events-none opacity-50{% endunless %}" href="{{ page.links.live }}">Live</a>
      <a class="rounded-md border border-border px-3 py-1 hover:bg-secondary {% unless page.links.repo %}pointer-events-none opacity-50{% endunless %}" href="{{ page.links.repo }}" target="_blank" rel="noopener">Source</a>
    </div>
  </header>

  {% if page.hero.image %}
  <figure class="rounded-lg border border-border overflow-hidden">
    <button type="button" class="project-img-btn" data-img="{{ page.hero.image | relative_url }}" aria-label="View image">
      <img class="w-full" src="{{ page.hero.image | relative_url }}" alt="Project cover" />
    </button>
    <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Project cover</figcaption>
  </figure>
  {% endif %}

  <div class="grid gap-6 md:grid-cols-2">
    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-2">Overview</h2>
      <p class="text-sm text-muted-foreground">Manage patient profiles, appointments, and clinical records in one place. Built with ASP.NET Core MVC (Razor views), MS SQL Server, and Tailwind CSS—focused on clarity, security, and a smooth workflow for staff. Includes a REST API for integrations across the broader supersystem.</p>
    </article>
    <article class="rounded-lg border border-border p-4">
      <h2 class="font-medium mb-2">Role & Impact</h2>
      <ul class="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
        <li>Designed MS SQL Server schema and implemented authentication/authorization</li>
        <li>Built CRUD flows for patients, appointments, and records</li>
        <li>Improved task efficiency for staff with clean UI elements</li>
      </ul>
    </article>
  </div>

  <div class="space-y-3">
    <h2 class="font-medium">Screens</h2>
  <div class="grid gap-4 md:grid-cols-2 cv-auto">
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/patientmanagementsystem/home.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/patientmanagementsystem/home.png' | relative_url }}" alt="Home" loading="lazy" decoding="async" fetchpriority="low" sizes="(min-width:768px) 50vw, 100vw" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Home</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/patientmanagementsystem/login.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/patientmanagementsystem/login.png' | relative_url }}" alt="Login" loading="lazy" decoding="async" fetchpriority="low" sizes="(min-width:768px) 50vw, 100vw" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Login</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/patientmanagementsystem/patientlist.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/patientmanagementsystem/patientlist.png' | relative_url }}" alt="Patient list" loading="lazy" decoding="async" fetchpriority="low" sizes="(min-width:768px) 50vw, 100vw" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Patient list</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/patientmanagementsystem/patientdetails.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/patientmanagementsystem/patientdetails.png' | relative_url }}" alt="Patient details" loading="lazy" decoding="async" fetchpriority="low" sizes="(min-width:768px) 50vw, 100vw" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Patient details</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/patientmanagementsystem/patient-creation-form.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/patientmanagementsystem/patient-creation-form.png' | relative_url }}" alt="Create patient" loading="lazy" decoding="async" fetchpriority="low" sizes="(min-width:768px) 50vw, 100vw" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Create patient</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/patientmanagementsystem/patient-edit-form.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/patientmanagementsystem/patient-edit-form.png' | relative_url }}" alt="Edit patient" loading="lazy" decoding="async" fetchpriority="low" sizes="(min-width:768px) 50vw, 100vw" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Edit patient</figcaption>
      </figure>
      <figure class="rounded-lg border border-border overflow-hidden md:col-span-2">
        <button type="button" class="project-img-btn" data-img="{{ '/assets/projects/patientmanagementsystem/dashboard.png' | relative_url }}" aria-label="View image">
          <img class="w-full" src="{{ '/assets/projects/patientmanagementsystem/dashboard.png' | relative_url }}" alt="Dashboard" loading="lazy" decoding="async" fetchpriority="low" sizes="100vw" />
        </button>
        <figcaption class="px-4 py-2 text-xs text-muted-foreground border-t border-border">Dashboard</figcaption>
      </figure>
    </div>
  </div>
</section>
