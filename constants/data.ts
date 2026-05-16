import { Bell, LineChart, Store } from "lucide-react";

export const HIGHLIGHTS = [
  {
    title: "Instant price alerts",
    copy: "Get an email the moment a price hits your target.",
    icon: Bell,
  },
  {
    title: "Clear price history",
    copy: "See the last 90 days at a glance before you buy.",
    icon: LineChart,
  },
  {
    title: "Store coverage",
    copy: "Track items across major retailers with one link.",
    icon: Store,
  },
];

export const STEPS = [
  {
    step: "01",
    title: "Paste a product link",
    copy: "Drop any store URL and set your target price.",
  },
  {
    step: "02",
    title: "DealDrop tracks",
    copy: "We check for updates throughout the day.",
  },
  {
    step: "03",
    title: "You get the alert",
    copy: "Receive an email the moment it dips.",
  },
];

export const FAQS = [
  {
    question: "Do I need to install an app?",
    answer:
      "No. DealDrop works in the browser and sends alerts by email, so you can start tracking from any device.",
  },
  {
    question: "How often are prices checked?",
    answer:
      "We check tracked products on a regular schedule throughout the day so you get notified when prices change.",
  },
  {
    question: "Can I stop tracking anytime?",
    answer:
      "Yes. You can adjust your watchlist whenever you want and keep only the products you still care about.",
  },
];
