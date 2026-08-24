"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { vehicles } from "@/lib/data";

// Extract unique filter options from data
const makes = [...new Set(vehicles.map((v) => v.make))].sort();
const bodyTypes = [...new Set(vehicles.map((v) => v.bodyType))].sort();
const transmissions = ["Manual", "Automatic"];

const priceRanges = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under £10,000", min: 0, max: 10000 },
  { label: "£10,000–£20,000", min: 10000, max: 20000 },
  { label: "£20,000–£35,000", min: 20000, max: 35000 },
  { label: "£35,000–£75,000", min: 35000, max: 75000 },
  { label: "£75,000+", min: 75000, max: Infinity },
];

interface FilterState {
  make: string;
  bodyType: string;
  transmission: string;
  priceRange: string;
  search: string;
}

export function InventoryFilter({ counts }: { counts: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current = {
    make: searchParams.get("make") ?? "",
    bodyType: searchParams.get("bodyType") ?? "",
    transmission: searchParams.get("transmission") ?? "",
    priceRange: searchParams.get("priceRange") ?? "",
    search: searchParams.get("search") ?? "",
  };

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const clearAll = () => router.push(pathname, { scroll: false });

  const hasFilters = Object.values(current).some(Boolean);

  return (
    <div className="p-4 rounded-xl card-surface space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#FAFAFA] font-semibold text-sm">
          <SlidersHorizontal size={16} aria-hidden="true" />
          <span>Filter Cars</span>
        </div>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-[#A1A1AA] hover:text-gold transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <p className="text-[#71717A] text-xs">{counts} cars available</p>

      {/* Search */}
      <div className="relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search by make, model…"
          value={current.search}
          onChange={(e) => updateParam("search", e.target.value)}
          className="w-full pl-9 pr-3 py-2.5 text-sm text-[#FAFAFA] bg-[#1E1E20] border border-[#27272A] rounded-lg placeholder:text-[#71717A] focus:outline-none focus:border-gold transition-colors"
          aria-label="Search vehicles"
        />
      </div>

      {/* Make */}
      <div>
        <label htmlFor="filter-make" className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
          Make
        </label>
        <select
          id="filter-make"
          value={current.make}
          onChange={(e) => updateParam("make", e.target.value)}
          className="w-full px-3 py-2.5 text-sm text-[#FAFAFA] bg-[#1E1E20] border border-[#27272A] rounded-lg focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
        >
          <option value="">All Makes</option>
          {makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </div>

      {/* Body Type */}
      <div>
        <label htmlFor="filter-body" className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
          Body Type
        </label>
        <select
          id="filter-body"
          value={current.bodyType}
          onChange={(e) => updateParam("bodyType", e.target.value)}
          className="w-full px-3 py-2.5 text-sm text-[#FAFAFA] bg-[#1E1E20] border border-[#27272A] rounded-lg focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
        >
          <option value="">All Body Types</option>
          {bodyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Transmission */}
      <div>
        <label htmlFor="filter-transmission" className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
          Transmission
        </label>
        <select
          id="filter-transmission"
          value={current.transmission}
          onChange={(e) => updateParam("transmission", e.target.value)}
          className="w-full px-3 py-2.5 text-sm text-[#FAFAFA] bg-[#1E1E20] border border-[#27272A] rounded-lg focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
        >
          <option value="">Any Transmission</option>
          {transmissions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label htmlFor="filter-price" className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
          Price Range
        </label>
        <select
          id="filter-price"
          value={current.priceRange}
          onChange={(e) => updateParam("priceRange", e.target.value)}
          className="w-full px-3 py-2.5 text-sm text-[#FAFAFA] bg-[#1E1E20] border border-[#27272A] rounded-lg focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
        >
          {priceRanges.map((range) => (
            <option key={range.label} value={range.label === "Any Price" ? "" : range.label}>
              {range.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
