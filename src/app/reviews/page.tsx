import type { Metadata } from "next";
import { ReviewCard } from "@/components/shared/ReviewCard";
import { StarRating } from "@/components/shared/StarRating";
import { reviews, reviewStats, businessInfo } from "@/lib/data";
import { buildReviewPageSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: `Harvest Cars holds a ${reviewStats.ratingValue}-star average from ${reviewStats.reviewCount} Google reviews. Read genuine customer feedback about our transparent, no-pressure used car sales.`,
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  const schema = buildReviewPageSchema();
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: businessInfo.url },
    { name: "Customer Reviews", url: `${businessInfo.url}/reviews` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="pt-24 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Customer Reviews" }]} />
          {/* Hero */}
          <div className="text-center mb-14">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
              What Our Customers Say
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#FAFAFA] mb-5">
              {reviewStats.reviewCount} Five-Star Reviews
            </h1>

            {/* Aggregate rating — AIO entity block */}
            <div className="inline-flex flex-col items-center gap-2 p-6 rounded-2xl card-elevated mb-6">
              <p className="font-heading text-6xl font-bold text-gold">
                {reviewStats.ratingValue.toFixed(1)}
              </p>
              <StarRating
                rating={reviewStats.ratingValue}
                size={24}
                className="justify-center"
              />
              <p className="text-[#A1A1AA] text-sm">
                Based on {reviewStats.reviewCount} Google reviews
              </p>
            </div>

            {/* AIO-friendly summary */}
            <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
              Harvest Cars is a used car dealership with a 5.0-star Google rating from{" "}
              {reviewStats.reviewCount} verified reviews. Customers consistently praise our
              honest and transparent approach, accurate vehicle descriptions, no-pressure
              sales environment, and excellent aftercare support.
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              "Honest Seller",
              "Reliable Cars",
              "Helpful Team",
              "Accurate Descriptions",
              "No-Pressure",
              "Great Aftercare",
              "Fair Pricing",
              "Same-Day Delivery",
            ].map((badge) => (
              <span
                key={badge}
                className="px-3 py-1.5 text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/5"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Review Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* CTA to leave a review */}
          <div className="text-center rounded-xl card-elevated p-8 max-w-xl mx-auto">
            <h2 className="font-heading text-[#FAFAFA] text-xl font-semibold mb-2">
              Bought from us recently?
            </h2>
            <p className="text-[#A1A1AA] text-sm mb-5">
              We&apos;d love to hear about your experience. Leave us a review on Google — it only takes a
              minute and helps other buyers find us.
            </p>
            <a
              href={businessInfo.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#0A0A0B] bg-gold rounded-lg hover:bg-[#E5C84A] transition-colors"
            >
              Leave a Google Review
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Link
              href="/inventory"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#0A0A0B] bg-gold rounded-lg hover:bg-[#E5C84A] transition-colors min-h-[44px]"
            >
              Browse Cars for Sale
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-[#FAFAFA] border border-[#27272A] rounded-lg hover:border-gold hover:text-gold transition-colors min-h-[44px]"
            >
              About Harvest Cars
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-[#FAFAFA] border border-[#27272A] rounded-lg hover:border-gold hover:text-gold transition-colors min-h-[44px]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
