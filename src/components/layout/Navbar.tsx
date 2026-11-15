"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { mainNav, navCta, navStrings } from "@/config/navigation";
import { cn, isActivePath } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "border-border bg-background/75 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Container className="flex h-(--nav-height) items-center justify-between gap-6">
          <Logo />

          <div className="flex items-center gap-3 lg:gap-6">
            <nav aria-label={navStrings.mainNavLabel} className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {mainNav.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "relative rounded-full px-4 py-2 text-sm transition-colors",
                          active ? "text-foreground" : "text-muted hover:text-foreground",
                        )}
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute inset-x-4 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300",
                            active ? "scale-x-100" : "scale-x-0",
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <Button href={navCta.href} size="md" className="hidden md:inline-flex">
              {navCta.label}
            </Button>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={navStrings.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground transition-colors hover:bg-foreground lg:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}
