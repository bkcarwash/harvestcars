"use client";

import { Phone, MessageCircle, MapPin } from "lucide-react";
import { businessInfo } from "@/lib/data";

// Sticky bottom CTA bar — local-service conversion pattern
// Visible on mobile only (hidden lg:hidden)
export function MobileCTABar() {
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden"
      role="complementary"
      aria-label="Quick contact actions"
    >
      {/* Fade gradient above bar to prevent content clipping */}
      <div className="h-4 bg-gradient-to-t from-[#0A0A0B] to-transparent pointer-events-none" />

      <div className="bg-[#0A0A0B]/98 backdrop-blur-md border-t border-[#27272A] safe-area-inset-bottom">
        <div className="flex">
          {/* Call */}
          <a
            href={`tel:${businessInfo.telephone}`}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 min-h-[56px] text-[#FAFAFA] hover:text-gold hover:bg-[#141416] transition-colors active:bg-[#141416]"
            aria-label="Call Harvest Cars"
          >
            <Phone size={18} aria-hidden="true" />
            <span className="text-[10px] font-medium tracking-wide uppercase">Call</span>
          </a>

          {/* Divider */}
          <div className="w-px bg-[#27272A] self-stretch" aria-hidden="true" />

          {/* WhatsApp */}
          <a
            href={businessInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 min-h-[56px] text-[#FAFAFA] hover:text-gold hover:bg-[#141416] transition-colors active:bg-[#141416]"
            aria-label="WhatsApp Harvest Cars"
          >
            <MessageCircle size={18} aria-hidden="true" />
            <span className="text-[10px] font-medium tracking-wide uppercase">WhatsApp</span>
          </a>

          {/* Divider */}
          <div className="w-px bg-[#27272A] self-stretch" aria-hidden="true" />

          {/* Directions */}
          <a
            href={businessInfo.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 min-h-[56px] text-[#FAFAFA] hover:text-gold hover:bg-[#141416] transition-colors active:bg-[#141416]"
            aria-label="Get directions to Harvest Cars"
          >
            <MapPin size={18} aria-hidden="true" />
            <span className="text-[10px] font-medium tracking-wide uppercase">Directions</span>
          </a>
        </div>
      </div>
    </div>
  );
}
