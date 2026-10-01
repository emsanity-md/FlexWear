import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductCarousel from "../components/ProductCarousel";
import { ArrowRightIcon, ChevronDownIcon } from "../components/icons";
import { products } from "../assets/products";

const FAQ = [
  {
    q: "Do I need an account to shop?",
    a: "No. You can browse the full rotation and build a cart without one. In a production build an account would gate checkout so orders could be tracked — here, checkout does not exist at all.",
  },
  {
    q: "What happens to my cart if I refresh?",
    a: "It clears. The cart lives in React state inside the app shell and is never written to storage. Nothing about your session is persisted anywhere.",
  },
  {
    q: "How often does the rotation change?",
    a: "In this build, never — the catalog is a static JSON file with twenty entries. A real version would swap that file on a schedule and drop pieces as they sell through.",
  },
  {
    q: "Can I return something?",
    a: "Returns are not implemented. This is a front-end demonstration covering browsing and cart behavior only; there is no order system, payment processing, or fulfilment behind it.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Browse the rotation",
    body: "Twenty pieces across seven categories. Every size that sells through gets replaced, so the list stays short enough to actually read.",
  },
  {
    n: "02",
    title: "Check the fit",
    body: "Every garment lists its weight, cut, and how it sits. Oversized pieces are labelled as oversized rather than sold as a happy accident.",
  },
  {
    n: "03",
    title: "Build your cart",
    body: "Add pieces and adjust quantities as you go. Your cart is held in memory for the session and clears when you close the tab.",
  },
];

const PROMISES = [
  {
    title: "A rotation, not a catalogue",
    body: "Twenty pieces at a time. Short enough to browse in one sitting, curated enough that nothing you scroll past is filler.",
  },
  {
    title: "Fit stated up front",
    body: "Weight, cut, and drape are on the card before you add anything. Oversized means oversized, not a sizing mistake.",
  },
  {
    title: "Nothing here to break",
    body: "Photography is stored locally, so the storefront keeps working with no network and no third-party image requests.",
  },
];

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 py-5 text-left"
        >
          <span className="font-display text-base font-bold sm:text-lg">
            {item.q}
          </span>
          <ChevronDownIcon
            size={20}
            className={`shrink-0 text-muted transition-transform duration-200 ${
              open ? "rotate-180 text-iris" : ""
            }`}
          />
        </button>
      </h3>

      {open && (
        <p className="animate-fade-up max-w-2xl pb-6 text-sm leading-relaxed text-muted">
          {item.a}
        </p>
      )}
    </div>
  );
}

export default function Home({ addToCart }) {
  const [openFaq, setOpenFaq] = useState(0);
  const featured = products.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="shell grid gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:py-32">
          <div className="lg:col-span-7">
            <p className="eyebrow">Curated rotation</p>

            <h1 className="mt-5 font-display text-display-xl">
              Twenty pieces.
              <br />
              Zero filler.
            </h1>

            <p className="lede mt-7 max-w-xl">
              FlexWear stocks oversized streetwear on a short cycle: heavy
              tees, loopback fleece, cargo pants, and the shoes to finish it.
              Everything that sells through gets replaced.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/products" className="btn btn-primary">
                Shop the rotation
                <ArrowRightIcon size={18} />
              </Link>
              <a href="#rotation" className="btn btn-secondary">
                See what is in it
              </a>
            </div>

            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8">
              {[
                ["20", "pieces"],
                ["7", "categories"],
                ["1", "rotation"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-display text-3xl font-extrabold tabular-nums">
                    {value}
                  </dt>
                  <dd className="mt-1 text-sm text-muted">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {featured.slice(0, 4).map((product, index) => (
                <div
                  key={product.id}
                  className={`card overflow-hidden ${
                    index % 2 === 1 ? "mt-8" : ""
                  }`}
                >
                  <img
                    src={product.src}
                    alt={product.name}
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured carousel */}
      <section
        id="rotation"
        className="scroll-mt-32 border-b border-line py-16 sm:py-20 lg:py-28"
      >
        <div className="shell flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">In rotation now</p>
            <h2 className="mt-4 font-display text-display-lg">
              Moving through the drop
            </h2>
          </div>

          <Link
            to="/products"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-iris transition-colors hover:text-iris-deep"
          >
            All twenty pieces
            <ArrowRightIcon size={18} />
          </Link>
        </div>

        <div className="mt-12">
          <ProductCarousel
            products={products}
            addToCart={addToCart}
            label="Featured products in the current rotation"
          />
        </div>

        <p className="shell mt-6 text-xs text-muted">
          Hover or focus the track to pause it.
        </p>
      </section>

      {/* What you get */}
      <section className="border-y border-line bg-surface">
        <div className="shell section-y">
          <div className="max-w-2xl">
            <p className="eyebrow">What you get</p>
            <h2 className="mt-4 font-display text-display-lg">
              Built to be small on purpose
            </h2>
          </div>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {PROMISES.map((item) => (
              <div key={item.title} className="border-t border-line pt-6">
                <h3 className="font-display text-lg font-bold">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="shell section-y">
        <div className="max-w-2xl">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-4 font-display text-display-lg">
            Three steps, no account wall
          </h2>
        </div>

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step) => (
            <li key={step.n} className="border-t border-line pt-6">
              <span className="font-display text-sm font-bold tabular-nums text-iris">
                {step.n}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="border-y border-line bg-surface">
        <div className="shell section-y">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-4 font-display text-display-md">
                Questions worth asking
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Answered from what the build actually does, rather than from a
                returns policy that does not exist yet.
              </p>
            </div>

            <div className="lg:col-span-8">
              {FAQ.map((item, index) => (
                <FaqItem
                  key={item.q}
                  item={item}
                  open={openFaq === index}
                  onToggle={() =>
                    setOpenFaq(openFaq === index ? -1 : index)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-iris">
        <div className="shell py-20 text-center sm:py-24">
          <h2 className="mx-auto max-w-2xl font-display text-display-lg text-white">
            The list is twenty long. It will not stay that way.
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/80">
            Pieces rotate as they sell through. If something in here is your
            size, it will not be here next month.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/products"
              className="btn bg-white text-ink hover:bg-bone"
            >
              Shop the rotation
              <ArrowRightIcon size={18} />
            </Link>
            <a
              href="#rotation"
              className="btn border border-white/30 text-white hover:bg-white/10"
            >
              Back to the top
            </a>
          </div>
        </div>
      </section>
    </>
  );
}