import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Clock, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import { QuoteButton } from "@/components/site/contact-actions";
import { Logo } from "@/components/site/logo";
import { business, mailtoLink, telLink, whatsappLink } from "@/config/business";
import { companyNav, removalsNav, supportNav } from "@/config/navigation";
import { path } from "@/lib/paths";
import { cn } from "@/lib/utils";

const navLinkClass =
  "inline-flex h-10 items-center whitespace-nowrap rounded-lg px-2.5 text-sm font-semibold text-foreground/75 transition-colors hover:text-foreground xl:px-3";

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
        className={cn(navLinkClass, "gap-1 group-focus-within:text-foreground")}
      >
        {label}
        <ChevronDown
          className="size-4 transition-transform duration-200 group-hover:rotate-180"
          aria-hidden
        />
      </button>
      <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <ul className="overflow-hidden rounded-2xl border border-border bg-popover p-2 shadow-[0_20px_50px_-20px_oklch(0_0_0/0.35)]">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={path(link.to)}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-popover-foreground transition-colors hover:bg-accent"
                activeProps={{ className: "bg-accent", "aria-current": "page" }}
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

/**
 * Full-screen mobile navigation.
 *
 * Hand-rolled rather than a dialog component so it can use `100dvh` (correct
 * with mobile browser chrome), keep the page's scroll position, and put the
 * primary actions within thumb reach at the bottom.
 */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const group = (title: string, links: { label: string; to: string }[]) => (
    <div>
      <p className="px-1 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </p>
      <ul className="mt-2">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={path(link.to)}
              onClick={onClose}
              className="flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium transition-colors active:bg-accent"
              activeProps={{ className: "bg-accent", "aria-current": "page" }}
            >
              {link.label}
              <ArrowRight className="size-4 opacity-30" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div
      id="mobile-menu"
      hidden={!open}
      className="fixed inset-0 z-50 flex h-[100dvh] flex-col bg-background xl:hidden"
    >
      <div className="flex h-18 shrink-0 items-center justify-between border-b border-border px-5">
        <Logo />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex size-11 items-center justify-center rounded-xl border border-border"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>

      <nav
        aria-label="Mobile"
        className="flex-1 space-y-7 overflow-y-auto overscroll-contain px-4 py-6"
      >
        {group("Removals", removalsNav)}
        {group("Moving support", supportNav)}
        {group("Company", companyNav)}
      </nav>

      <div className="shrink-0 space-y-2.5 border-t border-border px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
        <Link
          to="/quote"
          onClick={onClose}
          className="flex h-13 items-center justify-center gap-2 rounded-xl bg-highlight text-[15px] font-bold text-highlight-foreground"
        >
          Get a Free Quote
          <ArrowRight className="size-4" aria-hidden />
        </Link>
        <div className={cn("grid gap-2.5", whatsappLink ? "grid-cols-2" : "grid-cols-1")}>
          <a
            href={telLink(business.primaryPhoneTel)}
            className="flex h-13 items-center justify-center gap-2 rounded-xl border border-input text-[15px] font-semibold"
          >
            <Phone className="size-4" aria-hidden />
            Call us
          </a>
          {whatsappLink ? (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-13 items-center justify-center gap-2 rounded-xl border border-input text-[15px] font-semibold"
            >
              WhatsApp
            </a>
          ) : null}
        </div>
        <p className="flex items-center justify-center gap-2 pt-1 text-xs text-muted-foreground">
          <Clock className="size-3.5" aria-hidden />
          {business.businessHours} · {business.coverageShort}
        </p>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Slim utility bar: keeps the phone number permanently visible on
          desktop without crowding the navigation row. */}
      <div className="hidden border-b border-border bg-ink text-ink-foreground lg:block">
        <div className="mx-auto flex h-10 w-full max-w-6xl items-center justify-between gap-6 px-8 text-[13px]">
          <p className="flex items-center gap-5 text-ink-foreground/70">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5 text-highlight" aria-hidden />
              {business.businessHours}
            </span>
            <span>{business.coverageShort}</span>
          </p>
          <p className="flex items-center gap-5">
            <a
              href={mailtoLink}
              className="text-ink-foreground/70 transition-colors hover:text-ink-foreground"
            >
              {business.email}
            </a>
            <a
              href={telLink(business.primaryPhoneTel)}
              className="inline-flex items-center gap-2 font-bold tabular-nums transition-colors hover:text-highlight"
            >
              <Phone className="size-3.5 text-highlight" aria-hidden />
              {business.primaryPhoneDisplay}
            </a>
          </p>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 supports-[backdrop-filter]:bg-background/70",
          scrolled
            ? "border-border shadow-[0_1px_20px_-8px_oklch(0_0_0/0.25)]"
            : "border-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:h-18 sm:px-8">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-0.5 xl:flex">
            <DesktopDropdown label="Removals" links={removalsNav} />
            <DesktopDropdown label="Moving Support" links={supportNav} />
            <Link
              to="/areas-we-cover"
              className={navLinkClass}
              activeProps={{ className: "text-foreground", "aria-current": "page" }}
            >
              Areas
            </Link>
            <Link
              to="/about"
              className={navLinkClass}
              activeProps={{ className: "text-foreground", "aria-current": "page" }}
            >
              About
            </Link>
            <Link
              to="/reviews"
              className={navLinkClass}
              activeProps={{ className: "text-foreground", "aria-current": "page" }}
            >
              Reviews
            </Link>
            <Link
              to="/contact"
              className={navLinkClass}
              activeProps={{ className: "text-foreground", "aria-current": "page" }}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={telLink(business.primaryPhoneTel)}
              aria-label={`Call us on ${business.primaryPhoneDisplay}`}
              className="inline-flex size-11 items-center justify-center rounded-xl border border-border xl:hidden"
            >
              <Phone className="size-5" aria-hidden />
            </a>
            <QuoteButton size="sm" className="hidden sm:inline-flex" />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex size-11 items-center justify-center rounded-xl border border-border xl:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
