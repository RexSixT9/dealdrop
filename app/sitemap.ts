import type { MetadataRoute } from "next";
import { GUIDES } from "@/constants/guides";
import { absoluteUrl } from "@/lib/site";

const HOME_UPDATED = new Date("2026-11-05T00:00:00.000Z");
const TERMS_UPDATED = new Date("2026-05-19T00:00:00.000Z");
const GUIDES_UPDATED = new Date(
  GUIDES.reduce(
    (latest, guide) =>
      new Date(guide.updatedAt) > latest ? new Date(guide.updatedAt) : latest,
    new Date(0),
  ),
);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: HOME_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/guides"),
      lastModified: GUIDES_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: HOME_UPDATED,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/methodology"),
      lastModified: HOME_UPDATED,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/terms-privacy"),
      lastModified: TERMS_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...GUIDES.map((guide) => ({
      url: absoluteUrl(`/guides/${guide.slug}`),
      lastModified: new Date(guide.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
