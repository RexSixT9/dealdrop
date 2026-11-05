export const siteName = "DealDrop";

export const siteDescription =
  "Track product prices from your favorite stores and get instant alerts when prices drop.";

export const siteUrl = (
  process.env.NEXT_PUBLIC_APP_URL ?? "https://deals.r6t9.space"
).replace(/\/$/, "");

export const defaultOpenGraphImage = {
  url: `${siteUrl}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "DealDrop - Smart Price Tracker",
};

export function absoluteUrl(path: string) {
  return new URL(path, `${siteUrl}/`).toString();
}

export function formatGuideDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}
