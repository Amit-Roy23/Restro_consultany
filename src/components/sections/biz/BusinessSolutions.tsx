"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChartNoAxesCombined,
  CookingPot,
  Crown,
  Gem,
  Handshake,
  Landmark,
  type LucideIcon,
  Mail,
  MessageCircle,
  Refrigerator,
  Rocket,
  ShoppingBag,
  Store,
} from "lucide-react";
import { type FormEvent, useRef, useState } from "react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { siteConfig } from "@/config/site";
import { useContent } from "@/i18n/LanguageProvider";
import { en } from "@/i18n/messages/en";
import { cn } from "@/lib/utils";

/** English copy for what the team receives, whatever the site language. */
const EN = en.biz.solutions;

/** Icon and colour tint per category, in the order of the messages. */
const CATEGORY_STYLE: { icon: LucideIcon; tint: string }[] = [
  { icon: ChartNoAxesCombined, tint: "from-rose-400/25 to-orange-300/10 text-rose-300" },
  { icon: Handshake, tint: "from-sky-400/25 to-cyan-300/10 text-sky-300" },
  { icon: Store, tint: "from-amber-400/25 to-yellow-300/10 text-amber-300" },
  { icon: ShoppingBag, tint: "from-emerald-400/25 to-teal-300/10 text-emerald-300" },
  { icon: CookingPot, tint: "from-orange-400/25 to-red-300/10 text-orange-300" },
  { icon: Refrigerator, tint: "from-indigo-400/25 to-violet-300/10 text-indigo-300" },
  { icon: Landmark, tint: "from-yellow-300/25 to-amber-200/10 text-gold" },
];

const PLAN_ICONS: LucideIcon[] = [Rocket, Gem, Crown];

/** wa.me link for the Buy & Sell helpline, with an optional pre-filled message. */
function whatsappLink(text?: string) {
  const digits = siteConfig.contact.businessWhatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

/**
 * Restaurant Business Solutions — Buy & Sell: seven categories with icons,
 * subscription plans, and a short enquiry form with a WhatsApp helpline.
 * Choosing a category (or plan) carries it into the enquiry.
 */
export function BusinessSolutions() {
  const { biz } = useContent();
  const { solutions: s, lead } = biz;
  const [category, setCategory] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const phone = siteConfig.contact.businessWhatsapp;

  const choose = (index: number) => {
    setCategory(String(index));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim() || "—";
    const categoryName = EN.categories[Number(data.get("category"))]?.title ?? "—";
    const lines = [
      `${EN.fields.category}: ${categoryName}`,
      `${EN.fields.name}: ${get("name")}`,
      `${EN.fields.phone}: ${get("phone")}`,
      `${EN.fields.email}: ${get("email")}`,
      `${EN.fields.city}: ${get("city")}`,
      `${EN.fields.business}: ${get("business")}`,
      `${EN.fields.budget}: ${get("budget")}`,
      `${EN.fields.requirements}: ${get("requirements")}`,
    ];
    const via = (event.nativeEvent as SubmitEvent).submitter?.getAttribute("value");

    if (via === "whatsapp") {
      window.open(
        whatsappLink(`Hello Resto, I have a Buy & Sell enquiry.\n\n${lines.join("\n")}`),
        "_blank",
        "noopener",
      );
      return;
    }
    const link = document.createElement("a");
    link.href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
      `Buy & Sell enquiry — ${categoryName} — ${get("name")}`,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    link.click();
  };

  const field =
    "mt-1.5 h-12 w-full rounded-xl border border-foreground/15 bg-background/70 px-4 text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none";
  const label = "text-sm text-foreground/80";

  return (
    <>
      {/* ------------------------------------------------------------ */}
      {/* Categories                                                    */}
      {/* ------------------------------------------------------------ */}
      <section
        id="categories"
        aria-labelledby="categories-heading"
        className="grain relative bg-background py-20 md:py-28"
      >
        <Container>
          <SectionLabel>{s.label}</SectionLabel>
          <h2 id="categories-heading" className="mt-5 text-4xl md:text-6xl">
            {s.categoriesLabel}
          </h2>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.categories.map((item, index) => {
              const style = CATEGORY_STYLE[index]!;
              const Icon = style.icon;
              const selected = category === String(index);
              return (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.7,
                    delay: (index % 4) * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <button
                    type="button"
                    onClick={() => choose(index)}
                    aria-pressed={selected}
                    className={cn(
                      "group relative flex h-full w-full flex-col gap-5 overflow-hidden rounded-2xl border bg-surface/70 p-6 text-left transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-24px_rgba(201,164,92,0.5)]",
                      selected ? "border-accent" : "border-border hover:border-accent/60",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -top-16 -right-16 size-40 rounded-full bg-gradient-to-br opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
                        style.tint,
                      )}
                    />
                    <span className="relative flex items-center justify-between">
                      <span
                        className={cn(
                          "grid size-14 place-items-center rounded-2xl border border-foreground/10 bg-gradient-to-br transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
                          style.tint,
                        )}
                      >
                        <Icon className="size-7" aria-hidden="true" />
                      </span>
                      <span className="font-display text-2xl text-foreground/25">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </span>
                    <span className="relative flex flex-1 flex-col gap-2">
                      <span className="font-display text-xl leading-snug font-semibold text-foreground md:text-2xl">
                        {item.title}
                      </span>
                      <span className="text-sm text-foreground/70">{item.body}</span>
                    </span>
                    <span className="relative inline-flex items-center gap-2 text-sm font-semibold text-accent">
                      {s.enquire}
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </motion.li>
              );
            })}

            {/* Eighth tile: straight to WhatsApp */}
            <motion.li
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={whatsappLink(
                  "Hello Resto, I'd like help with a restaurant business enquiry.",
                )}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col justify-between gap-5 rounded-2xl bg-accent p-6 text-accent-foreground transition-transform duration-500 hover:-translate-y-1.5"
              >
                <span className="grid size-14 place-items-center rounded-2xl bg-accent-foreground/10">
                  <MessageCircle className="size-7" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display text-xl leading-snug font-semibold md:text-2xl">
                    {s.whatsappTitle}
                  </span>
                  <span className="mt-2 block text-sm font-medium tabular-nums">
                    {phone}
                  </span>
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  {s.whatsappCta}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </motion.li>
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Plans                                                         */}
      {/* ------------------------------------------------------------ */}
      <section
        id="plans"
        aria-labelledby="plans-heading"
        className="bg-foreground py-20 text-background md:py-28"
      >
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionLabel tone="light">{s.plansLabel}</SectionLabel>
              <TextReveal
                id="plans-heading"
                text={s.plansTitle}
                className="mt-5 text-4xl md:text-6xl"
              />
            </div>
            <Reveal inView delay={0.1} className="lg:col-span-4 lg:col-start-9">
              <p className="text-lg text-ink-muted">{s.plansIntro}</p>
            </Reveal>
          </div>

          <ul className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-stretch">
            {s.plans.map((plan, index) => {
              const Icon = PLAN_ICONS[index] ?? Rocket;
              const featured = index === 1;
              return (
                <motion.li
                  key={plan.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={cn(featured && "lg:-my-4")}
                >
                  <article
                    className={cn(
                      "relative flex h-full flex-col gap-6 rounded-3xl p-7 md:p-8",
                      featured
                        ? "bg-background text-foreground shadow-[0_40px_80px_-30px_rgba(6,12,26,0.6)] ring-2 ring-accent"
                        : "border border-background/10 bg-paper",
                    )}
                  >
                    {featured && (
                      <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                        {s.popular}
                      </span>
                    )}
                    <span
                      className={cn(
                        "grid size-12 place-items-center rounded-xl",
                        featured
                          ? "bg-accent/15 text-accent"
                          : "bg-accent-deep/10 text-accent-deep",
                      )}
                    >
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-3xl font-semibold">{plan.name}</h3>
                      <p
                        className={cn(
                          "mt-1",
                          featured ? "text-foreground/70" : "text-ink-muted",
                        )}
                      >
                        {plan.tagline}
                      </p>
                    </div>
                    <p
                      className={cn(
                        "font-display text-2xl italic",
                        featured ? "text-accent" : "text-accent-deep",
                      )}
                    >
                      {s.priceOnRequest}
                    </p>
                    <ul className="flex flex-1 flex-col gap-3">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm md:text-base"
                        >
                          <Check
                            className={cn(
                              "mt-0.5 size-5 shrink-0",
                              featured ? "text-accent" : "text-accent-deep",
                            )}
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={whatsappLink(
                        `Hello Resto, I'd like the price for the ${EN.plans[index]?.name ?? plan.name} plan (Buy & Sell).`,
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        "group inline-flex h-12 items-center justify-center gap-2 rounded-full font-semibold transition-colors",
                        featured
                          ? "bg-accent text-accent-foreground hover:bg-foreground hover:text-background"
                          : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <MessageCircle className="size-4" aria-hidden="true" />
                      {s.askPrice}
                    </a>
                  </article>
                </motion.li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Enquiry                                                       */}
      {/* ------------------------------------------------------------ */}
      <section
        id="enquiry"
        aria-labelledby="enquiry-heading"
        className="grain relative bg-background py-20 md:py-28"
      >
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel>{s.enquiryLabel}</SectionLabel>
            <h2 id="enquiry-heading" className="mt-5 text-4xl md:text-5xl">
              {s.enquiryTitle}
            </h2>
            <p className="mt-5 text-lg text-foreground/70">{s.enquiryIntro}</p>

            <a
              href={whatsappLink("Hello Resto, I have a Buy & Sell enquiry.")}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 flex items-center gap-5 rounded-3xl border border-[#25D366]/40 bg-[#25D366]/10 p-6 transition-colors hover:bg-[#25D366]/20"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#25D366] text-black">
                <MessageCircle className="size-7" aria-hidden="true" />
              </span>
              <span className="flex-1">
                <span className="block text-sm text-foreground/70">
                  {s.whatsappTitle}
                </span>
                <span className="block font-display text-2xl font-semibold tabular-nums">
                  {phone}
                </span>
              </span>
              <ArrowRight
                className="size-5 text-[#25D366] transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>

            <ol className="mt-8 flex flex-col gap-3">
              {s.steps.map((step, index) => (
                <li key={step} className="flex items-center gap-4">
                  <span className="grid size-9 place-items-center rounded-full border border-gold/40 font-display text-gold">
                    {index + 1}
                  </span>
                  <span className="text-foreground/85">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="scroll-mt-24 rounded-3xl border border-gold/25 bg-surface/80 p-6 md:p-8 lg:col-span-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className={label}>{s.fields.category} *</span>
                <select
                  name="category"
                  required
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className={field}
                >
                  <option value="" disabled>
                    {lead.fields.choose}
                  </option>
                  {s.categories.map((item, index) => (
                    <option key={item.title} value={index}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className={label}>{s.fields.name} *</span>
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label className="block">
                <span className={label}>{s.fields.phone} *</span>
                <input
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className={field}
                />
              </label>
              <label className="block">
                <span className={label}>{s.fields.email}</span>
                <input name="email" type="email" autoComplete="email" className={field} />
              </label>
              <label className="block">
                <span className={label}>{s.fields.city} *</span>
                <input
                  name="city"
                  required
                  autoComplete="address-level2"
                  className={field}
                />
              </label>
              <label className="block">
                <span className={label}>{s.fields.business}</span>
                <input name="business" className={field} />
              </label>
              <label className="block">
                <span className={label}>{s.fields.budget}</span>
                <input name="budget" className={field} />
              </label>
              <label className="block sm:col-span-2">
                <span className={label}>{s.fields.requirements} *</span>
                <textarea
                  name="requirements"
                  rows={4}
                  required
                  className={cn(field, "h-auto resize-y py-3")}
                />
              </label>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <button
                type="submit"
                value="whatsapp"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#25D366] font-semibold text-black transition-opacity hover:opacity-90"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                {s.whatsappCta}
              </button>
              <button
                type="submit"
                value="email"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-accent font-semibold text-accent-foreground transition-colors hover:bg-foreground"
              >
                <Mail className="size-5" aria-hidden="true" />
                {s.submit}
              </button>
            </div>
          </form>
        </Container>
      </section>
    </>
  );
}

/** Quick-jump links shown in the page header. */
export function SolutionsJumpLinks() {
  const { biz } = useContent();
  const { solutions: s } = biz;
  const links = [
    { href: "#categories", label: s.categoriesLabel },
    { href: "#plans", label: s.plansLabel },
    { href: "#enquiry", label: s.enquiryLabel },
  ];
  return (
    <Reveal delay={0.6}>
      <nav aria-label={s.label} className="mt-10 flex flex-wrap gap-3">
        {links.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            className={cn(
              "inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors",
              index === 0
                ? "bg-accent text-accent-foreground hover:bg-foreground"
                : "border border-foreground/20 hover:border-accent hover:text-accent",
            )}
          >
            {link.label}
            <ArrowRight className="size-4 rotate-90" aria-hidden="true" />
          </a>
        ))}
      </nav>
    </Reveal>
  );
}
