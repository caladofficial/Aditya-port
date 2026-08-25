# Aditya Character System

The animated character is a primary identity layer for the portfolio. It is not a per-section illustration set and it never substitutes a newly generated face for Aditya Rai.

## Identity contract

- Canonical source: `public/images/aditya/designer-figure.webp`
- Source status: supplied-photograph editorial placeholder
- Asset boundary: `components/character/CanonicalCharacterAsset.tsx`
- One source image is sampled by every articulated layer.
- No animation state regenerates or swaps Aditya's face.
- Face structure, proportions, hairstyle, skin tone, facial features, facial hair, and photographed body proportions therefore remain tied to the same source.

The current implementation is an intentionally structured 2.5D photo rig. Angular layer masks provide articulation while preserving the supplied photograph. When an approved transparent illustrated rig becomes available, only `CanonicalCharacterAsset.tsx` and the canonical asset entry in `character.config.ts` need to change. Section and interaction logic remain untouched.

## Public API

```tsx
import { AdityaCharacter } from "@/components/character";

<AdityaCharacter
  state="design"
  position="right"
  scale={0.96}
/>
```

`position` accepts `left`, `center`, `right`, or custom `{ x, y }` coordinates. The component is non-interactive and exposes one concise image label to assistive technology.

## Supported states

- `idle`
- `walk`
- `walkBack`
- `lookLeft`
- `lookRight`
- `point`
- `design`
- `code`
- `analyze`
- `present`
- `celebrate`
- `wave`

All state-specific Framer Motion variants live in `animations/characterAnimations.ts`.

## Layer model

```text
character-shadow
character-rig
  character-legs-back
  character-arm-back
  character-body
  character-legs-front
  character-arm-front
  character-head
    character-face
    character-hair
    character-blink
character-accessory
character-signal
```

Secondary behavior is deliberately quiet: slow torso breathing, infrequent blinking, restrained head drift, and small natural arm movement. There is no continuous whole-character bounce.

## State machine

`hooks/useCharacterState.ts` is the single behavioral controller. It resolves a snapshot from:

1. the section crossing the viewport activation line;
2. progress through that section and forward/backward scroll direction;
3. an optional scene-level ScrollTrigger state from `useCharacterScrollScene`;
4. the closest hovered or keyboard-focused `[data-character-state]` target;
5. restrained desktop pointer direction while the Hero is active;
6. the compact, mobile, tablet, desktop, or wide viewport mode.

Section-to-state and side placement are centralized in `components/character/character.config.ts`. Scenes do not contain animation variants.

Near section boundaries, the machine selects `walk` or `walkBack`. `useCharacterScrollScene` can supply a temporary ScrollTrigger-driven scene state without moving variants into section components. In About, the character walks on entry, settles toward the text through the active progress range, and resumes walking on departure; compact layouts reverse the look direction because the character stands on the right.

`useCharacterSequence` extends the same event contract across repeated editorial chapters. Expertise/Skills resolves `design`, `code`, `analyze`, `present`, and `analyze` from the row crossing the viewport focus band. Experience adds `walk` and `walkBack` transition states between `present` for SIH leadership, `design` for E-cell UIT, and `analyze` for the data analyst role. Selected Work uses `point` for the Transport map/vehicle chapter and `analyze` for the Heart Guard data/AI chapter; hovering, focusing, or activating a project temporarily reinforces that contextual pose. Hover/focus intent takes priority and then returns control to the current scroll scene.

## Accessibility and motion

- `prefers-reduced-motion` disables breathing, blinking, limb loops, state interpolation, and travel choreography.
- Hover behavior is mirrored by focus behavior.
- The fixed director never captures pointer events or keyboard focus.
- Character information is not required to understand or navigate page content.
- The canonical source is preloaded as part of the identity handoff so the primary character does not appear as a late optional decoration.
