"use client";

import { ChevronDown, Globe } from "lucide-react";

import { isLanguageCode, languages } from "@/i18n/languages";
import { useContent, useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

/** Compact language switcher (native select: accessible and keyboard-friendly). */
export function LanguageSelect({ className }: { className?: string }) {
  const { lang, setLanguage } = useLanguage();
  const { navStrings } = useContent();

  return (
    <label className={cn("relative inline-flex items-center", className)}>
      <span className="sr-only">{navStrings.language}</span>
      <Globe
        className="pointer-events-none absolute left-3.5 size-4 text-accent"
        aria-hidden="true"
      />
      <select
        value={lang}
        onChange={(event) => {
          if (isLanguageCode(event.target.value)) void setLanguage(event.target.value);
        }}
        className="h-11 cursor-pointer appearance-none rounded-full border border-foreground/15 bg-background/40 pr-10 pl-10 text-sm text-foreground transition-colors hover:border-accent focus:border-accent"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code} lang={language.code}>
            {language.native}
            {language.code !== "en" ? ` — ${language.english}` : ""}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 size-4 text-muted"
        aria-hidden="true"
      />
    </label>
  );
}
