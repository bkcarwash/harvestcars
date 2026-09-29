import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Star, MessageCircle } from "lucide-react";
import { businessInfo, reviewStats } from "@/lib/data";

const footerLinks = {
  "Quick Links": [
    { href: "/inventory", label: "Cars for Sale" },
    { href: "/about", label: "About Us" },
    { href: "/reviews", label: "Customer Reviews" },
    { href: "/financing", label: "Finance Options" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact Us" },
  ],
  "Browse By Make": [
    { href: "/inventory?make=Audi", label: "Audi" },
    { href: "/inventory?make=Volkswagen", label: "Volkswagen" },
    { href: "/inventory?make=Skoda", label: "Skoda" },
    { href: "/inventory?make=Lexus", label: "Lexus" },
    { href: "/inventory?make=Toyota", label: "Toyota" },
    { href: "/inventory?make=Kia", label: "Kia" },
  ],
};

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-[#0A0A0B] border-t border-[#27272A] mt-auto">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="h-8 w-14 bg-white rounded flex-shrink-0 overflow-hidden">
                <Image
                  src="/logo.webp"
                  alt=""
                  width={56}
                  height={32}
                  sizes="56px"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-[#FAFAFA] font-heading font-bold text-xl tracking-tight">
                Harvest<span className="text-gold">Cars</span>
              </span>
            </Link>

            <p className="text-[#A1A1AA] text-sm leading-relaxed mb-5">
              Harvest Cars is a used car dealership known for transparent, no-pressure sales,
              full vehicle histories, and outstanding aftercare.
            </p>

            {/* Google Rating Badge */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-[#141416] border border-[#27272A] inline-flex w-fit">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-gold fill-gold"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-[#FAFAFA] text-sm font-semibold">
                {reviewStats.ratingValue.toFixed(1)}
              </span>
              <span className="text-[#A1A1AA] text-xs">
                ({reviewStats.reviewCount} Google reviews)
              </span>
            </div>
          </div>

          {/* Nav Columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <nav key={heading} aria-label={heading}>
              <h3 className="text-[#FAFAFA] font-semibold text-sm uppercase tracking-wider mb-4">
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#A1A1AA] text-sm hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact Column — NAP block (must match GBP exactly) */}
          <address className="not-italic">
            <h3 className="text-[#FAFAFA] font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${businessInfo.telephone}`}
                  className="flex items-start gap-3 text-[#A1A1AA] text-sm hover:text-gold transition-colors group"
                >
                  <Phone
                    size={15}
                    className="mt-0.5 flex-shrink-0 group-hover:text-gold transition-colors"
                    aria-hidden="true"
                  />
                  {/* TODO: Replace with real phone number */}
                  <span>{businessInfo.telephone}</span>
                </a>
              </li>
              <li>
                <a
                  href={businessInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-[#A1A1AA] text-sm hover:text-gold transition-colors group"
                >
                  <MessageCircle
                    size={15}
                    className="mt-0.5 flex-shrink-0 group-hover:text-gold transition-colors"
                    aria-hidden="true"
                  />
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${businessInfo.email}`}
                  className="flex items-start gap-3 text-[#A1A1AA] text-sm hover:text-gold transition-colors group"
                >
                  <Mail
                    size={15}
                    className="mt-0.5 flex-shrink-0 group-hover:text-gold transition-colors"
                    aria-hidden="true"
                  />
                  {/* TODO: Replace with real email */}
                  <span>{businessInfo.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={businessInfo.googleBusinessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-[#A1A1AA] text-sm hover:text-gold transition-colors group"
                >
                  <MapPin
                    size={15}
                    className="mt-0.5 flex-shrink-0 group-hover:text-gold transition-colors"
                    aria-hidden="true"
                  />
                  {/* TODO: Replace with real address */}
                  <span>
                    {businessInfo.address.streetAddress}
                    <br />
                    {businessInfo.address.addressLocality},{" "}
                    {businessInfo.address.postalCode}
                  </span>
                </a>
              </li>
            </ul>

            {/* Opening Hours */}
            <div className="mt-5">
              <p className="text-[#71717A] text-xs uppercase tracking-wider mb-2">
                Opening Hours
              </p>
              <p className="text-[#A1A1AA] text-sm">
                {/* TODO: Confirm real opening hours */}
                Mon–Fri: 9am–6pm
                <br />
                Saturday: 9am–5pm
                <br />
                Sunday: 10am–3pm
              </p>
            </div>
          </address>
        </div>
      </div>

      {/* Trusted Partners */}
      <div className="border-t border-[#27272A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center gap-3">
          <p className="text-[#71717A] text-xs uppercase tracking-wider shrink-0">
            Trusted Auto Detailing Partners in Manchester:
          </p>
          <ul className="flex flex-wrap items-center gap-4">
            <li>
              <a
                href="https://www.latinkingdetailing.co.uk/"
                rel="dofollow"
                title="Latin King Detailing Manchester"
                className="text-[#A1A1AA] text-xs hover:text-gold transition-colors"
              >
                latinkingdetailing
              </a>
            </li>
            <li>
              <a
                href="https://www.srvdetailing.co.uk/"
                rel="dofollow"
                title="SRV Detailing Manchester"
                className="text-[#A1A1AA] text-xs hover:text-gold transition-colors"
              >
                srvdetailing.co.uk
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#27272A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#71717A] text-xs text-center sm:text-left">
            © {currentYear} {businessInfo.name}. All rights reserved.
            {/* TODO: Add company registration number and registered address */}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/faq" className="text-[#71717A] text-xs hover:text-[#A1A1AA] transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-[#71717A] text-xs hover:text-[#A1A1AA] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-[#71717A] text-xs hover:text-[#A1A1AA] transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
