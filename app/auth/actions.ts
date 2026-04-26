"use server";

import { scrapeProduct } from "@/lib/firecrawl/firecrawl";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function SignOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/"); // Revalidate the home page to update the UI after sign out
  redirect("/"); // Redirect to the home page after signing out
}

export async function addProduct(formData: FormData) {
  const url = formData.get("url") as string;
  if (!url) {
    throw new Error("URL is required");
  }
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const productData = await scrapeProduct(url);

    if (
      !productData ||
      !productData.productName ||
      typeof productData.currentPrice !== "number"
    ) {
      throw new Error("Failed to extract product data from the provided URL");
    }

    const newPrice = Number(productData.currentPrice);
    if (!Number.isFinite(newPrice)) {
      throw new Error("Failed to parse product price from the provided URL");
    }
    const currency = productData.currencyCode || "USD";

    const { data: existingProduct } = await supabase
      .from("products")
      .select("id, current_price")
      .eq("url", url)
      .eq("user_id", user.id)
      .single();

    const isUpdate = !!existingProduct;

    const { data: product, error } = await supabase
      .from("products")
      .upsert(
        {
          user_id: user.id,
          name: productData.productName,
          url: url,
          current_price: newPrice,
          currency: currency,
          image_url: productData.productImageUrl || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,url", ignoreDuplicates: false },
      )
      .select()
      .single();

    if (error) {
      throw error;
    }

    const shouldAddHistory =
      !isUpdate ||
      (existingProduct && existingProduct.current_price !== newPrice);

    if (shouldAddHistory) {
      await supabase.from("price_history").insert({
        product_id: product.id,
        price: newPrice,
        currency: currency,
      });
    }

    revalidatePath("/");

    return {
      success: true,
      product,
      message: isUpdate
        ? "Product updated successfully"
        : "Product added successfully",
    };
  } catch (error) {
    console.error("Error adding product:", error);
    const message = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      message: `Failed to add product: ${message}`,
    };
  }
}

export async function deleteProduct(productId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId)
      .eq("user_id", user.id);
    if (error) {
      throw error;
    }
    revalidatePath("/");
    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting product:", error);
    const message = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      message: `Failed to delete product: ${message}`,
    };
  }
}

export async function getProducts() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (error) {
      throw error;
    }
    return products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getPriceHistory(productId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }
    const { data: history, error } = await supabase
      .from("price_history")
      .select("*")
      .eq("product_id", productId)
      .order("checked_at", { ascending: true });
    if (error) {
      throw error;
    }
    return history || [];
  } catch (error) {
    console.error("Error fetching price history:", error);
    return [];
  }
}
