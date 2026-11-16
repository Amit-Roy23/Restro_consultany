"use client";

import { Mail, MapPin, Phone } from "lucide-react";

import { AskForm } from "@/components/ui/AskForm";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { useContent } from "@/i18n/LanguageProvider";

export function ContactSection() {
  const { ask: askContent, contactPage } = useContent();
  const { email, phone, address, city } = siteConfig.contact;
  const hasDetails = Boolean(email || phone || address || city);

  return (
    <section className="bg-foreground py-24 text-background md:py-32">
      <Container className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="text-4xl md:text-5xl">{contactPage.askHeading}</h2>
          <AskForm
            id="contact"
            placeholder={askContent.placeholder}
            submitLabel={askContent.submitLabel}
            size="lg"
            className="mt-8"
          />
          <ul className="mt-6 flex flex-wrap gap-2">
            {askContent.suggestions.map((suggestion) => (
              <li
                key={suggestion}
                className="rounded-full border border-background/15 px-4 py-2 text-sm text-ink-muted"
              >
                {suggestion}
              </li>
            ))}
          </ul>

          <h2 className="mt-20 text-4xl md:text-5xl">{contactPage.stepsHeading}</h2>
          <ol className="mt-8 flex flex-col gap-6">
            {contactPage.steps.map((step, index) => (
              <li key={step} className="flex gap-5">
                <span className="font-display text-2xl text-accent-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-lg">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="rounded-lg bg-background p-8 text-foreground">
            <h2 className="eyebrow font-sans text-muted">{contactPage.detailsHeading}</h2>
            {hasDetails ? (
              <address className="mt-6 flex flex-col gap-4 not-italic">
                {email && (
                  <a href={`mailto:${email}`} className="flex gap-3 hover:text-accent">
                    <Mail
                      className="mt-1 size-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <span className="break-all">{email}</span>
                  </a>
                )}
                {phone && (
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="flex gap-3 hover:text-accent"
                  >
                    <Phone
                      className="mt-1 size-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    {phone}
                  </a>
                )}
                {(address || city) && (
                  <p className="flex gap-3">
                    <MapPin
                      className="mt-1 size-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <span>
                      {address}
                      {address && city && <br />}
                      {city}
                    </span>
                  </p>
                )}
              </address>
            ) : (
              <p className="mt-6 text-foreground/80">{contactPage.detailsPending}</p>
            )}
          </div>
        </aside>
      </Container>
    </section>
  );
}
