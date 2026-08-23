# Aditya Rai — Global Design System

This is the visual and interaction foundation for the portfolio. It deliberately precedes content templates so new sections read as one continuous environment rather than separate pages.

## 1. Colour

| Token | Value | Use |
| --- | --- | --- |
| `--bg-0` | `#090a0f` | Primary graphite background |
| `--bg-1`, `--bg-2` | dark blue graphite | Layered surfaces, never dominant panels |
| `--text` | warm off-white | Primary typography |
| `--text-muted`, `--text-quiet` | muted greys | Supporting hierarchy |
| `--blue` | `#5a7dff` | Interactive light and data/technology moments |
| `--cyan` | `#70e4ff` | Selection, active emphasis and cursor lighting |
| `--violet` | `#a78aff` | Secondary depth and transition emphasis |

Accent gradients are reserved for the canvas field, liquid objects, lighting and specific type moments. Page surfaces should stay dark, matte and calm.

## 2. Typography

Typography uses a premium, modern sans stack (`Neue Montreal`, `Satoshi`, `Inter`, then reliable system fallbacks). The scale is defined in `app/globals.css`:

- `--type-display-xl` — hero / defining statement
- `--type-display-large` — section-scale editorial message
- `--type-display-medium` — feature title
- `--type-heading` — section heading
- `--type-subheading` — featured supporting copy
- `--type-body` — readable paragraphs
- `--type-caption` — metadata and labels
- `--type-micro` — utility and coordinate labels

Large type may be wrapped in clipping containers and animated with `textReveal`, `wordReveal` or `characterReveal`; semantic text must remain present and readable without motion.

## 3. Spacing & geometry

The base spacing rhythm is 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192 px and is available via `--space-1` … `--space-11`. Use `--section-space` for cinematic vertical breathing room and `--page-pad` for site-wide edge alignment.

Radius is intentionally restrained:

- `--radius-xs` and `--radius-sm` for utility controls
- `--radius-md` and `--radius-lg` only for significant media/object frames
- `--radius-round` for points, cursor, bubbles and genuine pills

Do not round structural text blocks or every card.

## 4. Motion system

`lib/motion.ts` is the source of truth. It provides:

- **Entry:** `fadeIn`, `fadeUp`, `scaleIn`
- **Text:** `textReveal`, `wordReveal`, `characterReveal`, `maskReveal`, `clipReveal`
- **Physical / ambient:** `floating`, `spring.springBack`, `magnetic`
- **Liquid:** `liquidTransition`, `bubbleMerge`, `bubbleSplit`
- **Scroll:** `parallax()` range helper
- **Choreography:** `eases`, `duration`, `stagger()`

Use transform, opacity, clip-path and compositor-safe properties for normal motion. Animations should reveal hierarchy or preserve continuity—not decorate every object.

## 5. Cursor & magnetic behavior

`components/system/Cursor.tsx` enables only for fine pointer desktop environments. The default is a precise circular point. It expands over interactive elements and reads `data-cursor-label="VIEW"` or `data-cursor-label="EXPLORE"` for project media/actions.

`Magnetic` is an explicit, opt-in wrapper for a small number of meaningful buttons or project triggers. It is disabled for touch and reduced-motion users.

```tsx
<Magnetic cursorLabel="EXPLORE" strength={0.1}>
  <a href="#project">Open case study</a>
</Magnetic>
```

## 6. Responsive behaviour

| Environment | Behaviour |
| --- | --- |
| Desktop / fine pointer | Lenis smoothing, full cursor, six ambient bubbles, 22 subtle particles |
| Tablet | Fewer atmosphere layers, five bubbles, 14 particles |
| Mobile / coarse pointer | Native scroll, no custom cursor, no magnetic transforms, four bubbles, eight particles |
| Reduced motion | Native scroll, still canvas composition, no active canvas loop or nonessential interaction motion |

## 7. Background environment

The reusable `FluidMetaballSystem` creates the slow blue/cyan/violet bubble field and low-density particles. Its physical inventory has hero metaballs, section metaballs, content bubbles, interactive bubbles and micro particles. Compatible forms create soft visual bridges as they approach; an interactive-bubble click emits a ripple that pushes nearby particles. It is capped at ~30fps, caps device pixel ratio, pauses on hidden tabs and removes population on smaller screens. A future section declares `data-fluid-scene="technology"`, `design`, `leadership` or `contact` to spring this one system into a new visual arrangement—without creating a second bubble engine.

## 8. Opening film

`Preloader` provides a short, no-spinner opening sequence: particles collect into a fluid form, `AR` and `ADITYA RAI` resolve, a numeric indicator reaches 100, and an expanding metaball hands off to the hero. It activates the hero at 83% so the final release is continuous. See [`PRELOADER.md`](./PRELOADER.md) for sequence and timing details.

## Implementation rule

New content should use these tokens and primitives first. Any exception should be intentional and added back to this system—not hard-coded inside a single section.
