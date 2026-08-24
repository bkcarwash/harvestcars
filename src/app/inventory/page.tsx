import type { Metadata } from "next";
import { Suspense } from "react";
import { VehicleCard } from "@/components/shared/VehicleCard";
import { InventoryFilter } from "@/components/inventory/InventoryFilter";
import { getAvailableVehicles, type Vehicle } from "@/lib/data";
import { buildInventoryListSchema } from "@/lib/schema";
import { businessInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Cars for Sale",
  description:
    "Browse our full inventory of quality used cars at Harvest Cars. Filter by make, model, price, body type, and transmission. All cars come with verified service histories.",
  alternates: {
    canonical: "/inventory",
  },
};

// URL search params drive filtering — shareable, crawlable, back-button friendly
function filterVehicles(
  vehicles: Vehicle[],
  params: {
    make?: string;
    bodyType?: string;
    transmission?: string;
    priceRange?: string;
    search?: string;
  }
): Vehicle[] {
  let result = vehicles;

  if (params.make) {
    result = result.filter(
      (v) => v.make.toLowerCase() === params.make!.toLowerCase()
    );
  }
  if (params.bodyType) {
    result = result.filter(
      (v) => v.bodyType.toLowerCase() === params.bodyType!.toLowerCase()
    );
  }
  if (params.transmission) {
    result = result.filter(
      (v) => v.transmission.toLowerCase() === params.transmission!.toLowerCase()
    );
  }
  if (params.priceRange) {
    const ranges: Record<string, [number, number]> = {
      "Under £10,000": [0, 10000],
      "£10,000–£20,000": [10000, 20000],
      "£20,000–£35,000": [20000, 35000],
      "£35,000–£75,000": [35000, 75000],
      "£75,000+": [75000, Infinity],
    };
    const [min, max] = ranges[params.priceRange] ?? [0, Infinity];
    result = result.filter((v) => v.price >= min && v.price <= max);
  }
  if (params.search) {
    const q = params.search.toLowerCase();
    result = result.filter(
      (v) =>
        v.make.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.variant.toLowerCase().includes(q) ||
        v.colour.toLowerCase().includes(q)
    );
  }

  return result;
}

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const all = getAvailableVehicles();
  const filtered = filterVehicles(all, {
    make: params.make as string | undefined,
    bodyType: params.bodyType as string | undefined,
    transmission: params.transmission as string | undefined,
    priceRange: params.priceRange as string | undefined,
    search: params.search as string | undefined,
  });

  const inventorySchema = buildInventoryListSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(inventorySchema) }}
      />

      <div className="pt-24 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-8">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
              Inventory
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#FAFAFA] mb-2">
              Cars for Sale
            </h1>
            <p className="text-[#A1A1AA]">
              All vehicles come with verified service histories. Documents
              available before viewing.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar filter — Suspense needed because InventoryFilter uses useSearchParams */}
            <aside className="lg:w-60 xl:w-72 flex-shrink-0" aria-label="Filter options">
              <Suspense
                fallback={
                  <div className="h-96 rounded-xl card-surface animate-pulse" />
                }
              >
                <InventoryFilter counts={filtered.length} />
              </Suspense>
            </aside>

            {/* Results */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-[#A1A1AA] text-lg mb-2">
                    No vehicles match your current filters.
                  </p>
                  <p className="text-[#71717A] text-sm">
                    Try adjusting your search or clearing all filters.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((vehicle, i) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      priority={i < 3}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
