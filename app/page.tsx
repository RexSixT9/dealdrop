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
    <main className="relative isolate min-h-screen overflow-hidden bg-linear-to-b from-background via-background to-muted/40">
      <div
        className="page-ambient pointer-events-none absolute left-1/2 -top-16 -z-10 h-112 w-full max-w-5xl -translate-x-1/2"
        aria-hidden="true"
      />
      <header className="sticky top-0 z-10 border-b border-border/70 bg-background/80 backdrop-blur-sm supports-backdrop-filter:bg-background/65">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
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
      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mx-auto mb-4 inline-flex w-fit items-center justify-center gap-2 rounded-full border border-[#FA5D19]/25 bg-[#FA5D19]/10 px-4 py-2 text-center text-sm font-medium text-[#B44414] dark:text-[#FF9D72]">
            Made with ❤️ by the DealDrop team
          </div>
          <h2 className="font-heading mb-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Never miss a deal again
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-base text-muted-foreground sm:mb-12 sm:text-xl">
            Track prices and get notified when items drop to your desired price
          </p>

          {/* <div className="surface-panel mx-auto max-w-3xl p-3 sm:p-4"> */}
            <AddProductForm isAuthenticated={Boolean(user)} />
          {/* </div> */}

          {/* Features Section */}
          {products.length === 0 && (
            <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:gap-6 md:grid-cols-3">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="surface-panel p-6 text-card-foreground transition-transform duration-200 hover:-translate-y-1 hover:shadow-sm"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-[#FA5D19]/25 bg-linear-to-br from-[#FA5D19]/20 to-[#FA5D19]/10">
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

      {/* Products Grid */}
      {user && products.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
              Your Tracked Products
            </h3>
            <span className="text-sm text-muted-foreground">
              {products.length} {products.length === 1 ? "product" : "products"}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 items-start">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Placeholder for when there are no products tracked yet * */}
      {user && products.length === 0 && (
        <section className="mx-auto max-w-2xl px-4 pb-16 text-center sm:px-6 sm:pb-20 lg:px-8">
          <div className="surface-panel border-2 border-dashed p-8 sm:p-12">
            <TrendingDown className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="font-heading mb-2 text-xl font-semibold text-foreground">
              No products yet
            </h3>
            <p className="text-muted-foreground">
              Add your first product above to start tracking prices!
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
