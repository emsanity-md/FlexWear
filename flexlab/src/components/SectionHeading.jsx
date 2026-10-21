import Reveal from "./Reveal";

/*
 * Tailwind scans source files for complete class names, so the sizes have to
 * be written out in full rather than interpolated.
 */
const SIZES = {
  "display-xl": "text-display-xl",
  "display-lg": "text-display-lg",
  "display-md": "text-display-md",
  "display-sm": "text-display-sm",
};

/**
 * The shared section header.
 *
 * Every section on every page used to hand-roll its own eyebrow, heading,
 * lede and action link, with four different gap values between them. One
 * component keeps the hierarchy identical from the home page to the cart.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  action,
  as: Tag = "h2",
  size = "display-lg",
  className = "",
}) {
  return (
    <div className={className}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}

      <Tag className={`mt-4 font-display ${SIZES[size] ?? SIZES["display-lg"]}`}>
        {title}
      </Tag>

      {lede && <p className="lede mt-5 max-w-2xl">{lede}</p>}

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

/**
 * Header variant that reveals itself on scroll instead of arriving with the
 * rest of the page above the fold.
 */
export function RevealedSectionHeading(props) {
  return (
    <Reveal>
      <SectionHeading {...props} />
    </Reveal>
  );
}
