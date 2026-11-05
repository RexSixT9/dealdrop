import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FileSearch } from "lucide-react";
import MotionPage from "@/components/MotionPage";
import SiteHeader from "@/components/SiteHeader";
import { breadcrumbJsonLd } from "@/lib/seo";
import { defaultOpenGraphImage, siteUrl } from "@/lib/site";

const description =
  "How DealDrop collects product prices, how often it checks them, and the limitations you should know before relying on a price alert.";

export const metadata: Metadata = {
  title: "Methodology",
  description,
  alternates: {
    canonical: "/methodology",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/methodology`,
    title: "How DealDrop Checks Prices",
    description,
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "How DealDrop Checks Prices",
    description,
    images: [defaultOpenGraphImage.url],
  },
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Methodology", href: "/methodology" },
];

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <MotionPage className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-copper-forge" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-20 dark:opacity-30" />

        <SiteHeader />

        <section className="px-4 pb-20 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
          <div className="mx-auto w-full max-w-3xl">
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
                  Methodology
                </li>
              </ol>
            </nav>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
              <FileSearch className="h-3.5 w-3.5" />
              Methodology
            </div>
            <h1 className="font-heading mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              How DealDrop checks prices.
            </h1>
            <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Price tracking is only useful when you understand where the number
              came from. This page explains the data, the schedule, and the
              limits.
            </p>

            <div className="mt-12 space-y-10 border-t border-border/60 pt-10">
              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
                  Where prices come from
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  <p>
                    DealDrop reads the public product page you submit. A
                    third-party extraction service, Firecrawl, returns the
                    product name, current price, currency, and image when the
                    page exposes them.
                  </p>
                  <p>
                    We store the price and the time it was checked. The price is
                    the one visible on the page at that moment; it may not include
                    taxes, delivery, bank offers, coupons, or member pricing.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
                  How often checks run
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  Tracked products are checked on a scheduled run. The exact
                  interval depends on the deployment configuration and the number
                  of products being processed. The product card shows the most
                  recent successful check when available.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
                  What can go wrong
                </h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  <li>A retailer can change its page structure or block access.</li>
                  <li>A product can go out of stock or switch sellers.</li>
                  <li>The extracted price can be a variant you did not intend.</li>
                  <li>Currency symbols can be ambiguous across regions.</li>
                  <li>A check can fail, leaving the last known price in place.</li>
                </ul>
                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  Treat the displayed price as a signal, then verify it on the
                  retailer page before buying.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
                  Price history and retention
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  Price history is recorded when the price changes and is pruned
                  after a retention window. A flat chart can mean the price has
                  not moved, not that tracking is broken. Gaps can mean a failed
                  check or pruned history.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
                  Privacy
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  Your watchlist, target prices, and account details are private.
                  Public product pages show market data only, never your account
                  information. See the{" "}
                  <Link
                    href="/terms-privacy"
                    className="font-medium text-foreground underline underline-offset-4"
                  >
                    Terms and Privacy Policy
                  </Link>{" "}
                  for the full details.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
                  Corrections
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  If a tracked price looks wrong, remove and re-add the product
                  so the page is extracted again. For persistent issues, open an
                  issue on GitHub.
                </p>
                <a
                  href="https://github.com/RexSixT9/dealdrop/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Report an issue
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </section>
            </div>

            <div className="mt-12 rounded-3xl border border-border/70 bg-card/80 p-6 sm:p-8">
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Read before you rely on an alert.
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                Our guides explain targets, price history, and the reasons prices
                move.
              </p>
              <Link
                href="/guides"
                className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Browse guides
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </MotionPage>
    </main>
  );
}
