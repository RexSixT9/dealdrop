import type { Metadata } from "next";
import { Geist, Sora } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
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

export const metadata: Metadata = {
  title: "DealDrop - Smart Price Tracker",
  description:
    "Track product prices from your favorite stores and get instant alerts when prices drop.",
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
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FA5D19" },
    { media: "(prefers-color-scheme: dark)", color: "#1e1e1c" },
  ],
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
