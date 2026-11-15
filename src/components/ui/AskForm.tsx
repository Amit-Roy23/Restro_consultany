import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";

type AskFormProps = {
  placeholder: string;
  submitLabel: string;
  /** Used to build a unique id for the input/label pair. */
  id: string;
  size?: "md" | "lg";
  className?: string;
};

/**
 * Pill-shaped question box. There is no backend yet, so it submits the
 * question to the contact page as `?q=…` (GET), where it can prefill a form.
 */
export function AskForm({
  placeholder,
  submitLabel,
  id,
  size = "md",
  className,
}: AskFormProps) {
  const inputId = `ask-${id}`;
  return (
    <form
      action="/contact"
      method="get"
      role="search"
      className={cn(
        "flex w-full items-center gap-2 rounded-full bg-foreground p-1.5 pl-6 text-background shadow-[0_0_0_1px_rgba(201,161,91,0.35),0_10px_40px_-10px_rgba(201,161,91,0.45)]",
        className,
      )}
    >
      <label htmlFor={inputId} className="sr-only">
        {placeholder}
      </label>
      <input
        id={inputId}
        name="q"
        type="text"
        autoComplete="off"
        placeholder={placeholder}
        className={cn(
          "min-w-0 flex-1 bg-transparent text-background placeholder:text-background/55 focus:outline-none",
          size === "lg" ? "h-12 text-base" : "h-10 text-sm",
        )}
      />
      <button
        type="submit"
        aria-label={submitLabel}
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-colors hover:bg-background hover:text-foreground",
          size === "lg" ? "size-12" : "size-10",
        )}
      >
        <ArrowUp className="size-5" aria-hidden="true" />
      </button>
    </form>
  );
}
