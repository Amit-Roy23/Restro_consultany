"use client";

import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type Stage = "loading" | "welcome" | "done";

type IntroState = {
  stage: Stage;
  /** True once the visitor reaches the website itself. */
  done: boolean;
  /** Loader finished → show the welcome journey underneath it. */
  showWelcome: () => void;
  /** Welcome finished (or skipped) → start the website's entrance animations. */
  finish: () => void;
};

const IntroContext = createContext<IntroState>({
  stage: "done",
  done: true,
  showWelcome: () => {},
  finish: () => {},
});

/**
 * First-visit flow: loading screen → welcome journey → website. Entrance
 * animations (hero headline, page headers) wait for `done` instead of playing
 * behind the overlays.
 */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<Stage>("loading");
  const showWelcome = useCallback(() => setStage("welcome"), []);
  const finish = useCallback(() => setStage("done"), []);
  const value = useMemo(
    () => ({ stage, done: stage === "done", showWelcome, finish }),
    [stage, showWelcome, finish],
  );
  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

export function useIntro() {
  return useContext(IntroContext);
}
