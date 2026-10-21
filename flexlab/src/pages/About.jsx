import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { ArrowRightIcon } from "../components/icons";
import { CATEGORY_LABELS, CATEGORIES } from "../assets/products";

const DETAILS = [
  [
    "What works",
    "Routing, category filtering, product browsing, cart state, quantity adjustment, and removal.",
  ],
  [
    "What does not",
    "There is no checkout, no payment processing, and no order fulfilment.",
  ],
  [
    "Accounts",
    "There are none. Nothing in this build asks you to create an account or sign in to one, and there is no account system behind the scenes.",
  ],
  [
    "Your data",
    "Nothing is collected. The cart clears on refresh and is never written to storage or sent anywhere.",
  ],
  [
    "Imagery",
    "Product photography comes from Unsplash and is stored in the repo, so no page makes a third-party image request.",
  ],
];

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line glow">
        <div className="shell relative py-20 sm:py-24 lg:py-28">
          <Reveal>
            <p className="eyebrow">About</p>

            <h1 className="mt-5 max-w-3xl font-display text-display-xl">
              A small rotation, kept deliberately small.
            </h1>
          </Reveal>

          <Reveal delay={90}>
            <div className="mt-10 grid gap-10 border-t border-line pt-10 lg:grid-cols-2 lg:gap-16">
              <p className="text-lg leading-relaxed">
                FlexWear started as a question about how much clothing a store
                actually needs. The answer that stuck was: far less than anyone
                puts out. Twenty pieces, replaced as they sell, beats two
                thousand listings you never scroll through.
              </p>

              <p className="text-base leading-relaxed text-muted">
                That constraint shapes everything here. Categories stay tight,
                the fit of a garment gets stated on the card instead of buried
                in a size chart, and nothing enters the rotation without a
                reason to be there. Heavy tees, loopback fleece, cargo pants, a
                couple of pairs of shoes, and the small things that finish an
                outfit.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell section-y">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading
              title="What this build is"
              size="display-md"
              as="h2"
            />
          </Reveal>

          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-base leading-relaxed text-muted">
                A front-end demonstration. The catalog lives in a static JSON
                file, the cart is held in memory for the session, and every
                product photograph is bundled locally, not hotlinked.
              </p>
            </Reveal>

            <dl className="section-gap grid gap-8 sm:grid-cols-2">
              {DETAILS.map(([term, detail], index) => (
                <Reveal
                  key={term}
                  as="div"
                  delay={index * 60}
                  className="border-t border-line pt-5"
                >
                  <dt className="font-display text-base font-bold">{term}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">
                    {detail}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="shell section-y">
          <Reveal>
            <SectionHeading
              eyebrow="Browse"
              title="Browse by category"
              size="display-md"
              as="h2"
            />
          </Reveal>

          <div className="section-gap flex flex-wrap gap-3">
            {CATEGORIES.map((category, index) => (
              <Reveal key={category} delay={index * 50}>
                <Link to={`/products?category=${category}`} className="btn btn-secondary group">
                  {CATEGORY_LABELS[category]}
                  <ArrowRightIcon
                    size={18}
                    className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
