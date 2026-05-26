# Plan — Integrate Claude Design Handoff into NLYFit

## Context

Claude Design delivered three high-fidelity design prototypes for NLYFit at
`/Users/Corey/Downloads/design_handoff_nlyfit/`. The designs are JSX
prototypes with inline styles, intentionally **not production-ready** —
Claude Design's README explicitly says *"Do not ship the JSX as-is. Your
job is to recreate these designs as Next.js routes."*

The destination is the scaffolded picker site we already deployed at
`https://nly-fit.vercel.app/`. Three placeholder routes
(`app/design-1/`, `app/design-2/`, `app/design-3/`) are ready to be
filled in. The client will pick one of the three, and the winner gets
promoted to `/`.

**The three designs map to:**

| Slug | Name | Source file | Vibe | Primary accent |
|---|---|---|---|---|
| `design-1` | **Iron** | `src/iron.jsx` | Refined dark industrial | Orange `#ff5b1f` on near-black |
| `design-2` | **Volt** | `src/volt.jsx` | Athletic neon energy | Volt green `#c8ff2e` on dark |
| `design-3` | **Atelier** | `src/atelier.jsx` | Warm editorial boutique | Rust `#b04f25` on cream |

**Decisions confirmed:**
- Build order: Iron → Volt → Atelier (one at a time, review between each)
- File layout: section components per design (`_components/` folder per design route)
- Fidelity: high-fidelity (pixel-for-pixel) per README

---

## One-time setup (before Iron)

These touch shared/root files and only need to happen once.

### 1. Allow Unsplash domain for `next/image`

All 25 image slots across the three designs use `images.unsplash.com`
URLs as placeholders. Without allow-listing, `next/image` rejects them.

**File:** `next.config.ts` (root)

Add `images.remotePatterns` entry for `images.unsplash.com`.

### 2. Add namespaced Tailwind theme tokens

Per the README's hard constraint (#4), each design's colors must be
namespaced (`iron-*`, `volt-*`, `atl-*`) so they don't collide. This
project uses Tailwind v4, which supports inline theme config via
`@theme inline {}` in `app/globals.css` — but the original handoff rule
to Claude Design said *"never modify `app/globals.css`"*. That rule was
written from Claude Design's perspective; for our integration, the
namespaced tokens are exactly the kind of additive change that's safe.

**Two viable options:**
- **A. Extend `@theme inline {}` in `app/globals.css`** — Tailwind v4 native
- **B. Create `tailwind.config.ts`** — what the README recommends

Going with **option A** (extend `globals.css`). Reasons: it's the
v4-native way, keeps config in one file, and the additions are purely
additive (no existing tokens are touched, no risk of collision since
everything is namespaced).

**File:** `app/globals.css`

Add a single `@theme inline {}` block extending with all `--color-iron-*`,
`--color-volt-*`, `--color-atl-*` tokens from the README palettes.

### 3. Type generation safety

`next-env.d.ts` is gitignored — that's fine, Next regenerates it on
build. Nothing to do here.

---

## Phase 1 — Iron (`app/design-1/`)

This is the first build, so we'll establish patterns the other two
designs reuse. Iron is the simplest of the three — no clip-paths, no
inverted sections, straightforward grid.

### Files to create

```
app/design-1/
├── layout.tsx                      ← rewrite (load fonts, scope page background, restyle back link)
├── page.tsx                        ← rewrite (compose section components)
└── _components/
    ├── Nav.tsx                     ← IronNav (lines 75-108 of iron.jsx)
    ├── Hero.tsx                    ← IronHero (lines 111-end of hero section)
    ├── Programs.tsx                ← IronPrograms (3 pricing cards)
    ├── About.tsx                   ← IronAbout (coach feature + credentials strip)
    ├── Testimonials.tsx            ← IronTestimonials (3 quote cards)
    ├── Gallery.tsx                 ← IronGallery (asymmetric grid, 5 image slots)
    ├── Booking.tsx                 ← IronBooking (calendar picker mock)
    └── Footer.tsx                  ← IronFooter
```

Note the `_components` underscore prefix — Next.js App Router treats
folders starting with `_` as private, so it won't try to route them.

### Per-file approach

**`layout.tsx`** — Loads three Google Fonts via `next/font/google`
(`Archivo`, `Archivo_Black`, `JetBrains_Mono`), sets CSS variables on
the wrapping div (e.g., `--font-archivo`), sets the page background to
`bg-iron-bg` and text color to `text-iron-text`, and restyles the
"← Back to designs" link to match Iron (small mono-style pill, near-black
background with orange hover). The link must stay visible per project
constraint.

**`page.tsx`** — Imports and composes all 8 section components. Stays a
Server Component (no `"use client"`).

**Each section file** — Translates inline styles from the source JSX
into Tailwind utility classes. Reusable helpers from the source
(`IronEyebrow`, `IronButton`) become small components in
`_components/` if used by 2+ sections, or inlined if used once.

**Marquee strip** (IronHero) uses `WebkitTextStroke` for outlined text —
that's a one-off CSS value. Two options: arbitrary Tailwind value
(`[-webkit-text-stroke:1px_currentColor]`) or a small `iron.module.css`
file. Will choose based on what reads better at build time.

### Critical reference files (read while implementing)

- `/Users/Corey/Downloads/design_handoff_nlyfit/README.md` — lines 141–199 are the Iron section (palette, typography, section structure, image URLs)
- `/Users/Corey/Downloads/design_handoff_nlyfit/src/iron.jsx` — full inline-style source
- `/Users/Corey/Downloads/design_handoff_nlyfit/screenshots/01-iron.png` — visual ground truth
- `/Users/Corey/Desktop/Portfolio/NLYFit/app/design-1/layout.tsx` — existing placeholder to rewrite
- `/Users/Corey/Desktop/Portfolio/NLYFit/app/design-1/page.tsx` — existing placeholder to rewrite

### Verification after Iron

1. Run `npm run build` locally — confirm no TypeScript or build errors
2. Run `npm run dev`, open `http://localhost:3000/design-1` in browser
3. Visually compare against `screenshots/01-iron.png`
4. Click the "← Back to designs" link, confirm it returns to `/`
5. Confirm the picker at `/` is untouched (Design 1/2/3 cards still render)
6. Commit + push to `main`; Vercel auto-deploys; verify
   `https://nly-fit.vercel.app/design-1` matches local

**Stop here for Corey review before moving to Volt.**

---

## Phase 2 — Volt (`app/design-2/`)

Same structure as Iron, but Volt has more complex CSS:
- **Diagonal slab backgrounds** via `clipPath: polygon(...)` (hero, offer banner)
- **Floating absolute-positioned nav** that overlays the hero
- **Glow shadows** via box-shadow / radial gradients
- **Photo-card programs** (6 cards in 3×2 grid, each with a 200px image and corner tag)

Likely needs a `volt.module.css` for the clip-path values. Tailwind
arbitrary values work for short polygons but get ugly for the longer
Volt slabs.

### Files to create

```
app/design-2/
├── layout.tsx                      ← Volt fonts, dark bg, restyle back link (volt-green accent)
├── page.tsx
├── volt.module.css                 ← clip-path polygons, radial gradients (if needed)
└── _components/
    ├── Nav.tsx                     ← VoltNav (absolute-positioned)
    ├── Hero.tsx                    ← VoltHero (diagonal slab)
    ├── Partners.tsx                ← VoltPartners (logo strip)
    ├── Programs.tsx                ← VoltPrograms (6-card grid)
    ├── About.tsx                   ← VoltAbout
    ├── Offer.tsx                   ← VoltOffer (diagonal banner)
    ├── Pricing.tsx                 ← VoltPricing (3 cards, featured with glow)
    ├── Testimonials.tsx            ← VoltTestimonials (avatars)
    ├── Booking.tsx                 ← VoltBooking
    └── Footer.tsx                  ← VoltFooter
```

### Reference files

- README lines 200–~370 (Volt section)
- `src/volt.jsx`
- `screenshots/02-volt.png`

### Verification

Same loop as Iron — build, dev, compare to screenshot, push, verify on
Vercel. **Stop for review before Atelier.**

---

## Phase 3 — Atelier (`app/design-3/`)

The most varied of the three structurally:
- **Light theme** (cream paper background, ink text) — sibling layouts
  to Iron/Volt which are dark
- **Inverted dark section** mid-page (AtlAbout) — uses gold `#d4a437` as
  accent instead of rust
- **Editorial pull-quote with drop cap** (Philosophy section)
- **Indexed program list** (roman numerals, not cards)
- **Table-style pricing grid** (not cards)
- **Heavy italic serif** display via Instrument Serif

The dark section will reuse some tokens — handle by toggling
foreground/background via Tailwind classes in the section component, not
via the layout.

### Files to create

```
app/design-3/
├── layout.tsx                      ← Archivo + Instrument Serif + JetBrains Mono, cream bg
├── page.tsx
└── _components/
    ├── Nav.tsx                     ← three-column nav
    ├── Hero.tsx                    ← full-bleed two-column with eyebrow strip
    ├── Philosophy.tsx              ← pull quote + drop cap
    ├── Programs.tsx                ← editorial indexed list (roman numerals)
    ├── About.tsx                   ← INVERTED dark section, gold accent
    ├── Pricing.tsx                 ← table-style grid (4 tiers — Atelier adds Reshape)
    ├── Testimonials.tsx            ← two large quotes side-by-side
    ├── Gallery.tsx                 ← 6-col grid with stat tile
    ├── Booking.tsx                 ← bordered cream panel
    └── Footer.tsx                  ← dark footer (matches About inversion)
```

### Reference files

- README lines ~371–end (Atelier section)
- `src/atelier.jsx`
- `screenshots/03-atelier.png`

### Verification

Same loop. After this phase, all three routes are live and the client
can flip through them via the picker.

---

## End-to-end verification (after all 3 phases)

1. **Local build:** `npm run build` — confirm all routes compile, no errors
2. **Local smoke test with chrome-devtools MCP:**
   - Navigate `/` → confirm picker cards link correctly
   - Navigate `/design-1`, `/design-2`, `/design-3` → confirm each renders
   - Confirm no console errors on any route
   - Visually compare against the three screenshots
3. **Deployment:** Push to `main`, watch Vercel rebuild, then re-run the
   smoke test against `https://nly-fit.vercel.app/`
4. **Hand off to Corey + client:** Share the Vercel URL. Client clicks
   through, picks a design.

---

## Out of scope (deferred until client picks a winner)

- Real Calendly integration (booking sections are static markup mocks)
- Replacing Unsplash placeholders with the client's actual photos
- Promoting the winning design to `/` (replaces the picker page)
- Custom domain on Vercel (currently `nly-fit.vercel.app`)
- Real contact form / form submission backend
- Analytics, SEO meta, OG images
