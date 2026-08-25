"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { identity } from "@/data/design-system";
import { eases } from "@/animations/motion";
import { useSmoothScroll } from "@/components/system/SmoothScroll";

const desktopItems = [
  { label: "Work", target: "projects" },
  { label: "About", target: "about" },
  { label: "Experience", target: "experience" },
  { label: "Skills", target: "skills" },
  { label: "Contact", target: "contact" },
] as const;

const mobileItems = [
  { index: "01", label: "Home", target: "top" },
  { index: "02", label: "About", target: "about" },
  { index: "03", label: "Expertise", target: "expertise" },
  { index: "04", label: "Experience", target: "experience" },
  { index: "05", label: "Projects", target: "projects" },
  { index: "06", label: "Achievements", target: "achievements" },
  { index: "07", label: "Contact", target: "contact" },
] as const;

type GlobalNavigationProps = {
  ready?: boolean;
};

const observedSections = [
  "top",
  "about",
  "expertise",
  "experience",
  "projects",
  "achievements",
  "skills",
  "contact",
] as const;

function focusSection(target: HTMLElement) {
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
}

export function GlobalNavigation({ ready = true }: Readonly<GlobalNavigationProps>) {
  const reduceMotion = useReducedMotion();
  const { scrollTo, start, stop } = useSmoothScroll();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 30, mass: 0.45 });
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 22);

      const marker = Math.min(window.innerHeight * 0.32, 260);
      let current = "top";
      for (const id of observedSections) {
        const element = document.getElementById(id);
        if (!element) continue;
        const bounds = element.getBoundingClientRect();
        if (bounds.top <= marker) current = id;
        if (bounds.top <= marker && bounds.bottom > marker) {
          current = id;
          break;
        }
      }
      setActiveSection((previous) => previous === current ? previous : current);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    document.documentElement.dataset.menu = "open";
    stop();

    const focusFrame = window.requestAnimationFrame(() => {
      menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        window.requestAnimationFrame(() => toggleRef.current?.focus());
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
      delete document.documentElement.dataset.menu;
      start();
    };
  }, [menuOpen, start, stop]);

  const navigate = useCallback((event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    const target = document.getElementById(targetId);
    const activatedWithKeyboard = event.detail === 0;
    setMenuOpen(false);

    if (!target) return;
    event.preventDefault();
    window.history.pushState(null, "", `#${targetId}`);

    window.setTimeout(() => {
      scrollTo(target, {
        offset: -76,
        onComplete: activatedWithKeyboard ? () => focusSection(target) : undefined,
      });
    }, menuOpen ? 260 : 0);
  }, [menuOpen, scrollTo]);

  const isActiveTarget = (target: string) => (
    activeSection === target || (target === "expertise" && activeSection === "skills")
  );

  return (
    <>
      <motion.div className="global-scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <motion.header
        className="global-navigation"
        data-scrolled={scrolled}
        data-menu-open={menuOpen}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: reduceMotion ? 0.01 : 0.62, delay: reduceMotion ? 0 : 0.16, ease: eases.reveal }}
      >
        <a
          className="global-navigation-name"
          href="#top"
          aria-label={`${identity.name} — Home`}
          onClick={(event) => navigate(event, "top")}
        >
          <i aria-hidden="true" />
          <span>{identity.name}</span>
        </a>

        <nav className="global-navigation-desktop" aria-label="Primary navigation">
          {desktopItems.map((item) => (
            <a
              key={item.target}
              href={`#${item.target}`}
              aria-current={isActiveTarget(item.target) ? "location" : undefined}
              data-active={isActiveTarget(item.target)}
              onClick={(event) => navigate(event, item.target)}
            >
              <span>{item.label}</span>
              <i aria-hidden="true" />
            </a>
          ))}
        </nav>

        <button
          ref={toggleRef}
          className="global-navigation-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation-menu"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <i aria-hidden="true"><b /><b /></i>
        </button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-navigation-menu"
            className="mobile-navigation-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduceMotion ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduceMotion
              ? { opacity: 0 }
              : {
                  clipPath: "inset(0 0 100% 0)",
                  transition: { duration: 0.58, delay: 0.18, ease: eases.exit },
                }}
            transition={{ duration: reduceMotion ? 0.12 : 0.68, ease: eases.reveal }}
          >
            <div className="mobile-navigation-grid" aria-hidden="true" />
            <nav aria-label="Mobile navigation">
              {mobileItems.map((item, index) => (
                <motion.a
                  key={item.target}
                  href={`#${item.target}`}
                  aria-current={isActiveTarget(item.target) ? "location" : undefined}
                  data-active={isActiveTarget(item.target)}
                  initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        y: 24,
                        transition: {
                          duration: 0.26,
                          delay: (mobileItems.length - 1 - index) * 0.032,
                          ease: eases.exit,
                        },
                      }}
                  transition={{ duration: reduceMotion ? 0 : 0.56, delay: reduceMotion ? 0 : 0.13 + index * 0.05, ease: eases.reveal }}
                  onClick={(event) => navigate(event, item.target)}
                >
                  <span>{item.index}</span>
                  <strong>{item.label}</strong>
                  <i aria-hidden="true" />
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="mobile-navigation-footer"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.2 } }}
              transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.42 }}
            >
              <span>UI/UX Designer</span>
              <span>Frontend Developer</span>
              <b>Prayagraj, India</b>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
