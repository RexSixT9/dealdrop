import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import AddProductForm from "@/components/AddProductForm";
import AuthButton from "@/components/AuthButton";
import { ArrowUpRight } from "lucide-react";

const HIGHLIGHTS = [
  {
    title: "Instant price alerts",
    copy: "Get notified as soon as a price crosses your target.",
  },
  {
    title: "Clean price history",
    copy: "Understand the last 90 days before you buy.",
  },
  {
    title: "Retailer coverage",
    copy: "Track products across major stores with one link.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Paste a product link",
    copy: "Drop any store URL and set the price you want.",
  },
  {
    step: "02",
    title: "DealDrop watches",
    copy: "We scan pricing signals throughout the day.",
  },
  {
    step: "03",
    title: "You get the ping",
    copy: "Receive an email the moment it dips.",
  },
];

export default function Home() {
  const user = null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-copper-forge" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-20 dark:opacity-30" />

        <header className="border-b border-border/60 bg-background/80">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Image
                loading="eager"
                className="hidden h-9 w-auto dark:block sm:h-10"
                src="/logo-navbar-dark.svg"
                alt="DealDrop logo"
                width={600}
                height={600}
              />
              <Image
                loading="eager"
                className="block h-9 w-auto dark:hidden sm:h-10"
                src="/logo-navbar-light.svg"
                alt="DealDrop logo"
                width={600}
                height={600}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <ModeToggle />
              <AuthButton user={user} />
            </div>
          </div>
        </header>

        <section className="flex min-h-[calc(100svh-64px)] items-center px-4 pb-12 pt-14 sm:min-h-[calc(100svh-72px)] sm:px-6 sm:pb-16 sm:pt-20 lg:px-8">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-5 text-center sm:gap-7">
            <div className="inline-flex items-center rounded-full border border-border/70 bg-card/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
              Minimal price tracking
            </div>
            <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Track price drops without the noise.
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-lg">
              DealDrop watches the products you care about and emails you the moment your target price hits.
            </p>
            <div className="w-full">
              <AddProductForm isAuthenticated={Boolean(user)} />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-muted-foreground sm:gap-3 sm:text-sm">
              <span className="rounded-full border border-border/70 bg-card/70 px-3 py-1">
                No app install
              </span>
              <span className="rounded-full border border-border/70 bg-card/70 px-3 py-1">
                Email alerts
              </span>
              <span className="rounded-full border border-border/70 bg-card/70 px-3 py-1">
                Price history
              </span>
              <a
                href="#how"
                className="inline-flex items-center gap-1 text-foreground/70 transition-colors hover:text-foreground"
              >
                See the flow
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mx-auto grid w-full max-w-5xl gap-4 sm:gap-5 md:grid-cols-3">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.title}
                className="flex h-full flex-col items-center gap-2 rounded-2xl border border-border/60 bg-card/70 p-5 text-center sm:p-6"
              >
                <h3 className="text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="how" className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto grid w-full max-w-5xl gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
                How it works
              </p>
              <h2 className="font-heading mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
                Three steps. One alert.
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                Set it once and stay ready for the next drop.
              </p>
            </div>
            <ol className="grid gap-4 text-center sm:gap-5">
              {STEPS.map((item) => (
                <li
                  key={item.step}
                  className="flex flex-col items-center rounded-2xl border border-border/60 bg-card/70 p-5 sm:p-6"
                >
                  <p className="text-[11px] font-semibold text-orange-600 dark:text-orange-300 sm:text-xs">
                    {item.step}
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.copy}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 rounded-3xl border border-border/70 bg-card/80 px-6 py-8 text-center sm:gap-6 sm:px-10 sm:py-10">
            <div className="max-w-xl">
              <h2 className="font-heading text-xl font-semibold text-foreground sm:text-3xl">
                Ready when you are.
              </h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Start with one link and keep your watchlist calm and focused.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:gap-3 sm:text-xs">
              <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1">
                Free to start
              </span>
              <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1">
                Cancel anytime
              </span>
              <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1">
                No credit card
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
