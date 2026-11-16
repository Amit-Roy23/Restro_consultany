"use client";

import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { type SiteContent, buildContent } from "@/content";
import {
  LANGUAGE_KEY,
  type LanguageCode,
  defaultLanguage,
  isLanguageCode,
  languages,
} from "@/i18n/languages";
import { type Messages, type Translation, en } from "@/i18n/messages/en";

/** Each language is its own chunk, downloaded only when chosen. */
const loaders: Record<
  Exclude<LanguageCode, "en">,
  () => Promise<{ default: Translation }>
> = {
  hi: () => import("@/i18n/messages/hi"),
  bn: () => import("@/i18n/messages/bn"),
  gu: () => import("@/i18n/messages/gu"),
  mr: () => import("@/i18n/messages/mr"),
  ta: () => import("@/i18n/messages/ta"),
  te: () => import("@/i18n/messages/te"),
  kn: () => import("@/i18n/messages/kn"),
  ml: () => import("@/i18n/messages/ml"),
  pa: () => import("@/i18n/messages/pa"),
  or: () => import("@/i18n/messages/or"),
  as: () => import("@/i18n/messages/as"),
};

async function loadMessages(code: LanguageCode): Promise<Messages> {
  if (code === "en") return en;
  const translation = (await loaders[code]()).default;
  // Sections not yet translated fall back to English.
  return { ...translation, biz: translation.biz ?? en.biz };
}

function applyToDocument(code: LanguageCode) {
  const root = document.documentElement;
  root.lang = code;
  root.dataset.lang = code;
  root.dataset.script =
    languages.find((language) => language.code === code)?.script ?? "latin";
}

type LanguageState = {
  lang: LanguageCode;
  /** True once the visitor has picked a language (now or on an earlier visit). */
  hasChosen: boolean;
  content: SiteContent;
  setLanguage: (code: LanguageCode) => Promise<void>;
};

const englishContent = buildContent(en);

const LanguageContext = createContext<LanguageState>({
  lang: defaultLanguage,
  hasChosen: false,
  content: englishContent,
  setLanguage: async () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{
    lang: LanguageCode;
    messages: Messages;
    hasChosen: boolean;
  }>({ lang: defaultLanguage, messages: en, hasChosen: false });

  // Restore the saved language after hydration (pages are pre-rendered in English).
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(LANGUAGE_KEY);
    } catch {
      // storage unavailable
    }
    const markReady = () => document.documentElement.setAttribute("data-i18n-ready", "");
    if (!isLanguageCode(saved)) {
      markReady();
      return;
    }
    const code = saved;
    loadMessages(code)
      .then((messages) => {
        setState({ lang: code, messages, hasChosen: true });
        applyToDocument(code);
      })
      .finally(markReady);
  }, []);

  const setLanguage = useCallback(async (code: LanguageCode) => {
    const messages = await loadMessages(code);
    setState({ lang: code, messages, hasChosen: true });
    applyToDocument(code);
    try {
      localStorage.setItem(LANGUAGE_KEY, code);
    } catch {
      // storage unavailable: the choice lasts for this page view
    }
  }, []);

  const content = useMemo(
    () => (state.messages === en ? englishContent : buildContent(state.messages)),
    [state.messages],
  );

  const value = useMemo(
    () => ({ lang: state.lang, hasChosen: state.hasChosen, content, setLanguage }),
    [state.lang, state.hasChosen, content, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/** The whole site's text and structure in the active language. */
export function useContent() {
  return useContext(LanguageContext).content;
}
