import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/legal-page";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/cookie-policy")({
  head: () =>
    seo({
      title: "Cookie Policy | TTT Removals",
      description:
        "How the TTT website uses cookies, what they're for, and how you can control them in your browser.",
      path: "/cookie-policy",
    }),
  component: () => (
    <LegalPage title="Cookie Policy" updated="August 2026">
      <p>
        Cookies are small files a website stores on your device. This page explains how we use them.
      </p>

      <h2>Essential cookies</h2>
      <p>
        These are needed for the website to work — for example remembering your progress through the
        quote form during your visit. They can't be switched off through the site.
      </p>

      <h2>Analytics cookies</h2>
      <p>
        If analytics is enabled on this site, these cookies help us understand which pages people
        find useful so we can improve them. They don't identify you personally.
      </p>

      <h2>Managing cookies</h2>
      <p>
        You can delete or block cookies in your browser settings. Blocking essential cookies may
        stop parts of the site working properly.
      </p>

      <h2>Changes</h2>
      <p>
        If we add new cookies to the site — for example a new analytics or advertising tool — we'll
        update this page.
      </p>
    </LegalPage>
  ),
});
