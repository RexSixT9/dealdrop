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
import LightRaysBackground from "@/components/ui/LightRaysBackground";
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
      <MotionPage className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-20 dark:opacity-30" />
        <LightRaysBackground />

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
          <section className="flex min-h-[82svh] items-center px-4 pb-14 pt-12 sm:min-h-[78svh] sm:px-6 sm:pb-20 sm:pt-16 lg:min-h-[640px] lg:px-8 lg:pb-16 lg:pt-20 xl:min-h-[680px] 2xl:min-h-[720px]">
            <MotionStagger className="mx-auto flex w-full max-w-4xl flex-col items-center gap-5 text-center sm:gap-7 lg:gap-6">
              <MotionItem className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">
                <Sparkles className="h-3.5 w-3.5" />
                Smart price tracking
              </MotionItem>
              <MotionItem>
                <h1 className="font-heading max-w-3xl text-4xl font-bold text-foreground sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-[1.06]">
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
                <p className="max-w-2xl text-base font-normal leading-8 text-muted-foreground sm:text-lg sm:leading-9 lg:max-w-3xl">
                  DealDrop monitors the products you care about and emails you
                  when they reach your target price.
                </p>
              </MotionItem>
              <MotionItem className="w-full pt-3">
                <AddProductForm
                  isAuthenticated={Boolean(user)}
                  currentCount={currentCount}
                  limit={limit}
                />
              </MotionItem>
              <MotionItem className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs text-muted-foreground sm:gap-3.5 sm:text-sm">
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
            <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-16 xl:pb-20">
              <div className="mx-auto w-full max-w-6xl">
                <MotionStagger className="mb-8 text-center sm:mb-10 lg:mb-9">
                  <MotionItem>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">
                      Your watchlist
                    </p>
                  </MotionItem>
                  <MotionItem>
                    <h2 className="font-heading mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
                      Tracked products
                    </h2>
                  </MotionItem>
                  <MotionItem>
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
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
                      <div className="rounded-3xl border-2 border-dashed border-border/70 bg-card/70 p-8 text-center sm:p-12">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-border/70 bg-primary/10 text-primary">
                          <TrendingDown className="h-8 w-8" />
                        </div>
                        <h3 className="font-heading mb-3 text-xl font-semibold text-foreground">
                          Your watchlist is empty
                        </h3>
                        <p className="mx-auto max-w-md text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                          Add your first product above and let DealDrop watch
                          the price for you.
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
              <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-16 xl:py-20">
                <MotionStagger className="mx-auto grid w-full max-w-6xl items-stretch gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-7">
                  {HIGHLIGHTS.map((item) => (
                    <MotionItem
                      key={item.title}
                      className="h-full"
                    >
                      <article className="flex h-full flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card/70 p-6 text-center sm:p-7">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-primary/10 text-primary">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-base font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-6 text-muted-foreground">
                          {item.copy}
                        </p>
                      </article>
                    </MotionItem>
                  ))}
                </MotionStagger>
              </section>
            </MotionReveal>

            <MotionReveal>
              <section id="how" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-16 xl:py-20">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 sm:gap-10 lg:gap-12">
                  <MotionStagger className="mx-auto max-w-2xl text-center">
                    <MotionItem>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">
                        How it works
                      </p>
                    </MotionItem>
                    <MotionItem>
                      <h2 className="font-heading mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
                        Three steps. One alert.
                      </h2>
                    </MotionItem>
                    <MotionItem>
                      <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                        Set it once and stay ready for the next drop.
                      </p>
                    </MotionItem>
                  </MotionStagger>
                  <MotionStagger>
                    <ol className="grid items-stretch gap-5 text-center sm:gap-6 lg:grid-cols-3 lg:gap-7">
                      {STEPS.map((item) => (
                        <li key={item.step} className="h-full">
                          <MotionItem className="h-full">
                            <article className="flex h-full flex-col items-center rounded-2xl border border-border/60 bg-card/70 p-6 sm:p-7">
                              <p className="text-[11px] font-medium text-primary sm:text-xs">
                                {item.step}
                              </p>
                              <h3 className="mt-3 text-base font-semibold text-foreground">
                                {item.title}
                              </h3>
                              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                {item.copy}
                              </p>
                            </article>
                          </MotionItem>
                        </li>
                      ))}
                    </ol>
                  </MotionStagger>
                </div>
              </section>
            </MotionReveal>

            <MotionReveal>
              <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-16 xl:py-20">
                <MotionStagger className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl border border-border/70 bg-card/80 px-6 py-10 text-center sm:gap-8 sm:px-10 sm:py-12">
                  <MotionItem className="max-w-xl">
                    <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                      Ready when you are.
                    </h2>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                      Start with one link and keep your watchlist focused.
                    </p>
                  </MotionItem>
                  <MotionItem className="flex flex-wrap justify-center gap-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground sm:gap-3.5 sm:text-xs">
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
              <section className="px-4 pb-24 pt-8 sm:px-6 sm:pb-28 sm:pt-10 lg:px-8 lg:pb-24 lg:pt-8 xl:pb-28">
                <div className="mx-auto w-full max-w-6xl">
                  <MotionStagger className="mb-8 text-center sm:mb-10 lg:mb-9">
                    <MotionItem>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">
                        FAQ
                      </p>
                    </MotionItem>
                    <MotionItem>
                      <h2 className="font-heading mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
                        Common questions
                      </h2>
                    </MotionItem>
                    <MotionItem>
                      <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                        Quick answers for shoppers who want to track prices with
                        less friction.
                      </p>
                    </MotionItem>
                  </MotionStagger>
                  <MotionStagger className="grid gap-5 md:grid-cols-3 lg:gap-6">
                    {FAQS.map((item) => (
                      <MotionItem key={item.question} className="h-full">
                        <article className="h-full rounded-2xl border border-border/60 bg-card/70 p-6 text-left sm:p-7">
                          <h3 className="text-base font-semibold text-foreground">
                            {item.question}
                          </h3>
                          <p className="mt-3 text-sm leading-6 text-muted-foreground">
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
