import type { ReactNode } from "react";

import { SiteLayout } from "@/components/site/layout";
import { Container, Section } from "@/components/site/primitives";
import { business, mailtoLink, telLink } from "@/config/business";

/**
 * Shared shell for the legal pages.
 *
 * NOTE(owner): the content of these pages is a starting point written around
 * how the site actually works. Have them reviewed before launch — nothing here
 * invents a company registration number, registered address or insurance
 * position, because none of those were available to verify.
 */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <Container className="py-12 sm:py-16">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-primary-foreground/70">Last updated: {updated}</p>
        </Container>
      </section>

      <Section>
        <div className="max-w-3xl space-y-5 text-[16px] leading-relaxed text-muted-foreground [&_a]:font-semibold [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-foreground">
          {children}
          <h2>Contact us</h2>
          <p>
            {business.companyName} (trading as {business.brandName}), {business.location}.
          </p>
          <ul>
            <li>
              Phone: <a href={telLink(business.primaryPhoneTel)}>{business.primaryPhoneDisplay}</a>
            </li>
            <li>
              Email: <a href={mailtoLink}>{business.email}</a>
            </li>
          </ul>
        </div>
      </Section>
    </SiteLayout>
  );
}
