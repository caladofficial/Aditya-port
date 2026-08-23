# Technical Performance Audit — Aditya Rai Portfolio

This portfolio intentionally keeps its signature animation system. Optimisation work targets implementation cost rather than removing fluid visuals, cinematic type or scroll choreography.

## Audit summary

| Area | Finding | Implementation |
| --- | --- | --- |
| Animation frame rate | Ambient work should not compete with UI interaction. | Canvas runs at roughly 30fps on desktop and 24fps on compact/low-power devices; CSS/Framer interaction remains compositor-led. |
| React re-renders | Scroll motion values should not cause component state churn. | Framer Motion values drive transforms directly; static visual image components are memoized; high-frequency canvas state stays in refs. |
| WebGL | No WebGL is necessary for this visual language. | The fluid system uses one Canvas 2D context; no Three.js/WebGL scene ships. |
| Canvas | Canvas is the most expensive persistent layer. | DPR is capped, particles/bubbles reduce on compact and low-power hardware, simulation pauses on hidden tabs, rendering is frame-budgeted, resize work is rAF-batched. |
| Image loading | Gallery images must not all load immediately. | Design sources are WebP (~388 KB total), use Next Image, explicit sizes, lazy loading and progressive gallery eligibility. |
| Fonts | Network font requests can delay the opening sequence. | Typography uses premium system font fallbacks; no remote font request is required. |
| JavaScript delivery | Long-form chapters must remain immediately usable and crawlable. | The complete narrative stays server-rendered; client work is instead constrained through lazy media, passive observers, motion values and bounded Canvas cost. Client-only splitting was deliberately rejected because it removed below-fold content from initial HTML. |
| Mobile | Touch hardware requires a different budget. | Native scroll, no custom cursor, no desktop hover dependency, reduced Canvas population/DPR, tap and swipe project controls. |
| Memory & listeners | Long-lived interactive layers must clean up. | Canvas, Lenis, cursor, preloader, scroll controller, menu, mutation and intersection observers all disconnect/cancel listeners and rAF work on unmount. |
| Scroll handlers | Avoid layout work every scroll tick. | Scroll velocity uses a passive listener and runs an rAF settle loop only while there is velocity to decay. |
| GPU/layout | Keep routine motion compositor-friendly. | Interaction motion uses transform, opacity, clip-path and limited filters; images have fixed aspect-ratio containers; section visual effects are contained. |
| Accessibility | Performance must not reduce usability. | Reduced-motion paths, native touch flow, keyboard focus management, skip link and lazy rendering remain available. |

## Current production checks

- `npm run build` passes.
- `npm run lint` passes.
- All chapter content remains present in server-rendered route HTML after dynamic component splitting.
- Design asset source total: approximately **388 KB** (WebP).

## Deliberate trade-offs

- Canvas is retained because it is the visual identity layer. It is limited rather than removed.
- Scroll choreography is retained; reduced-motion users receive short static separators instead of complex bridge animation.
- Full narrative content is deliberately kept in the initial server render, preserving keyboard access, find-in-page, crawlability and stable layout.

## Operational rules for future work

1. Do not start an additional page-wide rAF loop.
2. Put simulation state in refs, not React state.
3. Prefer transform/opacity over layout properties.
4. Add media through `next/image` with fixed geometry and appropriate `sizes`.
5. New global listeners require cleanup in the same effect.
6. New expensive visual sections should use viewport gating or a compact mobile variant.
