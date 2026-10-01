import { useEffect, useState } from "react";
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
    "text-sm font-medium transition-colors duration-150",
    isActive ? "text-iris" : "text-ink hover:text-iris",
  ].join(" ");
}

export default function Header({ cartCount = 0 }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="sticky top-0 z-50">
      <DemoBanner />

      <header className="border-b border-line bg-bone">
        <div className="shell flex h-16 items-center justify-between gap-6">
          <Link
            to="/"
            className="flex items-center gap-2.5"
            aria-label="FlexWear home"
          >
            <Logo />
            <span className="font-display text-lg font-extrabold tracking-tight">
              FlexWear
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} className={navClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              to="/login"
              className="hidden rounded-md px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-iris md:block"
            >
              Account
            </Link>

            <Link
              to="/cart"
              className="relative rounded-md p-2 text-ink transition-colors hover:text-iris"
              aria-label={`Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            >
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-iris px-1 text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="rounded-md p-2 text-ink transition-colors hover:text-iris md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="mobile-nav"
          className="animate-fade-up border-b border-line bg-bone shadow-drawer md:hidden"
        >
          <nav className="shell flex flex-col py-4" aria-label="Mobile">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "border-b border-line py-4 font-display text-2xl font-bold tracking-tight",
                    isActive ? "text-iris" : "text-ink",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/login"
              className="border-b border-line py-4 font-display text-2xl font-bold tracking-tight text-ink"
            >
              Account
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}