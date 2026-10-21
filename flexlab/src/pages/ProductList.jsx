import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  products,
} from "../assets/products";
import { useSearchParams } from "react-router-dom";

export default function ProductList({ addToCart }) {
  const [params, setParams] = useSearchParams();
  const requested = params.get("category");
  const [active, setActive] = useState(
    CATEGORIES.includes(requested) ? requested : "all",
  );

  const rowRef = useRef(null);
  const chipRefs = useRef({});
  const [pill, setPill] = useState(null);

  const visible = useMemo(
    () =>
      active === "all"
        ? products
        : products.filter((product) => product.category === active),
    [active],
  );

  const select = (category) => {
    setActive(category);
    const next = new URLSearchParams(params);
    if (category === "all") next.delete("category");
    else next.set("category", category);
    setParams(next, { replace: true });
  };

  /*
    The active chip is highlighted by an element that slides across the row
    rather than by each chip restyling itself, so the change reads as one
    continuous movement.
  */
  const measure = useCallback(() => {
    const chip = chipRefs.current[active];
    const row = rowRef.current;
    if (!chip || !row) return;

    setPill({
      left: chip.offsetLeft,
      top: chip.offsetTop,
      width: chip.offsetWidth,
      height: chip.offsetHeight,
    });
  }, [active]);

  useLayoutEffect(() => {
    measure();
  }, [measure, visible.length]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  const chips = [{ id: "all", label: "All" }, ...CATEGORIES.map((id) => ({
    id,
    label: CATEGORY_LABELS[id],
  }))];

  return (
    <div className="shell section-y">
      <Reveal>
        <header className="max-w-2xl">
          <p className="eyebrow">The rotation</p>
          <h1 className="mt-4 font-display text-display-lg">
            Twenty pieces, seven categories
          </h1>
          <p className="lede mt-5">
            Everything currently in stock. Pieces are added as the rotation
            opens up, so this list changes shape over time.
          </p>
        </header>
      </Reveal>

      {/*
        On phones the row scrolls sideways rather than wrapping into three
        ragged lines. The negative margin lets the first chip sit flush with
        the edge of the screen.
      */}
      <div
        ref={rowRef}
        role="group"
        aria-label="Filter by category"
        className="relative -mx-5 mt-12 flex snap-x gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        {pill && (
          <span
            aria-hidden="true"
            className="absolute z-0 rounded-full bg-ink transition-all duration-300 ease-out-expo"
            style={{
              left: pill.left,
              top: pill.top,
              width: pill.width,
              height: pill.height,
            }}
          />
        )}

        {chips.map((chip) => {
          const isActive = active === chip.id;

          return (
            <button
              key={chip.id}
              type="button"
              aria-pressed={isActive}
              ref={(node) => {
                chipRefs.current[chip.id] = node;
              }}
              onClick={() => select(chip.id)}
              className={`chip snap-start ${isActive ? "chip-active" : ""}`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        Showing {visible.length} piece{visible.length === 1 ? "" : "s"}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {visible.map((product, index) => (
          <Reveal
            key={product.id}
            delay={Math.min(index, 7) * 60}
            className="h-full"
          >
            <ProductCard product={product} addToCart={addToCart} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
