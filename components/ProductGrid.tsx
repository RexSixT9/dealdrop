"use client";

import { useState } from "react";
import ProductCard, { type TrackedProduct } from "./ProductCard";
import { Button } from "./ui/button";

const PAGE_SIZE = 6;

export default function ProductGrid({ products }: { products: TrackedProduct[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleProducts = products.slice(0, visibleCount);
  const remaining = products.length - visibleCount;

  const handleShowMore = () => {
    setVisibleCount((count) => Math.min(count + PAGE_SIZE, products.length));
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="grid items-start gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {remaining > 0 && (
        <div className="flex justify-center">
          <Button variant="outline" size="lg" onClick={handleShowMore}>
            Show more ({remaining} remaining)
          </Button>
        </div>
      )}
    </div>
  );
}
