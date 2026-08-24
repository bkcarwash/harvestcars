import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
  showLabel?: boolean;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 16,
  className,
  showLabel = false,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const partial = rating - fullStars;

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`${rating} out of ${maxRating} stars`}
    >
      {Array.from({ length: maxRating }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={cn(
            i < fullStars
              ? "text-gold fill-gold"
              : i === fullStars && partial > 0
              ? "text-gold"
              : "text-[#3F3F46]"
          )}
          style={
            i === fullStars && partial > 0
              ? {
                  clipPath: `inset(0 ${(1 - partial) * 100}% 0 0)`,
                }
              : undefined
          }
          aria-hidden="true"
        />
      ))}
      {showLabel && (
        <span className="ml-1 text-sm font-semibold text-[#FAFAFA]">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
