import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { legalNav, mainNav, navStrings } from "@/config/navigation";
import { siteConfig } from "@/config/site";

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

const linkClass = "text-muted transition-colors hover:text-foreground";

export function Footer() {
  const { contact, socials } = siteConfig;

  return (
    <footer className="grain border-t border-border bg-surface/40">
      <Container className="grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-12">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <Logo className="text-[2rem] leading-[0.9]" />
          <p className="max-w-sm text-muted">{siteConfig.tagline}</p>
        </div>

        <nav aria-label={navStrings.footerNavLabel} className="lg:col-span-2">
          <h2 className="mb-5 eyebrow font-sans text-foreground">
            {navStrings.footerLinksHeading}
          </h2>
          <ul className="flex flex-col gap-3 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="mb-5 eyebrow font-sans text-foreground">
            {navStrings.footerContactHeading}
          </h2>
          <address className="flex flex-col gap-3 text-sm not-italic">
            <a href={`mailto:${contact.email}`} className={`${linkClass} flex gap-3`}>
              <Mail className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
              <span className="break-all">{contact.email}</span>
            </a>
            <a
              href={`tel:${contact.phone.replace(/\s+/g, "")}`}
              className={`${linkClass} flex gap-3`}
            >
              <Phone className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
              {contact.phone}
            </a>
            <p className="flex gap-3 text-muted">
              <MapPin className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
              <span>
                {contact.address}
                <br />
                {contact.city}
              </span>
            </p>
          </address>
        </div>

        <div className="lg:col-span-2">
          <h2 className="mb-5 eyebrow font-sans text-foreground">
            {navStrings.footerSocialHeading}
          </h2>
          <ul className="flex gap-2">
            {socials.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <SocialIcon platform={social.platform} className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {siteConfig.name} {navStrings.rightsReserved}
          </p>
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
        </Container>
      </div>
    </footer>
  );
}
