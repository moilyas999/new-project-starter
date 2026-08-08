import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  Loader2,
  PartyPopper,
} from "lucide-react";
import { useEffect, useState } from "react";

import { CallButton, WhatsAppButton } from "@/components/site/contact-actions";
import { SiteLayout } from "@/components/site/layout";
import { Container } from "@/components/site/primitives";
import { business, businessClaims, mailtoLink, whatsapp, whatsappLink } from "@/config/business";
import {
  contactPreferences,
  dateStatuses,
  extraServices,
  floorOptions,
  itemCategories,
  liftOptions,
  moveTypes,
  propertySizes,
  propertyTypes,
} from "@/config/quote";
import {
  formatQuoteRequest,
  submitQuoteRequest,
  type QuoteAddress,
  type QuoteRequest,
} from "@/lib/quote-request";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quote")({
  head: () =>
    seo({
      title: "Get a Free Removals Quote | House Moving Experts",
      description:
        "Tell us about your move — where you're going, roughly when, and what needs moving — and we'll come back with a quote and a plan for the day.",
      path: "/quote",
    }),
  component: QuotePage,
});

const emptyAddress = (): QuoteAddress => ({
  postcode: "",
  address: "",
  propertyType: "",
  floor: "",
  lift: "",
  access: "",
});

const emptyRequest = (): QuoteRequest => ({
  moveType: "",
  propertySize: "",
  from: emptyAddress(),
  to: emptyAddress(),
  dateStatus: "",
  moveDate: "",
  items: [],
  itemNotes: "",
  extras: [],
  name: "",
  phone: "",
  email: "",
  contactPreference: "",
  notes: "",
});

const stepTitles = [
  "Your move",
  "Moving from",
  "Moving to",
  "Moving date",
  "What needs moving",
  "Extra help",
  "Your details",
  "Anything else",
  "Review & send",
];

/* ------------------------------- field bits ------------------------------- */

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      {hint ? <span className="mt-1 block text-xs text-muted-foreground">{hint}</span> : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClass =
  "h-12 w-full rounded-xl border border-input bg-background px-4 text-base outline-none transition-colors focus:border-foreground/30 focus:ring-2 focus:ring-ring/20 sm:text-[15px]";

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  inputMode,
  autoCapitalize,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  autoCapitalize?: "none" | "characters" | "words";
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      inputMode={inputMode}
      autoCapitalize={autoCapitalize}
      enterKeyHint="next"
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
    />
  );
}

function SelectInput({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputClass, "appearance-none pr-11")}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
    </div>
  );
}

function ChoiceCards({
  options,
  value,
  onChange,
  columns = 2,
}: {
  options: readonly { value: string; label: string; hint?: string }[];
  value: string;
  onChange: (v: string) => void;
  columns?: 1 | 2;
}) {
  return (
    <div className={cn("grid gap-3", columns === 2 && "sm:grid-cols-2")}>
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={selected}
            className={cn(
              "min-h-16 rounded-2xl border p-4 text-left transition-[background-color,border-color,box-shadow]",
              selected
                ? "border-highlight bg-highlight/10 ring-2 ring-highlight"
                : "border-border hover:border-foreground/25 hover:bg-accent/50",
            )}
          >
            <span className="flex items-center justify-between gap-3">
              <span className="text-[15px] font-bold">{option.label}</span>
              {selected ? <Check className="size-4 shrink-0" aria-hidden /> : null}
            </span>
            {option.hint ? (
              <span className="mt-1 block text-sm text-muted-foreground">{option.hint}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function ChipToggles({
  options,
  values,
  onToggle,
}: {
  options: readonly string[];
  values: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((option) => {
        const selected = values.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            aria-pressed={selected}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-[background-color,border-color,box-shadow]",
              selected
                ? "border-highlight bg-highlight/10 ring-2 ring-highlight"
                : "border-border hover:border-foreground/25 hover:bg-accent/50",
            )}
          >
            {selected ? <Check className="size-3.5" aria-hidden /> : null}
            {option}
          </button>
        );
      })}
    </div>
  );
}

function AddressStep({
  value,
  onChange,
  label,
}: {
  value: QuoteAddress;
  onChange: (next: QuoteAddress) => void;
  label: string;
}) {
  const set = <K extends keyof QuoteAddress>(key: K, v: QuoteAddress[K]) =>
    onChange({ ...value, [key]: v });

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={`${label} postcode`}>
          <TextInput
            value={value.postcode}
            onChange={(v) => set("postcode", v)}
            placeholder="e.g. SW1A 1AA"
            autoComplete="postal-code"
            autoCapitalize="characters"
          />
        </Field>
        <Field label="Address" hint="Optional — a street name is enough for a quote">
          <TextInput
            value={value.address}
            onChange={(v) => set("address", v)}
            placeholder="Street or building"
          />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Property type">
          <SelectInput
            value={value.propertyType}
            onChange={(v) => set("propertyType", v)}
            options={propertyTypes}
            placeholder="Select…"
          />
        </Field>
        <Field label="Floor">
          <SelectInput
            value={value.floor}
            onChange={(v) => set("floor", v)}
            options={floorOptions}
            placeholder="Select…"
          />
        </Field>
        <Field label="Lift available?">
          <SelectInput
            value={value.lift}
            onChange={(v) => set("lift", v)}
            options={liftOptions}
            placeholder="Select…"
          />
        </Field>
      </div>
      <Field
        label="Parking & access"
        hint="Anything we should know — permit zones, narrow stairs, loading bays, long walk from the road."
      >
        <textarea
          value={value.access}
          onChange={(e) => set("access", e.target.value)}
          rows={3}
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none transition-colors focus:border-foreground/30 focus:ring-2 focus:ring-ring/20 sm:text-[15px]"
          placeholder="e.g. Permit parking only, second floor with no lift"
        />
      </Field>
    </div>
  );
}

/* --------------------------------- page ---------------------------------- */

function QuotePage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuoteRequest>(emptyRequest);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [delivered, setDelivered] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // The success screen replaces the form, so take the customer back to the top
  // of it rather than leaving them halfway down the page they were on.
  useEffect(() => {
    if (submitted && typeof window !== "undefined") window.scrollTo({ top: 0 });
  }, [submitted]);

  const set = <K extends keyof QuoteRequest>(key: K, value: QuoteRequest[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const toggle = (key: "items" | "extras", value: string) =>
    setData((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));

  const canContinue = () => {
    if (step === 0) return data.moveType !== "";
    if (step === 6) return data.name.trim() !== "" && data.phone.trim() !== "";
    return true;
  };

  const next = () => {
    setError(null);
    if (!canContinue()) {
      setError(
        step === 0
          ? "Please choose the type of move so we can quote it properly."
          : "Please add your name and a phone number so we can get back to you.",
      );
      return;
    }
    setStep((s) => Math.min(s + 1, stepTitles.length - 1));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const result = await submitQuoteRequest({ data });
      setDelivered(result.delivered);
      setSubmitted(true);
    } catch {
      // The enquiry still isn't lost — the success screen offers email/WhatsApp.
      setDelivered(false);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (submitted) {
    return (
      <SiteLayout>
        <SuccessScreen delivered={delivered} data={data} />
      </SiteLayout>
    );
  }

  const progress = ((step + 1) / stepTitles.length) * 100;

  return (
    <SiteLayout mobileBar={false}>
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="ttt-glow absolute inset-0" aria-hidden />
        <Container className="relative py-9 sm:py-14">
          <h1 className="ttt-h1 font-black">Get a free quote</h1>
          <p className="mt-3 max-w-xl text-primary-foreground/80">
            A few quick questions about your move. It takes about two minutes, and there's no
            obligation.
          </p>
        </Container>
      </section>

      {/* Progress sticks under the site header so you always know where you are. */}
      <div className="sticky top-16 z-20 border-b border-border bg-background/90 backdrop-blur-xl sm:top-18">
        <Container className="py-3">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 text-[13px] font-semibold sm:text-sm">
            <span>
              Step {step + 1} of {stepTitles.length}
            </span>
            <span className="truncate text-muted-foreground">{stepTitles[step]}</span>
          </div>
          <div
            className="mx-auto mt-2 h-1.5 w-full max-w-3xl overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={step + 1}
            aria-valuemin={1}
            aria-valuemax={stepTitles.length}
            aria-label="Quote progress"
          >
            <div
              className="h-full rounded-full bg-highlight transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </Container>
      </div>

      <Container className="py-8 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-border bg-card p-5 sm:p-9">
            {step === 0 ? (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold tracking-tight">What type of move is this?</h2>
                  <div className="mt-5">
                    <ChoiceCards
                      options={moveTypes}
                      value={data.moveType}
                      onChange={(v) => set("moveType", v)}
                    />
                  </div>
                </div>
                <Field
                  label="Roughly how big is the property?"
                  hint="A rough answer is fine — it just helps us send the right size team."
                >
                  <SelectInput
                    value={data.propertySize}
                    onChange={(v) => set("propertySize", v)}
                    options={propertySizes}
                    placeholder="Select property size…"
                  />
                </Field>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="space-y-6">
                <h2 className="text-xl font-bold tracking-tight">Where are you moving from?</h2>
                <AddressStep
                  label="Moving from"
                  value={data.from}
                  onChange={(v) => set("from", v)}
                />
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-6">
                <h2 className="text-xl font-bold tracking-tight">Where are you moving to?</h2>
                <AddressStep label="Moving to" value={data.to} onChange={(v) => set("to", v)} />
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold tracking-tight">When are you moving?</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Chains move all the time. Tell us how firm your date is and we'll plan around
                    it.
                  </p>
                  <div className="mt-5">
                    <ChoiceCards
                      options={dateStatuses}
                      value={data.dateStatus}
                      onChange={(v) => set("dateStatus", v)}
                    />
                  </div>
                </div>
                {data.dateStatus !== "unknown" ? (
                  <Field
                    label="Preferred moving date"
                    hint={
                      data.dateStatus === "flexible"
                        ? "Optional — give us a rough starting point if you have one."
                        : undefined
                    }
                  >
                    <TextInput
                      type="date"
                      value={data.moveDate}
                      onChange={(v) => set("moveDate", v)}
                    />
                  </Field>
                ) : null}
              </div>
            ) : null}

            {step === 4 ? (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold tracking-tight">What needs moving?</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Tick anything that applies. This is about planning the day, not a full
                    inventory.
                  </p>
                  <div className="mt-5">
                    <ChipToggles
                      options={itemCategories}
                      values={data.items}
                      onToggle={(v) => toggle("items", v)}
                    />
                  </div>
                </div>
                <Field
                  label="Anything unusual or especially valuable?"
                  hint="Pianos, safes, large artwork, garden equipment, anything that won't fit through a standard door."
                >
                  <textarea
                    value={data.itemNotes}
                    onChange={(e) => set("itemNotes", e.target.value)}
                    rows={4}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none transition-colors focus:border-foreground/30 focus:ring-2 focus:ring-ring/20 sm:text-[15px]"
                    placeholder="Tell us about anything that needs special care"
                  />
                </Field>
              </div>
            ) : null}

            {step === 5 ? (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Would you like extra help?</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Optional — add anything that would make the day easier.
                  </p>
                  <div className="mt-5">
                    <ChipToggles
                      options={extraServices}
                      values={data.extras}
                      onToggle={(v) => toggle("extras", v)}
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {step === 6 ? (
              <div className="space-y-6">
                <h2 className="text-xl font-bold tracking-tight">How should we reach you?</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Your name">
                    <TextInput
                      value={data.name}
                      onChange={(v) => set("name", v)}
                      autoComplete="name"
                      placeholder="First and last name"
                    />
                  </Field>
                  <Field label="Phone number">
                    <TextInput
                      type="tel"
                      inputMode="tel"
                      value={data.phone}
                      onChange={(v) => set("phone", v)}
                      autoComplete="tel"
                      placeholder="Mobile or landline"
                    />
                  </Field>
                </div>
                <Field label="Email address" hint="Optional, but useful for sending your quote.">
                  <TextInput
                    type="email"
                    inputMode="email"
                    value={data.email}
                    onChange={(v) => set("email", v)}
                    autoComplete="email"
                    placeholder="you@example.com"
                  />
                </Field>
                <Field label="Preferred way to be contacted">
                  <ChipToggles
                    options={contactPreferences}
                    values={data.contactPreference ? [data.contactPreference] : []}
                    onToggle={(v) =>
                      set("contactPreference", data.contactPreference === v ? "" : v)
                    }
                  />
                </Field>
              </div>
            ) : null}

            {step === 7 ? (
              <div className="space-y-6">
                <h2 className="text-xl font-bold tracking-tight">Anything else we should know?</h2>
                <Field
                  label="Additional information"
                  hint="Optional. Tight timings, a second address, storage in between, anything at all."
                >
                  <textarea
                    value={data.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    rows={6}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none transition-colors focus:border-foreground/30 focus:ring-2 focus:ring-ring/20 sm:text-[15px]"
                    placeholder="Tell us anything that would help us quote accurately"
                  />
                </Field>
              </div>
            ) : null}

            {step === 8 ? <ReviewStep data={data} onEdit={setStep} /> : null}

            {error ? (
              <p className="mt-6 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
                {error}
              </p>
            ) : null}

            {/* Desktop step controls. On phones these live in the sticky bar
                below so Continue is always under the thumb. */}
            <div className="mt-9 hidden items-center justify-between gap-3 sm:flex">
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl px-4 text-[15px] font-semibold text-muted-foreground transition-colors hover:text-foreground disabled:opacity-0"
              >
                <ArrowLeft className="size-4" aria-hidden />
                Back
              </button>
              {step < stepTitles.length - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-highlight px-7 text-base font-bold text-highlight-foreground transition-transform hover:-translate-y-0.5"
                >
                  Continue
                  <ArrowRight className="size-4" aria-hidden />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-highlight px-7 text-base font-bold text-highlight-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-70"
                >
                  {submitting ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                  ) : (
                    <Check className="size-4" aria-hidden />
                  )}
                  {submitting ? "Sending…" : "Submit request"}
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:flex-wrap sm:items-center">
            <p className="flex-1 text-sm text-muted-foreground">
              Would rather talk it through? Call or message us — {business.businessHours}.
            </p>
            <div
              className={cn(
                "grid gap-2.5 sm:contents",
                whatsappLink ? "grid-cols-2" : "grid-cols-1",
              )}
            >
              <CallButton size="sm" variant="outline" showNumber />
              <WhatsAppButton size="sm" />
            </div>
          </div>
        </div>
      </Container>

      {/* Sticky mobile step controls. Replaces the site-wide action bar on this
          page so there is only ever one primary action on screen. */}
      <div className="sticky bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur-xl sm:hidden">
        <div className="flex items-center gap-2.5 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
          {step > 0 ? (
            <button
              type="button"
              onClick={back}
              aria-label="Back"
              className="inline-flex size-13 shrink-0 items-center justify-center rounded-xl border border-input"
            >
              <ArrowLeft className="size-5" aria-hidden />
            </button>
          ) : null}
          {step < stepTitles.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex h-13 flex-1 items-center justify-center gap-2 rounded-xl bg-highlight text-[15px] font-bold text-highlight-foreground active:brightness-95"
            >
              Continue
              <ArrowRight className="size-4" aria-hidden />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className="inline-flex h-13 flex-1 items-center justify-center gap-2 rounded-xl bg-highlight text-[15px] font-bold text-highlight-foreground disabled:opacity-70"
            >
              {submitting ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : (
                <Check className="size-4" aria-hidden />
              )}
              {submitting ? "Sending…" : "Submit request"}
            </button>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}

/* ------------------------------ review + done ----------------------------- */

function ReviewRow({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border py-3.5 last:border-0">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 whitespace-pre-line text-[15px]">{value || "—"}</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="shrink-0 text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        Edit
      </button>
    </div>
  );
}

function ReviewStep({ data, onEdit }: { data: QuoteRequest; onEdit: (step: number) => void }) {
  const addressSummary = (a: QuoteAddress) =>
    [a.postcode, a.address, a.propertyType, a.floor, a.lift, a.access].filter(Boolean).join(" · ");

  const moveTypeLabel = moveTypes.find((m) => m.value === data.moveType)?.label ?? "";
  const dateLabel = [dateStatuses.find((d) => d.value === data.dateStatus)?.label, data.moveDate]
    .filter(Boolean)
    .join(" · ");

  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight">Check your details</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Have a quick look, then send it over. Nothing here is fixed — we'll confirm everything with
        you.
      </p>
      <div className="mt-6">
        <ReviewRow
          label="Your move"
          value={[moveTypeLabel, data.propertySize].filter(Boolean).join(" · ")}
          onEdit={() => onEdit(0)}
        />
        <ReviewRow label="Moving from" value={addressSummary(data.from)} onEdit={() => onEdit(1)} />
        <ReviewRow label="Moving to" value={addressSummary(data.to)} onEdit={() => onEdit(2)} />
        <ReviewRow label="Moving date" value={dateLabel} onEdit={() => onEdit(3)} />
        <ReviewRow
          label="What needs moving"
          value={[data.items.join(", "), data.itemNotes].filter(Boolean).join("\n")}
          onEdit={() => onEdit(4)}
        />
        <ReviewRow label="Extra help" value={data.extras.join(", ")} onEdit={() => onEdit(5)} />
        <ReviewRow
          label="Your details"
          value={[data.name, data.phone, data.email, data.contactPreference]
            .filter(Boolean)
            .join(" · ")}
          onEdit={() => onEdit(6)}
        />
        <ReviewRow label="Notes" value={data.notes} onEdit={() => onEdit(7)} />
      </div>
    </div>
  );
}

function SuccessScreen({ delivered, data }: { delivered: boolean; data: QuoteRequest }) {
  const summary = formatQuoteRequest(data);
  const emailFallback = `${mailtoLink}?subject=${encodeURIComponent(
    `Removals enquiry — ${data.name}`,
  )}&body=${encodeURIComponent(summary)}`;
  const whatsappFallback = whatsapp.number
    ? `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(summary)}`
    : null;

  return (
    <Container className="py-16 sm:py-24">
      <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 text-center sm:p-12">
        <span className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-highlight text-highlight-foreground">
          <PartyPopper className="size-6" aria-hidden />
        </span>
        <h1 className="mt-6 text-3xl font-black tracking-tight">
          Thanks — we've received your move details.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {businessClaims.quoteResponseTime
            ? `Our team will review your move and get back to you ${businessClaims.quoteResponseTime}.`
            : "Our team will review your move and get in touch shortly."}
        </p>

        {businessClaims.available24Hours ? (
          <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Clock className="size-4" aria-hidden />
            {business.businessHours} — call any time
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CallButton size="lg" showNumber />
          <WhatsAppButton size="lg" />
        </div>

        {!delivered ? (
          <div className="mt-9 rounded-2xl border border-border bg-surface p-6 text-left">
            <p className="text-sm font-bold">One quick thing</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We couldn't send this automatically just now. Send it straight to us instead — the
              details you entered are already filled in.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={emailFallback}
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-5 text-[15px] font-semibold text-primary-foreground"
              >
                Email my details
              </a>
              {whatsappFallback ? (
                <a
                  href={whatsappFallback}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-input px-5 text-[15px] font-semibold"
                >
                  Send on WhatsApp
                </a>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="mt-9 border-t border-border pt-7">
          <Link to="/" className="text-sm font-semibold hover:underline">
            Back to the homepage
          </Link>
        </div>
      </div>
    </Container>
  );
}
