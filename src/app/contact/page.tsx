import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageCircle, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { businessInfo } from "@/lib/data";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Harvest Cars by phone, WhatsApp, email, or visit us in person. We are friendly, no-pressure, and happy to answer any questions about our used car stock.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: businessInfo.url },
    { name: "Contact", url: `${businessInfo.url}/contact` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        {/* Header */}
        <div className="mb-12">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Get in Touch
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#FAFAFA] mb-4">
            Contact Harvest Cars
          </h1>
          <p className="text-[#A1A1AA] text-lg max-w-xl">
            We&apos;re here to help — whether you have a question about a specific car,
            want to arrange a test drive, or just want to talk through your options.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact methods — NAP block matching GBP exactly */}
            <address className="not-italic space-y-5">
              <h2 className="font-heading text-[#FAFAFA] text-xl font-semibold mb-4">
                How to Reach Us
              </h2>

              {/* Phone */}
              <a
                href={`tel:${businessInfo.telephone}`}
                className="flex items-start gap-4 p-4 rounded-xl card-surface hover:border-[#D4AF37]/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[#27272A] flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37]/10 transition-colors">
                  <Phone size={18} className="text-gold" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[#FAFAFA] font-semibold text-sm">Phone</p>
                  {/* TODO: Replace with real phone number */}
                  <p className="text-[#A1A1AA] text-sm mt-0.5">{businessInfo.telephone}</p>
                  <p className="text-[#71717A] text-xs mt-1">
                    Mon–Fri 9am–6pm, Sat 9am–5pm
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={businessInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl card-surface hover:border-[#D4AF37]/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[#27272A] flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37]/10 transition-colors">
                  <MessageCircle size={18} className="text-gold" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[#FAFAFA] font-semibold text-sm">WhatsApp</p>
                  <p className="text-[#A1A1AA] text-sm mt-0.5">Message us any time</p>
                  <p className="text-[#71717A] text-xs mt-1">Usually replies quickly</p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${businessInfo.email}`}
                className="flex items-start gap-4 p-4 rounded-xl card-surface hover:border-[#D4AF37]/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[#27272A] flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37]/10 transition-colors">
                  <Mail size={18} className="text-gold" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[#FAFAFA] font-semibold text-sm">Email</p>
                  {/* TODO: Replace with real email */}
                  <p className="text-[#A1A1AA] text-sm mt-0.5">{businessInfo.email}</p>
                </div>
              </a>

              {/* Address */}
              <a
                href={businessInfo.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl card-surface hover:border-[#D4AF37]/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[#27272A] flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37]/10 transition-colors">
                  <MapPin size={18} className="text-gold" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[#FAFAFA] font-semibold text-sm">Visit Us</p>
                  {/* TODO: Replace with real address */}
                  <p className="text-[#A1A1AA] text-sm mt-0.5">
                    {businessInfo.address.streetAddress}
                    <br />
                    {businessInfo.address.addressLocality},{" "}
                    {businessInfo.address.postalCode}
                  </p>
                  <p className="text-gold text-xs mt-1">Get directions →</p>
                </div>
              </a>
            </address>

            {/* Opening Hours */}
            <div className="p-5 rounded-xl card-elevated">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-gold" aria-hidden="true" />
                <h3 className="text-[#FAFAFA] font-semibold text-sm">
                  Opening Hours
                </h3>
                {/* TODO: Confirm real opening hours */}
              </div>
              <div className="space-y-2">
                {businessInfo.openingHours.map((h) => (
                  <div key={h.dayOfWeek} className="flex justify-between text-sm">
                    <span className="text-[#A1A1AA]">{h.dayOfWeek}</span>
                    <span className="text-[#FAFAFA] font-medium">
                      {h.opens} – {h.closes}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Maps embed — lazy-loaded, no JS required */}
            <div className="rounded-xl overflow-hidden border border-[#27272A] aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2480.8968351577514!2d-0.1741709!3d51.5517907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761bb0a76ef79b%3A0xe885dea3468b96ee!2sHarvest%20Cars!5e0!3m2!1sen!2s!4v1787569346945!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Harvest Cars location on Google Maps"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="font-heading text-[#FAFAFA] text-xl font-semibold mb-6">
              Send Us a Message
            </h2>
            <ContactForm />

            {/* Related links */}
            <div className="mt-8 pt-6 border-t border-[#27272A] flex flex-wrap gap-4 text-sm">
              <Link href="/inventory" className="inline-flex items-center gap-1.5 text-gold hover:text-[#E5C84A] transition-colors">
                Browse cars for sale <ArrowRight size={13} aria-hidden="true" />
              </Link>
              <Link href="/financing" className="inline-flex items-center gap-1.5 text-gold hover:text-[#E5C84A] transition-colors">
                Finance options <ArrowRight size={13} aria-hidden="true" />
              </Link>
              <Link href="/faq" className="inline-flex items-center gap-1.5 text-gold hover:text-[#E5C84A] transition-colors">
                FAQs <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
