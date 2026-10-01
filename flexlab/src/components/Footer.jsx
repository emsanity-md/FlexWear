import { Link } from "react-router-dom";
import Logo from "./Logo";
import { CATEGORY_LABELS, CATEGORIES } from "../assets/products";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-bone">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <Logo />
              <span className="font-display text-lg font-extrabold tracking-tight">
                FlexWear
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              A UI demonstration of a curated streetwear rotation. The catalog
              loads from a static JSON file and every product illustration is
              drawn locally.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-iris">
              Shop
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  to="/products"
                  className="text-bone/70 transition-colors hover:text-bone"
                >
                  All products
                </Link>
              </li>
              {CATEGORIES.map((category) => (
                <li key={category}>
                  <Link
                    to={`/products?category=${category}`}
                    className="text-bone/70 transition-colors hover:text-bone"
                  >
                    {CATEGORY_LABELS[category]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-iris">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-bone/70 transition-colors hover:text-bone"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-bone/70 transition-colors hover:text-bone"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-bone/70 transition-colors hover:text-bone"
                >
                  Account
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@flexwear.demo"
                  className="text-bone/70 transition-colors hover:text-bone"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 space-y-2 border-t border-bone/15 pt-6 text-xs leading-relaxed text-muted">
          <p>
            Demo project. No real orders, payments, or shipments. Your cart is
            held in memory for this session only and clears on refresh. There
            are no accounts, no analytics, and no personal data collected.
          </p>
          <p>&copy; {new Date().getFullYear()} FlexWear. Demo build.</p>
        </div>
      </div>
    </footer>
  );
}