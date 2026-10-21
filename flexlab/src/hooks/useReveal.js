import { useEffect, useRef, useState } from "react";

/**
 * Tracks the visitor's motion preference.
 *
 * Every animated part of the app reads this one value, so the page either
 * moves as a whole or stops as a whole.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

/**
 * Reveals an element the first time it scrolls into view.
 *
 * The observer fires once and then stops watching, so scrolling back up
 * never re-hides content the visitor has already read.
 */
export default function useReveal({
  threshold = 0.15,
  rootMargin = "0px 0px -8% 0px",
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    // Nothing to animate, so show it immediately.
    if (reduced) {
      setInView(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    // Older browsers without the observer get the content, not a blank box.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced, threshold, rootMargin]);

  return { ref, inView, reduced };
}
