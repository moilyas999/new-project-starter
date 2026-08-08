import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { JsonLd } from "@/components/site/json-ld";
import { MobileActionBar } from "@/components/site/mobile-action-bar";
import { movingCompanySchema } from "@/lib/structured-data";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={movingCompanySchema()} />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <MobileActionBar />
    </div>
  );
}
