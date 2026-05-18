import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import AuthButton from "@/components/AuthButton";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase/server";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://deals.r6t9.space";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The rules and expectations for using DealDrop price tracking and alerts.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/terms`,
    title: "Terms of Service | DealDrop",
    description:
      "The rules and expectations for using DealDrop price tracking and alerts.",
  },
};

const sections = [
  {
    title: "Overview",
    description:
      "DealDrop lets you track product prices and receive email alerts when the price drops.",
  },
  {
    title: "Your responsibilities",
    items: [
      "Use accurate account details and keep your login secure.",
      "Track only public product pages you are allowed to access.",
      "Do not abuse or disrupt the service.",
    ],
  },
  {
    title: "Price data and alerts",
    items: [
      "Prices come from third-party pages and may be delayed or inaccurate.",
      "Alerts are sent when a drop is detected and may not be instant.",
      "Remove a product anytime to stop alerts.",
    ],
  },
  {
    title: "Third-party services",
    items: [
      "Supabase handles auth and data storage.",
      "Firecrawl extracts price data from submitted URLs.",
      "Resend sends email notifications.",
    ],
  },
  {
    title: "Disclaimers and changes",
    description:
      "The service is provided as-is. We may update these terms as the product evolves.",
  },
];

export default async function TermsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="relative overflow-hidden">
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

        <section className="px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
            <div className="flex flex-col gap-4">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
                <FileText className="h-3.5 w-3.5" />
                Terms of service
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  The ground rules for DealDrop.
                </h1>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-lg">
                  These terms describe how DealDrop operates and what we expect when using price
                  tracking and alerts.
                </p>
                <p className="text-xs uppercase tracking-wide text-muted-foreground sm:text-sm">
                  Last updated: May 18, 2026
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {sections.map((section) => (
                <div
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
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>Need help?</span>
              <Link
                href="/"
                className="font-semibold text-foreground transition-colors hover:text-foreground/80"
              >
                Back to home
              </Link>
              <Link
                href="/privacy"
                className="font-semibold text-foreground transition-colors hover:text-foreground/80"
              >
                View privacy policy
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
