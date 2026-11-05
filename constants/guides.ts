export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type Guide = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  updatedAt: string;
  readingTime: number;
  sections: GuideSection[];
  faqs: GuideFaq[];
};

export const GUIDES: Guide[] = [
  {
    slug: "how-to-track-product-prices",
    title: "How to track product prices and actually catch the drop",
    seoTitle: "How to Track Product Prices and Catch Price Drops",
    description:
      "A practical guide to tracking product prices: choosing the right URL, setting a useful target, and avoiding the mistakes that make alerts noisy.",
    excerpt:
      "Set up price tracking that works: the right product URL, a realistic target, and a plan for what to do when the alert arrives.",
    updatedAt: "2026-11-05",
    readingTime: 6,
    sections: [
      {
        heading: "Start with the exact product page",
        paragraphs: [
          "Price tracking only works when it watches the page that actually shows the price you want to pay. Product listing pages, search results, and category pages often contain several prices, promotions, and sponsored placements. A tracker may pick the wrong number or fail to read the page at all.",
          "Open the product, choose the exact size, colour, model, or bundle you want, and copy that URL. Remove tracking parameters and affiliate clutter when the site allows it. A cleaner URL is easier to monitor and makes it less likely that the same product is treated as two different items.",
        ],
        bullets: [
          "Use the individual product page, not a search or category page.",
          "Select the exact variant before copying the link.",
          "Prefer the retailer's canonical URL when one is available.",
          "Avoid short links that hide the destination.",
        ],
      },
      {
        heading: "Set a target based on evidence, not hope",
        paragraphs: [
          "A target price is the number at which you would genuinely buy. Setting it too low produces months of silence; setting it at the current price produces an alert almost immediately. Both feel like the tracker is broken.",
          "Look at the product's recent price history first. If the usual price is 10,000 and the current price is 9,200, a target of 8,800 may be realistic during a seasonal sale. A target of 5,000 is probably not. The useful target sits between the best price you have seen and the price you are willing to pay.",
        ],
        bullets: [
          "Use the 90-day low as a starting reference, not a guarantee.",
          "Leave room for normal sale cycles rather than chasing an all-time low.",
          "Raise the target if you need the item soon.",
          "Lower it only when the product is regularly discounted below that level.",
        ],
      },
      {
        heading: "Understand what a tracker can and cannot see",
        paragraphs: [
          "Price trackers read public product pages. They cannot see member-only prices, prices revealed after login, coupons applied in a cart, or stock reserved in another region. Delivery fees, taxes, and bank offers can also change the real cost.",
          "Check the retailer's page before buying, especially for marketplace sellers. The same product listing can switch between sellers, and a low price from an unfamiliar seller may not include the same warranty or return policy.",
        ],
      },
      {
        heading: "Watch the trend instead of one number",
        paragraphs: [
          "A single price change is not a deal. The useful signal is the relationship between the current price, the recent average, and the lowest price the product has reached. A product that has been 9,500 for six months and drops to 9,000 is behaving differently from a product that is always 9,000 and briefly shows 8,900.",
          "Use the chart to check whether a drop is unusual. If the price moves up and down every week, a small discount is probably noise. If the price has been stable and suddenly falls, the alert is worth acting on.",
        ],
      },
      {
        heading: "Make the alert actionable",
        paragraphs: [
          "An alert is only useful if you can act on it. Decide in advance what you will do when the target is hit: buy immediately, check the seller and delivery date, or wait for a better bundle. If you need approval from someone else, share the product page before the sale ends.",
          "Finally, clean up your watchlist. Remove products you no longer want, pause alerts for items you have already bought, and keep a small list of things you are genuinely ready to purchase. Fewer, better alerts make the next drop easier to notice.",
        ],
      },
    ],
    faqs: [
      {
        question: "How often should a price tracker check a product?",
        answer:
          "A few times a day is enough for most products. High-demand items and short flash sales may benefit from more frequent checks, but checking every minute is usually unnecessary and can make alerts noisy.",
      },
      {
        question: "Can a price tracker see coupon prices?",
        answer:
          "Generally no. Coupons, member prices, and cart-level discounts are often not visible on the public product page, so the tracked price may be higher than the final checkout price.",
      },
      {
        question: "What is a realistic target price?",
        answer:
          "A realistic target is near the product's recent low but still above levels it only reaches during rare clearance events. Review the price history before choosing a number.",
      },
    ],
  },
  {
    slug: "how-to-read-price-history",
    title: "How to read a price history chart before you buy",
    seoTitle: "How to Read a Price History Chart Before Buying",
    description:
      "Learn how to read a product price history chart: spot the real baseline, identify unusual drops, and avoid discounts that look better than they are.",
    excerpt:
      "A price chart is more than a line. Learn what the baseline, spikes, and all-time lows actually tell you about a deal.",
    updatedAt: "2026-11-05",
    readingTime: 5,
    sections: [
      {
        heading: "Find the normal price first",
        paragraphs: [
          "The most important part of a price chart is not the lowest point. It is the level the price returns to most often. That level is the product's baseline, and it tells you what the item normally costs when there is no promotion.",
          "If a product spends most of the last 90 days at 12,000, a current price of 11,400 is a meaningful drop. If it spends most of the chart bouncing between 10,500 and 12,000, the same price is less remarkable. Read the shape before you read the current number.",
        ],
        bullets: [
          "Look for the most common price band, not just the minimum.",
          "Check how long the price stays at each level.",
          "Ignore one-day spikes caused by a marketplace seller change.",
        ],
      },
      {
        heading: "Separate a real drop from a temporary spike",
        paragraphs: [
          "Some charts show a high maximum that makes the current price look excellent. That maximum may have been a third-party seller listing, a bundle, or a data error. A single spike is weak evidence. A sustained move from one price band to another is stronger.",
          "Look at the points around the low. If the price dropped, stayed low for several days, and then recovered, that was likely a real sale. If it touched a low for a few hours and immediately returned, it may have been a flash promotion or a listing issue.",
        ],
      },
      {
        heading: "Compare the current price with the recent low",
        paragraphs: [
          "The gap between the current price and the recent low tells you how much room may remain. If the product is 2% above its 90-day low, waiting has limited upside and the item may sell out. If it is 20% above the low, there may be a better moment.",
          "There is no universal rule. A small gap is often worth accepting for a product you need now. A larger gap is a reason to set an alert and wait, especially outside a known sale period.",
        ],
        bullets: [
          "Within a few percent of the low: consider buying if you need it.",
          "Moderately above the low: watch for the next sale cycle.",
          "Far above the low: wait for a clear promotion or a new target.",
        ],
      },
      {
        heading: "Beware the fake discount",
        paragraphs: [
          "A crossed-out price is a marketing claim, not a historical fact. Some retailers raise the list price before a sale so the discount looks larger. The price history is the independent check.",
          "If the chart shows the product was consistently sold at the lower price for weeks, the crossed-out figure may be inflated. If the chart shows a stable higher price and a recent sustained drop, the promotion is more credible.",
        ],
      },
      {
        heading: "Use the chart to set an alert",
        paragraphs: [
          "Once you know the baseline and the recent low, choose a target between them. Then check the chart again after the alert fires. A price can hit your target because of a genuine sale, but it can also hit it because the seller changed, the model was replaced, or the listing is for a different variant.",
          "The chart is a decision aid, not a guarantee. Verify the seller, warranty, delivery date, and exact variant before you buy.",
        ],
      },
    ],
    faqs: [
      {
        question: "What does a flat price history mean?",
        answer:
          "A flat line usually means the retailer rarely discounts the product or the tracker is seeing the same price each time. It can also mean the site is not exposing price changes on the public page.",
      },
      {
        question: "Is the all-time low always the best time to buy?",
        answer:
          "No. An all-time low may have been a brief clearance event that will not return. Compare the current price with the normal baseline and your own deadline.",
      },
      {
        question: "Why does the chart have gaps?",
        answer:
          "Gaps usually mean the price did not change, the product could not be read on that check, or history was pruned. Check the last-updated timestamp before relying on the chart.",
      },
    ],
  },
  {
    slug: "why-prices-drop",
    title: "Why prices drop: sales cycles, clearance, and fake discounts",
    seoTitle: "Why Product Prices Drop: Sales, Clearance, and Fake Discounts",
    description:
      "Understand the common reasons product prices fall, from planned sales cycles and clearance to dynamic pricing and inflated list prices.",
    excerpt:
      "Sales cycles, inventory pressure, and marketing all move prices. Knowing which one you are seeing helps you decide whether to buy.",
    updatedAt: "2026-11-05",
    readingTime: 7,
    sections: [
      {
        heading: "Planned sales cycles",
        paragraphs: [
          "Many retailers run predictable promotions around holidays, back-to-school periods, festive seasons, and major shopping events. These dates are planned months in advance. The discounts are real, but they are also widely advertised, which means the best items can sell out quickly.",
          "If you are tracking a product that is likely to appear in a seasonal sale, set your alert before the event rather than during it. The useful moment is often the first hours of the promotion, not the final day when popular variants are gone.",
        ],
      },
      {
        heading: "Inventory and clearance",
        paragraphs: [
          "A retailer holding too much stock may cut prices to clear space. Clearance is less predictable than a seasonal sale and often depends on the product's age, the next model's launch, or the end of a season.",
          "Clearance prices can be excellent, but the selection is limited. Sizes, colours, and bundles disappear first. If the exact variant matters to you, waiting for clearance is risky. If you are flexible, clearance can be the best value.",
        ],
        bullets: [
          "End-of-season fashion and seasonal goods",
          "Older models after a successor launches",
          "Last-unit inventory in a specific colour or size",
          "Open-box and returned items sold at a discount",
        ],
      },
      {
        heading: "Dynamic and marketplace pricing",
        paragraphs: [
          "Some retailers adjust prices based on demand, competition, stock, or the device you use. Marketplace listings add another layer: the same product page can switch between sellers, and each seller sets a different price.",
          "This is why a price can change without a formal sale. It is also why a low price from an unfamiliar seller deserves extra checks. Verify the seller's rating, warranty, return policy, and delivery estimate before treating it as the same deal.",
        ],
      },
      {
        heading: "Marketing discounts and inflated list prices",
        paragraphs: [
          "A large percentage off is not automatically a large saving. Some retailers raise the reference price before a promotion, or compare against a recommended retail price that was rarely charged. The result is a discount that looks dramatic but does not reflect the real market price.",
          "Price history is the antidote. If the product has been selling at the discounted price for weeks, the promotion is mostly presentation. If the current price is genuinely below the recent baseline, the discount is more meaningful.",
        ],
      },
      {
        heading: "A practical buying checklist",
        paragraphs: [
          "Before acting on a drop, check the exact variant, the seller, the delivery date, and the return policy. Compare the current price with the recent baseline and the 90-day low. Then ask whether you would still want the product at this price if the sale ended tomorrow.",
          "A good deal is a product you need at a price you are comfortable paying. A low price on something you do not need is still a cost. Track fewer products, set realistic targets, and treat alerts as a prompt to verify, not an instruction to buy.",
        ],
        bullets: [
          "Is this the exact model, size, or colour I want?",
          "Is the seller the retailer or a marketplace third party?",
          "Does the price include delivery and taxes?",
          "Is the product returnable if it arrives damaged or unsuitable?",
          "Would I buy it at this price without the discount label?",
        ],
      },
    ],
    faqs: [
      {
        question: "Do prices always drop during big sales?",
        answer:
          "No. Some products are excluded, some discounts are smaller than advertised, and popular variants may sell out early. Compare the sale price with the recent price history.",
      },
      {
        question: "Why did the price drop and then rise again?",
        answer:
          "The drop may have been a short promotion, a marketplace seller change, or a pricing experiment. A short dip is weaker evidence of a durable deal than a sustained lower price.",
      },
      {
        question: "Should I wait for clearance or buy at the current price?",
        answer:
          "Wait if you are flexible and the current price is far above the recent low. Buy if you need the exact variant and the price is close to the low, because clearance stock may not include it.",
      },
    ],
  },
];

export function getGuide(slug: string) {
  return GUIDES.find((guide) => guide.slug === slug);
}
