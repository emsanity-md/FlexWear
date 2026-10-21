/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E0B14",
        bone: "#F6F4F1",
        surface: "#FFFFFF",
        line: "#E4E0DC",
        muted: "#6B6577",
        iris: {
          DEFAULT: "#4328C9",
          deep: "#2F1C93",
          // Readable accent for dark surfaces. `iris` on `ink` is only
          // ~2.2:1, which fails WCAG for text.
          light: "#8B7BF5",
          tint: "#EFEBFB",
        },
      },
      fontFamily: {
        display: ["Syne", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Archivo", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(2.75rem, 7vw, 5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.03em" },
        ],
        "display-lg": [
          "clamp(2.25rem, 5vw, 3.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.025em" },
        ],
        "display-md": [
          "clamp(1.75rem, 3.5vw, 2.5rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        "display-sm": [
          "clamp(1.375rem, 2.4vw, 1.75rem)",
          { lineHeight: "1.2", letterSpacing: "-0.015em" },
        ],
        lede: [
          "clamp(1.0625rem, 1.3vw, 1.25rem)",
          { lineHeight: "1.6" },
        ],
        micro: ["0.6875rem", { lineHeight: "1rem" }],
      },
      maxWidth: {
        container: "76rem",
        measure: "68ch",
      },
      boxShadow: {
        card: "0 2px 8px rgba(14, 11, 20, 0.06)",
        lift: "0 20px 45px -28px rgba(14, 11, 20, 0.45)",
        glow: "0 24px 70px -34px rgba(67, 40, 201, 0.75)",
        drawer: "0 12px 40px rgba(14, 11, 20, 0.14)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "none" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "none" },
        },
        "slide-left": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "none" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "badge-pop": {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.4)" },
          "100%": { transform: "scale(1)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        "carousel-progress": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.55s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.3s ease-out both",
        "scale-in": "scale-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-left":
          "slide-left 0.35s cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-down": "slide-down 0.3s cubic-bezier(0.16, 1, 0.3, 1) both",
        marquee: "marquee 30s linear infinite",
        "badge-pop": "badge-pop 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
        "carousel-progress": "carousel-progress 4.5s linear forwards",
      },
    },
  },
  plugins: [],
};
