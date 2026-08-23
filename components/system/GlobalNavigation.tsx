"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type MenuItem = {
  index: string;
  label: string;
  target: string;
  preview: "home" | "about" | "experience" | "projects" | "design" | "skills" | "contact";
};

const menuItems: readonly MenuItem[] = [
  { index: "01", label: "HOME", target: "top", preview: "home" },
  { index: "02", label: "ABOUT", target: "about", preview: "about" },
  { index: "03", label: "EXPERIENCE", target: "experience", preview: "experience" },
  { index: "04", label: "PROJECTS", target: "projects", preview: "projects" },
  { index: "05", label: "DESIGN", target: "design", preview: "design" },
  { index: "06", label: "SKILLS", target: "skills", preview: "skills" },
  { index: "07", label: "CONTACT", target: "contact", preview: "contact" },
] as const;

/**
 * One global navigation system. The scroll lock stores the current Y position
 * and restores it before an optional section navigation is performed.
 */
export function GlobalNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState<MenuItem["preview"]>("home");
  const [activeTarget, setActiveTarget] = useState("top");
  const scrollPosition = useRef(0);
  const pendingTarget = useRef<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuDialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
        if (current?.target.id) setActiveTarget(current.target.id);
      },
      { rootMargin: "-34% 0px -52% 0px", threshold: [0.08, 0.3, 0.6] },
    );

    menuItems.forEach((item) => {
      const target = document.getElementById(item.target);
      if (target) observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    scrollPosition.current = window.scrollY;
    const body = document.body;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollPosition.current}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    document.documentElement.dataset.menu = "open";

    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      body.style.overflow = previous.overflow;
      delete document.documentElement.dataset.menu;

      window.scrollTo(0, scrollPosition.current);
      const targetId = pendingTarget.current;
      if (targetId) {
        pendingTarget.current = null;
        window.requestAnimationFrame(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    let focusFrame = 0;
    const dialog = menuDialogRef.current;
    const menuButton = menuButtonRef.current;
    const getFocusable = () => [menuButton, ...Array.from(dialog?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [])].filter((element): element is HTMLElement => Boolean(element));
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = getFocusable();
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

    focusFrame = window.requestAnimationFrame(() => getFocusable()[1]?.focus() ?? getFocusable()[0]?.focus());
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      menuButton?.focus();
    };
  }, [isOpen]);

  const navigate = useCallback((target: string) => {
    pendingTarget.current = target;
    setIsOpen(false);
  }, []);

  const setPreviewForPointer = (item: MenuItem) => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setPreview(item.preview);
  };

  return (
    <>
      <header className={`global-navigation ${isOpen ? "is-open" : ""}`} aria-label="Global navigation">
        <a className="global-wordmark" href="#top" data-cursor="magnetic" data-cursor-label="HOME" aria-label="Aditya Rai — home">
          ADITYA RAI
        </a>
        <button ref={menuButtonRef} className="global-menu-toggle" type="button" data-cursor="magnetic" aria-label={isOpen ? "Close menu" : "Open menu"} aria-controls="global-menu-dialog" aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)}>
          <span className="global-menu-label">{isOpen ? "CLOSE" : "MENU"}</span>
          <span className="global-menu-icon" aria-hidden="true"><i /><i /></span>
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuDialogRef}
            id="global-menu-dialog"
            className="global-menu"
            data-preview={preview}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ clipPath: "circle(0% at 94% 5%)" }}
            animate={{ clipPath: "circle(150% at 94% 5%)" }}
            exit={{ clipPath: "circle(0% at 94% 5%)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="global-menu-atmosphere" aria-hidden="true">
              <span className="global-menu-bubble" />
              <span className="global-menu-bubble-secondary" />
            </div>
            <nav className="global-menu-list" aria-label="Main navigation">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.target}
                  href={`#${item.target}`}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(item.target);
                  }}
                  onPointerEnter={() => setPreviewForPointer(item)}
                  onFocus={() => setPreview(item.preview)}
                  aria-current={activeTarget === item.target ? "page" : undefined}
                  className={activeTarget === item.target ? "is-current" : undefined}
                  whileHover={{ x: 15 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.6 }}
                >
                  <span>{item.index}</span>
                  <strong>{item.label}</strong>
                  <i>{String(index + 1).padStart(2, "0")}</i>
                </motion.a>
              ))}
            </nav>
            <div className="global-menu-preview" aria-live="polite">
              <span>SECTION PREVIEW</span>
              <strong>{menuItems.find((item) => item.preview === preview)?.label}</strong>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
