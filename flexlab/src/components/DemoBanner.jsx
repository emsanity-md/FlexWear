/**
 * Persistent notice that this is a UI demonstration, not a working store, and
 * that no account is required anywhere in it.
 *
 * The messages scroll as a marquee so the notice is noticed without
 * dominating the top of the page. Two identical groups sit side by side and
 * the track slides by exactly half its own width, which makes the loop
 * seamless. Under `prefers-reduced-motion` the track stops and shows a
 * single pass instead.
 */

const MESSAGES = [
  "Demo storefront",
  "No account needed — browse and build your cart without signing up",
  "No orders, no payments, no data collected",
];

function MessageGroup() {
  return (
    <span className="flex shrink-0 items-center">
      {MESSAGES.map((message) => (
        <span key={message} className="flex items-center">
          <span className="px-5 text-micro font-medium uppercase tracking-[0.16em] text-bone/80 sm:px-6">
            {message}
          </span>
          <span
            aria-hidden="true"
            className="h-1 w-1 shrink-0 animate-pulse-dot rounded-full bg-iris-light"
          />
        </span>
      ))}
    </span>
  );
}

export default function DemoBanner() {
  return (
    <div className="bg-ink text-bone">
      <div className="ticker flex py-2">
        <div className="ticker-track" aria-hidden="true">
          <MessageGroup />
          <span className="ticker-copy">
            <MessageGroup />
          </span>
        </div>

        {/* The same words, once, for anyone reading with a screen reader. */}
        <p className="sr-only">{MESSAGES.join(". ")}. </p>
      </div>
    </div>
  );
}
