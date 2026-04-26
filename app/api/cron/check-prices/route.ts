import { sendPriceDropAlert } from "@/lib/email";
import { scrapeProduct } from "@/lib/firecrawl/firecrawl";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function normalizeCurrencyCode(value?: string, fallback = "USD") {
  if (!value) return fallback;

  const trimmed = value.trim();
  const upper = trimmed.toUpperCase();

  if (/^[A-Z]{3}$/.test(upper)) return upper;

  const symbolMap: Record<string, string> = {
    "₹": "INR",
    "$": "USD",
    "€": "EUR",
    "£": "GBP",
    "¥": "JPY",
  };

  return symbolMap[trimmed] || fallback;
}

function isAuthorized(request: Request) {
  const authHeader =
    request.headers.get("authorization") ||
    request.headers.get("Authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error("CRON_SECRET is missing");
    return false;
  }

  const authorized = authHeader === `Bearer ${cronSecret}`;
  if (!authorized) {
    console.warn("Cron auth failed", {
      hasAuthHeader: Boolean(authHeader),
      startsWithBearer: authHeader?.startsWith("Bearer ") ?? false,
    });
  }

  return authorized;
}

async function runPriceCheck(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*");

    if (productsError) throw productsError;
    if (!products || products.length === 0) {
      console.warn("No products found in DB");
      return NextResponse.json({
        success: true,
        message: "No products to process",
        results: {
          total: 0,
          updated: 0,
          failed: 0,
          priceChanges: 0,
          alertsSent: 0,
        },
      });
    }

    console.log(`Found ${products.length} products to check`);

    const results = {
      total: products.length,
      updated: 0,
      failed: 0,
      priceChanges: 0,
      alertsSent: 0,
    };

    for (const product of products) {
      try {
        const productData = await scrapeProduct(product.url);

        if (productData.currentPrice == null) {
          console.warn("Missing currentPrice from scrape", {
            productId: product.id,
          });
          results.failed++;
          continue;
        }

        const newPrice = Number(productData.currentPrice);
        const oldPrice = Number(product.current_price);

        if (Number.isNaN(newPrice) || Number.isNaN(oldPrice)) {
          console.warn("Invalid product price values", {
            productId: product.id,
            currentPrice: productData.currentPrice,
            previousPrice: product.current_price,
          });
          results.failed++;
          continue;
        }

        const normalizedCurrency = normalizeCurrencyCode(
          productData.currencyCode,
          normalizeCurrencyCode(product.currency, "USD"),
        );

        const updatedName = productData.productName || product.name;
        const updatedImage = productData.productImageUrl || product.image_url;

        await supabase
          .from("products")
          .update({
            current_price: newPrice,
            currency: normalizedCurrency,
            name: updatedName,
            image_url: updatedImage,
            updated_at: new Date().toISOString(),
          })
          .eq("id", product.id);

        if (oldPrice !== newPrice) {
          await supabase.from("price_history").insert({
            product_id: product.id,
            price: newPrice,
            currency: normalizedCurrency,
          });

          results.priceChanges++;

          if (newPrice < oldPrice) {
            const { data: userData, error: userError } =
              await supabase.auth.admin.getUserById(product.user_id);

            if (userError) {
              console.error("Unable to fetch user for price-drop alert", {
                productId: product.id,
                userId: product.user_id,
                message: userError.message,
              });
              continue;
            }

            const userEmail = userData.user?.email;
            if (!userEmail) {
              console.warn("User missing email; skipping alert", {
                productId: product.id,
                userId: product.user_id,
              });
              continue;
            }

            const emailProduct = {
              name: updatedName,
              image_url: updatedImage,
              url: product.url,
              currency: normalizedCurrency,
            };

            const emailResult = await sendPriceDropAlert(
              userEmail,
              emailProduct,
              oldPrice,
              newPrice,
            );

            if (emailResult.success) {
              results.alertsSent++;
            } else {
              console.error("sendPriceDropAlert failed", {
                productId: product.id,
                userId: product.user_id,
                result: emailResult,
              });
            }
          }
        }

        results.updated++;
      } catch (error) {
        console.error(`Error processing product ${product.id}:`, error);
        results.failed++;
      }
    }

    return NextResponse.json({
      success: true,
      message: "Price check completed",
      results,
    });
  } catch (error) {
    console.error("Error checking prices:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  return runPriceCheck(request);
}

export async function POST(request: Request) {
  return runPriceCheck(request);
}
