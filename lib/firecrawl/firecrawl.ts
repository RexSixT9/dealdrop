import Firecrawl from "@mendable/firecrawl-js";

const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

type ScrapedProduct = {
  productName: string;
  currentPrice: number;
  currencyCode?: string;
  productImageUrl?: string;
};

export async function scrapeProduct(url: string) {
  try {
    const result = await firecrawl.scrape(url, {
      formats: [
        {
          type: "json",
          prompt:
            "Extract the product name as 'productName', current price as a number as 'currentPrice', currency code (USD, EUR, etc) as 'currencyCode', and product image URL as 'productImageUrl' if available",
          schema: {
            type: "object",
            properties: {
              productName: { type: "string" },
              currentPrice: { type: "number" },
              currencyCode: { type: "string" },
              productImageUrl: { type: "string" },
            },
            required: ["productName", "currentPrice"],
          },
        },
      ],
    });

    const extractedData = result.json as Partial<ScrapedProduct> | undefined;

    if (
      !extractedData ||
      typeof extractedData.productName !== "string" ||
      typeof extractedData.currentPrice !== "number"
    ) {
      throw new Error("No data extracted from URL");
    }

    return extractedData as ScrapedProduct;
  } catch (error) {
    console.error("Firecrawl scrape error:", error);
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to scrape product: ${message}`);
  }
}
