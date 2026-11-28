"use client";

import { motion } from "framer-motion";
import { Check, Mail, Send, ShoppingBag, Tag } from "lucide-react";
import { type FormEvent, useId, useRef, useState } from "react";

import { Container } from "@/components/ui/Container";
import { KineticWords } from "@/components/ui/KineticWords";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { siteConfig } from "@/config/site";
import { useContent } from "@/i18n/LanguageProvider";
import { en } from "@/i18n/messages/en";
import { cn } from "@/lib/utils";

type InquiryType = "buy" | "sell";

/** Field names → English labels used in the email the team receives. */
const MAIL_LABELS = en.biz.buySell.form;

/**
 * Restaurant & café buying and selling, with the inquiry form.
 * There is no backend yet: submitting opens the visitor's email app with a
 * pre-filled message to the official inquiry address.
 */
export function BuySellSection() {
  const { biz } = useContent();
  const { buySell: b } = biz;
  const formRef = useRef<HTMLFormElement>(null);
  const [type, setType] = useState<InquiryType>("buy");
  const id = useId();
  const email = siteConfig.contact.email;

  const choose = (next: InquiryType) => {
    setType(next);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const typeLabel = type === "buy" ? MAIL_LABELS.typeBuy : MAIL_LABELS.typeSell;
    const lines = [
      `${MAIL_LABELS.type}: ${typeLabel.toUpperCase()}`,
      `${MAIL_LABELS.fullName}: ${get("name")}`,
      `${MAIL_LABELS.phone}: ${get("phone")}`,
      `${MAIL_LABELS.email}: ${get("email")}`,
      `${MAIL_LABELS.category}: ${get("category")}`,
      `${MAIL_LABELS.businessName}: ${get("business") || "—"}`,
      `${MAIL_LABELS.city}: ${get("city")}`,
      `${type === "buy" ? MAIL_LABELS.budgetBuy : MAIL_LABELS.budgetSell}: ${get("budget")}`,
      "",
      `${MAIL_LABELS.notes}:`,
      get("notes") || "—",
    ];
    const subject = `${typeLabel.toUpperCase()} inquiry — ${get("category")} — ${get("name")}`;
    const link = document.createElement("a");
    link.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    link.click();
  };

  const field =
    "mt-2 h-12 w-full rounded-xl border border-background/15 bg-white px-4 text-background placeholder:text-ink-muted/60 transition-colors focus:border-accent-deep focus:outline-none";
  const label = "text-sm font-medium text-background";

  return (
    <section
      id="buy-sell"
      aria-labelledby="buy-sell-heading"
      className="scroll-mt-6 bg-foreground py-24 text-background md:py-32"
    >
      <Container>
        <SectionLabel tone="light">{b.label}</SectionLabel>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <TextReveal
            id="buy-sell-heading"
            text={b.title}
            className="text-5xl md:text-8xl"
          />
          <KineticWords
            words={b.verbs}
            className="text-3xl text-background/40 md:text-5xl"
            activeClassName="text-accent-deep"
          />
        </div>
        <div className="mt-10 grid gap-6 text-lg text-ink-muted lg:grid-cols-2">
          <Reveal inView>
            <p>{b.intro}</p>
          </Reveal>
          <Reveal inView delay={0.1}>
            <p>{b.intro2}</p>
          </Reveal>
        </div>

        {/* Buy / Sell choice cards */}
        <div
          className="mt-14 grid gap-4 md:grid-cols-2"
          role="radiogroup"
          aria-label={b.form.type}
        >
          {(["buy", "sell"] as const).map((option, index) => {
            const selected = type === option;
            const Icon = option === "buy" ? ShoppingBag : Tag;
            const copy = b.options[index]!;
            return (
              <motion.button
                key={option}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => choose(option)}
                whileHover={{ y: -4 }}
                className={cn(
                  "relative flex flex-col gap-4 rounded-3xl border-2 p-8 text-left transition-colors duration-300",
                  selected
                    ? "border-accent-deep bg-background text-foreground"
                    : "border-background/10 bg-paper hover:border-accent-deep/50",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm text-accent">{index + 1}.</span>
                  <span
                    className={cn(
                      "grid size-7 place-items-center rounded-full border transition-colors",
                      selected
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-background/20",
                    )}
                  >
                    {selected && <Check className="size-4" aria-hidden="true" />}
                  </span>
                </div>
                <Icon
                  className={cn("size-9", selected ? "text-accent" : "text-accent-deep")}
                  aria-hidden="true"
                />
                <h3 className="font-sans text-2xl font-bold tracking-tight uppercase md:text-3xl">
                  {copy.title}
                </h3>
                <p className={selected ? "text-foreground/75" : "text-ink-muted"}>
                  {copy.body}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Inquiry form */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="scroll-mt-28 rounded-3xl bg-paper p-6 shadow-[0_30px_80px_-40px_rgba(6,12,26,0.5)] md:p-10 lg:col-span-8"
          >
            <h3 className="text-3xl md:text-4xl">{b.formTitle}</h3>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className={label}>{b.form.fullName} *</span>
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label className="block">
                <span className={label}>{b.form.phone} *</span>
                <input
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className={field}
                />
              </label>
              <label className="block">
                <span className={label}>{b.form.email} *</span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={field}
                />
              </label>
              <fieldset>
                <legend className={label}>{b.form.type} *</legend>
                <div className="mt-2 grid h-12 grid-cols-2 rounded-xl border border-background/15 bg-white p-1">
                  {(["buy", "sell"] as const).map((option) => (
                    <label
                      key={option}
                      className={cn(
                        "grid cursor-pointer place-items-center rounded-lg text-sm font-semibold uppercase transition-colors",
                        type === option
                          ? "bg-background text-foreground"
                          : "text-ink-muted hover:text-background",
                      )}
                    >
                      <input
                        type="radio"
                        name={`${id}-type`}
                        value={option}
                        checked={type === option}
                        onChange={() => setType(option)}
                        className="sr-only"
                      />
                      {option === "buy" ? b.form.typeBuy : b.form.typeSell}
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="block">
                <span className={label}>{b.form.category} *</span>
                <select name="category" required defaultValue="" className={field}>
                  <option value="" disabled>
                    {b.form.choose}
                  </option>
                  {b.form.categories.map((category, index) => (
                    <option
                      key={category}
                      value={MAIL_LABELS.categories[index] ?? category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className={label}>{b.form.businessName}</span>
                <input name="business" className={field} />
              </label>
              <label className="block">
                <span className={label}>{b.form.city} *</span>
                <input
                  name="city"
                  required
                  autoComplete="address-level2"
                  className={field}
                />
              </label>
              <label className="block">
                <span className={label}>
                  {type === "buy" ? b.form.budgetBuy : b.form.budgetSell} *
                </span>
                <input name="budget" required inputMode="text" className={field} />
              </label>
              <label className="block md:col-span-2">
                <span className={label}>{b.form.notes}</span>
                <textarea
                  name="notes"
                  rows={4}
                  className={cn(field, "h-auto resize-y py-3")}
                />
              </label>
            </div>
            <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="max-w-sm text-sm text-ink-muted">{b.form.mailHint}</p>
              <Magnetic>
                <button
                  type="submit"
                  className="group inline-flex h-14 items-center gap-3 rounded-full bg-background px-8 font-semibold tracking-wide text-foreground uppercase transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {b.form.submit}
                  <Send
                    className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                </button>
              </Magnetic>
            </div>
          </form>

          <aside className="flex flex-col gap-6 lg:col-span-4">
            <div className="rounded-3xl bg-background p-8 text-foreground">
              <p className="eyebrow text-muted">{b.emailLabel}</p>
              <p className="mt-4 font-display text-2xl font-semibold">
                {siteConfig.name}
              </p>
              <a
                href={`mailto:${email}`}
                className="mt-3 inline-flex items-start gap-2 break-all text-accent hover:underline"
              >
                <Mail className="mt-1 size-4 shrink-0" aria-hidden="true" />
                {email}
              </a>
              <p className="mt-6 text-sm text-foreground/70">{b.reviewNote}</p>
            </div>
            <p className="font-display text-2xl leading-snug italic">
              {siteConfig.name} — {b.footer}
            </p>
          </aside>
        </div>
      </Container>
    </section>
  );
}
