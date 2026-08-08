import { createFileRoute } from "@tanstack/react-router";
import { Check, Clock, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

import {
  CallButton,
  EmailButton,
  QuoteButton,
  WhatsAppButton,
} from "@/components/site/contact-actions";
import { SiteLayout } from "@/components/site/layout";
import { PageHero, Section } from "@/components/site/primitives";
import { CtaBand } from "@/components/site/sections";
import { business, businessClaims, mailtoLink, telLink } from "@/config/business";
import { services } from "@/config/services";
import { formatQuoteRequest, submitQuoteRequest } from "@/lib/quote-request";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact us | Removals in London & Across the UK",
      description:
        "Call us on 07719 734031, message us on WhatsApp or email info@totaltransportteam.co.uk. London-based removals, open 24/7, covering London and the UK.",
      path: "/contact",
    }),
  component: ContactPage,
});

const inputClass =
  "h-12 w-full rounded-xl border border-input bg-background px-4 text-base outline-none transition-colors focus:border-foreground/30 focus:ring-2 focus:ring-ring/20 sm:text-[15px]";

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "fallback">("idle");
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Please add your name and a phone number so we can get back to you.");
      return;
    }
    setError(null);
    setState("sending");

    const payload = {
      moveType: form.service || "General enquiry",
      propertySize: "",
      from: { postcode: "", address: "", propertyType: "", floor: "", lift: "", access: "" },
      to: { postcode: "", address: "", propertyType: "", floor: "", lift: "", access: "" },
      dateStatus: "",
      moveDate: "",
      items: [],
      itemNotes: "",
      extras: [],
      name: form.name,
      phone: form.phone,
      email: form.email,
      contactPreference: "",
      notes: form.message,
    };

    try {
      const result = await submitQuoteRequest({ data: payload });
      setState(result.delivered ? "sent" : "fallback");
    } catch {
      setState("fallback");
    }
  };

  if (state === "sent" || state === "fallback") {
    const body = encodeURIComponent(
      formatQuoteRequest({
        moveType: form.service || "General enquiry",
        propertySize: "",
        from: { postcode: "", address: "", propertyType: "", floor: "", lift: "", access: "" },
        to: { postcode: "", address: "", propertyType: "", floor: "", lift: "", access: "" },
        dateStatus: "",
        moveDate: "",
        items: [],
        itemNotes: "",
        extras: [],
        name: form.name,
        phone: form.phone,
        email: form.email,
        contactPreference: "",
        notes: form.message,
      }),
    );

    // Only claim we received it when we actually did.
    if (state === "fallback") {
      return (
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-highlight text-highlight-foreground">
            <Send className="size-6" aria-hidden />
          </span>
          <h2 className="mt-5 text-2xl font-bold tracking-tight">One last tap to send it</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            Your message is ready to go — we just need you to send it. It's already filled in, so
            there's nothing left to type.
          </p>
          <a
            href={`${mailtoLink}?subject=${encodeURIComponent("Enquiry from the House Moving Experts website")}&body=${body}`}
            className="mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-highlight text-[15px] font-bold text-highlight-foreground"
          >
            <Mail className="size-4" aria-hidden />
            Send by email
          </a>
          <p className="mt-5 text-sm text-muted-foreground">
            Or skip it and just call us — we're {business.businessHours.toLowerCase()}.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CallButton showNumber />
            <WhatsAppButton />
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-highlight text-highlight-foreground">
          <Check className="size-6" aria-hidden />
        </span>
        <h2 className="mt-5 text-2xl font-bold tracking-tight">Thanks — message received.</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          {businessClaims.quoteResponseTime
            ? `We'll get back to you ${businessClaims.quoteResponseTime}.`
            : "Our team will get in touch shortly."}{" "}
          If it's urgent, call us — we're {business.businessHours.toLowerCase()}.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <CallButton showNumber />
          <WhatsAppButton />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-6 sm:p-9">
      <h2 className="text-2xl font-bold tracking-tight">Send us a message</h2>
      <p className="mt-2 text-[15px] text-muted-foreground">
        For a full move quote, the{" "}
        <a href="/quote" className="font-semibold text-foreground underline underline-offset-4">
          quote form
        </a>{" "}
        gets you a more accurate price.
      </p>

      <div className="mt-7 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold">Your name</span>
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              autoComplete="name"
              className={cn(inputClass, "mt-2")}
              placeholder="First and last name"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Phone number</span>
            <input
              type="tel"
              inputMode="tel"
              enterKeyHint="next"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              autoComplete="tel"
              className={cn(inputClass, "mt-2")}
              placeholder="Mobile or landline"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-sm font-semibold">Email address</span>
          <input
            type="email"
            inputMode="email"
            enterKeyHint="next"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            autoComplete="email"
            className={cn(inputClass, "mt-2")}
            placeholder="you@example.com"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">What can we help with?</span>
          <select
            value={form.service}
            onChange={(e) => set("service", e.target.value)}
            className={cn(inputClass, "mt-2 appearance-none")}
          >
            <option value="">Select a service…</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Your message</span>
          <textarea
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            rows={5}
            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none transition-colors focus:border-foreground/30 focus:ring-2 focus:ring-ring/20 sm:text-[15px]"
            placeholder="Tell us a bit about your move"
          />
        </label>
      </div>

      {error ? (
        <p className="mt-5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-7 inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-highlight text-base font-bold text-highlight-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-70"
      >
        {state === "sending" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
        {state === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function ContactPage() {
  return (
    <SiteLayout>
      <PageHero
        title="Contact us"
        lead={`Call, message or email us — whichever is easiest. We're based in ${business.location}, we cover ${business.serviceCoverage}, and we're ${business.businessHours.toLowerCase()}.`}
        actions={
          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
            <QuoteButton size="lg" className="w-full sm:w-auto" />
            <div className="grid grid-cols-2 gap-2.5 sm:contents">
              <CallButton size="lg" variant="inverted" showNumber />
              <WhatsAppButton size="lg" variant="inverted" />
              <EmailButton size="lg" variant="inverted" className="col-span-2 sm:col-span-1" />
            </div>
          </div>
        }
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div className="space-y-4 sm:space-y-5">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-7">
              <p className="text-xl font-black uppercase leading-[1.1] tracking-tight">
                {business.brandLine1}
                <br />
                <span className="text-highlight-foreground">{business.brandLine2}</span>
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{business.tradingAs}</p>

              <dl className="mt-7 space-y-5 text-[15px]">
                <div className="flex gap-3">
                  <Phone className="mt-0.5 size-5 shrink-0 text-highlight-foreground" aria-hidden />
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      Primary
                    </dt>
                    <dd>
                      <a
                        href={telLink(business.primaryPhoneTel)}
                        className="text-lg font-bold tabular-nums hover:underline"
                      >
                        {business.primaryPhoneDisplay}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="mt-0.5 size-5 shrink-0 opacity-40" aria-hidden />
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      Secondary
                    </dt>
                    <dd>
                      <a
                        href={telLink(business.secondaryPhoneTel)}
                        className="font-semibold tabular-nums hover:underline"
                      >
                        {business.secondaryPhoneDisplay}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 opacity-40" aria-hidden />
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      Email
                    </dt>
                    <dd>
                      <a href={mailtoLink} className="font-semibold hover:underline">
                        {business.email}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 opacity-40" aria-hidden />
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      Based in
                    </dt>
                    <dd className="font-semibold">{business.location}</dd>
                    <dd className="text-sm text-muted-foreground">{business.coverageShort}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="mt-0.5 size-5 shrink-0 opacity-40" aria-hidden />
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      Hours
                    </dt>
                    <dd className="font-semibold">{business.businessHours}</dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-border bg-primary p-6 text-primary-foreground sm:p-8">
              <div
                className="ttt-grid-backdrop absolute inset-0 text-primary-foreground"
                aria-hidden
              />
              <div className="relative">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground/60">
                  Where we work
                </p>
                <p className="mt-4 text-2xl font-extrabold leading-snug">
                  London-based removals, moving you anywhere in the UK.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-primary-foreground/75">
                  We cover every London borough and travel to destinations across the country. We
                  don't run a public walk-in office — every move starts with a conversation, so call
                  or message us and we'll take it from there.
                </p>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </Section>

      <CtaBand
        title="Prefer to get a proper quote?"
        body="The quote form takes about two minutes and gets you a more accurate price."
      />
    </SiteLayout>
  );
}
