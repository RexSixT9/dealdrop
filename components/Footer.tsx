import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/80">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 px-4 py-6 text-center sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <Image
            className="hidden h-8 w-auto dark:block"
            src="/logos.png"
            alt="DealDrop logo"
            width={320}
            height={120}
          />
          <Image
            className="block h-8 w-auto dark:hidden"
            src="/logo.png"
            alt="DealDrop logo"
            width={320}
            height={120}
          />
        </div>
        <div className="text-xs text-muted-foreground sm:text-sm">
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
