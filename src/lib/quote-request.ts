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
  /** True when the enquiry reached at least one configured destination. */
  delivered: boolean;
  /** Which adapters succeeded, e.g. ["email", "webhook"]. */
  via: string[];
  /** Why nothing was delivered — "not-configured" means no adapter is set up. */
  reason?: string;
};

/**
 * Formats an enquiry as readable text — used for the delivery payload, the
 * email body, and the mailto/WhatsApp fallback on the client.
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

/* -------------------------------------------------------------------------- */
/*  Delivery adapters                                                          */
/* -------------------------------------------------------------------------- */
/*
 * Every adapter is opt-in via environment variables. Configure ONE and
 * enquiries are delivered; configure several and they all run, so a lead can
 * land in an inbox and a database at the same time.
 *
 * Nothing here signs the business up to anything or assumes a provider.
 *
 *   QUOTE_WEBHOOK_URL
 *     Any endpoint that accepts a JSON POST. This is the zero-code option —
 *     point it at a Zapier / Make / n8n catch hook, a Google Sheets webhook, a
 *     Slack incoming webhook, or your own CRM endpoint.
 *
 *   RESEND_API_KEY + QUOTE_EMAIL_TO (+ optional QUOTE_EMAIL_FROM)
 *     Emails each enquiry straight to the business. Resend has a free tier and
 *     is the least moving parts if you just want leads in an inbox.
 *
 *   SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (+ optional QUOTE_TABLE)
 *     Inserts a row into a Postgres table so leads are stored durably and can
 *     be listed, exported or reported on later. Expects a table (default
 *     `quote_requests`) with a `payload jsonb` column, or matching columns.
 *
 * See docs/quote-delivery.md.
 */

const jsonHeaders = { "content-type": "application/json" };

async function deliverWebhook(data: QuoteRequest, summary: string): Promise<boolean> {
  const endpoint = process.env["QUOTE_WEBHOOK_URL"];
  if (!endpoint) return false;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({
      subject: `New removals enquiry — ${data.name}`,
      summary,
      request: data,
    }),
  });

  if (!response.ok) throw new Error(`webhook responded ${response.status}`);
  return true;
}

async function deliverEmail(data: QuoteRequest, summary: string): Promise<boolean> {
  const apiKey = process.env["RESEND_API_KEY"];
  const to = process.env["QUOTE_EMAIL_TO"];
  if (!apiKey || !to) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { ...jsonHeaders, authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: process.env["QUOTE_EMAIL_FROM"] ?? "Website <onboarding@resend.dev>",
      to: to.split(",").map((address) => address.trim()),
      // So hitting reply in the inbox replies to the customer.
      ...(data.email ? { reply_to: data.email } : {}),
      subject: `New removals enquiry — ${data.name} (${data.moveType || "move"})`,
      text: summary,
    }),
  });

  if (!response.ok) {
    throw new Error(`resend responded ${response.status}: ${await response.text()}`);
  }
  return true;
}

async function deliverSupabase(data: QuoteRequest, summary: string): Promise<boolean> {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  if (!url || !key) return false;

  const table = process.env["QUOTE_TABLE"] ?? "quote_requests";
  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      ...jsonHeaders,
      apikey: key,
      authorization: `Bearer ${key}`,
      prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      move_type: data.moveType || null,
      summary,
      payload: data,
    }),
  });

  if (!response.ok) {
    throw new Error(`supabase responded ${response.status}: ${await response.text()}`);
  }
  return true;
}

type Adapter = {
  name: string;
  run: (data: QuoteRequest, summary: string) => Promise<boolean>;
};

const adapters: Adapter[] = [
  { name: "email", run: deliverEmail },
  { name: "webhook", run: deliverWebhook },
  { name: "database", run: deliverSupabase },
];

/**
 * Receives a quote request on the server and fans it out to every configured
 * destination.
 *
 * If NOTHING is configured this returns `delivered: false` with reason
 * "not-configured", and the UI says so plainly rather than thanking the
 * customer for details nobody received.
 *
 * TODO(owner): configure at least one adapter before launch — see
 * docs/quote-delivery.md.
 */
export const submitQuoteRequest = createServerFn({ method: "POST" })
  .validator((data: QuoteRequest) => data)
  .handler(async ({ data }): Promise<QuoteSubmitResult> => {
    const summary = formatQuoteRequest(data);

    const results = await Promise.all(
      adapters.map(async (adapter) => {
        try {
          return (await adapter.run(data, summary)) ? adapter.name : null;
        } catch (error) {
          console.error(`[quote] ${adapter.name} delivery failed`, error);
          return null;
        }
      }),
    );

    const via = results.filter((name): name is string => name !== null);

    if (via.length > 0) return { delivered: true, via };

    const anyConfigured =
      Boolean(process.env["QUOTE_WEBHOOK_URL"]) ||
      Boolean(process.env["RESEND_API_KEY"] && process.env["QUOTE_EMAIL_TO"]) ||
      Boolean(process.env["SUPABASE_URL"] && process.env["SUPABASE_SERVICE_ROLE_KEY"]);

    // Last line of defence: the enquiry is at least in the server log, so it is
    // recoverable from the hosting platform's logs if someone goes looking.
    console.error(
      anyConfigured
        ? "[quote] every configured delivery adapter failed — enquiry NOT delivered:\n"
        : "[quote] no delivery adapter is configured — enquiry NOT delivered:\n",
      summary,
    );

    return {
      delivered: false,
      via: [],
      reason: anyConfigured ? "delivery-failed" : "not-configured",
    };
  });
