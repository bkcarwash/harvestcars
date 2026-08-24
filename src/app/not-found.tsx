import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-20">
      <div className="max-w-md mx-auto px-4 text-center">
        <p className="font-heading text-8xl font-bold text-gold opacity-30 mb-4">
          404
        </p>
        <h1 className="font-heading text-3xl font-bold text-[#FAFAFA] mb-3">
          Page Not Found
        </h1>
        <p className="text-[#A1A1AA] mb-8">
          This page doesn&apos;t exist or may have been moved. Try browsing our current car
          stock or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/inventory"
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#0A0A0B] bg-gold rounded-lg hover:bg-[#E5C84A] transition-colors min-h-[44px]"
          >
            <Search size={15} aria-hidden="true" />
            Browse Cars
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#FAFAFA] border border-[#27272A] rounded-lg hover:border-gold hover:text-gold transition-colors min-h-[44px]"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
