type LoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

// Use a lightweight image proxy to resize remote product images.
export function productImageLoader({ src, width, quality }: LoaderProps) {
  if (!src || src.startsWith("/")) return src;

  const url = new URL("https://images.weserv.nl/");
  url.searchParams.set("url", src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 70));
  url.searchParams.set("output", "webp");

  return url.toString();
}
