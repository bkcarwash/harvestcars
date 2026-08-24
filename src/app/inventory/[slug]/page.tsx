import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Gauge,
  Calendar,
  Fuel,
  Settings,
  Users,
  DoorOpen,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowLeft,
  Shield,
} from "lucide-react";
import {
  vehicles,
  getVehicleBySlug,
  formatPrice,
  formatMileage,
} from "@/lib/data";
import { buildVehicleSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { businessInfo } from "@/lib/data";
import { VehicleCard } from "@/components/shared/VehicleCard";

export async function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

type SlugProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: SlugProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return {};

  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant} — £${vehicle.price.toLocaleString("en-GB")}`;
  const description = `${vehicle.year} ${vehicle.make} ${vehicle.model} with ${formatMileage(vehicle.mileage)}, ${vehicle.transmission}, ${vehicle.fuelType}. ${vehicle.serviceHistory} service history. ${vehicle.description.slice(0, 120)}…`;

  return {
    title,
    description,
    alternates: { canonical: `/inventory/${slug}` },
    openGraph: {
      title,
      description,
      locale: "en_GB",
      images: vehicle.images[0]
        ? [{ url: vehicle.images[0], alt: `${vehicle.year} ${vehicle.make} ${vehicle.model}` }]
        : undefined,
    },
  };
}

const specItems = (v: ReturnType<typeof getVehicleBySlug>) => {
  if (!v) return [];
  return [
    { icon: Calendar, label: "Year", value: String(v.year) },
    { icon: Gauge, label: "Mileage", value: formatMileage(v.mileage) },
    { icon: Settings, label: "Transmission", value: v.transmission },
    { icon: Fuel, label: "Fuel Type", value: v.fuelType },
    { icon: DoorOpen, label: "Doors", value: String(v.doors) },
    { icon: Users, label: "Seats", value: String(v.seats) },
    { icon: Shield, label: "Service History", value: v.serviceHistory },
    { icon: Users, label: "Previous Owners", value: String(v.previousOwners) },
  ];
};

export default async function VehicleDetailPage({
  params,
}: SlugProps) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const vehicleSchema = buildVehicleSchema(vehicle);
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: businessInfo.url },
    { name: "Cars for Sale", url: `${businessInfo.url}/inventory` },
    {
      name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      url: `${businessInfo.url}/inventory/${vehicle.slug}`,
    },
  ]);

  // Related cars: same make, exclude current
  const related = vehicles
    .filter((v) => v.make === vehicle.make && v.id !== vehicle.id && v.status === "Available")
    .slice(0, 3);

  const specs = specItems(vehicle);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="pt-24 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-[#71717A]">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/inventory" className="hover:text-gold transition-colors">
                  Cars for Sale
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#A1A1AA] truncate max-w-[200px]">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </li>
            </ol>
          </nav>

          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#FAFAFA] mb-6">
            {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.variant}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Gallery + Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Image */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#141416]">
                <Image
                  src={vehicle.images[0] || "/images/vehicle-placeholder.jpg"}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant} — ${vehicle.colour}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  priority
                />
                {vehicle.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 text-sm font-semibold text-[#0A0A0B] bg-gold rounded-full">
                      {vehicle.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Additional images */}
              {vehicle.images.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {vehicle.images.slice(1, 4).map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#141416]"
                    >
                      <Image
                        src={img}
                        alt={`${vehicle.make} ${vehicle.model} — view ${i + 2}`}
                        fill
                        sizes="(max-width: 1024px) 33vw, 22vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="rounded-xl card-surface p-6">
                <h2 className="font-heading text-[#FAFAFA] text-xl font-semibold mb-3">
                  About This Car
                </h2>
                <p className="text-[#A1A1AA] leading-relaxed">{vehicle.description}</p>
              </div>

              {/* Features */}
              <div className="rounded-xl card-surface p-6">
                <h2 className="font-heading text-[#FAFAFA] text-xl font-semibold mb-4">
                  Key Features
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {vehicle.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                      <CheckCircle2
                        size={14}
                        className="text-gold flex-shrink-0"
                        aria-hidden="true"
                      />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Sticky Sidebar */}
            <aside className="space-y-5">
              <div className="lg:sticky lg:top-24 space-y-5">
                {/* Price Card */}
                <div className="rounded-xl card-elevated p-6">
                  <div className="mb-1">
                    <p className="text-[#71717A] text-xs uppercase tracking-wider mb-1">
                      Asking Price
                    </p>
                    <p className="font-heading text-4xl font-bold text-gold">
                      {formatPrice(vehicle.price)}
                    </p>
                  </div>
                  <p className="text-[#A1A1AA] text-sm mb-1">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </p>
                  <p className="text-[#71717A] text-sm">{vehicle.variant}</p>

                  {vehicle.serviceHistory === "Full" && (
                    <div className="flex items-center gap-1.5 text-xs text-[#22C55E] mt-3">
                      <CheckCircle2 size={12} aria-hidden="true" />
                      Full Service History
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="flex flex-col gap-3 mt-5">
                    <a
                      href={`tel:${businessInfo.telephone}`}
                      className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-[#0A0A0B] bg-gold rounded-lg hover:bg-[#E5C84A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#18181B] min-h-[48px]"
                    >
                      <Phone size={16} aria-hidden="true" />
                      {/* TODO: Replace with real phone */}
                      Call to Enquire
                    </a>
                    <a
                      href={businessInfo.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-[#FAFAFA] border border-[#27272A] rounded-lg hover:border-gold hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#18181B] min-h-[48px]"
                    >
                      <MessageCircle size={16} aria-hidden="true" />
                      WhatsApp Us
                    </a>
                    <Link
                      href="/contact"
                      className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-[#FAFAFA] border border-[#27272A] rounded-lg hover:border-gold hover:text-gold transition-colors min-h-[48px]"
                    >
                      Send Enquiry
                    </Link>
                  </div>
                </div>

                {/* Specs */}
                <div className="rounded-xl card-surface p-5">
                  <h2 className="font-heading text-[#FAFAFA] font-semibold mb-4">
                    Vehicle Specs
                  </h2>
                  <dl className="space-y-3">
                    {specs.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-[#71717A]">
                          <Icon size={13} aria-hidden="true" />
                          <dt>{label}</dt>
                        </div>
                        <dd className="text-[#FAFAFA] font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Trust signals */}
                <div className="rounded-xl card-surface p-5 space-y-2.5">
                  {[
                    "Documents sent before viewing",
                    "Test drives welcome",
                    "No-pressure sales",
                    "Same-day delivery available",
                  ].map((trust) => (
                    <div key={trust} className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                      <CheckCircle2 size={13} className="text-gold flex-shrink-0" aria-hidden="true" />
                      {trust}
                    </div>
                  ))}
                </div>

                {/* Finance teaser */}
                <div className="rounded-xl card-surface p-5">
                  <p className="text-[#FAFAFA] font-semibold text-sm mb-1">Finance Available</p>
                  <p className="text-[#A1A1AA] text-xs leading-relaxed mb-3">
                    Spread the cost with flexible finance options. HP, PCP and personal loans available. Subject to status.
                  </p>
                  <Link
                    href="/financing"
                    className="inline-flex items-center gap-1.5 text-gold text-xs font-semibold hover:text-[#E5C84A] transition-colors"
                  >
                    Explore finance options
                    <ArrowLeft size={12} className="rotate-180" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Related Cars */}
          {related.length > 0 && (
            <section className="mt-16" aria-labelledby="related-heading">
              <h2
                id="related-heading"
                className="font-heading text-2xl font-bold text-[#FAFAFA] mb-6"
              >
                More {vehicle.make} Cars
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((v) => (
                  <VehicleCard key={v.id} vehicle={v} />
                ))}
              </div>
            </section>
          )}

          {/* Back link */}
          <Link
            href="/inventory"
            className="inline-flex items-center gap-2 mt-10 text-sm text-[#A1A1AA] hover:text-gold transition-colors"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to All Cars
          </Link>
        </div>
      </div>
    </>
  );
}
