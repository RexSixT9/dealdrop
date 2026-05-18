import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type HistoryRouteContext = {
  params: Promise<{
    productId: string;
  }>;
};

export async function GET(_request: Request, context: HistoryRouteContext) {
  const { productId } = await context.params;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id")
      .eq("id", productId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (productError) {
      throw productError;
    }

    if (!product) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const { data: history, error: historyError } = await supabase
      .from("price_history")
      .select("checked_at, price")
      .eq("product_id", productId)
      .order("checked_at", { ascending: true });

    if (historyError) {
      throw historyError;
    }

    return NextResponse.json(
      { history: history ?? [] },
      {
        headers: {
          "Cache-Control": "private, max-age=30, stale-while-revalidate=120",
        },
      },
    );
  } catch (error) {
    console.error("Error loading price history:", error);

    return NextResponse.json(
      { message: "Failed to load price history" },
      { status: 500 },
    );
  }
}