import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import MotionPage from "@/components/MotionPage";
import SiteHeader from "@/components/SiteHeader";
import { GUIDES } from "@/constants/guides";
import { absoluteUrl, defaultOpenGraphImage, siteUrl } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

const description =
  "Practical guides to price tracking, price history, sales cycles, and spotting a deal that is actually worth buying.";

export const metadata: Metadata = {
  title: "Price Tracking Guides",
  description,
  alternates: {
    canonical: "/guides",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/guides`,
    title: "Price Tracking Guides | DealDrop",
    description,
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Price Tracking Guides | DealDrop",
    description,
    images: [defaultOpenGraphImage.url],
  },
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Guides", href: "/guides" },
];

const jsonLd = [
  breadcrumbJsonLd(breadcrumbs),
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "DealDrop price tracking guides",
    itemListElement: GUIDES.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.title,
      url: absoluteUrl(`/guides/${guide.slug}`),
    })),
  },
];

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MotionPage className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-copper-forge" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-20 dark:opacity-30" />

        <SiteHeader />

        <section className="px-4 pb-20 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 text-sm text-muted-foreground"
            >
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="transition-colors hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-foreground">
                  Guides
                </li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
                <BookOpen className="h-3.5 w-3.5" />
                Guides
              </div>
              <h1 className="font-heading mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Better price tracking starts here.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-lg">
                Practical reads on setting a target, reading price history, and
                recognising when a discount is worth acting on.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
              {GUIDES.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card/70 p-6 text-left transition-colors hover:border-primary/40 hover:bg-card/90 sm:p-7"
                >
                  <p className="text-[11px] font-medium uppercase tracking-wide text-primary sm:text-xs">
                    {guide.readingTime} min read
                  </p>
                  <h2 className="mt-3 text-lg font-semibold text-foreground">
                    {guide.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {guide.excerpt}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-primary">
                    Read guide
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </MotionPage>
    </main>
  );
}
