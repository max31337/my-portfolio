---
layout: default
title: Blog
---
<section class="space-y-6">
  <header>
    <h1 class="text-3xl font-semibold tracking-tight">Blog</h1>
    <p class="text-muted-foreground">Notes, tutorials, and updates.</p>
    <div class="mt-2 text-xs">
      <a class="text-muted-foreground hover:text-foreground underline underline-offset-4" href="{{ '/rss/' | relative_url }}">Subscribe via RSS</a>
    </div>
  </header>
  <ul class="divide-y divide-border rounded-lg border border-border overflow-hidden">
    {% for post in site.posts %}
      <li>
        <a class="block p-4 hover:bg-accent" href="{{ post.url | relative_url }}">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="text-lg font-medium">{{ post.title }}</h2>
              <p class="text-sm text-muted-foreground">{{ post.excerpt | strip_html | truncate: 140 }}</p>
            </div>
            <div class="text-right">
              {% assign words = post.content | strip_html | strip_newlines | replace: '  ', ' ' | split: ' ' | size %}
              {% assign minutes = words | divided_by: 200 | plus: 1 %}
              <time class="block text-[11px] text-muted-foreground">{{ post.date | date: "%b %d, %Y" }}</time>
              <span class="text-[11px] text-muted-foreground">{{ minutes }} min read</span>
            </div>
          </div>
          {% if post.tags %}
          <div class="mt-2 flex flex-wrap gap-1 text-xs">
            {% for tag in post.tags %}
              <span class="rounded-full border border-border/70 px-2 py-0.5 bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">#{{ tag }}</span>
            {% endfor %}
          </div>
          {% endif %}
        </a>
      </li>
    {% endfor %}
  </ul>
</section>
