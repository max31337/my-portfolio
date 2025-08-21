---
layout: post
title: ASP.NET Core MVC + Tailwind — a clean, fast setup
tags: [dotnet, tailwind, css, tooling]
---
Here’s a compact way to wire Tailwind into an ASP.NET Core MVC app and keep builds snappy.

Why this setup:

- Keep Razor (CSHTML) views simple; push styling to utility classes
- Dev server reloads fast; production builds minify and purge
- Works on Windows with minimal tooling

Quick steps:

1) Install Tailwind via npm

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2) Configure Tailwind

```js
// tailwind.config.js
module.exports = {
  content: [
    './Views/**/*.{cshtml,js}',
    './Pages/**/*.{cshtml,js}',
    './wwwroot/**/*.js'
  ],
  theme: { extend: {} },
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')]
}
```

3) Add the input CSS

```css
/* wwwroot/css/app.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4) Build CSS for dev/prod

```bash
# Dev (watch)
npx tailwindcss -i ./wwwroot/css/app.css -o ./wwwroot/dist/app.css --watch

# Prod
npx tailwindcss -i ./wwwroot/css/app.css -o ./wwwroot/dist/app.css --minify
```

5) Reference in layout

```cshtml
<!-- Views/Shared/_Layout.cshtml -->
<link rel="stylesheet" href="~/dist/app.css" />
```

Tips:

- Add the Typography plugin for nicer post content
- Use a `data-theme` or `class="dark"` toggle for dark mode
- Keep component partials small and reuse patterns
