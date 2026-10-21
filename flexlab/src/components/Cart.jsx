import { Link } from "react-router-dom";
import { CATEGORY_LABELS, formatPrice } from "../assets/products";
import { LockIcon, MinusIcon, PlusIcon, TrashIcon } from "./icons";

function Stepper({ quantity, onDecrement, onIncrement }) {
  return (
    <div className="inline-flex items-center rounded-md border border-line">
      <button
        type="button"
        onClick={onDecrement}
        className="p-2.5 text-muted transition-colors hover:text-iris"
        aria-label="Decrease quantity"
      >
        <MinusIcon size={16} />
      </button>
      <span className="w-9 text-center text-sm font-semibold tabular-nums">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        className="p-2.5 text-muted transition-colors hover:text-iris"
        aria-label="Increase quantity"
      >
        <PlusIcon size={16} />
      </button>
    </div>
  );
}

export default function Cart({ cart, updateQuantity, removeFromCart }) {
  const lines = cart ?? [];
  const subtotal = lines.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0,
  );
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  if (lines.length === 0) {
    return (
      <div className="shell section-y">
        <div className="mx-auto max-w-md text-center">
          <h1 className="font-display text-display-md">Your cart is empty</h1>

          <p className="lede mt-4">
            Nothing added yet. The current rotation is twenty pieces across
            tees, fleece, outerwear, bottoms, headwear, bags, and footwear.
          </p>

          <Link to="/products" className="btn btn-primary mt-8">
            Browse the rotation
          </Link>

          <p className="mt-6 text-xs leading-relaxed text-muted">
            Demo build — your cart is kept in memory for this session only and
            clears on refresh. No account is needed to start one.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="shell section-y">
      <header className="max-w-2xl">
        <p className="eyebrow">Cart</p>
        <h1 className="mt-3 font-display text-display-lg">
          {itemCount} item{itemCount === 1 ? "" : "s"} ready
        </h1>
        <p className="lede mt-4">
          No account needed to fill this or to take it further. Your cart is
          held in memory for this session and clears on refresh.
        </p>
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-start lg:gap-12">
        <ul className="card divide-y divide-line">
          {lines.map((line) => (
            <li
              key={line.id}
              className="flex animate-fade-up gap-4 p-4 sm:gap-5 sm:p-5"
            >
              <div className="h-24 w-20 shrink-0 overflow-hidden rounded-md border border-line bg-bone">
                <img
                  src={line.src}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                <div>
                  <p className="eyebrow">{CATEGORY_LABELS[line.category]}</p>
                  <h2 className="mt-1 truncate font-display text-base font-bold">
                    {line.name}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-sm text-muted">
                    {line.tagline}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <Stepper
                    quantity={line.quantity}
                    onDecrement={() =>
                      updateQuantity(line.id, line.quantity - 1)
                    }
                    onIncrement={() =>
                      updateQuantity(line.id, line.quantity + 1)
                    }
                  />

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold tabular-nums">
                      {formatPrice(line.price * line.quantity)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(line.id)}
                      className="rounded-md p-2 text-muted transition-colors hover:text-iris"
                      aria-label={`Remove ${line.name}`}
                    >
                      <TrashIcon size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="card p-5 lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-bold">Summary</h2>

          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-semibold tabular-nums">
                {formatPrice(subtotal)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd className="text-muted">Not calculated</dd>
            </div>
          </dl>

          {/* The total lives in the fixed bar on phones, so it repeats here only on larger screens. */}
          <div className="mt-4 hidden items-baseline justify-between border-t border-line pt-4 lg:flex">
            <span className="font-semibold">Total</span>
            <span className="font-display text-xl font-extrabold tabular-nums">
              {formatPrice(subtotal)}
            </span>
          </div>

          {/*
            The place a real store would ask for an account. This one says
            plainly that it will not.
          */}
          <div className="mt-5 rounded-lg border border-iris/20 bg-iris-tint p-4">
            <p className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-iris">
              <LockIcon size={16} />
              No account needed
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">
              Nothing here asks you to sign up or sign in. There is no checkout
              behind this button either — no payment is taken, no order is
              created, and nothing leaves your browser.
            </p>
          </div>

          <button
            type="button"
            disabled
            className="btn btn-primary mt-5 w-full cursor-not-allowed opacity-50"
          >
            Checkout unavailable
          </button>

          <Link
            to="/products"
            className="btn btn-secondary mt-3 hidden w-full lg:inline-flex"
          >
            Continue shopping
          </Link>

          <p className="mt-4 text-xs leading-relaxed text-muted">
            Your cart is held in memory for this session only and clears on
            refresh. No data is collected.
          </p>
        </aside>
      </div>

      {/* On phones the total and the way out stay within reach. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bone/95 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-4 px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div>
            <p className="text-xs text-muted">Total</p>
            <p className="font-display text-lg font-extrabold tabular-nums">
              {formatPrice(subtotal)}
            </p>
          </div>

          <Link to="/products" className="btn btn-primary">
            Continue shopping
          </Link>
        </div>
      </div>

      {/* Room for the fixed bar to clear the last line item. */}
      <div aria-hidden="true" className="h-20 lg:hidden" />
    </div>
  );
}
