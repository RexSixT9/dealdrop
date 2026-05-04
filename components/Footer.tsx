import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/80">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-2 px-4 py-3 text-center sm:gap-2 sm:px-6 sm:py-4 lg:px-8 lg:py-5">
        <div className="flex h-8 items-center justify-center sm:h-9 lg:h-10">
          <Image
            className="hidden h-8 w-auto dark:block sm:h-9 lg:h-10"
            src="/logo-footer-muted.svg"
            alt="DealDrop logo"
            width={320}
            height={120}
          />
          <Image
            className="block h-8 w-auto dark:hidden sm:h-9 lg:h-10"
            src="/logo-footer-muted.svg"
            alt="DealDrop logo"
            width={320}
            height={120}
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 text-center text-xs leading-5 text-muted-foreground/70 sm:text-sm sm:leading-6">
          <span>© {year} DealDrop</span>
          <span className="text-border/70">•</span>
          <Link
            href="https://github.com/RexSixT9"
            className="font-medium text-muted-foreground/70 transition-colors hover:text-foreground/90"
          >
            RexSixT9
          </Link>
        </div>
      </div>
    </footer>
  );
}
