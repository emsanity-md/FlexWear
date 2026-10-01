import { Link } from "react-router-dom";
import { ArrowRightIcon } from "../components/icons";
import { CATEGORY_LABELS, CATEGORIES } from "../assets/products";

export default function About() {
  return (
    <>
      <section className="border-b border-line">
        <div className="shell py-20 sm:py-24 lg:py-28">
          <p className="eyebrow">About</p>

          <h1 className="mt-5 max-w-3xl font-display text-display-xl">
            A small rotation, kept deliberately small.
          </h1>

          <div className="mt-10 grid gap-10 border-t border-line pt-10 lg:grid-cols-2 lg:gap-16">
            <p className="text-lg leading-relaxed">
              FlexWear started as a question about how much clothing a store
              actually needs. The answer that stuck was: far less than anyone
              puts out. Twenty pieces, replaced as they sell, beats two thousand
              listings you never scroll through.
            </p>

            <p className="text-base leading-relaxed text-muted">
              That constraint shapes everything here. Categories stay tight,
              the fit of a garment gets stated on the card instead of buried in
              a size chart, and nothing enters the rotation without a reason to
              be there. Heavy tees, loopback fleece, cargo pants, a couple of
              pairs of shoes, and the small things that finish an outfit.
            </p>
          </div>
        </div>
      </section>

      <section className="shell section-y">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-display-md">
              What this build is
            </h2>
          </div>

          <div className="lg:col-span-8">
            <p className="text-base leading-relaxed text-muted">
              A front-end demonstration. The catalog lives in a static JSON file,
              the cart is held in memory for the session, and every product
              photography is bundled locally, not hotlinked.
            </p>

            <dl className="mt-10 grid gap-8 sm:grid-cols-2">
              {[
                [
                  "What works",
                  "Routing, category filtering, product browsing, cart state, quantity adjustment, and removal.",
                ],
                [
                  "What does not",
                  "There are no accounts, no checkout, no payment processing, and no order fulfilment.",
                ],
                [
                  "Your data",
                  "Nothing is collected. The cart clears on refresh and is never written to storage or sent anywhere.",
                ],
                [
                  "Imagery",
                  "Product photography comes from Unsplash and is stored in the repo, so no page makes a third-party image request.",
                ],
              ].map(([term, detail]) => (
                <div key={term} className="border-t border-line pt-5">
                  <dt className="font-display text-base font-bold">{term}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">
                    {detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="shell section-y">
          <h2 className="font-display text-display-md">
            Browse by category
          </h2>

          <div className="mt-10 flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="btn btn-secondary"
              >
                {CATEGORY_LABELS[category]}
                <ArrowRightIcon size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}