import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
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

  return (
    <div className="shell section-y">
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

      <div className="mt-12 flex flex-wrap items-center gap-2 border-y border-line py-4">
        <button
          type="button"
          onClick={() => select("all")}
          className={`rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
            active === "all"
              ? "bg-ink text-bone"
              : "text-muted hover:bg-surface hover:text-ink"
          }`}
        >
          All
        </button>

        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => select(category)}
            className={`rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
              active === category
                ? "bg-ink text-bone"
                : "text-muted hover:bg-surface hover:text-ink"
            }`}
          >
            {CATEGORY_LABELS[category]}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        Showing {visible.length} piece{visible.length === 1 ? "" : "s"}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
        {visible.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}