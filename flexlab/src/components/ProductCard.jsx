import { useEffect, useRef, useState } from "react";
import { CATEGORY_LABELS, formatPrice } from "../assets/products";
import { CheckIcon } from "./icons";

export default function ProductCard({ product, addToCart, onAdd }) {
  const [added, setAdded] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleAdd = () => {
    addToCart?.(product);
    onAdd?.(product);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className="card group flex flex-col overflow-hidden transition-shadow duration-200 hover:shadow-card">
      <div className="aspect-[4/5] w-full overflow-hidden bg-bone">
        <img
          src={product.src}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 border-t border-line p-4">
        <p className="eyebrow text-[11px]">{CATEGORY_LABELS[product.category]}</p>

        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-base font-bold leading-snug">
            {product.name}
          </h3>
          <p className="shrink-0 font-sans text-sm font-semibold tabular-nums">
            {formatPrice(product.price)}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-muted">{product.tagline}</p>

        <button
          type="button"
          onClick={handleAdd}
          className="btn btn-secondary mt-3 w-full"
        >
          {added ? (
            <>
              <CheckIcon size={16} />
              Added
            </>
          ) : (
            "Add to cart"
          )}
        </button>
      </div>
    </article>
  );
}