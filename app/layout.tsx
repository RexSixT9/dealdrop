import type { Metadata } from "next";
import { Geist, Sora } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import PwaProvider from "@/components/PwaProvider";
import OfflineBanner from "@/components/OfflineBanner";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://deals.r6t9.space";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DealDrop | Price Tracker & Alerts",
    template: "%s | DealDrop",
  },
  description:
    "Track product prices from your favorite stores and get instant alerts when prices drop.",
  keywords: [
    "price tracker",
    "price drop alerts",
    "deal tracker",
    "product monitoring",
    "shopping alerts",
  ],
  applicationName: "DealDrop",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      // PNG defaults for broad mobile/browser support
      {
        url: "/favicon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: "/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      // Browsers that support prefers-color-scheme in <link> (Chrome, Edge, Firefox)
      {
        url: "/favicon-light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [{ url: "/favicon-180.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon-32.png",
  },
  // Open Graph / social share
  openGraph: {
    type: "website",
    url: "/",
    siteName: "DealDrop",
    title: "DealDrop | Price Tracker & Alerts",
    description:
      "Track product prices from your favorite stores and get instant alerts when prices drop.",
    images: [{ url: "/favicon-512.png", width: 512, height: 512, alt: "DealDrop" }],
  },
  twitter: {
    card: "summary",
    title: "DealDrop | Price Tracker & Alerts",
    description:
      "Track product prices from your favorite stores and get instant alerts when prices drop.",
    images: ["/favicon-512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${sora.variable} h-full subpixel-antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://images.weserv.nl" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.weserv.nl" />
        <link rel="preconnect" href="https://m.media-amazon.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://m.media-amazon.com" />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PwaProvider />
          <OfflineBanner />
          {children}
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
