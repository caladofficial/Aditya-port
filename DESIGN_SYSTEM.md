# Aditya Rai — Portfolio Design System

**Phase:** 01 / Foundation

**Status:** Implemented for review

**Content boundary:** The supplied resume has been normalized into a typed, authoritative data source. This phase still renders no portfolio biography, education, employment, project, certification, achievement, or contact sections.

The reference portfolio informs the standard of pacing, atmosphere, editorial confidence, and interaction craft. It does **not** define this portfolio's layout, copy, visual motif, branding, or identity.

---

## 1. Design system

### Brand positioning

**ADITYA RAI**

UI/UX DESIGNER · FRONTEND DEVELOPER · B.TECH STUDENT

**DESIGN × CODE × AI × IMPACT** is the central brand axis. It frames the portfolio as the work of a multidisciplinary maker who connects visual judgment, technical execution, intelligent systems, and measurable outcomes.

### Creative thesis

> Quiet structure. Controlled intensity.

Aditya's portfolio will combine two visual modes:

1. **Technical precision** — structured grids, compact metadata, clear hierarchy, precise rules.
2. **Editorial emotion** — large serif moments, asymmetry, expressive whitespace, cinematic image treatment.

Crimson acts as a signal rather than a decorative fill. Large regions stay black or warm off-white so colour retains impact.

### Principles

- **Identity before interface:** avoid familiar portfolio templates and decorative card grids.
- **One focal point per viewport:** supporting elements must reinforce, not compete.
- **Typography carries the story:** scale and contrast do more work than containers.
- **Motion has narrative purpose:** use it to reveal hierarchy, maintain continuity, or confirm intent.
- **Restraint creates premium quality:** sharp structure, limited colour, controlled effects.
- **Content remains authoritative:** future factual content comes only from the supplied resume.

---

## 2. Colour system

| Token | Value | Role |
| --- | --- | --- |
| `--background` | `#0A0A0A` | Primary near-black canvas |
| `--foreground` | `#F5F3EE` | Primary off-white typography |
| `--muted` | `#8B8B8B` | Secondary information |
| `--accent` | `#C8102E` | Sparse brand and interaction signal |
| `--border` | `rgba(245,243,238,.16)` | Fine structural rules |
| `--card` | `#121212` | Quiet raised surfaces |
| `--overlay` | `rgba(10,10,10,.82)` | Navigation and media veils |

Descriptive composition aliases such as `--color-void`, `--color-bone`, and `--color-crimson` resolve back to these semantic tokens. Components do not establish independent palettes.

### Use ratio

- 72% near black
- 20% off-white
- 6% gray / quiet surfaces
- 2% crimson / active signal

Crimson is used for indices, interaction rules, focus states, active cues, and pivotal type—not as a default background.

---

## 3. Typography hierarchy

The fonts are self-hosted through Fontsource packages, avoiding runtime calls to third-party font services.

### Families

- **Manrope Variable** — interface, headings, body, controls; modern and technically precise.
- **Instrument Serif** — editorial contrast, statements, emotional words; used selectively.
- **System monospace** — indices, coordinates, version labels, data, and technical metadata.

### Scale

| Role | CSS token / size | Guidance |
| --- | --- | --- |
| Display XL | `--type-display-xl` / `clamp(6rem, 16.5vw, 17.5rem)` | Identity-defining words only |
| Display L | `--type-display-l` / `clamp(4.5rem, 10vw, 10.5rem)` | Chapter openings |
| Heading 1 | `--type-heading-1` / `clamp(3.75rem, 7.5vw, 8rem)` | Primary page statements |
| Heading 2 | `--type-heading-2` / `clamp(2.7rem, 5.5vw, 5.75rem)` | Section statements |
| Heading 3 | `--type-heading-3` / `clamp(1.6rem, 3vw, 3.25rem)` | Editorial support |
| Body Large | `--type-body-large` / `clamp(1.08rem, 1.5vw, 1.4rem)` | Introductory copy |
| Body | `--type-body` / `clamp(0.92rem, 1vw, 1.04rem)` | Reading copy |
| Caption | `--type-caption` / `0.72rem` | Controls and category names |
| Technical Label | `--type-technical-label` / `0.59rem` | Index, time, data, coordinates |

Display typography uses negative tracking and compact line-height. Body text does not exceed roughly 65 characters per line.

---

## 4. Spacing system

The system uses a four-pixel base with a deliberately non-linear editorial extension:

| Token | Value | Role |
| --- | --- | --- |
| `--space-1` | 4px | Micro |
| `--space-2` | 8px | Tight |
| `--space-3` | 12px | Inline |
| `--space-4` | 16px | Base |
| `--space-5` | 24px | Cluster |
| `--space-6` | 32px | Component |
| `--space-7` | 48px | Block |
| `--space-8` | 64px | Layout |
| `--space-9` | 96px | Section support |
| `--space-10` | 144px | Cinematic separation |

Responsive layout tokens:

- `--page-x: clamp(1.1rem, 3.4vw, 4.75rem)`
- `--section-y: clamp(7rem, 14vw, 14rem)`
- `--content-max: 96rem`

---

## 5. Border-radius system

The system stays mostly sharp. Radius communicates function or distinguishes media; it is not applied to every surface.

| Token | Value | Use |
| --- | --- | --- |
| `--radius-zero` | `0` | Editorial structure |
| `--radius-hair` | `2px` | Buttons and precise controls |
| `--radius-soft` | `8px` | Functional overlays |
| `--radius-frame` | `18px` | Important feature media only |
| `--radius-round` | `999px` | Status points and circular signals |

Organic shapes are reserved for cinematic motion studies and may use asymmetric percentage radii.

---

## 6. Animation principles

### Principles

1. **Reveal hierarchy** — establish reading order.
2. **Preserve continuity** — transitions should feel connected rather than page-like.
3. **Respond with intent** — magnetic and cursor effects appear only on meaningful actions.
4. **Respect stillness** — touch and reduced-motion modes retain all information without spectacle.

### Timing

| Token | Duration | Use |
| --- | --- | --- |
| Micro | 160ms | Focus, state, colour |
| Quick | 320ms | Hover response |
| Base | 560ms | Component transitions |
| Reveal | 820ms | In-view hierarchy |
| Cinematic | 1150ms | Large visual transformation |

### Curves

- Reveal: `cubic-bezier(0.16, 1, 0.3, 1)`
- Glide: `cubic-bezier(0.22, 1, 0.36, 1)`
- Exit: `cubic-bezier(0.7, 0, 0.84, 0)`

### Performance rules

- Transform and opacity are the default animated properties.
- One primary motion idea per viewport.
- Smooth scrolling is desktop/fine-pointer only.
- Touch retains native inertial scrolling.
- `prefers-reduced-motion` disables ambient loops, parallax, cursor, and magnetic movement.
- Content is never semantically dependent on animation.

### Opening film

- `0–30%`: a restrained crimson line establishes the first signal.
- `30–70%`: clipped `ADITYA RAI` typography reveals, followed by the two role labels.
- `70–100%`: the grayscale portrait enters while the Hero begins its reveal underneath.
- Completion coordinates local font and portrait readiness without claiming `100%` early; a safety release prevents an optional asset from trapping the page.
- The cached path lasts approximately `1.42s` including the clip-path Hero handoff. Reduced motion bypasses the sequence almost immediately.

---

## 7. Responsive breakpoints

| Range | Name | Grid | Behaviour |
| --- | --- | --- | --- |
| 320–479px | Compact | 4 columns | Native scroll, no custom cursor, linear narrative |
| 480–767px | Mobile | 4 columns | Touch-first, lower atmosphere, compact type |
| 768–1199px | Tablet | 8 columns | Editorial split layouts, restrained parallax |
| 1200–1535px | Desktop | 12 columns | Full choreography and precision pointer states |
| 1536px+ | Wide | 12 columns | Capped content and expanded negative space |

Breakpoints change composition and interaction—not only font size.

---

## 8. Component architecture

```text
app/
  layout.tsx               metadata, local font imports, accessibility shell
  page.tsx                 foundation route
  globals.css              canonical visual tokens and responsive rules

components/
  character/
    AdityaCharacter.tsx    reusable public character API
    CharacterDirector.tsx  global placement and state-machine connection
    CanonicalCharacterAsset.tsx  replaceable canonical identity rig
    character.config.ts    centralized section states and identity source
  foundation/
    FoundationPreview.tsx  lightweight review-surface composition
    FoundationHero.tsx     character-led opening motion study
    *Section.tsx           focused foundation chapters
  system/
    Cursor.tsx             fine-pointer cursor primitive
    GlobalNavigation.tsx   active global header and accessible mobile menu
    Magnetic.tsx           opt-in high-intent pointer response
    SmoothScroll.tsx       shared Lenis/native anchor-scroll provider
  ui/
    Button.tsx             reusable semantic action/link
    SectionHeading.tsx     reusable semantic chapter introduction
    SectionLabel.tsx       reusable editorial chapter marker
    Reveal.tsx             shared accessible in-view reveal

hooks/
  useCharacterState.ts     section, progress, hover/focus, viewport controller
  useCharacterScrollScene.ts  GSAP scene-progress bridge for character choreography
  useCharacterSequence.ts  multi-chapter ScrollTrigger state sequencing

data/
  resume.ts                authoritative typed transcription of the supplied resume
  expertise.ts             five expertise chapters derived from resume skills
  experience.ts            professional timeline derived from resume experience
  design-system.ts         typed visual-token metadata; identity derives from resume

animations/
  motion.ts                canonical Framer easing, duration, spring, and variants
  characterAnimations.ts   isolated articulated character state variants
  gsap.ts                  lazy GSAP + ScrollTrigger registration and scoped cleanup

lib/
  site.ts                  minimal global identity derived from resume
```

### Layer model

1. **Tokens** — colour, type, spacing, geometry, motion.
2. **Primitives** — reveal, magnetic action, label, rule, frame.
3. **Compositions** — editorial header, chapter intro, project index.
4. **Scenes** — future resume-led portfolio storytelling.
5. **Identity director** — the canonical Aditya rig persists across scenes while centralized state logic interprets section, progress, hover/focus, and viewport context.

The character currently articulates one supplied photograph through editorial 2.5D masks. It never regenerates the face per state. The canonical asset boundary can be replaced later without changing scene code; see [`CHARACTER_SYSTEM.md`](./CHARACTER_SYSTEM.md).

Any one-off value that repeats twice should be promoted into the system before more sections are built.

---

## 9. Surface, texture, and composition rules

### Grid

- Use one-pixel lines at no more than eight percent foreground opacity.
- Grids establish rhythm or coordinates; they do not become decorative wallpaper behind reading copy.
- Desktop compositions use twelve conceptual columns, tablet eight, and mobile four.

### Borders

- `--border` is the default structural rule.
- Crimson borders are reserved for active or selected states.
- Avoid stacking borders, shadows, and translucent surfaces on the same component.

### Cards and overlays

- `--card` creates only a slight lift from the page background.
- `--overlay` is reserved for navigation, menus, modals, and media veils.
- Standard content should remain editorial and open rather than becoming a grid of rounded cards.

### Grain

- Global grain remains below five percent opacity with `pointer-events: none`.
- Grain provides tactile cohesion; it must never reduce text or portrait clarity.

### Radius and elevation

- Structural layouts remain square or use a two-pixel radius.
- Eight- and eighteen-pixel radii are limited to functional overlays and important media.
- Shadows are limited to interaction signals or one cinematic object per viewport.

### Explicit exclusions

- No neon accent colours.
- No generic multicolour gradients.
- No repeated glass panels.
- No large soft shadows behind ordinary cards.
- No crimson fill applied to every button, heading, or section.

---

## Current review surface

The root route is intentionally a live design-system specimen rather than the final portfolio. It demonstrates:

- a readiness-aware `ADITYA RAI` opening film with phased numeric progress, clipped type, portrait preview, and a clip-path Hero handoff
- an asymmetric `DESIGN. BUILD. CREATE.` Hero with layered headline choreography, a masked supplied portrait, concise identity copy, and magnetic work/contact actions
- a resume-backed `HELLO, I'M ADITYA.` About chapter pairing oversized editorial type with a focused professional introduction
- a five-chapter Expertise/Skills sequence covering verified design, development, data, methodology, and computer-science capabilities
- abstract wireframe, code, graph, architecture, and logic studies rather than fabricated project screenshots
- a three-entry professional timeline whose crimson route draws with scroll progress and contains no fabricated company marks
- a persistent layered Aditya character that walks between experience entries and settles into present, design, and analyze poses
- twelve character states driven by section, scroll progress, hover/focus intent, and viewport mode
- a fixed chapter pulse that visualizes global scroll progress
- a live animated signal route and high-energy interaction study
- real type rendering
- the black / off-white / crimson palette
- motion timing and reduced-motion behavior
- responsive composition
- action, signal, project-index, and editorial primitives
- the code architecture and content boundary
- a verified, typed resume data layer ready for the future scene-building phase

The supplied reference repository was reviewed for interaction ideas such as a branded loading handoff, scroll-linked narrative energy, and responsive project presentation. The implementation above reinterprets those ideas through Aditya's own monogram, portrait, palette, typography, and motion grammar; no reference copy, identity, assets, or component code is reused.
