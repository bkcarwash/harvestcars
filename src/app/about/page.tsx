import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Star } from "lucide-react";
import { reviewStats, businessInfo } from "@/lib/data";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { Breadcrumb } from "@/components/shared/Breadcrumb";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Harvest Cars — a trusted used car dealership with a 5.0-star Google rating. We are known for honest, transparent sales, full vehicle histories, and outstanding aftercare.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Transparency First",
    body: "We send all vehicle documents — service history, MOT records, and any relevant paperwork — to buyers before they visit. You should never need to travel blind.",
  },
  {
    title: "No-Pressure Sales",
    body: "We genuinely believe buying a car should be enjoyable. Our team is friendly and informative, never pushy. Take your time, ask questions, and decide on your own terms.",
  },
  {
    title: "Honest Descriptions",
    body: "Every listing we publish reflects the actual condition of the car. What you see online is what you get. Customer reviews consistently validate this — the car is always as described.",
  },
  {
    title: "Outstanding Aftercare",
    body: "Our relationship with customers doesn't end at the handover. We're here for questions, advice, and support long after you've driven away.",
  },
  {
    title: "Fair, Researched Pricing",
    body: "We price every car against current market data to ensure you're getting genuine value — not inflated margins hidden behind negotiation theatre.",
  },
  {
    title: "Same-Day Delivery",
    body: "Need a car urgently? Our low-cost same-day delivery service gets your car to you fast, without compromise on quality or service.",
  },
];

export default function AboutPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: businessInfo.url },
    { name: "About Us", url: `${businessInfo.url}/about` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
        {/* Hero */}
        <div className="max-w-3xl mb-16">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            About Harvest Cars
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#FAFAFA] mb-5 leading-tight">
            A Different Kind of Used Car Dealership
          </h1>

          {/* AIO entity summary — direct declarative sentences for AI extraction */}
          <div className="space-y-4 text-[#A1A1AA] text-lg leading-relaxed">
            <p>
              Harvest Cars is a used car dealership with a 5.0-star rating from{" "}
              {reviewStats.reviewCount} Google reviews, known for transparent vehicle
              history, no-pressure sales, and competitive pricing.
            </p>
            <p>
              We were founded on a simple belief: buying a used car shouldn&apos;t be
              stressful or opaque. Too many dealerships rely on information asymmetry —
              keeping buyers in the dark to control the sale. We do the opposite. All
              documents are available before you visit. Descriptions are accurate. Prices
              are fair. And our team is here to help, not to push.
            </p>
            <p>
              The result? Customers who come back for their next car, and who recommend us
              to friends and family. Our review score of {reviewStats.ratingValue} stars
              from {reviewStats.reviewCount} Google reviews reflects that approach.
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {[
            { value: `${reviewStats.ratingValue}★`, label: "Google Rating" },
            { value: `${reviewStats.reviewCount}+`, label: "Happy Customers" },
            { value: "100%", label: "Honest Listings" },
            { value: "Same Day", label: "Delivery Available" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="text-center p-5 rounded-xl card-elevated"
            >
              <p className="font-heading text-3xl font-bold text-gold mb-1">{value}</p>
              <p className="text-[#A1A1AA] text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="font-heading text-3xl font-bold text-[#FAFAFA] mb-8">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="p-6 rounded-xl card-surface">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-gold flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-heading text-[#FAFAFA] font-semibold mb-2">
                      {v.title}
                    </h3>
                    <p className="text-[#A1A1AA] text-sm leading-relaxed">{v.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aftercare policy */}
        <div className="rounded-xl card-elevated p-8 mb-16">
          <h2 className="font-heading text-2xl font-bold text-[#FAFAFA] mb-4">
            Our Aftercare Policy
          </h2>
          <p className="text-[#A1A1AA] leading-relaxed mb-4">
            At Harvest Cars, aftercare isn&apos;t an afterthought. Our customers are
            encouraged to contact us with any questions or concerns after purchase. We
            provide vehicle maintenance advice, answer technical questions, and in the
            rare event of an issue, we work with customers fairly to reach a resolution.
          </p>
          <p className="text-[#A1A1AA] leading-relaxed">
            This commitment to aftercare is reflected in our reviews — buyers regularly
            mention that the team was helpful and responsive long after the car changed
            hands. That&apos;s not an accident; it&apos;s how we choose to operate.
          </p>
          {/* TODO: Add specific aftercare/returns policy details when confirmed */}
        </div>

        {/* Google reviews highlight */}
        <div className="rounded-xl card-surface p-8 mb-12 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="flex mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={24} className="text-gold fill-gold" aria-hidden="true" />
              ))}
            </div>
            <p className="font-heading text-4xl font-bold text-gold">
              {reviewStats.ratingValue.toFixed(1)}
            </p>
            <p className="text-[#A1A1AA] text-sm">
              {reviewStats.reviewCount} Google Reviews
            </p>
          </div>
          <div>
            <p className="text-[#FAFAFA] font-semibold mb-2">
              Verified by Google Business Profile
            </p>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">
              Every review is left by a genuine buyer on Google. We have never incentivised
              reviews or asked customers to remove negative feedback. The score stands on
              its own merits.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
          <Link
            href="/inventory"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-[#0A0A0B] bg-gold rounded-lg hover:bg-[#E5C84A] transition-colors min-h-[48px]"
          >
            Browse Our Cars
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link
            href="/reviews"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-[#FAFAFA] border border-[#27272A] rounded-lg hover:border-gold hover:text-gold transition-colors min-h-[48px]"
          >
            Read Customer Reviews
          </Link>
          <Link
            href="/financing"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-[#FAFAFA] border border-[#27272A] rounded-lg hover:border-gold hover:text-gold transition-colors min-h-[48px]"
          >
            Finance Options
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-[#FAFAFA] border border-[#27272A] rounded-lg hover:border-gold hover:text-gold transition-colors min-h-[48px]"
          >
            Contact the Team
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
