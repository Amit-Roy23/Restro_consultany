import {
  Fraunces,
  Inter,
  Noto_Sans_Bengali,
  Noto_Sans_Devanagari,
  Noto_Sans_Gujarati,
  Noto_Sans_Gurmukhi,
  Noto_Sans_Kannada,
  Noto_Sans_Malayalam,
  Noto_Sans_Oriya,
  Noto_Sans_Tamil,
  Noto_Sans_Telugu,
  Noto_Serif_Bengali,
  Noto_Serif_Devanagari,
  Noto_Serif_Gujarati,
  Noto_Serif_Gurmukhi,
  Noto_Serif_Kannada,
  Noto_Serif_Malayalam,
  Noto_Serif_Oriya,
  Noto_Serif_Tamil,
  Noto_Serif_Telugu,
} from "next/font/google";

export const fontDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/*
 * Indian scripts. Latin text keeps Inter/Fraunces; these only supply the
 * script's own letters. `preload: false` + per-script unicode ranges mean a
 * visitor only downloads the font for the language they actually read.
 */
const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "600", "700"],
  variable: "--font-sans-deva",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "600", "700"],
  variable: "--font-sans-beng",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
const notoSansGujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati"],
  weight: ["400", "600", "700"],
  variable: "--font-sans-gujr",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
const notoSansGurmukhi = Noto_Sans_Gurmukhi({
  subsets: ["gurmukhi"],
  weight: ["400", "600", "700"],
  variable: "--font-sans-guru",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
const notoSansOriya = Noto_Sans_Oriya({
  subsets: ["oriya"],
  weight: ["400", "600", "700"],
  variable: "--font-sans-orya",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
const notoSansTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  weight: ["400", "600", "700"],
  variable: "--font-sans-taml",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
const notoSansTelugu = Noto_Sans_Telugu({
  subsets: ["telugu"],
  weight: ["400", "600", "700"],
  variable: "--font-sans-telu",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
const notoSansKannada = Noto_Sans_Kannada({
  subsets: ["kannada"],
  weight: ["400", "600", "700"],
  variable: "--font-sans-knda",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
const notoSansMalayalam = Noto_Sans_Malayalam({
  subsets: ["malayalam"],
  weight: ["400", "600", "700"],
  variable: "--font-sans-mlym",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "600", "700"],
  variable: "--font-serif-deva",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["400", "600", "700"],
  variable: "--font-serif-beng",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
const notoSerifGujarati = Noto_Serif_Gujarati({
  subsets: ["gujarati"],
  weight: ["400", "600", "700"],
  variable: "--font-serif-gujr",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
const notoSerifGurmukhi = Noto_Serif_Gurmukhi({
  subsets: ["gurmukhi"],
  weight: ["400", "600", "700"],
  variable: "--font-serif-guru",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
const notoSerifOriya = Noto_Serif_Oriya({
  subsets: ["oriya"],
  weight: ["400", "600", "700"],
  variable: "--font-serif-orya",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
const notoSerifTamil = Noto_Serif_Tamil({
  subsets: ["tamil"],
  weight: ["400", "600", "700"],
  variable: "--font-serif-taml",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
const notoSerifTelugu = Noto_Serif_Telugu({
  subsets: ["telugu"],
  weight: ["400", "600", "700"],
  variable: "--font-serif-telu",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
const notoSerifKannada = Noto_Serif_Kannada({
  subsets: ["kannada"],
  weight: ["400", "600", "700"],
  variable: "--font-serif-knda",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
const notoSerifMalayalam = Noto_Serif_Malayalam({
  subsets: ["malayalam"],
  weight: ["400", "600", "700"],
  variable: "--font-serif-mlym",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

const scriptFonts = [
  notoSansDevanagari,
  notoSansBengali,
  notoSansGujarati,
  notoSansGurmukhi,
  notoSansOriya,
  notoSansTamil,
  notoSansTelugu,
  notoSansKannada,
  notoSansMalayalam,
  notoSerifDevanagari,
  notoSerifBengali,
  notoSerifGujarati,
  notoSerifGurmukhi,
  notoSerifOriya,
  notoSerifTamil,
  notoSerifTelugu,
  notoSerifKannada,
  notoSerifMalayalam,
];

/** All font CSS-variable classes, for <html>. */
export const fontVariables = [fontDisplay, fontSans, ...scriptFonts]
  .map((font) => font.variable)
  .join(" ");
