/**
 * Hand-authored icon set. One visual language with the product flats:
 * 24px grid, 1.5px stroke, round caps and joins.
 */

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Icon({ children, size = 20, className = "", ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      {...base}
      {...rest}
    >
      {children}
    </svg>
  );
}

export function CartIcon(props) {
  return (
    <Icon {...props}>
      <path d="M3 4h2.2l2.1 10.4a1.6 1.6 0 0 0 1.6 1.3h7.8a1.6 1.6 0 0 0 1.6-1.2L20 7.5H6" />
      <circle cx="10" cy="20" r="1.1" />
      <circle cx="17" cy="20" r="1.1" />
    </Icon>
  );
}

export function MenuIcon(props) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icon>
  );
}

export function CloseIcon(props) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Icon>
  );
}

export function EyeIcon(props) {
  return (
    <Icon {...props}>
      <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.8" />
    </Icon>
  );
}

export function ArrowLeftIcon(props) {
  return (
    <Icon {...props}>
      <path d="M11 5l-7 7 7 7M20 12H4.5" />
    </Icon>
  );
}

export function ArrowRightIcon(props) {
  return (
    <Icon {...props}>
      <path d="M13 5l7 7-7 7M4 12h15.5" />
    </Icon>
  );
}

export function ChevronDownIcon(props) {
  return (
    <Icon {...props}>
      <path d="M5 9l7 7 7-7" />
    </Icon>
  );
}

export function PlusIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 5v14M5 12h14" />
    </Icon>
  );
}

export function MinusIcon(props) {
  return (
    <Icon {...props}>
      <path d="M5 12h14" />
    </Icon>
  );
}

export function CheckIcon(props) {
  return (
    <Icon {...props}>
      <path d="M4.5 12.5l5 5 10-11" />
    </Icon>
  );
}

export function TrashIcon(props) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M9.5 7V5h5v2M6.5 7l.8 12.2a1 1 0 0 0 1 .8h7.4a1 1 0 0 0 1-.8L17.5 7" />
      <path d="M10.5 11v6M13.5 11v6" />
    </Icon>
  );
}