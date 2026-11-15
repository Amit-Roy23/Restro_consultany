"use client";

import { type ReactNode, createContext, useCallback, useContext, useState } from "react";

type IntroState = { done: boolean; finish: () => void };

const IntroContext = createContext<IntroState>({ done: true, finish: () => {} });

/**
 * Tracks whether the first-visit loading screen has finished, so entrance
 * animations (hero headline, page headers) wait for it instead of playing
 * behind it.
 */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  const finish = useCallback(() => setDone(true), []);
  return (
    <IntroContext.Provider value={{ done, finish }}>{children}</IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}
