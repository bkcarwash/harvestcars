"use client";

import Link from "next/link";
import { Phone, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { businessInfo, reviewStats } from "@/lib/data";

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
      aria-label="Harvest Cars — Welcome"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 hero-radial pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(to right, #D4AF37 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Trust pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141416] border border-[#27272A] mb-6"
          >
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className="text-gold fill-gold"
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="text-[#FAFAFA] text-xs font-semibold">
              {reviewStats.ratingValue.toFixed(1)} Stars
            </span>
            <span className="text-[#71717A] text-xs">
              · {reviewStats.reviewCount} Google Reviews
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-[#FAFAFA] leading-[1.05] tracking-tight mb-6"
          >
            Find Your <span className="text-gold">Next Car</span>
            <br aria-hidden="true" />{" "}
            With Confidence
          </motion.h1>

          {/* Sub-headline — AIO entity summary */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#A1A1AA] text-lg sm:text-xl leading-relaxed mb-8 max-w-xl"
          >
            Harvest Cars is a used car dealership with a 5.0-star rating from{" "}
            {reviewStats.reviewCount} Google reviews. We are known for transparent
            vehicle histories, no-pressure sales, and competitive pricing.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
          >
            <Link
              href="/inventory"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-[#0A0A0B] bg-gold rounded-lg hover:bg-[#E5C84A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B] min-h-[48px]"
            >
              Browse Cars for Sale
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a
              href={`tel:${businessInfo.telephone}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-[#FAFAFA] border border-[#27272A] rounded-lg hover:border-gold hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B] min-h-[48px]"
            >
              <Phone size={16} aria-hidden="true" />
              {/* TODO: Replace with real phone number */}
              Call Now
            </a>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            {[
              "Honest & Transparent",
              "Full Service Histories",
              "No-Pressure Sales",
              "Same-Day Delivery",
            ].map((trust) => (
              <div
                key={trust}
                className="flex items-center gap-1.5 text-sm text-[#A1A1AA]"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"
                  aria-hidden="true"
                />
                {trust}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0A0A0B] to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
