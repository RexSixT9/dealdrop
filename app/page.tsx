import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { FEATURES } from "@/constants/data";
import AddProductForm from "@/components/AddProductForm";
import AuthButton from "@/components/AuthButton";
import { type TrackedProduct } from "../components/ProductCard";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";
import { Sparkles, TrendingDown } from "lucide-react";
import { Suspense } from "react";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-background">
      <div
        className="page-ambient pointer-events-none absolute inset-x-0 -top-12 -z-10 h-96 w-full sm:h-112 lg:h-136"
        aria-hidden="true"
      />
      <header className="sticky top-0 z-10 border-b border-border/30 bg-linear-to-b from-background/80 to-background/58 backdrop-blur-md supports-backdrop-filter:from-background/70 supports-backdrop-filter:to-background/45">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <div className="flex h-8 items-center gap-3 lg:h-9">
            <Image
              loading="eager"
              className="hidden h-8 w-auto dark:block lg:h-9"
              src="/logo-navbar-dark.svg"
              alt="DealDrop logo"
              width={600}
              height={600}
            />
            <Image
              loading="eager"
              className="block h-8 w-auto dark:hidden lg:h-9"
              src="/logo-navbar-light.svg"
              alt="DealDrop logo"
              width={600}
              height={600}
            />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ModeToggle />
            <AuthButton user={user} />
          </div>
        </div>
      </header>
      <section className="section-pad-hero mx-auto w-full max-w-7xl text-center">
        <div className="mx-auto flex max-w-4xl flex-col items-center stack-hero">
          <div className="hero-badge mx-auto inline-flex items-center justify-center gap-2 px-3 py-1.5 text-[11px] font-semibold sm:px-4 sm:py-2 sm:text-xs md:text-sm lg:px-5 lg:py-2.5">
            <Sparkles className="h-3 w-3 text-current opacity-90 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
            Real-time price tracking
          </div>
          <h2 className="font-heading text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl sm:leading-tight md:text-5xl lg:text-6xl">
            Catch the drop before it is gone
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            Paste any product link, track price changes instantly, and get
            alerts when it is the right time to buy.
          </p>

          <AddProductForm isAuthenticated={Boolean(user)} />
        </div>
      </section>
      <Suspense fallback={<ProductsFallback />}>
        <ProductsSection user={user} />
      </Suspense>
    </main>
  );
}

function ProductsFallback() {
  return (
    <section className="section-pad mx-auto w-full max-w-7xl">
      <div className="h-24 w-full animate-pulse rounded-2xl border border-border/60 bg-card/60" />
    </section>
  );
}

async function ProductsSection({ user }: { user: unknown }) {
  const products: TrackedProduct[] = user ? await getProducts() : [];

  return (
    <>
      {products.length === 0 && (
        <section className="section-pad mx-auto w-full max-w-7xl">
          <div className="mx-auto w-full max-w-6xl">
            <div className="border-t border-border/50 pt-8 sm:pt-10 lg:pt-12">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
                {FEATURES.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="surface-panel flex h-full flex-col items-center justify-center p-5 text-center text-card-foreground transition-transform duration-200 hover:-translate-y-1 hover:shadow-sm sm:p-6"
                  >
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#FA5D19]/25 bg-[#FA5D19]/12">
                      <Icon className="w-6 h-6 text-[#FA5D19]" />
                    </div>
                    <h3 className="font-heading mb-2 font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {user && products.length > 0 && (
        <section className="section-pad mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-2 sm:mb-7 sm:flex-row sm:items-center sm:justify-between lg:mb-8">
            <h3 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
              Your Watchlist
            </h3>
            <span className="text-sm text-muted-foreground">
              {products.length} {products.length === 1 ? "product" : "products"}
            </span>
          </div>

          <ProductGrid products={products} />
        </section>
      )}

      {user && products.length === 0 && (
        <section className="section-pad mx-auto max-w-2xl text-center">
          <div className="surface-panel border-2 border-dashed p-8 sm:p-12">
            <TrendingDown className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="font-heading mb-2 text-xl font-semibold text-foreground">
              Your watchlist is empty
            </h3>
            <p className="text-muted-foreground">
              Add your first product above and let DealDrop watch the price for
              you.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
