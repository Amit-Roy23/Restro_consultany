"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navCta, navStrings } from "@/config/navigation";
import { cn } from "@/lib/utils";

/**
 * Minimal floating header: logo and CTA sit at the top of the page and slide
 * away once you scroll; the round menu button stays put.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <Container className="flex h-(--nav-height) items-center justify-between gap-6">
          <div
            className={cn(
              "transition-[opacity,translate] duration-500",
              scrolled
                ? "pointer-events-none -translate-y-4 opacity-0"
                : "pointer-events-auto opacity-100",
            )}
          >
            <Logo />
          </div>

          <div className="flex items-center gap-3">
            <Button
              href={navCta.href}
              size="md"
              tabIndex={scrolled ? -1 : undefined}
              className={cn(
                "hidden transition-[opacity,translate,background-color,color] duration-500 md:inline-flex",
                scrolled
                  ? "pointer-events-none -translate-y-4 opacity-0"
                  : "pointer-events-auto opacity-100",
              )}
            >
              {navCta.label}
            </Button>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={navStrings.openMenu}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              className="pointer-events-auto inline-flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-background/30 transition-[background-color,scale] hover:scale-105 hover:bg-foreground md:size-14"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </header>

      <MenuOverlay open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}
