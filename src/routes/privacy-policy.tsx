import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/legal-page";
import { business } from "@/config/business";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    seo({
      title: "Privacy Policy | House Moving Experts",
      description:
        "How House Moving Experts (Total Transport Team Ltd) collects, uses and protects the personal information you give us when you request a removals quote or contact us.",
      path: "/privacy-policy",
    }),
  component: () => (
    <LegalPage title="Privacy Policy" updated="August 2026">
      <p>
        This policy explains what we do with the personal information you give us when you request a
        quote, send us a message or call us. {business.companyName} (trading as {business.brandName}
        ) is the data controller.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>Your name, phone number and email address</li>
        <li>The addresses and postcodes involved in your move</li>
        <li>Details about the property, access, dates and what needs moving</li>
        <li>Anything else you choose to tell us in a message or on a call</li>
      </ul>

      <h2>Why we collect it</h2>
      <p>
        We use it to prepare your quote, plan and carry out your move, and to contact you about it.
        We do not sell your information, and we do not use it for marketing unless you ask us to.
      </p>

      <h2>Who we share it with</h2>
      <p>
        We share only what is necessary to carry out your move — for example with a team member
        driving to your address, or a storage provider if storage is part of your booking. We may
        also share information where we are required to by law.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiry and booking records for as long as we need them for the move, our accounting
        obligations and any questions that come up afterwards, and then delete them.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us for a copy of the information we hold about you, ask us to correct it, or ask
        us to delete it. Contact us using the details below and we'll deal with your request. If
        you're unhappy with how we've handled your information, you can complain to the Information
        Commissioner's Office (ico.org.uk).
      </p>

      <h2>Cookies</h2>
      <p>
        See our <a href="/cookie-policy">Cookie Policy</a> for how this website uses cookies.
      </p>
    </LegalPage>
  ),
});
