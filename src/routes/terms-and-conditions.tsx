import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/legal-page";
import { business } from "@/config/business";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () =>
    seo({
      title: "Terms & Conditions | House Moving Experts",
      description:
        "The terms that apply to quotes, bookings and removals services provided by House Moving Experts (Total Transport Team Ltd).",
      path: "/terms-and-conditions",
    }),
  component: () => (
    <LegalPage title="Terms & Conditions" updated="August 2026">
      <p>
        These terms cover your use of this website and the quotes we provide through it. The
        detailed terms that apply to a booked move are the ones set out in your written quotation
        and booking confirmation from {business.companyName}.
      </p>

      <h2>Quotes</h2>
      <p>
        A quote is based on the information you give us — property size, access, dates and what
        needs moving. If the move turns out to be materially different on the day, the price may
        need to change, and we'll talk to you about it before we proceed.
      </p>

      <h2>Bookings</h2>
      <p>
        A move is booked when we've confirmed it with you in writing. Payment terms, any deposit,
        and cancellation and rescheduling arrangements are set out in your booking confirmation.
      </p>

      <h2>Your responsibilities</h2>
      <ul>
        <li>Telling us about access restrictions, parking limitations and difficult items</li>
        <li>Telling us about anything hazardous, prohibited or exceptionally valuable</li>
        <li>Making sure someone is available at both addresses on the day</li>
        <li>Obtaining any parking suspensions or permits needed at your addresses</li>
      </ul>

      <h2>Liability and insurance</h2>
      <p>
        The cover that applies to your move is set out in your written quotation and booking
        confirmation. Please read it, and ask us if anything isn't clear — particularly if you have
        high-value items.
      </p>

      <h2>This website</h2>
      <p>
        We keep the information on this site as accurate as we can, but service details and
        availability can change. Nothing on this website is a binding offer — your quotation is.
      </p>

      <h2>Law</h2>
      <p>These terms are governed by the law of England and Wales.</p>
    </LegalPage>
  ),
});
