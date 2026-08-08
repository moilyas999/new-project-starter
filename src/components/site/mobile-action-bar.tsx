import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone, Sparkles } from "lucide-react";

import { business, telLink, whatsappLink } from "@/config/business";

/**
 * Sticky bottom actions on mobile only: Call / WhatsApp / Get Quote.
 * Kept to a single compact row so it never covers page content it shouldn't —
 * page layout adds bottom padding to compensate.
 */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md sm:hidden">
      <div className="grid grid-cols-3 divide-x divide-border">
        <a
          href={telLink(business.primaryPhoneTel)}
          className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold"
        >
          <Phone className="size-5" aria-hidden />
          Call
        </a>
        {whatsappLink ? (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold"
          >
            <MessageCircle className="size-5" aria-hidden />
            WhatsApp
          </a>
        ) : (
          <a
            href={`mailto:${business.email}`}
            className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold"
          >
            <MessageCircle className="size-5" aria-hidden />
            Email
          </a>
        )}
        <Link
          to="/quote"
          className="flex flex-col items-center gap-1 bg-highlight py-2.5 text-[11px] font-bold text-highlight-foreground"
        >
          <Sparkles className="size-5" aria-hidden />
          Get Quote
        </Link>
      </div>
    </div>
  );
}
