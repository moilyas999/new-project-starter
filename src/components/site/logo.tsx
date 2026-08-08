import { Link } from "@tanstack/react-router";
import { House } from "lucide-react";

import { business } from "@/config/business";
import { cn } from "@/lib/utils";

/**
 * The House Moving Experts lockup: a house mark plus the name set on two tight
 * lines.
 *
 * The two-line wordmark is structural, not decorative — "House Moving Experts"
 * on one line does not fit a 320px header alongside the phone and menu buttons.
 * Stacking keeps the full name legible at every width instead of shrinking it
 * or abbreviating a brand whose whole value is that it says what the business
 * does.
 */
export function Logo({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "inverted";
}) {
  return (
    <Link
      to="/"
      aria-label={`${business.brandName} home`}
      className={cn("group inline-flex shrink-0 items-center gap-2.5 sm:gap-3", className)}
    >
      <span
        aria-hidden
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-xl shadow-sm transition-transform motion-safe:group-hover:-translate-y-0.5 sm:size-11",
          tone === "inverted"
            ? "bg-highlight text-highlight-foreground"
            : "bg-primary text-primary-foreground",
        )}
      >
        <House className="size-5" strokeWidth={2.25} />
      </span>
      <span
        className={cn(
          // Steps down at the very narrowest widths so the wordmark keeps clear
          // air between itself and the phone/menu buttons on a 320px screen.
          "flex flex-col whitespace-nowrap text-[13px] font-extrabold uppercase leading-[1.1] tracking-[0.005em] min-[360px]:text-[15px] sm:text-base",
          tone === "inverted" ? "text-ink-foreground" : "text-foreground",
        )}
      >
        <span>{business.brandLine1}</span>
        <span className={tone === "inverted" ? "text-highlight" : "text-highlight-foreground"}>
          {business.brandLine2}
        </span>
      </span>
    </Link>
  );
}
