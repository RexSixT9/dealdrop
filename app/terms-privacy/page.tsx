import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import AuthButton from "@/components/AuthButton";
import Logo from "@/components/Logo";
import MotionPage from "@/components/MotionPage";
import {
  MotionItem,
  MotionReveal,
  MotionStagger,
} from "@/components/MotionReveal";
import { createClient } from "@/lib/supabase/server";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://deals.r6t9.space";

export const metadata: Metadata = {
  title: "Terms and Privacy Policy",
  description:
    "Terms of Service and Privacy Policy for DealDrop, including data use, alerts, and account responsibilities.",
  alternates: {
    canonical: "/terms-privacy",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/terms-privacy`,
    title: "Terms and Privacy Policy | DealDrop",
    description:
      "Terms of Service and Privacy Policy for DealDrop, including data use, alerts, and account responsibilities.",
  },
  twitter: {
    card: "summary",
    title: "Terms and Privacy Policy | DealDrop",
    description:
      "Terms of Service and Privacy Policy for DealDrop, including data use, alerts, and account responsibilities.",
  },
};

const sections = [
  {
    title: "Overview",
    description:
      "DealDrop is a SaaS platform that tracks public product prices and sends alerts when a drop is detected.",
  },
  {
    title: "Account and access",
    items: [
      "Sign in with a supported provider and keep your credentials secure.",
      "You control which URLs are tracked and can remove items at any time.",
      "You are responsible for activity that happens under your account.",
    ],
  },
  {
    title: "Acceptable use",
    items: [
      "Track only public product pages you are allowed to access.",
      "Do not abuse, probe, or disrupt the service or its integrations.",
      "Do not submit sensitive, illegal, or prohibited content in tracked URLs.",
    ],
  },
  {
    title: "Price data and alerts",
    items: [
      "Prices come from third-party pages and may be delayed or inaccurate.",
      "Alerts are best-effort and may be queued or throttled during peak load.",
      "Tracking may pause for unsupported, blocked, or unstable sources.",
    ],
  },
  {
    title: "Data we collect",
    items: [
      "Account data from Supabase auth (email and provider identifier).",
      "Product tracking data you submit (URLs, names, target price, currency, and price history).",
      "Service metadata such as timestamps, request logs, and device signals.",
    ],
  },
  {
    title: "How we use data",
    items: [
      "Operate your watchlist and show price history.",
      "Run scheduled checks and deliver price drop alerts.",
      "Maintain security, prevent abuse, and improve reliability.",
    ],
  },
  {
    title: "Third-party processors",
    items: [
      "Supabase: authentication, database storage, and access control.",
      "Firecrawl: extracts titles, prices, and images from submitted URLs.",
      "Resend: delivers price drop emails to your account address.",
    ],
  },
  {
    title: "Retention and deletion",
    items: [
      "We keep data while your account is active; older price history may be pruned.",
      "Remove products anytime to stop alerts for them.",
    ],
  },
  {
    title: "Security and disclaimers",
    description:
      "We use standard safeguards, but no system is fully secure. The service is provided as-is without warranties.",
  },
  {
    title: "Changes",
    description:
      "We may update these terms and privacy details as the product evolves. The latest version stays on this page.",
  },
];

export default async function TermsPrivacyPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <MotionPage className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-copper-forge" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-20 dark:opacity-30" />

        <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
          <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <Logo variant="compact" />
            </div>
            <div className="flex shrink-0 items-center gap-2 max-[360px]:gap-1.5 sm:gap-3">
              <ModeToggle />
              <AuthButton user={user} />
            </div>
          </nav>
        </header>

        <MotionReveal animateOnLoad>
          <section className="px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
            <MotionStagger
              className="mx-auto flex w-full max-w-3xl flex-col gap-10"
              animateOnLoad
            >
              <MotionItem>
                <div className="flex flex-col gap-4">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
                    <FileText className="h-3.5 w-3.5" />
                    Terms and Privacy
                  </div>
                  <div className="flex flex-col gap-3">
                    <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                      Terms and Privacy in one place.
                    </h1>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-lg">
                      This page covers how DealDrop works, what data we collect, and the rules for
                      using the service.
                    </p>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground sm:text-sm">
                      Last updated: May 19, 2026
                    </p>
                  </div>
                </div>
              </MotionItem>

              <MotionStagger className="space-y-8" animateOnLoad>
                {sections.map((section) => (
                  <MotionItem
                    key={section.title}
                    className="space-y-2 border-b border-border/60 pb-6 last:border-b-0 last:pb-0"
                  >
                    <h2 className="text-base font-semibold text-foreground sm:text-lg">
                      {section.title}
                    </h2>
                    {section.description && (
                      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {section.description}
                      </p>
                    )}
                    {section.items && (
                      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground sm:text-base">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </MotionItem>
                ))}
              </MotionStagger>

              <MotionItem className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>Questions?</span>
                <Link
                  href="/"
                  className="font-semibold text-foreground transition-colors hover:text-foreground/80"
                >
                  Back to home
                </Link>
                <Link
                  href="https://github.com/RexSixT9/dealdrop"
                  className="font-semibold text-foreground transition-colors hover:text-foreground/80"
                >
                  View repository
                </Link>
              </MotionItem>
            </MotionStagger>
          </section>
        </MotionReveal>
      </MotionPage>
    </main>
  );
}
