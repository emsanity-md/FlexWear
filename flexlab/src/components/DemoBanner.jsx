/**
 * Persistent notice that this is a UI demonstration, not a working store.
 */
export default function DemoBanner() {
  return (
    <div className="border-b border-line bg-bone">
      <div className="shell flex items-center justify-center gap-2 py-2">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-iris"
        />
        <p className="text-center text-xs leading-relaxed text-muted">
          Demo storefront. No real orders are placed and no data is collected.
        </p>
      </div>
    </div>
  );
}