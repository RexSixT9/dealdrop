"use client";

import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Trash2,
  TrendingDown,
} from "lucide-react";
import { useState } from "react";
import { deleteProduct } from "@/app/auth/actions";
import { toast } from "sonner";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import PriceChart from "./PriceChart";
import Image from "next/image";
import { productImageLoader } from "@/lib/image-loader";

export type TrackedProduct = {
  id: string;
  name: string;
  url: string;
  current_price: number;
  currency: string | null;
  image_url: string | null;
};

type ProductCardProps = {
  product: TrackedProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [showChart, setShowChart] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeleting(true);
    const result = await deleteProduct(product.id);

    if (result.success) {
      toast.success("Product deleted successfully!");
    } else {
      toast.error(
        result.message || "Failed to delete product. Please try again.",
      );
    }

    setDeleting(false);
  };

  return (
    <Card className="border border-border/70 bg-card/90 transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          {product.image_url && (
            <Image
              src={product.image_url}
              alt={product.name}
              width={80}
              height={80}
              sizes="80px"
              quality={70}
              loading="lazy"
              decoding="async"
              loader={productImageLoader}
              className="h-20 w-20 rounded-xl border border-border bg-muted object-cover"
            />
          )}

          <div className="flex-1 min-w-0">
            <h3 className="font-heading mb-2 line-clamp-2 font-semibold text-foreground">
              {product.name}
            </h3>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tabular-nums text-orange-500 sm:text-3xl">
                {product.currency} {product.current_price}
              </span>
              <Badge variant="secondary" className="gap-1">
                <TrendingDown className="w-3 h-3" />
                Tracking
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowChart(!showChart)}
            className="w-full justify-center gap-1 sm:flex-1 sm:min-w-38"
          >
            {showChart ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide Chart
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show Chart
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="lg"
            asChild
            className="w-full justify-center gap-1 sm:flex-1 sm:min-w-38"
          >
            <Link href={product.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              View Product
            </Link>
          </Button>

          <Button
            variant="destructive"
            size="lg"
            onClick={handleDelete}
            disabled={deleting}
            className="w-full justify-center gap-1 text-destructive hover:bg-destructive/10 hover:text-destructive sm:flex-1 sm:min-w-38"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </Button>
        </div>
      </CardContent>

      {showChart && (
        <CardFooter className="pt-0">
          <PriceChart productId={product.id} />
        </CardFooter>
      )}
    </Card>
  );
}
