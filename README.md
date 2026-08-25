# Aditya Rai — Portfolio Foundation

This repository currently implements **Phase 01: the visual and interaction foundation** for Aditya Rai's portfolio.

It is intentionally **not the complete portfolio**. The supplied resume is the authoritative typed source at `data/resume.ts`. Hero, About, Expertise/Skills, and Experience now use its verified content, while detailed education, projects, certifications, achievements, and contact content remain for later scenes.

## Foundation included

- black, off-white, and deep-crimson colour system
- Manrope + Instrument Serif editorial typography pairing
- four-pixel spacing rhythm with cinematic section spacing
- restrained geometry and radius system
- shared Framer Motion timing and reveal primitives
- readiness-aware `ADITYA RAI` identity preloader with phased typography, portrait preview, real progress, and a clip-path Hero handoff
- signature layered `<AdityaCharacter />` system driven by section, scroll, hover/focus, and viewport state
- asymmetric `DESIGN. BUILD. CREATE.` Hero with masked portrait, layered type, magnetic CTAs, and coordinated character entry
- resume-backed `HELLO, I'M ADITYA.` About section with scroll-synchronized character choreography
- five-chapter Expertise/Skills index with verified skills, abstract visual studies, and character state sequencing
- scroll-drawn professional Experience timeline with sequential reveals and walk-to-pose character choreography
- desktop-only Lenis smooth scrolling
- fine-pointer custom cursor and opt-in magnetic action
- touch and reduced-motion adaptations
- responsive behavior across compact, mobile, tablet, desktop, and wide screens
- a progressive portfolio review page using Aditya's supplied portrait
- documented component and content architecture

See [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) for the visual specification, [`CHARACTER_SYSTEM.md`](./CHARACTER_SYSTEM.md) for the canonical character contract and state machine, and [`NAVIGATION.md`](./NAVIGATION.md) for the navigation, active-section, accessibility, and scrolling architecture.

## Run

```bash
npm ci
npm run dev
```

Then open `http://localhost:3000`.

## Validate

```bash
npm run lint
npm run build
```

## Current source map

```text
app/                        route, metadata, and global tokens
components/foundation/      focused foundation review chapters
components/character/       canonical layered character and global director
components/system/          navigation and interaction infrastructure
components/ui/              button, heading, label, and reveal primitives
hooks/useCharacterState.ts  section/scroll/hover/viewport character state machine
hooks/useCharacterScrollScene.ts  ScrollTrigger scene choreography bridge
hooks/useCharacterSequence.ts  multi-chapter character state sequencing
data/resume.ts              authoritative resume content
data/expertise.ts           verified expertise chapters derived from resume
data/experience.ts          verified professional timeline derived from resume
data/design-system.ts       typed visual-token metadata
animations/motion.ts        Framer Motion source of truth
animations/characterAnimations.ts  articulated character motion grammar
animations/gsap.ts          GSAP/ScrollTrigger registration and cleanup
public/images/aditya/       supplied portrait assets
```

## Technical decisions

- **React + strict TypeScript:** retained through the existing Next.js app shell. Migrating to Vite now would remove working image optimization, metadata, routing, and production validation without improving the portfolio experience.
- **Styling:** the established custom-property design system remains the canonical styling layer. Tailwind was not added as a second overlapping token system after the foundation was already implemented.
- **Motion:** Framer Motion owns component and reveal choreography; Lenis owns desktop smoothing; the shared GSAP/ScrollTrigger utility is ready for later pinned or scrubbed narrative scenes.
- **Architecture:** the former 449-line foundation module is now a small composition file backed by focused chapter modules and reusable UI primitives.

## Next phase boundary

After the foundation is approved:

1. use the normalized `data/resume.ts` source without adding inferred claims;
2. plan the narrative and project sequence;
3. build portfolio scenes from the approved components;
4. add verified contact details from the same source;
5. review every rendered claim against the supplied resume before launch.
