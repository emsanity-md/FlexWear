import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import DemoBanner from "./DemoBanner";
import authImage from "../assets/auth-streetwear.jpg";
import { ArrowLeftIcon, EyeIcon } from "./icons";

export function AuthField({
  id,
  label,
  type = "text",
  value,
  onChange,
  autoComplete,
  placeholder,
}) {
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === "password";
  const shown = isPassword && revealed;

  return (
    <div>
      <label
        htmlFor={id}
        className="block font-sans text-sm font-semibold text-ink"
      >
        {label}
      </label>

      <div className="relative mt-2">
        <input
          id={id}
          name={id}
          type={shown ? "text" : type}
          autoComplete={autoComplete}
          required
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="field pr-11"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted transition-colors hover:text-iris"
            aria-label={shown ? "Hide password" : "Show password"}
            aria-pressed={shown}
          >
            <EyeIcon size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export function DemoNotice({ children }) {
  return (
    <div className="rounded-md border border-iris/20 bg-iris-tint p-4">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-iris">
        Demo only
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink/80">{children}</p>
    </div>
  );
}

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen flex-col bg-bone">
      <DemoBanner />

      <div className="grid flex-1 lg:grid-cols-2">
        <div className="flex flex-col px-5 py-8 sm:px-8 sm:py-12">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-iris"
            >
              <ArrowLeftIcon size={18} />
              Back to store
            </Link>

            <Link to="/" className="flex items-center gap-2.5">
              <Logo size={26} />
              <span className="font-display text-base font-extrabold tracking-tight">
                FlexWear
              </span>
            </Link>
          </div>

          <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
            <h1 className="font-display text-display-md">{title}</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">{subtitle}</p>

            <div className="mt-8">{children}</div>

            {footer && <div className="mt-8">{footer}</div>}
          </div>
        </div>

        {/*
          Pinned to exactly one viewport height and made sticky, so the panel
          does not stretch to the full height of the form column. Letting it
          grow turned the crop into a tall narrow slice and lost the subject.
        */}
        <div
          className="auth-panel relative hidden overflow-hidden bg-ink lg:sticky lg:top-0 lg:block lg:h-screen"
        >
          <img
            src={authImage}
            alt=""
            className="h-full w-full object-cover object-center"
          />

          {/* Solid scrim, not a gradient, so the caption stays legible */}
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-ink/70" />

          <div className="absolute inset-0 flex items-end p-10">
            <p className="max-w-sm font-display text-2xl font-bold leading-snug text-bone">
              Twenty pieces. One rotation. No filler.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}