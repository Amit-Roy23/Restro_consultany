import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-foreground hover:bg-foreground",
  outline:
    "border border-foreground/20 bg-foreground/[0.04] text-foreground backdrop-blur-md hover:border-accent hover:text-accent",
  ghost: "text-foreground hover:text-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

type StyleProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = StyleProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof StyleProps> & { href: string };

type ButtonAsButton = StyleProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof StyleProps> & { href?: undefined };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: Omit<StyleProps, "children">) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  const classes = buttonVariants({ variant, size, className });

  if (props.href !== undefined) {
    return <Link className={classes} {...(props as ButtonAsLink)} />;
  }

  const { type = "button", ...rest } = props as ButtonAsButton;
  return <button type={type} className={classes} {...rest} />;
}
