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
    <main className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/80">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              loading="eager"
              className="hidden dark:block h-10 w-auto"
              src="/logos.png"
              alt="dark-mode-image"
              width={600}
              height={600}
            />
            <Image
              loading="eager"
              className="block dark:hidden h-10 w-auto"
              src="/logo.png"
              alt="light-mode-image"
              width={600}
              height={600}
            />
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <AuthButton user={user} />
          </div>
        </div>
      </header>
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-sm bg-orange-500/20 text-orange-700 px-6 py-2 rounded-full font-medium mb-4">
            Made with ❤️ by the DealDrop team
          </div>
          <h2 className="text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Never miss a deal again
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Track prices and get notified when items drop to your desired price
          </p>

          <AddProductForm isAuthenticated={Boolean(user)} />

          {/* Features Section */}
          {products.length === 0 && (
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16 ">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="p-6 bg-white rounded-xl border  border-gray-200"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      {user && products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Your Tracked Products
            </h3>
            <span className="text-sm text-gray-500">
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
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12">
            <TrendingDown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products yet
            </h3>
            <p className="text-gray-600">
              Add your first product above to start tracking prices!
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
