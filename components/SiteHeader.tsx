import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import Logo from "@/components/Logo";
import { ModeToggle } from "@/components/mode-toggle";

const navigation = [
  { href: "/#how", label: "How it works" },
  { href: "/guides", label: "Guides" },
  { href: "/#faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

type SiteHeaderProps = {
  user?: unknown;
};

export default function SiteHeader({ user }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex min-w-0 items-center gap-6 lg:gap-8">
          <Logo variant="compact" />
          <div className="hidden items-center gap-5 text-sm font-medium text-muted-foreground md:flex lg:gap-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 max-[360px]:gap-1.5 sm:gap-3">
          <ModeToggle />
          <AuthButton user={user} />
        </div>
      </nav>
    </header>
  );
}
