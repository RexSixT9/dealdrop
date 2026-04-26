import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { FEATURES } from "@/constants/data";
import AddProductForm from "@/components/AddProductForm";
import AuthButton from "@/components/AuthButton";
import ProductCard, { type TrackedProduct } from "../components/ProductCard";
import { getProducts } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";
import { TrendingDown } from "lucide-react";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products: TrackedProduct[] = user ? await getProducts() : [];

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-background">
      <div
        className="page-ambient pointer-events-none absolute inset-x-0 -top-12 -z-10 h-96 w-full sm:h-112 lg:h-136"
        aria-hidden="true"
      />
      <header className="sticky top-0 z-10 border-b border-border/70 bg-background/80 backdrop-blur-sm supports-backdrop-filter:bg-background/65">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <Image
              loading="eager"
              className="hidden dark:block h-10 w-auto"
              src="/logos.png"
              alt="DealDrop logo"
              width={600}
              height={600}
            />
            <Image
              loading="eager"
              className="block dark:hidden h-10 w-auto"
              src="/logo.png"
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
      <section className="mx-auto w-full max-w-7xl px-4 pt-12 pb-14 text-center sm:px-6 sm:pt-16 sm:pb-20 lg:px-8 lg:pt-20 lg:pb-24">
        <div>
          <div className="mx-auto mb-4 inline-flex w-fit items-center justify-center gap-2 rounded-full border border-[#FA5D19]/25 bg-[#FA5D19]/12 px-4 py-2 text-center text-sm font-medium text-[#B44414] dark:text-[#FF9D72]">
            Real-time price tracking
          </div>
          <h2 className="font-heading mb-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Catch the drop before it is gone
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-base text-muted-foreground sm:mb-12 sm:text-lg lg:text-xl">
            Paste any product link, track price changes instantly, and get
            alerts when it is the right time to buy.
          </p>

          <AddProductForm isAuthenticated={Boolean(user)} />

          {products.length === 0 && (
            <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="surface-panel h-full p-5 text-card-foreground transition-transform duration-200 hover:-translate-y-1 hover:shadow-sm sm:p-6"
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
          )}
        </div>
      </section>

      {user && products.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
              Your Watchlist
            </h3>
            <span className="text-sm text-muted-foreground">
              {products.length} {products.length === 1 ? "product" : "products"}
            </span>
          </div>

          <div className="grid items-start gap-5 sm:gap-6 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {user && products.length === 0 && (
        <section className="mx-auto max-w-2xl px-4 pb-16 text-center sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
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
    </main>
  );
}
