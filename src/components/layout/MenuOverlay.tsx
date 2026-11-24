"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { AskForm } from "@/components/ui/AskForm";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { getLenis } from "@/lib/smoothScroll";
import { cn, isActivePath } from "@/lib/utils";
import { useContent } from "@/i18n/LanguageProvider";
import { LanguageSelect } from "@/components/ui/LanguageSelect";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

/** Full-screen site menu: navigation on the left, "Ask" box in the centre. */
export function MenuOverlay({ open, onClose, pathname }: MenuOverlayProps) {
  const { ask: askContent, mainNav, menuPromo, navStrings } = useContent();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Escape to close, lock body scroll, keep focus inside the dialog.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    // Focus whichever close button is visible at this breakpoint.
    const closeButtons =
      dialogRef.current?.querySelectorAll<HTMLElement>("[data-menu-close]");
    Array.from(closeButtons ?? [])
      .find((button) => button.offsetParent !== null)
      ?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), input:not([disabled])",
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      getLenis()?.start();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={dialogRef}
            id="site-menu"
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label={navStrings.menuTitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grain fixed inset-0 z-[60] overflow-y-auto bg-[linear-gradient(180deg,var(--background)_0%,#13244a_45%,#1b3060_80%,#8a6d36_100%)]"
          >
            <div className="mx-auto flex min-h-full max-w-(--container-max) flex-col gap-12 px-5 py-6 md:px-8 lg:grid lg:grid-cols-[240px_1fr_240px] lg:gap-10 lg:px-10">
              {/* Left column: logo, links, promo */}
              <div className="flex flex-col gap-12 lg:min-h-[calc(100svh-3rem)] lg:justify-between">
                <div className="flex items-center justify-between">
                  <Logo />
                  <CloseButton onClose={onClose} className="lg:hidden" />
                </div>

                <nav aria-label={navStrings.menuNavLabel}>
                  <p className="mb-4 eyebrow text-muted">{navStrings.exploreHeading}</p>
                  <ul className="flex flex-col gap-1">
                    {mainNav.map((item, index) => {
                      const active = isActivePath(pathname, item.href);
                      return (
                        <motion.li
                          key={item.href}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 + index * 0.05, duration: 0.4 }}
                        >
                          <Link
                            href={item.href}
                            onClick={onClose}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "inline-block py-1 font-sans text-3xl font-semibold tracking-tight transition-colors lg:text-lg",
                              active
                                ? "text-accent"
                                : "text-foreground hover:text-accent",
                            )}
                          >
                            {item.label}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                <div>
                  <p className="mb-3 eyebrow text-muted">{navStrings.language}</p>
                  <LanguageSelect />
                </div>

                <div className="hidden rounded-md border border-foreground/10 bg-background/50 p-5 backdrop-blur lg:block">
                  <p className="font-sans text-sm font-semibold">{menuPromo.title}</p>
                  <Button
                    href={menuPromo.cta.href}
                    size="sm"
                    onClick={onClose}
                    className="mt-4"
                  >
                    {menuPromo.cta.label}
                  </Button>
                </div>
              </div>

              {/* Centre: Ask */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center pb-10 lg:pt-[12vh]"
              >
                <p className="font-display text-5xl font-bold tracking-[-0.04em] text-accent md:text-6xl">
                  {askContent.title}
                </p>
                <AskForm
                  id="menu"
                  placeholder={askContent.placeholder}
                  submitLabel={askContent.submitLabel}
                  size="lg"
                  className="mt-8 max-w-2xl"
                />
                <p className="mt-8 text-center eyebrow text-muted">
                  {askContent.suggestionsLabel}
                </p>
                <ul className="mt-5 grid w-full max-w-2xl gap-3 sm:grid-cols-2">
                  {askContent.suggestions.map((suggestion) => (
                    <li key={suggestion}>
                      <Link
                        href={`/contact?q=${encodeURIComponent(suggestion)}`}
                        onClick={onClose}
                        className="block h-full rounded-full border border-foreground/10 bg-background/40 px-5 py-3 text-center text-sm text-foreground/85 transition-colors hover:border-accent hover:text-accent"
                      >
                        {suggestion}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Right: close button (desktop) */}
              <div className="hidden justify-end lg:flex">
                <CloseButton onClose={onClose} className="-mt-3" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

function CloseButton({
  onClose,
  className,
}: {
  onClose: () => void;
  className?: string;
}) {
  const { navStrings } = useContent();
  return (
    <button
      data-menu-close
      type="button"
      onClick={onClose}
      aria-label={navStrings.closeMenu}
      className={cn(
        "inline-flex size-12 items-center justify-center rounded-full bg-foreground text-background transition-colors hover:bg-accent md:size-14",
        className,
      )}
    >
      <X className="size-5" aria-hidden="true" />
    </button>
  );
}
