import Link from "next/link";
import { Phone, MessageCircle, MapPin, Clock, ArrowRight } from "lucide-react";
import { businessInfo } from "@/lib/data";

const contactMethods = [
  {
    icon: Phone,
    label: "Phone",
    value: businessInfo.telephone, // TODO: Replace with real phone
    action: `tel:${businessInfo.telephone}`,
    cta: "Call Now",
    external: false,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message us any time",
    action: businessInfo.whatsappUrl,
    cta: "Open WhatsApp",
    external: true,
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: `${businessInfo.address.streetAddress}, ${businessInfo.address.addressLocality}`, // TODO: Real address
    action: businessInfo.googleBusinessUrl,
    cta: "Get Directions",
    external: true,
  },
];

const hours = businessInfo.openingHours;

export function ContactSection() {
  return (
    <section
      className="py-20 bg-[#0A0A0B]"
      aria-labelledby="contact-section-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Get in Touch
          </p>
          <h2
            id="contact-section-heading"
            className="font-heading text-3xl sm:text-4xl font-bold text-[#FAFAFA] mb-4"
          >
            Ready to Find Your Next Car?
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-xl mx-auto">
            Call us, WhatsApp us, or come visit. We&apos;re friendly, no-pressure,
            and always happy to answer questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Contact Method Cards */}
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <a
                key={method.label}
                href={method.action}
                target={method.external ? "_blank" : undefined}
                rel={method.external ? "noopener noreferrer" : undefined}
                className="group p-6 rounded-xl card-surface hover:border-[#D4AF37]/40 hover:glow-gold transition-all duration-300 flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-[#27272A] flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-colors">
                  <Icon size={22} className="text-gold" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[#FAFAFA] font-semibold text-base">{method.label}</p>
                  <p className="text-[#A1A1AA] text-sm mt-1">{method.value}</p>
                </div>
                <span className="mt-2 text-sm font-semibold text-gold group-hover:text-[#E5C84A] transition-colors inline-flex items-center gap-1">
                  {method.cta}
                  <ArrowRight size={14} aria-hidden="true" />
                </span>
              </a>
            );
          })}
        </div>

        {/* Opening Hours */}
        <div className="rounded-xl card-elevated p-6 max-w-2xl mx-auto mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} className="text-gold" aria-hidden="true" />
            <h3 className="text-[#FAFAFA] font-semibold">Opening Hours</h3>
            {/* TODO: Confirm real opening hours */}
          </div>
          <div className="grid grid-cols-2 gap-y-2 gap-x-8">
            {hours.map((h) => (
              <div key={h.dayOfWeek} className="flex justify-between text-sm">
                <span className="text-[#A1A1AA]">{h.dayOfWeek}</span>
                <span className="text-[#FAFAFA] font-medium">
                  {h.opens} – {h.closes}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Map Placeholder — TODO: Replace with real Google Maps embed */}
        <div className="rounded-xl overflow-hidden border border-[#27272A] aspect-[16/6] bg-[#141416] flex items-center justify-center mb-8">
          <div className="text-center">
            <MapPin size={32} className="text-[#3F3F46] mx-auto mb-3" aria-hidden="true" />
            <p className="text-[#71717A] text-sm">
              {/* TODO: Replace this div with a real Google Maps iframe embed */}
              Map loading…{" "}
              <a
                href={businessInfo.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                View on Google Maps
              </a>
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-[#FAFAFA] border border-[#27272A] rounded-lg hover:border-gold hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B] min-h-[48px]"
          >
            Full Contact Page
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
