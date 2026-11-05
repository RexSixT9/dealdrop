import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import PwaProvider from "@/components/PwaProvider";
import OfflineBanner from "@/components/OfflineBanner";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import {
  defaultOpenGraphImage,
  siteDescription,
  siteName,
  siteUrl,
} from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DealDrop | Price Tracker & Alerts",
    template: "%s | DealDrop",
  },
  description: siteDescription,
  keywords: [
    "price tracker",
    "price drop alerts",
    "deal tracker",
    "product monitoring",
    "shopping alerts",
  ],
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
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
    siteName,
    title: "DealDrop | Price Tracker & Alerts",
    description: siteDescription,
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "DealDrop | Price Tracker & Alerts",
    description: siteDescription,
    images: [defaultOpenGraphImage.url],
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
      className={`${geistSans.variable} h-full subpixel-antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://images.weserv.nl" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.weserv.nl" />
        <link rel="preconnect" href="https://m.media-amazon.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://m.media-amazon.com" />
        <link rel="describedby" href="/llms.txt" type="text/plain" />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
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
