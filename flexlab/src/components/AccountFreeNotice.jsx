import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { ArrowRightIcon, LockIcon, ShieldIcon, UserIcon } from "./icons";

const POINTS = [
  {
    icon: UserIcon,
    title: "No sign-up",
    body: "There is no account form anywhere in this build. Nothing asks for a name, an email, or a password.",
  },
  {
    icon: LockIcon,
    title: "No password",
    body: "No credentials means no credentials to leak, reset, or store. There is no session to expire.",
  },
  {
    icon: ShieldIcon,
    title: "Nothing stored",
    body: "Your cart lives in the page's memory and clears when you close the tab. It never reaches a server.",
  },
];

/**
 * The store's position on accounts, stated plainly.
 *
 * A real storefront would put a sign-in wall in front of checkout so orders
 * could be tracked. This one has no orders to track, so the wall would buy
 * nothing and cost the visitor a form they have no reason to fill in.
 */
export default function AccountFreeNotice() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="shell section-y">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">No account, ever</p>

            <h2 className="mt-4 font-display text-display-lg">
              You don&apos;t need an account to buy here
            </h2>

            <p className="lede mt-5">
              Most stores ask you to sign up before checkout so they can track
              your order. There are no orders here to track, so the form would
              only get in the way. Browse the rotation, build a cart, done.
            </p>

            <Link
              to="/products"
              className="btn btn-primary mt-8 group"
            >
              Browse the rotation
              <ArrowRightIcon
                size={18}
                className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
              />
            </Link>
          </Reveal>

          <ul className="grid gap-6 sm:grid-cols-3 lg:col-span-7">
            {POINTS.map((point, index) => {
              const Icon = point.icon;
              return (
                <Reveal
                  key={point.title}
                  as="li"
                  delay={index * 90}
                  className="border-t border-line pt-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-iris/20 bg-iris-tint text-iris">
                    <Icon size={20} />
                  </span>

                  <h3 className="mt-5 font-display text-base font-bold">
                    {point.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {point.body}
                  </p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
