import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import AuthButton from "@/components/AuthButton";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase/server";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://deals.r6t9.space";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how DealDrop collects, uses, and protects data for price tracking and alerts.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/privacy`,
    title: "Privacy Policy | DealDrop",
    description:
      "Learn how DealDrop collects, uses, and protects data for price tracking and alerts.",
  },
};

const sections = [
  {
    title: "Overview",
    description:
      "DealDrop helps you track product prices and sends email alerts when a drop is detected.",
  },
  {
    title: "What we collect",
    items: [
      "Account data from Supabase auth (email, provider identifier).",
      "Product tracking data you add (URLs, names, target price, currency, and price history).",
      "Basic service metadata like timestamps and request logs.",
    ],
  },
  {
    title: "How we use data",
    items: [
      "Operate your private watchlist and show price history.",
      "Run scheduled checks and send price drop alerts.",
      "Maintain security and reliability.",
    ],
  },
  {
    title: "Third-party processors",
    items: [
      "Supabase: authentication, database storage, access control.",
      "Firecrawl: extracts titles, prices, and images from URLs you submit.",
      "Resend: delivers price drop emails to your account address.",
    ],
  },
  {
    title: "Retention and choices",
    items: [
      "We keep data while your account is active; older price history may be pruned.",
      "Remove products anytime to stop alerts for them.",
    ],
  },
  {
    title: "Changes",
    description:
      "We may update this policy as the product evolves. The latest version stays on this page.",
  },
];

export default async function PrivacyPage() {
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
                <ShieldCheck className="h-3.5 w-3.5" />
                Privacy policy
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  Your data, handled with care.
                </h1>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-lg">
                  This policy explains what data DealDrop collects, how it powers price tracking,
                  and the third-party services that help us deliver alerts.
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
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
