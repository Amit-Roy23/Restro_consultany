"use client";

import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { mainNav, navCta, navStrings } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn, isActivePath } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

export function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Escape to close, lock body scroll, move focus into the dialog.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={navStrings.menuTitle}
      hidden={!open}
      className={cn(
        "grain fixed inset-0 z-[60] overflow-y-auto bg-background lg:hidden",
        "bg-[radial-gradient(ellipse_at_top_right,rgba(201,161,91,0.16),transparent_55%)]",
      )}
    >
      <Container className="flex min-h-full flex-col">
        <div className="flex h-(--nav-height) items-center justify-between">
          <Logo />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={navStrings.closeMenu}
            className="inline-flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground transition-colors hover:bg-foreground"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label={navStrings.mobileNavLabel} className="flex-1 py-10">
          <ul className="flex flex-col">
            {mainNav.map((item, index) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-border">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex items-baseline gap-4 py-4 font-display text-4xl font-semibold tracking-tight transition-colors sm:text-5xl",
                      active ? "text-accent" : "text-foreground hover:text-accent",
                    )}
                  >
                    <span className="eyebrow font-sans text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="ml-auto size-6 self-center opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-col gap-8 pb-10">
          <Button
            href={navCta.href}
            size="lg"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            {navCta.label}
          </Button>
          <div className="flex flex-col gap-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="hover:text-foreground"
            >
              {siteConfig.contact.email}
            </a>
            <ul className="flex gap-2">
              {siteConfig.socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    <SocialIcon platform={social.platform} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
