import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import MotionPage from "@/components/MotionPage";
import SiteHeader from "@/components/SiteHeader";
import { breadcrumbJsonLd } from "@/lib/seo";
import { defaultOpenGraphImage, siteUrl } from "@/lib/site";

const description =
  "DealDrop is a small, independent price tracker built to make product price history and drop alerts simple.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/about`,
    title: "About DealDrop",
    description,
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "About DealDrop",
    description,
    images: [defaultOpenGraphImage.url],
  },
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

export default function AboutPage() {
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
                  About
                </li>
              </ol>
            </nav>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
              <Heart className="h-3.5 w-3.5" />
              About
            </div>
            <h1 className="font-heading mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              A calmer way to shop for a lower price.
            </h1>
            <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              DealDrop is a small, independent price tracker. Paste a product
              link, set a target, and get an email when the price reaches it.
              No app install, no noisy feed, no endless deal hunting.
            </p>

            <div className="mt-12 space-y-10 border-t border-border/60 pt-10">
              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
                  Why it exists
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  <p>
                    Most price alerts are either too frequent or too vague. A
                    single product can send an alert every time a marketplace
                    seller changes a listing, which makes the useful drops hard
                    to spot.
                  </p>
                  <p>
                    DealDrop is built around a simple idea: track fewer products,
                    choose a target you would actually pay, and treat an alert as
                    a prompt to check the deal rather than an instruction to buy.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
                  What DealDrop does
                </h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  <li>Reads public product pages to find the current price.</li>
                  <li>Stores a price history so you can see the trend.</li>
                  <li>Sends an email when a tracked price drops.</li>
                  <li>Keeps your watchlist private to your account.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
                  What it does not do
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  <p>
                    DealDrop does not see member-only prices, coupons applied in
                    a cart, or regional offers. It cannot guarantee that a price
                    will stay available, and it is not a substitute for checking
                    the seller, warranty, delivery date, and return policy before
                    you buy.
                  </p>
                  <p>
                    Read the{" "}
                    <Link
                      href="/methodology"
                      className="font-medium text-foreground underline underline-offset-4"
                    >
                      methodology
                    </Link>{" "}
                    for the full picture.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
                  Open source
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  DealDrop is built with Next.js, Supabase, Firecrawl, and
                  Resend. The source is available on GitHub.
                </p>
                <a
                  href="https://github.com/RexSixT9/dealdrop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  View the repository
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </section>
            </div>

            <div className="mt-12 rounded-3xl border border-border/70 bg-card/80 p-6 sm:p-8">
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Start with one product.
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                Add a link, choose a target, and see how the price moves.
              </p>
              <Link
                href="/"
                className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Track a product
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </MotionPage>
    </main>
  );
}
