"use client";

import { Mail, MessageCircle, Phone, Send, Sparkles, X } from "lucide-react";
import { type FormEvent, type RefObject, useEffect, useId } from "react";

import { siteConfig } from "@/config/site";
import { useContent, useLanguage } from "@/i18n/LanguageProvider";
import { languages } from "@/i18n/languages";
import { en } from "@/i18n/messages/en";
import { getLenis } from "@/lib/smoothScroll";
import { cn } from "@/lib/utils";

export type LeadMode = "project" | "consult";

/** English labels for the email the team receives, whatever the site language. */
const MAIL = en.biz.lead.fields;

/**
 * "Start your project" / "Free consultation" request form in a native modal
 * dialog (focus trap, Escape to close, top layer above everything).
 *
 * There is no backend yet: sending opens the visitor's email app with the
 * details filled in. When `siteConfig.contact.phone` is set, WhatsApp and
 * call buttons appear for a direct conversation.
 */
export function LeadDialog({
  dialogRef,
  mode,
}: {
  dialogRef: RefObject<HTMLDialogElement | null>;
  mode: LeadMode;
}) {
  const { biz } = useContent();
  const { lang } = useLanguage();
  const { lead } = biz;
  const id = useId();
  const phone = siteConfig.contact.phone.replace(/[^\d+]/g, "");
  const copy = mode === "project" ? lead.project : lead.consult;

  // Pause smooth scrolling while the dialog is open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => getLenis()?.start();
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, [dialogRef]);

  const close = () => dialogRef.current?.close();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim() || "—";
    const pick = (key: string, english: string[]) => {
      const index = Number(data.get(key));
      return Number.isInteger(index) && english[index] ? english[index] : "—";
    };
    const language =
      languages.find((item) => item.code === data.get("language"))?.english ?? "—";

    const lines =
      mode === "project"
        ? [
            `${MAIL.name}: ${get("name")}`,
            `${MAIL.phone}: ${get("phone")}`,
            `${MAIL.email}: ${get("email")}`,
            `${MAIL.city}: ${get("city")}`,
            `${MAIL.projectType}: ${pick("type", MAIL.types)}`,
            `${MAIL.budget}: ${get("budget")}`,
            `${MAIL.language}: ${language}`,
            "",
            `${MAIL.idea}:`,
            get("idea"),
          ]
        : [
            `${MAIL.name}: ${get("name")}`,
            `${MAIL.phone}: ${get("phone")}`,
            `${MAIL.email}: ${get("email")}`,
            `${MAIL.city}: ${get("city")}`,
            `${MAIL.language}: ${language}`,
            `${MAIL.time}: ${pick("time", MAIL.times)}`,
            "",
            `${MAIL.idea}:`,
            get("idea"),
          ];
    const subject =
      mode === "project"
        ? `New project — ${pick("type", MAIL.types)} — ${get("name")}`
        : `Free consultation request — ${get("name")} (${language})`;

    const link = document.createElement("a");
    link.href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    link.click();
  };

  const field =
    "mt-1.5 h-12 w-full rounded-xl border border-foreground/15 bg-background/60 px-4 text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none";
  const label = "text-sm text-foreground/80";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${id}-title`}
      data-lenis-prevent
      onClick={(event) => {
        // A click on the backdrop (the dialog element itself) closes it.
        if (event.target === event.currentTarget) close();
      }}
      className="lead-dialog m-auto max-h-[92svh] w-[min(42rem,calc(100vw-1.5rem))] overflow-y-auto overscroll-contain rounded-3xl border border-gold/30 bg-surface p-0 text-foreground shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-6 md:p-10">
        <button
          type="button"
          onClick={close}
          aria-label={lead.close}
          className="absolute top-4 right-4 grid size-10 place-items-center rounded-full border border-foreground/15 text-foreground/70 transition-colors hover:border-accent hover:text-accent"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        {mode === "consult" && (
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {lead.consult.badge}
          </p>
        )}
        <h2
          id={`${id}-title`}
          className="mt-4 pr-10 font-display text-3xl font-semibold md:text-4xl"
        >
          {copy.title}
        </h2>
        <p className="mt-3 text-foreground/70">{copy.intro}</p>

        {phone && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={`https://wa.me/${phone.replace(/^\+/, "")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] font-medium text-black transition-opacity hover:opacity-90"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              {lead.whatsapp}
            </a>
            <a
              href={`tel:${phone}`}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-foreground/20 font-medium transition-colors hover:border-accent hover:text-accent"
            >
              <Phone className="size-5" aria-hidden="true" />
              {lead.call}
            </a>
          </div>
        )}

        <form
          // Re-mount per mode/language so selects reset to sensible defaults.
          key={`${mode}-${lang}`}
          onSubmit={onSubmit}
          className="mt-8 grid gap-4 md:grid-cols-2"
        >
          <label className="block">
            <span className={label}>{lead.fields.name} *</span>
            <input name="name" required autoComplete="name" className={field} />
          </label>
          <label className="block">
            <span className={label}>{lead.fields.phone} *</span>
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className={field}
            />
          </label>
          <label className="block">
            <span className={label}>
              {lead.fields.email}
              {mode === "project" && " *"}
            </span>
            <input
              name="email"
              type="email"
              required={mode === "project"}
              autoComplete="email"
              className={field}
            />
          </label>
          <label className="block">
            <span className={label}>
              {lead.fields.city}
              {mode === "project" && " *"}
            </span>
            <input
              name="city"
              required={mode === "project"}
              autoComplete="address-level2"
              className={field}
            />
          </label>

          {mode === "project" && (
            <>
              <label className="block">
                <span className={label}>{lead.fields.projectType} *</span>
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
                <span className={label}>{lead.fields.budget}</span>
                <input name="budget" className={field} />
              </label>
            </>
          )}

          <label className={cn("block", mode === "project" && "md:col-span-2")}>
            <span className={label}>{lead.fields.language} *</span>
            <select name="language" required defaultValue={lang} className={field}>
              {languages.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.native === language.english
                    ? language.native
                    : `${language.native} — ${language.english}`}
                </option>
              ))}
            </select>
          </label>

          {mode === "consult" && (
            <fieldset>
              <legend className={label}>{lead.fields.time}</legend>
              <div className="mt-1.5 grid h-12 grid-cols-3 gap-1 rounded-xl border border-foreground/15 bg-background/60 p-1">
                {lead.fields.times.map((time, index) => (
                  <label
                    key={time}
                    className="grid cursor-pointer place-items-center rounded-lg px-1 text-center text-xs leading-tight text-foreground/70 transition-colors has-[:checked]:bg-accent has-[:checked]:text-accent-foreground has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent sm:text-sm"
                  >
                    <input
                      type="radio"
                      name="time"
                      value={index}
                      defaultChecked={index === 0}
                      className="sr-only"
                    />
                    {time}
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <label className="block md:col-span-2">
            <span className={label}>
              {lead.fields.idea}
              {mode === "consult" && " *"}
            </span>
            <textarea
              name="idea"
              rows={4}
              required={mode === "consult"}
              className={cn(field, "h-auto resize-y py-3")}
            />
          </label>

          <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
            <p className="flex items-start gap-2 text-sm text-muted md:max-w-xs">
              <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {lead.mailHint}
            </p>
            <button
              type="submit"
              className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-accent px-8 font-semibold text-accent-foreground transition-colors hover:bg-foreground"
            >
              {lead.submit}
              <Send
                className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

/** Open a lead dialog and hold page scrolling while it is up. */
export function openLeadDialog(dialog: HTMLDialogElement | null) {
  if (!dialog) return;
  getLenis()?.stop();
  dialog.showModal();
}
