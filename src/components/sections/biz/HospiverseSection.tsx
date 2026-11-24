"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Globe2, Mail, Send } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { siteConfig } from "@/config/site";
import { hospiverseMarkets } from "@/content/hospiverse";
import { useContent } from "@/i18n/LanguageProvider";
import { en } from "@/i18n/messages/en";
import { cn } from "@/lib/utils";

const EN = en.biz.hospiverse;
const OTHER = "other";

/**
 * Resto Hospiverse: international markets as a "departure board" (one country
 * per line, with its live local time) beside the enquiry form. Choosing a
 * country on the board selects it in the form.
 */
export function HospiverseSection() {
  const { biz } = useContent();
  const { hospiverse: h, lead } = biz;
  const [country, setCountry] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const now = useClock();

  const pick = (index: number) => {
    setCountry(String(index));
    // On small screens the form sits below the board: bring it into view.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    formRef.current?.querySelector<HTMLInputElement>("input[name=name]")?.focus({
      preventScroll: true,
    });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim() || "—";
    const countryIndex = Number(data.get("country"));
    const countryName =
      data.get("country") === OTHER
        ? EN.otherCountry
        : (EN.countries[countryIndex] ?? "—");
    const type = en.biz.lead.fields.types[Number(data.get("type"))] ?? "—";

    const lines = [
      `${EN.fields.name}: ${get("name")}`,
      `${EN.fields.country}: ${countryName}`,
      `${EN.fields.email}: ${get("email")}`,
      `${EN.fields.phone}: ${get("phone")}`,
      `${EN.fields.businessType}: ${type}`,
      "",
      `${EN.fields.plan}:`,
      get("plan"),
    ];
    const subject = `Resto Hospiverse enquiry — ${countryName} — ${get("name")}`;
    const link = document.createElement("a");
    link.href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    link.click();
  };

  const field =
    "mt-1.5 h-12 w-full rounded-xl border border-foreground/15 bg-background/70 px-4 text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none";
  const label = "text-sm text-foreground/80";

  return (
    <section
      id="hospiverse"
      aria-labelledby="hospiverse-heading"
      className="grain relative scroll-mt-4 overflow-clip bg-background py-24 md:py-32"
    >
      <Orbits />

      <Container className="relative">
        <SectionLabel>
          <span className="inline-flex items-center gap-2">
            <Globe2 className="size-4 text-accent" aria-hidden="true" />
            {h.label}
          </span>
        </SectionLabel>
        <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end">
          <TextReveal
            id="hospiverse-heading"
            text={h.label}
            className="text-5xl md:text-7xl lg:col-span-7 lg:text-8xl"
          />
          <Reveal inView delay={0.15} className="lg:col-span-5">
            <p className="font-display text-2xl leading-snug text-gold italic md:text-3xl">
              {h.tagline}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Departure board */}
          <div className="lg:col-span-7">
            <div className="flex items-end justify-between gap-4 border-b border-gold/30 pb-4">
              <h3 className="eyebrow text-gold">{h.marketsLabel}</h3>
              <span className="hidden eyebrow text-muted sm:block">{h.localTime}</span>
            </div>
            <ol>
              {h.countries.map((name, index) => {
                const market = hospiverseMarkets[index];
                const selected = country === String(index);
                return (
                  <motion.li
                    key={market?.code ?? name}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => pick(index)}
                      aria-pressed={selected}
                      className={cn(
                        "group relative flex w-full items-center gap-4 overflow-hidden border-b border-border py-4 text-left transition-colors md:gap-6 md:py-5",
                        selected ? "text-accent" : "text-foreground hover:text-accent",
                      )}
                    >
                      {/* gold sweep on hover / selection */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-0 -z-10 origin-left bg-gradient-to-r from-accent/15 via-accent/5 to-transparent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          selected ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                      <span className="w-8 font-display text-sm text-gold tabular-nums md:w-10 md:text-base">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-3xl leading-none font-semibold transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                        {name}
                      </span>
                      <span className="hidden rounded-md border border-gold/30 px-2 py-1 font-mono text-xs tracking-widest text-gold sm:inline-block">
                        {market?.code}
                      </span>
                      <span className="w-14 text-right font-mono text-sm text-muted tabular-nums md:w-16 md:text-base">
                        {now && market ? formatTime(now, market.timeZone) : "--:--"}
                      </span>
                      <ArrowUpRight
                        className="size-5 shrink-0 text-gold opacity-40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </button>
                  </motion.li>
                );
              })}
            </ol>
            <p className="mt-4 text-sm text-muted">{h.selectHint}</p>
          </div>

          {/* Enquiry form */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <form
                ref={formRef}
                onSubmit={onSubmit}
                className="scroll-mt-24 rounded-3xl border border-gold/25 bg-surface/80 p-6 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)] backdrop-blur-md md:p-8"
              >
                <h3 className="font-display text-3xl font-semibold md:text-4xl">
                  {h.formTitle}
                </h3>
                <p className="mt-3 text-foreground/70">{h.formNote}</p>

                <div className="mt-7 grid gap-4">
                  <label className="block">
                    <span className={label}>{h.fields.name} *</span>
                    <input name="name" required autoComplete="name" className={field} />
                  </label>
                  <label className="block">
                    <span className={label}>{h.fields.country} *</span>
                    <select
                      name="country"
                      required
                      value={country}
                      onChange={(event) => setCountry(event.target.value)}
                      className={field}
                    >
                      <option value="" disabled>
                        {lead.fields.choose}
                      </option>
                      {h.countries.map((name, index) => (
                        <option key={name} value={index}>
                          {name}
                        </option>
                      ))}
                      <option value={OTHER}>{h.otherCountry}</option>
                    </select>
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className={label}>{h.fields.email} *</span>
                      <input
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className={field}
                      />
                    </label>
                    <label className="block">
                      <span className={label}>{h.fields.phone} *</span>
                      <input
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        className={field}
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className={label}>{h.fields.businessType} *</span>
                    <select name="type" required defaultValue="" className={field}>
                      <option value="" disabled>
                        {lead.fields.choose}
                      </option>
                      {lead.fields.types.map((type, index) => (
                        <option key={type} value={index}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className={label}>{h.fields.plan} *</span>
                    <textarea
                      name="plan"
                      rows={4}
                      required
                      className={cn(field, "h-auto resize-y py-3")}
                    />
                  </label>
                </div>

                <Magnetic className="mt-7 block">
                  <button
                    type="submit"
                    className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-accent px-8 font-semibold text-accent-foreground shadow-[0_18px_40px_-14px_rgba(201,164,92,0.6)] transition-colors hover:bg-foreground"
                  >
                    {h.submit}
                    <Send
                      className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      aria-hidden="true"
                    />
                  </button>
                </Magnetic>
                <p className="mt-4 flex items-start gap-2 text-xs text-muted">
                  <Mail className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                  {lead.mailHint}
                </p>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Ticks once a minute; null until mounted so server and client markup match. */
function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = window.setInterval(tick, 30_000);
    return () => window.clearInterval(timer);
  }, []);
  return now;
}

function formatTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  }).format(date);
}

/** Slow orbit rings with a few travelling "planets" — the Hospiverse. */
function Orbits() {
  const rings = [
    { size: "38rem", duration: "70s", dot: "size-2" },
    { size: "56rem", duration: "110s", dot: "size-1.5" },
    { size: "76rem", duration: "160s", dot: "size-2.5" },
  ];
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-[12%] -right-[28rem] md:-right-[22rem]"
    >
      <div className="absolute size-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(201,164,92,0.14),transparent)]" />
      {rings.map((ring) => (
        <div
          key={ring.size}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15 motion-safe:animate-[spin_var(--d)_linear_infinite]"
          style={{
            width: ring.size,
            height: ring.size,
            ["--d" as string]: ring.duration,
          }}
        >
          <span
            className={cn(
              "absolute top-1/2 -left-1 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_14px_3px_rgba(220,192,138,0.55)]",
              ring.dot,
            )}
          />
        </div>
      ))}
    </div>
  );
}
