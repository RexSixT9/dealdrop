"use client";

import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { FEATURES } from "@/constants/data";
import AddProductForm from "@/components/AddProductForm";
import AuthButton from "@/components/AuthButton";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function Home() {
  const user = null;

  return (
    <main className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <header className="sticky top-0 z-10 border-b border-gray-200/80 bg-white/80 backdrop-blur-sm dark:border-zinc-700/80 dark:bg-zinc-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
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
          <div className="flex items-center gap-2 sm:gap-3">
            <ModeToggle />
            <AuthButton user={user} />
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden px-4 pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-orange-400/20 blur-3xl dark:bg-orange-500/10" />
          <div className="absolute -right-10 top-32 h-56 w-56 rounded-full bg-amber-300/30 blur-3xl dark:bg-amber-400/10" />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-700 dark:text-orange-200">
              <Sparkles className="h-4 w-4" />
              Smart price tracking
            </div>
            <h1 className="font-heading mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Catch price drops the moment they happen.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              DealDrop monitors your favorite products and sends instant alerts when prices dip. Track multiple retailers, set target prices, and stay ahead of every promotion.
            </p>
            <div className="mt-8">
              <AddProductForm isAuthenticated={Boolean(user)} />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="rounded-full border border-border/70 bg-card/70 px-3 py-1">Price history insights</span>
              <span className="rounded-full border border-border/70 bg-card/70 px-3 py-1">Instant drop alerts</span>
              <span className="rounded-full border border-border/70 bg-card/70 px-3 py-1">Works on any device</span>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Tracked deals",
                  value: "24k+",
                  caption: "Active watchers this week",
                },
                {
                  title: "Average savings",
                  value: "$82",
                  caption: "Per shopper per month",
                },
                {
                  title: "Fastest alert",
                  value: "42 sec",
                  caption: "From drop to notification",
                },
                {
                  title: "Retail coverage",
                  value: "350+",
                  caption: "Stores supported today",
                },
              ].map((stat) => (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm"
                >
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.caption}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-border/70 bg-linear-to-br from-white/80 via-orange-50/70 to-orange-100/60 p-6 text-sm text-muted-foreground shadow-sm dark:from-zinc-900/80 dark:via-zinc-900/40 dark:to-orange-500/10">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">DealDrop intel</span>
                <ArrowUpRight className="h-4 w-4 text-orange-500" />
              </div>
              <p className="mt-2">
                Our detection engine checks price signals every few minutes and
                adapts to store changes automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 rounded-3xl border border-border/70 bg-card/80 px-6 py-6 text-sm text-muted-foreground shadow-sm sm:px-10">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-300">
              Trusted by deal hunters
            </p>
            <p className="mt-2 text-base text-foreground">
              From gadgets to groceries, DealDrop keeps thousands of watchers ahead of the next promotion.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {["Electronics", "Fashion", "Home", "Beauty", "Outdoors"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/70 bg-background/70 px-4 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-300">
              Features
            </p>
            <h2 className="font-heading mt-2 text-3xl font-semibold text-foreground sm:text-4xl">
              Built for fast-moving deals.
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Stay calm while DealDrop does the checking, matching, and alerting for you.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/15 text-orange-600 dark:text-orange-300">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-300">
              How it works
            </p>
            <h2 className="font-heading mt-2 text-3xl font-semibold text-foreground sm:text-4xl">
              A clear path to every deal.
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Set a target price, keep tabs across retailers, and let DealDrop alert you when it is time to buy.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              {
                step: "01",
                title: "Add any product link",
                copy: "Drop in a URL from a store and pick the price you want.",
              },
              {
                step: "02",
                title: "We watch for drops",
                copy: "DealDrop scans pricing patterns every few minutes.",
              },
              {
                step: "03",
                title: "Get instant alerts",
                copy: "Receive email notifications the second the price dips.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm"
              >
                <span className="text-sm font-semibold text-orange-600 dark:text-orange-300">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-3xl border border-border/70 bg-card/80 px-6 py-10 shadow-sm sm:px-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-300">
              Price intelligence
            </p>
            <h2 className="font-heading mt-2 text-3xl font-semibold text-foreground sm:text-4xl">
              Understand the drop before it lands.
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              See where prices have been, where they are trending, and when your alert is about to trigger.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              {
                title: "Historical trendlines",
                copy: "See the last 90 days of price movements to spot patterns.",
              },
              {
                title: "Alert forecasting",
                copy: "We predict the best alert windows based on store behavior.",
              },
              {
                title: "Smart retailer match",
                copy: "DealDrop aligns identical listings across multiple stores.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border/70 bg-background/70 p-5"
              >
                <h3 className="text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:pb-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 rounded-3xl border border-border/70 bg-linear-to-br from-orange-100/80 via-white to-orange-50/70 px-6 py-10 shadow-sm dark:from-orange-500/10 dark:via-zinc-900/70 dark:to-zinc-900/40 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              Ready to track your next deal?
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Add your first product and let DealDrop watch the price for you.
            </p>
          </div>
          <div className="w-full max-w-xl">
            <AddProductForm isAuthenticated={Boolean(user)} />
          </div>
        </div>
      </section>
    </main>
  );
}
