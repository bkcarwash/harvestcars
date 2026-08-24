import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VehicleCard } from "@/components/shared/VehicleCard";
import { getFeaturedVehicles } from "@/lib/data";

export function FeaturedInventory() {
  const featured = getFeaturedVehicles();

  return (
    <section
      className="py-20 bg-[#0A0A0B]"
      aria-labelledby="featured-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
              Latest Stock
            </p>
            <h2
              id="featured-heading"
              className="font-heading text-3xl sm:text-4xl font-bold text-[#FAFAFA]"
            >
              Featured Cars for Sale
            </h2>
          </div>
          <Link
            href="/inventory"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-[#E5C84A] transition-colors flex-shrink-0 group"
          >
            View All Cars
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {featured.slice(0, 4).map((vehicle, index) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} priority={index < 2} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/inventory"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-[#0A0A0B] bg-gold rounded-lg hover:bg-[#E5C84A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B] min-h-[48px]"
          >
            Browse All Cars for Sale
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
