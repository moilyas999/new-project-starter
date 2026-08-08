import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";

import { business, mailtoLink, telLink, whatsappLink } from "@/config/business";

/**
 * Sticky bottom actions, phones only: Call / WhatsApp / Get Quote.
 *
 * One compact row, safe-area aware, sitting above the page rather than over it —
 * `SiteLayout` reserves the matching space at the bottom of the document.
 */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/90 backdrop-blur-xl sm:hidden">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.35fr)] items-stretch gap-1.5 px-2.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        <a
          href={telLink(business.primaryPhoneTel)}
          className="flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-semibold active:bg-accent"
        >
          <Phone className="size-5" aria-hidden />
          Call
        </a>
        {whatsappLink ? (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-semibold active:bg-accent"
          >
            <MessageCircle className="size-5" aria-hidden />
            WhatsApp
          </a>
        ) : (
          <a
            href={mailtoLink}
            className="flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-semibold active:bg-accent"
          >
            <Mail className="size-5" aria-hidden />
            Email
          </a>
        )}
        <Link
          to="/quote"
          className="flex min-h-12 items-center justify-center gap-1.5 rounded-xl bg-highlight text-[13px] font-bold text-highlight-foreground"
        >
          Get Quote
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
