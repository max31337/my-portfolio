---
layout: default
title: RSS
permalink: /rss/
---

<section class="space-y-6">
  <header>
    <h1 class="text-3xl font-semibold tracking-tight">RSS</h1>
    <p class="text-muted-foreground">Subscribe to new posts from this site using any feed reader.</p>
  </header>

  <article class="rounded-lg border border-border p-4 space-y-3">
    <div>
      <h2 class="font-medium mb-1">Feed URL</h2>
      <p class="text-sm text-muted-foreground">Most readers accept either link below:</p>
      <ul class="list-disc pl-5 text-sm text-muted-foreground space-y-1">
        <li>
          Relative: <a class="underline underline-offset-4" href="{{ '/feed.xml' | relative_url }}">{{ '/feed.xml' | relative_url }}</a>
        </li>
        <li>
          Absolute: <code>{{ '/feed.xml' | absolute_url }}</code>
        </li>
      </ul>
      <div class="mt-3">
        <a class="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1 text-sm hover:bg-secondary" href="{{ '/feed.xml' | relative_url }}">Open feed.xml</a>
      </div>
    </div>

    <div>
      <h2 class="font-medium mb-1">How to subscribe</h2>
      <ol class="list-decimal pl-5 text-sm text-muted-foreground space-y-1">
        <li>Copy the feed URL above.</li>
        <li>Paste it into your RSS reader (e.g., Feedly, Inoreader, NetNewsWire).</li>
        <li>That’s it — new posts will show up automatically.</li>
      </ol>
      <p class="mt-2 text-xs text-muted-foreground">Note: Opening the feed in a browser shows plain XML — that’s expected.</p>
    </div>
  </article>
</section>
