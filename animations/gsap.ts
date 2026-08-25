import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Lazily registers ScrollTrigger in the browser. Future cinematic scenes should
 * call this utility instead of registering plugins in individual components.
 */
export function getGsap() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

/** Revert every animation and trigger created inside a component scope. */
export function createGsapScope(scope: Element | string, setup: () => void) {
  const { gsap: instance } = getGsap();
  const context = instance.context(setup, scope);
  return () => context.revert();
}
