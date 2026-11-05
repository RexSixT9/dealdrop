import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    title: "Product",
    links: [
      { href: "/#how", label: "How it works" },
      { href: "/#faq", label: "FAQ" },
      { href: "/guides", label: "Guides" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/methodology", label: "Methodology" },
      { href: "https://github.com/RexSixT9/dealdrop", label: "GitHub" },
    ],
  },
  {
    title: "Legal",
    links: [{ href: "/terms-privacy", label: "Terms and Privacy" }],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-10">
          <div className="max-w-sm">
            <div className="flex h-8 items-center sm:h-9">
              <Image
                className="hidden h-8 w-auto dark:block sm:h-9"
                src="/footer-monochrome-white.svg"
                alt="DealDrop logo"
                width={320}
                height={120}
              />
              <Image
                className="block h-8 w-auto dark:hidden sm:h-9"
                src="/footer-monochrome-dark.svg"
                alt="DealDrop logo"
                width={320}
                height={120}
              />
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Track the products you care about and get an email when the price
              reaches your target.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                {group.title}
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border/50 pt-6 text-xs text-muted-foreground/90 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p>© {year} DealDrop. All rights reserved.</p>
          <p>Prices are informational and may change at the retailer.</p>
        </div>
      </div>
    </footer>
  );
}
