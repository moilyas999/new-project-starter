import { Link } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import type { ComponentType } from "react";

import { Logo } from "@/components/site/logo";
import { business, mailtoLink, socials, telLink } from "@/config/business";
import { companyNav, legalNav, removalsNav, supportNav } from "@/config/navigation";
import { path } from "@/lib/paths";

const socialIcons: Record<string, ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
};

function FooterColumn({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-ink-foreground/60">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={path(link.to)}
              className="text-sm text-ink-foreground/80 transition-colors hover:text-ink-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto w-full max-w-6xl px-5 pb-28 pt-16 sm:px-8 sm:pb-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <Logo tone="inverted" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-foreground/75">
              Professional removals from London to destinations across the UK.
            </p>
            {Object.entries(socials).some(([, url]) => url) ? (
              <div className="mt-6 flex gap-2">
                {Object.entries(socials).map(([key, url]) => {
                  if (!url) return null;
                  const Icon = socialIcons[key];
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${business.brandName} on ${key}`}
                      className="inline-flex size-10 items-center justify-center rounded-xl border border-ink-foreground/20 transition-colors hover:bg-ink-foreground/10"
                    >
                      {Icon ? (
                        <Icon className="size-4" />
                      ) : (
                        <span className="text-sm font-bold">𝕏</span>
                      )}
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>

          <FooterColumn title="Removals" links={removalsNav} />
          <FooterColumn
            title="Moving support"
            links={[...supportNav, { label: "Get a Quote", to: "/quote" }]}
          />

          <div>
            <FooterColumn title="Company" links={companyNav} />

            <h3 className="mt-9 text-xs font-bold uppercase tracking-[0.18em] text-ink-foreground/60">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={telLink(business.primaryPhoneTel)}
                  className="inline-flex items-center gap-2.5 font-semibold text-ink-foreground transition-opacity hover:opacity-80"
                >
                  <Phone className="size-4 shrink-0 text-highlight" aria-hidden />
                  <span className="tabular-nums">{business.primaryPhoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={telLink(business.secondaryPhoneTel)}
                  className="inline-flex items-center gap-2.5 text-ink-foreground/80 transition-opacity hover:opacity-100"
                >
                  <Phone className="size-4 shrink-0 opacity-50" aria-hidden />
                  <span className="tabular-nums">{business.secondaryPhoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={mailtoLink}
                  className="inline-flex items-center gap-2.5 text-ink-foreground/80 transition-opacity hover:opacity-100"
                >
                  <Mail className="size-4 shrink-0 opacity-50" aria-hidden />
                  {business.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-ink-foreground/80">
                <MapPin className="size-4 shrink-0 opacity-50" aria-hidden />
                {business.location}
              </li>
              <li className="flex items-center gap-2.5 text-ink-foreground/80">
                <Clock className="size-4 shrink-0 opacity-50" aria-hidden />
                {business.businessHours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink-foreground/15 pt-7 text-xs text-ink-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.companyName}. TTT is the trading brand of {business.companyName}.{" "}
            {business.coverageShort}.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((link) => (
              <li key={link.to}>
                <Link to={path(link.to)} className="transition-colors hover:text-ink-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
