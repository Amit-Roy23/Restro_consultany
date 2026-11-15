import Link from "next/link";

import { AskForm } from "@/components/ui/AskForm";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { legalNav, mainNav, navStrings } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { askContent } from "@/content/home";

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

/**
 * Big gradient footer. On large screens it is pinned underneath the page
 * (sticky bottom, below `main` in z-order) so the content above slides away
 * to reveal it.
 */
export function Footer() {
  const { contact, socials } = siteConfig;

  return (
    <footer className="grain relative z-0 overflow-hidden border-t-4 border-accent bg-[linear-gradient(160deg,var(--background)_0%,#22160f_40%,#5a2c14_80%,#8a5a26_100%)] lg:sticky lg:bottom-0">
      <Container className="flex min-h-[80svh] flex-col justify-between gap-16 py-14 md:py-20">
        <p
          aria-hidden="true"
          className="font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.85] font-bold tracking-[-0.05em] text-accent"
        >
          {siteConfig.logoLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <nav aria-label={navStrings.footerNavLabel} className="lg:col-span-3">
            <h2 className="mb-5 eyebrow font-sans text-muted">
              {navStrings.exploreHeading}
            </h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm font-medium">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="mb-5 eyebrow font-sans text-muted">
              {navStrings.footerContactHeading}
            </h2>
            <address className="flex flex-col gap-2.5 text-sm not-italic">
              <a href={`mailto:${contact.email}`} className="break-all hover:text-accent">
                {contact.email}
              </a>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="hover:text-accent"
              >
                {contact.phone}
              </a>
              <span className="text-foreground/75">{contact.city}</span>
            </address>
          </div>

          <div className="md:col-span-2 lg:col-span-5 lg:col-start-8">
            <h2 className="mb-5 eyebrow font-sans text-muted">{askContent.label}</h2>
            <AskForm
              id="footer"
              placeholder={askContent.placeholder}
              submitLabel={askContent.submitLabel}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-foreground/15 pt-6 text-xs text-foreground/70 md:flex-row md:items-center md:justify-between">
          <p>
            © <CopyrightYear /> {siteConfig.name}. {navStrings.rightsReserved}
          </p>
          <ul className="flex gap-2">
            {socials.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <SocialIcon platform={social.platform} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
