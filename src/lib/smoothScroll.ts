import type Lenis from "lenis";

/** The active smooth-scroll instance (null when disabled, e.g. reduced motion). */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}
