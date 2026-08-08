import { createServerFn } from "@tanstack/react-start";

export type QuoteAddress = {
  postcode: string;
  address: string;
  propertyType: string;
  floor: string;
  lift: string;
  access: string;
};

export type QuoteRequest = {
  moveType: string;
  propertySize: string;
  from: QuoteAddress;
  to: QuoteAddress;
  dateStatus: string;
  moveDate: string;
  items: string[];
  itemNotes: string;
  extras: string[];
  name: string;
  phone: string;
  email: string;
  contactPreference: string;
  notes: string;
};

export type QuoteSubmitResult = {
  /** True when the enquiry reached a configured destination. */
  delivered: boolean;
  /** Present when delivery failed or no destination is configured. */
  reason?: string;
};

/**
 * Formats an enquiry as readable text — used both for the delivery payload and
 * for the mailto/WhatsApp fallback on the client.
 */
export const formatQuoteRequest = (q: QuoteRequest): string => {
  const address = (label: string, a: QuoteAddress) =>
    [
      `${label}:`,
      `  Postcode: ${a.postcode || "—"}`,
      `  Address: ${a.address || "—"}`,
      `  Property: ${a.propertyType || "—"}`,
      `  Floor: ${a.floor || "—"}`,
      `  Lift: ${a.lift || "—"}`,
      `  Parking / access: ${a.access || "—"}`,
    ].join("\n");

  return [
    `Move type: ${q.moveType || "—"}`,
    `Property size: ${q.propertySize || "—"}`,
    "",
    address("Moving from", q.from),
    "",
    address("Moving to", q.to),
    "",
    `Moving date: ${q.moveDate || "—"} (${q.dateStatus || "—"})`,
    "",
    `What needs moving: ${q.items.length ? q.items.join(", ") : "—"}`,
    `Item notes: ${q.itemNotes || "—"}`,
    "",
    `Extra help: ${q.extras.length ? q.extras.join(", ") : "—"}`,
    "",
    `Name: ${q.name}`,
    `Phone: ${q.phone}`,
    `Email: ${q.email || "—"}`,
    `Preferred contact: ${q.contactPreference || "—"}`,
    "",
    `Notes: ${q.notes || "—"}`,
  ].join("\n");
};

/**
 * Receives a quote request on the server.
 *
 * Delivery destination is configured with the `QUOTE_WEBHOOK_URL` environment
 * variable (any endpoint that accepts a JSON POST — an email service, a CRM, a
 * Zapier/Make hook, a Supabase function). If it isn't set, the request is
 * logged and `delivered: false` is returned, and the UI falls back to sending
 * the same details by email or WhatsApp so an enquiry is never silently lost.
 *
 * TODO(owner): set QUOTE_WEBHOOK_URL in the hosting environment before launch.
 */
export const submitQuoteRequest = createServerFn({ method: "POST" })
  .validator((data: QuoteRequest) => data)
  .handler(async ({ data }): Promise<QuoteSubmitResult> => {
    const endpoint = process.env["QUOTE_WEBHOOK_URL"];
    const summary = formatQuoteRequest(data);

    if (!endpoint) {
      console.warn(
        "[quote] QUOTE_WEBHOOK_URL is not configured — enquiry was not forwarded.\n" + summary,
      );
      return { delivered: false, reason: "not-configured" };
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          subject: `New removals enquiry — ${data.name}`,
          summary,
          request: data,
        }),
      });

      if (!response.ok) {
        console.error("[quote] delivery failed", response.status, summary);
        return { delivered: false, reason: `status-${response.status}` };
      }

      return { delivered: true };
    } catch (error) {
      console.error("[quote] delivery error", error, summary);
      return { delivered: false, reason: "network" };
    }
  });
