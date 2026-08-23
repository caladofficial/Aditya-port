# Opening Film / Preloader

`components/system/Preloader.tsx` is the first visual sequence of the portfolio. It is an intentionally short ambient film—not an asset-loading wall.

## Sequence

1. One particle enters an almost-black frame.
2. Additional particles collect into a small organic fluid form.
3. `AR` resolves in the centre.
4. `ADITYA RAI` is introduced beneath it.
5. Particles accelerate as the fluid form grows into a large blue/cyan/violet metaball.
6. The numeric loading line reaches `100`.
7. The form expands beyond the viewport, fades over the already-activated hero, and leaves no hard visual cut.

## Timing and accessibility

- Typical desktop sequence: **~2.04 seconds**.
- Compact devices: **~1.76 seconds**.
- If fonts are still resolving, desktop has only a small additional cushion (**~2.32 seconds**); the system never waits indefinitely for unrelated assets.
- `prefers-reduced-motion` reduces the sequence to a brief static handoff.

## Integration

The preloader sends `onReveal` at 83% to activate the hero and global metaball physics beneath the final expansion. It calls `onComplete` after its opacity release, at which point it unmounts. The hero is intentionally held in its initial state until this handoff.

The component sets `data-preloading="true"` on the root while active to prevent scroll/cursor interference, then cleans the attribute and all animation resources on exit.
