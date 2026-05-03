import type { Metadata } from "next";
import { Geist, Sora } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import PwaProvider from "@/components/PwaProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://deal-drops.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DealDrop - Smart Price Tracker",
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
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
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
      // Legacy PNG fallback for Safari / older browsers (see step 4)
      {
        url: "/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: "/favicon-180.png", // iOS home screen icon
    shortcut: "/favicon-32.png",
  },
  // Open Graph / social share
  openGraph: {
    type: "website",
    url: "/",
    siteName: "DealDrop",
    title: "DealDrop - Smart Price Tracker",
    description:
      "Track product prices from your favorite stores and get instant alerts when prices drop.",
    images: [{ url: "/favicon-512.png", width: 512, height: 512, alt: "DealDrop" }],
  },
  twitter: {
    card: "summary",
    title: "DealDrop - Smart Price Tracker",
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
      className={`${geistSans.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PwaProvider />
          {children}
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
