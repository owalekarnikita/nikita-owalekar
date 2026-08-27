# public/

- `Nikita_Owalekar_Resume.pdf` — the résumé served by every "Resume" button
  (`siteConfig.resumeUrl`). Replace this file when you update your CV; keep the
  filename or update `resumeUrl` / `resumeFileName` in `data/site.ts`.
- `projects/seikor-*.webp` — real screenshots of the live Seikor site
  (home, jobs, job detail, apply dialog, employer sign-in), 1920x1200.
- `projects/organik-*.webp` — real screenshots of the live Organik Truck store
  (storefront, collection, product, cart), 1920x1200.
- `projects/syngenta-*.svg` — abstract artwork; the product is internal, so
  there is nothing public to capture. If you ever get a shareable capture, use
  **16:10** (1920x1200 is ideal) and update `data/projects.ts`. Once no SVGs
  remain you can delete the `dangerouslyAllowSVG` block in `next.config.mjs`.

All project imagery is 16:10 — the cards and case-study covers use
`aspect-[16/10]` with `object-cover`, so nothing gets cropped.
