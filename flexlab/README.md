# FlexWear

A demo storefront for a curated streetwear rotation, built with React, Vite,
and Tailwind CSS.

**This is a UI demonstration.** No real orders are placed, no payments are
taken, and no data is collected. The cart is held in memory for the session
only and clears on refresh.

**There are no accounts.** Nothing in the build asks you to create an account
or sign in to one. The login and register screens have been removed, and
`/login` and `/register` now redirect to the home page so old links still land
somewhere useful.

## Running it

```bash
npm install
npm run dev
```

| script | what it does |
| --- | --- |
| `npm run dev` | start the dev server |
| `npm run build` | production build to `dist/` |
| `npm run preview` | serve the production build locally |
| `npm run lint` | run ESLint |

## What's in the build

**Routes** — `/` landing page, `/products` catalog with category filters,
`/cart`, `/about`. `/login` and `/register` redirect to `/`.

**Catalog** — twenty products across seven categories (tees, fleece,
outerwear, bottoms, headwear, bags, footwear) in `src/assets/products.json`.

**Imagery** — twenty photographs from [Unsplash](https://unsplash.com), cropped
to 800x1000 and stored in `src/assets/photos/`. They are bundled locally
through `import.meta.glob` in `src/assets/products.js`, so the storefront works
offline and makes no third-party image requests at runtime. Product names match
what each photograph actually shows.

**Carousel** — the featured track on the home page advances on its own every
4.5s, with a progress bar showing the time left. Hovering does not pause it;
keyboard focus does, so a card cannot slide out from under someone using the
arrows. It drops to manual-only when the user has `prefers-reduced-motion` set.
See `src/components/ProductCarousel.jsx`.

**Icons** — a hand-authored set in `src/components/icons.jsx` on a 24px grid
at 1.5px stroke. There is no icon library dependency.

Product photography is from Unsplash and is used under the
[Unsplash License](https://unsplash.com/license). It stands in for real product
photography in a demo build and is not of FlexWear's own products.

## Motion

One shared system, so the page either moves as a whole or stops as a whole.

- `src/hooks/useReveal.js` — `useReveal` reveals a block the first time it
  scrolls into view; `usePrefersReducedMotion` reports the visitor's motion
  preference.
- `src/components/Reveal.jsx` — a wrapper built on that hook. Pass `delay` to
  stagger a group.
- `src/components/ScrollToTop.jsx` — resets the scroll position on navigation
  and still honours in-page anchors.
- `src/styles/main.css` — a global `prefers-reduced-motion` block stops every
  animation and transition at once. The hidden start state for reveals is only
  applied when motion is welcome, so content is never left invisible.

The marquee in the announcement bar stops and shows a single pass under reduced
motion, and the FAQ accordion animates its row height rather than popping the
answer into existence.

## Design system

Defined as Tailwind tokens in `tailwind.config.js`, with component classes for
the shared patterns in `src/styles/main.css`.

**Type** — [Syne](https://fonts.google.com/specimen/Syne) (600, 700, 800) for
display, [Archivo](https://fonts.google.com/specimen/Archivo) (400, 500, 600,
700) for body. Syne's angular display forms carry the headings; Archivo is a
neutral grotesque that stays legible in product metadata and labels.

**Color** — one accent, `iris`, plus neutrals.

| token | value | role |
| --- | --- | --- |
| `ink` | `#0E0B14` | near-black with a faint violet cast |
| `bone` | `#F6F4F1` | page background |
| `surface` | `#FFFFFF` | cards |
| `line` | `#E4E0DC` | every border |
| `muted` | `#6B6577` | secondary text |
| `iris` | `#4328C9` | the single accent |
| `iris-deep` | `#2F1C93` | hover and pressed states |
| `iris-light` | `#8B7BF5` | accent on dark surfaces |
| `iris-tint` | `#EFEBFB` | quiet accent fills |

`iris` on `ink` is only about 2.2:1, which fails WCAG for text, so dark
surfaces use `iris-light` instead.

**Spacing** — one rhythm. Sections use `py-16 → py-20 → py-28` via
`.section-y`; the space under a section header uses `.section-gap`; the
container is `max-w-container` (76rem) with `px-5 sm:px-6 lg:px-8` via
`.shell`.

**Type scale** — `display-xl`, `display-lg`, `display-md` and `display-sm` for
headings, `lede` for standfirst paragraphs, `micro` for eyebrows and labels.
The display sizes are fluid, so they scale with the viewport rather than
jumping at a breakpoint.

**Style** — 1px `line` borders carry the separation. Shadows are reserved for
cards, drawers and lifted states. Radii stay at 4/6/8px and pills at full
round. Focus rings are defined once in the base layer rather than per
component. The only gradient in the build is a single soft radial glow behind
the hero, the about header and the closing call to action.
