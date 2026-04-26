import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dealdrop - Your Ultimate Deal Aggregator",
  description:
    "Discover the best deals across the web with Dealdrop, your ultimate deal aggregator. Save time and money by finding discounts in one place. Start saving today!",
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
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors={true}
              position="top-right"
              toastOptions={{
                duration: 3000,
              }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
