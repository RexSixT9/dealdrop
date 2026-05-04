import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/80">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-2 px-4 py-5 text-center sm:gap-3 sm:px-6 sm:py-6 lg:px-8">
        <div className="flex h-6 items-center justify-center sm:h-7 lg:h-8">
          <Image
            className="hidden h-6 w-auto dark:block sm:h-7 lg:h-8"
            src="/logo-footer-muted.svg"
            alt="DealDrop logo"
            width={320}
            height={120}
          />
          <Image
            className="block h-6 w-auto dark:hidden sm:h-7 lg:h-8"
            src="/logo-footer-muted.svg"
            alt="DealDrop logo"
            width={320}
            height={120}
          />
        </div>
        <div className="text-[0.7rem] leading-4 text-muted-foreground sm:text-xs sm:leading-5">
          <span>© {year} DealDrop</span>
          <span className="mx-2 text-border/70">•</span>
          <span>
            Developed by{" "}
            <Link
              href="https://github.com/RexSixT9"
              className="font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              RexSixT9
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
