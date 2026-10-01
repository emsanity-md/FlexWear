/**
 * The FlexWear mark. Matches /public/flexwear.svg so the browser tab,
 * the favicon and the site header all agree.
 */
export default function Logo({ size = 28, className = "" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="14" fill="#0E0B14" />
      <path d="M17 16h17v7H25v8h9v7h-9v14h-8V16z" fill="#F6F4F1" />
      <path d="M47 16h-7l-9 32h7l9-32z" fill="#4328C9" />
    </svg>
  );
}