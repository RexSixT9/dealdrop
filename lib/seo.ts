import { absoluteUrl, siteName, siteUrl } from "@/lib/site";

type BreadcrumbItem = {
  name: string;
  href: string;
};

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

type ArticleJsonLdInput = {
  title: string;
  description: string;
  slug: string;
  updatedAt: string;
};

export function articleJsonLd({
  title,
  description,
  slug,
  updatedAt,
}: ArticleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: updatedAt,
    dateModified: updatedAt,
    author: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/favicon-512.png"),
      },
    },
    mainEntityOfPage: absoluteUrl(`/guides/${slug}`),
    image: [absoluteUrl(`/guides/${slug}/opengraph-image`)],
  };
}

type FaqItem = {
  question: string;
  answer: string;
};

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
