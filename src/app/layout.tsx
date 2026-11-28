import type { Metadata, Viewport } from "next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { IntroProvider } from "@/components/layout/IntroProvider";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { Preloader } from "@/components/layout/Preloader";
import { SkipLink } from "@/components/layout/SkipLink";
import { WelcomeFlow } from "@/components/layout/WelcomeFlow";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { siteConfig } from "@/config/site";
import { bootScript } from "@/lib/bootScript";
import { fontVariables } from "@/lib/fonts";

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
  themeColor: "#0A1428",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Reload → homepage, and skip the loader if it already played this session. */}
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="flex min-h-svh flex-col">
        <LanguageProvider>
          <SkipLink />
          <MotionProvider>
            <IntroProvider>
              <Preloader />
              <WelcomeFlow />
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
        </LanguageProvider>
      </body>
    </html>
  );
}
