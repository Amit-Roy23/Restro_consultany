"use client";

import { useContent } from "@/i18n/LanguageProvider";

export function SkipLink() {
  const { navStrings } = useContent();
  return (
    <a
      href="#main"
      className="sr-only rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70]"
    >
      {navStrings.skipToContent}
    </a>
  );
}
