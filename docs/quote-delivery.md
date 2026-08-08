# Where quote enquiries go

**Right now: nowhere durable.** Nothing is configured, so a submitted quote is
written to the server log and the customer is shown a screen asking them to send
it themselves by WhatsApp or email. That works, but it depends on the customer
taking one more action — some won't, and those leads are lost.

**Configure one of the three options below before launch.** It takes a few
minutes and it's the difference between capturing enquiries and hoping.

---

## How it works

`src/lib/quote-request.ts` runs a set of delivery adapters on the server. Each
one is opt-in via environment variables:

- Configure **one** and enquiries are delivered.
- Configure **several** and they all run — a lead can land in an inbox _and_ a
  database at the same time, which is the safest setup.
- Configure **none** and the customer gets the honest "one last tap to send it"
  screen instead of being told we received something we didn't.

Both the quote flow and the contact form use the same path.

---

## Option 1 — Email (simplest)

Leads arrive in an inbox. No database, no dashboard to check.

```
RESEND_API_KEY=re_xxxxxxxxxxxx
QUOTE_EMAIL_TO=info@housemovingexperts.com
QUOTE_EMAIL_FROM=Website <quotes@housemovingexperts.com>   # optional
```

1. Sign up at [resend.com](https://resend.com) (free tier covers a small
   business comfortably).
2. Verify the sending domain, then create an API key.
3. Set the variables in the hosting environment and redeploy.

`QUOTE_EMAIL_TO` accepts a comma-separated list. Replies go to the customer's
address automatically, so hitting reply in the inbox just works.

If `QUOTE_EMAIL_FROM` is omitted it falls back to Resend's shared sending
address, which is fine for testing but should be a verified address of your own
in production or the mail will land in spam.

## Option 2 — Webhook (no code, most flexible)

Point the site at any endpoint that accepts a JSON POST:

```
QUOTE_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/…
```

Works with Zapier, Make, n8n, a Slack incoming webhook, a Google Sheets hook, or
your own CRM. Useful when the lead needs to go somewhere other than an inbox —
straight into a spreadsheet, a WhatsApp Business API, or a booking system.

The payload is:

```json
{
  "subject": "New removals enquiry — Jane Smith",
  "summary": "Move type: house\nProperty size: 3 bedrooms\n…",
  "request": { "moveType": "house", "from": { "postcode": "SW11 1AA", … }, … }
}
```

`summary` is human-readable and ready to paste into a message; `request` is the
full structured object if you want to map fields.

## Option 3 — Database (durable, reportable)

Stores every enquiry as a row so nothing depends on an inbox:

```
SUPABASE_URL=https://xxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci…
QUOTE_TABLE=quote_requests            # optional, this is the default
```

Create the table first:

```sql
create table public.quote_requests (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  name        text not null,
  phone       text not null,
  email       text,
  move_type   text,
  summary     text,
  payload     jsonb not null
);

-- The site writes with the service-role key from the server only, so keep RLS
-- on and grant nothing to anon/authenticated. No browser ever sees this key.
alter table public.quote_requests enable row level security;
```

> The service-role key bypasses RLS and must only ever be set as a **server**
> environment variable. Never expose it to the browser, and never prefix it with
> `VITE_` — anything with that prefix is bundled into client-side JavaScript.

**Recommended:** pair this with Option 1. The database guarantees nothing is
lost; the email means someone actually notices.

---

## Verifying it works

1. Set the variables and redeploy.
2. Submit a real quote through `/quote`.
3. You should land on **"Thanks — we've received your move details."**
   If you land on **"One last tap to send it"**, delivery failed — check the
   server logs, which record the reason and the full enquiry.

The server log always contains the enquiry as a last line of defence, so even a
total delivery failure is recoverable from the hosting platform's logs.

---

## Spam

There is deliberately no CAPTCHA. Removals enquiry forms get very little
automated spam, and a CAPTCHA measurably reduces genuine submissions. If spam
does become a problem, the least intrusive fixes in order are: a honeypot field,
then a minimum time-on-form check, then Cloudflare Turnstile.
