import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/site/logo";
import { QuoteButton } from "@/components/site/contact-actions";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { business, telLink } from "@/config/business";
import { companyNav, removalsNav, supportNav } from "@/config/navigation";
import { path } from "@/lib/paths";
import { cn } from "@/lib/utils";

function DesktopDropdown({
  label,
  links,
}: {
  label: string;
  links: { label: string; to: string }[];
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="inline-flex h-10 items-center gap-1 whitespace-nowrap rounded-lg px-3 text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground group-focus-within:text-foreground"
      >
        {label}
        <ChevronDown className="size-4 transition-transform group-hover:rotate-180" aria-hidden />
      </button>
      <div className="invisible absolute left-0 top-full z-50 w-72 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul className="overflow-hidden rounded-2xl border border-border bg-popover p-2 shadow-xl">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={path(link.to)}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-popover-foreground transition-colors hover:bg-accent"
                activeProps={{ className: "bg-accent" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);

  const group = (title: string, links: { label: string; to: string }[]) => (
    <div>
      <p className="px-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </p>
      <ul className="mt-2 space-y-0.5">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={path(link.to)}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors hover:bg-accent"
              activeProps={{ className: "bg-accent" }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="inline-flex size-11 items-center justify-center rounded-xl border border-border md:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" aria-hidden />
      </SheetTrigger>
      <SheetContent side="right" className="w-[88vw] max-w-sm overflow-y-auto p-6">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <Logo />
        <div className="mt-8 space-y-7 pb-28">
          {group("Removals", removalsNav)}
          {group("Moving support", supportNav)}
          {group("Company", companyNav)}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-0.5 md:flex">
          <DesktopDropdown label="Removals" links={removalsNav} />
          <DesktopDropdown label="Moving Support" links={supportNav} />
          <Link
            to="/areas-we-cover"
            className="inline-flex h-10 items-center whitespace-nowrap rounded-lg px-3 text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Areas
          </Link>
          <Link
            to="/about"
            className="inline-flex h-10 items-center whitespace-nowrap rounded-lg px-3 text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            About
          </Link>
          <Link
            to="/reviews"
            className="inline-flex h-10 items-center whitespace-nowrap rounded-lg px-3 text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Reviews
          </Link>
          <Link
            to="/contact"
            className="inline-flex h-10 items-center whitespace-nowrap rounded-lg px-3 text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telLink(business.primaryPhoneTel)}
            className={cn(
              "hidden items-center gap-2 whitespace-nowrap rounded-xl border border-border px-3.5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent lg:inline-flex",
            )}
          >
            <Phone className="size-4 text-highlight-foreground" aria-hidden />
            <span className="tabular-nums">{business.primaryPhoneDisplay}</span>
          </a>
          <a
            href={telLink(business.primaryPhoneTel)}
            aria-label={`Call TTT on ${business.primaryPhoneDisplay}`}
            className="inline-flex size-11 items-center justify-center rounded-xl border border-border md:hidden"
          >
            <Phone className="size-5" aria-hidden />
          </a>
          <QuoteButton size="sm" className="hidden sm:inline-flex" />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
