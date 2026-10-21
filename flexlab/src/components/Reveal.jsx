import useReveal from "../hooks/useReveal";

/**
 * Fades a block of content up into place the first time it is seen.
 *
 * The hidden state is only applied when motion is welcome, so a reduced-motion
 * visitor never sees a flash of invisible content, and the page stays
 * readable even if the observer never fires.
 */
export default function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  style,
  children,
  ...rest
}) {
  const { ref, inView, reduced } = useReveal();

  const classes = [
    reduced ? "" : "reveal",
    inView ? "is-visible" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      ref={ref}
      className={classes || undefined}
      style={
        delay && !reduced ? { transitionDelay: `${delay}ms`, ...style } : style
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
