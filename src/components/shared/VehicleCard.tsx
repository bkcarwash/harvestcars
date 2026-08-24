import Link from "next/link";
import Image from "next/image";
import { Gauge, Calendar, Fuel, Settings, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Vehicle, formatPrice, formatMileage } from "@/lib/data";
import { cn } from "@/lib/utils";

interface VehicleCardProps {
  vehicle: Vehicle;
  priority?: boolean;
}

export function VehicleCard({ vehicle, priority = false }: VehicleCardProps) {
  const isAvailable = vehicle.status === "Available";

  return (
    <article className="group rounded-xl overflow-hidden card-surface hover:border-[#D4AF37]/40 hover:glow-gold transition-all duration-300 flex flex-col">
      {/* Image */}
      <Link
        href={`/inventory/${vehicle.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-[#18181B] flex-shrink-0"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={vehicle.images[0] || "/images/vehicle-placeholder.svg"}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant} — ${vehicle.colour}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority={priority}
          unoptimized={vehicle.images[0]?.endsWith(".svg")}
        />
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/60 via-transparent to-transparent" />

        {/* Status badge */}
        {!isAvailable && (
          <div className="absolute inset-0 bg-[#0A0A0B]/60 flex items-center justify-center">
            <Badge className="bg-[#27272A] text-[#A1A1AA] border-[#3F3F46] text-sm px-3 py-1">
              {vehicle.status}
            </Badge>
          </div>
        )}

        {/* Brand badge */}
        {vehicle.badge && isAvailable && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 text-xs font-semibold text-[#0A0A0B] bg-gold rounded-full">
              {vehicle.badge}
            </span>
          </div>
        )}

        {/* Price overlay */}
        <div className="absolute bottom-3 right-3">
          <span className="text-lg font-bold text-[#FAFAFA] drop-shadow-lg">
            {formatPrice(vehicle.price)}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link
          href={`/inventory/${vehicle.slug}`}
          className="group/title focus-visible:outline-none"
        >
          <h3 className="font-heading text-[#FAFAFA] text-lg font-semibold leading-tight mb-1 group-hover/title:text-gold transition-colors line-clamp-1">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-[#A1A1AA] text-sm mb-3 line-clamp-1">{vehicle.variant}</p>
        </Link>

        {/* Specs Grid */}
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-[#A1A1AA]">
            <Gauge size={13} className="flex-shrink-0 text-[#71717A]" aria-hidden="true" />
            <dt className="sr-only">Mileage</dt>
            <dd>{formatMileage(vehicle.mileage)}</dd>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[#A1A1AA]">
            <Settings size={13} className="flex-shrink-0 text-[#71717A]" aria-hidden="true" />
            <dt className="sr-only">Transmission</dt>
            <dd>{vehicle.transmission}</dd>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[#A1A1AA]">
            <Fuel size={13} className="flex-shrink-0 text-[#71717A]" aria-hidden="true" />
            <dt className="sr-only">Fuel type</dt>
            <dd>{vehicle.fuelType}</dd>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[#A1A1AA]">
            <Calendar size={13} className="flex-shrink-0 text-[#71717A]" aria-hidden="true" />
            <dt className="sr-only">Year</dt>
            <dd>{vehicle.year}</dd>
          </div>
        </dl>

        {/* Service History */}
        {vehicle.serviceHistory === "Full" && (
          <div className="flex items-center gap-1.5 text-xs text-[#22C55E] mb-4">
            <CheckCircle2 size={12} aria-hidden="true" />
            <span>Full Service History</span>
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/inventory/${vehicle.slug}`}
          className={cn(
            "mt-auto block text-center py-2.5 rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#141416]",
            isAvailable
              ? "bg-[#1E1E20] text-[#FAFAFA] hover:bg-gold hover:text-[#0A0A0B]"
              : "bg-[#141416] text-[#71717A] cursor-default pointer-events-none"
          )}
          aria-disabled={!isAvailable}
        >
          {isAvailable ? "View Details" : vehicle.status}
        </Link>
      </div>
    </article>
  );
}
