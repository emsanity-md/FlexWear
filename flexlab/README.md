# FlexWear

A demo storefront for a curated streetwear rotation, built with React, Vite,
and Tailwind CSS.

**This is a UI demonstration.** No real orders are placed, no payments are
taken, and no data is collected. The cart is held in memory for the session
only and clears on refresh. There are no accounts behind the login and register
screens — those forms never submit anywhere.

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
`/cart`, `/about`, `/login`, `/register`.

**Catalog** — twenty products across seven categories (tees, fleece,
outerwear, bottoms, headwear, bags, footwear) in `src/assets/products.json`.

**Imagery** — twenty photographs from [Unsplash](https://unsplash.com), cropped
to 800x1000 and stored in `src/assets/photos/`. They are bundled locally
through `import.meta.glob` in `src/assets/products.js`, so the storefront works
offline and makes no third-party image requests at runtime. Product names match
what each photograph actually shows.

**Carousel** — the featured track on the home page advances on its own every
4.5s. Hovering does not pause it; keyboard focus does, so a card cannot slide
out from under someone using the arrows. It drops to manual-only when the user
has `prefers-reduced-motion` set. See `src/components/ProductCarousel.jsx`.

**Icons** — a hand-authored set in `src/components/icons.jsx` on a 24px grid
at 1.5px stroke. There is no icon library dependency.

Product photography is from Unsplash and is used under the
[Unsplash License](https://unsplash.com/license). It stands in for real product
photography in a demo build and is not of FlexWear's own products.

## Design system

Defined as Tailwind tokens in `tailwind.config.js`, with component classes for
the shared patterns in `src/styles/main.css`.

**Type** — [Syne](https://fonts.google.com/specimen/Syne) (700, 800) for
display, [Archivo](https://fonts.google.com/specimen/Archivo) (400, 600) for
body. Syne's angular display forms carry the headings; Archivo is a neutral
grotesque that stays legible in product metadata and form labels.

**Color** — one accent, `iris`, plus neutrals.

| token | value | role |
| --- | --- | --- |
| `ink` | `#0E0B14` | near-black with a faint violet cast |
| `bone` | `#F6F4F1` | page background |
| `surface` | `#FFFFFF` | cards, form fields |
| `line` | `#E4E0DC` | every border |
| `muted` | `#6B6577` | secondary text |
| `iris` | `#4328C9` | the single accent |
| `iris-deep` | `#2F1C93` | hover and pressed states |
| `iris-tint` | `#EFEBFB` | quiet accent fills |

**Spacing** — one rhythm. Sections use `py-16 → py-20 → py-28` via
`.section-y`; the container is `max-w-container` (72rem) with
`px-5 sm:px-8` via `.shell`. Everything sits on the default Tailwind scale.

**Style** — 1px `line` borders carry the separation. Shadows are reserved for
two cases: card hover (`shadow-card`) and the mobile drawer (`shadow-drawer`).
Radii stay at 4/6/8px. Focus rings are defined once in the base layer rather
than per component. No gradients anywhere.