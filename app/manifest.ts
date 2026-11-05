import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "DealDrop",
    short_name: "DealDrop",
    description:
      "Track product prices from your favorite stores and get instant alerts when prices drop.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    background_color: "#0b0b0b",
    theme_color: "#FA5D19",
    lang: "en",
    dir: "auto",
    categories: ["shopping", "productivity"],
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
    screenshots: [
      {
        src: "/screenshots/screenshot_light.png",
        sizes: "1913x974",
        type: "image/png",
        form_factor: "wide",
        label: "DealDrop price tracking home page in light mode",
      },
      {
        src: "/screenshots/screenshot_dark.png",
        sizes: "1913x974",
        type: "image/png",
        form_factor: "wide",
        label: "DealDrop price tracking home page in dark mode",
      },
    ],
    shortcuts: [
      {
        name: "Price tracking guides",
        short_name: "Guides",
        url: "/guides",
        icons: [{ src: "/favicon-192.png", sizes: "192x192" }],
      },
      {
        name: "How DealDrop works",
        short_name: "How it works",
        url: "/#how",
        icons: [{ src: "/favicon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
