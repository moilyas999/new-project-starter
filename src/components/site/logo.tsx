import { Link } from "@tanstack/react-router";

import { business } from "@/config/business";
import { cn } from "@/lib/utils";

/**
 * The TTT lockup: "TTT" is the primary brand, "Total Transport Team" supports it.
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
      aria-label={`${business.brandName} — ${business.brandExpanded} home`}
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span
        aria-hidden
        className={cn(
          "grid size-11 shrink-0 place-items-center rounded-xl text-[15px] font-black tracking-[-0.06em] shadow-sm transition-transform group-hover:-translate-y-0.5",
          tone === "inverted"
            ? "bg-highlight text-highlight-foreground"
            : "bg-primary text-primary-foreground",
        )}
      >
        TTT
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "whitespace-nowrap text-xl font-extrabold tracking-tight",
            tone === "inverted" ? "text-ink-foreground" : "text-foreground",
          )}
        >
          {business.brandName}
        </span>
        <span
          className={cn(
            "mt-1 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.18em]",
            tone === "inverted" ? "text-ink-foreground/70" : "text-muted-foreground",
          )}
        >
          {business.brandExpanded}
        </span>
      </span>
    </Link>
  );
}
