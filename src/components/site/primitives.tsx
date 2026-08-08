import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        // --ttt-gutter lets edge-to-edge scrollers bleed out to the screen edge
        // on phones without hard-coding the page gutter in two places.
        "mx-auto w-full max-w-6xl px-5 [--ttt-gutter:1.25rem] sm:px-8 sm:[--ttt-gutter:2rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  className,
  containerClassName,
  tone = "default",
  id,
  defer = true,
  children,
}: {
  className?: string | undefined;
  containerClassName?: string | undefined;
  tone?: "default" | "surface" | "ink";
  id?: string;
  /** Skip layout work while the section is far off-screen. */
  defer?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-14 sm:py-20 lg:py-24",
        defer && "ttt-defer",
        tone === "surface" && "bg-surface",
        tone === "ink" && "bg-ink text-ink-foreground",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="ttt-h2 mt-3 font-extrabold">{title}</h2>
      {lead ? <p className="ttt-lead mt-4 opacity-80">{lead}</p> : null}
    </div>
  );
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "space-y-4 text-[17px] leading-relaxed text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Page hero shared by every inner page. Dark, fluid type, tightened up on
 * phones so the first CTA is visible without scrolling.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  breadcrumb,
  actions,
  meta,
}: {
  eyebrow?: ReactNode;
  title: string;
  lead?: ReactNode;
  breadcrumb?: ReactNode;
  actions?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="ttt-glow absolute inset-0" aria-hidden />
      <div className="ttt-grid-backdrop absolute inset-0 text-primary-foreground" aria-hidden />
      <Container className="relative py-11 sm:py-16 lg:py-20">
        {breadcrumb}
        {eyebrow ? <div className="mt-6 first:mt-0">{eyebrow}</div> : null}
        <h1 className="ttt-h1 mt-6 max-w-3xl font-black first:mt-0 sm:mt-5">{title}</h1>
        {lead ? <p className="ttt-lead mt-4 max-w-2xl text-primary-foreground/80">{lead}</p> : null}
        {actions ? <div className="mt-7">{actions}</div> : null}
        {meta ? <div className="mt-6 text-sm text-primary-foreground/60">{meta}</div> : null}
      </Container>
    </section>
  );
}
