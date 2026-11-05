import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock } from "lucide-react";
import MotionPage from "@/components/MotionPage";
import SiteHeader from "@/components/SiteHeader";
import { GUIDES, getGuide } from "@/constants/guides";
import { absoluteUrl, formatGuideDate, siteName } from "@/lib/site";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/lib/seo";

type GuidePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    return {
      title: "Guide not found",
      robots: { index: false, follow: false },
    };
  }

  const canonical = `/guides/${guide.slug}`;
  const ogImage = absoluteUrl(`${canonical}/opengraph-image`);

  return {
    title: guide.seoTitle,
    description: guide.description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      url: absoluteUrl(canonical),
      title: guide.seoTitle,
      description: guide.description,
      publishedTime: guide.updatedAt,
      modifiedTime: guide.updatedAt,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.seoTitle,
      description: guide.description,
      images: [ogImage],
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    notFound();
  }

  const canonical = `/guides/${guide.slug}`;
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
    { name: guide.title, href: canonical },
  ];
  const relatedGuides = GUIDES.filter((item) => item.slug !== guide.slug).slice(
    0,
    2,
  );
  const jsonLd = [
    articleJsonLd({
      title: guide.title,
      description: guide.description,
      slug: guide.slug,
      updatedAt: guide.updatedAt,
    }),
    breadcrumbJsonLd(breadcrumbs),
    faqJsonLd(guide.faqs),
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MotionPage className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-copper-forge" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-20 dark:opacity-30" />

        <SiteHeader />

        <article className="px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
          <div className="mx-auto w-full max-w-3xl">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 text-sm text-muted-foreground"
            >
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="transition-colors hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href="/guides"
                    className="transition-colors hover:text-foreground"
                  >
                    Guides
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-foreground">
                  {guide.title}
                </li>
              </ol>
            </nav>

            <header className="border-b border-border/60 pb-8">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-primary sm:text-xs">
                Guide
              </p>
              <h1 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {guide.title}
              </h1>
              <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                {guide.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {guide.readingTime} min read
                </span>
                <span>Updated {formatGuideDate(guide.updatedAt)}</span>
                <span>By the {siteName} team</span>
              </div>
            </header>

            <div className="mt-10 space-y-10">
              {guide.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets && (
                      <ul className="list-disc space-y-2 pl-5">
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))}
            </div>

            <section className="mt-14 border-t border-border/60 pt-10">
              <h2 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
                Common questions
              </h2>
              <div className="mt-6 space-y-6">
                {guide.faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="text-base font-semibold text-foreground">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <aside className="mt-12 rounded-3xl border border-border/70 bg-card/80 p-6 sm:p-8">
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Put this into practice.
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                Paste a product URL, set a target, and let DealDrop watch the
                price for you.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <Link
                  href="/"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Start tracking
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#how"
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  Learn how it works
                </Link>
              </div>
            </aside>

            <section className="mt-12 border-t border-border/60 pt-10">
              <h2 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
                Keep reading
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {relatedGuides.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/guides/${related.slug}`}
                    className="group rounded-2xl border border-border/60 bg-card/70 p-5 transition-colors hover:border-primary/40 hover:bg-card/90"
                  >
                    <p className="text-[11px] font-medium uppercase tracking-wide text-primary">
                      {related.readingTime} min read
                    </p>
                    <h3 className="mt-2 text-sm font-semibold text-foreground">
                      {related.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                      Read guide
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            <p className="mt-10 text-xs leading-6 text-muted-foreground">
              DealDrop publishes educational content about price tracking. See
              our{" "}
              <Link
                href="/methodology"
                className="font-medium text-foreground underline underline-offset-4"
              >
                methodology
              </Link>{" "}
              for how price data is collected and its limitations.
            </p>
          </div>
        </article>
      </MotionPage>
    </main>
  );
}
