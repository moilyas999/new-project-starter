import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";

import { business, mailtoLink, telLink, whatsappLink } from "@/config/business";
import { cn } from "@/lib/utils";

/**
 * The three primary contact actions used across the whole site:
 * Get a Free Quote / Call TTT / WhatsApp TTT.
 *
 * The WhatsApp action renders only when a WhatsApp number is configured, so
 * nothing dead-links if the business doesn't offer it.
 */

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50";

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-[15px]",
  lg: "h-14 px-7 text-base",
} as const;

type Size = keyof typeof sizes;

export function QuoteButton({
  size = "md",
  className,
  label = "Get a Free Quote",
}: {
  size?: Size;
  className?: string;
  label?: string;
}) {
  return (
    <Link
      to="/quote"
      className={cn(
        base,
        sizes[size],
        "bg-highlight text-highlight-foreground shadow-sm hover:brightness-105 hover:shadow-md active:translate-y-px",
        className,
      )}
    >
      {label}
      <ArrowRight className="size-4" aria-hidden />
    </Link>
  );
}

export function CallButton({
  size = "md",
  className,
  variant = "solid",
  showNumber = false,
}: {
  size?: Size;
  className?: string;
  variant?: "solid" | "outline" | "inverted";
  showNumber?: boolean;
}) {
  return (
    <a
      href={telLink(business.primaryPhoneTel)}
      className={cn(
        base,
        sizes[size],
        variant === "solid" && "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        variant === "outline" && "border border-input bg-background hover:bg-accent",
        variant === "inverted" &&
          "border border-ink-foreground/25 bg-ink-foreground/10 text-ink-foreground hover:bg-ink-foreground/20",
        className,
      )}
    >
      <Phone className="size-4" aria-hidden />
      {showNumber ? business.primaryPhoneDisplay : "Call TTT"}
    </a>
  );
}

export function WhatsAppButton({
  size = "md",
  className,
  variant = "outline",
}: {
  size?: Size;
  className?: string;
  variant?: "solid" | "outline" | "inverted";
}) {
  if (!whatsappLink) return null;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        base,
        sizes[size],
        variant === "solid" && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "outline" && "border border-input bg-background hover:bg-accent",
        variant === "inverted" &&
          "border border-ink-foreground/25 bg-ink-foreground/10 text-ink-foreground hover:bg-ink-foreground/20",
        className,
      )}
    >
      <MessageCircle className="size-4" aria-hidden />
      WhatsApp TTT
    </a>
  );
}

export function EmailButton({
  size = "md",
  className,
  variant = "outline",
}: {
  size?: Size;
  className?: string;
  variant?: "solid" | "outline" | "inverted";
}) {
  return (
    <a
      href={mailtoLink}
      className={cn(
        base,
        sizes[size],
        variant === "solid" && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "outline" && "border border-input bg-background hover:bg-accent",
        variant === "inverted" &&
          "border border-ink-foreground/25 bg-ink-foreground/10 text-ink-foreground hover:bg-ink-foreground/20",
        className,
      )}
    >
      <Mail className="size-4" aria-hidden />
      Email TTT
    </a>
  );
}

/**
 * Quote + Call + WhatsApp — the standard CTA cluster.
 *
 * On phones the quote button goes full width and Call/WhatsApp sit side by side
 * underneath it, so every action is a comfortable thumb target. From `sm` up the
 * wrapper collapses (`sm:contents`) and all three sit in one row.
 */
export function ContactActions({
  size = "md",
  className,
  inverted = false,
}: {
  size?: Size;
  className?: string;
  inverted?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3",
        className,
      )}
    >
      <QuoteButton size={size} className="w-full sm:w-auto" />
      <div className={cn("grid gap-2.5 sm:contents", whatsappLink ? "grid-cols-2" : "grid-cols-1")}>
        <CallButton size={size} variant={inverted ? "inverted" : "outline"} />
        <WhatsAppButton size={size} variant={inverted ? "inverted" : "outline"} />
      </div>
    </div>
  );
}
