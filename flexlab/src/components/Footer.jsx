import { Link } from "react-router-dom";
import Logo from "./Logo";
import Reveal from "./Reveal";
import { CATEGORY_LABELS, CATEGORIES } from "../assets/products";

const COMPANY_LINKS = [
  { to: "/about", label: "About" },
  { to: "/cart", label: "Cart" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-bone">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <Logo size={26} />
              <span className="font-display text-lg font-extrabold tracking-tight">
                FlexWear
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone/70">
              A UI demonstration of a curated streetwear rotation. The catalog
              loads from a static JSON file and every product illustration is
              drawn locally.
            </p>

            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-iris-light/30 bg-iris-light/10 px-3.5 py-1.5 text-xs font-medium text-iris-light">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-iris-light"
              />
              No account required, anywhere
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h2 className="font-sans text-micro font-semibold uppercase tracking-[0.16em] text-iris-light">
              Shop
            </h2>

            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  to="/products"
                  className="link-underline text-bone/70 transition-colors hover:text-bone"
                >
                  All products
                </Link>
              </li>
              {CATEGORIES.map((category) => (
                <li key={category}>
                  <Link
                    to={`/products?category=${category}`}
                    className="link-underline text-bone/70 transition-colors hover:text-bone"
                  >
                    {CATEGORY_LABELS[category]}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={180}>
            <h2 className="font-sans text-micro font-semibold uppercase tracking-[0.16em] text-iris-light">
              Company
            </h2>

            <ul className="mt-4 space-y-2.5 text-sm">
              {COMPANY_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="link-underline text-bone/70 transition-colors hover:text-bone"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:hello@flexwear.demo"
                  className="link-underline text-bone/70 transition-colors hover:text-bone"
                >
                  Contact
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="mt-12 space-y-2 border-t border-bone/15 pt-6 text-xs leading-relaxed text-bone/60">
          <p>
            Demo project. No real orders, payments, or shipments. There are no
            accounts to create or sign in to. Your cart is held in memory for
            this session only and clears on refresh, and nothing is collected.
          </p>
          <p>&copy; {new Date().getFullYear()} FlexWear. Demo build.</p>
        </div>
      </div>
    </footer>
  );
}
