import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 px-4 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6 sm:text-left lg:px-8">
        <div className="flex h-8 items-center justify-center sm:h-9 lg:h-10">
          <Image
            className="hidden h-8 w-auto dark:block sm:h-9 lg:h-10"
            src="/footer-monochrome-white.svg"
            alt="DealDrop logo"
            width={320}
            height={120}
          />
          <Image
            className="block h-8 w-auto dark:hidden sm:h-9 lg:h-10"
            src="/footer-monochrome-dark.svg"
            alt="DealDrop logo"
            width={320}
            height={120}
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-center text-xs leading-5 text-muted-foreground/90 sm:justify-end sm:text-sm sm:leading-6">
          <span>© {year} DealDrop</span>
          <span className="text-muted-foreground/80">•</span>
          <Link
            href="https://github.com/RexSixT9"
            className="font-medium text-muted-foreground/90 transition-colors hover:text-foreground"
          >
            RexSixT9
          </Link>
        </div>
      </div>
    </footer>
  );
}
