---
layout: default
title: Blog
---
<section class="space-y-6">
  <header>
    <h1 class="text-3xl font-semibold tracking-tight">Blog</h1>
    <p class="text-muted-foreground">Notes, tutorials, and updates.</p>
  </header>
  <ul class="divide-y divide-border rounded-lg border border-border overflow-hidden">
    {% for post in site.posts %}
      <li>
        <a class="flex items-center justify-between p-4 hover:bg-accent" href="{{ post.url | relative_url }}">
          <div>
            <h2 class="text-lg font-medium">{{ post.title }}</h2>
            <p class="text-sm text-muted-foreground">{{ post.excerpt | strip_html | truncate: 140 }}</p>
          </div>
          <time class="text-xs text-muted-foreground">{{ post.date | date: "%b %d, %Y" }}</time>
        </a>
      </li>
    {% endfor %}
  </ul>
</section>
