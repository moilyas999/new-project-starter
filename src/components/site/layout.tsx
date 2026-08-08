import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { JsonLd } from "@/components/site/json-ld";
import { MobileActionBar } from "@/components/site/mobile-action-bar";
import { movingCompanySchema } from "@/lib/structured-data";

export function SiteLayout({
  children,
  mobileBar = true,
}: {
  children: ReactNode;
  /** Turn off where the page provides its own sticky mobile actions. */
  mobileBar?: boolean;
}) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <JsonLd data={movingCompanySchema()} />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-primary focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />

      {mobileBar ? (
        <>
          {/* Reserves the height of the sticky bar so it never covers the end
              of the page. */}
          <div
            aria-hidden
            className="h-[calc(4rem+env(safe-area-inset-bottom))] shrink-0 sm:hidden"
          />
          <MobileActionBar />
        </>
      ) : null}
    </div>
  );
}
