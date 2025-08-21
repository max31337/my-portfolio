---
layout: default
title: Home
---
<section class="space-y-10">
  <div class="flex items-center gap-6">
    <div class="size-16 rounded-full bg-gradient-to-tr from-primary to-muted"></div>
    <div>
      <h1 class="text-3xl font-semibold tracking-tight">Hi, I’m Mark Anthony.</h1>
      <p class="text-muted-foreground">I build web experiences and write about what I learn.</p>
    </div>
  </div>

  <div class="grid gap-6 sm:grid-cols-2">
    <a href="{{ '/projects/' | relative_url }}" class="block rounded-lg border border-border p-5 hover:bg-accent">
      <h2 class="font-medium">Projects</h2>
      <p class="text-sm text-muted-foreground">A curated list of things I’ve built.</p>
    </a>
    <a href="{{ '/blog/' | relative_url }}" class="block rounded-lg border border-border p-5 hover:bg-accent">
      <h2 class="font-medium">Blog</h2>
      <p class="text-sm text-muted-foreground">Articles, snippets, and updates.</p>
    </a>
  </div>
</section>
