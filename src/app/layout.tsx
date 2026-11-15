import type { Metadata, Viewport } from "next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { IntroProvider } from "@/components/layout/IntroProvider";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { Preloader } from "@/components/layout/Preloader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { navStrings } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { bootScript } from "@/lib/bootScript";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: "/images/team/hospitality-team.jpg", width: 1022, height: 637 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#14100D",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(fontDisplay.variable, fontSans.variable)}
      suppressHydrationWarning
    >
      <head>
        {/* Reload → homepage, and skip the loader if it already played this session. */}
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70]"
        >
          {navStrings.skipToContent}
        </a>
        <MotionProvider>
          <IntroProvider>
            <Preloader />
            <SmoothScroll />
            <Navbar />
            <main
              id="main"
              className="relative z-10 flex-1 bg-background shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
            >
              {children}
            </main>
            <Footer />
          </IntroProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
