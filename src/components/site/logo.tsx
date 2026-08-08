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
      className={cn("group inline-flex min-w-0 items-center gap-2.5 sm:gap-3", className)}
    >
      <span
        aria-hidden
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-xl text-sm font-black tracking-[-0.06em] shadow-sm transition-transform motion-safe:group-hover:-translate-y-0.5 sm:size-11 sm:text-[15px]",
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
            "whitespace-nowrap text-lg font-extrabold tracking-tight sm:text-xl",
            tone === "inverted" ? "text-ink-foreground" : "text-foreground",
          )}
        >
          {business.brandName}
        </span>
        <span
          className={cn(
            "mt-1 hidden whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.14em] min-[360px]:block sm:text-[10px] sm:tracking-[0.18em]",
            tone === "inverted" ? "text-ink-foreground/70" : "text-muted-foreground",
          )}
        >
          {business.brandExpanded}
        </span>
      </span>
    </Link>
  );
}
