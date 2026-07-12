---
layout: default
title: ClinkKit
description: Modular productivity toolkit for Clink, bringing modern shell enhancements to Windows Command Prompt through extensible Lua modules.
hero:
  image: /assets/projects/clinkkit/clinkkit-banner.svg
links:
  repo: https://github.com/max31337/ClinkKit
  live: https://clinkkit.pages.dev/
status: Active
---

<section class="space-y-10">

  <header class="space-y-4">
    <div>
      <h1 class="text-3xl font-semibold tracking-tight">{{ page.title }}</h1>
      <p class="text-muted-foreground max-w-2xl">{{ page.description }}</p>

      <div class="mt-2 inline-flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-2 py-1 text-[11px]">
        <span class="size-2 rounded-full bg-green-500"></span>
        <span>Actively maintained open-source project</span>
      </div>
    </div>

    <div class="flex flex-wrap gap-2 text-[11px]">
      <span class="rounded-full border border-border bg-secondary/40 px-2 py-0.5">Lua</span>
      <span class="rounded-full border border-border bg-secondary/40 px-2 py-0.5">Clink</span>
      <span class="rounded-full border border-border bg-secondary/40 px-2 py-0.5">Windows CMD</span>
      <span class="rounded-full border border-border bg-secondary/40 px-2 py-0.5">Shell Productivity</span>
      <span class="rounded-full border border-border bg-secondary/40 px-2 py-0.5">Open Source</span>
      <span class="rounded-full border border-border bg-secondary/40 px-2 py-0.5">Modular Architecture</span>
    </div>

    <div class="flex gap-3 text-xs">
      <a
        class="rounded-md border border-border px-3 py-1 hover:bg-secondary"
        href="{{ page.links.live }}"
        target="_blank"
        rel="noopener">
        Official Website
      </a>

      <a
        class="rounded-md border border-border px-3 py-1 hover:bg-secondary"
        href="{{ page.links.repo }}"
        target="_blank"
        rel="noopener">
        Source
      </a>
    </div>
  </header>

  <!-- Hero Banner -->
  <figure class="overflow-hidden rounded-lg border border-border">
    <button
      type="button"
      class="project-img-btn"
      data-img="{{ '/assets/projects/clinkkit/clinkkit-banner.svg' | relative_url }}"
      aria-label="View ClinkKit banner">

      <img
        class="w-full"
        src="{{ '/assets/projects/clinkkit/clinkkit-banner.svg' | relative_url }}"
        alt="ClinkKit banner">
    </button>

    <figcaption class="border-t border-border px-4 py-2 text-xs text-muted-foreground">
      ClinkKit banner
    </figcaption>
  </figure>

  <!-- Project Information -->
  <div class="grid gap-6 md:grid-cols-2">

    <article class="rounded-lg border border-border p-4">
      <h2 class="mb-2 font-medium">Overview</h2>

      <p class="text-sm text-muted-foreground">
        ClinkKit is a modular toolkit that extends the Windows Command Prompt through
        Clink. Instead of focusing on a single feature, it provides reusable Lua
        modules that improve productivity while remaining lightweight, configurable,
        and easy to extend.
      </p>
    </article>

    <article class="rounded-lg border border-border p-4">
      <h2 class="mb-2 font-medium">Architecture</h2>

      <ul class="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
        <li>Modular Lua plugin architecture</li>
        <li>Independent feature modules</li>
        <li>Configuration-driven behavior</li>
        <li>Native Clink integration</li>
        <li>Designed for future expansion</li>
      </ul>
    </article>

    <article class="rounded-lg border border-border p-4">
      <h2 class="mb-2 font-medium">HistoryGuard</h2>

      <p class="text-sm text-muted-foreground">
        HistoryGuard is the first module included with ClinkKit. It keeps typos,
        accidental keyboard-smash input, unknown executables, and blacklisted
        commands out of your shell history, without changing how commands are
        executed. Content-aware protection for embedded secrets &mdash; passwords,
        API keys, authentication tokens, and other sensitive values inside a
        command line &mdash; is on the roadmap; see the roadmap.
      </p>
    </article>

    <article class="rounded-lg border border-border p-4">
        <h2 class="mb-2 font-medium">Roadmap</h2>

        <p class="text-sm text-muted-foreground mb-3">
            HistoryGuard is the first module in a broader vision for ClinkKit.
            The project is being designed as a lightweight bootstrapper capable
            of loading multiple independent productivity modules while sharing
            common configuration, logging, caching, and utility libraries.
        </p>

        <ul class="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Sensitive-data protection (secrets, API keys, tokens in commands)</li>
            <li>Alias management module</li>
            <li>Safe file utilities</li>
            <li>Shell productivity commands</li>
            <li>Reusable shared libraries</li>
            <li>Community-developed modules</li>
        </ul>
    </article>

  </div>

  <!-- Gallery -->
  <section class="space-y-4">

    <h2 class="text-lg font-medium">Gallery</h2>

    <div class="grid gap-4 md:grid-cols-2">

      <figure class="overflow-hidden rounded-lg border border-border">
        <button
          type="button"
          class="project-img-btn"
          data-img="{{ '/assets/projects/clinkkit/historyguard1-demo.png' | relative_url }}"
          aria-label="View keysmash exclusion in history screenshot">

          <img
            class="w-full"
            src="{{ '/assets/projects/clinkkit/historyguard1-demo.png' | relative_url }}"
            alt="HistoryGuard screenshot">
        </button>

        <figcaption class="border-t border-border px-4 py-2 text-xs text-muted-foreground">
          Keysmash are excluded from history
        </figcaption>
      </figure>

      <figure class="overflow-hidden rounded-lg border border-border">
        <button
          type="button"
          class="project-img-btn"
          data-img="{{ '/assets/projects/clinkkit/historyguard2-demo.png' | relative_url }}"
          aria-label="View unknown command exclusion in history screenshot">

          <img
            class="w-full"
            src="{{ '/assets/projects/clinkkit/historyguard2-demo.png' | relative_url }}"
            alt="Command history screenshot">
        </button>

        <figcaption class="border-t border-border px-4 py-2 text-xs text-muted-foreground">
          Unknown or typo in the commands are excluded from history
        </figcaption>
      </figure>

    </div>

  </section>

  <!-- Highlights -->
  <section class="space-y-3">

    <h2 class="font-medium">Highlights</h2>

    <div class="grid gap-4 md:grid-cols-2">

      <article class="rounded-lg border border-border p-4">
        <h3 class="mb-2 font-medium">HistoryGuard</h3>

        <p class="text-sm text-muted-foreground">
        Modular productivity toolkit for Clink that extends Windows Command Prompt
        through reusable Lua modules. The first module, <strong>HistoryGuard</strong>,
        intelligently keeps typos, accidental commands, keyboard-smash input,
        unknown executables, and other unwanted entries out of persistent command
        history without affecting normal command execution.
        </p>
      </article>

      <article class="rounded-lg border border-border p-4">
        <h3 class="mb-2 font-medium">Extensible Design</h3>

        <p class="text-sm text-muted-foreground">
          Built around a modular architecture that allows new functionality to be
          added as independent modules, making ClinkKit easy to maintain, extend,
          and contribute to. Planned work includes content-aware sensitive-data
          protection so secrets embedded in a command line never get written to
          history in the first place.
        </p>
      </article>

    </div>

  </section>

</section>