# my-portfolio

Static portfolio + blog powered by Jekyll and deployed to GitHub Pages. Styled with Tailwind (via CDN) using shadcn/ui-inspired tokens and components.

## Local preview

Prereqs: Ruby and Bundler installed.

```
bundle install
bundle exec jekyll serve --livereload
```

Open http://localhost:4000

## Deploy

Push to `main`. A GitHub Actions workflow builds and deploys automatically to GitHub Pages. Configure the Pages source to "GitHub Actions" in repo settings if needed.

## Customize

- Edit `_config.yml` for site metadata and baseurl
- Content pages: `index.md`, `projects/index.md`, `blog/index.md`
- Blog posts live in `_posts/` (use `YYYY-MM-DD-title.md`)
- Layouts in `_layouts/` and shared bits in `_includes/`

## Notes

- Tailwind is loaded via CDN for simplicity; switch to a build pipeline if you need tree-shaking or plugins.
