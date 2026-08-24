import { Quote } from "lucide-react";
import { StarRating } from "@/components/shared/StarRating";
import { type Review } from "@/lib/data";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const initials = review.author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <article className="rounded-xl p-5 card-elevated flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8962A] flex items-center justify-center flex-shrink-0"
            aria-hidden="true"
          >
            <span className="text-[#0A0A0B] text-sm font-bold font-heading">
              {initials}
            </span>
          </div>
          <div>
            <p className="text-[#FAFAFA] text-sm font-semibold">{review.author}</p>
            {review.vehicle && (
              <p className="text-[#71717A] text-xs">{review.vehicle}</p>
            )}
          </div>
        </div>
        {/* Google badge */}
        <div className="flex-shrink-0 text-xs text-[#71717A] font-medium">
          Google ★
        </div>
      </div>

      {/* Rating */}
      <StarRating rating={review.rating} size={14} />

      {/* Quote body */}
      <blockquote className="relative flex-1">
        <Quote
          size={18}
          className="text-[#D4AF37]/30 mb-2"
          aria-hidden="true"
        />
        <p className="text-[#A1A1AA] text-sm leading-relaxed">&ldquo;{review.body}&rdquo;</p>
      </blockquote>

      {/* Date */}
      <time
        dateTime={review.date}
        className="text-[#3F3F46] text-xs"
      >
        {new Date(review.date).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
        })}
      </time>
    </article>
  );
}
