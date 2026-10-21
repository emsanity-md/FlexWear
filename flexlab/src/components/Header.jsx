import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import DemoBanner from "./DemoBanner";
import { CartIcon, CloseIcon, MenuIcon } from "./icons";

const NAV = [
  { to: "/products", label: "Shop" },
  { to: "/about", label: "About" },
];

function navClass({ isActive }) {
  return [
    "link-underline text-sm font-medium transition-colors duration-200",
    isActive ? "text-iris" : "text-ink hover:text-iris",
  ].join(" ");
}

export default function Header({ cartCount = 0 }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const drawerRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Any navigation closes the drawer.
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // The banner folds away and the header tightens once the page moves.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*
    Drawer behaviour: Escape closes it, Tab stays inside it, and the page
    behind it stops scrolling while it is open.
  */
  useEffect(() => {
    if (!drawerOpen) return;

    const node = drawerRef.current;
    const focusable = node?.querySelectorAll(
      "a[href], button:not([disabled])",
    );
    focusable?.[0]?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [drawerOpen]);

  return (
    <>
      <div className="sticky top-0 z-50">
        {/* The banner folds away on scroll so it costs no permanent height. */}
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out-expo ${
            scrolled ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
          }`}
        >
          <div className="overflow-hidden">
            <DemoBanner />
          </div>
        </div>

        <header
          className={`border-b border-line bg-bone/90 backdrop-blur transition-[height,box-shadow] duration-300 ease-out-expo ${
            scrolled ? "h-14 shadow-card" : "h-16"
          }`}
        >
          <div className="shell flex h-full items-center justify-between gap-6">
            <Link
              to="/"
              className="flex items-center gap-2.5"
              aria-label="FlexWear home"
            >
              <Logo size={26} className="transition-transform duration-300 ease-out-expo" />
              <span className="font-display text-lg font-extrabold tracking-tight">
                FlexWear
              </span>
            </Link>

            <nav
              className="hidden items-center gap-8 md:flex"
              aria-label="Primary"
            >
              {NAV.map((item) => (
                <NavLink key={item.to} to={item.to} className={navClass}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <Link
                to="/cart"
                className="relative rounded-md p-2 text-ink transition-colors hover:text-iris"
                aria-label={`Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
              >
                <CartIcon />
                {cartCount > 0 && (
                  <span
                    // Re-keying on the count replays the pop animation.
                    key={cartCount}
                    aria-hidden="true"
                    className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 animate-badge-pop items-center justify-center rounded-full bg-iris px-1 text-[10px] font-semibold text-white"
                  >
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Always mounted, so a change to the count is announced. */}
              <span className="sr-only" role="status" aria-live="polite">
                {cartCount} item{cartCount === 1 ? "" : "s"} in cart
              </span>

              <button
                type="button"
                ref={menuButtonRef}
                onClick={() => setDrawerOpen(true)}
                className="-mr-2 rounded-md p-2.5 text-ink transition-colors hover:text-iris md:hidden"
                aria-expanded={drawerOpen}
                aria-controls="mobile-nav"
                aria-label="Open menu"
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </header>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            type="button"
            className="absolute inset-0 animate-fade-in bg-ink/50"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            tabIndex={-1}
          />

          <div
            id="mobile-nav"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            className="absolute inset-y-0 right-0 flex w-[min(20rem,86vw)] animate-slide-left flex-col bg-bone shadow-drawer"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="font-display text-lg font-extrabold tracking-tight">
                Menu
              </span>

              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="-mr-2 rounded-md p-2.5 text-ink transition-colors hover:text-iris"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="flex flex-col p-5" aria-label="Mobile">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "border-b border-line py-4 font-display text-2xl font-bold tracking-tight transition-colors",
                      isActive ? "text-iris" : "text-ink",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  [
                    "border-b border-line py-4 font-display text-2xl font-bold tracking-tight transition-colors",
                    isActive ? "text-iris" : "text-ink",
                  ].join(" ")
                }
              >
                Cart
                {cartCount > 0 && (
                  <span className="ml-2 text-base font-semibold tabular-nums text-muted">
                    ({cartCount})
                  </span>
                )}
              </NavLink>
            </nav>

            <div className="mt-auto border-t border-line p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <p className="text-xs leading-relaxed text-muted">
                No account needed. Browse the rotation and build a cart without
                signing up — nothing is stored and no data is collected.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
