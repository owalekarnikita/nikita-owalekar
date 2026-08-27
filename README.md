# Nikita Owalekar — Portfolio

A dark-first, content-driven portfolio built with the App Router. All content
lives in `data/`, so updating the site never means editing a component.

**Content status:** populated from `Nikita_Owalekar_Resume-2.pdf` — name, contact
details, experience, skills, education, certifications and the three named
projects are real. Anything the résumé did not state is marked `[ADD]` in the
data files (see *Still to add* below) rather than invented.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion ·
lucide-react · ESLint. Nothing else — no UI kit, no theme library, no icon font.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

---

## Where the content lives

| File | What it controls |
| --- | --- |
| `data/site.ts` | Name, initials, role, headline, description, email, phone, location, socials, résumé path, availability pill, default theme, SEO keywords |
| `data/stats.ts` | The four quick stats (3.8+ years · React · TypeScript · AI) |
| `data/about.ts` | About copy, the `nikita.ts` code card, focus-area chips |
| `data/skills.ts` | Skill groups — exactly the technologies listed on the résumé |
| `data/experience.ts` | Purple Talk / FRS Labs / Tarkashilpa / Kernify timeline, education, certifications |
| `data/projects.ts` | Syngenta Dossier Automation, Seikor, Organik Truck — cards *and* case studies |
| `data/highlights.ts` | The "How I build" cards |
| `data/github.ts` | GitHub section (currently switched off — see below) |
| `data/contact.ts` | Contact headings and form labels |

## Still to add

Search the data files for `[ADD]` — these are the five gaps the résumé left:

1. **Site URL** — set `NEXT_PUBLIC_SITE_URL` in Vercel. Until then metadata,
   `sitemap.xml` and `robots.txt` use `https://nikita-owalekar.vercel.app`.
2. **GitHub** — the résumé lists no profile. The whole GitHub section is off
   (`show: false` in `data/github.ts`) so the site never shows a placeholder
   handle. Add your handle, list the repos you want shown, flip `show: true`,
   and uncomment the GitHub entry in `siteConfig.socials`.
3. **Organik Truck stack** — the live store runs on **Shopify** today, while the
   résumé lists React.js / Next.js / Stripe for this project. Confirm which build
   your work applies to (an earlier custom storefront? a separate frontend?) and
   adjust the `tech` list or add a line to the overview. There is a comment on the
   project in `data/projects.ts` marking this. Seikor and Organik Truck both link
   to their live sites; Syngenta is marked internal on purpose.
4. **Job locations** — `location` is optional on each experience entry and
   currently omitted, because the résumé only gives your own city.
5. **Real metrics** — each case study has an `[ADD METRIC]` comment where a
   number you can defend would be stronger than prose. The one metric already
   in place (25% fewer production errors at FRS Labs) came from the résumé.

Also worth doing when you can: drop an updated CV over
`public/Nikita_Owalekar_Resume.pdf` when your résumé changes.

## Project imagery

Seikor and Organik Truck use **real screenshots captured from their live sites**,
1920×1200 WebP:

- **Seikor** — home, jobs listing, job detail, application dialog, employer sign-in
- **Organik Truck** — storefront, vegetables collection, product page, cart

Syngenta keeps abstract SVG artwork, since it is an internal product with nothing
public to capture.

All project images are **16:10**, which is what the cards and the case-study
cover expect (`aspect-[16/10]` + `object-cover`), so nothing gets cropped. Keep
that ratio when you swap artwork for screenshots.

## How the case studies were written

The résumé gives one or two lines per project. Rather than inventing detail:

- **Facts** — stack, scope, role, what was built — come straight from the résumé.
- **Problem / solution / challenges** describe engineering that follows from that
  scope (three modules genuinely do need shared components; a cart genuinely does
  need one source of truth). No fabricated numbers anywhere.
- **`[ADD METRIC]`** comments mark the spots where your own figures belong.

Read them before an interview and make sure every sentence is one you would say
out loud — they are written to be defensible, not impressive.

## Deploying to Vercel (free tier)

1. Push this folder to a GitHub repository.
2. On [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
   The framework is detected automatically; no build settings to change.
3. Add the environment variables you want (all optional — see `.env.example`):
   - `NEXT_PUBLIC_SITE_URL` — your production URL
   - `RESEND_API_KEY` — **required** for the contact form to send mail (see below)
   - `GITHUB_TOKEN` — server-only, raises the GitHub API rate limit
4. Deploy.

Every page is statically prerendered. The only dynamic route is the optional
`/api/contact` handler, which is unused while the form uses `mailto:`. No
database, no cron, nothing that leaves the free tier.

---

## Contact form: it sends the email directly

Submitting the form POSTs to **`/api/contact`**
([app/api/contact/route.ts](app/api/contact/route.ts)), which emails the message
straight to your inbox through [Resend](https://resend.com). The visitor stays on
the page, sees *"Thanks - your message has been sent"*, and **no mail app opens**.

### One-time setup (about 2 minutes) - required

Until you do this there is no mail provider, so nothing can be delivered.

1. Sign up at [resend.com](https://resend.com) **with the inbox you want messages
   in** (`nikitakaushal98@gmail.com`) - free tier, no credit card.
2. **API Keys -> Create API Key**, copy the value (starts with `re_`).
3. In Vercel: **Project -> Settings -> Environment Variables -> Add**
   - Name: `RESEND_API_KEY`
   - Value: the key
   - Environments: Production **and** Preview
4. **Redeploy** (env vars only apply to new builds).

For local development put the same line in `.env.local`:

```
RESEND_API_KEY=re_your_key_here
```

That is the whole setup. Messages arrive with **Reply-To set to the sender**, so
hitting reply in Gmail answers them directly.

The default sender is Resend's shared `onboarding@resend.dev`, which needs no DNS
work but **only delivers to the address that owns the Resend account** - exactly
your case. To send from your own domain later, verify it in Resend and set
`CONTACT_FROM_EMAIL`.

### Before the key exists

The route answers `503` and the form hands the message to the visitor's mail app
instead of failing - a safety net, not the intended path. It stops happening the
moment `RESEND_API_KEY` is set. To disable it entirely (visitors are then asked to
email you directly), set `mailtoFallback: false` in `data/site.ts`.

### What the route does

| Case | Response |
| --- | --- |
| Sent | `200 ok` |
| Missing / invalid fields | `400 validation` with per-field messages |
| Honeypot field filled (bots) | `200 ok`, nothing sent |
| More than 3 posts/minute per IP | `429 rate_limited` |
| Resend rejects the send | `502 send_failed`, real reason logged server-side only |
| No `RESEND_API_KEY` | `503 not_configured` -> mail-app fallback |

It re-validates everything server-side rather than trusting the client, caps field
lengths, HTML-escapes the message before it goes into the email body, and keeps
`RESEND_API_KEY` out of the browser bundle - no `NEXT_PUBLIC_` prefix, and the
route runs only on the server.

### Alternatives

- **A hosted form service:** set `NEXT_PUBLIC_FORM_ENDPOINT` to a
  [Formspree](https://formspree.io) / [Web3Forms](https://web3forms.com) /
  [Basin](https://usebasin.com) endpoint. Same `{ name, email, message }` JSON,
  and `/api/contact` goes unused.
- **Back to `mailto:` only:** set `NEXT_PUBLIC_FORM_ENDPOINT` to an empty string.

---

## GitHub section: static by default, live when you want it

`components/sections/github.tsx` is a **server component**. It renders the
curated data in `data/github.ts` with zero runtime API calls.

The section is switched **off** by default (`show: false`) because the résumé
lists no GitHub profile. Add a handle, then set `show: true`. To pull live data,
also set `live: true` in `data/github.ts`. `lib/github.ts` then fetches the profile and repositories on
the server (revalidated hourly) and falls back to the static data if the request
fails or rate-limits. `GITHUB_TOKEN` is read **server-side only** — it is never
prefixed with `NEXT_PUBLIC_` and never reaches the browser.

The contribution grid is generated from a fixed seed and labelled as
illustrative. Set `showContributionGraph: false` to hide it.

---

## Architecture

```
app/
  layout.tsx              root shell: fonts, metadata, JSON-LD, theme bootstrap
  page.tsx                home — composes the sections, nothing else
  api/contact/route.ts    optional: emails the form via Resend (server only)
  projects/[slug]/page.tsx  statically generated case studies
  opengraph-image.tsx     OG image generated at build time from the config
  icon.svg  robots.ts  sitemap.ts  not-found.tsx
  globals.css             design tokens (CSS variables) + component classes
components/
  layout/     navbar, footer, placeholder notice (off)
  sections/   hero, stats, about, skills, experience, projects, highlights,
              github, contact (+ contact-form)
  projects/   project-card, case-study, architecture-diagram
  theme/      theme-provider, theme-toggle, motion-provider
  ui/         button, badge, section, reveal, background, social-icon
data/         ← all content lives here
lib/          utils (cn, seeded random), motion variants, theme key,
              github (server-only fetch)
public/       projects/*.svg artwork, Nikita_Owalekar_Resume.pdf
```

**Server by default.** Only five components are client components: the navbar
(scroll + active section), the skills filter, the contact form, and the two
theme/motion providers. The hero — the LCP element — is a server component whose
entrance is pure CSS, so it renders before any JavaScript arrives.

---

## Design system

Colours, spacing and radii are CSS custom properties defined once in
`app/globals.css` (`:root` for light, `.dark` for dark) and exposed to Tailwind
in `tailwind.config.ts`. Changing the accent is a two-line edit:

```css
--accent: 228 100% 68%;
--accent-secondary: 262 83% 68%;
```

Reusable classes: `.glass`, `.glass-hover`, `.edge-light`, `.accent-text`,
`.gradient-text`, `.eyebrow`, `.section-padding`.

### Theme

`siteConfig.defaultTheme` (`'dark' | 'light' | 'system'`) decides what a
first-time visitor sees; the class is rendered server-side for a fixed default so
there is no flash and no JS dependency. A small inline script applies a returning
visitor's stored choice before first paint.

---

## Accessibility & motion

- Semantic landmarks, one `h1` per page, skip-to-content link.
- Visible focus rings on every interactive element (`:focus-visible`).
- Full keyboard paths: nav, mobile menu (Escape to close), skills filter, form.
- `prefers-reduced-motion` is honoured twice over: CSS animations collapse to
  near-zero duration with delays removed, and `MotionConfig reducedMotion="user"`
  strips transform animations from Framer Motion.
- With JavaScript disabled, a `<noscript>` rule reveals the scroll-triggered
  sections instead of leaving them invisible.

## Performance

- Every route is statically prerendered.
- Images go through `next/image` with explicit dimensions — no layout shift.
- `next/font` self-hosts Inter and JetBrains Mono with `display: swap`.
- Background ambience is CSS only: no canvas, no per-frame JavaScript.
- Scroll listeners are passive; the active-section indicator uses
  `IntersectionObserver`.

## SEO

Metadata, Open Graph and Twitter cards derive from `data/site.ts`. A `Person`
JSON-LD block ships in the root layout and a `CreativeWork` block on each case
study, alongside `robots.txt`, `sitemap.xml` and a generated OG image.

---

## Licence

Yours. Built for Nikita Owalekar.
