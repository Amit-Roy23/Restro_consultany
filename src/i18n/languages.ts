/** Languages offered on the welcome screen and in the menu. */
export const languages = [
  {
    code: "en",
    native: "English",
    english: "English",
    script: "latin",
    welcome: "Welcome",
  },
  {
    code: "hi",
    native: "हिन्दी",
    english: "Hindi",
    script: "devanagari",
    welcome: "स्वागत है",
  },
  {
    code: "bn",
    native: "বাংলা",
    english: "Bengali",
    script: "bengali",
    welcome: "স্বাগতম",
  },
  {
    code: "gu",
    native: "ગુજરાતી",
    english: "Gujarati",
    script: "gujarati",
    welcome: "સ્વાગત છે",
  },
  {
    code: "mr",
    native: "मराठी",
    english: "Marathi",
    script: "devanagari",
    welcome: "स्वागत आहे",
  },
  {
    code: "ta",
    native: "தமிழ்",
    english: "Tamil",
    script: "tamil",
    welcome: "வரவேற்கிறோம்",
  },
  { code: "te", native: "తెలుగు", english: "Telugu", script: "telugu", welcome: "స్వాగతం" },
  { code: "kn", native: "ಕನ್ನಡ", english: "Kannada", script: "kannada", welcome: "ಸ್ವಾಗತ" },
  {
    code: "ml",
    native: "മലയാളം",
    english: "Malayalam",
    script: "malayalam",
    welcome: "സ്വാഗതം",
  },
  {
    code: "pa",
    native: "ਪੰਜਾਬੀ",
    english: "Punjabi",
    script: "gurmukhi",
    welcome: "ਜੀ ਆਇਆਂ ਨੂੰ",
  },
  { code: "or", native: "ଓଡ଼ିଆ", english: "Odia", script: "oriya", welcome: "ସ୍ୱାଗତ" },
  {
    code: "as",
    native: "অসমীয়া",
    english: "Assamese",
    script: "bengali",
    welcome: "স্বাগতম",
  },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];

export const defaultLanguage: LanguageCode = "en";

export function isLanguageCode(value: unknown): value is LanguageCode {
  return languages.some((language) => language.code === value);
}

/** localStorage key holding the visitor's chosen language. */
export const LANGUAGE_KEY = "resto-lang";
