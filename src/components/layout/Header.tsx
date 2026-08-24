"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { businessInfo } from "@/lib/data";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Cars for Sale" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/financing", label: "Finance" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0A0A0B]/95 backdrop-blur-md border-b border-[#27272A] shadow-lg"
          : "bg-transparent"
      )}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus-visible:outline-none"
            aria-label="Harvest Cars — home"
          >
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-14 bg-white rounded flex-shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                <Image
                  src="/logo.webp"
                  alt=""
                  width={56}
                  height={32}
                  sizes="56px"
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
              <span className="text-[#FAFAFA] font-heading font-bold text-xl tracking-tight">
                Harvest<span className="text-gold">Cars</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === link.href
                    ? "text-gold"
                    : "text-[#A1A1AA] hover:text-[#FAFAFA]"
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${businessInfo.telephone}`}
              className="flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
            >
              <Phone size={15} />
              {/* TODO: Replace with real phone number */}
              <span>Call Us</span>
            </a>
            <Link
              href="/inventory"
              className="px-4 py-2 text-sm font-semibold text-[#0A0A0B] bg-gold rounded-md hover:bg-[#E5C84A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B]"
            >
              View Cars
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-[#27272A] bg-[#0A0A0B] pb-4"
          >
            <div className="pt-2 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-3 text-base font-medium rounded-md transition-colors min-h-[44px] flex items-center",
                    pathname === link.href
                      ? "text-gold bg-[#141416]"
                      : "text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#141416]"
                  )}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 px-4 flex flex-col gap-3">
              <a
                href={`tel:${businessInfo.telephone}`}
                className="flex items-center justify-center gap-2 py-3 text-base font-semibold text-[#FAFAFA] border border-[#27272A] rounded-md hover:border-gold transition-colors min-h-[44px]"
              >
                <Phone size={16} />
                {/* TODO: Replace with real phone number */}
                Call Us Now
              </a>
              <Link
                href="/inventory"
                className="flex items-center justify-center py-3 text-base font-semibold text-[#0A0A0B] bg-gold rounded-md hover:bg-[#E5C84A] transition-colors min-h-[44px]"
              >
                View Cars for Sale
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
