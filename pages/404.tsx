import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, SearchX } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import AuthButton from "@/components/AuthButton";

export default function Custom404() {
  const user = null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-copper-forge" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-20 dark:opacity-30" />

        <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
          <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <Image
                loading="eager"
                className="hidden h-8 w-auto dark:block sm:h-10"
                src="/logo-navbar-dark.svg"
                alt="DealDrop logo"
                width={600}
                height={600}
              />
              <Image
                loading="eager"
                className="block h-8 w-auto dark:hidden sm:h-10"
                src="/logo-navbar-light.svg"
                alt="DealDrop logo"
                width={600}
                height={600}
              />
            </div>
            <div className="flex shrink-0 items-center gap-2 max-[360px]:gap-1.5 sm:gap-3">
              <ModeToggle />
              <AuthButton user={user} />
            </div>
          </nav>
        </header>

        <section className="flex min-h-[calc(100svh-64px)] items-center px-4 pb-12 pt-14 sm:min-h-[calc(100svh-72px)] sm:px-6 sm:pb-16 sm:pt-20 lg:px-8">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5 text-center sm:gap-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
              <SearchX className="h-3.5 w-3.5" />
              Page not found
            </div>
            <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              This page slipped off the radar.
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-lg">
              The link you followed may be broken, or the page has been moved.
              Try heading back to the homepage or explore active deals.
            </p>
            <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border/80 bg-card/70 px-5 text-sm font-semibold text-foreground transition-colors hover:bg-card/90 sm:h-12 sm:w-auto sm:px-8 sm:text-base"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>
              <Link
                href="/#how"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 sm:h-12 sm:w-auto sm:px-8 sm:text-base"
              >
                See how it works
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
