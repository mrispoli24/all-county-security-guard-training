# All County Security Guard Training — Astro site

A static port of the original Express + Handlebars site
(`mrispoli24/aci_security_guard_training`, previously hosted on Heroku) to
[Astro](https://astro.build), deployed on GitHub Pages.

Same pages, same content, same design (Tachyons classes, custom `style.css`,
Font Awesome, `behave.js` nav toggle — all carried over verbatim).

## Pages

- `/` — home
- `/about-your-instructor`
- `/becoming-a-security-guard`
- `/course-calendar` (placeholder, as in the original)
- `/downloads` (placeholder, as in the original)
- `/faq`
- `/the-aci-difference` (placeholder, as in the original)
- `/training-courses`
- `/training-courses/8hr-pre-assignment-training` ($60)
- `/training-courses/16hr-on-the-job-training` ($120)
- `/training-courses/8hr-annual-in-service-training` ($50)

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # static output in dist/
npm run preview  # preview the production build
```

## Stripe payment links (JotForm replacement)

The old JotForm embeds are gone. Each course page now has a
**"Register & Pay — $XX"** button whose URL comes from
[`src/stripe-links.ts`](src/stripe-links.ts).

To go live with payments:

1. In dad's Stripe dashboard, create three **Payment Links**
   (Payments → Payment Links), one per course price ($60 / $120 / $50).
2. Paste the three URLs into `src/stripe-links.ts`, replacing the
   `REPLACE-…` placeholders.
3. Commit and push — GitHub Pages redeploys automatically.

The buttons reference the map, so no other file changes are needed.

## Images

Binary images live in `public/images/` using the exact same paths as the
original site (`/images/aci-logo-small-black.png`, `/images/8-hr-2.jpg`, …).
Copy them from the original repo's `public/images/`.

## Custom domain

The preview URL is
`https://mrispoli24.github.io/all-county-security-guard-training`
(see `base` in `astro.config.mjs`). When ready to point
`allcountysecurityguardtraining.com` at the site:

1. In GoDaddy DNS, point the domain at GitHub Pages (A records
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
   `185.199.111.153`, or a CNAME to `mrispoli24.github.io`).
2. In the repo: Settings → Pages → Custom domain →
   `allcountysecurityguardtraining.com` (this creates the `CNAME` file).
3. Change `base` in `astro.config.mjs` to `'/'` — all internal links use
   `import.meta.env.BASE_URL`, so everything keeps working.

## Notes

- The old server-side Airtable signup (`POST /training-courses/signup/:slug`)
  and its unused form partial were dropped — static hosting can't run them,
  and the form wasn't wired into any page.
- One deliberate CSS tweak: `style.css` references the hero banner image with
  a relative URL (`../images/header-banner.jpg`) instead of the original
  absolute `/images/…` path, so it resolves correctly under the GitHub Pages
  subpath. Everything else in the CSS is byte-identical.
- Deployment is automatic via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
  (build → upload artifact → deploy to Pages) on every push to `main`.
