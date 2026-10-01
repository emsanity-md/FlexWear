import catalog from "../assets/products.json";

/*
 * Photography is bundled locally rather than hotlinked, so the storefront
 * works offline and no image depends on a third-party CDN.
 */
const photos = import.meta.glob("./photos/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});

function resolve(key) {
  const match = Object.keys(photos).find((path) =>
    path.endsWith(`/photos/${key}.jpg`),
  );
  return match ? photos[match] : "";
}

export const CATEGORIES = [
  "tees",
  "fleece",
  "outerwear",
  "bottoms",
  "headwear",
  "bags",
  "footwear",
];

export const CATEGORY_LABELS = {
  tees: "Tees",
  fleece: "Fleece",
  outerwear: "Outerwear",
  bottoms: "Bottoms",
  headwear: "Headwear",
  bags: "Bags",
  footwear: "Footwear",
};

export const products = catalog.map((product) => ({
  ...product,
  src: resolve(product.image),
}));

export function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}