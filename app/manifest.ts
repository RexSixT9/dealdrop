import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DealDrop",
    short_name: "DealDrop",
    description:
      "Track product prices from your favorite stores and get instant alerts when prices drop.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0b",
    theme_color: "#FA5D19",
    icons: [
      {
        src: "/favicon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
