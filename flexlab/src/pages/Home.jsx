import { useState } from "react";
import { Link } from "react-router-dom";
import AccountFreeNotice from "../components/AccountFreeNotice";
import ProductCarousel from "../components/ProductCarousel";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { ArrowRightIcon, ChevronDownIcon } from "../components/icons";
import { products } from "../assets/products";

const FAQ = [
  {
    q: "Do I need an account to shop?",
    a: "No. There is no sign-up or sign-in anywhere in this build. You can browse the full rotation and build a cart without one. In a production build an account would gate checkout so orders could be tracked — here, checkout does not exist at all.",
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
    body: "Add pieces and adjust quantities as you go. No sign-up, no password. Your cart is held in memory for the session and clears when you close the tab.",
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
          className="group flex w-full items-center justify-between gap-4 py-5 text-left"
        >
          <span className="font-display text-base font-bold transition-colors duration-200 group-hover:text-iris sm:text-lg">
            {item.q}
          </span>
          <ChevronDownIcon
            size={20}
            className={`shrink-0 text-muted transition-transform duration-300 ease-out-expo ${
              open ? "rotate-180 text-iris" : ""
            }`}
          />
        </button>
      </h3>

      {/*
        The panel stays mounted and the row height animates, so the answer
        opens and closes instead of popping into existence.
      */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out-expo ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden" aria-hidden={!open}>
          <p className="max-w-2xl pb-6 text-sm leading-relaxed text-muted">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Home({ addToCart }) {
  const [openFaq, setOpenFaq] = useState(0);
  const featured = products.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line glow">
        <div className="shell relative grid gap-14 py-20 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:py-32">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Curated rotation</p>
            </Reveal>

            <Reveal delay={70}>
              <h1 className="mt-5 font-display text-display-xl">
                Twenty pieces.
                <br />
                Zero filler.
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="lede mt-7 max-w-xl">
                FlexWear stocks oversized streetwear on a short cycle: heavy
                tees, loopback fleece, cargo pants, and the shoes to finish it.
                Everything that sells through gets replaced.
              </p>
            </Reveal>

            <Reveal delay={210}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/products" className="btn btn-primary group">
                  Shop the rotation
                  <ArrowRightIcon
                    size={18}
                    className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                  />
                </Link>

                <a href="#rotation" className="btn btn-secondary">
                  See what is in it
                </a>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <dl className="mt-14 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-8 sm:gap-6">
                {[
                  ["20", "pieces"],
                  ["7", "categories"],
                  ["0", "accounts needed"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dt className="font-display text-3xl font-extrabold tabular-nums">
                      {value}
                    </dt>
                    <dd className="mt-1 text-xs text-muted sm:text-sm">
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {featured.map((product, index) => (
                <Reveal
                  key={product.id}
                  delay={index * 90}
                  className={index % 2 === 1 ? "mt-8" : ""}
                >
                  <div className="card overflow-hidden">
                    <img
                      src={product.src}
                      alt={product.name}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out-expo hover:scale-[1.05]"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why there is no account */}
      <AccountFreeNotice />

      {/* Featured carousel */}
      <section
        id="rotation"
        className="scroll-mt-28 border-b border-line py-16 sm:py-20 lg:py-28"
      >
        <div className="shell flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="eyebrow">In rotation now</p>
            <h2 className="mt-4 font-display text-display-lg">
              Moving through the drop
            </h2>
          </Reveal>

          <Reveal delay={90}>
            <Link
              to="/products"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-iris transition-colors hover:text-iris-deep"
            >
              All twenty pieces
              <ArrowRightIcon
                size={18}
                className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
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
          <Reveal>
            <SectionHeading
              eyebrow="What you get"
              title="Built to be small on purpose"
              className="max-w-2xl"
            />
          </Reveal>

          <ul className="section-gap grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {PROMISES.map((item, index) => (
              <Reveal
                key={item.title}
                as="li"
                delay={index * 80}
                className="border-t border-line pt-6"
              >
                <h3 className="font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="shell section-y">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Three steps, no account wall"
            className="max-w-2xl"
          />
        </Reveal>

        <ol className="section-gap grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, index) => (
            <Reveal
              key={step.n}
              as="li"
              delay={index * 80}
              className="border-t border-line pt-6"
            >
              <span className="font-display text-sm font-bold tabular-nums text-iris">
                {step.n}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="border-y border-line bg-surface">
        <div className="shell section-y">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-4 font-display text-display-md">
                Questions worth asking
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Answered from what the build actually does, rather than from a
                returns policy that does not exist yet.
              </p>
            </Reveal>

            <div className="lg:col-span-8">
              {FAQ.map((item, index) => (
                <Reveal key={item.q} delay={index * 60}>
                  <FaqItem
                    item={item}
                    open={openFaq === index}
                    onToggle={() =>
                      setOpenFaq(openFaq === index ? -1 : index)
                    }
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-iris glow-invert">
        <div className="shell relative py-20 text-center sm:py-24">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-display-lg text-white">
              The list is twenty long. It will not stay that way.
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/80">
              Pieces rotate as they sell through. If something in here is your
              size, it will not be here next month.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/products" className="btn btn-inverse group">
                Shop the rotation
                <ArrowRightIcon
                  size={18}
                  className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                />
              </Link>

              <a
                href="#rotation"
                className="btn border border-white/30 text-white transition-colors hover:bg-white/10"
              >
                Back to the top
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
