import type { Metadata } from "next";
import { ModeToggle } from "@/components/mode-toggle";
import AddProductForm from "@/components/AddProductForm";
import AuthButton from "@/components/AuthButton";
import Logo from "@/components/Logo";
import MotionPage from "@/components/MotionPage";
import {
  MotionItem,
  MotionReveal,
  MotionStagger,
} from "@/components/MotionReveal";
import ProductGrid from "@/components/ProductGrid";
import type { TrackedProduct } from "@/components/ProductCard";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { ArrowUpRight, Sparkles, TrendingDown } from "lucide-react";
import { FAQS, HIGHLIGHTS, STEPS } from "@/constants/data";
import { createClient } from "@/lib/supabase/server";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://deals.r6t9.space";
const DEFAULT_TRACKING_LIMIT = 4;

function getTrackingLimit() {
  const parsed = Number(process.env.MAX_TRACKED_URLS);
  if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_TRACKING_LIMIT;
  return Math.floor(parsed);
}

export const metadata: Metadata = {
  title: "DealDrop - Price Tracker & Alerts",
  description:
    "DealDrop tracks product prices, sends instant email alerts, and helps shoppers catch discounts before they disappear.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "DealDrop | Price Tracker & Alerts",
    description:
      "Track product prices, get instant drop alerts, and stay ready for the best time to buy.",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "DealDrop - Smart Price Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DealDrop | Price Tracker & Alerts",
    description:
      "Track product prices, get instant drop alerts, and stay ready for the best time to buy.",
    images: [`${siteUrl}/opengraph-image`],
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DealDrop",
    url: siteUrl,
    logo: `${siteUrl}/favicon-512.png`,
    sameAs: [],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DealDrop",
    url: siteUrl,
    description:
      "Track product prices, get instant drop alerts, and stay ready for the best time to buy.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
];

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const limit = getTrackingLimit();
  let products: TrackedProduct[] = [];

  if (user) {
    const { data, error } = await supabase
      .from("products")
      .select("id, name, url, current_price, currency, image_url")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
    } else if (data) {
      products = data as TrackedProduct[];
    }
  }

  const currentCount = products.length;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <MotionPage className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-copper-forge" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-20 dark:opacity-30" />

        <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
          <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <Logo variant="compact" />
            </div>
            <div className="flex shrink-0 items-center gap-2 max-[360px]:gap-1.5 sm:gap-3">
              <ModeToggle />
              <AuthButton user={user} />
            </div>
          </nav>
        </header>

        <MotionReveal>
          <section className="flex min-h-[calc(100svh-64px)] items-center px-4 pb-12 pt-14 sm:min-h-[calc(100svh-72px)] sm:px-6 sm:pb-16 sm:pt-20 lg:px-8">
            <MotionStagger className="mx-auto flex w-full max-w-4xl flex-col items-center gap-5 text-center sm:gap-7">
              <MotionItem className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
                <Sparkles className="h-3.5 w-3.5" />
                Smart price tracking
              </MotionItem>
              <MotionItem>
                <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  Track{" "}
                  <PointerHighlight
                    containerClassName="mx-1 align-baseline"
                    rectangleClassName="border-primary/50 bg-primary/10"
                    pointerClassName="text-primary"
                  >
                    <span className="text-primary">price drops</span>
                  </PointerHighlight>{" "}
                  without the noise.
                </h1>
              </MotionItem>
              <MotionItem>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-lg">
                  DealDrop monitors the products you care about and emails you when
                  they reach your target price.
                </p>
              </MotionItem>
              <MotionItem className="w-full">
                <AddProductForm
                  isAuthenticated={Boolean(user)}
                  currentCount={currentCount}
                  limit={limit}
                />
              </MotionItem>
              <MotionItem className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-muted-foreground sm:gap-3 sm:text-sm">
                <span className="rounded-full border border-border/70 bg-card/70 px-3 py-1">
                  No app install
                </span>
                <span className="rounded-full border border-border/70 bg-card/70 px-3 py-1">
                  Email alerts
                </span>
                <span className="rounded-full border border-border/70 bg-card/70 px-3 py-1">
                  Price history
                </span>
                {!user && (
                  <a
                    href="#how"
                    className="inline-flex items-center gap-1 text-foreground/70 transition-colors hover:text-foreground"
                  >
                    See how it works
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </MotionItem>
            </MotionStagger>
          </section>
        </MotionReveal>

        {user && (
          <MotionReveal>
            <section className="px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8">
              <div className="mx-auto w-full max-w-5xl">
                <MotionStagger className="mb-6 text-center sm:mb-8">
                  <MotionItem>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
                      Your watchlist
                    </p>
                  </MotionItem>
                  <MotionItem>
                    <h2 className="font-heading mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
                      Tracked products
                    </h2>
                  </MotionItem>
                  <MotionItem>
                    <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                      {currentCount > 0
                        ? "Manage your tracked products and check recent price moves."
                        : "Add a product URL to start tracking your first price drop."}
                    </p>
                  </MotionItem>
                </MotionStagger>

                {products.length > 0 ? (
                  <ProductGrid products={products} />
                ) : (
                  <div className="space-y-6">
                    <MotionReveal>
                      <div className="rounded-3xl border-2 border-dashed border-border/70 bg-card/70 p-8 text-center sm:p-10">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-border/70 bg-primary/10 text-primary">
                          <TrendingDown className="h-8 w-8" />
                        </div>
                        <h3 className="font-heading mb-2 text-xl font-semibold text-foreground">
                          Your watchlist is empty
                        </h3>
                        <p className="text-sm text-muted-foreground sm:text-base">
                          Add your first product above and let DealDrop watch the price
                          for you.
                        </p>
                      </div>
                    </MotionReveal>
                  </div>
                )}
              </div>
            </section>
          </MotionReveal>
        )}

        {!user && (
          <>
            <MotionReveal>
              <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                <MotionStagger className="mx-auto grid w-full max-w-5xl gap-4 sm:gap-5 md:grid-cols-3">
                  {HIGHLIGHTS.map((item) => (
                    <MotionItem
                      key={item.title}
                      className="flex h-full flex-col items-center gap-2 rounded-2xl border border-border/60 bg-card/70 p-5 text-center sm:p-6"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-primary/10 text-primary">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.copy}</p>
                    </MotionItem>
                  ))}
                </MotionStagger>
              </section>
            </MotionReveal>

            <MotionReveal>
              <section id="how" className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                <div className="mx-auto grid w-full max-w-5xl gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
                  <MotionStagger className="text-center">
                    <MotionItem>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
                        How it works
                      </p>
                    </MotionItem>
                    <MotionItem>
                      <h2 className="font-heading mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
                        Three steps. One alert.
                      </h2>
                    </MotionItem>
                    <MotionItem>
                      <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                        Set it once and stay ready for the next drop.
                      </p>
                    </MotionItem>
                  </MotionStagger>
                  <MotionStagger>
                    <ol className="grid gap-4 text-center sm:gap-5">
                      {STEPS.map((item) => (
                        <li key={item.step}>
                          <MotionItem className="flex flex-col items-center rounded-2xl border border-border/60 bg-card/70 p-5 sm:p-6">
                            <p className="text-[11px] font-semibold text-primary sm:text-xs">
                              {item.step}
                            </p>
                            <h3 className="mt-2 text-base font-semibold text-foreground">
                              {item.title}
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {item.copy}
                            </p>
                          </MotionItem>
                        </li>
                      ))}
                    </ol>
                  </MotionStagger>
                </div>
              </section>
            </MotionReveal>

            <MotionReveal>
              <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
                <MotionStagger className="mx-auto flex max-w-5xl flex-col items-center gap-5 rounded-3xl border border-border/70 bg-card/80 px-6 py-8 text-center sm:gap-6 sm:px-10 sm:py-10">
                  <MotionItem className="max-w-xl">
                    <h2 className="font-heading text-xl font-semibold text-foreground sm:text-3xl">
                      Ready when you are.
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                      Start with one link and keep your watchlist focused.
                    </p>
                  </MotionItem>
                  <MotionItem className="flex flex-wrap justify-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:gap-3 sm:text-xs">
                    <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1">
                      Free to start
                    </span>
                    <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1">
                      Cancel anytime
                    </span>
                    <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1">
                      No credit card
                    </span>
                  </MotionItem>
                </MotionStagger>
              </section>
            </MotionReveal>

            <MotionReveal>
              <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
                <div className="mx-auto w-full max-w-5xl">
                  <MotionStagger className="mb-6 text-center sm:mb-8">
                    <MotionItem>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
                        FAQ
                      </p>
                    </MotionItem>
                    <MotionItem>
                      <h2 className="font-heading mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
                        Common questions
                      </h2>
                    </MotionItem>
                    <MotionItem>
                      <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                        Quick answers for shoppers who want to track prices with less friction.
                      </p>
                    </MotionItem>
                  </MotionStagger>
                  <MotionStagger className="grid gap-4 md:grid-cols-3">
                    {FAQS.map((item) => (
                      <MotionItem key={item.question}>
                        <article className="rounded-2xl border border-border/60 bg-card/70 p-5 text-left sm:p-6">
                          <h3 className="text-base font-semibold text-foreground">
                            {item.question}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {item.answer}
                          </p>
                        </article>
                      </MotionItem>
                    ))}
                  </MotionStagger>
                </div>
              </section>
            </MotionReveal>
          </>
        )}
      </MotionPage>
    </main>
  );
}
