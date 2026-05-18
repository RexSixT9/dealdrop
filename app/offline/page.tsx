import Link from "next/link";
import { ArrowLeft, RefreshCw, WifiOff } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import AuthButton from "@/components/AuthButton";
import Logo from "@/components/Logo";

export default function OfflinePage() {
  const user = null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-copper-forge" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-20 dark:opacity-30" />

        <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
          <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <Logo variant="full" />
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
              <WifiOff className="h-3.5 w-3.5" />
              Offline mode
            </div>
            <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              You are offline.
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-lg">
              Check your connection, then try again. We will keep your view ready
              and sync once you are back online.
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
                href="/offline"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 sm:h-12 sm:w-auto sm:px-8 sm:text-base"
              >
                <RefreshCw className="h-4 w-4" />
                Retry
              </Link>
            </div>
            <div className="w-full max-w-xl rounded-2xl border border-border/60 bg-card/70 px-4 py-4 text-left text-sm text-muted-foreground sm:px-5">
              <p className="font-semibold text-foreground">Quick checks</p>
              <ul className="mt-2 space-y-1">
                <li>Make sure Wi-Fi or data is turned on.</li>
                <li>Try switching networks or toggling airplane mode.</li>
                <li>Reload the page when your connection is back.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
