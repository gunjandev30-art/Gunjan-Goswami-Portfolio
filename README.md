# Shopify Developer Portfolio

A single-page portfolio built with plain HTML, CSS and JavaScript, plus **GSAP + ScrollTrigger**
for motion and **Lenis** for smooth scrolling. No build step, no framework, no bundler.

---

## Run it

Open the folder in VS Code, then either:

1. **Live Server (recommended)** — install the `ritwickdey.LiveServer` extension
   (VS Code will suggest it automatically from `.vscode/extensions.json`),
   then right-click `index.html` → **Open with Live Server**.
2. **Any static server** — `npx serve .` or `python3 -m http.server 5500`.

Opening `index.html` directly with `file://` mostly works, but a server is safer
(fonts, CORS and ScrollTrigger measurements all behave better).

---

## Structure

```
index.html                  markup + SEO meta (edit the 5 marked <head> lines)
assets/
  css/
    main.css                design tokens, reset, type scale, preloader, cursor, progress
    navigation.css          fixed nav + fullscreen mobile menu
    hero.css                hero, storefront preview, marquee
    about.css               about + statistics
    projects.css            selected work / horizontal reel
    sections.css            services, expertise, stack, timeline, process,
                            testimonials, CTA, contact, footer
    responsive.css          tablet + mobile overrides, reduced-motion
  js/
    site-data.js            ← ALL editable content lives here
    utils.js                helpers, feature detection, word splitter
    content.js              writes site-data.js values into the markup
    smooth-scroll.js        Lenis ↔ GSAP ticker ↔ ScrollTrigger, anchor scrolling
    preloader.js            counter + cinematic reveal
    navigation.js           scroll state + mobile menu
    cursor.js               custom cursor and magnetic buttons
    animations.js           reusable reveal system (data-animation attributes)
    hero.js                 load sequence + pointer parallax
    marquee.js              infinite skills strip
    projects.js             pinned horizontal reel (desktop) / vertical list (mobile)
    services.js             expanding service rows + tech-stack interaction
    timeline.js             experience line + animated counters
    testimonials.js         slider
    form.js                 contact form validation
    progress.js             scroll progress indicator
    main.js                 boot order — load this last
```

The CSS files are linked in cascade order and the JS files are plain classic scripts
loaded in dependency order. If you add a file, add its tag at the bottom of `index.html`
**before** `main.js`.

---

## Editing content

| What | Where |
|---|---|
| Name, email, location, social links, testimonials | `assets/js/site-data.js` |
| Title, meta description, Open Graph, canonical URL | first block in `<head>` |
| Hero headline + supporting copy | `<section class="hero">` in `index.html` |
| Projects (6) | `PROJECT 01…06` comment blocks in `index.html` |
| Statistics | `data-count` / `data-suffix` attributes on `.stats` |
| Services, process, experience, expertise | their sections in `index.html` |
| Colours, spacing, fonts | `:root` tokens at the top of `assets/css/main.css` |

`site-data.js` values are written into the markup on load, so each piece of
information exists in exactly one place.

### Projects

All eleven projects live in `SITE.projects` in `assets/js/site-data.js` and the
work section renders from that array — markup, numbering (`03 / 11`) and the
`<picture>` tags are generated, so adding a twelfth store is one object:

```js
{
  name: 'Store name',
  url: 'https://store.com/',
  industry: 'Beauty — India',        // '' hides the label
  year: '2025',                      // '' hides the year
  image: 'store-slug',               // assets/img/work/store-slug-desktop.png
  summary: 'What you actually built.',   // '' falls back to defaultSummary
  tech: ['Shopify', 'Liquid', 'AJAX cart']
}
```

Three entries have real copy. The rest ship with `industry` and `summary` empty
on purpose — write one honest line each about what *you* built and they'll
appear. Nothing is invented on your behalf.

### Screenshots from the live stores

```bash
npm install -D playwright
npx playwright install chromium
npm run shots
```

`tools/capture-screenshots.mjs` opens every URL in `SITE.projects` and saves a
desktop and a mobile screenshot into `assets/img/work/` at exactly the sizes the
layout expects. Then set `imageExt: 'png'` in `site-data.js` and the whole
section swaps over. Optionally convert to WebP and set `imageExt: 'webp'`.

### Image sizes

| File | Size | Ratio | Used on |
|---|---|---|---|
| `work/<slug>-desktop` | **1600 × 1240** | 4 : 3.1 | 768px and up (horizontal reel) |
| `work/<slug>-mobile` | **1000 × 850** | 4 : 3.4 | up to 767px (vertical list) |
| `og-image` | **1200 × 630** | 1.91 : 1 | link previews |
| `favicon` | 32 × 32 + 180 × 180 | 1 : 1 | tab and iOS home screen |

* Keep the ratios — `.panel__media` is the frame and images are `object-fit: cover`,
  so an odd ratio crops rather than breaks.
* Aim for under 250 KB desktop, under 120 KB mobile. WebP at ~q75 gets there easily.
* `width`/`height` stay on both `<source>` and `<img>` so nothing shifts on load;
  the renderer adds them for you.
* 1600px already covers a 2× render of the ~800px frame, so no `@2x` set is needed.

### Contact form

Validation is client-side only. Wire it up at the `// TODO` in `assets/js/form.js`,
e.g. Formspree, Basin, or your own serverless function.

---

## Libraries

Loaded from CDN at the bottom of `index.html`:

* GSAP 3.12.5 + ScrollTrigger — `cdnjs.cloudflare.com`
* Lenis 1.1.18 — `cdn.jsdelivr.net`

To vendor them locally instead, drop the files in `assets/vendor/` and swap the
three `<script src>` paths. Lenis' stylesheet is already inlined in `main.css`,
so there's nothing else to import.

---

## Behaviour notes

* **No GSAP?** `main.js` removes the `js` class and the page renders as static,
  fully readable HTML — nothing stays invisible.
* **`prefers-reduced-motion: reduce`** disables Lenis, the custom cursor, the
  preloader and all scroll animation; counters jump to final values and service
  descriptions stay open.
* **Mobile** gets no custom cursor, no pinning and no horizontal scroll — the
  work reel becomes a vertical list below 768px.
* `ScrollTrigger.refresh()` runs after fonts load, on `window.load` and on a
  debounced resize.

---

## Deploy

It's a static site — push the folder to Netlify, Vercel, GitHub Pages or any host.
Before going live: set the real canonical URL and Open Graph values in `<head>`,
add an `og:image` (1200×630), and drop in a `favicon.ico`.
