import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReviewCard } from "@/components/shared/ReviewCard";
import { reviews, reviewStats } from "@/lib/data";
import { StarRating } from "@/components/shared/StarRating";

export function ReviewHighlights() {
  const featured = reviews.slice(0, 3);

  return (
    <section
      className="py-20 bg-[#0A0A0B]"
      aria-labelledby="reviews-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Aggregate block — AIO-friendly: self-contained entity summary */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
              Customer Reviews
            </p>
            <h2
              id="reviews-heading"
              className="font-heading text-3xl sm:text-4xl font-bold text-[#FAFAFA] mb-4"
            >
              Trusted by Hundreds of Happy Buyers
            </h2>
            <p className="text-[#A1A1AA] text-lg max-w-xl">
              Our customers consistently rate us 5 stars for honesty, transparency, and
              outstanding service. Here&apos;s what some of them have to say.
            </p>
          </div>

          {/* Aggregate rating block */}
          <div className="flex-shrink-0 p-6 rounded-xl card-elevated text-center min-w-[180px]">
            <p
              className="font-heading text-5xl font-bold text-gold mb-1"
              aria-label={`${reviewStats.ratingValue} out of 5 stars`}
            >
              {reviewStats.ratingValue.toFixed(1)}
            </p>
            <StarRating
              rating={reviewStats.ratingValue}
              size={18}
              className="justify-center mb-2"
            />
            <p className="text-[#A1A1AA] text-sm">
              {reviewStats.reviewCount} Google reviews
            </p>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {featured.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-[#E5C84A] transition-colors group"
          >
            Read All {reviewStats.reviewCount} Reviews
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
