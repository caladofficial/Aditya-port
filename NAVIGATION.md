# Global Navigation & Scrolling System

## Desktop

`ADITYA RAI  ·  WORK  ABOUT  EXPERIENCE  SKILLS  CONTACT`

- Sticky global header with a transparent initial state.
- After 22px of scrolling, the header gains a restrained dark blur and hairline divider without changing layout height.
- The active destination receives one small crimson point; underlines are reserved for hover and focus.
- The name includes a permanent crimson identity signal.
- The header contains no filled buttons, panels, or decorative weight.

## Mobile

`ADITYA RAI  ·  MENU`

The toggle opens a full-viewport navigation layer containing:

1. Home
2. About
3. Expertise
4. Experience
5. Projects
6. Achievements
7. Contact

The menu uses a directional clip-path reveal, staggered item transforms, a quiet technical grid, and a single crimson active point. Closing reverses the item stagger and clip direction. Reduced-motion users receive a short opacity transition instead.

## Section contract

Future portfolio scenes use these stable anchors:

| Navigation item | Anchor |
| --- | --- |
| Home | `#top` |
| About | `#about` |
| Expertise | `#expertise` |
| Experience | `#experience` |
| Work / Projects | `#projects` |
| Achievements | `#achievements` |
| Skills | `#skills` |
| Contact | `#contact` |

The current foundation chapters temporarily occupy the same anchor contract so navigation and current-section detection can be reviewed before the final scenes are built.

## Current-section detection

`GlobalNavigation` uses a requestAnimationFrame-throttled scroll listener. A viewport marker selects the section crossing the upper reading area. The system queries anchors on every scheduled update, so later portfolio sections can replace the foundation chapters without navigation changes.

Active state is exposed visually and with `aria-current="location"`.

## Scrolling architecture

`SmoothScroll` owns the only Lenis instance and exposes a context API:

- `scrollTo(target, options)`
- `start()`
- `stop()`

Desktop fine-pointer environments use Lenis. Coarse-pointer and reduced-motion environments keep native scrolling. The navigation consumes this API instead of starting a second scroll engine.

Anchor behavior includes:

- fixed-header offset
- URL hash updates
- direct-load hash restoration
- browser hash-history handling
- keyboard-activated destination focus
- native smooth-scroll fallback on touch
- immediate movement when reduced motion is requested

## Mobile and keyboard behavior

- The toggle uses `aria-expanded`, `aria-controls`, and an explicit accessible label.
- The open menu is announced as a modal navigation dialog.
- Focus enters the first menu item.
- Tab and Shift+Tab remain inside the menu.
- Escape closes the menu and returns focus to the toggle.
- Selecting a link releases the scroll lock before navigation.
- Body scrolling and Lenis are paused while the menu is open.
- Resizing into the desktop breakpoint closes the mobile dialog safely.
- Short mobile viewports compact the menu and hide secondary footer metadata.
- Touch devices retain native momentum and do not receive magnetic or custom-cursor behavior.

## Progress

A two-pixel crimson line at the top of the viewport is driven by Framer Motion's global scroll progress and a lightly damped spring. It is decorative and hidden from assistive technology.
