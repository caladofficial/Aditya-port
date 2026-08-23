# Aditya Rai — Portfolio Foundation

The portfolio is being built as a continuous creative-technology experience. This pass establishes the **global design system and animation architecture only**; content sections are intentionally not present yet.

## Included foundation

- Next.js / React / TypeScript app shell
- dark-first design system: graphite, warm white, electric blue, cyan and violet
- responsive type, spacing, radius, depth and motion tokens in `app/globals.css`
- shared Framer Motion utilities in `lib/motion.ts`
- semantic personal-brand source of truth in `lib/site.ts`
- Lenis smooth scrolling for desktop with native touch scroll retained on mobile
- a reusable `FluidMetaballSystem`: hero, section, content and interactive metaballs; visual merging, soft click ripples, particles, scroll energy and scene retuning
- desktop cursor that expands on interactions and supports `VIEW` / `EXPLORE` labels
- reusable magnetic primitive for selected high-intent actions
- a compact digital-film preloader with particle formation, AR / Aditya Rai reveal, minimal numeric progress and a continuous metaball handoff to the hero
- reduced-motion behavior and animation/listener cleanup

See [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) for token use, responsive logic and the motion catalogue.

## Run locally

```bash
npm ci
npm run dev
```

## Deploy on Vercel

This is a standard Next.js application and is ready for Vercel without a custom configuration file:

1. Push the project files (including `public/images/aditya/`) to a Git repository.
2. Import that repository in Vercel.
3. Leave the detected framework as **Next.js**.
4. Use the default build command: `npm run build`.

The optimized portrait assets live in `public/images/aditya/`; original upload files are intentionally excluded through `.gitignore`.

## Quality constraints

1. Use transform and opacity for routine UI motion.
2. Respect `prefers-reduced-motion`; never hide content behind animation.
3. Keep a single visual focal point per viewport.
4. Reuse shared timing, easing and spring tokens.
5. Canvas work is capped by DPR and suspended while the document is hidden.
6. Do not build generic cards or disconnected template sections.
