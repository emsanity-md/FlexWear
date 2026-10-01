import { useCallback, useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";

/**
 * Scroll-snap carousel with real controls.
 *
 * An earlier version drove this with a CSS marquee. It looked broken: the
 * loop took so long that the track appeared frozen, and it paused on hover,
 * so any resting cursor stopped it entirely. This version advances on a short
 * interval and exposes prev/next plus a position readout.
 *
 * Hovering does not pause it. Keyboard focus does, so a card cannot slide
 * away from someone using the arrows or tabbing to a product.
 */

const ADVANCE_MS = 4500;

function usePrefersReducedMotion() {
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

export default function ProductCarousel({
  products,
  addToCart,
  label = "Featured products",
}) {
  const count = products?.length ?? 0;
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [focusWithin, setFocusWithin] = useState(false);
  const reduced = usePrefersReducedMotion();

  const step = useCallback(() => {
    const track = trackRef.current;
    if (!track?.children.length) return 0;
    const card = track.children[0];
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.getBoundingClientRect().width + gap;
  }, []);

  const goTo = useCallback(
    (target, smooth = true) => {
      const track = trackRef.current;
      const distance = step();
      if (!track || !distance) return;

      const max = track.scrollWidth - track.clientWidth;
      const left = Math.max(0, Math.min(target * distance, max));
      track.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
    },
    [step],
  );

  const advance = useCallback(() => {
    setIndex((current) => {
      const next = current >= count - 1 ? 0 : current + 1;
      goTo(next, !reduced);
      return next;
    });
  }, [count, goTo, reduced]);

  // Keep the readout honest when the track is scrolled by hand or by swipe.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const distance = step();
        if (!distance) return;
        const max = track.scrollWidth - track.clientWidth;
        const raw = Math.round(track.scrollLeft / distance);
        setIndex(Math.max(0, Math.min(raw, count - 1)));
        // Snap back to the start once the user scrolls past the final card.
        if (max > 0 && track.scrollLeft >= max - 4) setIndex(count - 1);
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [count, step]);

  useEffect(() => {
    if (reduced || focusWithin || count < 2) return;
    const id = setInterval(advance, ADVANCE_MS);
    return () => clearInterval(id);
  }, [advance, count, focusWithin, reduced]);

  if (count === 0) return null;

  return (
    <section
      aria-label={label}
      className="relative"
      /*
        Auto-advance deliberately does NOT pause on hover. It only pauses on
        keyboard focus, so a card can never slide out from under someone who
        is tabbing through it with the buttons.
      */
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={() => setFocusWithin(false)}
    >
      <div className="relative">
        <ul
          ref={trackRef}
          tabIndex={0}
          aria-label={`${label}, ${count} items`}
          className="carousel-track flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 lg:gap-6"
        >
          {products.map((product) => (
            <li
              key={product.id}
              className="w-[15rem] shrink-0 snap-start sm:w-[17rem] lg:w-[19rem]"
            >
              <ProductCard product={product} addToCart={addToCart} />
            </li>
          ))}
        </ul>

        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1">
          <button
            type="button"
            onClick={() => goTo(Math.max(0, index - 1))}
            disabled={index === 0}
            aria-label="Previous product"
            className="pointer-events-auto rounded-full border border-line bg-surface p-2.5 text-ink shadow-card transition-colors hover:border-ink hover:text-iris disabled:pointer-events-none disabled:opacity-0"
          >
            <ArrowLeftIcon size={18} />
          </button>
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
          <button
            type="button"
            onClick={() => goTo(Math.min(count - 1, index + 1))}
            disabled={index >= count - 1}
            aria-label="Next product"
            className="pointer-events-auto rounded-full border border-line bg-surface p-2.5 text-ink shadow-card transition-colors hover:border-ink hover:text-iris disabled:pointer-events-none disabled:opacity-0"
          >
            <ArrowRightIcon size={18} />
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-xs tabular-nums text-muted">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>

        <p className="text-xs text-muted">
          {reduced
            ? "Reduced motion is on, so use the arrows to browse."
            : "Moves on its own. Arrows to step."}
        </p>
      </div>
    </section>
  );
}