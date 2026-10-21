import { useEffect, useRef, useState } from "react";
import { CATEGORY_LABELS, formatPrice } from "../assets/products";
import { CheckIcon, PlusIcon } from "./icons";

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
    <article className="card card-lift group flex h-full flex-col overflow-hidden">
      <div className="aspect-[4/5] w-full overflow-hidden bg-bone">
        <img
          src={product.src}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 border-t border-line p-3 sm:p-4">
        <p className="eyebrow">{CATEGORY_LABELS[product.category]}</p>

        {/*
          On a phone the price drops below the title. A long name like
          "Heavyweight Tee" leaves too little room to sit beside it.
        */}
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
          <h3 className="font-display text-sm font-bold leading-snug sm:text-base">
            {product.name}
          </h3>
          <p className="shrink-0 font-sans text-sm font-semibold tabular-nums">
            {formatPrice(product.price)}
          </p>
        </div>

        <p className="line-clamp-2 text-xs leading-relaxed text-muted sm:text-sm">
          {product.tagline}
        </p>

        <button
          type="button"
          onClick={handleAdd}
          className={`btn group/btn mt-3 w-full ${
            added
              ? "bg-iris text-white"
              : "btn-secondary hover:border-iris hover:text-iris"
          }`}
        >
          {added ? (
            <>
              <CheckIcon size={16} />
              Added
            </>
          ) : (
            <>
              Add to cart
              <PlusIcon
                size={16}
                className="-ml-1 opacity-0 transition-all duration-300 ease-out-expo group-hover/btn:ml-0 group-hover/btn:opacity-100"
              />
            </>
          )}
        </button>
      </div>
    </article>
  );
}
